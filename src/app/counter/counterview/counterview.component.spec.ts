import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterviewComponent } from './counterview.component';

describe('CounterviewComponent', () => {
  let component: CounterviewComponent;
  let fixture: ComponentFixture<CounterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
