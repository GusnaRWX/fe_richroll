import React from 'react';
import {
  Box,
  BoxProps,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  ImageList,
  ImageListItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import Link from 'next/link';
import { Image as ImageType, Icons } from '@/utils/assetsConstant';
import { ImageList as ImageListAll } from './ImageList';

const WrapperContainer = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    padding: '80px 135px',
  },
  [theme.breakpoints.down('md')]: {
    padding: '40px 24px',
  },
  background: 'white',
  display: 'flex',
  alignItems: 'center',
}));

const WrapperContainerSpotlight = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    padding: '80px 135px',
  },
  [theme.breakpoints.down('md')]: {
    padding: '40px 24px',
  },
  background: '#F9FAFB',
  display: 'flex',
  alignItems: 'center',
}));

const WrapperTopBarContent = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  },
  [theme.breakpoints.down('md')]: {
    display: 'none'
  },
  justifyContent: 'space-between',
  margin: '0 70px',
  height: '36px',
  alignItems: 'center'
}));

const WrapperNavbarContent = styled(Toolbar)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    margin: '0 70px',
    padding: '12px 0'
  },
  [theme.breakpoints.down('md')]: {
    margin: '0 24px',
    padding: '16px 0'
  },
  display: 'flex',
  justifyContent: 'space-between',
}));

const LinkMenu = styled(Link)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  },
  [theme.breakpoints.down('md')]: {
    display: 'none'
  },
  color: theme.palette.primary.main,
  textDecoration: 'none',
  fontWeight: 500,
  fontSize: 16,
  padding: '8px 16px'
}));

const LinkTopBar = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  fontWeight: 400,
  fontSize: 12,
}));

const LinkFooter = styled(Link)(() => ({
  display: 'block',
  color: '#4B5563',
  textDecoration: 'none',
  fontWeight: 400,
  fontSize: 14,
  mb: '8px'
}));

const Topbar = () => {
  return (
    <WrapperTopBarContent>
      <LinkTopBar href='/'>ID | EN</LinkTopBar>
      <LinkTopBar href='/'>Contact Support</LinkTopBar>
    </WrapperTopBarContent>
  );
};

const Navbar = () => {
  return (
    <AppBar
      component='nav'
      sx={{
        background: '#FFFFFF',
        color: 'primary.main',
        filter: 'drop-shadow(0px 6px 20px rgba(0, 0, 0, 0.05))',
        boxShadow: 'none'
      }}
    >
      <Topbar />
      <WrapperNavbarContent disableGutters>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ mr: { xs: '10px', lg: '80px' }}}>
            <Image
              src={ImageType.KAYAROLL_LOGO}
              width={151}
              height={40}
              alt='kayaroll'
            />
          </Box>
          <LinkMenu href='/'>About Us</LinkMenu>
          <LinkMenu href='/'>Solution</LinkMenu>
          <LinkMenu href='/'>Resource</LinkMenu>
          <LinkMenu href='/'>Subscription</LinkMenu>
          <LinkMenu href='/'>Partnership</LinkMenu>
        </Box>
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
          >
            <MenuIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Button
            variant='outlined'
            color='primary'
            LinkComponent={Link}
            href='/login'
            sx={{
              textTransform: 'none',
              marginRight: '16px'
            }}
          >
            Login
          </Button>
          <Button
            variant='contained'
            color='primary'
            LinkComponent={Link}
            href='/register'
            sx={{
              textTransform: 'none',
            }}
          >
            Try for free
          </Button>
        </Box>
      </WrapperNavbarContent>
    </AppBar>
  );
};



