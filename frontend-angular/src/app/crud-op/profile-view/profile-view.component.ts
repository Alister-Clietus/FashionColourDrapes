import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientDTO } from 'src/app/Modals/client-dto';
import { IdDTO } from 'src/app/Modals/id-dto';
import { HttpserviceService } from 'src/app/services/httpservice.service';
import Swal from 'sweetalert2'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

declare var $: any;
@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit 
{
downloadClientPdf() {
throw new Error('Method not implemented.');
}
  images: string[] = [];
  imageUrls: any;
  selectedFile: File;
  onFileSelected(event): void 
  {
    this.selectedFile = event.target.files[0];
  }
clientdto: ClientDTO=new ClientDTO();
iddto: IdDTO = new IdDTO();
validationMessage: any;
profileid: string;
  constructor(private route: ActivatedRoute,private httpservice: HttpserviceService,private sanitizer: DomSanitizer) {
    this.profileid = window.atob(this.route.snapshot.paramMap.get('selectedUserName'));
    this.iddto.clientEmail=this.profileid
   }

  ngOnInit(): void 
  {
    this.getData()
    this.getimages()
  }



  getimages()
  {
    this.httpservice.postdata("http://localhost:8077/api/getclientphotos", this.iddto).subscribe((item: any) => {
      const data = item.aaData;
      this.extractImages(data);
      if (item.STATUS == "SUCCESS") 
        {
        Swal.fire({
          background: "#2ecc71",
          color: "#fff",
          toast: true,
          position: "top-right",
          showConfirmButton: false,
          timer: 2000,
          icon: "success",
          title: "Client Data Retrieved Succesfully",
          iconColor: "#fff"
        })

      }
      else {
        if (item.details) {
          item.details.forEach(element => {
            var key = Object.keys(element)[0];
            this.validationMessage[key] = element[key];

          });
          Swal.fire({
            background: "red",
            color: "#fff",
            toast: true,
            position: "center",
            showConfirmButton: false,
            timer: 2000,
            icon: "error",
            title: "Error",
            iconColor: "#fff"
          })
        }
      }
    },
      error => {
        Swal.fire({
          background: "red",
          color: "#fff",
          toast: true,
          position: "center",
          showConfirmButton: false,
          timer: 2000,
          icon: "error",
          title: "Error",
          iconColor: "#fff"
        })
        if (error.status == "400") {
          let msg = "";
          error.error.details.forEach(element => {
            msg = msg + element + "<br>"
          });
        }
      })
  }

  extractImages(data: any) 
  {
    const photoKeys = ['PHOTO1', 'PHOTO2', 'PHOTO3', 'PHOTO4', 'PHOTO5', 'PHOTO6', 'PHOTO7', 'PHOTO8'];
    photoKeys.forEach(key => {
      if (data[key]) {
        this.images.push(`data:image/png;base64,${data[key]}`);
      }
    });
  }

  clear() {
    $("#clientName").val("");
    $("#username").val("");
    $("#clientEmail").val("");
    $("#clientPhoneNumber").val("");
    $("#clientAddress").val("");
    $("#pincode").val("");
    $("#branch").val("");
    $("#ktuid").val("");
    $("#year").val("");

  }
  updatePhoto(): void 
  {
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.httpservice.postdata("http://localhost:8077/api/upload/"+this.iddto.clientEmail,formData).subscribe((item: any)=>
  {
    if (item.body == "OK") 
    {
      Swal.fire({
        background: "#2ecc71",
        color:"#fff",
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 2000,
        icon: "success",
        title: "Uploaded Successfully",
        iconColor: "#fff"
      })
      this.getData()
      this.getimages()
    }
    else 
    {        

      if (item.details) 
      {
        Swal.fire({
          background: "#f3fa59",
          toast: true,
          position: "center",
          showConfirmButton: false,
          timer: 2000,
          icon: "warning",
          title: "Validation Error",
          iconColor: "orange"
        })          
        item.details.forEach(element => 
          {
          var key = Object.keys(element)[0];      
          // this.validationMessage[key] = element[key];
    
        });
      }        
    }
  },
  error=>
  {
    if(error.status == "400")
    {
    let msg = "";
    error.error.details.forEach(element => 
      {
        msg = msg + element + "<br>"
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
      })      
    }
  })

  }
  update() {
    this.httpservice.postdata("http://localhost:8077/api/editclientdetails", this.clientdto).subscribe((item: any) => {
      if (item.body == "SUCCESS") {
        Swal.fire({
          background: "#2ecc71",
          color: "#fff",
          toast: true,
          position: "top-right",
          showConfirmButton: false,
          timer: 2000,
          icon: "success",
          title: "Client Data Updated Succesfully",
          iconColor: "#fff"
        })
        this.getData()
        this.getimages()
      }
      else {
        if (item.details) {
          item.details.forEach(element => {
            var key = Object.keys(element)[0];
            this.validationMessage[key] = element[key];

          });
          Swal.fire({
            background: "red",
            color: "#fff",
            toast: true,
            position: "center",
            showConfirmButton: false,
            timer: 2000,
            icon: "error",
            title: "Error",
            iconColor: "#fff"
          })
        }
      }
    },
      error => {
        Swal.fire({
          background: "red",
          color: "#fff",
          toast: true,
          position: "center",
          showConfirmButton: false,
          timer: 2000,
          icon: "error",
          title: "Error",
          iconColor: "#fff"
        })
        if (error.status == "400") {
          let msg = "";
          error.error.details.forEach(element => {
            msg = msg + element + "<br>"
          });
        }
      })

  }
  base64ToUint8Array(base64: string): Uint8Array {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const uint8Array = new Uint8Array(len);
  
    for (let i = 0; i < len; ++i) {
      uint8Array[i] = binaryString.charCodeAt(i);
    }
  
    return uint8Array;
  }
  convertByteArrayToImage(byteArray: Uint8Array,typeofdata:any) {
    const arrayBufferView = new Uint8Array(byteArray);
    const blob = new Blob([arrayBufferView], { type: typeofdata });
    const urlCreator = window.URL || window.webkitURL;
    const imageUrl = urlCreator.createObjectURL(blob);
    // Assign the imageUrl to an image element in your HTML
    // const imgElement = document.getElementById('imageElement') as HTMLImageElement;
    // imgElement.src = imageUrl;
    const sanitizedUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
    this.imageUrls =sanitizedUrl;
    // this.imageUrls.push(imageUrl);
  }
  
  getData() {
    
    this.httpservice.postdata("http://localhost:8077/api/getclientdetails", this.iddto).subscribe((item: any) => {
      this.clientdto=item.aaData
      this.clientdto.clientName=item.aaData.NAME
      this.clientdto.clientPhoneNumber=item.aaData.PHONENUMBER
      this.clientdto.clientAddress=item.aaData.ADDRESS
      this.clientdto.clientEmail=item.aaData.EMAIL
      this.clientdto.pincode=item.aaData.PINCODE
      this.clientdto.username=item.aaData.USERNAME
      this.clientdto.clientGender=item.aaData.GENDER
      const base64Data = item.aaData.IMAGE;
      console.log(item.PHOTO)
      const byteArray = this.base64ToUint8Array(base64Data);
      this.convertByteArrayToImage(byteArray,item.filetype);
      if (item.STATUS == "SUCCESS") {
        Swal.fire({
          background: "#2ecc71",
          color: "#fff",
          toast: true,
          position: "top-right",
          showConfirmButton: false,
          timer: 2000,
          icon: "success",
          title: "Client Data Retrieved Succesfully",
          iconColor: "#fff"
        })

      }
      else {
        if (item.details) {
          item.details.forEach(element => {
            var key = Object.keys(element)[0];
            this.validationMessage[key] = element[key];

          });
          Swal.fire({
            background: "red",
            color: "#fff",
            toast: true,
            position: "center",
            showConfirmButton: false,
            timer: 2000,
            icon: "error",
            title: "Error",
            iconColor: "#fff"
          })
        }
      }
    },
      error => {
        Swal.fire({
          background: "red",
          color: "#fff",
          toast: true,
          position: "center",
          showConfirmButton: false,
          timer: 2000,
          icon: "error",
          title: "Error",
          iconColor: "#fff"
        })
        if (error.status == "400") {
          let msg = "";
          error.error.details.forEach(element => {
            msg = msg + element + "<br>"
          });
        }
      })

  }

}
