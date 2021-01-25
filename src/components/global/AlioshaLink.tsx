import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  className?: string;
  to: string;
  children: any;
}

export const AlioshaLink = styled(({ className, to, children }: Props) => {
  return (
    <Link className={className} to={to}>
      {children}
    </Link>
  );
})`
  text-decoration: none;
`;
