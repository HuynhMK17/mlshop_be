export interface IReviews extends Document {
  reviewsableId: string;
  reviewsableType: string;
  customerId: string;
  content: string;
  rating: number;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
