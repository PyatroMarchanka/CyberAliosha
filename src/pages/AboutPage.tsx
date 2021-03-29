import { Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { PageTitle } from '../components/global/PageTitle';
import { MetalBlock } from '../styled/global';
import { theme } from '../utils/theme';

interface Props {}

export const AboutPage = (props: Props) => {
  return (
    <div>
      <Header title='About' />
      <Block>
        <Typography variant='h5'>How it works</Typography>
        <Step
          number='01'
          title='Introduction'
          copy="CyberAliosha provides the ability to create chord
          progressions and melodies. And you don't have to spend years learning how to write songs! The program uses unique algorithms based on musical theory and analysis of differentmusic."
        />
        <Step
          number='02'
          title='Chords'
          copy='
          The song starts with a chord. Select "Chords" from the menu. You will see a set of buttons with chord names. They fall into three categories: Major, Minor, and Unstable. To begin with, you can choose a starting key - this is C major by default. When you press a chord, the program changes the set of available ones, adapting to the new chord. When the chords are ready, click “Add Melody".'
        />
        <Step
          number='03'
          title='Melody'
          copy="
In the new window, you can immediately proceed by clicking 'Generate melody'. If you don't like the melody, press it again. You can also update chords, or return to edit mode.
"
        />
        <Step
          number='04'
          title='Music scores'
          copy='
You can save chords and melodies using the button (button). They will be available in the "Saved" section. The sequences and melodies are available as music scores, so you can play them right now!
'
        />
        <Step
          number='05'
          title='Settings'
          copy='
          In the settings section, you can change the playback tempo, the nature of the composed melodies and their density.
'
        />
      </Block>
    </div>
  );
};

const Header = styled(PageTitle)`
  margin-bottom: 20px;
`;

const Step = styled(
  ({
    copy,
    className,
    number,
    title,
  }: {
    copy: string;
    className?: string;
    number: string;
    title: string;
  }) => (
    <p className={className}>
      <span className='number'>{number}</span>
      <Typography variant='h6'>{title}</Typography>
      {copy}
    </p>
  )
)`
  margin: 30px 0;

  .number {
    font-size: 30px;
    font-weight: bold;
    float: left;
    margin-right: 5px;
    color: ${theme.colors.bluePurple[500]};
  }
`;

const Block = styled(MetalBlock)`
  padding: 20px;
  margin: 0 auto;
  max-width: 700px;
`;
