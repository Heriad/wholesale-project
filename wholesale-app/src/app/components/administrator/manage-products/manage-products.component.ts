import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiUrlsService } from './../../../services/api-urls.service';
import { GetProductsResponse, ApiResponse } from 'src/app/models/response.model';
import { ErrorsHandlerService } from './../../../services/errors-handler.service';
import { AddProductDialogComponent } from './../../fragments/add-product-dialog/add-product-dialog.component';
import { ConfirmationDialogComponent } from './../../fragments/confirmation-dialog/confirmation-dialog.component';
import { ImagePreviewDialogComponent } from './../../fragments/image-preview-dialog/image-preview-dialog.component';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  isLoading: boolean;

  dataSource = new MatTableDataSource();

  displayedColumns: string[] = ['position', 'name', 'image', 'description', 'price', 'producer', 'date', 'edit', 'delete'];

  constructor(public api: ApiUrlsService, public dialogService: MatDialog, private domSanitizer: DomSanitizer,
              public errHandler: ErrorsHandlerService) { }

  filterData(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  addProduct() {
    const dialogRef = this.dialogService.open((AddProductDialogComponent), {
      width: '550px',
      disableClose: true
    });
    dialogRef.componentInstance.title = 'Dodaj produkt';
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.api.createProduct(result).subscribe((res: ApiResponse) => {
          if (res.success) {
            this.getProducts();
          }
        });
      }
    });
  }

  editProduct(element) {
    const dialogRef = this.dialogService.open((AddProductDialogComponent), {
      width: '550px',
      disableClose: true,
      data: element
    });
    dialogRef.componentInstance.title = 'Edytuj produkt';
    dialogRef.componentInstance.isEdit = true;
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.api.updateProduct(result).subscribe((res: ApiResponse) => {
          if (res.success) {
            this.getProducts();
          }
        });
      }
    });
  }

  removeProduct(element) {
    const dialogRef = this.dialogService.open((ConfirmationDialogComponent), {
      width: '500px',
      disableClose: true,
    });
    dialogRef.componentInstance.title = 'Potwierdź';
    dialogRef.componentInstance.content = 'Czy jesteś pewny? Potwierdzenie spowoduje usunięcie produktu: ' + element.name;
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.api.removeProduct(element._id).subscribe((res: ApiResponse) => {
          if (res.success) {
            this.getProducts();
          }
        });
      }
    });
  }

  getProducts() {
    this.isLoading = true;
    this.api.getProducts().subscribe((res: GetProductsResponse) => {
      if (res.success) {
        this.dataSource.data = res.data;
        this.dataSource.data.forEach((el: any, index) => {
          el.position = index + 1;
          el.image = this.domSanitizer.bypassSecurityTrustUrl('data:image/*;base64,' + el._attachments.productImage.buffer);
        });
      }
      this.isLoading = false;
    }, () => {
      const errorBar = this.errHandler.openErrorBar('Wystąpił błąd');
      errorBar.onAction().subscribe(() => {
        this.ngOnInit();
      });
    });
  }

  imagePreview(image) {
    const dialogRef = this.dialogService.open((ImagePreviewDialogComponent), {
      disableClose: true
    });
    dialogRef.componentInstance.image = image;
  }

  ngOnInit(): void {
    this.getProducts();
    this.dataSource.sort = this.sort;
  }

}
