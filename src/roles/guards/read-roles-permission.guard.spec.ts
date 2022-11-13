import { ReadRolesPermissionGuard } from './read-roles-permission.guard';

describe('ReadRolesPermissionGuard', () => {
  it('should be defined', () => {
    expect(new ReadRolesPermissionGuard()).toBeDefined();
  });
});
