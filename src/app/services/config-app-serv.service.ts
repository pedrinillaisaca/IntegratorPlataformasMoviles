import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { ConfiguracionApp } from '../modelo/configApp';

import { first } from 'rxjs/operators';


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

  
  async getConfigById(uid: string){
    try{
        let aux = await this.afs.collection("coleccionConfiguraciones", 
            ref => ref.where('userUid', '==', uid))
                      .valueChanges().pipe(first()).toPromise().then(doc => {                    	  
                          return doc;
                      }).catch(error => {
                          throw error;
                      });
        if(aux==null)
            return {};
        return aux[0];
    }catch(error){
      console.error("Error get contactos ById", error);
      throw error;
    } 
  }

  getConfigById1(uid: string) :Observable<any>{
    return this.afs.collection("coleccionConfiguraciones", 
            ref => ref.where('userUid', '==', uid))
                      .valueChanges();
  }

}
