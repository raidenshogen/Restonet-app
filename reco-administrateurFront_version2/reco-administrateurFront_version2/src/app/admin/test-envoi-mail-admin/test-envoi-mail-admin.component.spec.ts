import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestEnvoiMailAdminComponent } from './test-envoi-mail-admin.component';

describe('TestEnvoiMailAdminComponent', () => {
  let component: TestEnvoiMailAdminComponent;
  let fixture: ComponentFixture<TestEnvoiMailAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestEnvoiMailAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestEnvoiMailAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
