import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../board.status.enum";

@Injectable()
export class BoardStatusValidationPipe implements PipeTransform{
  readonly StatusOptions = [
    BoardStatus.PUBLIC,
    BoardStatus.PRIVATE
  ]
  
  
  transform(value: string){
    value = value.toUpperCase();
    
    if(!this.isStatusValid(value)){
      throw new BadRequestException(`${value} ins't in the status`);
    }
    return value;
  }

  private isStatusValid(status :any){
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }
}