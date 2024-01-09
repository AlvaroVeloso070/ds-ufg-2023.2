export class Config{
  readonly API_URL : string = 'https://api-vacinacao.onrender.com';

  static getApiUrl(): string {
    return new Config().API_URL;
  }
}
