import axios, { AxiosInstance } from 'axios';
import config from 'config';
import {
  ApiCollection,
  ApiData,
  ApiDocument,
  ApiErrorResponse,
  ApiResponse,
} from 'interfaces/api';
import { UploadedFile } from 'interfaces/file';
import { User, UserAuthResponse, UserSignUpFields } from 'interfaces/user';

export enum ContentType {
  PAGE_CARTOS = 'page-cartos',
  GEO_MAPS = 'geo-maps',
  DATASET = 'datasets',
  DATA_FRAGMENT = 'data-fragments',
  COLUMN = 'columns',
  INDICATOR = 'indicators',
  EQUATION = 'equations',
  USERS = 'users',
  TAGS = 'tags',
}

type FilterOperator =
  | '$eq' //	Equal
  | '$eqi' //	Equal (case-insensitive)
  | '$ne' //	Not equal
  | '$lt' //	Less than
  | '$lte' //	Less than or equal to
  | '$gt' //	Greater than
  | '$gte' //	Greater than or equal to
  | '$in' //	Included in an array
  | '$notIn' //	Not included in an array
  | '$contains' //	Contains
  | '$notContains' //	Does not contain
  | '$containsi' //	Contains (case-insensitive)
  | '$notContainsi' //	Does not contain (case-insensitive)
  | '$null' //	Is null
  | '$notNull' //	Is not null
  | '$between' //	Is between
  | '$startsWith' //	Starts with
  | '$endsWith' //	Ends with
  | '$or' //	Joins the filters in an "or" expression
  | '$and'; //	Joins the filters in an "and" expression

export type QueryFilterParam = {
  // eslint-disable-next-line
  [field: string]: QueryFilterParam | { [operator in FilterOperator]?: any };
};

export type QueryParams = {
  filters?: {
    // eslint-disable-next-line
    [field: string]: { [operator in FilterOperator]?: any };
  };
  populate?:
    | string
    | string[]
    | {
        [field: string]: boolean | { populate: { [field: string]: boolean } };
      };

  sort?: string | string[]; // exp. 'createdAt:desc'
  pagination?: {
    page?: number; // default 1
    pageSize?: number; // default 25
    start?: number; // default 0
    limit?: number; // default 25
    withCount?: boolean;
  };
};

class Strapi {
  public token: string | undefined;
  public request: AxiosInstance;

