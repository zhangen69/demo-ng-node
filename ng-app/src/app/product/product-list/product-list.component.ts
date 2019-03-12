import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:3000/service/product').subscribe((res: any) => {
      console.log(res);
      this.products = res.data;
    });
  }

}
