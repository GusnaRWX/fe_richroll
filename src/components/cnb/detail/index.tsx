import React from 'react';
import { Box, Grid, styled, Typography, Button, Skeleton } from '@mui/material';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { getDetailRequested } from '@/store/reducers/slice/cnb/compensationSlice';
import { numberFormat } from '@/utils/format';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import { Text } from '@/components/_shared/common';

export interface DetailCNBProps {
  id: unknown,
  open: boolean;
}

const DetailCnb = ({ id, open }: DetailCNBProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const detail = useAppSelectors((state) => state.compensation.detail?.data);
  const detailLoading = useAppSelectors(
    (state) => state.compensation?.detailLoading
  );
  const TitleData = styled(Typography)({
    fontSize: '14px',
    fontWeight: '600',
  });

  const ItemData = styled(Typography)({
    fontSize: '14px',
    color: '#4B5563',
    fontWeight: '400',
  });

  const TaxData = styled(Box)({
    fontSize: '14px',
    fontWeight: '600',
    backgroundColor: '#E5E7EB',
    padding: '3px 12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '75px',
    borderRadius: '4px',
  });

  interface Supplement {
    id: string;
    amount: number;
    amountType: number;
    component: { id: string; name: string; type: number };
    isBase: boolean;
    isTaxable: boolean;
    rate?: number;
    rateType?: number;
    term: { id: string, name: string }
  }

  React.useEffect(() => {
    if (open) {
      dispatch({
        type: getDetailRequested.toString(),
        Id: id,
      });
    }
  }, [id, open]);

  const baseComponent = Object.assign({}, detail?.base);

  return (
    <>
      {!detailLoading ? (
        <Grid container direction='column' gap={4}>
          {/* name */}
          <Grid
            container
            direction='row'
            justifyContent='space-between'
            alignItems='center'
          >
            <Box display='flex' flexDirection='column' gap='6px'>
              <TitleData>CnB Profile Name</TitleData>
              <ItemData>{detail?.name}</ItemData>
            </Box>
            <Button
              variant='contained'
              color='secondary'
              startIcon={<BorderColorIcon sx={{ color: 'white' }} />}
              onClick={() =>
                router.push(
                  `/compensation-benefits/update/${id}`
                )
              }
            >
              <Typography fontSize={14} color='white'>
                Edit
              </Typography>
            </Button>
          </Grid>

          {/* Date */}
          <Grid
            container
            direction='row'
            justifyContent='space-between'
            alignItems='flex-start'
          >
            <Grid item xs={6} display='flex' flexDirection='column' gap='6px'>
              <TitleData>Date Created</TitleData>
              <ItemData>{dayjs(detail?.createdAt).isValid() ? dayjs(detail?.createdAt).format('DD/MM/YY hh:mm') : '-'}</ItemData>
            </Grid>
            <Grid item xs={6} display='flex' flexDirection='column' gap='6px'>
              <TitleData>Last Updated</TitleData>
              <ItemData>{dayjs(detail?.updatedAt).isValid() ? dayjs(detail?.updatedAt).format('DD/MM/YY') : '-'}</ItemData>
            </Grid>
          </Grid>

          {/* Base */}
          <Grid
            container
            direction='column'
            justifyContent='space-between'
            alignItems='flex-start'
            gap='16px'
          >
            <Grid item>
              <Typography fontWeight={700} color='#223567'>
                Base
              </Typography>
            </Grid>
            <Grid
              container
              direction='row'
              justifyContent='space-between'
              alignItems='flex-start'
            >
              <Grid item xs={6} display='flex' flexDirection='column' gap='6px'>
                <TitleData>Compensation Component</TitleData>
                <ItemData>{baseComponent ? baseComponent?.component?.name : '-'}</ItemData>
              </Grid>
              <Grid item xs={6} display='flex' flexDirection='column' gap='6px'>
                <TitleData>Tax Status</TitleData>
                <TaxData>{baseComponent ? (baseComponent?.isTaxable ? 'Taxable' : 'NTaxable') : '-'}</TaxData>
              </Grid>
            </Grid>
            <Grid display='flex' flexDirection='column' gap='6px'>
              <TitleData>
                {baseComponent?.amount !== null ? 'Amount' : 'Rate'}&nbsp; per &nbsp;
                {baseComponent?.term ? baseComponent?.term.name : '-'}
              </TitleData>
              <ItemData>
                Rp&nbsp;
                {numberFormat(baseComponent?.amount !== null ? (baseComponent?.amount !== null ? baseComponent?.amount : baseComponent?.rate) : 0)}
              </ItemData>
            </Grid>
          </Grid>

          {/* Supplement */}
          {detail?.supplementaries?.map((supplement: Supplement, index: number) => (
            <Grid
              key={supplement.id}
              container
              direction='column'
              justifyContent='space-between'
              alignItems='flex-start'
              gap='16px'
            >
              <Grid item>
                <Text title='Supplementary' fontWeight={700} color='#223567' />
              </Grid>
              <Grid item width='100%'>
                <Grid
                  container
                  direction='row'
                  justifyContent='space-between'
                  alignItems='flex-start'
                >
                  <Grid
                    item
                    xs={6}
                    display='flex'
                    flexDirection='column'
                    gap='6px'
                  >
                    <TitleData>Compensation Component {index + 1}</TitleData>
                    <ItemData>{supplement?.component?.name}</ItemData>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    display='flex'
                    flexDirection='column'
                    gap='6px'
                  >
                    <TitleData>Tax Status</TitleData>
                    <TaxData>
                      {supplement?.isTaxable ? 'Taxable' : 'NTaxable'}
                    </TaxData>
                  </Grid>
                </Grid>
                <Grid display='flex' flexDirection='column' gap='6px' >
                  <TitleData>
                    {supplement?.amount ? 'Amount' : 'Rate'}&nbsp;
                    {supplement?.term?.name ?? '-'}
                  </TitleData>
                  <ItemData>
                    Rp&nbsp;
                    {numberFormat(supplement?.amount !== null ? (supplement?.amount ? supplement?.amount : supplement.rate) : 0)}
                  </ItemData>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Skeleton variant='rounded' height={100} />
      )}
    </>
  );
};

export default DetailCnb;
