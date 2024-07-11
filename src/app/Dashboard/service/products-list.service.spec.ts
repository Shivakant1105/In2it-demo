import { TestBed,  } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsListService } from './products-list.service';

describe('ProductsListService', () => {
  let service: ProductsListService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsListService]
    });

    service = TestBed.inject(ProductsListService);
    httpMock = TestBed.inject(HttpTestingController);
  });


  it('should retrieve products from the API via GET', () => {
    const mockProducts = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' }
    ];

    service.getProductsList().subscribe(products => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne('http://localhost:3000/resData');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Accept')).toBe('application/json');

    req.flush(mockProducts);
  });
});
