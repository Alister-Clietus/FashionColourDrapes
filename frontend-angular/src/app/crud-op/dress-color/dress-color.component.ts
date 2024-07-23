import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dress-color',
  templateUrl: './dress-color.component.html',
  styleUrls: ['./dress-color.component.css']
})
export class DressColorComponent implements OnInit {
gotoDressSelectorSummer() {
  this.router.navigate(['../main/summer'],{skipLocationChange:true});
}
gotoDressSelectorWinter() {
  this.router.navigate(['../main/winter'],{skipLocationChange:true});
}
gotoDressSelectorSpring() {
  this.router.navigate(['../main/spring'],{skipLocationChange:true});
}
gotoDressSelectorAutumn() {
  this.router.navigate(['../main/autumn'],{skipLocationChange:true});
}

  constructor(private router: Router) 
  {

   }

  ngOnInit(): void {
  }

}
