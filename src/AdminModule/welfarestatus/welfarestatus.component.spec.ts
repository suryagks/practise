import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelfarestatusComponent } from './welfarestatus.component';

describe('WelfarestatusComponent', () => {
  let component: WelfarestatusComponent;
  let fixture: ComponentFixture<WelfarestatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelfarestatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelfarestatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
