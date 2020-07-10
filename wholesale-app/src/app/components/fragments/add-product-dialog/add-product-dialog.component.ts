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

  onFileSelected(event) {
    console.log(event)
    const selectedFile = event.target.files[0];
    this.addProductForm.get('productImage').setValue(selectedFile);
  }

  addProduct() {
    const formData = new FormData();
    formData.append('productImage', this.addProductForm.get('productImage').value);
    formData.append('name', this.addProductForm.controls.name.value);
    formData.append('description', this.addProductForm.controls.description.value);
    formData.append('price', this.addProductForm.controls.price.value);
    formData.append('producer', this.addProductForm.controls.producer.value);
    formData.append('createdDate', String(Date.now()));
    // const product: Product = {
    //   name: this.addProductForm.controls.name.value,
    //   description: this.addProductForm.controls.description.value,
    //   image: this.addProductForm.controls.image.value,
    //   price: this.addProductForm.controls.price.value,
    //   producer: this.addProductForm.controls.producer.value,
    //   createdDate: Date.now()
    // };
    this.dialogRef.close(formData);
  }

  ngOnInit(): void {
    if (this.isEdit) {

    } else {
      this.addProductForm = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        productImage: ['', Validators.required],
        price: ['', Validators.required],
        producer: ['', Validators.required],
      });
    }
  }

}
