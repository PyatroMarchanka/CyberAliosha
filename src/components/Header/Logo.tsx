import React from 'react';
import styled from 'styled-components';
import { routes } from '../../pages/routes';
import { theme } from '../../utils/theme';
import { AlioshaLink } from '../global/AlioshaLink';

interface Props {}

export const Logo = ({}: Props) => {
  return (
    <AlioshaLink to={routes.root}>
      <Container>
        <h1>Cyber</h1>
        <Line />
        <h1>Aliosha</h1>
      </Container>
    </AlioshaLink>
  );
};

const Container = styled.div`
  h1 {
    font-family: 'Impact', 'Haettenschweiler', 'Arial Narrow Bold', sans-serif;
    font-size: 30px;
    color: ${theme.colors.white};
    margin: 0 5px;
    text-align: center;

    @media ${theme.breakpoints.belowTabletM} {
      font-size: 20px;
    }
  }
`;

const Line = styled.div`
  height: 3px;
  background-color: ${theme.colors.white};
`;
