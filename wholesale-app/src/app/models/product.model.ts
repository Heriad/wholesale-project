export class Product {
  name: string;
  description: string;
  productImage: File;
  price: number;
  producer: string;
  createdDate: number;
}

export class UpdatedProduct {
  id: string;
  rev: string;
  name: string;
  description: string;
  productImage: File;
  price: number;
  producer: string;
  createdDate: number;
}
