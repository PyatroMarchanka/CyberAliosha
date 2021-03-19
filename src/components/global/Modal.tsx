import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from 'styled-components';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

interface Props {
  title: string;
  triggerComponent: JSX.Element;
  children: any;
  className?: string;
  style?: CSSProperties;
}

export default function Modal({ triggerComponent, children, title, className, style }: Props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <div onClick={handleClickOpen}>{triggerComponent}</div>

      <Dialog
        maxWidth='xl'
        style={style || {}}
        className={className}
        onBackdropClick={handleClose}
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </Container>
  );
}

const Container = styled.div`
  display: inline-block;
  .modal {
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;
