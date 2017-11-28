import { FileSizePipe } from './bytes-to-larger.pipe';

describe('BytesToLargerPipe', () => {
  it('create an instance', () => {
    const pipe = new FileSizePipe();
    expect(pipe).toBeTruthy();
  });
});
