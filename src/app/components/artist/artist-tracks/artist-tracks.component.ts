import { Component, OnInit } from '@angular/core';
import { SpotifyApiService } from 'src/app/services/spotify-api.service';
import { TimeFormatPipe } from 'src/app/shared/time-format.pipe';

@Component({
  selector: 'app-artist-tracks',
  templateUrl: './artist-tracks.component.html',
  styleUrls: ['./artist-tracks.component.scss']
})
export class ArtistTracksComponent implements OnInit {

  constructor(
    private spotifyApi: SpotifyApiService,
  ) { }

  ngOnInit(): void {
    this.spotifyApi.currentArtistTracks$ = this.spotifyApi.getArtistTracks(this.spotifyApi.currentArtistId);
  }

  get currentArtistTracks() {
    return this.spotifyApi.currentArtistTracks$;
  }
}
