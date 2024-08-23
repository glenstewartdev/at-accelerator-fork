import { Component, EventEmitter, Output, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.css']
})
export class SearchViewComponent {

  searchTerm = input<string>('');
  @Output() searchTermChange = new EventEmitter<string>();

  onSearch(event: Event, searchTerm: string) {
    event.preventDefault();
    this.searchTermChange.emit(searchTerm);
  }

}
