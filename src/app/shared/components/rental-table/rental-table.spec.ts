import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalTable } from './rental-table';

describe('RentalTable', () => {
  let component: RentalTable;
  let fixture: ComponentFixture<RentalTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentalTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentalTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
