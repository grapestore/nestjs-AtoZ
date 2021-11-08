import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board.status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/auth.entity';

@Controller('boards')
//@UseGuards(AuthGuard())
export class BoardsController {
  
  boardsService : BoardsService;
  constructor(boardService: BoardsService){
    this.boardsService = boardService;
  }
  /* 위에가 정석적인 방법 private을 사용하면 type선언을 해주는 효과 아래처럼 
      사용 가능 변수 선언과 초기화에 효과를 가지는 듯  없으면 초기 변수 선언
      생성자 선언 초기화 해줘야됨 */
  //constructor(private boardsService: BoardsService){}

  @Get('/')
  getAllboard(
    @GetUser() user: User,
  ): Promise<Board[]>{
    return this.boardsService.getAllBoards(user);
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User): Promise<Board>{
    return this.boardsService.createBoard(createBoardDto, user);
  }

  @Get('/:id')
  getBoardByIs(@Param('id') id: number): Promise<Board>{
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: number): Promise<void>{
    return this.boardsService.deleteBoardById(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board>{
    return this.boardsService.updateBoardStatus(id, status);
  }

}
