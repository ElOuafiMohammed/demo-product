import { Component, OnInit, inject, signal } from "@angular/core";
import { Product } from "app/products/data-access/product.model";
import { ProductsService } from "app/products/data-access/products.service";
import { ProductFormComponent } from "app/products/ui/product-form/product-form.component";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import {CommonModule} from "@angular/common";
import {CartService} from "../../data-access/cart.service";
import {FormsModule} from "@angular/forms";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";

const emptyProduct: Product = {
  id: 0,
  code: "",
  name: "",
  description: "",
  image: "",
  category: "",
  price: 0,
  quantity: 0,
  internalReference: "",
  shellId: 0,
  inventoryStatus: "INSTOCK",
  rating: 0,
  createdAt: 0,
  updatedAt: 0,
};

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  standalone: true,
  imports: [ToastModule, FormsModule, CommonModule, DataViewModule, CardModule, ButtonModule, DialogModule, ProductFormComponent],
})
export class ProductListComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly messageService = inject(MessageService);  // Inject MessageService

  public readonly products = this.productsService.products;
  public readonly editedProduct = signal<Product>(emptyProduct);

  public isDialogVisible = false;
  public isCreation = false;
  // Quantity dialog state
  public isQuantityDialogVisible = false;
  public selectedProduct: Product | null = null;
  public quantity: number = 1;  // Default quantity

  // Filter text and pagination
  public filterNameOrCategory: string = '';
  public filterPrice: number | null = null;
  public filterQuantity: number | null = null;
  public filterInventoryStatus: string | null = null;
  public pageSize: number = 10;
  public first: number = 0;

  ngOnInit() {
    this.productsService.get().subscribe();
  }


  get filteredProducts(): Product[] {
    const filter = this.filterNameOrCategory.toLowerCase();

    return this.products().filter(product => {
      // Filter by name or category
      const matchesText = product.name.toLowerCase().includes(filter) || product.category.toLowerCase().includes(filter);

      // Filter by price
      const matchesPrice = this.filterPrice === null || product.price >= this.filterPrice;

      // Filter by quantity
      const matchesQuantity = this.filterQuantity === null || product.quantity >= this.filterQuantity;


      // Filter by inventory status
      const matchesInventoryStatus = !this.filterInventoryStatus || product.inventoryStatus === this.filterInventoryStatus;

      return matchesText && matchesPrice && matchesQuantity && matchesInventoryStatus;
    });
  }

  // Pagination change event handler
  onPageChange(event: any) {
    this.first = event.first;
    this.pageSize = event.rows;
  }

  // To track items efficiently in the list view
  trackByFn(index: number, product: Product): number {
    return product.id;
  }

  public onCreate() {
    this.isCreation = true;
    this.isDialogVisible = true;
    this.editedProduct.set(emptyProduct);
  }

  public openQuantityDialog(product: Product) {
    this.selectedProduct = product;
    this.quantity = 1;  // Default quantity to 1
    this.isQuantityDialogVisible = true;
  }

  public confirmAddToCart() {
    if (this.selectedProduct) {
      // Check if the selected quantity is greater than the available stock
      if (this.quantity <= this.selectedProduct.quantity) {
        const productToAdd = { ...this.selectedProduct, quantity: this.quantity };
        this.cartService.addProduct(productToAdd);
        this.closeQuantityDialog();
      } else {
        // Show error message if quantity exceeds available stock
        this.messageService.add({
          severity: 'error',
          summary: 'Quantité Insuffisante',
          detail: `Quantité demandée dépasse le stock disponible. Stock actuel: ${this.selectedProduct.quantity}`,
        });      }
    }
  }
  public closeQuantityDialog() {
    this.isQuantityDialogVisible = false;
  }
  public onUpdate(product: Product) {
    this.isCreation = false;
    this.isDialogVisible = true;
    this.editedProduct.set(product);
  }

  public onDelete(product: Product) {
    this.cartService.removeProduct(product.id);

    this.productsService.delete(product.id).subscribe(() => {
    }, error => {
      console.error('Failed to delete product:', error);
    });
  }

  public onSave(product: Product) {
    if (this.isCreation) {
      this.productsService.create(product).subscribe();
    } else {
      this.productsService.update(product).subscribe();
    }
    this.closeDialog();
  }

  public onCancel() {
    this.closeDialog();
  }

  private closeDialog() {
    this.isDialogVisible = false;
  }
}
