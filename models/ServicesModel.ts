import { IsNotEmpty } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import Product from "./ProductsModel";

type statusTypes = "waiting" | "started" | "finished";

@Entity()
class Service {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @IsNotEmpty()
  user_id: number;

  @Column()
  @IsNotEmpty()
  date_of_service: Date;

  @Column()
  @IsNotEmpty()
  service_value: number;

  @Column({
    type: "enum",
    enum: ["waiting", "started", "finished"],
    default: "waiting",
  })
  status: statusTypes;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];
}

export default Service;
