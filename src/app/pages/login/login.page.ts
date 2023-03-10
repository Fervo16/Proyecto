import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MenuController, NavController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { Events } from 'src/app/services/events.service';
import { codeErrors } from "../../utils/utils";
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastController } from '@ionic/angular';
import { userInfo } from 'os';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public form: FormGroup;
  constructor(
    public events: Events,
    
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private menuCtrl: MenuController,
    private navCtrl: NavController,
    private toast: ToastController,
    private auth: AuthenticationService,
    private storage: Storage,
    ) {
      this.form = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });

  }
 
  public ngOnInit(): void {
     this.menuCtrl.enable(false);
  }

  // public submitForm(): void {
  //   this.apiService.login(this.form.value).subscribe((user: User) => {
  //     console.log(user);
  //     //Ahora aplicamos la cabecera devuelta a las siguientes peticiones
  //     this.apiService.setTokenToHeaders(user.api_token);
  //     //Emitimos el evento de login
  //     this.events.publish('user:login');
  //     this.auth.login(user.api_token);
  //   }, (error)=> {
  //     this.showToast(codeErrors(error));
  //   });
  //   console.log("registro correcto");
  //   this.navCtrl.navigateRoot("/profile");
  // }
  public submitForm(): void {
    this.apiService.login(this.form.value).subscribe({
      next: async (user:User)=>{
        console.log(user);
        this.storage.set("usuario",user);
        this.apiService.setTokenToHeaders(user.api_token);
        this.events.publish('user:login');
       await this.auth.login(user.api_token);
       console.log(user.api_token);
      },
      error: (error) => this.showToast(codeErrors(error)),
      complete: ()=>this.navCtrl.navigateRoot("/profile"),
    },
    );
    
    console.log("registro correcto");
  }


  public async showToast(message: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 5000,
      buttons:['OK']
    });
    toast.present();
}


}
