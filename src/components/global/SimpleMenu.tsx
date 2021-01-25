import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AlioshaLink } from './AlioshaLink';

export interface MenuProps {
  title: string;
  items: {
    title: string;
    onClick?: () => void;
    link?: string;
  }[];
}

export function SimpleMenu({ items, title }: MenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        {title}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {items.map((item, idx) =>
          item.link ? (
            <AlioshaLink onClick={handleClose} key={`link-${idx}`} to={item.link}>
              <MenuItem className="menu">{item.title}</MenuItem>
            </AlioshaLink>
          ) : (
            <MenuItem key={`link-${idx}`} className="menu" onClick={item.onClick}>
              {item.title}
            </MenuItem>
          ),
        )}
      </Menu>
    </Container>
  );
}

const Container = styled.div`
  .MuiPaper-root,
  .MuiMenu-paper,
  .MuiPopover-paper {
    background-color: grey;
  }
`;
