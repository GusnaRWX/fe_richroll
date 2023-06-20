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
        >
          <ListItemIcon sx={{ minWidth: '30px' }}>
            {icons({ color: 'grey.400' })}
          </ListItemIcon>
          <ListItemText primary={renderTitle?.title} sx={{ fontSize: '14px', color: 'grey.400' }} />
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
                      sx={{ pl: 6 }}
                      onClick={() => { push(childMenu.path); }}
                    >
                      <ListItemText primary={childMenu.title} sx={{ fontSize: '14px', color: 'grey.400' }} />
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