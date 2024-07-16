import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowsComponent } from './workflows.component';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

describe('WorkflowsComponent', () => {
  let component: WorkflowsComponent;
  let fixture: ComponentFixture<WorkflowsComponent>;
  const mockWorkflowData = {
    contact: [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
    ],
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkflowsComponent],
      imports: [FeatherModule.pick(allIcons), NgbNavModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowsComponent);
    component = fixture.componentInstance;
    component.workflowData = mockWorkflowData;
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('cell renderr ', () => {
    const { cellRenderer }: any = component.columnDefs[1];
    cellRenderer({ value: 'Active' });
  });

  it('should create a link with correct text and call getDataCard on click', () => {
    const params = {
      value: 'Click Me',
      data: { id: 1, name: 'Test Data' },
    };

    const linkElement = component.columnDefs[1].cellRenderer.call(
      component,
      params
    );
    linkElement.click();
  });
  it('should initialize organizations and contactTable in ngOnInit', () => {
    expect(component.organizations).toBe(mockWorkflowData);
    expect(component.contactTable).toBe(mockWorkflowData.contact);
  });

  it('should set showSideCard to true and selectedRowData to the row passed to openSideCard', () => {
    const row = { id: 1, name: 'John Doe' };
    component.openSideCard(row);
    expect(component.showSideCard).toBeTrue();
    expect(component.selectedRowData).toBe(row);
  });

  it('should set addCard to true in togglebtn', () => {
    component.togglebtn();
    expect(component.addCard).toBeTrue();
  });

  it('should set cardData to the contact passed to getDataCard and call togglebtn', () => {
    spyOn(component, 'togglebtn').and.callThrough();
    const contact = { id: 1, name: 'John Doe' };
    component.getDataCard(contact);
    expect(component.togglebtn).toHaveBeenCalled();
    expect(component.cardData).toBe(contact);
  });
  it('should set addCard to false in close', () => {
    component.close();
    expect(component.addCard).toBeFalse();
  });
});
