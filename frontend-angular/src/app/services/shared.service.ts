import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private notify = new Subject<void>();

  notifyObservable$ = this.notify.asObservable();

  private notifyTakeScreenshot = new Subject<void>();

  notifyObservableTakeScreenshot$ = this.notifyTakeScreenshot.asObservable();

  private screenshotSubject = new BehaviorSubject<Blob | null>(null);
  screenshot$ = this.screenshotSubject.asObservable();

  notifyOtherModule() {
    console.log("Gone to notify module")
    this.notify.next();
  }

  notifyOtherModuleTakeScreenshot() {
    this.notifyTakeScreenshot.next();
  }

  setScreenshot(blob: Blob) {
    console.log("Now at setscreenshot function")
    this.screenshotSubject.next(blob);
  }

}
