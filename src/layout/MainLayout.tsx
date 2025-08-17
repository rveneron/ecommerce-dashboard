import { memo } from 'react';
import { ChildrenProps } from 'types/children-props';
import { ClassnameProps } from 'types/classname-props';
import Navbar from './Navbar/Navbar';
import Box from '@mui/material/Box';

type Props = ChildrenProps & ClassnameProps;

const MainLayout = ({ children, className }: Props) => {
  return (
    <div className={className}>
      <Box>{children}</Box>
      <Navbar />
    </div>
  );
};

export default memo(MainLayout);
