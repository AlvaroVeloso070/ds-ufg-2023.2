export class Config{
  readonly API_URL : string = 'https://vacinacao-ds.onrender.com';

  static getApiUrl(): string {
    return new Config().API_URL;
  }
}
