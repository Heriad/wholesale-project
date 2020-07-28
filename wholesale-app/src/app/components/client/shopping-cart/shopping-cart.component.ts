import { ShoppingCart } from './../../../models/product.model';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  shoppingCart: Array<ShoppingCart>;
  displayedColumns: string[] = ['image', 'name', 'unitPrice', 'price', 'quantity', 'delete'];
  dataSource = new MatTableDataSource();

  constructor() { }

  ngOnInit(): void {
    this.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) !== null ? JSON.parse(localStorage.getItem('shoppingCart')) : [];
    console.log(this.shoppingCart);
  }

}
