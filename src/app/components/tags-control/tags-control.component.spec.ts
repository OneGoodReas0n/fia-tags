import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TagsControlComponent } from './tags-control.component';

describe('TagsControlComponent', () => {
  let component: TagsControlComponent;
  let fixture: ComponentFixture<TagsControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsControlComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TagsControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
