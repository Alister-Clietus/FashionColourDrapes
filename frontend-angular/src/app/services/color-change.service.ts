import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorChangeService {
  private backgroundColorSubject = new BehaviorSubject<string>('lightgreen');
  backgroundColor$ = this.backgroundColorSubject.asObservable();

  updateBackgroundColor(color: string) {
    this.backgroundColorSubject.next(color);
  }
}
