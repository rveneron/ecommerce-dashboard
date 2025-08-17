import { memo } from 'react';
import { ChildrenProps } from 'types/children-props';
import { ClassnameProps } from 'types/classname-props';
import Navbar from './Navbar/Navbar';
import clsx from 'clsx';
import Box from '@mui/material/Box';

type Props = ChildrenProps & ClassnameProps;

const MainLayout = ({ children, className }: Props) => {
  return (
    <div className={clsx('bg-[#e9eef8] min-h-screen', className)}>
      <Navbar />
      <Box className={'py-16 w-full max-w-[1920px] xl:mx-auto'}>{children}</Box>
    </div>
  );
};

export default memo(MainLayout);
