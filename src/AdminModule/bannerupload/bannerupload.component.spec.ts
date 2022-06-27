import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanneruploadComponent } from './bannerupload.component';

describe('BanneruploadComponent', () => {
  let component: BanneruploadComponent;
  let fixture: ComponentFixture<BanneruploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BanneruploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BanneruploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
