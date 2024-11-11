import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'app/products/data-access/product.model';
import {FilterSectionComponent} from "../filter-section/filter-section.component";
import {ToastModule} from "primeng/toast";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {DataViewModule} from "primeng/dataview";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {ProductFormComponent} from "../product-form/product-form.component";

@Component({
  selector: 'app-quantity-dialog',
  templateUrl: './quantity-dialog.component.html',
  styleUrls: ['./quantity-dialog.component.scss'],
  standalone: true,
  imports: [FormsModule,CardModule, ButtonModule, DialogModule],

})
export class QuantityDialogComponent {
  @Input() isVisible: boolean = false;
  @Input() selectedProduct: Product | null = null;
  @Input() quantity: number = 1;

  @Output() confirm = new EventEmitter<Product>();
  @Output() cancel = new EventEmitter<void>();

  confirmAddToCart() {
    if (this.selectedProduct && this.quantity <= this.selectedProduct.quantity) {
      this.confirm.emit({ ...this.selectedProduct, quantity: this.quantity });
    } else if (this.selectedProduct) {
      alert(`Quantité demandée dépasse le stock disponible. Stock actuel: ${this.selectedProduct.quantity}`);
    }
  }

  closeDialog() {
    this.cancel.emit();
  }
}
