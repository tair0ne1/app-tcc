import { Injectable } from '@angular/core';
import { Jogo } from './jogo';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JogoService {


  constructor(
    private db: AngularFireDatabase,
  ) { }

  getAllByDono(dono: string) {
    return this.db.list('jogos', ref => ref.orderByChild('dono').equalTo(dono))
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({key: c.payload.key, ...c.payload.val() }));
        })
      );
  }

  getOne(jogo: Jogo) {
    return this.db.list(`jogos/${jogo.key}`)
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
        })
      );
  }

  getOneAnonymous(jogo: Jogo) {
    return this.db.list(`anonymous/${jogo.key}`)
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
        })
      );
  }

  create(jogo: Jogo) {
    return this.db.list('jogos').push(jogo);
  }

  createAnonymous(jogo: Jogo) {
    this.db.list('anonymous').push(jogo)
      .then((res: any) => {
        return res.key;
      });
  }

  save(jogo: Jogo) {
    return this.db.list('jogos').update(jogo.key, jogo);
  }

  delete(jogo: Jogo) {
    return this.db.object(`jogos/${jogo.key}`).remove();
  }

  deleteAnonymous(jogo: Jogo) {
    return this.db.object(`anonymous/${jogo.key}`).remove();
  }

}
