import React, { useState } from 'react';
import {
  TableCell,
  TableRow,
  Avatar,
} from '@mui/material';
import { IconButton } from '@/components/_shared/form';
import { Image as ImageType } from '@/utils/assetsConstant';
import styled from '@emotion/styled';
import { BsFillEyeFill } from 'react-icons/bs';
import DisbursementEmployeeDetail from './DisbursementEmployeeDetail';
import { numberFormat } from '@/utils/format';
import { Payroll } from '@/types/payroll';

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

function CompleteRow(att) {
  const { item } = att;
  const [selectedEmployee, setSelectedEmployee] = useState<Payroll.DisbursementsData | object>({});
  const [openDetail, setOpenDetail] = useState(false);

  const handleClose = () => {
    setOpenDetail(false);
    setSelectedEmployee({});
  };


  const handleOpen = (employeeDetail) => {
    setOpenDetail(true);
    setSelectedEmployee(employeeDetail);
  };

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <NameWrapper>
            <Avatar
              src={item?.employee?.picture === null ? ImageType.AVATAR_PLACEHOLDER : item?.employee?.picture}
              alt={item.name}
              sx={{
                width: 24, height: 24
              }}
            />
            &nbsp;{item?.employee?.name}
          </NameWrapper>
        </TableCell>
        <TableCell>Rp {numberFormat(item?.net)}</TableCell>
        <TableCell>Rp {numberFormat(item?.taxIncome)}</TableCell>
        <TableCell>Rp {numberFormat(item?.statutory)}</TableCell>
        <TableCell>Rp {numberFormat(item?.contribution)}</TableCell>
        <TableCell>Rp {numberFormat(item?.disbursement)}</TableCell>
        <TableCell>
          <ButtonWrapper>
            <IconButton
              parentColor='#E9EFFF'
              icons={
                <BsFillEyeFill
                  fontSize={20}
                  color='#223567'
                  onClick={() => { handleOpen(item); }}
                />
              }
            />
          </ButtonWrapper>
        </TableCell>
      </TableRow>
      <DisbursementEmployeeDetail
        open={openDetail}
        handleClose={handleClose}
        selectedEmployee={selectedEmployee as Payroll.DisbursementsData}
      />
    </React.Fragment>
  );
}

export default CompleteRow;