import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {PopUpDecVerifComponent} from './pop-up-dec.component';

export interface DialogData {
  name: string;
  result: boolean;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private result;

  constructor(public dialog: MatDialog, private router: Router) {
  }

  ngOnInit() {
  }

  openPop(): void {
    const dialogRef = this.dialog.open(PopUpDecVerifComponent, {
      width: '300px',
      data: { }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.result = result;
      this.deconnect();
    });
  }

  deconnect() {
    if (this.result) {
      const input = document.getElementById('deco');
      input.style.setProperty('visibility', 'hidden');
      this.router.navigate(['/home']);
    }
  }
}
