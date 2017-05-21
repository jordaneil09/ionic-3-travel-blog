import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ErrorHandler } from '@angular/core';

import {} from 'jasmine';
 
let comp: MyApp;
let fixture: ComponentFixture<MyApp>;
 
describe('Component: Root Component', () => {
 
    beforeEach(async(() => {
 
        TestBed.configureTestingModule({
 
            declarations: [MyApp],
 
            providers: [
                StatusBar,
                SplashScreen,
                {provide: ErrorHandler, useClass: IonicErrorHandler}
            ],
 
            imports: [
                IonicModule.forRoot(MyApp)
            ]
 
        }).compileComponents();
 
    }));
 
    beforeEach(() => {
 
        fixture = TestBed.createComponent(MyApp);
        comp    = fixture.componentInstance;
 
    });
 
    afterEach(() => {
        fixture.destroy();
        comp = null;
    });
 
    it('App is created', () => {
        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();
    });
 
    it('Initialises app with a root page of HomePage', () => {
        expect(comp['rootPage']).toBe('HomePage');
    });
 
});