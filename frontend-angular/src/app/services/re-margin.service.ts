import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReMarginService {
  private marginSource = new Subject<{ top: string, left: string }>();
  margin$ = this.marginSource.asObservable();

  changeMargin(top: string, left: string) {
    this.marginSource.next({ top, left });
  }
  
}
