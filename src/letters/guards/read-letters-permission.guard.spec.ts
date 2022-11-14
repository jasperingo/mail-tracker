import { ReadLettersPermissionGuard } from './read-letters-permission.guard';

describe('ReadLettersPermissionGuard', () => {
  it('should be defined', () => {
    expect(new ReadLettersPermissionGuard()).toBeDefined();
  });
});
