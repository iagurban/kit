import { once } from '@gurban/kit/core/once';
import { notNull } from '@gurban/kit/utils/flow-utils';
import { Injectable, Module, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createContextualLogger, Logger } from '@poslah/util/logger/logger.module';
import * as fs from 'fs';
import * as http from 'http';
import * as http2 from 'http2';
import { Socket } from 'net';
import { join } from 'path';
import { TLSSocket } from 'tls';

const JWKS_PATH = '/.well-known/jwks.json';

@Injectable()
export class MtlsProxyService implements OnModuleInit, OnApplicationShutdown {
  private server?: http2.Http2SecureServer;

  constructor(
    private readonly configService: ConfigService,
    private readonly loggerBase: Logger
  ) {}

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, MtlsProxyService.name);
  }

  onModuleInit() {
    this.startProxy();
  }

  async onApplicationShutdown() {
    this.logger.info('Shutting down mTLS proxy server...');
    const { server } = this;
    await Promise.all([
      server &&
        new Promise((resolve, reject) => server.close(error => (error ? reject(error) : resolve(undefined)))),
    ]);
  }

  private startProxy() {
    const grpcUpstreamTarget = this.configService.getOrThrow<string>('SIGNING_SERVICE_GRPC_URL');
    const httpUpstreamTarget = this.configService.getOrThrow<string>('SIGNING_SERVICE_HTTP_URL');

    const publicHost = this.configService.getOrThrow<string>('SIGNING_SERVICE_HOST');
    const publicPort = this.configService.getOrThrow<string>('SIGNING_SERVICE_PORT');
    const publicUrl = `${publicHost}:${publicPort}`;

    const certsFolder = join(__dirname, '../../certs');

    // 1. Configure the HTTP/2 server for mTLS.
    const httpsOptions: http2.SecureServerOptions = {
      key: fs.readFileSync(join(certsFolder, 'server.key')),
      cert: fs.readFileSync(join(certsFolder, 'server.crt')),
      ca: [fs.readFileSync(join(certsFolder, 'ca.crt'))],
      requestCert: true, // Ask for a client cert, but don't require it.
      rejectUnauthorized: false, // ** THE KEY FIX **: Allow clients without certs to connect.
    };

    // 2. Create the server.
    this.server = http2.createSecureServer(httpsOptions);

    this.server.on('error', err => {
      this.logger.error({ err }, 'Proxy Server Error');
    });

    // 3a. Handle HTTP/2 requests (gRPC).
    this.server.on('stream', (downstreamStream, headers) => {
      // Manually enforce mTLS for gRPC streams.
      const socket = notNull(downstreamStream.session).socket as TLSSocket;
      if (!socket.authorized) {
        this.logger.error(
          { error: socket.authorizationError },
          'Proxy: DENIED (gRPC). Invalid or missing client certificate.'
        );
        downstreamStream.close(http2.constants.NGHTTP2_REFUSED_STREAM);
        return;
      }

      this.proxyGrpcRequest(downstreamStream, headers, grpcUpstreamTarget);
    });

    // 3b. Handle HTTP/1.1 requests (JWKS).
    // this.server.on('request', (req: http.IncomingMessage, res: http.ServerResponse) => {
    //   if (req.url === JWKS_PATH) {
    //     this.logger.info(`Proxy: Received public HTTP/1.1 request for ${req.url}, routing to HTTP upstream.`);
    //     this.proxyHttp1Request(req, res, httpUpstreamTarget);
    //   } else {
    //     // This could be a mis-routed gRPC call or other unknown request.
    //     // We must reject it, as it is not the public JWKS endpoint.
    //     this.logger.warn({ url: req.url }, 'Proxy: Received unexpected HTTP/1.1 request. Rejecting.');
    //     res.writeHead(404, 'Not Found');
    //     res.end();
    //   }
    // });

    this.server.on('connection', (socket: Socket) => {
      this.logger.info(
        { remoteAddress: socket.remoteAddress, remotePort: socket.remotePort },
        'Proxy: New raw connection received.'
      );
    });

    // 4. Start listening on the public port.
    const [host, port] = publicUrl.split(':');
    this.server.listen(parseInt(port, 10), host, () => {
      this.logger.info(`✅ mTLS Proxy is running and listening on ${publicUrl}`);
    });
  }

  /**
   * Proxies a public incoming HTTP/1.1 request. Does not check for client cert.
   */
  private proxyHttp1Request(req: http.IncomingMessage, res: http.ServerResponse, target: string) {
    const [hostname, port] = target.split(':');
    const options: http.RequestOptions = {
      hostname,
      port: parseInt(port, 10),
      path: req.url,
      method: req.method,
      headers: req.headers,
    };

    const upstreamReq = http.request(options, upstreamRes => {
      res.writeHead(upstreamRes.statusCode ?? 500, upstreamRes.headers);
      upstreamRes.pipe(res);
    });

    upstreamReq.on('error', e => {
      this.logger.error({ err: e }, 'HTTP/1.1 proxy request error.');
      if (!res.headersSent) {
        res.writeHead(502, 'Bad Gateway');
      }
      res.end();
    });

    req.pipe(upstreamReq);
  }

  /**
   * Proxies a request to an HTTP/2 gRPC upstream.
   */
  private proxyGrpcRequest(
    downstreamStream: http2.ServerHttp2Stream,
    headers: http2.IncomingHttpHeaders,
    target: string
  ) {
    const session = downstreamStream.session;
    const socket = notNull(session).socket as TLSSocket;
    const cert = socket.getPeerCertificate(true);
    const serviceName = cert?.subject?.CN ?? 'unknown';

    this.logger.info(`Proxy: Verified stream from [${serviceName}] via mTLS.`);

    // Inject the trusted header for the downstream service.
    headers['x-forwarded-client-cert-cn'] = serviceName;

    const upstreamSession = http2.connect(`http://${target}`);

    upstreamSession.on('error', err => {
      this.logger.error({ err, target }, 'Upstream connection error');
      downstreamStream.close(http2.constants.NGHTTP2_CONNECT_ERROR);
    });

    const upstreamStream = upstreamSession.request(headers);

    upstreamStream.on('response', responseHeaders => {
      downstreamStream.respond(responseHeaders, { waitForTrailers: true });
    });

    let trailers: http2.OutgoingHttpHeaders | undefined;

    upstreamStream.on('trailers', (receivedTrailers, flags) => {
      this.logger.debug({ trailers: receivedTrailers, flags }, 'Received upstream trailers. Storing.');
      trailers = receivedTrailers;
    });

    downstreamStream.on('wantTrailers', () => {
      this.logger.debug('Downstream wants trailers. Sending stored trailers.');
      if (trailers) {
        downstreamStream.sendTrailers(trailers);
      } else {
        this.logger.warn('Downstream wants trailers, but none were stored from upstream.');
        downstreamStream.end();
      }
    });

    downstreamStream.pipe(upstreamStream);
    upstreamStream.pipe(downstreamStream);

    downstreamStream.on('close', () => {
      if (!upstreamSession.closed) {
        upstreamSession.close();
      }
    });
  }
}

@Module({
  providers: [MtlsProxyService],
})
export class MtlsProxyModule {}
