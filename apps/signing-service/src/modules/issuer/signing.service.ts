import { ExMap } from '@gurban/kit/collections/ex-map';
import { checked } from '@gurban/kit/core/checks';
import { notNull } from '@gurban/kit/utils/flow-utils'; // Using 'node-jose' for robust JWK/JWKS handling
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import * as jose from 'node-jose';
import { join } from 'path';

const { '*': services, ...permissions } = {
  '*': [`chats-service`, `messages-service`],
  'ChatsService/GetLastMessageEvents': [`messages-service`],
  'MessagesService/GetMessageAuthInfo': `*`,
} satisfies Record<string, readonly string[] | `*`>;

@Injectable()
export class SigningService implements OnModuleInit {
  private key?: jose.JWK.Key;
  private jwks?: jose.JWK.KeyStore;

  readonly permissions = (() => {
    const all = new Set(services);
    const allArray = [...all];

    return ExMap.groupedBy(
      Object.entries(permissions).flatMap(([key, services]) =>
        (services === `*` ? allArray : services).map(
          s =>
            [
              checked(
                s,
                s => all.has(s),
                () => `Unknown service: ${s}`
              ),
              key,
            ] as const
        )
      ),
      ([service]) => service
    ).mapEntries(pairs => pairs.map(([, key]) => key));
  })();

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    // In production, the private key should be loaded securely from an environment
    // variable or a secret manager (e.g., Vault, AWS Secrets Manager).
    const certsFolder = join(__dirname, '../../../certs');
    const privateKeyPem = fs.readFileSync(join(certsFolder, 'jwt-private.pem'), 'utf-8');

    if (!privateKeyPem) {
      throw new Error('FATAL: jwt-private.pem could not be read.');
    }

    // Import the PEM-formatted private key and create a public JWKS from it.
    this.key = await jose.JWK.asKey(privateKeyPem, 'pem');
    this.jwks = jose.JWK.createKeyStore();
    await this.jwks.add(this.key);
  }

  /**
   * Signs a new JWT for an authenticated internal service.
   * @param serviceName The name of the service, extracted from its mTLS certificate.
   * @returns The signed JWT string and its expiration.
   */
  public signToken(serviceName: string): { accessToken: string; expiresIn: number } {
    const expiresIn = 3600; // 1 hour
    const payload = {
      sub: serviceName,
      aud: 'internal-api', // Audience for service-to-service calls
      permissions: this.permissions.get(serviceName) ?? [],
    };

    const key = notNull(this.key);

    const accessToken = jwt.sign(payload, key.toPEM(true), {
      algorithm: 'RS256',
      issuer: this.configService.get('JWT_ISSUER', 'signing-service'),
      expiresIn,
      keyid: key.kid, // Include the key ID for JWKS lookup
    });

    return { accessToken, expiresIn };
  }

  /**
   * Returns the public JSON Web Key Set (JWKS).
   * Other services will fetch this to verify the JWTs.
   */
  public getJwks() {
    // The `true` flag exports only the public keys.
    return notNull(this.jwks).toJSON(true);
  }
}
