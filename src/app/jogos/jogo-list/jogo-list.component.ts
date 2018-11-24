import { Jogo } from './../shared/jogo';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jogo-list',
  templateUrl: './jogo-list.component.html',
  styleUrls: ['./jogo-list.component.css']
})
export class JogoListComponent implements OnInit {
  title = 'Meus Jogos';
  jogos: Jogo[];

  constructor() { }

  ngOnInit() {
    this.jogos = [
      { nome: 'Jumanji',
        descricao: 'Um jogo sobre árvores, floresta e um macaco muito legal.',
        genero: 'Aventura',
        codigo: 'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk'} as Jogo,
      { nome: 'Carros',
        descricao: 'Um jogo sobre carros, pistas e muita ação.',
        genero: 'Ação',
        codigo: 'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk'} as Jogo,
    ];

  }

}
