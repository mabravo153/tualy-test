import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  Validate,
} from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  Generated,
} from "typeorm";
import Product from "./ProductsModel";
import Client from "./ClientsModel";
import { ObjectProductValidate } from "../helpers/CustomValidator";

interface IProducts {
  id: number;
  qty: number;
}

type statusTypes = "waiting" | "started" | "finished";

@Entity()
class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated("uuid")
  code: string;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @Column()
  @IsNotEmpty()
  @IsDateString()
  date_of_service: Date;

  @Column("simple-json")
  @Validate(ObjectProductValidate, {
    message: "Validate Products",
  })
  arrayProducts: IProducts[];

  @Column({ type: "decimal", default: 0 })
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

  @ManyToOne(() => Client, (client) => client.services)
  client: Client;
}

export default Service;
