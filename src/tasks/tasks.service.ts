import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { Project } from '../projects/project.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,

    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
  ) {}

  async create(projectId: number, title: string, description?: string) {
    const project = await this.projectRepo.findOne({
      where: { id: projectId },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const task = this.taskRepo.create({
      title,
      description,
      project,
    });

    return this.taskRepo.save(task);
  }

  async findAllByProject(projectId: number) {
    const project = await this.projectRepo.findOne({
      where: { id: projectId },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return this.taskRepo.find({
      where: { project: { id: projectId } },
      order: { createdAt: 'DESC' },
    });
  }

  async update(taskId: number, data: Partial<Task>) {
    const task = await this.taskRepo.findOne({
      where: { id: taskId },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    delete (data as any).id; 
    Object.assign(task, data);

    return this.taskRepo.save(task);
  }

  async remove(taskId: number) {
    const task = await this.taskRepo.findOne({
      where: { id: taskId },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return this.taskRepo.remove(task);
  }
}

