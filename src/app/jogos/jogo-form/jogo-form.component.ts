import { JogoService } from './../shared/jogo.service';
import { Jogo } from './../shared/jogo';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-jogo-form',
  templateUrl: './jogo-form.component.html',
  styleUrls: ['./jogo-form.component.css']
})
export class JogoFormComponent implements OnInit {
  jogo: Jogo;
  title = '';
  mensagemDeErro = '';
  mensagemDeSucesso = '';

  constructor(private jogoService: JogoService,
              private route: ActivatedRoute,
              private router: Router,
              ) { }

  ngOnInit() {
    this.title = this.jogo != null ? this.jogo.nome : 'Novo Jogo';
    if (this.jogo == null) {
      this.jogo = new Jogo();
    }
    const key = this.route.snapshot.paramMap.get('id');
    console.log(key);
  }

  onSubmit() {
    if (this.jogo.nome === '' || this.jogo.codigo === '') {
      this.mensagemDeErro = 'Por favor, preencha todos os campos obrigatórios.';
      return;
    }
    if (this.jogo.key) {

    } else {
      this.jogoService.create(this.jogo)
        .then(() => this.mensagemDeSucesso = 'Jogo salvo com sucesso!', err => this.mensagemDeErro = 'Erro ao salvar jogo!');
    }
    // this.router.navigate(['/jogos']);
  }

}
