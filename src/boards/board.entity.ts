import { User } from "src/auth/auth.entity";
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";
import { BoardStatus } from "./board.status.enum";
import { ManyToOne } from "typeorm";

@Entity()
export class Board extends BaseEntity{
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: BoardStatus;

  @ManyToOne(type=> User, user => user.boards, {eager: false})
  user: User;
}