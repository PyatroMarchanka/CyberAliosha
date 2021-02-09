import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../utils/theme';

interface Props {
  items: {
    label: string;
  }[];
  children: React.ReactChild[];
}

export const Tabs = ({ items, children }: Props) => {
  const [activeChild, setActiveChild] = useState(0);

  return (
    <Container>
      <TabsButtons>
        {items.map((item, i) => {
          return (
            <TabButton
              isActive={i === activeChild}
              title={item.label}
              onClick={() => setActiveChild(i)}
            />
          );
        })}
      </TabsButtons>
      <Switch>{children.find((child, i) => i === activeChild)}</Switch>
    </Container>
  );
};

const Container = styled.div``;

const TabsButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 20px;
`;

const TabButton = styled(({ className, title, onClick, isActive }) => (
  <button onClick={onClick} className={`${className} ${isActive ? ' active' : ''}`}>
    {title}
  </button>
))`
  border: 0;
  min-width: 50px;
  font-size: 20px;
  padding: 10px;
  box-shadow: none;
  background-color: ${theme.colors.grey50};
  outline: none;

  color: ${theme.colors.white};
  text-transform: uppercase;

  transition: background-color 0.2s;

  &.active {
    background-color: ${theme.colors.grey[500]};
  }

  &:hover {
    cursor: pointer;
    background-color: ${theme.colors.grey[500]};
    text-decoration: none;
  }
`;
