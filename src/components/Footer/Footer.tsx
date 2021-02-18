import React from 'react';
import styled from 'styled-components';
import { theme } from '../../utils/theme';
import GitHubButton from 'react-github-btn';

export default function Footer() {
  return (
    <Container>
      <GitHubButton
        href="https://github.com/PyatroMarchanka/CyberAliosha-Parter-React"
        data-icon="octicon-star"
        data-size="large"
        aria-label="Star PyatroMarchanka/CyberAliosha-Parter-React on GitHub"
      >
        Star
      </GitHubButton>
      <GitHubButton
        href="https://github.com/PyatroMarchanka"
        data-size="large"
        aria-label="Follow @PyatroMarchanka on GitHub"
      >
        Follow @PyatroMarchanka
      </GitHubButton>
      <a href="https://www.facebook.com/piatro.marchanka">FaceBook</a>
    </Container>
  );
}

const Container = styled.div`
  padding: 10px;
  color: ${theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  > * {
    margin-right: 10px;
  }
`;
