import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import styled from 'styled-components';
import { AlioshaLink } from './AlioshaLink';

export interface MenuProps {
  target: JSX.Element;
  items: {
    title: string;
    onClick?: () => void;
    link?: string;
  }[];
}

export function SimpleMenu({ items, target }: MenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container>
      <div
        className="button"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {target}
      </div>
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

  .button {
    border: 0;
    box-shadow: unset;
  }
`;
