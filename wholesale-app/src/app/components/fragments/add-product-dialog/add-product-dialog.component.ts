import { Product } from './../../../models/product.model';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.scss']
})
export class AddProductDialogComponent implements OnInit {

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddProductDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  @Input() title: string;
  @Input() text: string;
  @Input() isEdit: boolean;

  addProductForm: FormGroup;
  addProductErrors: Array<string> = [];

  addProduct() {
    const product: Product = {
      name: this.addProductForm.controls.name.value,
      description: this.addProductForm.controls.description.value,
      image: this.addProductForm.controls.image.value,
      price: this.addProductForm.controls.price.value,
      producer: this.addProductForm.controls.producer.value,
      timestamp: Date.now()
    };
    console.log('Produkt: ', product);
  }

  ngOnInit(): void {
    if (this.isEdit) {

    } else {
      this.addProductForm = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        image: ['', Validators.required],
        price: ['', Validators.required],
        producer: ['', Validators.required],
      });
    }
  }

}
