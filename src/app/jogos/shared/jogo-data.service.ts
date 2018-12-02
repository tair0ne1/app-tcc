import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Jogo } from './jogo';

@Injectable({
  providedIn: 'root'
})
export class JogoDataService {
  private jogoSource = new BehaviorSubject({jogo: null});
  currentJogo = this.jogoSource.asObservable();

  constructor() { }

  changeJogo(jogo: Jogo) {
    this.jogoSource.next({jogo: jogo});
  }
}
