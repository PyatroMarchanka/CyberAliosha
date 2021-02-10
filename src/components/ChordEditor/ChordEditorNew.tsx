import React from 'react';
import styled, { css } from 'styled-components';
import { ChordsAdderProvider } from '../../context/ChordsAdderContext';
import { MetalBlock } from '../../styled/global';

import { AddedChordsNew } from './layout/AddedChordsNew';
import { ChordsToAdd } from './layout/ChordsToAdd';

interface Props {}

export const ChordEditorNew = ({}: Props) => {
  return (
    <ChordsAdderProvider>
      <Container>
        <MetalBlock>
          <ChordsToAdd />
        </MetalBlock>
        <MetalBlock>
          <AddedChordsNew />
        </MetalBlock>
      </Container>
    </ChordsAdderProvider>
  );
};

const Container = styled.div``;
