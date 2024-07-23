import { OnInit } from '@angular/core';
import { Component, EventEmitter, Output } from '@angular/core';
import { ClientNotes } from 'src/app/Modals/client-notes';
import { HttpserviceService } from 'src/app/services/httpservice.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-sticky-note',
  templateUrl: './sticky-note.component.html',
  styleUrls: ['./sticky-note.component.css']
})
export class StickyNoteComponent implements OnInit {
  validationMessage: any;
  clientdto: ClientNotes = new ClientNotes();
  constructor(private httpservice: HttpserviceService) { }

  ngOnInit(): void {
  }
  @Output() close = new EventEmitter<void>();

  closeNote() {
    this.close.emit();
  }

  sendNote() {
    this.httpservice.postdata("http://localhost:8077/api/addnote", this.clientdto).subscribe((item: any) => {
      if (item.body == "SUCCESS") 
      {
        Swal.fire({
          background: "#2ecc71",
          color: "#fff",
          toast: true,
          position: "top-right",
          showConfirmButton: false,
          timer: 2000,
          icon: "success",
          title: item.body,
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
            title: item.body,
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
