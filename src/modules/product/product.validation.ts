export interface ProductRequest {
  category: string;
  name: string;
  quantity: string;
  purity: string;
  price: number;
  old_price: number;
  image?: string;
}

export const productValidation = {
  validateCreateProduct(data: any): { valid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};

    if (!data.category?.trim()) errors.category = "Category is required";
    if (!data.name?.trim()) errors.name = "Product name is required";
    if (!data.quantity?.trim()) errors.quantity = "Quantity is required";
    if (!data.purity?.trim()) errors.purity = "Purity is required";

    const price = Number(data.price);
    const oldPrice = data.old_price ? Number(data.old_price) : null;

    if (isNaN(price) || price <= 0) {
      errors.price = "Price must be a positive number";
    }
    
    if (oldPrice !== null) {
      if (isNaN(oldPrice) || oldPrice <= 0) {
        errors.old_price = "Old price must be a positive number if provided";
      } else if (price > oldPrice) {
        errors.price = "Current price should not be greater than old price";
      }
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors,
    };
  },

  validateUpdateProduct(data: any): { valid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};
    if (data.price !== undefined && (isNaN(Number(data.price)) || Number(data.price) <= 0)) {
      errors.price = "Price must be a positive number";
    }
    return {
      valid: Object.keys(errors).length === 0,
      errors,
    };
  }
};