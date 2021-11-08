import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRepository } from './chat.repository';
import { ChatsGateway } from './chats.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatRepository]),
  ],
  providers:[ChatsGateway],
})
export class ChatModule {}
