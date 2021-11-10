import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConvertImageService {

  constructor() {

  }

  convert64toFile(fileName: string, encodedFile: string): any {
    const imageBlob = ConvertImageService.dataURItoBlob(encodedFile);
    const imageFile = new File([imageBlob], fileName, {type: 'image/png'});
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = () => {
      return reader.result;
    };
  }

  static dataURItoBlob(dataURI: string) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([int8Array], {type: 'image/png'});
  }
}
