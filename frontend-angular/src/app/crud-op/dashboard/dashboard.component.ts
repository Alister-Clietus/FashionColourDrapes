import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientDTO } from 'src/app/Modals/client-dto';
import { IdDTO } from 'src/app/Modals/id-dto';
import { HttpserviceService } from 'src/app/services/httpservice.service';
import Swal from 'sweetalert2'

declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit 
{
  constructor(private router: Router,private httpservice: HttpserviceService) { }
  profileid: any;
  selectedid: string;
  static obj: DashboardComponent;
  iTotalDisplayRecords: any
  userDatatable: any;
  selectedFile: File;
  iddto: IdDTO = new IdDTO();
  ngOnInit(): void 
  {

    DashboardComponent.obj = this;
    this.getUserssearch();
  }

  add() 
  {
    this.router.navigate(['./crud/adduser'],{skipLocationChange:true});
  }

  search() 
  {
    this.userDatatable.draw();
  }

  remove() 
  {
    if (this.userDatatable.rows('.selected').data().length == 0) {
      Swal.fire({
        background: "#2ecc71",
        color: "#fff",
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 2000,
        icon: "warning",
        title: "Record Not Selected",
        iconColor: "#fff"
      });
    } else if (this.userDatatable.rows('.selected').data().length > 1) {
      Swal.fire({
        background: "#2ecc71",
        color: "#fff",
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 2000,
        icon: "warning",
        title: "Multiple Rows Selected",
        iconColor: "#fff"
      });
    }
    else{
  this.iddto.clientEmail=this.profileid
      this.httpservice.postdata("http://localhost:8077/api/deleteclientdetails", this.iddto).subscribe((item: any) => {
        if (item.body == "DELETED") {
          Swal.fire({
            background: "#2ecc71",
            color: "#fff",
            toast: true,
            position: "center",
            showConfirmButton: false,
            timer: 2000,
            icon: "success",
            title: "Deleted Succesfully",
            iconColor: "#fff"
          })
          this.userDatatable.draw();
        }
        else {
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

  update() 
  {
    if (this.userDatatable.rows('.selected').data().length == 0) {
      Swal.fire({
        background: "#2ecc71",
        color: "#fff",
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 2000,
        icon: "warning",
        title: "Record Not Selected",
        iconColor: "#fff"
      });
    } else if (this.userDatatable.rows('.selected').data().length > 1) {
      Swal.fire({
        background: "#2ecc71",
        color: "#fff",
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 2000,
        icon: "warning",
        title: "Multiple Rows Selected",
        iconColor: "#fff"
      });
    }
    else{
      this.profileid = this.userDatatable.rows('.selected').data()[0].EMAIL;
      this.selectedid=window.btoa(this.profileid);
      let selectedUserName = window.btoa(this.profileid);
      this.router.navigate(["./crud/client/" + selectedUserName], { skipLocationChange: true });

      }
  }

  getUserssearch() 
  {
    this.userDatatable = $('#clientdata').DataTable({
      scrollY: '220px',
      scrollCollapse: true,
      "bProcessing": false,
      "bDeferRender": true,
      "ordering": false,
      bAutoWidth: false,
      bServerSide: true,
      sAjaxSource: "http://localhost:8077/api/search",
      "iDisplayLength": 10,
      "aLengthMenu": [[10, 25, 50, 100], [10, 25, 50, 100]],
      "sPaginationType": "full_numbers",
      "paging": true,
      "fnServerParams": function (aoData) {
        var dataString = DashboardComponent.obj.getSearchInputs();
        aoData.push({ name: "searchParam", value: dataString });
      },
      "fnRowCallback": (nRow, aData, iDisplayIndex, iDisplayIndexFull) => {
        $(nRow).on('click', (event) => {
          this.profileid = aData.EMAIL; // Store the ID of the clicked row
          $(nRow).toggleClass('selected');
        }).on('dblclick', (event) => {
          const userId = aData.EMAIL;
          this.selectedid=window.btoa(userId);
          let selectedUserName = window.btoa(userId);
          this.router.navigate(["./crud/client/" + selectedUserName], { skipLocationChange: true });
        });
      },
      "fnServerData": (sSource, aoData, fnCallback, oSettings) => {
        oSettings.jqXHR = $.ajax({
          "dataType": 'json',
          "type": "GET",
          "url": sSource,
          "data": aoData,
          "success": (data) => { 
            this.iTotalDisplayRecords=data.iTotalDisplayRecords;
            fnCallback(data);
          },
          "error": (e) => {
            if (e.status == "403" || e.status == "401") {
              // Handle error
            }
          }
        });
      },
      "sDom": "<rt><'row border-top pt-2'<'col-sm-12 col-md-5'l><'col-sm-12 col-md-7'p>>",
      "aoColumns": [
        { "mDataProp": "ID", "bSortable": false,"sTitle": "CLIENT ID" },
        { "mDataProp": "NAME", "bSortable": false,"sTitle": " CLIENT NAME" },
        { "mDataProp": "PHONENUMBER", "bSortable": false,"sTitle": "PHONENUMBER" },
        { "mDataProp": "ADDRESS", "bSortable": false,"sTitle": "ADDRESS" },
        { "mDataProp": "EMAIL", "bSortable": false,"sTitle": "EMAIL" },
        
      ]
    });
  }

  // getUsers() 
  // {
  //   this.userDatatable = $('#clientdata').DataTable({
  //     scrollY: '220px',
  //     scrollCollapse: true,
  //     "bProcessing": false,
  //     "bDeferRender": true,
  //     "ordering": false,
  //     bAutoWidth: false,
  //     bServerSide: true,
  //     sAjaxSource: "http://localhost:8077/api/showclientdetails",
  //     "iDisplayLength": 10,
  //     "aLengthMenu": [[10, 25, 50, 100], [10, 25, 50, 100]],
  //     "sPaginationType": "full_numbers",
  //     "paging": true,
  //     "fnServerParams": function (aoData) {
  //       var dataString = "";
  //       aoData.push({ name: "searchParam", value: dataString });
  //     },
  //     "fnRowCallback": (nRow, aData, iDisplayIndex, iDisplayIndexFull) => {
  //       $(nRow).on('click', (event) => {
  //         this.profileid = aData.EMAIL; // Store the ID of the clicked row
  //         $(nRow).toggleClass('selected');
  //       }).on('dblclick', (event) => {
  //         const userId = aData.EMAIL;
  //         this.selectedid=window.btoa(userId);
  //         let selectedUserName = window.btoa(userId);
  //         this.router.navigate(["./crud/client/" + selectedUserName], { skipLocationChange: true });
  //       });
  //     },
  //     "fnServerData": (sSource, aoData, fnCallback, oSettings) => {
  //       oSettings.jqXHR = $.ajax({
  //         "dataType": 'json',
  //         "type": "GET",
  //         "url": sSource,
  //         "data": aoData,
  //         "success": (data) => { 
  //           this.iTotalDisplayRecords=data.iTotalDisplayRecords;
  //           fnCallback(data);
  //         },
  //         "error": (e) => {
  //           if (e.status == "403" || e.status == "401") {
  //             // Handle error
  //           }
  //         }
  //       });
  //     },
  //     "sDom": "<rt><'row border-top pt-2'<'col-sm-12 col-md-5'l><'col-sm-12 col-md-7'p>>",
  //     "aoColumns": [
  //       { "mDataProp": "ID", "bSortable": false,"sTitle": "CLIENT ID" },
  //       { "mDataProp": "NAME", "bSortable": false,"sTitle": " CLIENT NAME" },
  //       { "mDataProp": "PHONENUMBER", "bSortable": false,"sTitle": "PHONENUMBER" },
  //       { "mDataProp": "ADDRESS", "bSortable": false,"sTitle": "ADDRESS" },
  //       { "mDataProp": "EMAIL", "bSortable": false,"sTitle": "EMAIL" },
        
  //     ]
  //   });
  // }

  onFileSelected(event): void 
  {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void 
    {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      this.httpservice.postdata("http://localhost:8077/api/upload/"+this.profileid,formData).subscribe((item: any)=>
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
  
  clear() {
    $('#Idname').val('');
    $('#IdEmail').val('');
    $('#IdPhonenumber').val('');
    $('#IdGender').val('');
    $('#IdAddress').val('');
    $('#IdPincode').val('');
    this.search()
}

  getSearchInputs() 
  {
    // console.log("entered get user search")
    let details: ClientDTO = new ClientDTO();
    details.clientName = $('#Idname').val();
    // console.log(bookdto.title)
    details.clientEmail = $('#IdEmail').val();
    // console.log(bookdto.author)
    details.clientPhoneNumber = $('#IdPhonenumber').val();
    // console.log(bookdto.isbn)
    details.clientGender = $('#IdGender').val();
      // console.log(bookdto.isbn)
    details.clientAddress = $('#IdAddress').val();
      //  console.log(details.dob)
    details.pincode = $('#IdPincode').val();
    // console.log(bookdto.numberOfPages)
    if (details.clientName == null || details.clientName == undefined) {
      details.clientName = '';
    }
    if (details.clientEmail == null || details.clientEmail == undefined) {
      details.clientEmail = '';
    }
    if (details.clientPhoneNumber == null || details.clientPhoneNumber == undefined) {
      details.clientPhoneNumber = '';
    }
    if (details.clientGender == null || details.clientGender == undefined) {
      details.clientGender = '';
    }
    if (details.clientAddress == null || details.clientAddress == undefined) {
      details.clientAddress = '';
    }
    if (details.pincode == null || details.pincode == undefined) {
      details.pincode = '';
    }

    if (Object.keys(details).length > 0) {
      return JSON.stringify(details);
    }
    return "";
  }

  downloadPDF() {
    if (this.userDatatable.rows('.selected').data().length == 0) {
      Swal.fire({
        background: "#2ecc71",
        color: "#fff",
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 2000,
        icon: "warning",
        title: "Record Not Selected",
        iconColor: "#fff"
      });
    } else if (this.userDatatable.rows('.selected').data().length > 1) {
      Swal.fire({
        background: "#2ecc71",
        color: "#fff",
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 2000,
        icon: "warning",
        title: "Multiple Rows Selected",
        iconColor: "#fff"
      });
    } else {
      this.profileid = this.userDatatable.rows('.selected').data()[0].EMAIL;
      this.iddto.clientEmail=this.profileid
      this.httpservice.downloadPdf("http://localhost:8077/api/generatepdf", this.iddto).subscribe({
        next: (response: Blob) => {
          // Directly use the response as a Blob
          if (response && response.type === 'application/pdf') {
            const url = window.URL.createObjectURL(response);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'client-details.pdf';
            document.body.appendChild(a); // Append to body to ensure the click works
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a); // Clean up after download
          } else {
            Swal.fire({
              background: "#f3fa59",
              toast: true,
              position: "center",
              showConfirmButton: false,
              timer: 2000,
              icon: "warning",
              title: "Unexpected response type",
              iconColor: "red"
            });
          }
        },
        error: (error) => {
          if (error.status === 400) {
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
              html: msg,
              iconColor: "red"
            });
          } else {
            Swal.fire({
              background: "#f3fa59",
              toast: true,
              position: "center",
              showConfirmButton: false,
              timer: 2000,
              icon: "error",
              title: "An unexpected error occurred",
              iconColor: "red"
            });
          }
        }
      });
    }
  }

  // onDownload() {
  //   this.profileid = window.btoa(this.userDatatable.rows('.selected').data()[0].EMAIL);
  //   console.log(this.profileid)
  //   this.httpservice.downloadPdf("http://localhost:8077/api/generatepdf", this.profileid).subscribe(response => {
  //     const base64Data = response['pdf'];
  //     const pdfData = atob(base64Data); // Decode base64 string
  //     const byteArray = new Uint8Array(pdfData.length);

  //     for (let i = 0; i < pdfData.length; i++) {
  //       byteArray[i] = pdfData.charCodeAt(i);
  //     }

  //     const blob = new Blob([byteArray], { type: 'application/pdf' });
  //     const url = window.URL.createObjectURL(blob);
  //     const a = document.createElement('a');
  //     a.href = url;
  //     a.download = 'client-details.pdf';
  //     a.click();
  //     window.URL.revokeObjectURL(url);
  //   });
  // }

}
