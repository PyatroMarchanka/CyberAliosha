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
      <FacebookButton href="https://www.facebook.com/piatro.marchanka">FaceBook</FacebookButton>
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

const FacebookButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
  color: #24292e;
  background-color: #eff3f6;
  padding: 3px 10px;
  font-size: 12px;
  font-weight: 600;
  line-height: 20px;
  border-radius: 0.25em;
  border: 1px solid;

  border-color: rgba(68, 72, 77, 0.25);
  background-image: linear-gradient(180deg, #f0f3f6, #e6ebf1 90%);

  &:hover {
    background-color: #e6ebf1;
    background-position: -0.5em;
    border-color: #9fa4a9;
    border-color: rgba(27, 31, 35, 0.35);
    background-image: -moz-linear-gradient(top, #f0f3f6, #e6ebf1 90%);
    background-image: linear-gradient(180deg, #f0f3f6, #e6ebf1 90%);
  }
`;
