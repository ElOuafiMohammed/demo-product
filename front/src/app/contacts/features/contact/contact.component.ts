import { Component} from "@angular/core";
import { ProductFormComponent } from "app/products/ui/product-form/product-form.component";
import { ButtonModule } from "primeng/button";
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import {CommonModule} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";


@Component({
  selector: "app-product-list",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, DataViewModule, ButtonModule, DialogModule, ProductFormComponent],
})
export class ContactComponent {
  contactForm: FormGroup;
  successMessage = '';

  constructor() {
    this.contactForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', [Validators.required, Validators.maxLength(300)])
    });
  }


  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Form submitted', this.contactForm.value);
      this.successMessage = 'Demande de contact envoyée avec succès.';
      this.contactForm.reset();  // Reset after submission
    }
  }

  get isEmailInvalid(): boolean {
    const control = this.contactForm.get('email');
    return (control?.invalid && control?.touched) ?? false;
  }

  get isMessageInvalid(): boolean {
    const control = this.contactForm.get('message');
    return (control?.invalid && control?.touched) ?? false;
  }
}
