import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import { useAppDispatch } from '@/hooks/index';
import { setResponserMessage } from '@/store/reducers/slice/responserSlice';
import { BsCheckCircle } from 'react-icons/bs';
import { IconButton, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';


const CardWrapper = styled.div`
 visibility: hidden;
 width: auto;
 margin: 0 auto;
 background-color: #FFFFFF;
 color: #18181B;
 border-radius: 8px;
 border: 1px solid #E4E4E7;
 box-shadow: 0px 0px 12px rgba(89, 73, 73, 0.25);
 position: fixed;
 padding: .5rem;
 z-index: 99999999;
 top: 40px;
 left: 70%;

 @keyframes snackbarin {
  from {
    top: 0;
    opacity: 0;
  }

  to {
    top: 30px;
    opacity: 1;
  }
}

 &.open {
  visibility: visible;
  -webkit-animation: snackbarin .5s, snackbarout .5s 2.5s;
  animation: snackbarin .5s, snackbarout .5s 2.5s;
 }
`;
const ContentWrapaper = styled.div`
 display: flex;
 flex-direction: row;
 flex-wrap: nowrap;
 align-items: center;
 justfiy-content: flex-start;
 gap: 1rem;
`;

const MessageWrapper = styled.div`
 display: flex;
 flex-direction: column;
 flex-wrap: nowrap;
 margin-right: 2rem;
`;

interface NotifyProps {
  body: string;
}

function Notify({body}: NotifyProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    function watchNotify() {
      if (!mounted) {
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
          setMounted(true);
          dispatch({ type: setResponserMessage.toString(), payload: { code: 0, message: null } });
        }, 5000);
      }
    }
    watchNotify();
  }, [open]);

  return (
    <CardWrapper className={open ? 'open' : ''}>
      <ContentWrapaper>
        <BsCheckCircle fontSize={20} style={{ color: '#4ADE80' }}/>
        <MessageWrapper>
          <Typography fontWeight='bold'>Successfully Saved!</Typography>
          <Typography color='grey'>{body}</Typography>
        </MessageWrapper>
        <IconButton sx={{ margin: 0 }} onClick={() => setOpen(false)}><Close /></IconButton>
      </ContentWrapaper>
    </CardWrapper>
  );
}

export default Notify;