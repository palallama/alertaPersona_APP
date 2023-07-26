import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperoMailPage } from './recupero-mail.page';

describe('RecuperoMailPage', () => {
  let component: RecuperoMailPage;
  let fixture: ComponentFixture<RecuperoMailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RecuperoMailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
