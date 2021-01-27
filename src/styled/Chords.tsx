import styled from 'styled-components';
import { theme } from '../utils/theme';

export const StyledProgressionContainer = styled.div`
  margin: 20px 0;
  padding: 20px;
  border-radius: 5px;
  max-width: 500px;
  background-color: ${theme.colors.grey[200]};
`;

export const StyledProgression = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;

  .chord {
    flex-basis: 20%;
    margin: 10px;
  }
`;
