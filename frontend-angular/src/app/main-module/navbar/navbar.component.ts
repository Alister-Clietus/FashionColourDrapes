import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
dashboard() {
  this.router.navigate(['./crud/dresscolor'],{skipLocationChange:true});
}
logout() {
  this.router.navigate(['./crud'],{skipLocationChange:true});
}

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  autumnDrapes()
  {
    this.router.navigate(['../main/autumn'],{skipLocationChange:true});
  }
  springDrapes()
  {
    this.router.navigate(['../main/spring'],{skipLocationChange:true});
  }
  summerDrapes()
  {
    this.router.navigate(['../main/summer'],{skipLocationChange:true});
  }
  winterDrapes()
  {
    this.router.navigate(['../main/winter'],{skipLocationChange:true});
  }
  Drapes()
  {
    this.router.navigate(['../main/toneselector'],{skipLocationChange:true});
  }

}
