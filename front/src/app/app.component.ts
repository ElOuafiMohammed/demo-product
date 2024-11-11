import {
  Component,
} from "@angular/core";
import { RouterModule } from "@angular/router";
import { SplitterModule } from 'primeng/splitter';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelMenuComponent } from "./shared/ui/panel-menu/panel-menu.component";
import { CartDialogComponent } from "./shared/ui/cart/cart-dialog.component";
import { CartService } from "./products/data-access/cart.service";
import { CommonModule } from "@angular/common";
import { Product } from "./products/data-access/product.model";
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import {FormsModule} from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [FormsModule,ButtonModule, DialogModule, CommonModule, RouterModule, SplitterModule, ToolbarModule, PanelMenuComponent, CartDialogComponent],
})
export class AppComponent {
  title = 'ALTEN SHOP';
  cartProductCount = 0;
  selectedProducts: Product[] = [];
  isCartVisible = false;

  constructor(private cartService: CartService) {
    this.cartService.selectedProducts$.subscribe(products => {
      this.selectedProducts = products;
      this.cartProductCount = products.length;
    });
  }


  toggleCart() {
    this.isCartVisible = !this.isCartVisible;
  }

  removeProductFromCart(productId: number) {
    this.cartService.removeProduct(productId);
  }


  updateQuantity({ productId, quantity }: { productId: number, quantity: number }) {
    this.cartService.updateProductQuantity(productId, quantity);
  }

}
