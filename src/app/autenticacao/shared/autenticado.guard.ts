import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutenticadoGuard implements CanActivate {

  constructor(
    // public afAuth: AngularFireAuth,
    private userService: UserService,
    private router: Router,
  ) {}

  canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
        .then(user => {
          return resolve(true);
        }, err => {
          this.router.navigate(['/login', { mensagemDeErro: 'Área restrita! Por favor, faça o login para ganhar acesso.'}]);
          return resolve(false);
        });
    });
  }
}
