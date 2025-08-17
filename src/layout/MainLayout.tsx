import { memo } from 'react';
import { ChildrenProps } from '@dfl/mui-react-common';
import Navbar from 'layouts/Navbar/Navbar';
import { MainSidebar } from './Sidebar/MainSidebar';
import DrawerHiddenButton from './Sidebar/MainSidebar/DrawerSidebar/DrawerHiddenButton';
import { useMediaQueryMenu } from './Sidebar/MainSidebar/hooks/useRootMenu';
import { RootAdminMain } from './Sidebar/MainSidebar/RootMenu/RootAdminMain';
import { useMenuHome } from 'settings/main-menu/context/useMenuHome';

const MainLayout = ({ children, className }: ChildrenProps & { className?: string }) => {
  const { drawerWidth, isHome } = useMenuHome();
  const { lgUp } = useMediaQueryMenu();

  return (
    <div className={className}>
      <RootAdminMain pl={drawerWidth}>{children}</RootAdminMain>
      {lgUp && !isHome && <DrawerHiddenButton left={drawerWidth} />}
      <MainSidebar />
      <Navbar />
    </div>
  );
};

export default memo(MainLayout);
