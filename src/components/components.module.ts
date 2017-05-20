import { NgModule } from '@angular/core';
import { BlogPostItemComponent } from './blog-post-item/blog-post-item.component';
import { IonicModule } from 'ionic-angular';
import { CommentBlockComponent } from './comment-block/comment-block';
import { CommentEntryComponent } from './comment-entry/comment-entry';

@NgModule ({
    declarations: [
        BlogPostItemComponent,
        CommentBlockComponent,
        CommentEntryComponent
    ],
    imports: [
        IonicModule
    ],
    exports: [
        BlogPostItemComponent,
        CommentBlockComponent,
        CommentEntryComponent
    ],
    entryComponents: [
        CommentEntryComponent
    ]
})

export class ComponentsModule {}