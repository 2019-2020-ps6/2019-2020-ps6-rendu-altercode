import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionPlayComponent } from './question-play.component';

describe('QuestionComponent', () => {
  let component: QuestionPlayComponent;
  let fixture: ComponentFixture<QuestionPlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionPlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
