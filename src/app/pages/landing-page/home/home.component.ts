import { VideoModalComponent } from './video/video-modal/video-modal.component';
import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
        public dialog: MatDialog) { }

  ngOnInit() {
  }

  start(){
    this.router.navigate(['/login'])
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(VideoModalComponent, {
      panelClass: 'myapp-no-padding-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
