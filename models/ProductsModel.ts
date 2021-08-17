import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("uuid")
  code: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  description: string;

  @Column({ type: "decimal" })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @Column()
  isActive: boolean;
}

export default Product;
