import React from 'react';
import styled from 'styled-components';
import { ChordsAdderProvider } from '../../context/ChordsAdderContext';

import { AddedChordsNew } from '../../components/ChordEditor/layout/AddedChordsNew';
import { ChordsToAdd } from '../../components/ChordEditor/layout/ChordsToAdd';

interface Props {}

export const ChordEditorPage = ({}: Props) => {
  return (
    <ChordsAdderProvider>
      <Container>
        <ChordsToAdd />
        <AddedChordsNew />
      </Container>
    </ChordsAdderProvider>
  );
};

const Container = styled.div`
  /* display: flex;

  > div:first-child {
    flex: 2;
  }

  > div:last-child {
    flex: 1;
  } */
`;
