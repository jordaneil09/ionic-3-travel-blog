import { Component } from '@angular/core';
import { ViewController, ToastController, NavParams } from 'ionic-angular';
import { StringUtils } from '../../utilities/StringUtils';
import { CommentAuthor } from '../../model/comment.author.interface';

/**
 * Generated class for the CommentEntryComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'comment-entry',
  templateUrl: 'comment-entry.html'
})
export class CommentEntryComponent {

  header: string; 
  comment: CommentAuthor;

  author_name: string = "";
  author_url: string = "";
  author_email: string = "";
  content: string = "";

  constructor(private navParams: NavParams, private viewCtrl: ViewController, private toastCtrl: ToastController) {
  }

  ionViewWillLoad(): void {
    this.comment = this.navParams.get('comment');
    if(this.comment) 
      this.header = `Leave a reply to ${this.comment.author_name}`;
    else 
      this.header = `We appreciate a comment so share your thoughts and let us know what you think about "${ this.navParams.get('title') }":`;
  }

  /**
   * Validates a comment entry before calling the WP API
   * Shows an error message if:
   * No comment added, invalid email format and empty name
   */
  submit(): void {
    
    //content
    if(StringUtils.TrimString(StringUtils.RemoveDuplicateSpaces(this.content)).length == 0)
    {
      this.showInvalidError("Oops! I think you forgot to add a comment.");
      return;
    }

    if(StringUtils.TrimString(StringUtils.RemoveDuplicateSpaces(this.author_name)).length == 0)
    {
      this.showInvalidError("Oops! I think you forgot to add your name.");
      return;
    }

    //email
    if(!StringUtils.IsValidEmailAddress(this.author_email))
    {
      this.showInvalidError("Invalid email address used.")
      return;
    }

    let body: any = {
      author_name: this.author_name,
      author_url: this.author_url,
      author_email: this.author_email,
      content: this.content,
      parent: this.comment ? this.comment.id : 0
    }

    this.viewCtrl.dismiss(body);
  }

  /**
   * Handles error message and display it as toast
   */
  showInvalidError(msg: string): void {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.present();
  }

  close(): void {
    this.viewCtrl.dismiss();
  }
}
