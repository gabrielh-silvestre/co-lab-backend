export interface ITestInput<T> {
  meta: {
    title: string;
    expected: string;
  };
  data: T;
}
