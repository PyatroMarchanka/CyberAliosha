import React from 'react';
import styled from 'styled-components';
import { Color, theme } from '../../utils/theme';

interface Props {
  color?: Color;
  onClick?: (e: any) => void;
  children: any;
  type?: 'primary';
  id?: string;
  className?: string;
}

export function Button({
  color = theme.colors.indigo,
  onClick,
  children,
  type = 'primary',
  id,
  className,
}: Props) {
  const Component = getButtonByType(type);

  return (
    <Component className={className} id={id} onClick={onClick} fontColor={color}>
      {children}
    </Component>
  );
}

interface StyledProps {
  fontColor: Color;
}

const PrimaryButton = styled.button`
  padding: 10px;
  margin: 20px;
  background-color: ${({ fontColor }: StyledProps) => fontColor[500]};
  border: 0;
  border-radius: 5px;
  color: ${theme.colors.grey[50]};
  font-family: ${theme.fonts.primary};
  font-size: 20px;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    cursor: pointer;
    background-color: ${({ fontColor }: StyledProps) => fontColor[400]};
  }

  &:active {
    background-color: ${({ fontColor }: StyledProps) => fontColor[700]};
  }
`;

function getButtonByType(type: Props['type']) {
  switch (type) {
    case 'primary':
      return PrimaryButton;

    default:
      return PrimaryButton;
  }
}
