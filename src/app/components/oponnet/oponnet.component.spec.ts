import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OponnetComponent } from './oponnet.component';

describe('OponnetComponent', () => {
  let component: OponnetComponent;
  let fixture: ComponentFixture<OponnetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OponnetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OponnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
