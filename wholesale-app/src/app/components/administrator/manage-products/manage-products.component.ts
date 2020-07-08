import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent implements OnInit {

  constructor() { }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = ['position', 'name', 'image', 'description', 'price', 'producer', 'date', 'edit', 'delete'];
  dataSource = new MatTableDataSource();
  isLoading: boolean;

  filterData(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  getProducts() {
    this.isLoading = true;
    // CALL API TODO
    // if (res.success) {
    //   this.isLoading = false;
    // }
    //
  }

  ngOnInit(): void {
    this.getProducts();
    this.dataSource.sort = this.sort;
  }

}
