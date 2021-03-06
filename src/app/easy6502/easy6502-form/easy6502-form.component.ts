import { JogoDataService } from './../../jogos/shared/jogo-data.service';
import { UserService } from './../../autenticacao/shared/user.service';
import { Component, OnInit } from '@angular/core';
import { Jogo } from 'src/app/jogos/shared/jogo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-easy6502-form',
  templateUrl: './easy6502-form.component.html',
  styleUrls: ['../../../assets/easy6502/6502js-master/emulator-style.css']
})
export class Easy6502FormComponent implements OnInit {
  jogo: Jogo;
  usuarioAutenticado: boolean;
  constructor(
    private router: Router,
    private jogoDataService: JogoDataService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.loadScript();
    this.userService.getCurrentUser().then(res => { this.usuarioAutenticado = true; }, erro => this.usuarioAutenticado = false);
    if (this.jogo == null) {
      this.jogo = new Jogo();
      this.jogo.codigo = `LDA #$01 \nSTA $0200 \nLDA #$05 \nSTA $0201 \nLDA #$08 \nSTA $0202`;
    }
  }

  salvarCodigo() {
    this.jogoDataService.changeJogo(this.jogo);
    this.router.navigate(['/jogos/novo']);
  }

  login() {
    this.jogoDataService.changeJogo(this.jogo);
    this.router.navigate(['/login']);
  }

  loadScript() {
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

}
