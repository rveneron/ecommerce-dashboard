import { memo } from 'react';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { Avatar } from '@mui/material';
import AppLogo from 'assets/images/AppLogo.png';

const Navbar = () => {
  const { t } = useTranslation('common');

  return (
    <Box>
      <Box sx={{ flexGrow: 1, alignItems: 'center', display: { xs: 'flex', sm: 'none' } }}>
        <Box height={24} width={24}>
          <AppLogo />
        </Box>
      </Box>

      <Box flexDirection='row' gap={{ xs: 1.5, md: 2 }} sx={{ display: 'flex', alignItems: 'center' }}>
      </Box>
      <Avatar />
    </Box>
  );
};

export default memo(Navbar);
