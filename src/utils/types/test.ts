export interface ITestInput<T> {
  meta: {
    title: string;
    expected: any;
  };
  data: T;
}
