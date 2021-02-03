import { Typography } from '@material-ui/core';
import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../../utils/theme';

interface Props {
  backgroundImage: string;
  summary: string;
  title: string;
  actionComponent: JSX.Element;
  className?: string;
  rightImage: string;
  reversed?: boolean;
}

export const HeroSection = styled(
  ({
    className,
    backgroundImage,
    summary,
    title,
    actionComponent,
    rightImage,
    reversed,
  }: Props) => {
    return (
      <Container className={className}>
        <ImageBackground backgroundImage={backgroundImage} />
        <Content reversed={reversed}>
          <Left>
            <Title>
              <Typography align="center" style={{ fontWeight: 600 }} variant="h4">
                {title}
              </Typography>
            </Title>
            <Summary>
              <Typography variant="h6">{summary}</Typography>
            </Summary>
            <Actions>{actionComponent}</Actions>
          </Left>
          <Right>
            <RightImage src={rightImage} />
          </Right>
        </Content>
      </Container>
    );
  },
)``;

const ImageBackground = styled.div<{ backgroundImage: string }>`
  background-image: ${({ backgroundImage }) => css`url(${backgroundImage})`};
  background-size: cover;
  background-color: #cccccc;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  filter: brightness(50%);
`;

const Container = styled.div`
  position: relative;
`;

const Content = styled.div<{ reversed?: boolean }>`
  padding: 40px 40px;
  display: flex;
  flex-direction: ${({ reversed }) => (reversed ? 'row-reverse' : 'row')};
`;

const Left = styled.div`
  flex-basis: 50%;
`;

const Right = styled.div`
  flex-basis: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Summary = styled.div`
  margin: 30px 0;
  color: ${theme.colors.white};
  max-width: 60%;
`;

const Title = styled.div`
  margin: 30px 0;
  color: ${theme.colors.white};
`;

const Actions = styled.div`
  margin: 30px 0;
`;

const RightImage = styled.img`
  object-fit: cover;
`;
