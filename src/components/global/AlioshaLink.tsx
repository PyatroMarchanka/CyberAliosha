import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { rootPrefix } from '../../utils/constants';

interface Props {
  className?: string;
  to: string;
  children: any;
  onClick?: () => void;
}

export const AlioshaLink = styled(({ className, to, children, onClick }: Props) => {
  return (
    <Link onClick={!!onClick ? onClick : undefined} className={className} to={rootPrefix + to}>
      {children}
    </Link>
  );
})`
  text-decoration: none;
`;
