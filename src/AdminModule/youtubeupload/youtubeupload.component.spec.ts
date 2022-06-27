import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeuploadComponent } from './youtubeupload.component';

describe('YoutubeuploadComponent', () => {
  let component: YoutubeuploadComponent;
  let fixture: ComponentFixture<YoutubeuploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YoutubeuploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubeuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
