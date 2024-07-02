import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
    // service = new DataService();
  });
  afterEach(() => {
    // Clear localStorage after each test
    localStorage.removeItem('data');
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update headerSub with provided data', () => {
    const testData = { links: 'example-links', module: 'example-module' };

    // Call setHeader with testData
    service.setHeader(testData);

    // Subscribe to headerSub and check the emitted value
    service.headerSub.subscribe(headerData => {
      expect(headerData).toEqual(testData);
    });
  });
  it('should get table data from localStorage', () => {
    const mockData = [{ id: 1, name: 'Task 1' }, { id: 2, name: 'Task 2' }];
    localStorage.setItem('data', JSON.stringify(mockData));

    const result = service.getTableData();

    expect(result).toEqual(mockData);
  });

  it('should add a task to localStorage', () => {
    // const mockData = [{ id: 1, name: 'Task 1' }];
    const newTask = { id: 2, name: 'Task 2' };

    service.addTask(newTask);

    const storedData = JSON.parse(localStorage.getItem('data')!);
    expect(storedData).toContain(newTask);
  });

  it('should delete a task from localStorage', () => {
    const mockData = [{ id: 1, name: 'Task 1' }, { id: 2, name: 'Task 2' }, { id: 3, name: 'Task 3' }];
    localStorage.setItem('data', JSON.stringify(mockData));
    const taskIdToDelete = 1; // Assuming id of the task to delete
  
    service.deleteTask(taskIdToDelete);
  
    const storedData = JSON.parse(localStorage.getItem('data')!);
    
    // Check that the task with id 1 is not in the storedData array
    expect(storedData.find((task: any) => task.id === taskIdToDelete)).toBeUndefined();
    // Check that the length of the storedData array is reduced by 1 after deletion
    expect(storedData.length).toBe(mockData.length - 1);
  });
  

  it('should set and get table data using subjects', () => {
    const mockData = [{ id: 1, name: 'Task 1' }, { id: 2, name: 'Task 2' }];

    service.setTableData(mockData);

    service.tableData$.subscribe(data => {
      expect(data).toEqual(mockData);
    });
  });

  it('should update contact data using BehaviorSubject', () => {
    const mockData = [{ id: 1, name: 'Contact 1' }, { id: 2, name: 'Contact 2' }];

    service.updateContactData(mockData);

    service.allData.subscribe(data => {
      expect(data).toEqual(mockData);
    });
  });

  it('should get all contact data from BehaviorSubject', () => {
    const mockData = [{ id: 1, name: 'Contact 1' }, { id: 2, name: 'Contact 2' }];

    service.updateContactData(mockData);

    const result = service.getAllContactData();

    expect(result).toEqual(mockData);
  });
});
