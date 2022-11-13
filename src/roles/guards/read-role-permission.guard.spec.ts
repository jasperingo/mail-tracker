import { ReadRolePermissionGuard } from './read-role-permission.guard';

describe('ReadRolePermissionGuard', () => {
  it('should be defined', () => {
    expect(new ReadRolePermissionGuard()).toBeDefined();
  });
});
