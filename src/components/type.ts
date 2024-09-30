
export interface Category {
  _id: string;
  name: string;
}

 export interface ViewProductDetailsProps {
  product: Product;
  onClose: () => void;
}

export interface Product {
  _id: string;
  name: string;
  description?: string;
  specification?: string;
  brand: string;
  mrp: number;
  price: number;
  discount: number;
  details: string;
  category: Category| string;
  inStock: boolean;
  isAvailable: boolean;
  likes: number;
  image: File | null | string;
}


export interface CreateProductFormProps {
  productId?: string;
  existingProduct?: Product;
  onClose: () => void;
  onCreate: (product: Product) => void;
}

export interface CategoryDropdownProps {
  selectedCategory: string;
  onCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}