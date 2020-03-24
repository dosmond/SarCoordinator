import { Injectable, OnInit } from '@angular/core';
import * as firebase from 'firebase';

var storage = firebase.storage();

@Injectable()
export class PhotoGridService {

  constructor() {
  }

  async loadImages(caseId : string) {
    var storageRef = storage.ref(caseId + '/images');
    // var storageRef = storage.ref('testImg');
    let images = [];
    await storageRef.listAll().then(result => {
      result.items.forEach(async imageRef => {
        await this.makeImage(imageRef).then(res =>{
          let image = res;
          images.push(image);
        })
      });
    }).catch(err => {
      console.log(err);
    });

    return images;
  }

  private makeImage(imageRef: firebase.storage.Reference) {
    return imageRef.getMetadata().then(metadata => {
      


      return imageRef.getDownloadURL().then(url => {
        let img = {
          small: url,
          medium: url,
          big: url,
          description: metadata.Description ? metadata.Description : null  // Only add description field if it exists
        }
        return img;
      }).catch(err => {
        console.log(err);
      });

    }).catch(err => {
      console.log(err);
    });
  }
}