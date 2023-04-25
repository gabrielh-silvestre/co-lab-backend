import { CustomException } from '@utils/errors/Custom.exception';

describe('[Utils][Unit] Tests for CustomException', () => {
  class CustomExceptionImp extends CustomException {
    toHttp(): number {
      return 200;
    }
  }

  it('should create a CustomException', () => {
    const customException = new CustomExceptionImp('message');

    expect(customException).toBeInstanceOf(Error);
    expect(customException).toBeInstanceOf(CustomException);

    expect(customException.message).toBe('message');
    expect(customException.stack).not.toContain('Caused by');

    expect(customException.toHttp()).toBe(200);
  });

  it('should create a CustomException with cause', () => {
    const errorMessage = 'Error test cause';
    const cause = new Error(errorMessage);
    const customException = new CustomExceptionImp('message', cause);

    expect(customException.stack).toBeDefined();
    expect(customException.stack).toContain(errorMessage);
  });
});
