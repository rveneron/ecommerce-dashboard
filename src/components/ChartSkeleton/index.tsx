import { memo } from 'react';
import { Skeleton } from '@mui/material';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import StackedLineChartOutlinedIcon from '@mui/icons-material/StackedLineChartOutlined';

const SFlexBox = styled(Box)(() => ({
  '> svg': {
    fontSize: '3rem',
  },
}));

type Props = { icon?: any };

const ChartSkeleton = ({ icon = <StackedLineChartOutlinedIcon /> }: Props) => {
  return (
    <Box className={'h-full flex flex-col items-center justify-center px-2'} sx={{ minHeight: 350 }}>
      <Skeleton width={'100%'} height={'10%'} />
      <Skeleton width={'100%'} height={'10%'} />
      <Skeleton width={'100%'} height={'10%'} />
      <SFlexBox sx={{ opacity: 0.5, fontSize: 40 }}>{icon}</SFlexBox>
      <Skeleton width={'100%'} height={'10%'} />
      <Skeleton width={'100%'} height={'10%'} />
      <Skeleton width={'100%'} height={'10%'} />
    </Box>
  );
};

export default memo(ChartSkeleton);
