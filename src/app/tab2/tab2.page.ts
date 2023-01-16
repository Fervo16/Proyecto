import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController,ToastController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { NavController } from '@ionic/angular';
import { codeErrors } from 'src/app/utils/utils';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  public form: FormGroup;
  
    constructor(
                public toast: ToastController,
                public fb: FormBuilder,
                private navCtrl: NavController,
                public alertController: AlertController,
                private apiService: ApiService,
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
      //complete: () =>this.navCtrl.navigateRoot("/login")
    });
      console.log("Usuario actualizado");
      
    }
  
    //  public async SaveDetails(){
      
  
    //   let params={surname1: this.form.get("surname1").value,
    //               surname2:this.form.get("surname2").value,
    //               id_juego: this.form.get("id_juego").value,
    //  };
    //  console.log("Valores objeto");
     
    //  console.log(params);
     
    // }
  
  
    public async showToast(message: string) {
      const toast = await this.toast.create({
        message: message,
        duration: 5000,
        buttons:['OK']
      });
      toast.present();
  }
  
  }

