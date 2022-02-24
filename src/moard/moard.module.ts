import { Module } from '@nestjs/common';
import { MoardController } from './moard.controller';
import { MoardService } from './moard.service';

@Module({
  controllers: [MoardController],
  providers: [MoardService]
})
export class MoardModule {}
