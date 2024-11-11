import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { DialogModule } from 'primeng/dialog';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Product} from "../../../products/data-access/product.model";
import {CartService} from "../../../products/data-access/cart.service";


@Component({
  selector: "app-cart-dialog",
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, DialogModule],
})
export class CartDialogComponent {
  @Input() selectedProducts: Product[] = [];
  @Input() isVisible: boolean = false;
  @Output() visibilityChange = new EventEmitter<boolean>();
  @Output() updateQuantity = new EventEmitter<{ productId: number, quantity: number }>();
  @Output() removeProduct = new EventEmitter<number>();

  constructor(private cartService: CartService) {}

  closeDialog() {
    this.visibilityChange.emit(false);
  }

  onQuantityChange(update: { productId: number, quantity: number }) {
    this.updateQuantity.emit(update);
  }

  onRemoveProduct(productId: number) {
    this.removeProduct.emit(productId);
  }

  get totalCost(): number {
    return this.selectedProducts.reduce((total, product) => total + (product.price * product.quantity), 0);
  }
}
