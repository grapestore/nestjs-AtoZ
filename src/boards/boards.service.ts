import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board.status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { User } from 'src/auth/auth.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  async getAllBoards(user: User): Promise<Board[]>{
    
    //     /*  find all user data 특정 user 게시물 가져오기 */
    // return this.boardRepository.find({user});
    const query = this.boardRepository.createQueryBuilder('board');
    query.where('board.userId = :userId', {userId: user.id})
    const boards = await query.getMany();
    return boards
  }

  async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board>{
    const { title, description } = createBoardDto;
    /* 게시물 정보 생성 및 db에 저장 */
    const board = this.boardRepository. create({
      title: title,
      description: description,
      status: BoardStatus.PUBLIC,
      user: user
    })

    await this.boardRepository.save(board);
    return board;
  }

  async getBoardById(id: number): Promise <Board>{
    /** 원하는 게시물 id 또는 key값으로 찾기 */
    const found = await this.boardRepository.findOne(id);
    if(!found){
      throw new NotFoundException(`Can't find Board id : ${id}`);
    }
    return found;
  }

  async deleteBoardById(id: number): Promise<void>{
    /** 원하는 게시물 삭제 delete */
    const result = await this.boardRepository.delete(id);
    console.log('result', result);
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board>{
    /** 원하는 게시물 찾아서 data정보 가져온 후 data 쓰기 후 data 다시 저장 */
    const board = await this.getBoardById(id);
    board.status = status;

    await this.boardRepository.save(board);
    return board;
  }
}
