import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { CO_TIMELINE_QUERY } from 'constants/queries';
import AirQualityService from 'services/aqi.services';
import { isValidRange } from 'utils/date';

type Props = {
  from?: string;
  to?: string;
};

export const useCOTimeline = ({ from, to }: Props) => {
  const fetch = useCallback(() => AirQualityService.getTimeline({ from, to }), [from, to]);

  return useQuery({
    queryKey: [CO_TIMELINE_QUERY, { from, to }],
    queryFn: fetch,
    enabled: isValidRange(from, to)
  });
};
