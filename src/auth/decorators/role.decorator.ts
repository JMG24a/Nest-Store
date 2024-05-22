import { SetMetadata } from '@nestjs/common';
// my dependencies
import { Role } from '../models/roles.model';

export const ROLES_KEY = 'ROLES';
export const Roles = (roles: Role[]) => SetMetadata(ROLES_KEY, roles);
