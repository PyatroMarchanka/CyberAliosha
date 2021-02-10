import React from 'react';
import styled, { css } from 'styled-components';
import { ChordsAdderProvider } from '../../context/ChordsAdderContext';
import { borders } from '../../styled/global';
import { theme } from '../../utils/theme';

import { AddedChordsNew } from './layout/AddedChordsNew';
import { ChordsToAdd } from './layout/ChordsToAdd';

interface Props {}

export const ChordEditorNew = ({}: Props) => {
  return (
    <ChordsAdderProvider>
      <Container>
        <ChordsToAddBlock>
          <ChordsToAdd />
        </ChordsToAddBlock>
        <AddedChordsNewBlock>
          <AddedChordsNew />
        </AddedChordsNewBlock>
      </Container>
    </ChordsAdderProvider>
  );
};

const Container = styled.div``;

const ChordsToAddBlock = styled.div`
  background-color: #878c90;
  ${borders}
`;

const AddedChordsNewBlock = styled.div`
  background-color: #878c90;
  ${borders}
`;
