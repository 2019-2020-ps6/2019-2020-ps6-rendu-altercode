import {AfterViewInit, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public user;

  @Input() admin: boolean;

  constructor() {
    this.user = localStorage.getItem('user');
  }


  ngOnInit() {
    this.printSpace();
  }


  printSpace() {
    document.getElementById('space').innerText = 'Espace '.concat((this.admin) ? 'encadrant' : 'patient');
  }
}
