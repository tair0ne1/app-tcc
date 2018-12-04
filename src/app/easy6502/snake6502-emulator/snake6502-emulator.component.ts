import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-snake6502-emulator',
  templateUrl: './snake6502-emulator.component.html',
  styleUrls: ['./snake6502-emulator.component.css']
})
export class Snake6502EmulatorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.loadScript();
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
