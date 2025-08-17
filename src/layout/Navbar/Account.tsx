import { memo, useMemo } from 'react';
import { AccountButton } from '@dfl/mui-admin-layout';
import { useTranslation } from 'react-i18next';
import { Divider, ListItemIcon, ListItemText, MenuItem, styled, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSecurity } from '@dfl/react-security';
import { ACCOUNT_MENU, MenuItemType } from 'settings/account.menu';

export const SLink = styled('a')(() => ({
  alignItems: 'center',
  padding: '6px 16px',
  textDecoration: 'none',
  color: 'inherit',

  '.MuiListItemIcon-root': {
    minWidth: '36px',
  },
}));

const Account = () => {
  const { t } = useTranslation('common');
  const { hasPermission } = useSecurity();

  const options = useMemo(() => {
    return ACCOUNT_MENU?.filter((menu) => {
      return menu?.permission?.length ? hasPermission(menu.permission) : true;
    })?.map((menu, index) => {
      if (menu.divider) {
        return <Divider key={index} />;
      }

      const menuItem = menu as MenuItemType;
      const Icon = menuItem.icon;
      const content = (
        <>
          <ListItemIcon>
            <Icon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary={<Typography variant='body1'>{t(menuItem.label)}</Typography>} />
        </>
      );
      if (menuItem.external) {
        return (
          <SLink key={index} href={menuItem.link} target={'_blank'} rel='noopener noreferrer'>
            {content}
          </SLink>
        );
      }
      return (
        <MenuItem
          component={Link}
          to={menuItem.link}
          target={menuItem.external ? '_blank' : '_self'}
          key={menuItem.label}
        >
          {content}
        </MenuItem>
      );
    });
  }, [hasPermission, t]);

  return (
    <div data-tour='step-navbar-1'>
      <AccountButton logoutText={t('logout')}>{options}</AccountButton>
    </div>
  );
};

export default memo(Account);
