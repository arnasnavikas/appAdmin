import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroupDescriptionComponent } from './add-group-description.component';

describe('AddGroupDescriptionComponent', () => {
  let component: AddGroupDescriptionComponent;
  let fixture: ComponentFixture<AddGroupDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGroupDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGroupDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
