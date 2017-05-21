import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostPage } from './post';
import { ComponentsModule } from '../../components/components.module';
import { PipeModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    PostPage,
  ],
  imports: [
    IonicPageModule.forChild(PostPage),
    ComponentsModule,
    PipeModule
  ],
  exports: [
    PostPage
  ]
})
export class PostPageModule {}