const imageComponent = (col:number, slice2:number|undefined) => {
  return (
    <ImageList cols={col} rowHeight={64}>
      {ImageListAll.slice(col === 6 ? -6 : 0, slice2).map((item, id) => (
        <ImageListItem sx={{ alignItems: 'center' }} key={id}>
          <Image
            src={item.img}
            alt={item.alt}
            height={64}
            width={80}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

const LandingComponent = () => {

  return (
    <Box component='div' sx={{ marginTop: '100px' }}>
      <Navbar />

      <WrapperContainer sx={{ justifyContent: {xs: 'center', md: 'space-between'}, flexDirection: {xs: 'column', md: 'row'} }}>
        <Box component='div'>
          <Typography
            variant='text-lg'
            component='div'
            sx={{ marginBottom: '24px' }}
          >
            Payroll & HR Solutions Specially Curated For SMEs And Start-Ups
          </Typography>
          <Typography
            variant='text-5xl'
            component='div'
            sx={{ fontWeight: 700 }}
          >
            The Smoother The Better.
          </Typography>

          <Box component='div' sx={{ display: 'flex', alignItems: 'center' }}>
            <Image
              src={Icons.CHECK_CIRCLE}
              alt='preview'
              height={20}
              width={20}
            />
            <Typography
              variant='text-lg'
              sx={{ marginLeft: '8px' }}
            >
              Easy Set Up
            </Typography>
          </Box>
          <Box component='div' sx={{ display: 'flex', alignItems: 'center' }}>
            <Image
              src={Icons.CHECK_CIRCLE}
              alt='preview'
              height={20}
              width={20}
            />
            <Typography
              variant='text-lg'
              sx={{ marginLeft: '8px' }}
            >
              Friendly Customer Support
            </Typography>
          </Box>
          <Box component='div' sx={{ display: 'flex', alignItems: 'center' }}>
            <Image
              src={Icons.CHECK_CIRCLE}
              alt='preview'
              height={20}
              width={20}
            />
            <Typography
              variant='text-lg'
              sx={{ marginLeft: '8px' }}
            >
              Cancel Anytime
            </Typography>
          </Box>

          <Button
            variant='contained'
            color='primary'
            LinkComponent={Link}
            href='/register'
            sx={{
              textTransform: 'none',
              marginTop: '40px',
              width: {xs: '100%', md: 'auto'}
            }}
          >
            Get a Demo, Try Us!
          </Button>
        </Box>
        <Box component='div' sx={{ position: 'relative', width: { xs: '100%', md: '40%' }, height: '320px', mt: {xs: '32px', md: '0px'} }}>
          <Image
            src={ImageType.PREVIEW_DASHBOARD}
            alt='preview'
            fill
            sizes='(max-width: 1130px) 100%, 476px'
            style={{ objectFit: 'contain' }}
          />
        </Box>
      </WrapperContainer>

      <WrapperContainer sx={{ justifyContent: 'center' }}>
        <Box component='div' sx={{ width: '100%' }}>
          <Typography
            variant='text-4xl'
            component='div'
            sx={{ marginBottom: '24px', fontWeight: 700, textAlign: 'center' }}
          >
            We’ve helped 100+ SMEs and Startups
          </Typography>
          <Box component='div' sx={{ display: {xs: 'none', md: 'block'}, marginBottom: '40px', justifyContent: 'space-between', alignContent: 'center' }}>
            {imageComponent(7, 7)}
          </Box>
          <Box component='div' sx={{ display: {xs: 'none', md: 'block'}, justifyContent: 'space-around', alignContent: 'center' }}>
            {imageComponent(6, undefined)}
          </Box>
          <Box component='div' sx={{ display: {xs: 'block', md: 'none'}, justifyContent: 'space-between', alignContent: 'center' }}>
            {imageComponent(3, 12)}
          </Box>
        </Box>
      </WrapperContainer>

      <WrapperContainerSpotlight sx={{ justifyContent: 'center' }}>
        <Box component='div' sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            variant='text-4xl'
            component='div'
            sx={{ fontWeight: 700, textAlign: 'center' }}
          >
            About Kayaroll
          </Typography>
          <Typography
            variant='text-base'
            component='div'
            sx={{ marginBottom: '24px', fontWeight: 400, textAlign: 'center' }}
          >
            A friend to SMEs and Start‑ups, we’re here to help you keep payroll<br />processes simple, smooth and secure, so that you can focus on what’s<br />important!
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              '& > :not(style)': {
                m: 0.5,
                width: {xs: '100%', md: 377},
                padding: '24px',
                textAlign: 'center'
              },
            }}
          >
            <Paper sx={{ display: {xs: 'flex', md: 'block'}, flexDirection: {xs: 'row', md: 'column'} }} elevation={0}>
              <Image
                src={Icons.ABOUT_1}
                alt='about1'
                height={80}
                width={80}
              />
              <Box>
                <Typography
                  variant='text-lg'
                  component='div'
                  sx={{ fontWeight: 700 }}
                >
                  Founded in 2020
                </Typography>
                <Typography
                  variant='text-base'
                  component='div'
                  sx={{ fontWeight: 400 }}
                >
                  We’re here to offer a Fresh Approach
                </Typography>
              </Box>
            </Paper>
            <Paper sx={{ display: {xs: 'flex', md: 'block'}, flexDirection: {xs: 'row', md: 'column'} }} elevation={0}>
              <Image
                src={Icons.ABOUT_2}
                alt='about2'
                height={80}
                width={80}
              />
              <Box>
                <Typography
                  variant='text-lg'
                  component='div'
                  sx={{ fontWeight: 700 }}
                >
                  Singaporean Company
                </Typography>
                <Typography
                  variant='text-base'
                  component='div'
                  sx={{ fontWeight: 400 }}
                >
                  We’re fully Homegrown
                </Typography>
              </Box>
            </Paper>
            <Paper sx={{ display: {xs: 'flex', md: 'block'}, flexDirection: {xs: 'row', md: 'column'} }} elevation={0}>
              <Image
                src={Icons.ABOUT_3}
                alt='about3'
                height={80}
                width={80}
              />
              <Box>
                <Typography
                  variant='text-lg'
                  component='div'
                  sx={{ fontWeight: 700 }}
                >
                  SMEs Friendly
                </Typography>
                <Typography
                  variant='text-base'
                  component='div'
                  sx={{ fontWeight: 400 }}
                >
                  We’re focussed on empowering SMEs and Startups
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Box>
      </WrapperContainerSpotlight>

      <WrapperContainer sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ width: { xs: '70%', md: '50%' } }}>
          <Typography
            variant='text-4xl'
            component='div'
            sx={{ fontWeight: 700 }}
          >
            Save your Money
          </Typography>
          <Typography
            variant='text-base'
            component='div'
            sx={{ fontWeight: 400 }}
          >
            Time-consuming payroll calculations and processes that take up critical resources.
          </Typography>
        </Box>
        <Box component='div' sx={{ position: 'relative', width: { xs: '30%', md: '50%' }, height: { xs: '90px', md: '275px' } }}>
          <Image
            src={ImageType.LANDING_1}
            alt='landing1'
            fill
            sizes='(max-width: 1130px) 100%, 410px'
            style={{ objectFit: 'contain' }}
          />
        </Box>
      </WrapperContainer>

      <WrapperContainer sx={{ justifyContent: 'space-between' }}>
        <Box component='div' sx={{ position: 'relative', width: { xs: '30%', md: '50%' }, height: { xs: '90px', md: '275px' } }}>
          <Image
            src={ImageType.LANDING_2}
            alt='landing2'
            fill
            sizes='(max-width: 1130px) 100%, 410px'
            style={{ objectFit: 'contain' }}
          />
        </Box>
        <Box sx={{ width: { xs: '70%', md: '50%' } }}>
          <Typography
            variant='text-4xl'
            component='div'
            sx={{ fontWeight: 700 }}
          >
            Save your Time
          </Typography>
          <Typography
            variant='text-base'
            component='div'
            sx={{ fontWeight: 400 }}
          >
            To any business, time is money. Digitalise to rid yourself of tedious paperwork, and improve efficiency.
          </Typography>
        </Box>
      </WrapperContainer>

      <WrapperContainer sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ width: { xs: '70%', md: '50%' } }}>
          <Typography
            variant='text-4xl'
            component='div'
            sx={{ fontWeight: 700 }}
          >
            Stay Compliant
          </Typography>
          <Typography
            variant='text-base'
            component='div'
            sx={{ fontWeight: 400 }}
          >
            Our systems are well attuned to government reporting requirements.
          </Typography>
        </Box>
        <Box component='div' sx={{ position: 'relative', width: { xs: '30%', md: '50%' }, height: { xs: '90px', md: '275px' } }}>
          <Image
            src={ImageType.LANDING_3}
            alt='landing3'
            fill
            sizes='(max-width: 1130px) 100%, 410px'
            style={{ objectFit: 'contain' }}
          />
        </Box>
      </WrapperContainer>

      <WrapperContainerSpotlight sx={{ justifyContent: 'center' }}>
        <Box component='div' sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            variant='text-4xl'
            component='div'
            sx={{ marginBottom: '24px', fontWeight: 700, textAlign: 'center' }}
          >
            Why Choose Kayaroll?
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              '& > :not(style)': {
                m: 0.5,
                width: {xs: '100%', md: 377},
                padding: '24px',
                textAlign: 'center'
              },
            }}
          >
            <Paper sx={{ display: {xs: 'flex', md: 'block'}, flexDirection: {xs: 'row', md: 'column'} }} elevation={0}>
              <Image
                src={Icons.WHY_1}
                alt='why1'
                height={80}
                width={80}
              />
              <Typography
                variant='text-lg'
                component='div'
                sx={{ fontWeight: 700 }}
              >
                Simple and Intuitive User Interface
              </Typography>
            </Paper>
            <Paper sx={{ display: {xs: 'flex', md: 'block'}, flexDirection: {xs: 'row', md: 'column'} }} elevation={0}>
              <Image
                src={Icons.WHY_2}
                alt='why2'
                height={80}
                width={80}
              />
              <Typography
                variant='text-lg'
                component='div'
                sx={{ fontWeight: 700 }}
              >
                RAS Integrated and Compliant
              </Typography>
            </Paper>
            <Paper sx={{ display: {xs: 'flex', md: 'block'}, flexDirection: {xs: 'row', md: 'column'} }} elevation={0}>
              <Image
                src={Icons.WHY_3}
                alt='why3'
                height={80}
                width={80}
              />
              <Typography
                variant='text-lg'
                component='div'
                sx={{ fontWeight: 700 }}
              >
                Excellent Customer Support
              </Typography>
            </Paper>
          </Box>
        </Box>
      </WrapperContainerSpotlight>

      <WrapperContainer sx={{ justifyContent: {xs: 'center', md: 'space-between'}, flexDirection: {xs: 'column', md: 'row'} }}>
        <Box sx={{ width: {xs: '100%', md: '40%'} }}>
          <Typography
            variant='text-4xl'
            component='div'
            sx={{ marginBottom: '16px', fontWeight: 700 }}
          >
            Frequently asked questions
          </Typography>
          <Typography
            variant='text-base'
            component='div'
            sx={{ fontWeight: 400 }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum Blandit risus vitae viverra porta. Nam ullamcorper est ac fermentum condimentum.
          </Typography>
        </Box>
        <Box sx={{ width: {xs: '100%', md: '50%'}, mt: {xs: '10px', md: '0'} }}>
          <Accordion>
            <AccordionSummary
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography>What is Kayaroll?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              aria-controls='panel2a-content'
              id='panel2a-header'
            >
              <Typography>How to try Kayaroll?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              aria-controls='panel3a-content'
              id='panel3a-header'
            >
              <Typography>Do we need to pay to use Kayaroll?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              aria-controls='panel4a-content'
              id='panel4a-header'
            >
              <Typography>Is Kayaroll software secure?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </WrapperContainer>

      <WrapperContainer sx={{ justifyContent: 'center' }}>
        <Box component='div' sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ textAlign: 'center' }}>
            <Image
              src={ImageType.KAYAROLL_MINI}
              width={64}
              height={64}
              alt='kayaroll'
            />
          </Box>

          <Typography
            variant='text-4xl'
            component='div'
            sx={{ fontWeight: 700, textAlign: 'center' }}
          >
            Sign-up with us and enjoy our services for FREE today!
          </Typography>
          <Typography
            variant='text-base'
            component='div'
            sx={{ fontWeight: 400, textAlign: 'center' }}
          >
            Hurry! Register your company today, to be first in line for when our product<br />hits the ground, and enjoy our solution completely FREE!
          </Typography>

          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant='contained'
              color='primary'
              LinkComponent={Link}
              href='/register'
              sx={{
                textTransform: 'none',
                marginTop: '40px',
                width: {xs: '100%', md: 'auto'}
              }}
            >
              Try for free
            </Button>
          </Box>
        </Box>
      </WrapperContainer>

      <WrapperContainerSpotlight sx={{ justifyContent: {xs: 'start', md: 'space-between'}, flexDirection: {xs: 'column', md: 'row'}, alignItems: 'flex-start' }}>
        <Box sx={{ mb: {xs: '24px', md: '0'} }}>
          <Image
            src={ImageType.KAYAROLL_LOGO}
            width={151}
            height={40}
            alt='kayaroll'
          />
        </Box>
        <Box sx={{ mb: {xs: '16px', md: '0'} }}>
          <Typography
            variant='text-sm'
            component='div'
            sx={{ mb: {xs: '8px', md: '16px'}, fontWeight: 700 }}
          >
            Product
          </Typography>
          <LinkFooter href='/'>Kayaroll</LinkFooter>
          <LinkFooter href='/'>Kayacheck</LinkFooter>
          <LinkFooter href='/'>Kayatest</LinkFooter>
        </Box>
        <Box sx={{ mb: {xs: '16px', md: '0'} }}>
          <Typography
            variant='text-sm'
            component='div'
            sx={{ mb: {xs: '8px', md: '16px'}, fontWeight: 700 }}
          >
            Solution
          </Typography>
          <LinkFooter href='/'>Software</LinkFooter>
          <LinkFooter href='/'>Pricing</LinkFooter>
        </Box>
        <Box>
          <Typography
            variant='text-sm'
            component='div'
            sx={{ mb: {xs: '8px', md: '16px'}, fontWeight: 700 }}
          >
            Company
          </Typography>
          <LinkFooter href='/'>About Kayaroll</LinkFooter>
          <LinkFooter href='/'>Career</LinkFooter>
          <LinkFooter href='/'>Contact us</LinkFooter>
          <LinkFooter href='/'>Help Center</LinkFooter>
          <LinkFooter href='/'>Privacy Policy</LinkFooter>
          <LinkFooter href='/'>Blog</LinkFooter>
        </Box>
        <Box component='div' sx={{ display: 'flex', justifyContent: 'space-between', gap: '16px', mt: {xs: '24px', md: '0'} }}>
          <Image
            src={Icons.FOOTER_WHATSAPP}
            width={32}
            height={32}
            alt='whatsapp'
          />
          <Image
            src={Icons.FOOTER_INSTAGRAM}
            width={32}
            height={32}
            alt='instagram'
          />
          <Image
            src={Icons.FOOTER_LINKEDIN}
            width={32}
            height={32}
            alt='linkedin'
          />
          <Image
            src={Icons.FOOTER_FACEBOOK}
            width={32}
            height={32}
            alt='facebook'
          />
        </Box>
      </WrapperContainerSpotlight>
    </Box>
  );
};

export default LandingComponent;