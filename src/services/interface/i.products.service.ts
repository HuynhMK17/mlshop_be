import { CommentSchema, IProduct } from "models/interfaces/product.interface";
import { IBaseService } from "./i.base.service";
export interface PaginatedProductsResponse {
  data: IProduct[]; // Dữ liệu sản phẩm của trang hiện tại
  meta: {
    currentPage: number; // Trang hiện tại
    totalPages: number; // Tổng số trang
    totalItems: number; // Tổng số sản phẩm (khớp với query)
    itemsPerPage: number; // Số lượng item mỗi trang (limit)
  };
}
export interface IProductService<T> extends IBaseService<T> {
  getByPagination(page: number, limit: number): Promise<PaginatedProductsResponse>;
  getProductsByCategory(category: string): Promise<T[]>;
  getProductsByIds(ids: string[]): Promise<T[]>;
  getProductsByPriceRange(minPrice: number, maxPrice: number): Promise<T[]>;
  getProductsByBusinessesId(businessesId: string): Promise<T[]>;
  postComment(
    productId: string,
    customerComment: typeof CommentSchema
  ): Promise<any>;
  deleteComment(productId: string, commentId: string): Promise<any>;
}
