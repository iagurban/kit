import { Controller, Get } from '@nestjs/common';

import { SigningService } from './signing.service';

@Controller('/.well-known')
export class SigningController {
  constructor(private readonly signingService: SigningService) {}

  @Get('jwks.json')
  getJwks() {
    return this.signingService.getJwks();
  }
}
