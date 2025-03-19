import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveTicketsListComponent } from './archive-tickets-list.component';

describe('ArchiveTicketsListComponent', () => {
  let component: ArchiveTicketsListComponent;
  let fixture: ComponentFixture<ArchiveTicketsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchiveTicketsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchiveTicketsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
