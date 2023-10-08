import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsistirPage } from './asistir.page';

describe('AsistirPage', () => {
  let component: AsistirPage;
  let fixture: ComponentFixture<AsistirPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AsistirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
