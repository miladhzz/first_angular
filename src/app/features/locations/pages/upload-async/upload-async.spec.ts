import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { UploadAsyncPage } from './upload-async';

describe('UploadAsyncPage', () => {
  let component: UploadAsyncPage;
  let fixture: ComponentFixture<UploadAsyncPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadAsyncPage],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UploadAsyncPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
