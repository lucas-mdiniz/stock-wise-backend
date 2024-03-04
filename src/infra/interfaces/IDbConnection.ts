export interface IDbConnection{
  connect(uri: string): Promise<void>;
}