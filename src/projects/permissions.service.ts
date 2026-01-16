import { Injectable } from '@nestjs/common';
import { ProjectMember } from './project-member.entity';

@Injectable()
export class PermissionsService {
  canEditProject(member: ProjectMember): boolean {
    return member.canEdit;
  }

  canDeleteProject(member: ProjectMember): boolean {
    return member.canDelete;
  }

  canManageMembers(member: ProjectMember): boolean {
    return member.canManageMembers;
  }
}
