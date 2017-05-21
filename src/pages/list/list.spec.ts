import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { IonicModule, IonicErrorHandler, IonicPageModule, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ErrorHandler } from '@angular/core';
import { ComponentsModule } from '../../components/components.module';
import { NavMock } from '../../mocks';
import { WordPressModule } from 'ngx-wordpress';
 
import {} from 'jasmine';
import { ListPage } from './list';

let page: ListPage;
let fixture: ComponentFixture<ListPage>;
 
describe('Component: List Component', () => {
 
    beforeEach(async(() => {
 
        TestBed.configureTestingModule({
 
            declarations: [ListPage],
 
            providers: [
                {provide: NavParams, useValue: {}},
                StatusBar,
                SplashScreen,
                {provide: ErrorHandler, useClass: IonicErrorHandler},
                {provide: NavController, useValue: NavMock}
            ],
 
            imports: [
                IonicModule.forRoot(ListPage),
                IonicPageModule.forChild(ListPage),
                WordPressModule.forRoot('http://devel2.ordermate.online'),
                ComponentsModule
            ]
 
        }).compileComponents();
 
    }));
 
    beforeEach(() => {
        fixture = TestBed.createComponent(ListPage);
        page    = fixture.componentInstance;
    });
 
    afterEach(() => {
        fixture.destroy();
        page = null;
    });
 
    it('Page: list page is created', () => {

        expect(fixture).toBeTruthy();
        expect(page).toBeTruthy();
 
    });

    it('get posts and display', () => {
        page.unitTestingGetPosts();
        expect(page.blogPosts.length).toBeGreaterThan(0);
    });
    
 
});