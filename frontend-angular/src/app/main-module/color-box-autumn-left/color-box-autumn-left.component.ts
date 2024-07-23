import { Component, OnInit } from '@angular/core';
import { ColorChangeService } from 'src/app/services/color-change.service';

@Component({
  selector: 'app-color-box-autumn-left',
  templateUrl: './color-box-autumn-left.component.html',
  styleUrls: ['./color-box-autumn-left.component.css']
})
export class ColorBoxAutumnLeftComponent implements OnInit {
  changeColor(color: string): void {
    this.colorChangeService.updateBackgroundColor(color);
  }

  constructor(private colorChangeService: ColorChangeService) { }

  ngOnInit(): void {
  }

}
