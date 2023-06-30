import React, { useState, useEffect } from 'react';
import { IconButton } from '@/components/_shared/form';
import { LocalizationsMenu } from './localization';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { Box, Menu, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';
import { setLanguage } from '@/store/reducers/slice/global/globalSlice';

const LocalizationMenu = () => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { global } = useAppSelectors(state => state);
  // console.log(global);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isLanguageOpen = Boolean(anchorEl);
  const [hydrated, setHaydrated] = useState(false);
  const findCodeName = LocalizationsMenu.find(locale => locale.nativeName === global.language);
  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };


  useEffect(() => {
    i18n.changeLanguage(findCodeName?.codeName);
  }, []);

  useEffect(() => {
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
      open={isLanguageOpen}
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
            key={locale.name}
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              ':hover': {
                backgroundColor: '#223567 !important',
                color: '#fff'
              },
              backgroundColor: global.language === locale.nativeName ? '#223567 !important' : '',
              color: global.language === locale.nativeName ? '#fff' : '#223567',
            }}
            onClick={() => {
              i18n.changeLanguage(locale?.codeName);
              dispatch({
                type: setLanguage.toString(),
                payload: locale.nativeName
              });
              setAnchorEl(null);
            }}
          >
            <Typography sx={{ paddingLeft: '.5rem' }}>{locale.nativeName}</Typography>
          </Box>
        ))
      }
    </Menu>
  );

  return (
    <>
      {
        LocalizationsMenu.map((locale) => (
          locale.nativeName === global.language && (
            <Box
              key={locale.name}
              sx={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Typography>{locale.nativeName}</Typography>
              <IconButton icons={<ExpandMoreIcon />}
                aria-controls={languageId}
                aria-label='current language'
                aria-haspopup='true'
                edge='end'
                onClick={handleLanguageMenuOpen}
              />
            </Box>
          )
        ))
      }
      {renderMenu}
    </>
  );
};

export default LocalizationMenu;