import { Component, OnInit } from '@angular/core';
import { ClientDTO } from 'src/app/Modals/client-dto';
import { HttpserviceService } from 'src/app/services/httpservice.service';
import Swal from 'sweetalert2'
declare var $: any;
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {
  clientdto: ClientDTO = new ClientDTO();
  onFileSelected($event: any) {
    throw new Error('Method not implemented.');
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
  regDTO: any;
  validationMessage: any;
  register() {
    console.log(this.clientdto)
    this.httpservice.postdata("http://localhost:8077/api/addclientdetails", this.clientdto).subscribe((item: any) => {
      if (item.body == "SUCCESS") {
        Swal.fire({
          background: "#2ecc71",
          color: "#fff",
          toast: true,
          position: "center",
          showConfirmButton: false,
          timer: 2000,
          icon: "success",
          title: "Added Succesfully",
          iconColor: "#fff"
        })
        this.clear()
      }
      else {
        if (item.details) 
        {
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
            title: "item.body",
            iconColor: "#fff"
          })
        }
        else
        {
          Swal.fire({
            background: "red",
            color: "#fff",
            toast: true,
            position: "center",
            showConfirmButton: false,
            timer: 2000,
            icon: "error",
            title: item.body,
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

  constructor(private httpservice: HttpserviceService) { }

  ngOnInit(): void {
    this.validationMessage = {};
  }



}
