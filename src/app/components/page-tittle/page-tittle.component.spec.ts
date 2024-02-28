import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTittleComponent } from './page-tittle.component';

describe('PageTittleComponent', () => {
  let component: PageTittleComponent;
  let fixture: ComponentFixture<PageTittleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageTittleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageTittleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
