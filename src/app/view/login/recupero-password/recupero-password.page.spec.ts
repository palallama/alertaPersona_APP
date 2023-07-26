import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperoPasswordPage } from './recupero-password.page';

describe('RecuperoPasswordPage', () => {
  let component: RecuperoPasswordPage;
  let fixture: ComponentFixture<RecuperoPasswordPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RecuperoPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
