import { CurrentUser } from '../decorators/current-user';

declare module 'express' {
  export interface Request {
    user?: CurrentUser;
  }
}

declare module 'rxjs' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Observable<T> extends AsyncIterable<T> {}
}
