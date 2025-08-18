import get from 'lodash/get';
import { ApexOptions } from 'apexcharts';
import { INTERVALS } from 'constants/intervals.enum';

type Serie = { name: string; data: Array<{ x: any; y: any }> };

export type SerieData = {
  options: ApexOptions;
  labels: string[];
  series: Serie[] | Serie;
};

const xaxisConfig: Record<string, any> = {
  Monthly: {
    type: 'datetime',
    labels: {
      format: 'yyyy/MM',
    },
  },
};

type OptionsSettings = {
  name: string;
  interval: string;
  options?: Partial<ApexOptions>;
};

const defaultOptions = ({ name, interval, options }: OptionsSettings): ApexOptions => {
  const defaultValues: ApexOptions = {
    title: {
      text: name,
      align: 'left',
    },
    chart: {
      id: `${name}-chart`,
      toolbar: {
        show: true,
        autoSelected: 'pan',
      },
    },
    yaxis: {
      min: 0,
      forceNiceScale: true,
      floating: false,
      decimalsInFloat: 0,
    },
    xaxis: xaxisConfig[interval] || {
      type: 'datetime',
    },
    markers: { size: 0 },
    stroke: {
      curve: 'straight',
    },
    tooltip: { shared: false },
    dataLabels: {
      enabled: true,
    },
  };

  return Object.assign({}, defaultValues, options || {});
};

export const histogram = (
  data: any,
  dateField: string = '_id',
  series: string[],
  opt: OptionsSettings,
  t: (value: string) => string,
): SerieData => {
  const labels = data;
  const seriesData: Serie[] = [];
  data.forEach((item: any) => {
    const x = get(item, dateField);
    series.forEach((field, index) => {
      const y = get(item, field);
      if (!seriesData[index]) {
        seriesData[index] = {
          name: t(`fields.${field}`),
          data: [],
        };
      }
      if (x) {
        let finalX = x;
        if (opt.interval === INTERVALS.YEARLY) {
          finalX = `${x as string}`.substring(0, 4);
        } else if (opt.interval === INTERVALS.MONTHLY) {
          finalX = `${x as string}`.substring(0, 7);
        }
        seriesData[index].data.push({ x: finalX, y });
      }
    });
  });

  return {
    options: defaultOptions(opt),
    labels,
    series: seriesData,
  };
};

export const groupData = (data: Array<{ x: string; y: number }>) => {
  const mapa = new Map<string, number>();

  data.forEach(({ x, y }) => {
    mapa.set(x, (mapa.get(x) || 0) + y);
  });

  return Array.from(mapa.entries()).map(([x, y]) => ({ x, y }));
};

export const transformSeries = (series: Serie[]) => {
  if (series?.[0]?.data?.length) {
    series[0].data = groupData(series[0].data);
  }
  if (series?.[1]?.data?.length) {
    series[1].data = groupData(series[1].data);
  }
  return series;
};
