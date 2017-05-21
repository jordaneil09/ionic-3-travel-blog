import { Component, trigger, state, style, transition, animate } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
        trigger('mottoTrigger', [
            state('start', style({
                transform: 'scale(1)',
                opacity: 1
            })),
            transition('* => start', animate('500ms ease-out'))
        ]),
        trigger('logoTrigger', [
            state('slideDown', style([{
                transform: 'translateY(0%)',
                opacity: 1
            }])),
            state('inactive', style([{
                transform: 'translateY(-200%)',
                opacity: 0
            }])),
            transition('inactive => slideDown', animate('1000ms ease-out'))
        ]),
        trigger('btnTrigger', [
          state('slideUp', style([{
            transform: 'translateY(0%)',
            opacity: 1
          }])),
          state('hidden', style([{
            transform: 'translateY(500%)',
            opacity: 0
          }])),
          transition('hidden => slideUp', animate('1000ms ease-in'))
        ])
    ]
    
})
export class HomePage {
  collection: any;

  mottoTriggerState:string;
  logoTriggerState:string = 'inactive';
  buttonTriggerState:string = 'hidden';

  constructor(private navCtrl: NavController, private navParams: NavParams) {
  }

  /**
   * Goes to List Page on Take Tour click
   */
  startApp(): void {
    this.navCtrl.setRoot('ListPage');
  }

  /**
   * Starts animation of components (logo, button and motto)
   */
  ionViewDidEnter(): void {
    setTimeout(() => {
      this.logoTriggerState = "slideDown";
      this.buttonTriggerState = "slideUp";
    }, 500);

    setTimeout(() => {
      this.mottoTriggerState = "start";
    }, 1800);
  }
}
