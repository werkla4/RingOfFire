import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersOnTopComponent } from './players-on-top.component';

describe('PlayersOnTopComponent', () => {
  let component: PlayersOnTopComponent;
  let fixture: ComponentFixture<PlayersOnTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayersOnTopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersOnTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
