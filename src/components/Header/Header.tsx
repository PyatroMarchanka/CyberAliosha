import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { SimpleMenu } from '../global/SimpleMenu';
import { routes } from '../../pages/routes';
import { Desktop, Mobile } from '../../styled/global';
import { Settings } from '../Settings';
import { SettingsModal } from '../Settings/SettingsModal';

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
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const items = [
    {
      title: 'Chords',
      link: routes.chordsEditor,
    },
    {
      title: 'Melody',
      link: routes.melodyEditor,
    },
    {
      title: 'Saved',
      link: routes.saved,
    },
    {
      title: 'Settings',
      onClick: () => setIsSettingsOpen(true),
    },
  ];

  return (
    <Container>
      <Left>
        <Logo />
      </Left>
      <Desktop>
        <Right>
          <Navigation />
          <Settings />
        </Right>
      </Desktop>
      <Mobile>
        <SimpleMenu
          items={items}
          target={
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="default"
              aria-label="menu"
            >
              <MenuIcon className={classes['MuiSvgIcon-root']} />
            </IconButton>
          }
        />
      </Mobile>
      <SettingsModal isOpen={isSettingsOpen} setIsOpen={setIsSettingsOpen} />
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
