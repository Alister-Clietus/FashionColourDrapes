import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { DressVisibilityService } from 'src/app/services/dress-visibility.service';
import { ReMarginService } from 'src/app/services/re-margin.service';
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';
import { HttpserviceService } from 'src/app/services/httpservice.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.css']
})
export class PhotoUploadComponent
{

  @ViewChild('imageContainer', { static: false }) imageContainer: ElementRef;
  email: string;
  rgb: string;
  selectedFile: File;
  colorOptions = [
    { name: 'RED1', value: 'red1' },
    { name: 'RED2', value: 'red2' },
    { name: 'RED3', value: 'red3' },
    { name: 'RED4', value: 'red4' },
    { name: 'SILVER', value: 'silver' },
    { name: 'GOLD', value: 'gold' }
  ];
  selectedColor = ''
  constructor(private remarginservice: ReMarginService,private visibilityservice:DressVisibilityService,private httpservice: HttpserviceService,private sharedService: SharedService) { }
  imageSrc: string | ArrayBuffer | null = null;
  imageStyles = {
    top: '0px',
    left: '0px',
    width: '100%',
    height: 'auto'
  };
  top = 0;
  left = 0;
  scale = 1;
  leftmargin: string;
  topmargin: string;

  ngOnInit() {
    this.sharedService.screenshot$.subscribe(blob => {
      console.log("setscreenshot function Paased the blob")
      if (blob) {
        this.flag(blob);
      }
    });
  }

  // flag(): void {
  //   html2canvas(this.imageContainer.nativeElement).then(canvas => {
  //     canvas.toBlob(blob => {
  //       if (blob) {
  //         this.selectedFile = new File([blob], 'screenshot.png', { type: 'image/png' });
  //         const formData = new FormData();
  //         formData.append('file', this.selectedFile);
  //         this.httpservice.postdata(`http://localhost:8077/api/upload/flag/${this.email}/${this.rgb}`, formData).subscribe(
  //           (item: any) => {
  //             if (item.body === "OK") {
  //               Swal.fire({
  //                 background: "#2ecc71",
  //                 color: "#fff",
  //                 toast: true,
  //                 position: "center",
  //                 showConfirmButton: false,
  //                 timer: 2000,
  //                 icon: "success",
  //                 title: "Flagged Successfully",
  //                 iconColor: "#fff"
  //               });
  //             } else {
  //                 Swal.fire({
  //                   background: "#f3fa59",
  //                   toast: true,
  //                   position: "center",
  //                   showConfirmButton: false,
  //                   timer: 2000,
  //                   icon: "warning",
  //                   title: item.body,
  //                   iconColor: "orange"
  //                 });
  //             }
  //           },
  //           error => {
  //             if (error.status === "400") {
  //               let msg = "";
  //               error.error.details.forEach(element => {
  //                 msg += element + "<br>";
  //               });
  //               Swal.fire({
  //                 background: "#f3fa59",
  //                 toast: true,
  //                 position: "center",
  //                 showConfirmButton: false,
  //                 timer: 2000,
  //                 icon: "warning",
  //                 title: "Error",
  //                 iconColor: "red"
  //               });
  //             }
  //           }
  //         );
  //       }
  //     });
  //   });
  //   // this.takeScreenshot() 
  // }

  flag(blob: Blob): void {
    console.log("Flag funtion takes place")
    this.selectedFile = new File([blob], 'screenshot.png', { type: 'image/png' });
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.httpservice.postdata(`http://localhost:8077/api/upload/flag/${this.email}/${this.rgb}`, formData).subscribe(
      (item: any) => {
        if (item.body === "OK") {
          Swal.fire({
            background: "#2ecc71",
            color: "#fff",
            toast: true,
            position: "center",
            showConfirmButton: false,
            timer: 2000,
            icon: "success",
            title: "Flagged Successfully",
            iconColor: "#fff"
          });
        } else {
          Swal.fire({
            background: "#f3fa59",
            toast: true,
            position: "center",
            showConfirmButton: false,
            timer: 2000,
            icon: "warning",
            title: item.body,
            iconColor: "orange"
          });
        }
      },
      error => {
        if (error.status === "400") {
          let msg = "";
          error.error.details.forEach(element => {
            msg += element + "<br>";
          });
          Swal.fire({
            background: "#f3fa59",
            toast: true,
            position: "center",
            showConfirmButton: false,
            timer: 2000,
            icon: "warning",
            title: "Error",
            iconColor: "red"
          });
        }
      }
    );
  }

  onButtonClick() {
    console.log("Flag Button is clicked")
    this.sharedService.notifyOtherModule();
  }

  TakescreenShot() {
    this.sharedService.notifyOtherModuleTakeScreenshot();
  }
  
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file);
    }
  }

  move(direction: string): void {
    const step = 10;
    switch (direction) {
      case 'left':
        this.left -= step;
        break;
      case 'right':
        this.left += step;
        break;
      case 'up':
        this.top -= step;
        break;
      case 'down':
        this.top += step;
        break;
    }
    this.updateStyles();
  }

  zoom(direction: string): void {
    const scaleStep = 0.1;
    if (direction === 'in') {
      this.scale += scaleStep;
    } else {
      this.scale = Math.max(0.1, this.scale - scaleStep);
    }
    this.updateStyles();
  }

  centerAndFit(): void {
    this.top = 0;
    this.left = 0;
    this.scale = 1;
    this.imageStyles = {
      top: '0px',
      left: '0px',
      width: '100%',
      height: 'auto'
    };
  }

  dress(): void 
  {
    this.visibilityservice.showDress();
    Swal.fire({
      background: "yellow",
      color: "black",
      toast: true,
      position: "top-right",
      showConfirmButton: false,
      timer: 2000,
      icon: "success",
      title: "Dress Showing",
      iconColor: "#fff"
    })
  }
  stickyNote() {
    this.visibilityservice.showStickyNote();
    }

  reset(): void 
  {
    this.visibilityservice.hideDress();
    Swal.fire({
      background: "yellow",
      color: "black",
      toast: true,
      position: "top-right",
      showConfirmButton: false,
      timer: 2000,
      icon: "success",
      title: "Dress Removed",
      iconColor: "#fff"
    })

  }

  remove()
  {
      this.imageSrc = '';

    Swal.fire({
      background: "red",
      color: "white",
      toast: true,
      position: "top-right",
      showConfirmButton: false,
      timer: 2000,
      icon: "success",
      title: "Photo Removed Successfully",
      iconColor: "#fff"
    })
  }

  updateStyles(): void {
    this.imageStyles = {
      top: `${this.top}px`,
      left: `${this.left}px`,
      width: `${100 * this.scale}%`,
      height: 'auto'
    };
  }

  takeScreenshot() {
    if (this.imageContainer) {
      html2canvas(this.imageContainer.nativeElement).then(canvas => {
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = 'screenshot.png';
        link.click();
      });
    }
  }

}
