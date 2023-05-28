export interface GeocodingSearch {
  results: SearchResult[];
  generationtimeMs: number;
}

export interface SearchResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  featureCode: string;
  countryCode: string;
  admin1Id: number;
  timezone: string;
  population: number;
  countryId: number;
  country: string;
  admin1: string;
}
