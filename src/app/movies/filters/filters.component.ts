import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent {
  title: string = '';
  releaseYear: number | null = null;

  @Output() filterChanged: EventEmitter<{ title: string; releaseYear: number | null }> = new EventEmitter<{ title: string; releaseYear: number | null }>();

  onFilterChange(): void {
    this.filterChanged.emit({
      title: this.title,
      releaseYear: this.releaseYear
    });
  }
}
