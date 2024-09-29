export interface iTunesResponse {
  resultCount: number;
  results: iTunesSearchResult[];
}

export interface iTunesSearchResult {
  trackId: number;
  trackName: string;
  bundleId: string;
  version: string;
  artworkUrl100: string;
  fileSizeBytes: number;
  price: number;
  formattedPrice: string;
  description: string;
  trackViewUrl: string;
}
