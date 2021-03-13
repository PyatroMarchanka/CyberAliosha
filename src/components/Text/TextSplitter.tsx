import React, { useState } from 'react';
import { createStyles, makeStyles, TextField, Theme, withStyles } from '@material-ui/core';
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
    '— Скажи-ка, дядя, ведь не даром\n Москва, спаленная пожаром,\n Французу отдана?\n Ведь были ж схватки боевые,\nДа, говорят, еще какие!\n Недаром помнит вся Россия\n Про день Бородина!',
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
        id="outlined-multiline-flexible"
        label="The lyric of the song"
        multiline
        rowsMax={4}
        value={lyric}
        onChange={onChange}
        variant="outlined"
        className="lyric-input"
      />
      <Button onClick={() => submit(lyric)}>Ok</Button>
    </Container>
  );
};

const Container = styled.form`
  display: flex;
  flex-direction: column;

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
  }
`;
