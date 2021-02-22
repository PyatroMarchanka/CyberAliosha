import React from 'react';
import Button from '@material-ui/core/Button';

import { routes } from '../../pages/routes';
import { AlioshaLink } from '../global/AlioshaLink';
import styled from 'styled-components';

interface Props {}

export const Navigation = ({}: Props) => {
  return (
    <Container>
      <AlioshaLink to={routes.chordsEditor}>
        <Button>Chords</Button>
      </AlioshaLink>
      <AlioshaLink to={routes.melodyEditor}>
        <Button>Melody</Button>
      </AlioshaLink>
      <AlioshaLink to={routes.saved}>
        <Button>Saved</Button>
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
