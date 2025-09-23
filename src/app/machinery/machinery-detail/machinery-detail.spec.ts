import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineryDetail } from './machinery-detail';

describe('MachineryDetail', () => {
  let component: MachineryDetail;
  let fixture: ComponentFixture<MachineryDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MachineryDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MachineryDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
