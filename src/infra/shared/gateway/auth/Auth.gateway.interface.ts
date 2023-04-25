export interface IAuthGateway<T> {
  verifyToken(token: string): Promise<T>;
}
