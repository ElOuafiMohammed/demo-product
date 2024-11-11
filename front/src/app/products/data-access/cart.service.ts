import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'app/products/data-access/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private selectedProductsSubject = new BehaviorSubject<Product[]>([]);
  selectedProducts$ = this.selectedProductsSubject.asObservable();

  addToCart(product: Product) {
    const currentProducts = this.selectedProductsSubject.value;
    const existingProductIndex = currentProducts.findIndex(p => p.id === product.id);

    if (existingProductIndex !== -1) {
      const updatedProducts = [...currentProducts];
      updatedProducts[existingProductIndex].quantity += product.quantity;
      this.selectedProductsSubject.next(updatedProducts);
    } else {
      const updatedProducts = [...currentProducts, product];
      this.selectedProductsSubject.next(updatedProducts);
    }

  }

  updateProductQuantity(productId: number, quantity: number) {
    const currentProducts = this.selectedProductsSubject.value;
    const existingProductIndex = currentProducts.findIndex(p => p.id === productId);

    if (existingProductIndex !== -1) {
      const updatedProducts = [...currentProducts];
      if (quantity <= 0) {
        updatedProducts.splice(existingProductIndex, 1);
      } else {
        updatedProducts[existingProductIndex].quantity = quantity;
      }
      this.selectedProductsSubject.next(updatedProducts);
    }
  }

  removeProduct(productId: number) {
    const currentProducts = this.selectedProductsSubject.value.filter(p => p.id !== productId);
    this.selectedProductsSubject.next(currentProducts);
  }
}
