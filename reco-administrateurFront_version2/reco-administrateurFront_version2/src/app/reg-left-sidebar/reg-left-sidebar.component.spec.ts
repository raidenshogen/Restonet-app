import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegLeftSidebarComponent } from './reg-left-sidebar.component';

describe('RegLeftSidebarComponent', () => {
  let component: RegLeftSidebarComponent;
  let fixture: ComponentFixture<RegLeftSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegLeftSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegLeftSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
