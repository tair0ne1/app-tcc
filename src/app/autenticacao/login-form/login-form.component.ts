import { AutenticacaoService } from './../shared/autenticacao.service';
import { Component, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  usuario = {
    email: '',
    senha: '',
  };
  mensagemDeErro = '';

  constructor(
    private autenticacaoService: AutenticacaoService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const mensagem = this.route.snapshot.paramMap.get('mensagemDeErro');
    if (mensagem) {
      this.mensagemDeErro = mensagem;
    }
  }

  login() {
    this.autenticacaoService.login(this.usuario)
      .then(res => {
        console.log('emitiu o evento');
        this.router.navigate(['/inicio']);
      }, erro => {
        this.trataErro(erro);
      });
  }

  trataErro(erro) {
    if (erro.code === 'auth/invalid-email') {
      this.mensagemDeErro = 'O email inserido é inválido!';
    } else if (erro.code === 'auth/user-disabled') {
      this.mensagemDeErro = 'Este usuário foi desativado!';
    } else if (erro.code === 'auth/user-not-found') {
      this.mensagemDeErro = 'Usuário e/ou senha inválidos!';
    } else if (erro.code === 'auth/wrong-password') {
      this.mensagemDeErro = 'Usuário e/ou senha inválidos!';
    } else {
      this.mensagemDeErro = erro.message;
    }
  }

  limpaErro() {
    this.mensagemDeErro = '';
  }

}
