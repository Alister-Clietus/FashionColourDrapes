import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DressVisibilityService {

  private isVisibleSubject = new BehaviorSubject<boolean>(false);
  isVisible$ = this.isVisibleSubject.asObservable();

  private isVisibleSticky = new BehaviorSubject<boolean>(false);
  isVisibleSticky$ = this.isVisibleSticky.asObservable();

  constructor() { }

  showDress() {
    this.isVisibleSubject.next(true);
  }

  hideDress() {
    this.isVisibleSubject.next(false);
  }

  showStickyNote() {
    this.isVisibleSticky.next(true);
  }

}
