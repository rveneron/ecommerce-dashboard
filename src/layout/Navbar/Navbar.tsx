import { memo, useCallback, useMemo } from 'react';
import Box from '@mui/material/Box';
import { DynamicBreadcrumbs, Navbar as AdminNavbar, ThemeButton } from '@dfl/mui-admin-layout';
import { useSettings } from 'contexts/SettingsProvider';
import Account from 'layouts/Navbar/Account';
import { useTranslation } from 'react-i18next';
import NotificationTooltipContent from 'modules/notification/components/NotificationList/NotificationTooltipContent';
import { SxProps } from '@mui/material';
import TranslationButton from 'components/TranslationButton';
import { LanguageButton } from 'components/LanguageButton';
import { useMediaQueryMenu } from 'layouts/Sidebar/MainSidebar/hooks/useRootMenu';
import { useMenuContext } from 'settings/main-menu/context/useMenuContext';
import { useMenuHome } from 'settings/main-menu/context/useMenuHome';
import { useLocation, useNavigate } from 'react-router';
import { ROOT_MENU_ENUM } from 'settings/main-menu/menus.enum';
import { LogoView } from 'components/Logo/LogoView';
import themeConfig from 'settings/branding';

/* const display = { display: { xs: 'none', sm: 'block' } };
const stackDisplay = { display: { xs: 'flex', sm: 'flex' } }; */

const adminNavbarSx: SxProps = {
  boxShadow: 'none',
  borderRadius: 0,
  paddingLeft: { lg: '280px' },
};

const Navbar = () => {
  const { toggleTheme, settings } = useSettings();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { onOpen, rootWidth } = useMenuContext();
  const { drawerWidth, open } = useMenuHome();
  const { t } = useTranslation('common');
  const { lgUp } = useMediaQueryMenu();

  const navbarSx = useMemo(
    () => ({
      ...adminNavbarSx,
      ...(!open ? { paddingLeft: lgUp ? `${rootWidth}px` : 0 } : { paddingLeft: lgUp ? `${drawerWidth}px` : 0 }),
      '& > .MuiToolbar-root > .MuiIconButton-root > .MuiSvgIcon-root': {
        width: 28,
        height: 28,
      },
    }),
    [drawerWidth, lgUp, open, rootWidth],
  );

  const handleOpen = useCallback(() => {
    if (pathname === '/') {
      navigate(ROOT_MENU_ENUM.SALES);
    }
    onOpen();
  }, [navigate, onOpen, pathname]);

  return (
    <AdminNavbar onOpenSidebar={handleOpen} sx={navbarSx}>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, marginLeft: 1 }}>
        <DynamicBreadcrumbs />
      </Box>

      {/* flex grow in mobile */}
      <Box sx={{ flexGrow: 1, alignItems: 'center', display: { xs: 'flex', sm: 'none' } }}>
        <LogoView src={themeConfig?.logoUrl} height={24} width={24} />
      </Box>

      <Box flexDirection='row' gap={{ xs: 1.5, md: 2 }} sx={{ display: 'flex', alignItems: 'center' }}>
        <Box data-tour='step-navbar-5'>
          <ThemeButton toggle={toggleTheme} current={settings.theme} title={t('switchTheme')} />
        </Box>
        <Box data-tour='step-navbar-4'>
          <LanguageButton />
        </Box>
        <Box data-tour='step-navbar-3'>
          <TranslationButton />
        </Box>
        <Box data-tour='step-navbar-2'>
          <NotificationTooltipContent />
        </Box>
      </Box>

      <Account />
    </AdminNavbar>
  );
};

export default memo(Navbar);
