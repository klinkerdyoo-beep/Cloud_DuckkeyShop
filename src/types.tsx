export interface Product {
    productID: string;
    productName: string;
    price: number;
    description?: string;
    size?: string;
    material?: string;
    imgURL?: string;
}
export interface ProductFull extends Product {
    addedDate: string;
    updatedDate: string;
    stock: Number;
    is_available: Boolean;
}

export interface CartItem extends Product {
    product_id: string;
    custom_product_id?: string;
    quantities: number;
    customValue?: string;
}

export interface CustomProductInput {
  profile: string;
  keyColor: string;
  textColor: string;
  customText: string;
  notes?: string;
  customImage?: File | null;
}