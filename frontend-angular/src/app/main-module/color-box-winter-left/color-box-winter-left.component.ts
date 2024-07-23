import { Component, OnInit } from '@angular/core';
import { ColorChangeService } from 'src/app/services/color-change.service';

@Component({
  selector: 'app-color-box-winter-left',
  templateUrl: './color-box-winter-left.component.html',
  styleUrls: ['./color-box-winter-left.component.css']
})
export class ColorBoxWinterLeftComponent implements OnInit {
  changeColor(color: string): void {
    this.colorChangeService.updateBackgroundColor(color);
  }

  constructor(private colorChangeService: ColorChangeService) { }

  ngOnInit(): void {
  }

}
