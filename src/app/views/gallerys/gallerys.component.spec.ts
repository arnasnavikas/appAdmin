import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GallerysComponent } from './gallerys.component';

describe('GallerysComponent', () => {
  let component: GallerysComponent;
  let fixture: ComponentFixture<GallerysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GallerysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GallerysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
