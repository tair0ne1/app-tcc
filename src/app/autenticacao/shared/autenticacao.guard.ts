import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoGuard implements CanActivate {

  constructor(
    // public afAuth: AngularFireAuth,
    private userService: UserService,
    private router: Router,
  ) {}

  canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
        .then(user => {
          this.router.navigate(['/jogos/novo']);
          return resolve(false);
        }, err => {
          return resolve(true);
        });
    });
  }
}
