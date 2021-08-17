import { Entity, Column, PrimaryColumn, DeleteDateColumn } from "typeorm";
import { IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator";

@Entity()
class Client {
  @PrimaryColumn()
  @IsNotEmpty()
  @IsInt()
  id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  address: string;

  @Column()
  @IsNotEmpty()
  phone: string;

  @Column()
  isActive: boolean;

  @DeleteDateColumn()
  deletedAt?: Date;
}

export default Client;
