import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommentAuthor } from '../../model/comment.author.interface';

/**
 * Generated class for the CommentBlockComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'comment-block',
  templateUrl: 'comment-block.html'
})
export class CommentBlockComponent {

  @Input() comment: CommentAuthor;
  @Input() parentBlock: boolean = false;;
  @Output() replyToCommentEmitter = new EventEmitter<CommentAuthor>();
  @Output() viewCommentChildrenEmitter = new EventEmitter<CommentAuthor>();

  constructor() {

  }

  replyToComment(): void {
    console.log(this.parentBlock);
    //this.replyToCommentEmitter.emit(this.comment);
  }

  viewReplies(): void {
    this.viewCommentChildrenEmitter.emit(this.comment);
  }
}
