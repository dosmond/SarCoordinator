import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'fury-photo-grid',
  templateUrl: './photo-grid.component.html',
  styleUrls: ['./photo-grid.component.scss']
})
export class PhotoGridComponent implements OnInit {

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor() { }

  ngOnInit() {
    this.galleryOptions = [
      {
        image: false,
        imageDescription: true,
        width: "1500px",
        height: "750px",

        thumbnailsColumns: 4,
        thumbnailsRows: 2,
        thumbnailMargin: 35,

        previewCloseOnClick: true,
        previewCloseOnEsc: true,

        lazyLoading: true,        // To help save on the data bill
      },
      {
          breakpoint: 1500,
          width: "100%",
      }
    ];
 
    this.galleryImages = [
        {
          small: '../../../../assets/img/attachments/1.png',
          medium: '../../../../assets/img/attachments/1.png',
          big: '../../../../assets/img/attachments/1.png',
          description: "This is image 1 and this is the description for it.",
        },
        {
          small: '../../../../assets/img/attachments/2.png',
          medium: '../../../../assets/img/attachments/2.png',
          big: '../../../../assets/img/attachments/2.png',
          description: "This is image 2 and this is the description for it.",
        },
        {
          small: '../../../../assets/img/attachments/3.png',
          medium: '../../../../assets/img/attachments/3.png',
          big: '../../../../assets/img/attachments/3.png',
          description: "This is image 3 and this is the description for it.",
        },
        {
          small: '../../../../assets/img/attachments/4.png',
          medium: '../../../../assets/img/attachments/4.png',
          big: '../../../../assets/img/attachments/4.png',
          description: "This is image 4 and this is the description for it.",
        },
        {
          small: '../../../../assets/img/attachments/5.png',
          medium: '../../../../assets/img/attachments/5.png',
          big: '../../../../assets/img/attachments/5.png',
          description: "This is image 5 and this is the description for it.",
        },
        // {
        //   small: '../../../../assets/img/avatars/3.jpg',
        //   medium: '../../../../assets/img/avatars/3.jpg',
        //   big: '../../../../assets/img/avatars/3.jpg',
        //   description: "This is avatar 3 and this is the description for it.",
        // },
    ];
  }

}
