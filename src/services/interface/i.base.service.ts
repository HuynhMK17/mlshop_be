export interface IBaseService<T> {
  create(data: any): Promise<T>;
  update(params: any): Promise<T>;
  delete(params: any): Promise<T>;
  getById(params: any): Promise<T>;
  getAll(params: any): Promise<any>;
}
