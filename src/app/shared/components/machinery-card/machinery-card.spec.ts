import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineryCard } from './machinery-card';

describe('MachineryCard', () => {
  let component: MachineryCard;
  let fixture: ComponentFixture<MachineryCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MachineryCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MachineryCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
