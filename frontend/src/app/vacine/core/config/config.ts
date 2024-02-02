export class Config{
  readonly API_URL : string = 'http://localhost:8080';

  static getApiUrl(): string {
    return new Config().API_URL;
  }
}
