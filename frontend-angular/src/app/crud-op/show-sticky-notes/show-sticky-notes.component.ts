import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from 'src/app/services/httpservice.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-show-sticky-notes',
  templateUrl: './show-sticky-notes.component.html',
  styleUrls: ['./show-sticky-notes.component.css']
})
export class ShowStickyNotesComponent implements OnInit {
clients: any[] = [];
  constructor(private httpservice: HttpserviceService) { }

  ngOnInit(): void {
    this.extractNotes()
  }

  extractNotes()
  {
    this.httpservice.getData("http://127.0.0.1:8077/api/showclientNotes").subscribe((item: any) => {
      this.clients = item.aaData;
      console.log(this.clients)
      if (item.aaData) 
        {
          Swal.fire({
            background: "#2ecc71",
            color: "#fff",
            toast: true,
            position: "top-right",
            showConfirmButton: false,
            timer: 1000,
            icon: "success",
            title: "Email Get Request Success",
            iconColor: "#fff"
          })
        }
        else 
        {
  
            Swal.fire({
              background: "red",
              color: "#fff",
              toast: true,
              position: "top-right",
              showConfirmButton: false,
              timer: 2000,
              icon: "error",
              title: " Email Get Request Failure",
              iconColor: "#fff"
            })
          
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
