import { Injectable, OnInit } from '@angular/core';
import * as firebase from 'firebase';

var storage = firebase.storage();

@Injectable()
export class PhotoGridService {

  constructor() {
  }


  loadImages(caseId : string) {
    // var storageRef = this.afStorage.ref(caseId + '/images');
    var storageRef = storage.ref('testImg');
    let images = [];
    storageRef.listAll().then(result => {
      result.items.forEach(imageRef => {
        images.push(this.makeImage(imageRef));
      });
    }).then(() => {
      // After we get all image URLs then return the list
      return images;
    }).catch(err => {
      console.log(err);
    });
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