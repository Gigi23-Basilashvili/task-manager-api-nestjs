import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
  ) {}

  async getProject(id: number) {
    const project = await this.projectRepo.findOne({
      where: { id },
      relations: ['members', 'tasks'],
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async updateProject(id: number, data: Partial<Project>) {
    const project = await this.projectRepo.findOne({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    Object.assign(project, data);
    return this.projectRepo.save(project);
  }

  async deleteProject(id: number) {
    const project = await this.projectRepo.findOne({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    await this.projectRepo.remove(project);
    return { deleted: true };
  }
}

