import React from 'react';
import styled from 'styled-components';

import { AddedChordsNew } from '../../components/Chords/AddedChordsNew';
import { ChordsToAdd } from '../../components/Chords/ChordsToAdd';
import { PageTitle } from '../../components/global/PageTitle';

interface Props {}

export const ChordEditorPage = ({}: Props) => {
  return (
    <Container>
      <PageTitle title="Chords Editor" />
      <ChordsToAdd />
      <AddedChordsNew />
    </Container>
  );
};

const Container = styled.div``;
