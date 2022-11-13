import { RoleExistGuard } from './role-exist.guard';

describe('RoleExistGuard', () => {
  it('should be defined', () => {
    expect(new RoleExistGuard()).toBeDefined();
  });
});
