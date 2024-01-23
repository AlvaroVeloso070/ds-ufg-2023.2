export class Config{
  readonly API_URL : string = 'http://161.35.235.79:8080';

  static getApiUrl(): string {
    return new Config().API_URL;
  }
}
