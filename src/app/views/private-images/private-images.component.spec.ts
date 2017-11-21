import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateImagesComponent } from './private-images.component';

describe('PrivateImagesComponent', () => {
  let component: PrivateImagesComponent;
  let fixture: ComponentFixture<PrivateImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
