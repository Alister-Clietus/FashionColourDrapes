import { Component, OnInit } from '@angular/core';
import { ColorChangeService } from 'src/app/services/color-change.service';

@Component({
  selector: 'app-color-box-spring-left',
  templateUrl: './color-box-spring-left.component.html',
  styleUrls: ['./color-box-spring-left.component.css']
})
export class ColorBoxSpringLeftComponent implements OnInit {
  changeColor(color: string): void {
    this.colorChangeService.updateBackgroundColor(color);
  }

  constructor(private colorChangeService: ColorChangeService) { }

  ngOnInit(): void {
  }

}
