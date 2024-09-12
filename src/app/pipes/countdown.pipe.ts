import { Pipe, PipeTransform } from '@angular/core';
import { TvShowDetail } from '../services/tv-shows/tv-show.model';
import { formatDistanceToNow } from 'date-fns';

@Pipe({
  name: 'countdown',
  standalone: true
})
export class CountdownPipe implements PipeTransform {

  transform(showDetails: TvShowDetail, ...args: unknown[]): unknown {
    if (showDetails.countdown && showDetails.countdown.air_date) {
      return this.nextEpisodeDistance(showDetails.countdown.air_date);
    } else if (showDetails.status === "Ended" || showDetails.status === "Canceled/Ended") {
      return 'Show has ended';
    }
    return 'No next episode scheduled.';
  }

  nextEpisodeDistance(airDate: string): string {
    let returnValue = formatDistanceToNow(new Date(airDate));
    return returnValue;
  }

}
