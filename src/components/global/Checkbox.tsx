import React from 'react';
import MUCheckbox from '@material-ui/core/Checkbox';
import { FormControlLabel, FormGroup, makeStyles } from '@material-ui/core';
import { theme } from '../../utils/theme';

interface Props {
  onChange: (value: boolean) => void;
  value: boolean;
  className?: string;
  label: string | JSX.Element;
}

const useStyles = makeStyles({
  root: {},
  icon: {},
  'MuiSvgIcon-root': {
    fill: theme.colors.primary,
  },
});

export const Checkbox = ({ onChange, value, className, label }: Props) => {
  const classes = useStyles();
  return (
    <FormGroup row>
      <FormControlLabel
        // style={{ color: theme.colors.white }}
        control={
          <MUCheckbox
            style={{ color: theme.colors.black }}
            className={classes.root + ' ' + className}
            checked={value}
            onChange={(e, checked) => onChange(checked)}
            color="primary"
            inputProps={{ 'aria-label': 'checkbox with default color' }}
          />
        }
        label={label}
      />
    </FormGroup>
  );
};
