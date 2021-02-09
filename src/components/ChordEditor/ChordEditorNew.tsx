import React from 'react';
import styled from 'styled-components';
import { ChordsAdderProvider } from '../../context/ChordsAdderContext';
import { theme } from '../../utils/theme';

import { AddedChordsNew } from './layout/AddedChordsNew';
import { ChordsToAdd } from './layout/ChordsToAdd';

interface Props {}

export const ChordEditorNew = ({}: Props) => {
  return (
    <ChordsAdderProvider>
      <Container>
        <Block>
          <ChordsToAdd />
        </Block>
        <Block>
          <AddedChordsNew />
        </Block>
      </Container>
    </ChordsAdderProvider>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Block = styled.div`
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.7) 0%, rgb(125, 125, 125) 100%);

  flex-basis: 45%;
  border-radius: 10px;
  padding: 20px;

  &:first-child {
    margin-right: 30px;
  }
`;
