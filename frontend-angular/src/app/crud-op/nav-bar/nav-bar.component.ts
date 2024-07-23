import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
isSidebarOpen: any;
openSettings() {
  this.router.navigate(['./crud/settings'],{skipLocationChange:true});
}
listQuestions() {
throw new Error('Method not implemented.');
}
uploadFile() {
throw new Error('Method not implemented.');
}
downloadFile() {
throw new Error('Method not implemented.');
}
viewCodeBase() {
  this.router.navigate(['./main/toneselector'],{skipLocationChange:true});
}
showDress() {
  this.router.navigate(['./crud/dresscolor'],{skipLocationChange:true});
}
addClient() {
  this.router.navigate(['./crud/adduser'],{skipLocationChange:true});
}
listUsers() {
  this.router.navigate(['./crud/userlist'],{skipLocationChange:true});
}
goToDashboard() {
  this.router.navigate(['./crud'],{skipLocationChange:true});
}
toggleSidebar() {
throw new Error('Method not implemented.');
}
logout() {
throw new Error('Method not implemented.');
}

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
