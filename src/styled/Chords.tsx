import styled from 'styled-components';
import { theme } from '../utils/theme';

export const StyledProgressionContainer = styled.div``;

export const StyledProgression = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .list {
    display: grid;
    grid-template-columns: 100px 100px 100px 100px;

    @media ${theme.breakpoints.belowTablet} {
      grid-template-columns: 70px 70px 70px 70px;
    }
  }

  .item-enter {
    opacity: 0;
    transform: translateY(100%);
  }
  .item-enter-active {
    opacity: 1;
    transform: translateY(0%);
    transition: transform 100ms ease-in, opacity 200ms ease-in;
  }
  .item-exit {
    opacity: 1;
    transform: translateY(0%);
  }
  .item-exit-active {
    opacity: 0;
    transform: translateY(100%);
    transition: transform 100ms ease-in, opacity 200ms ease-in;
  }
`;
