import React from 'react';
import styled from 'styled-components';

import { AddedChordsNew } from '../../components/layout/AddedChordsNew';
import { ChordsToAdd } from '../../components/layout/ChordsToAdd';

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
