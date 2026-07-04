import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { UploadAsync } from './upload-async';

describe('UploadAsync', () => {
  let component: UploadAsync;
  let fixture: ComponentFixture<UploadAsync>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadAsync],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(UploadAsync);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
