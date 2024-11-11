import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'app/products/data-access/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private selectedProductsSubject = new BehaviorSubject<Product[]>([]);
  selectedProducts$ = this.selectedProductsSubject.asObservable();

  // Add product to the cart
  addProduct(product: Product) {
    const currentProducts = this.selectedProductsSubject.value;
    const existingProductIndex = currentProducts.findIndex(p => p.id === product.id);

    if (existingProductIndex !== -1) {
      // If the product is already in the cart, update its quantity
      const updatedProducts = [...currentProducts];
      updatedProducts[existingProductIndex].quantity += product.quantity;
      this.selectedProductsSubject.next(updatedProducts);
    } else {
      // Otherwise, add the product with the specified quantity
      const updatedProducts = [...currentProducts, product];
      this.selectedProductsSubject.next(updatedProducts);
    }

  }

  updateProductQuantity(productId: number, quantity: number) {
    const currentProducts = this.selectedProductsSubject.value;
    const existingProductIndex = currentProducts.findIndex(p => p.id === productId);

    if (existingProductIndex !== -1) {
      // If the product exists, update its quantity
      const updatedProducts = [...currentProducts];
      if (quantity <= 0) {
        // If quantity is 0 or less, remove the product
        updatedProducts.splice(existingProductIndex, 1);
      } else {
        // Otherwise, update the product's quantity
        updatedProducts[existingProductIndex].quantity = quantity;
      }
      this.selectedProductsSubject.next(updatedProducts);
    }
  }
  
  // Remove product from the cart by ID
  removeProduct(productId: number) {
    const currentProducts = this.selectedProductsSubject.value.filter(p => p.id !== productId);
    this.selectedProductsSubject.next(currentProducts);
  }
}
