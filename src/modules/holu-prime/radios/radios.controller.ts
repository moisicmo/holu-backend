import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { RadiosService } from './radios.service';
import { CreateRadioDto } from './dto/create-radio.dto';
import { checkAbilities, CurrentUser } from '@/decorator';
import { PaginationDto, TypeAction, TypeSubject } from '@/common';
import { JwtPayload } from '@/modules/identity-service/auth/entities/jwt-payload.interface';

@Controller('radio')
export class RadiosController {
  constructor(private readonly radioService: RadiosService) { }

  @Post()
  @checkAbilities({ action: TypeAction.crear, subject: TypeSubject.radio })
  create(@CurrentUser() user: JwtPayload, @Body() createRadioDto: CreateRadioDto) {
    return this.radioService.create(user.email, createRadioDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.radioService.findAll(paginationDto);
  }

  @Get('/category')
  findAllCategories(@Query() paginationDto: PaginationDto) {
    return this.radioService.findAllCategories(paginationDto);
  }
}
