import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWelfareComponent } from './add-welfare.component';

describe('AddWelfareComponent', () => {
  let component: AddWelfareComponent;
  let fixture: ComponentFixture<AddWelfareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWelfareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWelfareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
