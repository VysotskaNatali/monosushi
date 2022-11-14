import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

public menu = false;

  constructor() { }

  ngOnInit(): void {
  }
  menuPop():void{
    this.menu = !this.menu;

  }
 

}
