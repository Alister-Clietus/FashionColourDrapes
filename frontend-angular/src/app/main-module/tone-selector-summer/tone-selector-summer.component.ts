import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import { DressVisibilityService } from 'src/app/services/dress-visibility.service';
import { SharedService } from 'src/app/services/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tone-selector-summer',
  templateUrl: './tone-selector-summer.component.html',
  styleUrls: ['./tone-selector-summer.component.css']
})
export class ToneSelectorSummerComponent implements OnInit {

  constructor(private visibilityservice:DressVisibilityService,private sharedService: SharedService) { }
  private subscription: Subscription;
  isVisible: boolean = false;
  showStickyNote = false;
  ngOnInit(): void 
  {
    this.visibilityservice.isVisible$.subscribe((visible) => {
      this.isVisible = visible;
    });
    this.visibilityservice.isVisibleSticky$.subscribe((visible) => {
      this.showStickyNote = visible;
    });
    this.subscription = this.sharedService.notifyObservable$.subscribe(() => {
      this.captureScreen();
    });
    this.subscription = this.sharedService.notifyObservableTakeScreenshot$.subscribe(() => {
      this.takeScreenshot();
    });
  }

  takeScreenshot() {
    const element = document.querySelector('span') as HTMLElement;
    const padding = 400; // Adjust this value to eliminate portions from the left and right sides
    const paddingVertical = 150;

    html2canvas(element, {
      scrollX: 0,
      scrollY: -window.scrollY,
      width: element.offsetWidth - 2 * padding,
      height: element.offsetHeight - 2 * paddingVertical,
      x: padding,
      y: paddingVertical,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'screenshot.png';
      link.click();
    });
  }

  captureScreen() {
    const element = document.querySelector('span') as HTMLElement;
    const padding = 400;
    const paddingVertical = 150;

    html2canvas(element, {
      scrollX: 0,
      scrollY: -window.scrollY,
      width: element.offsetWidth - 2 * padding,
      height: element.offsetHeight - 2 * paddingVertical,
      x: padding,
      y: paddingVertical,
    }).then((canvas) => {
      canvas.toBlob(blob => {
        if (blob) {
          this.sharedService.setScreenshot(blob);
        }
      });
    });
  }

}
