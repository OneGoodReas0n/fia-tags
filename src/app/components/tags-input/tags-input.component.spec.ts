import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TagsInputComponent } from './tags-input.component';

describe('TagsInputComponent', () => {
  let component: TagsInputComponent;
  let fixture: ComponentFixture<TagsInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsInputComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TagsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
