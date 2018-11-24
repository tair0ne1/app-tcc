import { UserService } from './../../autenticacao/shared/user.service';
import { Component, OnInit } from '@angular/core';
import { Jogo } from 'src/app/jogos/shared/jogo';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/autenticacao/shared/autenticacao.service';

@Component({
  selector: 'app-easy6502-form',
  templateUrl: './easy6502-form.component.html',
  styleUrls: ['./easy6502-form.component.css']
})
export class Easy6502FormComponent implements OnInit {
  jogo: Jogo;
  usuarioAutenticado: boolean;
  constructor(
    private router: Router,
    private autenticacaoService: AutenticacaoService,
    private userService: UserService,
  ) {
    // this.autenticacaoService.emitMudanca$.subscribe(autenticado => {
    //   this.usuarioAutenticado = autenticado;
    // });
  }

  ngOnInit() {
    this.userService.getCurrentUser().then(res => { this.usuarioAutenticado = true; }, erro => this.usuarioAutenticado = false);
    if (this.jogo == null) {
      this.jogo = new Jogo();
      this.jogo.codigo = `LDA #$01 \nSTA $0200 \nLDA #$05 \nSTA $0201 \nLDA #$08 \nSTA $0202`;
    }
  }

  salvarCodigo() {
    console.log(this.jogo.codigo);
  }

  login() {
    this.router.navigate(['/login']);
  }

}
