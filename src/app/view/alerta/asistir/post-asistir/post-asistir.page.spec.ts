import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostAsistirPage } from './post-asistir.page';

describe('PostAsistirPage', () => {
  let component: PostAsistirPage;
  let fixture: ComponentFixture<PostAsistirPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PostAsistirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
