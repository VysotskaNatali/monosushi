import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {

  public product!: IProductResponse;

  constructor( 
     private activatedRoute: ActivatedRoute,
     private productService: ProductService
     ) { }

  ngOnInit(): void {
    this.loadOneProduct();
  }

  loadOneProduct(): void {
    const PRODUCT_ID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.productService.getOne(PRODUCT_ID).subscribe(data => {
       this.product = data;   
    })
  }

}
