import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderStatsComponent } from './folder-stats.component';

describe('FolderStatsComponent', () => {
  let component: FolderStatsComponent;
  let fixture: ComponentFixture<FolderStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
