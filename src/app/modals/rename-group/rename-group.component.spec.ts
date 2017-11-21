import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenameGroupComponent } from './rename-group.component';

describe('RenameGroupComponent', () => {
  let component: RenameGroupComponent;
  let fixture: ComponentFixture<RenameGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenameGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenameGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
