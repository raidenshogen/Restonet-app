import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationAdminComponent } from './administration-admin.component';

describe('AdministrationAdminComponent', () => {
  let component: AdministrationAdminComponent;
  let fixture: ComponentFixture<AdministrationAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministrationAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdministrationAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
