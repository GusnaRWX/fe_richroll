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


const SidebarItem = ({
  title,
  path,
  icons,
  hasChild,
  child
}: CoreLayout.SidebarItem) => {

  const [open, setOpen] = useState(false);
  const { pathname, push } = useRouter();

  const handleOpen = () => setOpen(!open);
  return (
    <>
      <ListItemButton
        onClick={hasChild ? () => handleOpen() : () => push(path)}
        selected={pathname === path}
      >
        <ListItemIcon sx={{ minWidth: '30px' }}>
          {icons({ color: 'grey.400' })}
        </ListItemIcon>
        <ListItemText primary={title} sx={{ fontSize: '14px', color: 'grey.400' }} />
        {
          hasChild && (
            open || pathname.split('/')[1].replace('-', ' ') === title.toLocaleLowerCase() ? <HiOutlineChevronUp color='#9CA3AF' /> : <HiOutlineChevronDown color='#9CA3AF' />
          )
        }
      </ListItemButton>
      {
        hasChild && (
          <Collapse
            in={
              open || pathname.split('/')[1].replace('-', ' ') === title.toLowerCase()
            }
          >
            <List
              component='div'
              disablePadding
            >
              {
                child && child.map((childMenu, key) => (
                  <ListItemButton
                    key={key}
                    selected={pathname === childMenu.path}
                    sx={{ pl: 6 }}
                    onClick={() => { push(childMenu.path); }}
                  >
                    <ListItemText primary={childMenu.title} sx={{ fontSize: '14px', color: 'grey.400' }} />
                  </ListItemButton>
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