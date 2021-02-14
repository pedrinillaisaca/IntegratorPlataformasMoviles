import { Component, Input, OnInit, Output } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { EventEmitter } from '@angular/core';
import { filter, finalize, tap } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-component-foto',
  templateUrl: './component-foto.component.html',
  styleUrls: ['./component-foto.component.scss'],
})
export class ComponentFotoComponent implements OnInit {
  @Input() source:string='photo'; //dosposibilidades galeria o foto
  @Output() imageSelected = new EventEmitter<any>();
  @Output() uploadFinished = new EventEmitter<any>();

  imgData:string;
  imgUrl:string;
  constructor(
    private camera:Camera,
    private storage:AngularFireStorage,
    private loadingCrtl: LoadingController   
  ) { }

  ngOnInit() {}

  tomarFoto(){//hombre esa perra esa loca
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.imgUrl=imageData;
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     this.imgData=base64Image;     
     console.log("Puto BASE  64 ",base64Image);
     this.startUpload(imageData);
     this.imageSelected.emit(base64Image);
    }, (err) => {
     // Handle error
    });
  }

  recuperarImagen(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY      
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.imgUrl=imageData;
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     this.imgData=base64Image;     
     this.startUpload(imageData);
     this.imageSelected.emit(base64Image);
    }, (err) => {
     // Handle error
    });
  }

  async startUpload(file:string){
    let byteChacarters=atob(file);
    const path=`images/${new Date().getTime()}.jpg` ; 

    let image='data:image/jpg;base64,'+file;
    const data={
      ref:path,
      type:'image',
      url: null,
      name: 'image',
      size: this.fileSize(Number(byteChacarters.length))
    }

    try{
      let ref=this.storage.ref(path);
      let task=ref.putString(image, 'data_url');
      const loading=await this.loadingCrtl.create({
        message: "Espere , subiendo foto"
      });
      await loading.present();

      task.percentageChanges().pipe(
        filter(val=> val ===100),
        tap(complete=>{
          setTimeout(()=>{
            loading.dismiss();

          },3500);
        })  
      ).subscribe();

      task.snapshotChanges().pipe(
        finalize(()=>{
          let downloadURL=ref.getDownloadURL()
          downloadURL.subscribe(url=> {
            data.url=url;
            console.log("download terminado"+url)
            this.uploadFinished.emit(data);
          });
        })

      ).subscribe();


    }catch(error){
      console.log(JSON.stringify(error));
      console.log("Error: ");
    }

  }

  fileSize(sizeInBytes: number){
    const units =['B','KB','MB','GB','TB','PB','EB','ZB','YB'];
    let power = Math.round(Math.log(sizeInBytes) / Math.log(1024));
    power=Math.min(power,units.length-1);

    const size=sizeInBytes / Math.pow(1024,power);
    const formattedSize= Math.round(size*100)/100;
    const unit =units[power];
    return size ? `${formattedSize} ${unit}`: '0';
  }

}
