import React, { useState } from 'react';
import { Switch } from 'react-router-dom';
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
  > button {
    flex: 1;
  }
  /* border-left: 2px solid #2f3134;
  border-right: 2px solid #2f3134; */
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
  background-color: unset;
  outline: none;
  border-radius: 8px;
  margin: 0 5px;

  color: ${theme.colors.white};
  text-transform: uppercase;

  transition: background-color 0.2s;

  &.active {
    background-color: ${theme.colors.bluePurple[500]};
    // background-color: ${theme.colors.bluePurple[500]};
  }

  &:hover {
    cursor: pointer;
    background-color: #74879c;
    text-decoration: none;
  }
`;
