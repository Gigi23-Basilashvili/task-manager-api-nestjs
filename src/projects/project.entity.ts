import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ProjectMember } from './project-member.entity';
import { Task } from '../tasks/task.entity';

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id : number ;
    @Column()
    name : string ;
    @Column ({nullable:true})
    description : string;
    @CreateDateColumn()
    createdAt : Date ;
    @UpdateDateColumn()
    updatedAt : Date ;
    @OneToMany(() => ProjectMember, member => member.project)
    members: ProjectMember[];
     @OneToMany(() => Task, (task) => task.project) 
    tasks: Task[];
}

