import ApiClientService from './api-client.service';
import EntityApiService from './entity-api.service';
import { AxiosRequestConfig } from 'axios';

class AirQualityService extends EntityApiService<any> {
  getRange = (params: any, config?: AxiosRequestConfig): Promise<any> => {
    let suffix = '';
    if (params.from) {
      suffix += `from=${params.from as string}`;
    }
    if (params.from) {
      if (suffix) {
        suffix += '&';
      }
      suffix += `to=${params.to as string}`;
    }
    return this.handleResponse(ApiClientService.get(this.getPath(`/?${suffix}`), config));
  };

  getTimeline = (params: any, config?: AxiosRequestConfig): Promise<any> => {
    let suffix = '';
    if (params.from) {
      suffix += `from=${params.from as string}`;
    }
    if (params.from) {
      if (suffix) {
        suffix += '&';
      }
      suffix += `to=${params.to as string}`;
    }
    return this.handleResponse(ApiClientService.get(this.getPath(`/timeline/CO?${suffix}`), config));
  };

  getSummary = (params: any, config?: AxiosRequestConfig): Promise<any> => {
    let suffix = '';
    if (params.from) {
      suffix += `from=${params.from as string}`;
    }
    if (params.from) {
      if (suffix) {
        suffix += '&';
      }
      suffix += `to=${params.to as string}`;
    }
    if (params.from) {
      if (suffix) {
        suffix += '&';
      }
      suffix += `operator=${params.operator as string}`;
    }
    return this.handleResponse(ApiClientService.get(this.getPath(`/summary?${suffix}`), config));
  };
}

export default new AirQualityService('/air-quality');
