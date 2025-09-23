import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceTable } from './maintenance-table';

describe('MaintenanceTable', () => {
  let component: MaintenanceTable;
  let fixture: ComponentFixture<MaintenanceTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaintenanceTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintenanceTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
