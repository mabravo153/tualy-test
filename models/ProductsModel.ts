import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("uuid")
  code: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  isActive: boolean;
}

export default Product;
