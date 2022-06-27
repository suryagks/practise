import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserspostsComponent } from './usersposts.component';

describe('UserspostsComponent', () => {
  let component: UserspostsComponent;
  let fixture: ComponentFixture<UserspostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserspostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserspostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
