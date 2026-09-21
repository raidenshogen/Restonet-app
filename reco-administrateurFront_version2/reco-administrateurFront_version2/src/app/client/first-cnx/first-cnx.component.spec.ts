import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstCnxComponent } from './first-cnx.component';

describe('FirstCnxComponent', () => {
  let component: FirstCnxComponent;
  let fixture: ComponentFixture<FirstCnxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FirstCnxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FirstCnxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
