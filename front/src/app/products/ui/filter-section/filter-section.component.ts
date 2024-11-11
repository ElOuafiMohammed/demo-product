import { Component, Output, EventEmitter } from '@angular/core';
import {ToastModule} from "primeng/toast";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {DataViewModule} from "primeng/dataview";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {ProductFormComponent} from "../product-form/product-form.component";

@Component({
  selector: 'app-filter-section',
  templateUrl: './filter-section.component.html',
  styleUrls: ['./filter-section.component.scss'],
  standalone: true,
  imports: [ToastModule, FormsModule, CommonModule, DataViewModule, CardModule, ButtonModule, DialogModule, ProductFormComponent],
})
export class FilterSectionComponent {
  @Output() filterChanged = new EventEmitter<{
    nameOrCategory: string;
    price: number | null;
    quantity: number | null;
    inventoryStatus: string | null;
  }>();

  filterNameOrCategory: string = '';
  filterPrice: number | null = null;
  filterQuantity: number | null = null;
  filterInventoryStatus: string | null = null;

  onFilterChange() {
    this.filterChanged.emit({
      nameOrCategory: this.filterNameOrCategory,
      price: this.filterPrice,
      quantity: this.filterQuantity,
      inventoryStatus: this.filterInventoryStatus
    });
  }
}
