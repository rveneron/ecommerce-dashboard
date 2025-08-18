import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { HISTORIC_DATA_QUERY } from 'constants/queries';
import AirQualityService from 'services/aqi.services';
import { isValidRange } from 'utils/date';

type Props = {
  from?: string;
  to?: string;
};

export const useHistoricData = ({ from, to }: Props) => {
  const fetch = useCallback(() => AirQualityService.getRange({ from, to }), [from, to]);

  return useQuery({
    queryKey: [HISTORIC_DATA_QUERY, { from, to }],
    queryFn: fetch,
    enabled: isValidRange(from, to),
  });
};
