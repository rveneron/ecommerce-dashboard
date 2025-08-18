import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  DFLError,
  getResponseError,
  isNetworkError,
  ITokenService,
  NETWORK_ERROR,
  RequestConfig,
  StorageService,
  UploadRequest,
} from '@dfl/react-security';
import { TRANSLATION_KEY } from 'contexts/TranslationContext';

const TIMEOUT: number = Number(process.env.REACT_APP_TIMEOUT || process.env.NEXT_PUBLIC_APP_TIMEOUT || 1000000);

class ApiClientService {
  private readonly _ACCESS_TOKEN_KEY: string;
  private readonly REFRESH_TOKEN_KEY: string;
  private readonly _SPACE_KEY: string;
  private readonly LANG_KEY: string;
  private readonly API_URL: string;
  private loginPath: RegExp | string | undefined;
  private TokenService: ITokenService | undefined;
  private readonly defaultHeaders: Record<string, string> = {};
  private readonly service: AxiosInstance;
  private errorCallbacks: Array<(error: DFLError) => void> = [];

  constructor () {
    const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';
    this._ACCESS_TOKEN_KEY = process.env.REACT_APP_ACCESS_TOKKEN || '__access_token__';
    this.REFRESH_TOKEN_KEY = process.env.REACT_APP_REFRESH_TOKEN || '__refresh_token__';
    this._SPACE_KEY = process.env.REACT_APP_SPACE_KEY || 'x-workspace';
    this.service = axios.create({
      baseURL: API_URL,
    });
    this.LANG_KEY = process.env.REACT_APP_LANG_KEY || 'i18nextLng';
    this.service.interceptors.response.use(this.handleSuccess, this.handleError);
    // @ts-ignore
    this.service.interceptors.request.use(this.onRequestSuccess);
    // Object.assign(this, service);
    this.API_URL = API_URL;
    this.post = this.service.post;
  }

  setup ({ TokenService, loginPath }: { TokenService: ITokenService; loginPath?: string | RegExp }) {
    this.TokenService = TokenService;
    this.loginPath = loginPath || /(\/signin)|(\/login)|(\/refresh-token)/;
  }

  onError (callback: (error: DFLError) => void) {
    if (!this.errorCallbacks.some((func) => func === callback)) {
      this.errorCallbacks.push(callback);
    }

    return () => {
      this.errorCallbacks = this.errorCallbacks.filter((func) => func !== callback);
    };
  }

  private notifyError (error: DFLError) {
    this.errorCallbacks.forEach((callback) => {
      callback?.(error);
    });
  }

  onRequestSuccess = (config: AxiosRequestConfig) => {
    const dlfConfig: RequestConfig = config as RequestConfig;
    const token = this.getToken();
    const lan = this.getLan();
    const space = this.getSpace();

    dlfConfig.headers = {
      'Content-Type': 'application/json',
      accept: 'application/json',

      ...this.defaultHeaders,
      ...dlfConfig.headers,
    };

    if (lan && !dlfConfig.headers['Accept-Language']) {
      dlfConfig.headers['Accept-Language'] = lan;
    }

    if (space && !dlfConfig.ignoreSpace) {
      dlfConfig.headers['x-workspace'] = space;
    }
    if (token && !dlfConfig.ignoreToken) {
      dlfConfig.headers.Authorization = `Bearer ${token}`;
    }
    dlfConfig.timeout = dlfConfig.timeout || TIMEOUT;
    if (!dlfConfig.url?.startsWith('http')) {
      dlfConfig.url = `${this.API_URL.replace(/\/$/, '')}${dlfConfig.url as string}`;
    }
    return dlfConfig;
  };

  handleSuccess (response: AxiosResponse) {
    return response;
  }

  handleError = async (err: DFLError) => {
    const originalConfig: RequestConfig = err.config as RequestConfig;
    let error = err;
    if (this.TokenService && this.getToken() && err.response) {
      const isNotLogin = this.loginPath ? !originalConfig.url?.match(this.loginPath) : false;
      if (isNotLogin) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          console.log('Access Token was expired, RETRY');
          originalConfig._retry = true;
          try {
            await this.TokenService.refresh();
            console.log('TokenService refresh, success');
            return await this.service(originalConfig);
          } catch (_error) {
            console.log('TokenService refresh, error');
          }
        }
      }
    }
    if (isNetworkError(error)) {
      // @ts-ignore
      error = { networkError: true, message: 'Network error', reference: NETWORK_ERROR } satisfies DFLError;
    }
    const dataError = getResponseError(error);
    dataError.status = dataError.status || error.response?.status;

    this.notifyError(dataError);
    return await Promise.reject(dataError);
  };

  uploadRequest (url: string, opts: UploadRequest = {}, onProgress?: (ev: ProgressEvent<EventTarget>) => any) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(opts.method || 'get', url);
      for (const k in opts.headers || {}) {
        // @ts-ignore
        xhr.setRequestHeader(k, opts.headers[k]);
      }
      xhr.onload = (e: ProgressEvent) => {
        let result = null;
        if (xhr.status === 200) {
          const parseJSON = JSON.parse(xhr.response);
          result = {
            status: xhr.status,
            ...parseJSON,
          };
          resolve(result);
        } else {
          reject({
            status: xhr.status,
          });
        }
      };
      xhr.onerror = reject;
      if (xhr.upload && onProgress) xhr.upload.onprogress = onProgress; // event.loaded / event.total * 100 ; //event.lengthComputable
      xhr.send(opts.body);
    });
  }

  getToken () {
    return StorageService.getItem(this._ACCESS_TOKEN_KEY);
  }

  getRefreshToken () {
    return StorageService.getItem(this.REFRESH_TOKEN_KEY);
  }

  getSpace () {
    return StorageService.getItem(this._SPACE_KEY);
  }

  setSpace (space: string, options?: any) {
    if (space && space !== 'null') {
      StorageService.setItem(this._SPACE_KEY, space, options);
    } else this.removeSpace(options);
  }

  removeSpace (options?: any) {
    StorageService.removeItem(this._SPACE_KEY, options);
  }

  getLan () {
    const lang = StorageService.getItem(TRANSLATION_KEY)?.replaceAll('"', '') || 'es';

    if (lang) return lang.split('-')[0];
  }

  setToken (token: string, options?: any) {
    StorageService.setItem(this._ACCESS_TOKEN_KEY, token, options);
  }

  setRefreshToken (token: string, options?: any) {
    StorageService.setItem(this.REFRESH_TOKEN_KEY, token, options);
  }

  removeToken (options?: any) {
    StorageService.removeItem(this._ACCESS_TOKEN_KEY, options);
  }

  get ACCESS_TOKEN_KEY (): string {
    return this._ACCESS_TOKEN_KEY;
  }

  get SPACE_KEY (): string {
    return this._SPACE_KEY;
  }

  request (config: RequestConfig): Promise<AxiosResponse> {
    return this.service.request(config);
  }

  get (url: string, config?: RequestConfig): Promise<AxiosResponse> {
    return this.service.get(url, config);
  }

  delete (url: string, config?: RequestConfig): Promise<AxiosResponse> {
    return this.service.delete(url, config);
  }

  post (url: string, data: any, config?: RequestConfig): Promise<AxiosResponse> {
    return this.service.post(url, data, config);
  }

  put (url: string, data: any, config?: RequestConfig): Promise<AxiosResponse> {
    return this.service.put(url, data, config);
  }

  patch (url: string, data: any, config?: RequestConfig): Promise<AxiosResponse> {
    return this.service.patch(url, data, config);
  }
}

export default new ApiClientService(); // making it singleton
