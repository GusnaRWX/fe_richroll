import React from 'react';
import { Box, Grid, styled, Typography, Button, Skeleton } from '@mui/material';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { getDetailRequested } from '@/store/reducers/slice/cnb/compensationSlice';
import { numberFormat } from '@/utils/format';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import { Text } from '@/components/_shared/common';
import { useTranslation } from 'react-i18next';
import { ifThenElse } from '@/utils/helper';

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
  const { t } = useTranslation();
  const tPath = 'compensation_and_benefits.popup.detail.';
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
              <TitleData>{t(`${tPath}cnb_profile_name`)}</TitleData>
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
                {t('button.edit')}
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
              <TitleData>{t('compensation_and_benefits.popup.detail.date_created')}</TitleData>
              <ItemData>{dayjs(detail?.createdAt).isValid() ? dayjs(detail?.createdAt).format('DD/MM/YY hh:mm') : '-'}</ItemData>
            </Grid>
            <Grid item xs={6} display='flex' flexDirection='column' gap='6px'>
              <TitleData>{t('compensation_and_benefits.popup.detail.last_update')}</TitleData>
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
                {t(`${tPath}base_section.title`)}
              </Typography>
            </Grid>
            <Grid
              container
              direction='row'
              justifyContent='space-between'
              alignItems='flex-start'
            >
              <Grid item xs={6} display='flex' flexDirection='column' gap='6px'>
                <TitleData>{t(`${tPath}base_section.compensation_component`)}</TitleData>
                <ItemData>{baseComponent ? baseComponent?.component?.name : '-'}</ItemData>
              </Grid>
              <Grid item xs={6} display='flex' flexDirection='column' gap='6px'>
                <TitleData>{t(`${tPath}base_section.tax_status`)}</TitleData>
                <TaxData>
                  {ifThenElse(baseComponent, 
                    ifThenElse(baseComponent?.isTaxable, t(`${tPath}base_section.tax_status_option.taxable`), t(`${tPath}base_section.tax_status_option_nontaxable`) ),
                    '-'   )}
                </TaxData>
              </Grid>
            </Grid>
            <Grid display='flex' flexDirection='column' gap='6px'>
              <TitleData>
                {baseComponent?.amount !== null ? 'Amount' : 'Rate'}&nbsp; per &nbsp;
                {baseComponent?.term ? baseComponent?.term.name : '-'}
              </TitleData>
              <ItemData>
                Rp&nbsp;
                {ifThenElse(baseComponent?.amount !== null,
                  ifThenElse(baseComponent?.amount !== null, numberFormat(baseComponent?.amount), numberFormat(baseComponent?.rate)),  
                  0)}
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
                <Text title={t(`${tPath}supplementary_section.title`)} fontWeight={700} color='#223567' />
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
                    <TitleData>{t(`${tPath}supplementary_section.compensation_component`)} {index + 1}</TitleData>
                    <ItemData>{supplement?.component?.name}</ItemData>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    display='flex'
                    flexDirection='column'
                    gap='6px'
                  >
                    <TitleData>{t(`${tPath}supplementary_section.tax_status`)}</TitleData>
                    <TaxData>
                      {supplement?.isTaxable ? t(`${tPath}supplementary_section.tax_status_option.taxable`) : t(`${tPath}supplementary_section.tax_status_option.nontaxable`)}
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
                    {ifThenElse(supplement?.amount !== null, 
                      ifThenElse(supplement?.amount, numberFormat(supplement?.amount), numberFormat(supplement.rate))  ,
                      0)}
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
