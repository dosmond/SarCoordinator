import { Component, OnInit, Input } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { PhotoGridService } from './photo-grid.service';

@Component({
  selector: 'fury-photo-grid',
  templateUrl: './photo-grid.component.html',
  styleUrls: ['./photo-grid.component.scss']
})
export class PhotoGridComponent implements OnInit {

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  @Input() caseId: string;

  constructor(private photoGridService: PhotoGridService) { }

  ngOnInit() {
    this.galleryOptions = [
      {
        image: false,
        imageDescription: true,
        width: "1500px",
        height: "750px",

        thumbnailsColumns: 4,
        thumbnailsRows: 2,
        thumbnailMargin: 10,
        thumbnailsArrows: true,
        thumbnailsSwipe: true,

        previewCloseOnClick: true,
        previewCloseOnEsc: true,

        lazyLoading: true,        // To help save on the data bill
      },
      {
          breakpoint: 1500,
          width: "100%",
      }
    ];

    this.photoGridService.loadImages(this.caseId)
    .then(images => {
      this.galleryImages = images;
    })
 
    // this.galleryImages = [
        // {
        //   small: '../../../../assets/img/attachments/1.png',
        //   medium: '../../../../assets/img/attachments/1.png',
        //   big: '../../../../assets/img/attachments/1.png',
        //   description: "This is image 1 and this is the description for it.",
        // },
        // {
        //   small: '../../../../assets/img/attachments/2.png',
        //   medium: '../../../../assets/img/attachments/2.png',
        //   big: '../../../../assets/img/attachments/2.png',
        //   description: "This is image 2 and this is the description for it.",
        // },
        // {
        //   small: '../../../../assets/img/attachments/3.png',
        //   medium: '../../../../assets/img/attachments/3.png',
        //   big: '../../../../assets/img/attachments/3.png',
        //   description: "This is image 3 and this is the description for it.",
        // },
        // {
        //   small: '../../../../assets/img/attachments/4.png',
        //   medium: '../../../../assets/img/attachments/4.png',
        //   big: '../../../../assets/img/attachments/4.png',
        //   description: "This is image 4 and this is the description for it.",
        // },
        // {
        //   small: '../../../../assets/img/attachments/5.png',
        //   medium: '../../../../assets/img/attachments/5.png',
        //   big: '../../../../assets/img/attachments/5.png',
        //   description: "This is image 5 and this is the description for it.",
        // },
        // {
        //   small: '../../../../assets/img/avatars/3.jpg',
        //   medium: '../../../../assets/img/avatars/3.jpg',
        //   big: '../../../../assets/img/avatars/3.jpg',
        //   description: "This is avatar 3 and this is the description for it.",
        // },
    //     {
    //       small: "https://firebasestorage.googleapis.com/v0/b/sar-solutions.appspot.com/o/testImg%2F1.png?alt=media&token=83fb0a3f-a231-4da6-8d3e-221d3e62713a",
    //       big: "https://firebasestorage.googleapis.com/v0/b/sar-solutions.appspot.com/o/testImg%2F1.png?alt=media&token=83fb0a3f-a231-4da6-8d3e-221d3e62713a",
    //       description: null
    //     }
    // ];
  }

}
