import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Jogo } from './../shared/jogo';
import { JogoService } from './../shared/jogo.service';
import { JogoDataService } from './../shared/jogo-data.service';
import { UserService } from 'src/app/autenticacao/shared/user.service';

@Component({
  selector: 'app-jogo-form',
  templateUrl: './jogo-form.component.html',
  styleUrls: ['../../../assets/easy6502/6502js-master/emulator-style.css']
})
export class JogoFormComponent implements OnInit {
  jogo: Jogo;
  title = 'Novo Jogo';
  mensagemDeErro = '';
  mensagemDeSucesso = '';
  usuarioAutenticado: boolean;

  constructor(private jogoService: JogoService,
              private jogoDataService: JogoDataService,
              private userService: UserService,
              private router: Router,
              ) { }

  ngOnInit() {
    this.loadScript();
    this.userService.getCurrentUser().then(res => { this.usuarioAutenticado = true; }, erro => this.usuarioAutenticado = false);
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

  public loadScript() {
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; ++i) {
        if (scripts[i].getAttribute('src') != null &&
            scripts[i].getAttribute('src').includes('assembler')
            ) {
              document.getElementsByTagName('head')[0].removeChild(scripts[i]);
        }
    }
    for (let i = 0; i < scripts.length; ++i) {
      if (scripts[i].getAttribute('src') != null &&
          scripts[i].getAttribute('src').includes('es5-shim')
          ) {
            document.getElementsByTagName('head')[0].removeChild(scripts[i]);
      }
    }

    const assemblerPath = ['../../../assets/easy6502/6502js-master/assembler.js'];
    for (let i = 0; i < assemblerPath .length; i++) {
      const assembler = document.createElement('script');
      assembler.src = assemblerPath [i];
      assembler.type = 'text/javascript';
      assembler.async = false;
      assembler.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(assembler);
    }
    const es5shimPath = ['../../../assets/easy6502/6502js-master/es5-shim.js'];
    for (let i = 0; i < es5shimPath .length; i++) {
      const es5shim = document.createElement('script');
      es5shim.src = es5shimPath [i];
      es5shim.type = 'text/javascript';
      es5shim.async = false;
      es5shim.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(es5shim);
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
    if (!this.jogo.key) {
      this.jogoDataService.changeJogo(new Jogo());
    }
    this.router.navigate(['/jogos']);
  }

  login() {
    this.jogoDataService.changeJogo(this.jogo);
    this.router.navigate(['/login']);
  }
}
