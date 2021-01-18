import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MsjConfirmPage } from './msj-confirm.page';

describe('MsjConfirmPage', () => {
  let component: MsjConfirmPage;
  let fixture: ComponentFixture<MsjConfirmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsjConfirmPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MsjConfirmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
