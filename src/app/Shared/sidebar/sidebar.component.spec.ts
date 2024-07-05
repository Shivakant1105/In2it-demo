import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { DataService } from 'src/app/Dashboard/service/data.service';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let dataService: DataService;
  beforeEach(async () => {
    const dataServiceMock = {
      setHeader: jasmine.createSpy('setHeader'),
    };

    await TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      providers: [{ provide: DataService, useValue: dataServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call setHeader with correct arguments', () => {
    const links = 'testLinks';
    const module = 'testModule';

    component.setHeader(links, module);

    expect(dataService.setHeader).toHaveBeenCalledWith({ links, module });
  });
});
