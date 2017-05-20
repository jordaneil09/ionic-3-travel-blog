import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController, Content } from 'ionic-angular';
import { ProxyPost } from '../../model/proxy.post.interface';

import { WpService, CollectionResponse, WpPagination } from 'ngx-wordpress';

/**
 * Generated class for the ListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  @ViewChild(Content) content: Content;

  postCollectionSub: any;
  blogPosts:ProxyPost[];
  lastCollectionResponsePagination: WpPagination;

  //scroller variables
  retrievingPosts: boolean = false;

  constructor(private navCtrl: NavController, private navParams: NavParams, private loadingCtrl: LoadingController,
    private alertCtrl: AlertController, private wp: WpService, private zone: NgZone) {
      this.blogPosts = [];
  }

  ionViewWillLoad() {
    let loading = this.loadingCtrl.create({
      content: "Retrieving posts. Please wait..."
    });
    loading.present();
    
    this.retrievingPosts = true;

    this.postCollectionSub = this.wp.collection().posts();
    this.postCollectionSub.get(
      {
        per_page: 5,
        _embed: true
      }
    ).subscribe(
        data => this.postsResponseHandler(data, loading),
        err => this.postsFaultHandler(err, loading)
    );

    this.content.ionScroll.subscribe((event: any) => {
      this.zone.run(() => {
        let scrollBottom: number = event.scrollElement.scrollHeight - (event.scrollTop + event.contentHeight);
        if(scrollBottom < 200 && !this.retrievingPosts) {
          this.getNextPostPage();
        }
      });
    });
  }

  postsResponseHandler(res:CollectionResponse, loading?:Loading) {
    this.lastCollectionResponsePagination = res.pagination;
    res.data.map((item) => {
      this.blogPosts.push(ProxyPost.fromJson(item));
    });

    if(loading)
      loading.dismiss();

    this.retrievingPosts = false;
  }

  postsFaultHandler(err:any, loading?:Loading) {
    if(loading)
      loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Ooops!',
      subTitle: 'There seems to be a problem in the server. Please try again later.',
      buttons: [
        { 
          text: 'OK',
          handler: data => {
            this.navCtrl.setRoot('HomePage');
          }
        }
      ]
    });

    alert.present();
    this.retrievingPosts = false;
  }

  getNextPostPage(): void {
    
    if(this.postCollectionSub && this.lastCollectionResponsePagination.hasMore) {
      this.retrievingPosts = true;
      this.postCollectionSub.next()
      .subscribe(
          data => this.postsResponseHandler(data),
          err => this.postsFaultHandler(err)
      );
    }
  }

  postItemClicked(post:ProxyPost) {
    this.navCtrl.push('PostPage', {post: post});
  }

  ionViewWillUnload(): void {
    if(this.postCollectionSub)
      this.postCollectionSub.unsubscribe();
  }
}
