import { from } from "rxjs";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    title:string;

    @Column ({nullable: true})
    description:string;

    @Column({default:'todo'})
    status:string;

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;
}