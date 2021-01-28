import React from 'react';

// @ts-ignore
import styled from 'styled-components';
import LazyImage from '../components/global/LazyImage';

export function MainPage() {
  return (
    <Container>
      <LazyImage src="https://i.stack.imgur.com/nlNlb.jpg?s=328&g=1" />
    </Container>
  );
}

const Container = styled.div`
  height: 600px;

  .wrapper-lazy-image {
    width: 300px;
    height: 300px;
  }
`;
