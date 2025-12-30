import {Entity, PrimaryGeneratedColumn, Column,CreateDatecolum,updateDateColum} from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column({unique:true})
    email:string;

    @Column()
        password : string
    
    @CreateDatecolum()
    createdAt: Date;   

    @updateDateColum()
    updatedAt: Date;
    
    
}