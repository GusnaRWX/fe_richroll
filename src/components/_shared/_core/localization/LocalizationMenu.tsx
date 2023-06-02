import React, { useState, useEffect } from 'react';
import { IconButton } from '@/components/_shared/form';
import { LocalizationsMenu } from './localization';
import Image from 'next/image';
import { Box, Menu, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const LocalizationMenu = () => {
  const [selectedCountry, setSelectedCountry] = useState('EN');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isLanguageOpen = Boolean(anchorEl);
  const [hydrated, setHaydrated] = useState(false);

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChangeLocalization = (country: string) => {
    setSelectedCountry(country);
    setAnchorEl(null);
  };

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
              cursor: 'pointer'
            }}
            onClick={() => { handleChangeLocalization(locale.name); }}
          >
            <IconButton
              icons={
                <Image
                  src={locale.icons}
                  width={19}
                  height={14}
                  alt={locale.name}
                />
              }
              disableFocusRipple
              disableRipple
            />
            <Typography>{locale.name}</Typography>
          </Box>
        ))
      }
    </Menu>
  );

  return (
    <>
      {
        LocalizationsMenu.map((locale) => (
          locale.name === selectedCountry && (
            <Box
              key={locale.name}
              sx={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <IconButton
                icons={
                  <Image
                    src={locale.icons}
                    width={19}
                    height={14}
                    alt={locale.name}
                  />
                }

                disableFocusRipple
                disableRipple
                sx={{ cursor: 'text' }}

              />
              <Typography>{locale.name}</Typography>
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