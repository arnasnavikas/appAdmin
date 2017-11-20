import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryDescriptionComponent } from './gallery-description.component';

describe('GalleryDescriptionComponent', () => {
  let component: GalleryDescriptionComponent;
  let fixture: ComponentFixture<GalleryDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
