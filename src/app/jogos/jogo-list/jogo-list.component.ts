import { UserService } from './../../autenticacao/shared/user.service';
import { Component, OnInit } from '@angular/core';

import { Jogo } from './../shared/jogo';
import { JogoService } from './../shared/jogo.service';
import { JogoDataService } from '../shared/jogo-data.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jogo-list',
  templateUrl: './jogo-list.component.html',
  styleUrls: ['./jogo-list.component.css']
})
export class JogoListComponent implements OnInit {
  title = 'Meus Jogos';
  jogos: Observable<any>;
  dono: string;

  constructor(
    private jogoService: JogoService,
    private jogoDataService: JogoDataService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.userService.getCurrentUser()
      .then((user) => {
        this.dono = user.uid;
        this.jogos = this.jogoService.getAllByDono(this.dono);
      }, err => console.log(err));
  }

  delete(jogo: Jogo) {
    jogo.dono = this.dono;
    this.jogoService.delete(jogo);
  }

  edit(jogo: Jogo) {
    this.jogoDataService.changeJogo(jogo);
    this.router.navigate(['/jogos/editar']);
  }

}
