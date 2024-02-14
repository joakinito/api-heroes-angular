import { Component, OnInit } from '@angular/core';
import { SeriesService } from '../servicios/series.service';
import { Hero } from '../../interfaces/hero';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {
  series: Hero[] = []; 
  currentPage = 1;
  pageSize = 4; 

  constructor(private seriesService: SeriesService) {}

  public ngOnInit(): void {
    this.loadSeries();
  }

  public loadSeries(): void {
    const offset = (this.currentPage - 0) * this.pageSize;
    this.seriesService.getSeries(offset, this.pageSize)
      .subscribe(series => this.series = series);
  }

  public nextPage(): void {
    this.currentPage++;
    this.loadSeries();
  }

  public prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadSeries();
    }
  }
}
