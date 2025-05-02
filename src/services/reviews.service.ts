import { IReviews } from "../models/interfaces/reviews.interface";
import { BaseService } from "./base/base.service";
import { IReviewsService } from "./interface/i.reviews.service";
import { ReviewsModel } from "../models/reviews.model";

class ReviewsService
  extends BaseService<IReviews>
  implements IReviewsService<IReviews>
{
  constructor() {
    super(ReviewsModel);
  }

  async getReviewsByProductId(id: string): Promise<any> {
    return this.model.find({ reviewsableId: id });
  }
}

export const reviewsService = new ReviewsService();
