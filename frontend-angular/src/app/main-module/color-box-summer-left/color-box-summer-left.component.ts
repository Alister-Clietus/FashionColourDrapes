import { Component, OnInit } from '@angular/core';
import { ColorChangeService } from 'src/app/services/color-change.service';

@Component({
  selector: 'app-color-box-summer-left',
  templateUrl: './color-box-summer-left.component.html',
  styleUrls: ['./color-box-summer-left.component.css']
})
export class ColorBoxSummerLeftComponent implements OnInit {
  changeColor(color: string): void {
    this.colorChangeService.updateBackgroundColor(color);
  }

  constructor(private colorChangeService: ColorChangeService) { }

  ngOnInit(): void {
  }

}
