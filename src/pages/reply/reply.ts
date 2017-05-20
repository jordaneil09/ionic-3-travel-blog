import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { CommentAuthor } from '../../model/comment.author.interface';
import { WpService } from 'ngx-wordpress';
import { CommentEntryComponent } from '../../components/comment-entry/comment-entry';

/**
 * Generated class for the ReplyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-reply',
  templateUrl: 'reply.html',
})
export class ReplyPage {
  children: CommentAuthor[];
  comment: CommentAuthor;

  commentsCollectionSub: any;
  commentModelSub: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private wp: WpService, private modalCtrl: ModalController, private alertCtrl: AlertController) {
  }

  ionViewWillLoad(): void {
    this.comment = this.navParams.get('comment');

    if(this.comment) {
      this.getComments();
    }
    else {
      this.navCtrl.setRoot('ListPage');
    }
  }

  getComments(): void {
    this.commentsCollectionSub = this.wp.collection().comments();
    this.commentsCollectionSub.get(
          {
            per_page: 100,
            _embed: true,
            parent: this.comment.id
          }
        ).subscribe(
          data => {
            if(data.data.length == 0) {

              let alert = this.alertCtrl.create({
                title: 'Ooops!',
                message: 'Looks like the replies are still waiting for moderation.',
                buttons: ['OK']
              });

              alert.present();
            } 
            else {
              this.children = data.data;
            }
            
          },
          err => this.commentsResponseHandler
        );
  }
  commentsResponseHandler(): void {
    //do nothing atm
  }

  replyToUserComment(comment: CommentAuthor): void {
    let commentModal = this.modalCtrl.create(CommentEntryComponent, {comment: comment});
    commentModal.onDidDismiss(data => {
      this.addCommentToRest(data);
    });
    commentModal.present();
  }

  addCommentToRest(comment: any): void {
    if(comment) {
      this.commentModelSub = this.wp.model().comments();
      this.commentModelSub.add({
        author_name: comment.author_name,
        author_url: comment.author_url,
        author_email: comment.author_email,
        content: comment.content,
        post: this.comment.post,
        parent: this.comment.id
      })
      .subscribe(
        //data => this.commentResultHandler(data.error != null ? data.error.json().message : "Comment sent successfully."),
        //err => this.commentsResponseHandler
      );
    }
  }

}
