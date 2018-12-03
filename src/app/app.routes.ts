import { AutenticadoGuard } from './autenticacao/shared/autenticado.guard';
import { AutenticacaoGuard } from './autenticacao/shared/autenticacao.guard';
import { CadastroFormComponent } from './autenticacao/cadastro-form/cadastro-form.component';
import { JogoFormComponent } from './jogos/jogo-form/jogo-form.component';
import { Routes } from '@angular/router';
import { JogoListComponent } from './jogos/jogo-list/jogo-list.component';
import { Easy6502FormComponent } from './easy6502/easy6502-form/easy6502-form.component';
import { LoginFormComponent } from './autenticacao/login-form/login-form.component';
// import { PageNotFoundComponent } from './html/page-not-found/page-not-found.component';
import { DocumentacaoComponent } from './easy6502/documentacao/documentacao.component';

export const appRoutes: Routes = [
  { path: 'inicio', component: JogoFormComponent},
  { path: 'documentacao', component: DocumentacaoComponent},
  { path: 'login', component: LoginFormComponent, canActivate: [AutenticacaoGuard] },
  { path: 'login/:mensagemDeErro', component: LoginFormComponent, canActivate: [AutenticacaoGuard] },
  { path: 'cadastrar', component: CadastroFormComponent, canActivate: [AutenticacaoGuard] },
  // { path: 'jogos/novo', component: JogoFormComponent, canActivate: [AutenticadoGuard] },
  { path: 'jogos/editar', component: JogoFormComponent, canActivate: [AutenticadoGuard] },
  { path: 'jogos', component: JogoListComponent, canActivate: [AutenticadoGuard] },
  { path: '', redirectTo: 'inicio', pathMatch: 'full'},
  // { path: '**', component: PageNotFoundComponent}
];
