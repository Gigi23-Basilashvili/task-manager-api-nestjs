import {
  Controller,
  Patch,
  Param,
  Body,
  ForbiddenException,
  ParseIntPipe,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { PermissionsService } from './permissions.service';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly permissionsService: PermissionsService,
  ) {}

  @Patch(':id')
  async updateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { data: any; member: any },
  ) {
    const { data, member } = body;

    if (!this.permissionsService.canEditProject(member)) {
      throw new ForbiddenException('You cannot edit this project');
    }

    return this.projectsService.updateProject(id, data);
  }
}

