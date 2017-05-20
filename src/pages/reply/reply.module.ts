import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReplyPage } from './reply';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ReplyPage,
  ],
  imports: [
    IonicPageModule.forChild(ReplyPage),
    ComponentsModule
  ],
  exports: [
    ReplyPage
  ]
})
export class ReplyPageModule {}
