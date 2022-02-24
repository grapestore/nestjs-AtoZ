import { Module } from '@nestjs/common';
import { MoardModule } from './moard/moard.module';
@Module({
  imports: [MoardModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
