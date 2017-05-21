import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProxyPost } from '../../model/proxy.post.data';

/**
 * Generated class for the BlogPostItemComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'blog-post-item',
  templateUrl: 'blog-post-item.html'
})
export class BlogPostItemComponent {
  @Input() post:ProxyPost;
  @Output() postItemClicked:EventEmitter<ProxyPost> = new EventEmitter<ProxyPost>();


  /**
   * Dispatches an event to open up blog posts
   */
  readBlogPost(): void{
    this.postItemClicked.emit(this.post);
  }
}
