import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { PermissionsService } from './permissions.service';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, PermissionsService],
  exports: [ProjectsService, PermissionsService],
})
export class ProjectsModule {}
