import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { appRoutes } from './app.routes';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { environment } from './../environments/environment';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JogoFormComponent } from './jogos/jogo-form/jogo-form.component';
import { JogoListComponent } from './jogos/jogo-list/jogo-list.component';
import { Easy6502FormComponent } from './easy6502/easy6502-form/easy6502-form.component';
import { LoginFormComponent } from './autenticacao/login-form/login-form.component';
import { CadastroFormComponent } from './autenticacao/cadastro-form/cadastro-form.component';
import { NavbarComponent } from './html/navbar/navbar.component';
import { FooterComponent } from './html/footer/footer.component';
import { PageNotFoundComponent } from './html/page-not-found/page-not-found.component';
import { DocumentacaoComponent } from './easy6502/documentacao/documentacao.component';
import { Snake6502Component } from './easy6502/snake6502/snake6502.component';
import { Snake6502EmulatorComponent } from './easy6502/snake6502-emulator/snake6502-emulator.component';

@NgModule({
  declarations: [
    AppComponent,
    JogoFormComponent,
    JogoListComponent,
    Easy6502FormComponent,
    LoginFormComponent,
    CadastroFormComponent,
    NavbarComponent,
    FooterComponent,
    PageNotFoundComponent,
    DocumentacaoComponent,
    Snake6502Component,
    Snake6502EmulatorComponent,
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    SweetAlert2Module.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
