import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, ModalController, ToastController } from 'ionic-angular';
import { ProxyPost } from '../../model/proxy.post.interface';

import { WpService } from 'ngx-wordpress';
import { CommentEntryComponent } from '../../components/comment-entry/comment-entry';
import { CommentAuthor } from '../../model/comment.author.interface';

/**
 * Generated class for the PostPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {
  @ViewChild(Content) content: Content;
  post: ProxyPost;
  commentsReady: boolean = false;
  showScrollToTop: boolean = false;

  commentsCollectionSub: any;
  commentModelSub: any;

  constructor(private navCtrl: NavController, private navParams: NavParams, private zone: NgZone, private wp: WpService, 
  private modalCtrl: ModalController, private toastCtrl: ToastController){} 

  ionViewWillLoad() {
    this.post = this.navParams.get('post'); 
    this.getComments();
  }

  getComments(): void {
    if(!this.post) {
      this.navCtrl.setRoot('ListPage');
    }
    else {
      if(this.post.Comment_status == "open") {
        this.commentsCollectionSub = this.wp.collection().comments();
        
        this.commentsCollectionSub.get(
          {
            per_page: 100,
            _embed: true,
            post: this.post.Id
          }
        ).subscribe(
          data => {
            console.log(data.data);
            this.post.Embedded_comments = data.data;
            this.commentsResponseHandler();
          },
          err => this.commentsResponseHandler
        );
      }
    }
  }

  commentsResponseHandler(): void {
    this.commentsReady = true;
  }

  ionViewDidLoad(): void {
    this.content.ionScroll.subscribe((event: any) => {
      this.zone.run(() => {
        this.showScrollToTop = event.scrollTop > 100;
      });
    });
  }

  scrollToTop(): void {
    this.content.scrollToTop();
  }

  commentToPost(): void {
    let commentModal = this.modalCtrl.create(CommentEntryComponent, {title: this.post.Title});
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
        post: this.post.Id,
        parent: comment.parent
      })
      .subscribe(
        data => this.commentResultHandler(data.error != null ? data.error.json().message : "Comment sent successfully."),
        err => this.commentsResponseHandler
      );
    }
  }

  commentResultHandler(message: string): void {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 5000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.present();
  }

  replyToUserComment(comment: CommentAuthor): void {
    let commentModal = this.modalCtrl.create(CommentEntryComponent, {comment: comment});
    commentModal.onDidDismiss(data => {
      this.addCommentToRest(data);
    });
    commentModal.present();
  }

  viewCommentChildren(comment: CommentAuthor): void {
    this.navCtrl.push('ReplyPage', {comment: comment});
  }

}
