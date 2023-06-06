import React from 'react';
import {
  TableCell,
  TableRow,
  Avatar,
} from '@mui/material';
import { IconButton } from '@/components/_shared/form';
import { Image as ImageType } from '@/utils/assetsConstant';
import styled from '@emotion/styled';
import { BsFillEyeFill } from 'react-icons/bs';

const ButtonWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: center;
 gap: .5rem;
`;

const NameWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: flex-start;
 margin: 0;
`;

function CompleteRow (row) {
  const { item } = row;

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <NameWrapper>
            <Avatar
              src={ImageType.AVATAR_PLACEHOLDER}
              alt={item.name}
              sx={{
                width: 24, height: 24
              }}
            />
            &nbsp;{item.name}
          </NameWrapper>
        </TableCell>
        <TableCell>{item.attendance}</TableCell>
        <TableCell>{item.absent}</TableCell>
        <TableCell>{item.paidLeave}</TableCell>
        <TableCell>{item.unpaidLeave}</TableCell>
        <TableCell>{item.nonTax}</TableCell>
        <TableCell>
          <ButtonWrapper>
            <IconButton
              parentColor='#E9EFFF'
              icons={
                <BsFillEyeFill fontSize={20} color='#223567'/>
              }
            />
          </ButtonWrapper>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default CompleteRow;