import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { ConfiguracionApp } from '../modelo/configApp';


@Injectable({
  providedIn: 'root'
})
export class ConfigAppServService {

  constructor(public afs: AngularFirestore) { }

  guardarConfiguracion(config:ConfiguracionApp){
    const refConfig= this.afs.collection("coleccionConfiguraciones");
    if(config.uid==null)
      config.uid=this.afs.createId();
    refConfig.doc(config.uid).set(Object.assign({},config),{merge:true});
  }

  getConfigsApp():Observable<any[]>{
    return this.afs.collection("coleccionConfiguraciones").valueChanges();
  }


}
