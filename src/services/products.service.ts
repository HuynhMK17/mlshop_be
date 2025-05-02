import {
  CommentSchema,
  IProduct,
} from "../models/interfaces/product.interface";
import { ProductModel } from "../models/product.model";
import { BaseService } from "./base/base.service";
import { IProductService, PaginatedProductsResponse } from "./interface/i.products.service";

class ProductService
  extends BaseService<IProduct>
  implements IProductService<IProduct>
{
  constructor() {
    super(ProductModel);
  }
  async getByPagination(
    page: number,
    limit: number
  ): Promise<PaginatedProductsResponse> {
    // Đảm bảo page và limit là số dương hợp lệ
    const pageNumber = Math.max(1, page);
    const limitNumber = Math.max(1, limit);

    const skip = (pageNumber - 1) * limitNumber;

    // Thực hiện 2 query song song để lấy dữ liệu và tổng số lượng
    // 1. Lấy dữ liệu cho trang hiện tại
    // 2. Đếm tổng số document khớp (trong trường hợp này là tất cả)
    const [products, totalItems] = await Promise.all([
      ProductModel.find()
        // Thêm sắp xếp để đảm bảo thứ tự nhất quán giữa các trang
        // Ví dụ: sắp xếp theo ngày tạo mới nhất
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNumber)
        .exec(), // .exec() để trả về Promise đúng chuẩn
      ProductModel.countDocuments().exec(), // Đếm tổng số sản phẩm
    ]);

    // Tính toán tổng số trang
    const totalPages = Math.ceil(totalItems / limitNumber);

    // Trả về đối tượng có cấu trúc chuẩn cho phân trang
    return {
      data: products,
      meta: {
        currentPage: pageNumber,
        totalPages: totalPages,
        totalItems: totalItems,
        itemsPerPage: limitNumber,
      },
    };
  }
  async getProductsByCategory(category: string): Promise<IProduct[] | null> {
    return await ProductModel.find({ category: category });
  }

  async getProductsByIds(ids: string[]): Promise<IProduct[]> {
    return await ProductModel.find({
      _id: { $in: ids },
    });
  }
  async getProductsByPriceRange(
    minPrice: number,
    maxPrice: number
  ): Promise<IProduct[] | null> {
    return await ProductModel.find({
      price: { $gte: minPrice, $lte: maxPrice },
    });
  }
  async getProductsByBusinessesId(
    businessesId: string
  ): Promise<IProduct[] | null> {
    return await ProductModel.find({ businessesId: businessesId });
  }
  async postComment(
    productId: string,
    customerComment: typeof CommentSchema
  ): Promise<any> {
    const product = await ProductModel.findById(productId);

    if (!product) {
      throw new Error("Product not found");
    }
    product.comments.push(customerComment);

    await product.save();

    return product;
  }
  async deleteComment(productId: string, commentId: string): Promise<any> {
    const product = await ProductModel.findById(productId);

    if (!product) {
      throw new Error("Product not found");
    }
    product.comments = product.comments.filter(
      (comment: any) => comment?._id.toString() !== commentId
    );

    await product.save();

    return product;
  }
}

export const productService = new ProductService();
