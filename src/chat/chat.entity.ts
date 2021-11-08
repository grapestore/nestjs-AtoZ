import { User } from "src/auth/auth.entity";
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class ChatLog extends BaseEntity{
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  users: User[];

  @Column()
  description: string;
}