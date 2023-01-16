import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController,ToastController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { NavController } from '@ionic/angular';
import { codeErrors } from 'src/app/utils/utils';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.page.html',
  styleUrls: ['./editarperfil.page.scss'],
})
export class EditarperfilPage implements OnInit {

  public form: FormGroup;
  public user: User | undefined;
  
  constructor(
              public toast: ToastController,
              public fb: FormBuilder,
              private navCtrl: NavController,
              public alertController: AlertController,
              private apiService: ApiService,
              private storage: Storage
              ) { 
    
    this.form = this.fb.group({
      'username': new FormControl('',Validators.required),
      'email': new FormControl('',Validators.required),
      'name': new FormControl('',Validators.required),
      'surname1': new FormControl('',Validators.required),
      'surname2': new FormControl('',Validators.required),
      'id_juego': new FormControl('',Validators.required),
      'password': new FormControl('',Validators.required),
      'password_confirmation': new FormControl('',Validators.required),
    }
    )
  }

  ngOnInit() {
  }
  public submitForm(): void {
   this.apiService.updateUser(this.form.value).subscribe({
    next: (user: User) =>this.showToast("Usuario actualizado"),
    error: (error: { status: any; }) => this.showToast(codeErrors(error)),
    complete: () =>this.navCtrl.navigateRoot("/tabs/tab1")
  });
    console.log("Usuario actualizado");
    this.navCtrl.navigateRoot("/tabs/tab1")
    
    
  }

  public async showToast(message: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 5000,
      buttons:['OK']
    });
    toast.present();
}
public async getUser() {
  let res= await this.storage.get("usuario");
  console.log(res);
  this.user=res;
}

}

