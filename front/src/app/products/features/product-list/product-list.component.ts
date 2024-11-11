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
import {FilterSectionComponent} from "../../ui/filter-section/filter-section.component";
import {QuantityDialogComponent} from "../../ui/quantity-dialog/quantity-dialog.component";

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
  imports: [FilterSectionComponent, QuantityDialogComponent, ToastModule, FormsModule, CommonModule, DataViewModule, CardModule, ButtonModule, DialogModule, ProductFormComponent],
})
export class ProductListComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly messageService = inject(MessageService);

  public readonly products = this.productsService.products;
  public readonly editedProduct = signal<Product>(emptyProduct);

  public isDialogVisible = false;
  public isCreation = false;
  public isQuantityDialogVisible = false;
  public selectedProduct: Product | null = null;
  public quantity: number = 1;

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
      const matchesText = product.name.toLowerCase().includes(filter) || product.category.toLowerCase().includes(filter);
      const matchesPrice = this.filterPrice === null || product.price >= this.filterPrice;
      const matchesQuantity = this.filterQuantity === null || product.quantity >= this.filterQuantity;
      const matchesInventoryStatus = !this.filterInventoryStatus || product.inventoryStatus === this.filterInventoryStatus;
      return matchesText && matchesPrice && matchesQuantity && matchesInventoryStatus;
    });
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.pageSize = event.rows;
  }

  trackByFn(index: number, product: Product): number {
    return product.id;
  }
  public onSave(product: Product) {
    if (this.isCreation) {
      this.productsService.create(product).subscribe();
    } else {
      this.productsService.update(product).subscribe();
    }
    this.closeDialog();
  }
  private closeDialog() {
    this.isDialogVisible = false;
  }
  public onCancel() {
    this.closeDialog();
  }
  public onCreate() {
    this.isCreation = true;
    this.isDialogVisible = true;
    this.editedProduct.set(emptyProduct);
  }

  public onUpdate(product: Product) {
    this.isCreation = false;
    this.isDialogVisible = true;
    this.editedProduct.set(product);
  }

  public onDelete(product: Product) {
    this.cartService.removeProduct(product.id); // Remove product from cart first

    this.productsService.delete(product.id).subscribe(() => {
      // Optionally, you can add a success message here or any additional logic
    }, error => {
      console.error('Failed to delete product:', error);
    });
  }
  public openQuantityDialog(product: Product) {
    this.selectedProduct = product;
    this.quantity = 1;  // Default quantity to 1
    this.isQuantityDialogVisible = true;
  }

  public handleQuantityDialogConfirm(product: Product) {
    this.cartService.addToCart(product);
    this.messageService.add({ severity: 'success', summary: 'Produit ajouté', detail: `${product.name} ajouté au panier avec ${product.quantity} articles` });
    this.isQuantityDialogVisible = false;
  }

  public handleQuantityDialogCancel() {
    this.isQuantityDialogVisible = false;
  }

  public onFilterChange(filter: {
    nameOrCategory: string;
    price: number | null;
    quantity: number | null;
    inventoryStatus: string | null;
  }) {
    this.filterNameOrCategory = filter.nameOrCategory;
    this.filterPrice = filter.price;
    this.filterQuantity = filter.quantity;
    this.filterInventoryStatus = filter.inventoryStatus;
  }
}
