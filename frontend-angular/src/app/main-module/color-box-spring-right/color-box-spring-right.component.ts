import { Component, OnInit } from '@angular/core';
import { ColorChangeService } from 'src/app/services/color-change.service';

@Component({
  selector: 'app-color-box-spring-right',
  templateUrl: './color-box-spring-right.component.html',
  styleUrls: ['./color-box-spring-right.component.css']
})
export class ColorBoxSpringRightComponent implements OnInit {
  changeColor(color: string): void {
    this.colorChangeService.updateBackgroundColor(color);
  }

  constructor(private colorChangeService: ColorChangeService) { }

  ngOnInit(): void {
  }

}