  /**
   * A strapi-client instance.
   */
  constructor(baseURL: string) {
    /** @type {string} A valid JSONWebToken. */
    this.token = undefined;
    this.request = axios.create({ baseURL });

    // Request Interceptor
    this.request.interceptors.request.use(
      (config) => {
        if (this.token && config.headers) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response Interceptor
    this.request.interceptors.response.use(
      (resp) => resp.data,
      (error) => Promise.reject(error.response.data)
    );
  }

  /**
   * Get currently authenticated user.
   */
  currentUser(token: string): Promise<User> {
    if (token) this.token = token;
    return this.request
      .get<void, User>('/api/users/me')
      .catch(({ error }: ApiErrorResponse) => {
        throw error;
      });
  }

  /**
   * Update current user
   */
  updateCurrentUser(
    userId: number,
    data: Pick<User, 'username' | 'email' | 'password'>
  ) {
    return this.request
      .put<Pick<User, 'username' | 'email' | 'password'>, User>(
        `/api/users/${userId}`,
        data
      )
      .catch(({ error }: ApiErrorResponse) => {
        throw error;
      });
  }

  /**
   * Login and generate an authenticated token.
   */
  login(identifier: string, password: string): Promise<UserAuthResponse> {
    return this.request
      .post<{ identifier: string; password: string }, UserAuthResponse>(
        '/api/auth/local',
        { identifier, password }
      )
      .then(({ user, jwt }) => {
        this.token = jwt;
        return { jwt, user };
      })
      .catch(({ error }: ApiErrorResponse) => {
        throw error;
      });
  }

  /**
   * Remove token on logout
   */
  logout() {
    this.token = undefined;
  }

  /**
   * Register a new user.
   */
  register(data: UserSignUpFields): Promise<UserAuthResponse> {
    return this.request
      .post<UserSignUpFields, UserAuthResponse>(
        '/api/auth/local/register',
        data
      )
      .then(({ jwt, user }) => {
        this.token = jwt;
        return { jwt, user };
      })
      .catch(({ error }: ApiErrorResponse) => {
        throw error;
      });
  }

  // TODO: Forgot password, Reset password

  /**
   * Forgot password
   * @param {string} email - Email that will recieve the link for password reset
   */
  forgotPassword(email: string): Promise<boolean> {
    return this.request
      .post<{ email: string }, boolean>('/api/auth/forgot-password', { email })
      .then((response) => response)
      .catch(({ error }: ApiErrorResponse) => {
        throw error;
      });
  }

  /**
   * Reset password
   */
  resetPassword(
    code: string,
    password: string,
    passwordConfirmation: string
  ): Promise<UserAuthResponse> {
    return this.request
      .post<
        { code: string; password: string; passwordConfirmation: string },
        UserAuthResponse
      >('/api/auth/reset-password', { code, password, passwordConfirmation })
      .then(({ jwt, user }) => {
        this.token = jwt;
        return { jwt, user };
      })
      .catch(({ error }: ApiErrorResponse) => {
        throw error;
      });
  }

  /**
   * Count the data of a content-type.
   */
  count<T extends ContentType>(contentType: T, params: QueryParams) {
    return this.request
      .get<QueryParams, ApiData<T>>(
        `/api/${contentType}/count`,
        params && { params }
      )
      .catch(({ error }: ApiErrorResponse) => {
        throw error;
      });
  }

  /**
   * Create an entry to the given content-type.
   */
  create<T>(contentType: ContentType, data: T) {
    return this.request
      .post<T, ApiResponse<ApiDocument<T>>>(`/api/${contentType}`, { data })
      .catch(({ error }: ApiErrorResponse) => {
        throw error;
      });
  }

  /**
   * get a content-type entry by id.
   */
  getById<R>(contentType: ContentType, id: number, params?: QueryParams) {
    return this.request
      .get<QueryParams, ApiResponse<ApiDocument<R>>>(
        `/api/${contentType}/${id}`,
        params && {
          params,
        }
      )
      .catch(({ error }: ApiErrorResponse) => {
        throw error;
      });
  }

  /**
   * Get a content-type collection.
   */
  get<R>(contentType: ContentType, params?: QueryParams) {
    return this.request
      .get<QueryParams, ApiCollection<R>>(
        `/api/${contentType}`,
        params && {
          params,
        }
      )
      .catch(({ error }: ApiErrorResponse) => {
        throw error;
      });
  }

  /**
   * Update an entry in a content-type.
   */
  update<T, R>(contentType: ContentType, id: number, data: Partial<T>) {
    return this.request
      .put<Partial<T>, ApiResponse<ApiDocument<R>>>(
        `/api/${contentType}/${id}`,
        data
      )
      .catch(({ error }: ApiErrorResponse) => {
        throw error;
      });
  }

  /**
   * Delete an entry.
   */
  delete<R>(contentType: ContentType, id: number) {
    return this.request
      .delete<void, ApiResponse<ApiDocument<R>>>(`/api/${contentType}/${id}`)
      .catch(({ error }: ApiErrorResponse) => {
        throw error;
      });
  }

  /**
   * Uploads a file.
   */
  uploadFile(
    file: File,
    ref: string,
    filename?: string,
    refId?: number,
    field?: string
  ) {
    const formData = new FormData();
    formData.append('files', file, filename);
    formData.append('ref', ref);
    if (refId) {
      formData.append('refId', refId.toString());
    }
    if (field) {
      formData.append('field', field);
    }
    return this.request
      .post<FormData, UploadedFile[]>('/api/upload', formData)
      .then(([uploadedfile]) => {
        return uploadedfile;
      });
  }
}

export const strapi = new Strapi(config.API_URL);
