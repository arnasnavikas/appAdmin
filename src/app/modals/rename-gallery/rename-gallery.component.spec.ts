import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenameGalleryComponent } from './rename-gallery.component';

describe('RenameGalleryComponent', () => {
  let component: RenameGalleryComponent;
  let fixture: ComponentFixture<RenameGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenameGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenameGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
