import { DateFormatPipe } from './date-format.pipe';
import { DateConstants } from 'utils/date-constants';

describe('DateFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new DateFormatPipe(DateConstants.DATE_FMT);
    expect(pipe).toBeTruthy();
  });
});
