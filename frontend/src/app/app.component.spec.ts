import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Component } from '@angular/core';

import { AppComponent } from './app.component';
import { cold } from 'jasmine-marbles';

// Component stubs
@Component({ selector: 'app-message', template: '' })
class AppMessageStubComponent {
}

// Component stubs
@Component({ selector: 'mat-icon', template: '' })
class MatIconStubComponent {
}

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore;
  const initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        AppMessageStubComponent,
        MatIconStubComponent
      ],
      providers: [
        provideMockStore({ initialState })
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'udacity-fsjd-project-3'`, () => {
    expect(app.title).toEqual('udacity-fsjd-project-3');
  });

  it(`should dispatch a Logout action when logout is called`, () => {
    const expected = cold('a', {
      a: {
        type: '[auth] Logout',
      }
    });

    app.logout();

    expect(store.scannedActions$).toBeObservable(expected);
  });
});
