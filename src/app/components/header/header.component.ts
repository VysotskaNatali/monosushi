import { Component, OnInit } from '@angular/core';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public headerCategory: Array<ICategoryResponse> = [];
  public menu = false;
  public basketArray: Array<IProductResponse> = [];
  public total = 0;
  public countBasket = 0;
  public openBasket = false;

  constructor(
    private categoryService: CategoryService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.loadCategory();
    this.loadBasket();
    this.updateBasket();
  }
  menuPop(): void {
    this.menu = !this.menu;
  }
  loadCategory(): void {
    this.categoryService.getAll().subscribe((data) => {
      this.headerCategory = data;
    });
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basketArray = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
  }

  getTotalPrice(): void {
    this.total = this.basketArray.reduce(
      (total: number, prod: IProductResponse) =>
        total + prod.count * prod.price,0);
    this.countBasket = this.basketArray.length;
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    });
  }

  basketToggle(): void {
    this.openBasket = !this.openBasket;
  }

  productCount(product: IProductResponse, value: boolean): void {
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
  }

  order(): void {
    this.openBasket = false;
  }
}
