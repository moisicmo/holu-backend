import { Controller, Get, Body } from '@nestjs/common';
import { AvatarsService } from './avatars.service';
import { Public } from '@/decorator';

@Controller('avatars')
export class AvatarsController {
  constructor(private readonly avatarsService: AvatarsService) {}

  @Public()
  @Get()
  findAll() {
    return this.avatarsService.findAll();
  }
}
