import React from 'react';
import styled from 'styled-components';

import { AddedChordsNew } from '../../components/ChordEditor/layout/AddedChordsNew';
import { ChordsToAdd } from '../../components/ChordEditor/layout/ChordsToAdd';

interface Props {}

export const ChordEditorPage = ({}: Props) => {
  return (
    <Container>
      <ChordsToAdd />
      <AddedChordsNew />
    </Container>
  );
};

const Container = styled.div``;