import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersComponent } from './filters.component';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltersComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit filterChanged with the correct values', () => {
    component.title = 'Inception';
    component.releaseYear = 2010;

    spyOn(component.filterChanged, 'emit');

    component.onFilterChange();

    expect(component.filterChanged.emit).toHaveBeenCalledWith({
      title: 'Inception',
      releaseYear: 2010
    });
  });

  it('should emit filterChanged with releaseYear null', () => {
    component.title = 'Interstellar';
    component.releaseYear = null;

    spyOn(component.filterChanged, 'emit');

    component.onFilterChange();

    expect(component.filterChanged.emit).toHaveBeenCalledWith({
      title: 'Interstellar',
      releaseYear: null
    });
  });
});
