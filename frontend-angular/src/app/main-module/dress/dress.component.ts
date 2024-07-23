import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ColorChangeService } from 'src/app/services/color-change.service';
import { ReMarginService } from 'src/app/services/re-margin.service';

@Component({
  selector: 'app-dress',
  templateUrl: './dress.component.html',
  styleUrls: ['./dress.component.css']
})
export class DressComponent implements OnInit {

  private tshirt: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2, private colorChangeService: ColorChangeService, private remarginservice: ReMarginService) { }

  ngOnInit(): void {
    this.tshirt = this.el.nativeElement.querySelector('.tshirt');
    this.renderer.listen(this.tshirt, 'mousedown', (event) => this.onMouseDown(event));

    const handles = this.el.nativeElement.querySelectorAll('.resize-handle');
    handles.forEach(handle => {
      this.renderer.listen(handle, 'mousedown', (event) => this.onResizeMouseDown(event, handle));
    });

    this.remarginservice.margin$.subscribe(margin => {
      this.changeMargin(margin.top, margin.left);
    });

    // Subscribe to background color changes
    this.colorChangeService.backgroundColor$.subscribe(color => {
      this.changeColor(color);
    });

    // Subscribe to background color changes
  }

  changeColor(color: string): void {
    this.tshirt.style.backgroundColor = color;
  }

  changeMargin(top: string, left: string): void {
    this.tshirt.style.top = top;
    this.tshirt.style.left = left;
    console.log("Function is colled")
  }

  onMouseDown(event: MouseEvent): void {
    event.preventDefault();

    const shiftX = event.clientX - this.tshirt.getBoundingClientRect().left;
    const shiftY = event.clientY - this.tshirt.getBoundingClientRect().top;

    const onMouseMove = (moveEvent: MouseEvent) => {
      this.tshirt.style.left = moveEvent.pageX - shiftX + 'px';
      this.tshirt.style.top = moveEvent.pageY - shiftY + 'px';
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  onResizeMouseDown(event: MouseEvent, handle: HTMLElement): void {
    event.preventDefault();
    event.stopPropagation();

    const rect = this.tshirt.getBoundingClientRect();

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (handle.classList.contains('top-left')) {
        const newWidth = rect.right - moveEvent.pageX;
        const newHeight = rect.bottom - moveEvent.pageY;
        if (newWidth > 50) {
          this.tshirt.style.width = newWidth + 'px';
          this.tshirt.style.left = moveEvent.pageX + 'px';
        }
        if (newHeight > 50) {
          this.tshirt.style.height = newHeight + 'px';
          this.tshirt.style.top = moveEvent.pageY + 'px';
        }
      } else if (handle.classList.contains('top-right')) {
        const newWidth = moveEvent.pageX - rect.left;
        const newHeight = rect.bottom - moveEvent.pageY;
        if (newWidth > 50) {
          this.tshirt.style.width = newWidth + 'px';
        }
        if (newHeight > 50) {
          this.tshirt.style.height = newHeight + 'px';
          this.tshirt.style.top = moveEvent.pageY + 'px';
        }
      } else if (handle.classList.contains('bottom-left')) {
        const newWidth = rect.right - moveEvent.pageX;
        const newHeight = moveEvent.pageY - rect.top;
        if (newWidth > 50) {
          this.tshirt.style.width = newWidth + 'px';
          this.tshirt.style.left = moveEvent.pageX + 'px';
        }
        if (newHeight > 50) {
          this.tshirt.style.height = newHeight + 'px';
        }
      } else if (handle.classList.contains('bottom-right')) {
        const newWidth = moveEvent.pageX - rect.left;
        const newHeight = moveEvent.pageY - rect.top;
        if (newWidth > 50) {
          this.tshirt.style.width = newWidth + 'px';
        }
        if (newHeight > 50) {
          this.tshirt.style.height = newHeight + 'px';
        }
      }
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

}
