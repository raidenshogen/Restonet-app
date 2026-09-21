import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotfndAdminComponent } from './page-notfnd-admin.component';

describe('PageNotfndAdminComponent', () => {
  let component: PageNotfndAdminComponent;
  let fixture: ComponentFixture<PageNotfndAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageNotfndAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageNotfndAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
