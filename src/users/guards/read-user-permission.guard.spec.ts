import { ReadUserPermissionGuard } from './read-user-permission.guard';

describe('ReadUserPermissionGuard', () => {
  it('should be defined', () => {
    expect(new ReadUserPermissionGuard()).toBeDefined();
  });
});
