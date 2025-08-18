import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getResponseError, isNetworkError } from 'utils/errors';
import { NETWORK_ERROR } from 'constants/errors';

const TIMEOUT: number = Number(1000000);

class ApiClientService {
  private readonly API_URL: string;
  private readonly defaultHeaders: Record<string, string> = {};
  private readonly service: AxiosInstance;
  private errorCallbacks: Array<(error: any) => void> = [];

  constructor() {
    const API_URL = process.env.REACT_APP_BACKEND_URL || 'https//challenge-api.dofleini.com';
    this.service = axios.create({
      baseURL: API_URL,
    });
    this.service.interceptors.response.use(this.handleSuccess, this.handleError);
    // @ts-ignore
    this.service.interceptors.request.use(this.onRequestSuccess);
    this.API_URL = API_URL;
    this.post = this.service.post;
  }

  onError(callback: (error: any) => void) {
    if (!this.errorCallbacks.some((func) => func === callback)) {
      this.errorCallbacks.push(callback);
    }

    return () => {
      this.errorCallbacks = this.errorCallbacks.filter((func) => func !== callback);
    };
  }

  private notifyError(error: any) {
    this.errorCallbacks.forEach((callback) => {
      callback?.(error);
    });
  }

  onRequestSuccess = (config: AxiosRequestConfig) => {
    const customConfig: AxiosRequestConfig = config;

    customConfig.headers = {
      'Content-Type': 'application/json',
      accept: 'application/json',

      ...this.defaultHeaders,
      ...customConfig.headers,
    };
    customConfig.timeout = customConfig.timeout || TIMEOUT;
    if (!customConfig.url?.startsWith('http')) {
      customConfig.url = `${this.API_URL.replace(/\/$/, '')}${customConfig.url as string}`;
    }
    return customConfig;
  };

  handleSuccess(response: AxiosResponse) {
    return response;
  }

  handleError = async (err: any) => {
    let error = err;
    if (isNetworkError(error)) {
      // @ts-ignore
      error = { networkError: true, message: 'Network error', reference: NETWORK_ERROR };
    }
    const dataError = getResponseError(error);
    dataError.status = dataError.status || error.response?.status;

    this.notifyError(dataError);
    return await Promise.reject(dataError);
  };

  get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.service.get(url, config);
  }

  delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.service.delete(url, config);
  }

  post(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.service.post(url, data, config);
  }

  put(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.service.put(url, data, config);
  }

  patch(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.service.patch(url, data, config);
  }
}

export default new ApiClientService();
