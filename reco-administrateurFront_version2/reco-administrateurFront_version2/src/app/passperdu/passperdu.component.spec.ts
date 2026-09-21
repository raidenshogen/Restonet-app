import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassperduComponent } from './passperdu.component';

describe('PassperduComponent', () => {
  let component: PassperduComponent;
  let fixture: ComponentFixture<PassperduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassperduComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PassperduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
