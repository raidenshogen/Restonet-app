import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BdTestAdminComponent } from './bd-test-admin.component';

describe('BdTestAdminComponent', () => {
  let component: BdTestAdminComponent;
  let fixture: ComponentFixture<BdTestAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BdTestAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BdTestAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
