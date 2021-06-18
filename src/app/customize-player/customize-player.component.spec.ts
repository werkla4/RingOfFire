import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizePlayerComponent } from './customize-player.component';

describe('CustomizePlayerComponent', () => {
  let component: CustomizePlayerComponent;
  let fixture: ComponentFixture<CustomizePlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomizePlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
