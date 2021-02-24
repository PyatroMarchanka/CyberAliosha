import React from 'react';
import MUCheckbox from '@material-ui/core/Checkbox';
import { FormControlLabel, FormGroup } from '@material-ui/core';

interface Props {
  onChange: (value: boolean) => void;
  value: boolean;
  className?: string;
  label: string | JSX.Element;
}

export const Checkbox = ({ onChange, value, className, label }: Props) => {
  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <MUCheckbox
            className={className}
            checked={value}
            onChange={(e, checked) => onChange(checked)}
            color="default"
            inputProps={{ 'aria-label': 'checkbox with default color' }}
          />
        }
        label={label}
      />
    </FormGroup>
  );
};
