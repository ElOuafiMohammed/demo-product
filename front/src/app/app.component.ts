import {
  Component,
} from "@angular/core";
import { RouterModule } from "@angular/router";
import { SplitterModule } from 'primeng/splitter';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelMenuComponent } from "./shared/ui/panel-menu/panel-menu.component";
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
  imports: [FormsModule,ButtonModule, DialogModule, CommonModule, RouterModule, SplitterModule, ToolbarModule, PanelMenuComponent],
})
export class AppComponent {
  title = "ALTEN SHOP";
  cartProductCount = 0;
  selectedProducts: Product[] = []; // Array to store selected products
  isCartVisible = false; // To toggle cart visibility

  constructor(private cartService: CartService) {
    // Subscribe to the cart products
    this.cartService.selectedProducts$.subscribe(products => {
      this.selectedProducts = products;
      this.cartProductCount = products.length; // Update cart count
    });
  }

  // Toggle the visibility of the cart (modal or section)
  toggleCart() {
    this.isCartVisible = !this.isCartVisible;
  }

  // Remove a product from the cart
  removeProductFromCart(productId: number) {
    this.cartService.removeProduct(productId); // Remove from cart service
  }

  // Update product quantity
  updateQuantity(productId: number, quantity: number) {
    this.cartService.updateProductQuantity(productId, quantity);
  }
  // Calculate the total cost
  get totalCost(): number {
    return this.selectedProducts.reduce((total, product) => {
      return total + (product.price * product.quantity);
    }, 0);
  }
}
