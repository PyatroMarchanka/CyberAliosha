import React from 'react';
import styled from 'styled-components';
import { useLongPress } from '../../hooks/useLongPress';
import { Color, theme } from '../../utils/theme';

interface Props {
  color?: Color;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onLongPress?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: any;
  type?: 'primary' | 'big';
  id?: string;
  className?: string;
  disabled?: boolean;
  ref?: any;
}

export function Button({
  color = theme.colors.indigo,
  onClick = () => {},
  onLongPress = () => {},
  children,
  type = 'primary',
  id,
  className,
  disabled = false,
  ref = null,
}: Props) {
  const Component = getButtonByType(type);

  const longPressEvent = useLongPress(onLongPress, 500);

  return (
    <Component
      ref={ref}
      disabled={disabled}
      className={className}
      id={id}
      {...longPressEvent}
      onClick={onClick}
      fontColor={color}
    >
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
  background: linear-gradient(0deg, rgba(128, 126, 126, 1) 20%, rgba(255, 255, 255, 0.7) 100%);
  border: 0;
  border-radius: 7px;
  min-width: 55px;
  color: ${theme.colors.grey[50]};
  font-family: ${theme.fonts.primary};
  font-size: 20px;
  font-weight: 500;
  transition: all 0.2s ease;
  outline: none;

  &:hover {
    cursor: pointer;
    background: linear-gradient(0deg, rgba(128, 126, 126, 1) 60%, rgba(255, 255, 255, 0.7) 100%);
  }

  &:active {
    background-color: ${({ fontColor }: StyledProps) => fontColor[700]};
    border: 0;
  }

  &:disabled {
    background-color: ${({ fontColor }: StyledProps) => fontColor[200]};
    &:hover {
      cursor: unset;
    }
  }
`;

const BigButton = styled(PrimaryButton)`
  padding: 20px;
  margin: 0;
  font-size: 25px;
  font-weight: 500;
`;

function getButtonByType(type: Props['type']) {
  switch (type) {
    case 'primary':
      return PrimaryButton;

    case 'big':
      return BigButton;

    default:
      return PrimaryButton;
  }
}
