import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignerComponent } from './designer.component';

describe('DesignerComponent', () => {
  let component: DesignerComponent;
  let fixture: ComponentFixture<DesignerComponent>;
  let addButton: HTMLElement;
  let removeButton: HTMLElement;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignerComponent ],
      imports:[]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    addButton = fixture.nativeElement.querySelector('#addButton');
    removeButton = fixture.nativeElement.querySelector('#removeButton');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should add data from JSON on button click and update chart data', () => {

    addButton.dispatchEvent(new Event('click'));

  });
  it('should add data from JSON on button click and update chart data', () => {

    removeButton.dispatchEvent(new Event('click'));
    // fixture.detectChanges();

  });

});