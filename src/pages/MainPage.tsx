import React from 'react';

// @ts-ignore
import styled from 'styled-components';
import { AlioshaLink } from '../components/global/AlioshaLink';
import { Button } from '../components/global/Button';
import { HeroSection } from '../components/global/HeroSection';
import { routes } from './routes';

export function MainPage() {
  const Link = ({ to }: { to: string }) => (
    <AlioshaLink to={to}>
      <Button type="big">GO!</Button>
    </AlioshaLink>
  );
  return (
    <Container>
      <HeroSection
        backgroundImage="/images/hero1.jpg"
        summary={
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam facilis sapiente quibusdam eum magnam ab voluptatum officiis nemo obcaecati, quos sunt odio nisi maiores cumque, reprehenderit voluptatibus repellat aperiam. Laboriosam.'
        }
        title="Chords"
        rightImage="https://picsum.photos/500/300"
        actionComponent={<Link to={routes.chordsEditor} />}
      />
      <HeroSection
        backgroundImage="/images/hero2.jpg"
        summary={
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam facilis sapiente quibusdam eum magnam ab voluptatum officiis nemo obcaecati, quos sunt odio nisi maiores cumque, reprehenderit voluptatibus repellat aperiam. Laboriosam.'
        }
        title="Melody"
        rightImage="https://picsum.photos/500/300"
        actionComponent={<Link to={routes.melodyEditor} />}
      />
      <HeroSection
        backgroundImage="/images/hero3.jpg"
        summary={
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam facilis sapiente quibusdam eum magnam ab voluptatum officiis nemo obcaecati, quos sunt odio nisi maiores cumque, reprehenderit voluptatibus repellat aperiam. Laboriosam.'
        }
        title="MIDI"
        rightImage="https://picsum.photos/500/300"
        actionComponent={<Link to={routes.midiEditor} />}
      />
    </Container>
  );
}

const Container = styled.div``;
