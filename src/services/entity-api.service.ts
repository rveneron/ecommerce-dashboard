import { AxiosRequestConfig, AxiosResponse } from 'axios';
import ApiClientService from './api-client.service';

export type SearchResponseType<T> = {
  data: T[];
  total: number;
};

class EntityApiService<T> {
  private readonly path: string;

  constructor (path: string) {
    this.path = path;
  }

  getPath (concat: string | null) {
    return this.path + (concat || '');
  }

  search = (params?: any, config?: AxiosRequestConfig): Promise<SearchResponseType<T>> => {
    const size = params?.size || 20;
    return this.handleSearchResponse(ApiClientService.post(this.getPath('/search'), params, config), size);
  };

  getOne = (params?: any, config?: AxiosRequestConfig): Promise<T> => {
    const id = typeof params !== 'string' ? ((params?.id || params?._id) as string) : params;
    return this.handleResponse(ApiClientService.get(this.getPath(`/${id}`), config));
  };

  save = (params: any, config?: AxiosRequestConfig): Promise<T> => {
    return this.handleResponse(ApiClientService.post(this.getPath(null), params, config));
  };

  saveOrUpdate = (params: any, config?: AxiosRequestConfig): Promise<T> => {
    if (params?._id) {
      return this.update(params?._id, params, config);
    }
    return this.save(params, config);
  };

  update = (id: any, params?: any, config?: AxiosRequestConfig): Promise<T> => {
    return this.handleResponse(ApiClientService.patch(this.getPath(`/${id as string}`), params, config));
  };

  delete = (id: string, config?: AxiosRequestConfig) => {
    return this.handleResponse(ApiClientService.delete(this.getPath(`/${id}`), config));
  };

  handleResponse = (promise: Promise<AxiosResponse>): Promise<any> => {
    return promise.then(({ data }) => data);
  };

  handleSearchResponse = (promise: Promise<AxiosResponse>, size: number): Promise<SearchResponseType<T>> => {
    return promise.then(({ data, headers }) => {
      // eslint-disable-next-line no-prototype-builtins
      if (data?.hasOwnProperty('total') && data.data) {
        data.hasMore = data.data.length === size;
        return data;
      }

      const total = Number(headers['x-total-count']) || 0;
      const hasMore = data.length === size;
      return { data, total, hasMore };
    });
  };
}

export default EntityApiService;
