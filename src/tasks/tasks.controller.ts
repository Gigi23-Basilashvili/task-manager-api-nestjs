import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/update-task.dto';




@Controller('projects/:projectId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() body: { title: string; description?: string },
  ) {
    return this.tasksService.create(
      projectId,
      body.title,
      body.description,
    );
  }

  @Get()
  findAll(@Param('projectId', ParseIntPipe) projectId: number) {
    return this.tasksService.findAllByProject(projectId);
  }

  @Patch(':taskId')
  update(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body() body: UpdateTaskDto, 
  ) {
    return this.tasksService.update(taskId, body);
  }

  @Delete(':taskId')
  remove(@Param('taskId', ParseIntPipe) taskId: number) {
    return this.tasksService.remove(taskId);
  }
}


