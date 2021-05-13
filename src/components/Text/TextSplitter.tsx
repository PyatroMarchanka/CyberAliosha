import React, { useState } from 'react';
import { TextField, withStyles } from '@material-ui/core';
import styled from 'styled-components';
import { Button } from '../global/Button';
import { theme } from '../../utils/theme';

const CssTextField = withStyles({
  root: {
    padding: '0 10px',
    '& label.Mui-focused': {
      color: theme.colors.bluePurple[700],
    },
    '& label': {
      color: theme.colors.grey[500],
      padding: '0 10px',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiFormControl-root .MuiFormLabel-root': {
      border: '1px solid red',
    },
    '& .MuiOutlinedInput-root': {
      color: theme.colors.black,
      '&::placeholder': {
        color: theme.colors.bluePurple[500],
      },
      '& fieldset': {
        borderColor: theme.colors.bluePurple[500],
      },
      '&:hover fieldset': {
        borderColor: theme.colors.bluePurple[200],
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.colors.bluePurple[700],
      },
    },
  },
})(TextField);

interface Props {
  onSubmit: (text: string) => void;
}

export const TextSplitter = ({ onSubmit }: Props) => {
  const [lyric, setLyric] = useState(
    // 'Two roads diverged in a yellow wood,\nAnd sorry I could not travel both\nAnd be one traveler, long I stood\nAnd looked down one as far as I could',
    "With the lights out, it's less dangerous \nHere we are now, entertain us\nI feel stupid and contagious\nHere we are now, entertain us"
  );

  const submit = (lyric: string) => {
    if (lyric) {
      onSubmit(lyric);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    e.preventDefault();
    setLyric(e.target.value);
  };

  return (
    <Container>
      <CssTextField
        id='outlined-multiline-flexible'
        label='Lyric (English, Russian or Belarussian)'
        multiline
        rowsMax={4}
        value={lyric}
        onChange={onChange}
        variant='outlined'
        className='lyric-input'
      />
      <Button onClick={() => submit(lyric)}>Generate song</Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media ${theme.breakpoints.belowMobile} {
    width: 100%;
  }

  .lyric-input {
    min-width: 400px;

    &.MuiOutlinedInput-root {
      fieldset {
        border-color: ${theme.colors.bluePurple[500]};
      }
      &:hover fieldset {
        border-color: 'yellow';
      }
      &.Mui-focused fieldset {
        border-color: 'green';
      }
    }

    @media ${theme.breakpoints.belowMobile} {
      min-width: unset;
      width: 100%;
    }
  }
`;
