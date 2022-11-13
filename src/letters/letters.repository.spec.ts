import { LettersRepository } from './letters.repository';

describe('LettersRepository', () => {
  it('should be defined', () => {
    expect(new LettersRepository()).toBeDefined();
  });
});
