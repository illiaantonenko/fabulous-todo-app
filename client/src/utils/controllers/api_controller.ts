/*
 * Request Controller is layer which provide interface to external API's
 * This abstraction level provides a couple features:
 * - check authorization
 * - request resources
 */

export interface IRequestParams {
  token?: string;
  body?: BodyInit;
  query?: Record<string, string>;
}

export interface IResponseBody<T> {
  status: number;
  ok: boolean;
  body: T;
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/*
 * Using this interfaces you can customize type discription
 * T - interface for return value
 * T1 - interface for request body value, could be optionaly skiped
 *
 * @example
 *   interface IPostItemQuery { foo: string; }
 *   interface IPostItemResponce { id: string; }
 *   const postItem = new APIController<IPostItemResponce, IPostItemQuery>(
 *     'POST',
 *     'https://api.google.com/item/{foo}',
 *     'json',
 *   );
 *   postItem.send({
 *     token: 'some token',
 *     body: 'json str',
 *     query: { foo: 'bar' },
 *   });
 */

export default class APIController<T = {}> {
  url: string;

  method: string;

  contentType: string;

  requestTimeout: number | undefined;

  constructor(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    url: string,
    contentType: 'application/json' | 'text/plain' | 'multipart/form-data',
    requestTimeout?: number,
  ) {
    this.url = url;
    this.method = method;
    this.contentType = contentType;
    this.requestTimeout = requestTimeout;
  }

  configureHeaders(token?: string): Headers {
    const headers = new Headers();

    // set content type of respond
    if (this.contentType !== 'multipart/form-data') {
      headers.append('Content-Type', this.contentType);
    }

    // check is request with authorization
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  async requestResource(params: IRequestParams = {}): Promise<Response> {
    const { token, body, query } = params;
    const headers = this.configureHeaders(token);
    let { url } = this;

    if (query) {
      const keys: string[] = Object.keys(query);

      for (const key of keys) {
        url = url.replace(`{${key}}`, query[key]);
      }
    }

    const promises = [
      fetch(url, {
        headers,
        body,
        method: this.method,
      }),
    ];

    if (this.requestTimeout) {
      promises.push(
        new Promise<Response>((resolve, reject) => (
          setTimeout(
            reject,
            this.requestTimeout,
            new Response(null, { status: 408 }),
          )
        )),
      );
    }

    return Promise.race(promises);
  }

  async json(params?: IRequestParams): Promise<IResponseBody<T>> {
    const responce = await this.requestResource(params);
    const json = await responce.json();

    return {
      status: responce.status,
      ok: responce.ok,
      body: json,
    };
  }

  async text(params?: IRequestParams): Promise<IResponseBody<string>> {
    const responce = await this.requestResource(params);
    const text = await responce.text();

    return {
      status: responce.status,
      ok: responce.ok,
      body: text,
    };
  }

  async buffer(params?: IRequestParams): Promise<IResponseBody<ArrayBuffer>> {
    const responce = await this.requestResource(params);
    const buffer = await responce.arrayBuffer();

    return {
      status: responce.status,
      ok: responce.ok,
      body: buffer,
    };
  }

  async empty(params?: IRequestParams): Promise<Omit<IResponseBody<T>, 'body'>> {
    const responce = await this.requestResource(params);

    return {
      status: responce.status,
      ok: responce.ok,
    };
  }

  async send(params?: IRequestParams): Promise<IResponseBody<T | string>> {
    switch (this.contentType) {
      case 'text/plain':
        return this.text(params);
      case 'application/json':
        return this.json(params);
      default:
        throw new Error(`APIController: Unsopported content type ${this.contentType}`);
    }
  }
}
