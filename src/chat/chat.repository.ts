import { EntityRepository, Repository } from "typeorm";
import { ChatLog } from "./chat.entity";

@EntityRepository(ChatLog)
export class ChatRepository extends Repository<ChatLog>{
  
}