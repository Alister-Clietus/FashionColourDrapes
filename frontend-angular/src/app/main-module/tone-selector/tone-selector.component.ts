import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { DressVisibilityService } from 'src/app/services/dress-visibility.service';
import html2canvas from 'html2canvas';
import { SharedService } from 'src/app/services/shared.service';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-tone-selector',
  templateUrl: './tone-selector.component.html',
  styleUrls: ['./tone-selector.component.css']
})
export class ToneSelectorComponent implements OnInit {
  @ViewChild('flexContainer') flexContainer: ElementRef;
  @ViewChild('dress') dress: ElementRef;

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
    this.subscription = this.sharedService.notifyObservable$
    .pipe(
      debounceTime(5000) // Wait for 5 seconds before observing the next event
    )
    .subscribe(() => {
      console.log("Observed the flag button");
      this.captureScreen();
    });
    this.subscription = this.sharedService.notifyObservableTakeScreenshot$.subscribe(() => {
      this.takescreenhot();
    });
    
  }
  
  takescreenhot() {
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
    console.log("Capturing Occuring")
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
          console.log("Paased to setscreenshot function")
          this.sharedService.setScreenshot(blob);
        }
      });
    });
  }

}
