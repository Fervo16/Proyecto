import { Injectable } from "@angular/core";
import {
  AlertController,
  ToastController,
  LoadingController,
  Platform,
} from "@ionic/angular";


@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  public loading: HTMLIonLoadingElement | undefined;

  constructor(private loadingCtrl: LoadingController,) { }
}
