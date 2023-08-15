import React from 'react';
import { Employees } from '@/types/employees';
import { Box, Grid, styled } from '@mui/material';
import { Text } from '@/components/_shared/common';
import { numberFormat } from '@/utils/format';
import { ifThenElse } from '@/utils/helper';
import { useTranslation } from 'react-i18next';

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

const CnbDetail = ({ data }: Employees.GetEmployeeCnbDetail) => {
  const {t} = useTranslation();
  const t_cnbDetail = 'company_management.employees.form_&_detail.cnb';
  const t_cnbBaseSection = 'company_management.employees.form_&_detail.cnb.base_section';
  const t_cnbSupplementarySection = 'company_management.employees.form_&_detail.cnb.supplementary_section';
  console.log(data.base.amount);
  return (
    <>
      <Grid container mb='1rem'>
        <Grid item>
          <Text title={t(`${t_cnbDetail}.cnb_profile`)} fontWeight={600} color='primary' fontSize={18} mb='.5rem' />
          <Text title={data?.name || ''} color='grey.400' fontWeight={500} />
        </Grid>
      </Grid>
      {/* Base Compensation */}
      {data?.base && (
        <>
          <Grid container>
            <Grid item xs={12}>
              <Text title={t(`${t_cnbBaseSection}.title`)} fontWeight={600} color='primary' fontSize={18} mb='1rem' />
            </Grid>
          </Grid>
          <Grid container flexDirection='column' mb='1rem'>
            <Grid item md={6} mb='1rem'>
              <Grid container justifyContent='space-between' alignItems='flex-start'>
                <Grid item>
                  <Text title={t(`${t_cnbBaseSection}.compensation_component`)} fontWeight={600} color='primary' fontSize={16} mb='.5rem' />
                  <Text title={data?.base?.component?.name || ''} color='grey.400' fontWeight={500} />
                </Grid>
                <Grid item>
                  <Text title={t(`${t_cnbBaseSection}.tax_status`)} fontWeight={600} color='primary' fontSize={16} mb='.5rem' />
                  <TaxData>{data?.base?.isTaxable ? t(`${t_cnbBaseSection}.tax_status_option.taxable`) : t(`${t_cnbBaseSection}.tax_status_option.nontaxable`)}</TaxData>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={6}>
              <Text
                title={`${ifThenElse(data?.base?.amount !== null, t(`${t_cnbBaseSection}.amount`), t(`${t_cnbBaseSection}.rate`))} per ${ifThenElse(data?.base?.term, data?.base?.term?.name, '-')}`}
                fontWeight={600}
                color='primary'
                fontSize={16}
                mb='.5rem'
              />
              <Text
                title={`Rp ${ifThenElse(data?.base?.amount === null,numberFormat(+data?.base?.rate) , numberFormat(+data?.base?.amount))}`}
                color='grey.400' fontWeight={500}
              />
            </Grid>
          </Grid>
        </>
      )}
      {/* End of Base Compensation */}
      {data?.supplementaries.length > 0 && (
        <Grid container>
          <Grid item xs={12}>
            <Text title={t(`${t_cnbSupplementarySection}.title`)} fontWeight={600} color='primary' fontSize={18} mb='1rem' />
          </Grid>
        </Grid>
      )}
      {data?.supplementaries?.map((supplement, index) => (
        <Grid key={supplement.id} container flexDirection='column'>
          <Grid item md={6} mb='1rem'>
            <Grid container justifyContent='space-between' alignItems='flex-start'>
              <Grid item>
                <Text title={`${t(`${t_cnbSupplementarySection}.compensation_component`)} ${index + 1}`} fontWeight={600} color='primary' fontSize={16} mb='.5rem' />
                <Text title={supplement?.component?.name || ''} color='grey.400' fontWeight={500} />
              </Grid>
              <Grid item>
                <Text title={t(`${t_cnbSupplementarySection}.tax_status`)} fontWeight={600} color='primary' fontSize={16} mb='.5rem' />
                <TaxData>{supplement?.isTaxable ? t(`${t_cnbSupplementarySection}.tax_status_option.taxable`) : t(`${t_cnbSupplementarySection}.tax_status_option.nontaxable`)}</TaxData>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6}>
            <Text title={`${ifThenElse(supplement?.amount !== null, t(`${t_cnbSupplementarySection}.amount`), t(`${t_cnbSupplementarySection}.rate`))} per ${ifThenElse(supplement?.term, supplement?.term?.name , '-')} `}
              fontWeight={600} color='primary' fontSize={16} mb='.5rem'
            />
            <Text title={`Rp ${ifThenElse(supplement?.amount !== null,
              ifThenElse(supplement?.amount !== null, numberFormat(supplement?.amount), numberFormat(supplement?.rate)), 0)}`} color='grey.400' fontWeight={500} />
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default CnbDetail;