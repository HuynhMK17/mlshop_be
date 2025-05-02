import express from "express";
import { BaseController } from "./base/base.controller";
import { IReviews } from "../models/interfaces/reviews.interface";
import { IReviewsController } from "./interface/i.reviews.controller";
import { reviewsService } from "../services/reviews.service";

class ReviewsController
  extends BaseController<IReviews>
  implements IReviewsController<IReviews>
{
  constructor() {
    super(reviewsService);
  }

  async getReviewsByProductId(
    req: express.Request,
    res: express.Response
  ): Promise<any> {
    try {
      const { id } = req.params;
      console.log(id);
      const reviews = await this.service.getReviewsByProductId(id);
      return res.status(200).json(reviews);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ error: e.message });
    }
  }
}

export const reviewsController = new ReviewsController();
