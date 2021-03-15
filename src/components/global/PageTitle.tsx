import { Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { theme } from '../../utils/theme';

export const PageTitle = styled(({ title, className }: { title: string; className?: string }) => (
  <Typography className={className} variant="h5">
    {title}
  </Typography>
))`
  color: ${theme.colors.black};
  text-align: center;
`;
