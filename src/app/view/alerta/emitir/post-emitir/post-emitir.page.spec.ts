import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostEmitirPage } from './post-emitir.page';

describe('PostEmitirPage', () => {
  let component: PostEmitirPage;
  let fixture: ComponentFixture<PostEmitirPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PostEmitirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
