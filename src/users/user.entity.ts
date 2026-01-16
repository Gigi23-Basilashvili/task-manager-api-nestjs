import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ProjectMember } from '../projects/project-member.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column({unique:true})
    email:string;

    @Column()
    password : string;

    @CreateDateColumn()
    createdAt: Date;   

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => ProjectMember, (projectMember) => projectMember.user)
    projectMemberships: ProjectMember[];
}