import axios, { AxiosInstance } from 'axios';
import { ApiErrorResponse, ApiResponse } from 'interfaces/api';
import { User, UserAuthResponse, UserSignUpFields } from 'interfaces/user';

class Strapi {
  public token: string | undefined;
  public request: AxiosInstance;

  /**
   * A strapi-client instance.
   * @param {string} baseURL The base URL of the API.
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
   * @param {string} [token] - A valid JWT
   * @return {Promise<Object>} User object.
   */
  currentUser(token: string): Promise<User> {
    if (token) this.token = token;
    return this.request
      .get<void, User>('/users/me')
      .catch((error: ApiErrorResponse) => {
        throw error;
      });
  }

  /**
   * Login and generate an authenticated token.
   * @param {string} identifier - A user's identifier
   * @param {string} password - The corresponding password.
   * @return {Promise<Object>} User object and jwt.
   */
  login(identifier: string, password: string): Promise<UserAuthResponse> {
    return this.request
      .post<{ identifier: string; password: string }, UserAuthResponse>(
        '/auth/local',
        { identifier, password }
      )
      .then(({ user, jwt }) => {
        this.token = jwt;
        return { jwt, user };
      })
      .catch((error: ApiErrorResponse) => {
        throw error;
      });
  }

  /**
   * Register a new user.
   * @param {Object} data - The user data to be registered.
   * @return {Promise<Object>} User object and jwt.
   */
  register(data: UserSignUpFields): Promise<UserAuthResponse> {
    return this.request
      .post<UserSignUpFields, UserAuthResponse>('/auth/local/register', data)
      .then(({ jwt, user }) => {
        this.token = jwt;
        return { jwt, user };
      })
      .catch((error: ApiErrorResponse) => {
        throw error;
      });
  }

  // TODO: Forgot password, Reset password

  /**
   * Count the data of a content-type.
   * @param {string} contentType The content-type or model to count.
   * @param {Object} [query] The query on what to count.
   * @return {Promise<number>} The number of data counted.
   */
  count<D, R>(contentType: string, query: D) {
    return this.request
      .get<D, R>(`/${contentType}/count`, query ? { params: query } : undefined)
      .catch((error: ApiErrorResponse) => {
        throw error;
      });
  }

  /**
   * Create an entry to the given content-type.
   * @param {string} contentType The content-type or model.
   * @param {Object} data The data to insert.
   * @return {Promise<Object>} An object of the created entry.
   */
  create<D, R>(contentType: string, data: D): Promise<ApiResponse<R>> {
    return this.request
      .post<D, R>(`/${contentType}`, data)
      .catch((error: ApiErrorResponse) => {
        throw error;
      });
  }

  /**
   * Read an entry or a content-type.
   * @param {string} contentType The content-type or model.
   * @param {Object|number} query Query parameters or the ID of a specific entry.
   * @return {Promise<Array|Object>} Returns an array of entries or an object of a specific entry.
   */
  get<D, R>(contentType: string, query: D): Promise<ApiResponse<R>> {
    switch (typeof query) {
      case 'object':
        return this.request
          .get<D, R>(`/${contentType}`, { params: query })
          .catch((error: ApiErrorResponse) => {
            throw error;
          });

      case 'number':
        return this.request
          .get<D, R>(`/${contentType}/${query}`)
          .catch((error: ApiErrorResponse) => {
            throw error;
          });

      case 'undefined':
        return this.request
          .get<D, R>(`/${contentType}`)
          .catch((error: ApiErrorResponse) => {
            throw error;
          });
    }
    return Promise.reject(new Error('Unknow type of query!'));
  }

  /**
   * Update an entry in a content-type.
   * @param {string} contentType The content-type or model.
   * @param {number} id An entry ID.
   * @param {Object} data The updated data.
   * @return {Promise<Object>} An object of the updated entry.
   */
  update<D, R>(
    contentType: string,
    id: number,
    data: D
  ): Promise<ApiResponse<R>> {
    return this.request
      .put<D, R>(`/${contentType}/${id}`, data)
      .catch((error: ApiErrorResponse) => {
        throw error;
      });
  }

  /**
   * Delete an entry.
   * @param {string} contentType The content-type or model.
   * @param {number} id An entry ID.
   * @return {Promise<Object>} An object of the deleted entry.
   */
  delete<R>(contentType: string, id: number): Promise<ApiResponse<R>> {
    return this.request
      .delete(`/${contentType}/${id}`)
      .catch((error: ApiErrorResponse) => {
        throw error;
      });
  }
}

export const strapi = new Strapi('http://localhost:1337/api');
