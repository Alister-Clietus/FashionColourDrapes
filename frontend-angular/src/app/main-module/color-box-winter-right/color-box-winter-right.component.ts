import { Component, OnInit } from '@angular/core';
import { ColorChangeService } from 'src/app/services/color-change.service';

@Component({
  selector: 'app-color-box-winter-right',
  templateUrl: './color-box-winter-right.component.html',
  styleUrls: ['./color-box-winter-right.component.css']
})
export class ColorBoxWinterRightComponent implements OnInit {
  changeColor(color: string): void {
    this.colorChangeService.updateBackgroundColor(color);
  }

  constructor(private colorChangeService: ColorChangeService) { }

  ngOnInit(): void {
  }

}
