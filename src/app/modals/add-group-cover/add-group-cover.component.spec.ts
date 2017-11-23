import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroupCoverComponent } from './add-group-cover.component';

describe('AddGroupCoverComponent', () => {
  let component: AddGroupCoverComponent;
  let fixture: ComponentFixture<AddGroupCoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGroupCoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGroupCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
