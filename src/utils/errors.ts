export const isNetworkError = (error: any) => {
  return !error.response && !error.status;
};

export const getResponseError = (error: any) => {
  const { response } = error || {};

  if (!response) return error;

  const { data, status, statusText } = response;
  if (typeof data === 'object') return data;
  if (typeof data === 'string') {
    return {
      status,
      message: statusText || data,
    };
  }

  return error;
};
