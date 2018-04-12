export interface Article {
  id?: string;
  title: string;
  description: string;
  image: string;
  body: string;
  tags: string[];
  createdAt: Date;
  author: string;
}
