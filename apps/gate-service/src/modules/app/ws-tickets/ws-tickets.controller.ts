import { Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@poslah/util/auth-module/guards/jwt-auth.guard';

import { WsTicketsService } from './ws-tickets.service';

@Controller(`tickets`)
export class WsTicketsController {
  constructor(private readonly ticketsService: WsTicketsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('issue')
  issueTicket() {
    return this.ticketsService.issue();
  }
}
