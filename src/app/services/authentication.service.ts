import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _storage: Storage | null = null;

  public authenticationState = new BehaviorSubject('');

  constructor(private storage: Storage, private plt: Platform) {
    this.create();
    
    this.checkToken();
  }
  
  public checkToken() {
    this.storage.get(TOKEN_KEY).then((res: string) => {
      console.log(res);
      if (res) {
        this.authenticationState.next(res);
      }
    })
  }

  public async login(token:string): Promise<void>{
    return this.storage.set(TOKEN_KEY, token).then(() => {
      this.authenticationState.next(token);
      //console.log(token);
    });
    };
  

  public logout(): Promise<void> {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next('logout');
    });
  }

  public isAuthenticated(): string {
    return this.authenticationState.value;
  }
  public async create() {
    const storage = await this.storage.create();
    this._storage = storage;
    console.log(storage);

  }

}
