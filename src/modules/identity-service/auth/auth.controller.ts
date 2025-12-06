import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Public, RequestInfo } from '@/decorator';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ValidatePinDto } from './dto/validate-pin.dto';
import { CreateRefreshDto } from './dto/create-refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post()
  login(@Body() createAuthDto: CreateAuthDto, @RequestInfo() requestInfo: RequestInfo) {
    return this.authService.login(createAuthDto,requestInfo);
  }

  @Public()
  @Post('refresh')
  refresh(@Body() createRefreshDto: CreateRefreshDto,@RequestInfo() requestInfo: RequestInfo) {
    return this.authService.refreshToken(createRefreshDto,requestInfo);
  }

  @Public()
  @Get('sendPin/:idUser')
  SendPin(@Param('idUser') idUser: string){
    return this.authService.sendPinEmail(idUser);
  }


  @Public()
  @Post('validatePin')
  validationPin(@Body() validatePinDto: ValidatePinDto) {
    return this.authService.validationPin(validatePinDto);
  }
  
}

