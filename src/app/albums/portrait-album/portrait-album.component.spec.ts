import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortraitAlbumComponent } from './portrait-album.component';

describe('PortraitAlbumComponent', () => {
  let component: PortraitAlbumComponent;
  let fixture: ComponentFixture<PortraitAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortraitAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortraitAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
