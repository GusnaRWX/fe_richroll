import React, { useState, useEffect } from 'react';
import { IconButton } from '../../form';
import { LocalizationsMenu } from './localization';
import { Box, Menu, Typography } from '@mui/material';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { setSite, setTimezone } from '@/store/reducers/slice/global/globalSlice';

function SiteMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isSiteOpen = Boolean(anchorEl);
  const [hydrated, setHaydrated] = useState(false);
  const dispatch = useAppDispatch();
  const { global } = useAppSelectors(state => state);
  const handleSiteMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    console.log(global);
    setHaydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  const languageId = 'primary-language-menu';

  const renderMenu = (
    <Menu

      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={languageId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={isSiteOpen}
      onClose={() => {
        setAnchorEl(null);
      }}
      PaperProps={{
        sx: {
          boxShadow: 'none',
          border: '.5px solid #B5BCCC',
        }
      }}
      MenuListProps={{
        sx: {
          width: '108px',
        }
      }}
    >
      {
        LocalizationsMenu.map(locale => (
          <Box
            key={locale.site}
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              ':hover': {
                backgroundColor: '#223567 !important',
                color: '#fff'
              },
              backgroundColor: global?.site === locale.site ? '#223567 !important' : '',
              color: global.site === locale.site ? '#fff' : '#223567',
            }}
            onClick={() => {
              dispatch({
                type: setSite.toString(),
                payload: locale.site
              });
              dispatch({
                type: setTimezone.toString(),
                payload: locale.timezone
              });
              setAnchorEl(null);
            }}
          >
            <Typography sx={{ paddingLeft: '.5rem' }}>{locale.site}</Typography>
          </Box>
        ))
      }
    </Menu>
  );
  return (
    <>
      {
        LocalizationsMenu.map((locale) => (
          locale.site === global.site && (
            <Box
              key={locale.site}
              sx={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Typography>{locale.site}</Typography>
              <IconButton icons={<ExpandMoreIcon />}
                aria-controls={languageId}
                aria-label='current language'
                aria-haspopup='true'
                edge='end'
                onClick={handleSiteMenuOpen}
              />
            </Box>
          )
        ))
      }
      {renderMenu}
    </>
  );
}

export default SiteMenu;