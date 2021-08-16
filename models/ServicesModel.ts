import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

type statusTypes = "waiting" | "started" | "finished";

@Entity()
class Service {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  user_id: number;

  @Column()
  date_of_service: Date;

  @Column()
  service_value: number;

  @Column({
    type: "enum",
    enum: ["waiting", "started", "finished"],
    default: "waiting",
  })
  status: statusTypes;
}

export default Service;
