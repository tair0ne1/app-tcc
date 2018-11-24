import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private mudancaStatusAutenticado = new Subject<any>();
  emitMudanca$ = this.mudancaStatusAutenticado.asObservable();

  constructor(
    private afAuth: AngularFireAuth
  ) { }

  cadastrar(usuario) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
        .then(res => {
          resolve(res);
        }, err => reject(err));
    });
  }

  login(usuario) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(usuario.email, usuario.senha)
        .then(res => {
          this.emitirMudanca(true);
          resolve(res);
        }, err => reject(err));
    });
  }

  private emitirMudanca(status: boolean) {
    this.mudancaStatusAutenticado.next(status);
  }

  sair() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.auth.signOut();
        this.emitirMudanca(false);
        resolve();
      } else {
        reject();
      }
    });
  }

}
