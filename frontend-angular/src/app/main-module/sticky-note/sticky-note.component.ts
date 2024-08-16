import { OnInit } from '@angular/core';
import { Component, EventEmitter, Output } from '@angular/core';
import { ClientNotes } from 'src/app/Modals/client-notes';
import { HttpserviceService } from 'src/app/services/httpservice.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-sticky-note',
  templateUrl: './sticky-note.component.html',
  styleUrls: ['./sticky-note.component.css']
})
export class StickyNoteComponent implements OnInit {
  validationMessage: any;
  clientdto: ClientNotes = new ClientNotes();
  clients: any[] = [];
  constructor(private httpservice: HttpserviceService,private localStorageService: LocalStorageService) { }

  ngOnInit(): void 
  {
    const savedNote = this.localStorageService.getItem('stickyNote');
    console.log(savedNote)
    if (savedNote) {
      this.clientdto.clientEmail = savedNote.clientEmail || '';
      this.clientdto.clientNote = savedNote.clientNote || '';
    }
    this.extractEmails()
  }
  @Output() close = new EventEmitter<void>();

  extractEmails()
  {
    this.httpservice.getData("http://127.0.0.1:8077/api/showclientEmails").subscribe((item: any) => {
      this.clients = item.aaData;
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
  closeNote() {
    this.localStorageService.setItem('stickyNote', this.clientdto);
    this.close.emit();
  }

  sendNote() {
    this.localStorageService.setItem('stickyNote', this.clientdto);
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
  onNameChange(selectedEmail: string) {
    this.clientdto.clientEmail = selectedEmail;
  }

}
