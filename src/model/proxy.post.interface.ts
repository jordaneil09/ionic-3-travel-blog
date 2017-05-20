import { Author } from './author.interface';
import { CommentAuthor } from './comment.author.interface';

export class ProxyPost {

    private _id: number;
    get Id(): number {
        return this._id;
    }
    set Id(val: number) {
        this._id = val;
    }

    /*
    private _author: number;
    get Author(): number {
        return this._author;
    }
    set Author(val:number) {
        this._author = val;
    }

    private _categories: number[];
    get Categories(): number[] {
        return this._categories;
    }
    set Categories(val:number[]) {
        this._categories = val;
    }
    */
    private _comment_status: string;
    get Comment_status(): string {
        return this._comment_status;
    }
    set Comment_status(val:string) {
        this._comment_status = val;
    }

    private _content: string;
    get Content(): string {
        return this._content;
    }
    set Content(val:string) {
        this._content = val;
    }

    private _date: string;
    get Date(): string {
        return this._date;
    }
    set Date(val:string) {
        this._date = val;
    }

    private _date_gmt: string;
    get Date_gmt(): string {
        return this._date_gmt;
    }
    set Date_gmt(val:string) {
        this._date_gmt = val;
    }

    private _excerpt: string;
    get Excerpt(): string {
        return this._excerpt;
    }
    set Excerpt(val:string) {
        this._excerpt = val;
    }

    /*
    private _featured_media: number;
    get Featured_media(): number {
        return this._featured_media;
    }
    set Featured_media(val:number) {
        this._featured_media = val;
    }
    */

    private _link: string;
    get Link(): string {
        return this._link;
    }
    set Link(val:string) {
        this._link = val;
    }

    /*
    private _modified_date: Date;
    get Modified_date(): Date {
        return this._modified_date;
    }
    set Modified_date(val:Date) {
        this._modified_date = val;
    }

    private _modified_date_gmt: Date;
    get Modified_date_gmt(): Date {
        return this._modified_date_gmt;
    }
    set Modified_date_gmt(val:Date) {
        this._modified_date_gmt = val;
    }
    */

    private _title: string;
    get Title(): string {
        return this._title;
    }
    set Title(val:string) {
        this._title = val;
    }

    private _embedded_authors: Author[];
    get Embedded_authors(): Author[] {
        return this._embedded_authors;
    }
    set Embedded_authors(val: Author[]) {
        this._embedded_authors = val;
    }

    private _embedded_comments: CommentAuthor[];
    get Embedded_comments(): CommentAuthor[] {
        return this._embedded_comments;
    }
    set Embedded_comments(val: CommentAuthor[]) {
        this._embedded_comments = val;
    }

    private _embedded_featured_medias: any[];
    get Embedded_featured_medias(): any[] {
        return this._embedded_featured_medias;
    }
    set Embedded_featured_medias(val: any[]) {
        this._embedded_featured_medias = val;
    }
    /*
    private _embedded_terms: string[];
    get Embedded_term(): string[] {
        return this._embedded_term;
    }
    set Embedded_term(val: string[]) {
        this._embedded_term = val;
    }
    */

    private _links_replies: string;
    get Links_replies(): string {
        return this._links_replies;
    }
    set Links_replies(val: string) {
        this._links_replies = val;
    }
    
    static fromJson(jsonObject:any): ProxyPost {
        let retVal: ProxyPost = new ProxyPost();

        retVal.Id = jsonObject.id;
        retVal.Comment_status = jsonObject.comment_status;
        retVal.Content = jsonObject.content.rendered;
        retVal.Date = jsonObject.date;
        retVal.Date_gmt = jsonObject.date_gmt;
        retVal.Excerpt = jsonObject.excerpt.rendered;
        retVal.Link = jsonObject.link;
        retVal.Title = jsonObject.title.rendered;
        
        if(jsonObject._embedded) {
            retVal.Embedded_authors = jsonObject._embedded['author'];
            retVal.Embedded_comments = jsonObject._embedded['replies'][0];
            retVal.Embedded_featured_medias = jsonObject._embedded['wp:featuredmedia'];
        }

        if(jsonObject._links) {
            retVal.Links_replies = jsonObject._links['replies'][0].href;
        }
        return retVal;
    }
}