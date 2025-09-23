import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineryList } from './machinery-list';

describe('MachineryList', () => {
  let component: MachineryList;
  let fixture: ComponentFixture<MachineryList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MachineryList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MachineryList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
