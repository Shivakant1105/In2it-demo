import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { DataService } from 'src/app/Dashboard/service/data.service';
import { AgGridModule } from 'ag-grid-angular';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { RouterTestingModule } from '@angular/router/testing';

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
      imports:[ AgGridModule, RouterTestingModule,
        FeatherModule.pick(allIcons),],
      providers: [{ provide: DataService, useValue: dataServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
    // fixture.detectChanges();
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
