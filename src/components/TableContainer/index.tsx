import { useTranslation } from 'react-i18next';
import { ClassnameProps } from 'types/classname-props';
import { Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import clsx from 'clsx';
import { DataGrid } from '@mui/x-data-grid';
import { useData } from '../../context/DataContext';
import { VALUES_KEY_LABELS } from 'constants/values_key';
import { useMemo } from 'react';
import { getDateFromString } from 'utils/date';
import { esES } from '@mui/x-data-grid/locales';

type Props = ClassnameProps;

export const TableContainer = ({ className }: Props) => {
  const { t } = useTranslation('common');

  const { historicData, isLoadingHistoricData, historicError, metrics } = useData();

  const paginationModel = { page: 0, pageSize: 10 };

  const columns = useMemo(() => {
    const result = [
      {
        field: 'Date',
        headerName: t('date'),
        sortable: true,
        flex: 1,
        type: 'string',
      },
    ];
    result.push(
      ...(metrics || []).map((metric) => ({
        field: metric,
        headerName: VALUES_KEY_LABELS[metric].label,
        sortable: true,
        flex: 1,
        type: 'number',
      })),
    );
    return result;
  }, [metrics, t]);

  return (
    <Paper className={clsx('flex flex-col gap-4 p-8', className)}>
      <Box className={'flex flex-col md:flex-row items-center justify-center lg:justify-between gap-4'}>
        <Typography className={'text-3xl font-semibold'}>{t('historicData')}</Typography>
      </Box>
      <DataGrid
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        sx={{
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: '#000',
          },
          '& .MuiButtonBase-root': {
            color: 'white',
          },
          '& .MuiDataGrid-columnHeaderTitleContainer': {
            backgroundColor: 'transparent',
            color: '#fff',
            fontWeight: 'bold',
          },
          '& .MuiDataGrid-row:nth-of-type(even)': {
            backgroundColor: '#f9f9f9', // blanco suave
          },
          '& .MuiDataGrid-row:nth-of-type(odd)': {
            backgroundColor: '#e0e0e0', // gris oscuro
          },
          '& .MuiDataGrid-cell': {
            color: '#000000',
          },
        }}
        checkboxSelection={false}
        rows={
          historicData?.map((el, index) => ({ ...el, id: index, Date: (el.Date as string).substring(0, 10) })) || []
        }
        // @ts-ignore
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10]}
      />
    </Paper>
  );
};
