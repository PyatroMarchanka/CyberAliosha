import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import { MenuProps, SimpleMenu } from '../global/SimpleMenu';
import { routes } from '../../pages/routes';
import { AlioshaLink } from '../global/AlioshaLink';
import { IconButton } from '@material-ui/core';
import styled from 'styled-components';

interface Props {}

export const Navigation = ({}: Props) => {
  const chordsMenu: MenuProps['items'] = [
    {
      title: 'Chords',
      link: routes.chordsEditor,
    },
    {
      title: 'Suggest',
      link: routes.chordsCreator,
    },
    {
      title: 'Saved progresions',
      link: routes.chordsSaved,
    },
  ];

  const melodyMenu: MenuProps['items'] = [
    {
      title: 'Melody',
      link: routes.melodyEditor,
    },
    {
      title: 'MIDI',
      onClick: () => console.log('MIDI'),
    },
  ];

  return (
    <Container>
      <AlioshaLink to={routes.chordsEditor}>
        <Button>Chords</Button>
      </AlioshaLink>
      <AlioshaLink to={routes.melodyEditor}>
        <Button>Melody</Button>
      </AlioshaLink>
      <AlioshaLink to={routes.about}>
        <Button>About</Button>
      </AlioshaLink>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
`;
