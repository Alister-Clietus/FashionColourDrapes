import { Component, OnInit } from '@angular/core';
import { ColorChangeService } from 'src/app/services/color-change.service';

@Component({
  selector: 'app-color-box-summer-right',
  templateUrl: './color-box-summer-right.component.html',
  styleUrls: ['./color-box-summer-right.component.css']
})
export class ColorBoxSummerRightComponent implements OnInit {
  changeColor(color: string): void {
    this.colorChangeService.updateBackgroundColor(color);
  }

  constructor(private colorChangeService: ColorChangeService) { }

  ngOnInit(): void {
  }

}
