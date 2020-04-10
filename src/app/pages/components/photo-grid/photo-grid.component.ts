import { Component, OnInit, Input } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, NgxGalleryOrder } from 'ngx-gallery';
import { PhotoGridService } from './photo-grid.service';

@Component({
  selector: 'sar-photo-grid',
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

        thumbnailsColumns: 5,
        thumbnailsRows: 3,
        thumbnailMargin: 10,
        thumbnailsArrows: true,
        thumbnailsMoveSize: 3,
        thumbnailsOrder: NgxGalleryOrder.Row,

        previewCloseOnClick: true,
        previewCloseOnEsc: true,
        previewAnimation: false,
        previewZoom: true,
        previewRotate: true,

        lazyLoading: true,        // To help save on the data bill
      },
      {
          breakpoint: 1500,
          width: "100%",
      }
    ];

    this.photoGridService.loadImages(this.caseId)
    .then(images => {
      if(images){
        this.galleryImages = images;
      }  
    })
  }

}
