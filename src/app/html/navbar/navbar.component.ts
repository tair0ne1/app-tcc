import { UserService } from './../../autenticacao/shared/user.service';
import { AutenticacaoService } from './../../autenticacao/shared/autenticacao.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Jogo } from 'src/app/jogos/shared/jogo';
import { JogoDataService } from 'src/app/jogos/shared/jogo-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public autenticado = false;

  constructor(
    private autenticacaoService: AutenticacaoService,
    private userService: UserService,
    private router: Router,
    private jogoDataService: JogoDataService,
  ) {
    this.autenticacaoService.emitMudanca$.subscribe( autenticado => {
      this.autenticado = autenticado;
    });
  }

  ngOnInit() {
    this.userService.getCurrentUser()
      .then(res => {
        this.autenticado = true;
      }, erro => {
        this.autenticado = false;
      });
  }

  sair() {
    this.autenticacaoService.sair()
      .then((res) => {
        this.autenticado = false;
        this.router.navigateByUrl('/login');
      }, erro => {
        console.log(erro);
      });
  }

  novoJogo() {
    this.jogoDataService.changeJogo(new Jogo());
    this.router.navigate(['/jogos/novo']);
  }

}
