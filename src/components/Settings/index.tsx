import { useState } from 'react';
import { IconButton } from '@material-ui/core';
import styled from 'styled-components';

import { Icon } from '../global/Icon';
import SettingsIcon from '@material-ui/icons/Settings';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { SettingsModal } from './SettingsModal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      '& label.Mui-focused': {
        color: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
      },
    },
    formControl: {
      margin: theme.spacing(1),
      width: '100%',
    },
    icon: {
      marginLeft: '2rem',
    },
  })
);

export const Settings = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Container>
      <IconButton
        onClick={() => setIsOpen(true)}
        className={classes.icon}
        edge='start'
        aria-label='menu'
      >
        <Icon type='material' Icon={SettingsIcon} className='settings-icon' />
      </IconButton>
      <SettingsModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </Container>
  );
};

const Container = styled.div`
  .settings-icon {
    fill: white;
  }
`;
