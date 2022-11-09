import { ReadUsersPermissionGuard } from './read-users-permission.guard';

describe('ReadUsersPermissionGuard', () => {
  it('should be defined', () => {
    expect(new ReadUsersPermissionGuard()).toBeDefined();
  });
});
