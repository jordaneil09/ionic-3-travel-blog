import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { IonicModule, IonicErrorHandler, IonicPageModule, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ErrorHandler } from '@angular/core';
import { PostPage } from './post';
import { ComponentsModule } from '../../components/components.module';
import { NavMock } from '../../mocks';
import { WordPressModule } from 'ngx-wordpress';
import { ListPageModule } from '../list/list.module';
 
import {} from 'jasmine';

let page: PostPage;
let fixture: ComponentFixture<PostPage>;
 
describe('Component: Post Component', () => {
 
    beforeEach(async(() => {
 
        TestBed.configureTestingModule({
 
            declarations: [PostPage],
 
            providers: [
                {provide: NavParams, useValue: {}},
                StatusBar,
                SplashScreen,
                {provide: ErrorHandler, useClass: IonicErrorHandler},
                {provide: NavController, useValue: NavMock}
            ],
 
            imports: [
                IonicModule.forRoot(PostPage),
                IonicPageModule.forChild(PostPage),
                WordPressModule.forRoot('http://devel2.ordermate.online'),
                ComponentsModule,
                ListPageModule
            ]
 
        }).compileComponents();
 
    }));
 
    beforeEach(() => {
        fixture = TestBed.createComponent(PostPage);
        page    = fixture.componentInstance;
    });
 
    afterEach(() => {
        fixture.destroy();
        page = null;
    });
 
    it('Page: post page is created', () => {

        expect(fixture).toBeTruthy();
        expect(page).toBeTruthy();
 
    });

    /*
    it('Page redirects to List Page if post is null', () => {
        page.getComments();
        //expect(page.navCtrl).toBe('ListPage');
    });
    */
 
});