import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostPage } from './post';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PostPage,
  ],
  imports: [
    IonicPageModule.forChild(PostPage),
    ComponentsModule
  ],
  exports: [
    PostPage
  ]
})
export class PostPageModule {}
