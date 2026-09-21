import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametresGenerauxAdminComponent } from './parametres-generaux-admin.component';

describe('ParametresGenerauxAdminComponent', () => {
  let component: ParametresGenerauxAdminComponent;
  let fixture: ComponentFixture<ParametresGenerauxAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParametresGenerauxAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParametresGenerauxAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
