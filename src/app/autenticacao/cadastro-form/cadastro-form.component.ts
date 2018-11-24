import { AutenticacaoService } from './../shared/autenticacao.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-form',
  templateUrl: './cadastro-form.component.html',
  styleUrls: ['./cadastro-form.component.css']
})
export class CadastroFormComponent implements OnInit {

  usuario = {
    email: '',
    senha: ''
  };

  mensagemDeErro = '';
  mensagemDeSucesso = '';

  constructor(
    private autenticacaoService: AutenticacaoService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  cadastrar() {
    this.autenticacaoService.cadastrar(this.usuario)
      .then(res => {
        this.mensagemDeErro = '';
        this.mensagemDeSucesso = 'Cadastrado com sucesso!';
      }, erro => {
        this.mensagemDeSucesso = '';
        this.trataErro(erro);
      });
  }

  trataErro(erro) {
    if (erro.code === 'auth/email-already-in-use') {
      this.mensagemDeErro = 'Email já cadastrado!';
    } else if (erro.code === 'auth/invalid-email') {
      this.mensagemDeErro = 'O email inserido é inválido';
    } else if (erro.code === 'auth/operation-not-allowed') {
      this.mensagemDeErro = 'Desculpe! Operação indisponível no momento.';
    } else if (erro.code === 'auth/weak-password') {
      this.mensagemDeErro = 'Senha muito fraca. Insira no mínimo 6 dígitos.';
    } else {
      this.mensagemDeErro = erro.message;
    }
  }

  limpaErro() {
    this.mensagemDeErro = '';
  }

}
