import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public hide = false;

  constructor() { }

  ngOnInit(): void {
  }
  hideText():void{
    this.hide = !this.hide;
    console.log();
    
  }

}
