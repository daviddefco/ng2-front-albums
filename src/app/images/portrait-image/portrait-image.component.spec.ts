import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortraitImageComponent } from './portrait-image.component';

describe('PortraitImageComponent', () => {
  let component: PortraitImageComponent;
  let fixture: ComponentFixture<PortraitImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortraitImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortraitImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
