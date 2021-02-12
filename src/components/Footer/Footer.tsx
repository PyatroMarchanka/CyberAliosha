import React from 'react';
import styled from 'styled-components';
import { theme } from '../../utils/theme';

export default function Footer() {
  return (
    <Container>
      <span>
        Petr Marchanka <a href="https://www.facebook.com/piatro.marchanka">FaceBook</a>{' '}
        <a href="https://github.com/PyatroMarchanka/CyberAliosha-Parter-React">Github</a> 2021
      </span>
    </Container>
  );
}

const Container = styled.div`
  padding: 10px;
  color: ${theme.colors.white};
`;
