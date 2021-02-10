import styled, { css } from 'styled-components';

export const borders = css`
  border-top: 2px solid #dbdee1;
  border-left: 2px solid #2f3134;
  border-right: 2px solid #2f3134;
  border-bottom: 2px solid #2f3134;
`;

export const MetalBlock = styled.div`
  background-color: #878c90;
  ${borders}
`;
