export class Uri {
  constructor(
    public url: string,
    public route?: string,
  ) {
    this.url = url;
    this.route = route || url;
  }

  getRoute() {
    return this.route;
  }

  getPath() {
    return this.url;
  }

  getAbsoulteUri() {
    return process.env.NEXT_PUBLIC_BASE_URL + this.url;
  }
}
