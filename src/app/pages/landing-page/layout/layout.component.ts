import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LandingLayoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
 
    document.body.classList.remove('bg-account-pages');
    document.body.classList.remove('py-4');
    document.body.classList.remove('py-sm-0');


    document.getElementById('theme_id').classList.add('theme-blue');
  }
}
