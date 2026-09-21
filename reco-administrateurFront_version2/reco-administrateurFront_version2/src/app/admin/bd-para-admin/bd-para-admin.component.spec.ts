import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BdParaAdminComponent } from './bd-para-admin.component';

describe('BdParaAdminComponent', () => {
  let component: BdParaAdminComponent;
  let fixture: ComponentFixture<BdParaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BdParaAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BdParaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
