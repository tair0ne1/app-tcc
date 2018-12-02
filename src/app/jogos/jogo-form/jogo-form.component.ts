import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Jogo } from './../shared/jogo';
import { JogoService } from './../shared/jogo.service';
import { JogoDataService } from './../shared/jogo-data.service';
import { UserService } from 'src/app/autenticacao/shared/user.service';

@Component({
  selector: 'app-jogo-form',
  templateUrl: './jogo-form.component.html',
  styleUrls: ['./jogo-form.component.css']
})
export class JogoFormComponent implements OnInit {
  jogo: Jogo;
  title = 'Novo Jogo';
  mensagemDeErro = '';
  mensagemDeSucesso = '';

  constructor(private jogoService: JogoService,
              private jogoDataService: JogoDataService,
              private userService: UserService,
              private router: Router,
              ) { }

  ngOnInit() {
    this.jogo = new Jogo();
    try {
      this.jogoDataService.currentJogo.subscribe(data => {
        if (data.jogo) {
          this.jogo = data.jogo;
          this.title = this.jogo.nome;
        }
      });
    } catch (e) {
      console.log('ERRO' + e);
    }
  }

  onSubmit() {
    if (
      this.jogo.nome === '' || this.jogo.codigo === '' ||
      this.jogo.descricao === '' || this.jogo.genero === '') {
      this.mensagemDeErro = 'Por favor, preencha todos os campos obrigatórios.';
      return;
    }
    if (this.jogo.key) {
      this.jogoService.save(this.jogo)
        .then(() => {
          this.mensagemDeSucesso = 'Jogo salvo com sucesso!';
        }, err => this.mensagemDeErro = 'Erro ao salvar jogo!');
    } else {
      this.userService.getCurrentUser()
      .then((user) => {
        this.jogo.dono = user.uid;
        this.jogoService.create(this.jogo)
          .then(() => {
            this.mensagemDeSucesso = 'Jogo salvo com sucesso!';
          }, err => this.mensagemDeErro = 'Erro ao salvar jogo!');
      }, err => this.mensagemDeErro = 'Erro ao buscar o dono do jogo!');
    }
  }

  cancel() {
    this.jogo = new Jogo();
    this.router.navigate(['/jogos']);
  }

}
