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
    const selectedFile = event.target.files[0];
    this.addProductForm.get('productImage').setValue(selectedFile);
  }

  addProduct() {
    this.addProductErrors = [];
    if (this.addProductForm.controls.name.invalid || this.addProductForm.controls.description.invalid ||
        this.addProductForm.controls.price.invalid || this.addProductForm.controls.producer.invalid) {
      this.addProductErrors.push('Uzupełnij wymagane pola');
    }
    if (!this.addProductForm.controls.productImage.value) {
      this.addProductErrors.push('Nie dodano zdjęcia');
    }
    if (this.addProductErrors.length > 0) {
      let height = 380;
      const errHeight = 24;
      height = height + (errHeight * this.addProductErrors.length);
      const newHeight = String(height);
      this.dialogRef.updateSize('550px', newHeight + 'px');
    } else {
      this.dialogRef.updateSize('550px', '380px');
    }
    if (this.addProductForm.valid && this.addProductErrors.length === 0) {
      const formData = new FormData();
      if (!this.isEdit) {
        formData.append('productImage', this.addProductForm.get('productImage').value);
        formData.append('name', this.addProductForm.controls.name.value);
        formData.append('description', this.addProductForm.controls.description.value);
        formData.append('price', this.addProductForm.controls.price.value);
        formData.append('producer', this.addProductForm.controls.producer.value);
        formData.append('createdDate', String(Date.now()));
      } else {
        formData.append('id', this.data._id);
        formData.append('rev', this.data._rev);
        formData.append('productImage', this.addProductForm.get('productImage').value);
        formData.append('name', this.addProductForm.controls.name.value);
        formData.append('description', this.addProductForm.controls.description.value);
        formData.append('price', this.addProductForm.controls.price.value);
        formData.append('producer', this.addProductForm.controls.producer.value);
        formData.append('createdDate', String(Date.now()));
      }
      this.dialogRef.close(formData);
    }
  }

  ngOnInit(): void {
    console.log('data:', this.data)
    if (this.isEdit) {
      this.addProductForm = this.fb.group({
        name: [this.data.name, Validators.required],
        description: [this.data.description, Validators.required],
        productImage: [undefined, Validators.required], // TODO IMAGE
        price: [this.data.price, Validators.required],
        producer: [this.data.producer, Validators.required],
      });
    } else {
      this.addProductForm = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        productImage: [undefined, Validators.required],
        price: ['', Validators.required],
        producer: ['', Validators.required],
      });
    }
  }

}
