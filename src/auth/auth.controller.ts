import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { User } from './auth.entity';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService){}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<void>{
    return this.authService.signUp(authCredentialDto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<{accessToken: string}>{
    return this.authService.signIn(authCredentialDto)
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User){
    console.log('req', user);
  }
}