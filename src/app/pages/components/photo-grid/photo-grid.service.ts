import { Injectable, OnInit } from '@angular/core';
import * as firebase from 'firebase';

var storage = firebase.storage();

@Injectable()
export class PhotoGridService {

  constructor() {
  }

  async loadImages(caseId : string) {
    // var storageRef = this.afStorage.ref(caseId + '/images');
    var storageRef = storage.ref('testImg');
    let images = [];
    await storageRef.listAll().then(result => {
      result.items.forEach(async imageRef => {
        console.log(imageRef)
        await this.makeImage(imageRef).then(res =>{
          let image = res;
          console.log(image)
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
      // Only add description field if it exists
      let description = null;
      let customMD = metadata.customMetadata;
      if(customMD && customMD.description) {
        description = customMD.description;
      }

      return imageRef.getDownloadURL().then(url => {
        let img = {
          small: url,
          medium: url,
          big: url,
          description: description
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