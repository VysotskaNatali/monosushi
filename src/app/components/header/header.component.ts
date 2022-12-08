import { Component, OnInit } from '@angular/core';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public headerCategory: Array<ICategoryResponse> = [];
  public menu = false;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategory();
  }
  menuPop(): void {
    this.menu = !this.menu;
  }
  loadCategory(): void {
    this.categoryService.getAll().subscribe((data) => {
      this.headerCategory = data;
    });
  }
}
