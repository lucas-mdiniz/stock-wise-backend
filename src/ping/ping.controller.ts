import { Controller, Get } from '@nestjs/common';

@Controller('ping')
export class PingController {
  @Get()
  getPing(): string {
    return 'pong';
  }
}
