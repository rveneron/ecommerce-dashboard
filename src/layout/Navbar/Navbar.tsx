import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

const Navbar = () => {
  const { t } = useTranslation('common');
  return (
    <AppBar position='static' className={'px-4'}>
      <Container
        className={'w-full'}
        sx={{
          maxWidth: '1920px !important',
          padding: '0 !important',
        }}
      >
        <Toolbar disableGutters className={'flex justify-between items-center w-full'}>
          <img src={'/images/AppLogo.png'} alt={'Logo'} width={80} height={80} />
          <Box className={'flex-1'}>
            <Typography className={'text-3xl font-bold'}>{t('appName')}</Typography>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={t('profile')}>
              <IconButton sx={{ p: 0 }}>
                <Avatar alt='Rodolfo' src='/images/Avatar.jpeg' sx={{ width: 50, height: 50 }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
