import {Component, Input, Output, EventEmitter, inject} from '@angular/core';
import { Product } from 'app/products/data-access/product.model';
import {FormsModule} from "@angular/forms";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-quantity-dialog',
  templateUrl: './quantity-dialog.component.html',
  styleUrls: ['./quantity-dialog.component.scss'],
  standalone: true,
  imports: [FormsModule,CardModule, ButtonModule, DialogModule],

})
export class QuantityDialogComponent {
  private readonly messageService = inject(MessageService);
  @Input() isVisible: boolean = false;
  @Input() selectedProduct: Product | null = null;
  @Input() quantity: number = 1;

  @Output() confirm = new EventEmitter<Product>();
  @Output() cancel = new EventEmitter<void>();

  confirmAddToCart() {
    if (this.selectedProduct && this.quantity <= this.selectedProduct.quantity) {
      this.confirm.emit({ ...this.selectedProduct, quantity: this.quantity });
      this.quantity = 1;
    } else if (this.selectedProduct) {
      this.messageService.add({ severity: 'error', summary: 'Produit ajouté', detail: `Quantité demandée dépasse le stock disponible. Stock actuel: ${this.selectedProduct.quantity}` });
    }
  }

  closeDialog() {
    this.cancel.emit();
  }
}
