import React, { useState } from 'react';
import { CoreLayout } from '@/types/component';
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useRouter } from 'next/router';
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi2';
import { useAppSelectors } from '@/hooks/index';
import { ifThenElse } from '@/utils/helper';
import { useTranslation } from 'react-i18next';


const SidebarItem = ({
  title,
  path,
  icons,
  hasChild,
  child,
  roles,
  menuOpen,
  setMenuOpen
}: CoreLayout.SidebarItem) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { pathname, push } = useRouter();
  const { me: { profile } } = useAppSelectors(state => state);
  const checkRoles = roles?.map(role => profile?.roles?.includes(role));
  const renderTitle = title?.find(text => profile?.roles?.includes(text.key));

  const handleOpen = () => {
    if(setMenuOpen) setMenuOpen(renderTitle?.title?.replace('& ', '').toLowerCase());
    setOpen(!open);
  };

  return (
    <>
      {checkRoles?.map((role, index) => role && (
        <ListItemButton
          key={index}
          onClick={hasChild ? () => handleOpen() : () => push(path)}
          selected={pathname === path}
          sx={{
            backgroundColor: pathname === path ? '#E9EFFF !important' : '',
            '&:hover': {
              backgroundColor: '#E9EFFF',
              color: '#223567 !important'
            }
          }}
        >
          <ListItemIcon sx={{ minWidth: '30px' }}>
            {icons({ color: 'grey.400' })}
          </ListItemIcon>
          <ListItemText
            primary={t('sidebar.' + renderTitle?.prefix)}
            sx={{
              fontSize: '14px',
              color: pathname === path ? '#223567 !important' : 'grey.400',
              '& > span': {
                fontWeight: pathname === path ? 'bold' : ''
              }
            }}
          />
          {
            hasChild && (
              (open || pathname.split('/')[1].replace('-', ' ').replace('& ', '') === renderTitle?.title.replace('& ', '').toLowerCase())
              && (ifThenElse(menuOpen !== '', menuOpen === renderTitle?.title.replace('& ', '').toLowerCase(), true))
                ? <HiOutlineChevronUp color='#9CA3AF' />
                : <HiOutlineChevronDown color='#9CA3AF' />
            )
          }
        </ListItemButton>
      ))}

      {
        hasChild && (
          <Collapse
            in={
              (open || pathname.split('/')[1].replace('-', ' ').replace('& ', '') === renderTitle?.title.replace('& ', '').toLowerCase())
              && (ifThenElse(menuOpen !== '', menuOpen === renderTitle?.title.replace('& ', '').toLowerCase(), true))
            }
          >
            <List
              component='div'
              disablePadding
            >
              {
                child && child.map((childMenu, key) => (
                  childMenu?.roles?.map(childRole => profile?.roles?.includes(childRole) && (
                    <ListItemButton
                      key={key}
                      selected={pathname === childMenu.path}
                      sx={{
                        backgroundColor: pathname === childMenu.path ? '#E9EFFF !important' : '',
                        pl: 6,
                        ':hover': {
                          backgroundColor: '#E9EFFF'
                        } }}
                      onClick={() => { push(childMenu.path); }}
                    >
                      <ListItemText
                        primary={t('sidebar.' + childMenu.prefix)}
                        sx={{
                          fontSize: '14px',
                          color: pathname === childMenu.path ? '#223567 !important' : 'grey.400',
                          '& > span': {
                            fontWeight: pathname === childMenu.path ? 'bold' : ''
                          }
                        }} />
                    </ListItemButton>
                  ))
                ))
              }
            </List>
          </Collapse>
        )
      }
    </>
  );
};

export default SidebarItem;