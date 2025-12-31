import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ){}

    findAll(): Promise<Task[]> {
        return this.taskRepository.find();
    }

    async findOne(id: number): Promise<Task> {
     const task = await this.taskRepository.findOneBy({ id });
     if (!task) throw new Error('Task not found');
     return task;
}

  create(title: string, description?: string): Promise<Task> {
    const task = this.taskRepository.create({ title, description});
    return this.taskRepository.save(task);
  }

  async updateStatus(id:number,status:string): Promise<Task>{
    const task = await this.taskRepository.findOneBy({id});
    if (!task) throw new Error ('Task Not Found' );
    task.status=status;
    return this.taskRepository.save(task);
  }
  async remove(id:number):Promise<void>{
    await this.taskRepository.delete(id);
  }

  
}