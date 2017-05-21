import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackHintComponent } from './track-hint.component';

describe('TrackHintComponent', () => {
  let component: TrackHintComponent;
  let fixture: ComponentFixture<TrackHintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackHintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackHintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
