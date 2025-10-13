import { once } from '@gurban/kit/core/once';
import { Injectable, Module, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createContextualLogger, Logger } from '@poslah/util/logger/logger.module';
import * as fs from 'fs';
import * as http2 from 'http2';
import { Socket } from 'net';
import { join } from 'path';
import { TLSSocket } from 'tls';

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
    // The upstream target MUST be the internal gRPC server, not the main HTTP app.
    const upstreamTarget = this.configService.getOrThrow<string>('SIGNING_SERVICE_GRPC_URL');

    const publicHost = this.configService.getOrThrow<string>('SIGNING_SERVICE_HOST');
    const publicPort = this.configService.getOrThrow<string>('SIGNING_SERVICE_PORT');
    const publicUrl = `${publicHost}:${publicPort}`;

    const certsFolder = join(__dirname, '../../certs');

    // 1. Configure the HTTP/2 server for mTLS.
    const httpsOptions: http2.SecureServerOptions = {
      key: fs.readFileSync(join(certsFolder, 'server.key')),
      cert: fs.readFileSync(join(certsFolder, 'server.crt')),
      ca: [fs.readFileSync(join(certsFolder, 'ca.crt'))],
      requestCert: true, // CRITICAL: Enforce mTLS
      rejectUnauthorized: true, // CRITICAL: Enforce mTLS
      ALPNProtocols: ['h2', 'http/1.1'], // Allow both HTTP/2 (for gRPC) and HTTP/1.1
    };

    // 2. Create the server.
    this.server = http2.createSecureServer(httpsOptions);

    this.server.on('error', err => {
      this.logger.error({ err }, 'Proxy Server Error');
    });

    // 3. Define the main request handler using the 'stream' event for HTTP/2.
    this.server.on('stream', (downstreamStream, headers) => {
      const session = downstreamStream.session;
      if (!session || session.destroyed) {
        this.logger.error('Proxy: Request has no session, cannot process.');
        if (!downstreamStream.closed) {
          downstreamStream.close(http2.constants.NGHTTP2_INTERNAL_ERROR);
        }
        return;
      }

      const socket = session.socket as TLSSocket;
      const cert = socket.getPeerCertificate(true);

      if (!cert?.subject?.CN) {
        this.logger.error('Proxy: DENIED (HTTP/2). Client certificate with CN is required.');
        downstreamStream.close(http2.constants.NGHTTP2_REFUSED_STREAM);
        return;
      }

      const serviceName = cert.subject.CN;
      this.logger.info(`Proxy: Verified stream from [${serviceName}] via mTLS.`);

      // Inject the trusted header for the downstream service.
      headers['x-forwarded-client-cert-cn'] = serviceName;

      // Manually create a new HTTP/2 connection to the upstream gRPC service.
      const upstreamUrl = `http://${upstreamTarget}`;
      const upstreamSession = http2.connect(upstreamUrl);

      upstreamSession.on('error', err => {
        this.logger.error({ err, target: upstreamTarget }, 'Upstream connection error');
        downstreamStream.close(http2.constants.NGHTTP2_CONNECT_ERROR);
      });

      const upstreamStream = upstreamSession.request(headers);

      // ** THE DEFINITIVE FIX IS HERE **
      upstreamStream.on('response', responseHeaders => {
        // Signal to the client stream that trailers are coming.
        downstreamStream.respond(responseHeaders, { waitForTrailers: true });
      });

      let trailers: http2.OutgoingHttpHeaders | undefined;

      // 1. Store the trailers when they arrive from the upstream.
      upstreamStream.on('trailers', (receivedTrailers, flags) => {
        this.logger.debug({ trailers: receivedTrailers, flags }, 'Received upstream trailers. Storing.');
        trailers = receivedTrailers;
      });

      // 2. Listen for when the downstream is ready for trailers.
      downstreamStream.on('wantTrailers', () => {
        this.logger.debug('Downstream wants trailers. Sending stored trailers.');
        if (trailers) {
          downstreamStream.sendTrailers(trailers);
        } else {
          this.logger.warn('Downstream wants trailers, but none were stored from upstream.');
          downstreamStream.end();
        }
      });

      // Pipe the data between the client and the upstream service.
      downstreamStream.pipe(upstreamStream);
      upstreamStream.pipe(downstreamStream);

      downstreamStream.on('close', () => {
        if (!upstreamSession.closed) {
          upstreamSession.close();
        }
      });
    });

    // Add a listener for raw connection attempts to see if anything hits the server.
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
}

@Module({
  // This module can now be imported into your main AppModule for the signing-service.
  providers: [MtlsProxyService],
})
export class MtlsProxyModule {}
