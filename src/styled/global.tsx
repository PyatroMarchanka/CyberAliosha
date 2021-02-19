import styled, { css } from 'styled-components';
import { theme } from '../utils/theme';

export const borders = css`
  border-top: 2px solid #dbdee1;
  border-left: 2px solid #dbdee1;
  border-right: 2px solid #2f3134;
  border-bottom: 2px solid #2f3134;
`;

export const MetalBlock = styled.div`
  background-color: #878c90;
  border-radius: 3px;
  ${borders}
`;

export const Mobile = styled.div<{ display?: string }>`
  display: none;

  @media ${theme.breakpoints.belowTabletM} {
    display: ${({ display }) => (display ? display : 'block')};
  }
`;

export const Desktop = styled.div<{ display?: string }>`
  display: ${({ display }) => (display ? display : 'block')};

  @media ${theme.breakpoints.belowTabletM} {
    display: none;
  }
`;
