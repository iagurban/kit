import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';

/**
 * A singleton service that generates a unique name for this application instance.
 * This is crucial for Redis Streams, as each consumer within a group needs a unique name.
 */
@Injectable()
export class ClientName {
  public readonly clientName: string;

  constructor() {
    // Generates a name like 'posts-renderer-service-a1b2c3d4'
    const baseName = process.env.SERVICE_NAME || 'service';
    const randomId = randomBytes(4).toString('hex');
    this.clientName = `${baseName}-${randomId}`;
    console.log(`[ClientName] Generated unique client name: ${this.clientName}`);
  }
}
