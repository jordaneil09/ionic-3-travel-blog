import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private wp: WpService, private modalCtrl: ModalController, private alertCtrl: AlertController,
    private toastCtrl: ToastController) {
  }

  /**
   * Gets the parent comment that will receive the reply. Returns to List page if empty.
   */
  ionViewWillLoad(): void {
    this.comment = this.navParams.get('comment');

    if(this.comment) {
      this.getComments();
    }
    else {
      this.navCtrl.setRoot('ListPage');
    }
  }

  /**
   * Calls the WP REST API and gets all the available replies of the parent Comment
   */
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
                message: 'Looks like the replies are still under moderation.',
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

  /**
   * Fault handler for getting replies
   */
  commentsResponseHandler(): void {
    //do nothing atm
  }

  /**
   * Fault handler for getting replies
   */
  replyToUserComment(comment: CommentAuthor): void {
    let commentModal = this.modalCtrl.create(CommentEntryComponent, {comment: comment});
    commentModal.onDidDismiss(data => {
      this.addReplyToComment(data);
    });
    commentModal.present();
  }

  /**
   * Handler that receives validated comment. Sends a command to WP REST API to add a comment to parent comment
   * @params - Validated comment body object
   */
  addReplyToComment(comment: any): void {
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
        data => this.commentResultHandler(data.error != null ? data.error.json().message : "Comment sent successfully."),
        err => this.commentsResponseHandler
      );
    }
  }

  /**
   * Response handler for adding a comment to a parent Comment
   * @params -  message to display to the toast
   */
  commentResultHandler(message: string): void {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 5000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.present();
  }

}
