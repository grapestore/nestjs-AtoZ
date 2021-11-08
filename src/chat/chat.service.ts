import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { ChatRepository } from "./chat.repository";
import { User } from "src/auth/auth.entity";
import { ChatLog } from "./chat.entity";

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatRepository)
    private chatRepository: ChatRepository,
  ) {}

  async createBoard(createBoardDto: ChatRepository, user: User){

    const board = this.chatRepository. create({
      room: room,
      users: users,
      description: description
    })

    await this.chatRepository.save(RoomLog);
  }
}
