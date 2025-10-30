export interface User {
  email: string;
  username?: string;
  name: string;
  phone: string;
  gender: string;
  dob: string;
}

export interface Product {
    productID: string;
    productName: string;
    price: number;
    description?: string;
    size?: string;
    material?: string;
    imgURL?: string;
    category_id?: string;
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

export interface Category {
  id: number;
  categoryName: string;
  description?: string;
}

export interface Order {
  id: number;
  name: string;
  email_id: string;
  productName: string;
  quantities: number | string;
  orderStatus: string;
  orderDate: string;
}

export interface OrderFull extends Order {
  totalPrice: string;
  transferSlip?: string;
}
