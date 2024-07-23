import { Component, OnInit } from '@angular/core';
import { ColorChangeService } from 'src/app/services/color-change.service';

@Component({
  selector: 'app-color-box-autumn-right',
  templateUrl: './color-box-autumn-right.component.html',
  styleUrls: ['./color-box-autumn-right.component.css']
})
export class ColorBoxAutumnRightComponent implements OnInit {
  changeColor(color: string): void {
    this.colorChangeService.updateBackgroundColor(color);
  }

  constructor(private colorChangeService: ColorChangeService) { }

  ngOnInit(): void {
  }

}
