/* eslint-disable no-empty-function */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-useless-constructor */
import {Uri} from './uri';

class Route {
  private static instance: Route;

  private constructor() {}

  public static getInstance(): Route {
    if (!Route.instance) {
      Route.instance = new Route();
    }

    return Route.instance;
  }

  Home = new Uri('/');

  Quiz = new Uri('/quizzes');

  Viko = new Uri('/viko');

  News = new Uri('/news');

  Exclusive = new Uri('/exclusive');

  Media = new Uri('/media');

  AboutUs = new Uri('/about-us');

  ContactUs = new Uri('/contact-us');

  Support = new Uri('/support');

  Video = class Video {
    static Base = '/v';

    static Detail(slug: string) {
      return new Uri(`${Video.Base}/${slug}`, `${Video.Base}/:slug`);
    }
  };
}

const Paths = Route.getInstance();
export default Paths;
