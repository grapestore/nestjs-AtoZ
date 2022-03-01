import { IsString } from 'class-validator';

export default class UserDto {
  @IsString()
  userId: string;
}
