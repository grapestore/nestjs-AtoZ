import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Redirect,
  UseFilters,
} from '@nestjs/common';
import UserDto from './dtos/user.dto';
import { HttpExceptionFilter } from './http-excetion.filter';
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
  @UseFilters(new HttpExceptionFilter())
  occurException(@Body() req: UserDto) {
    if (req.userId === undefined) throw new BadRequestException();
    else return req;
  }
}
