import { Controller, Patch, Param, Body, ForbiddenException } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { PermissionsService } from './permissions.service';



@Controller('projects')
export class ProjectsController {
  constructor(
    private projectsService: ProjectsService,
    private permissionsService: PermissionsService
  ) {}

  @Patch(':id')
  async updateProject(@Param('id') id: number, @Body() data: any, @Body('member') member: any) {
    if (!this.permissionsService.canEditProject(member)) {
      throw new ForbiddenException('You cannot edit this project');
    }

    return this.projectsService.updateProject(id, data);
  }
}
