import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-error-access',
  templateUrl: './error-access.component.html',
  styleUrls: ['./error-access.component.scss']
})
export class ErrorAccessComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    setTimeout( () => {
      this.router.navigate(['/home'])
    }, 5000);
  }

}
