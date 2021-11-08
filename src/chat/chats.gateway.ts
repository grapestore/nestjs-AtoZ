import {
  ConnectedSocket,
  MessageBody,
  WsResponse,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatRepository } from './chat.repository';
import { InjectRepository } from '@nestjs/typeorm';

@WebSocketGateway({namespace : 'chat'})
export class ChatsGateway {
  constructor(
    @InjectRepository(ChatRepository)
    private chatRepository: ChatRepository,
  ) {}

  @WebSocketServer()
  server: Server;
  wsClients = [];

  handleConnection(client: Socket) { }

  handleDisconnect(client: Socket) { }

  @SubscribeMessage('hihi')
  connectSomeone(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ) {
    const [nickname, room] = data;
    console.log(`${nickname}님이 코드: ${room}방에 접속했습니다.`);
    const comeOn = `${nickname}님이 입장했습니다.`;
    this.server.emit('comeOn' + room, comeOn);
    this.wsClients.push(client);
  }

  private broadcast(event, client, message: any) {
    for (let c of this.wsClients){
      if (c.id !== client.id) c.emit(event, message);
    }
  }

  @SubscribeMessage('send')
  sendMessage(@MessageBody() data: string, @ConnectedSocket() client) {
    const [room, nickname, message] = data;
    console.log(`${room} : ${client.id} : ${data}`);
    this.broadcast(room, client, [nickname, message]);
  }
}