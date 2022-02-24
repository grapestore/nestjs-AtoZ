import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Redirect,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { MoardService } from './moard.service';

@Controller('moard')
export class MoardController {
  constructor(private moardService: MoardService) {}

  @Get('/test')
  @Redirect('http://naver.com', 301)
  getRedirect(@Query('version') version) {
    if (version == '5') {
      return { url: 'http://google.com' };
    }
    return;
  }

  @Post('/test-exception')
  @UsePipes(new ValidationPipe({ transform: true }))
  occurException(@Body() req: UserDto) {
    console.log(req);
    return req;
  }
}
