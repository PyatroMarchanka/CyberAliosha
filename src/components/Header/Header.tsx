import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';

import { Logo } from './Logo';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    'MuiSvgIcon-root': {
      width: '2rem',
      height: '2rem',
    },
  }),
);

export default function Header() {
  const classes = useStyles();

  return (
    <Container>
      <Left>
        <Logo />
      </Left>
      <Right>
        <IconButton edge="start" className={classes.menuButton} color="default" aria-label="menu">
          <SettingsIcon className={classes['MuiSvgIcon-root']} />
        </IconButton>
      </Right>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Left = styled.div``;

const Right = styled.div`
  display: flex;
  align-items: center;
`;
