import { Component, OnInit } from '@angular/core';
import { ColorChangeService } from 'src/app/services/color-change.service';

@Component({
  selector: 'app-color-box',
  templateUrl: './color-box.component.html',
  styleUrls: ['./color-box.component.css']
})
export class ColorBoxComponent implements OnInit {

  constructor(private colorChangeService: ColorChangeService) {}

  ngOnInit(): void {
  }
  changeColor(color: string): void {
    this.colorChangeService.updateBackgroundColor(color);
  }

}
