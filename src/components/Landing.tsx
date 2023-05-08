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
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import Link from 'next/link';
import { Image as ImageType, Icons } from '@/utils/assetsConstant';

const WrapperContainer = styled(Box)<BoxProps>(() => ({
  background: 'white',
  padding: '80px 135px',
  display: 'flex',
  alignItems: 'center',
}));

const WrapperContainerSpotlight = styled(Box)<BoxProps>(() => ({
  background: '#F9FAFB',
  padding: '80px 135px',
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
  marginBottom: '8px'
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
          <Image
            src={ImageType.KAYAROLL_LOGO}
            width={151}
            height={40}
            alt='kayaroll'
            style={{ marginRight: '80px' }}
          />
          <LinkMenu href='/'>About Us</LinkMenu>
          <LinkMenu href='/'>Solution</LinkMenu>
          <LinkMenu href='/'>Resource</LinkMenu>
          <LinkMenu href='/'>Subscription</LinkMenu>
          <LinkMenu href='/'>Partnership</LinkMenu>
        </Box>
        <Box sx={{ display: { sm: 'block', md: 'none' } }}>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: { sm: 'none', md: 'block' } }}>
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

const LandingComponent = () => {
  return (
    <Box component='div' sx={{ marginTop: '100px' }}>
      <Navbar />

      <WrapperContainer sx={{ justifyContent: 'space-between' }}>
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
              marginTop: '40px'
            }}
          >
            Get a Demo, Try Us!
          </Button>
        </Box>
        <Box component='div'>
          <Image
            src={ImageType.PREVIEW_DASHBOARD}
            alt='preview'
            height={320}
            width={476}
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
          <Box component='div' sx={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
            <Image
              src={ImageType.SAMSUNG}
              alt='samsung'
              height={64}
              width={80}
            />
            <Image
              src={ImageType.GOJEK}
              alt='samsung'
              height={64}
              width={80}
            />
            <Image
              src={ImageType.APPLE}
              alt='samsung'
              height={64}
              width={80}
            />
            <Image
              src={ImageType.SLACK}
              alt='samsung'
              height={64}
              width={80}
            />
            <Image
              src={ImageType.TOKOPEDIA}
              alt='samsung'
              height={64}
              width={80}
            />
            <Image
              src={ImageType.MSGLOW}
              alt='samsung'
              height={64}
              width={80}
            />
            <Image
              src={ImageType.MYDOCTORS}
              alt='samsung'
              height={64}
              width={80}
            />
          </Box>
          <Box component='div' sx={{ display: 'flex', justifyContent: 'space-around', alignContent: 'center' }}>
            <Image
              src={ImageType.UDEMY}
              alt='samsung'
              height={64}
              width={80}
            />
            <Image
              src={ImageType.COURSERA}
              alt='samsung'
              height={64}
              width={80}
            />
            <Image
              src={ImageType.RUANGGURU}
              alt='samsung'
              height={64}
              width={80}
            />
            <Image
              src={ImageType.SCHOTERS}
              alt='samsung'
              height={64}
              width={80}
            />
            <Image
              src={ImageType.ADIDAS}
              alt='samsung'
              height={64}
              width={80}
            />
            <Image
              src={ImageType.BASSETT}
              alt='samsung'
              height={64}
              width={80}
            />
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
                width: 377,
                padding: '24px',
                textAlign: 'center'
              },
            }}
          >
            <Paper elevation={0}>
              <Image
                src={Icons.ABOUT_1}
                alt='about1'
                height={80}
                width={80}
              />
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
            </Paper>
            <Paper elevation={0}>
              <Image
                src={Icons.ABOUT_2}
                alt='about2'
                height={80}
                width={80}
              />
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
            </Paper>
            <Paper elevation={0}>
              <Image
                src={Icons.ABOUT_3}
                alt='about3'
                height={80}
                width={80}
              />
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
            </Paper>
          </Box>
        </Box>
      </WrapperContainerSpotlight>

      <WrapperContainer sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ width: '50%' }}>
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
        <Box>
          <Image
            src={ImageType.LANDING_1}
            width={410}
            height={275}
            alt='landing1'
          />
        </Box>
      </WrapperContainer>

      <WrapperContainer sx={{ justifyContent: 'space-between' }}>
        <Box>
          <Image
            src={ImageType.LANDING_2}
            width={410}
            height={275}
            alt='landing2'
          />
        </Box>
        <Box sx={{ width: '50%' }}>
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
        <Box sx={{ width: '50%' }}>
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
        <Box>
          <Image
            src={ImageType.LANDING_3}
            width={410}
            height={275}
            alt='landing3'
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
                width: 377,
                padding: '24px',
                textAlign: 'center'
              },
            }}
          >
            <Paper elevation={0}>
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
            <Paper elevation={0}>
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
            <Paper elevation={0}>
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

      <WrapperContainer sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ width: '40%' }}>
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
        <Box sx={{ width: '50%' }}>
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
                marginTop: '40px'
              }}
            >
              Try for free
            </Button>
          </Box>
        </Box>
      </WrapperContainer>

      <WrapperContainerSpotlight sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Image
            src={ImageType.KAYAROLL_LOGO}
            width={151}
            height={40}
            alt='kayaroll'
          />
        </Box>
        <Box>
          <Typography
            variant='text-sm'
            component='div'
            sx={{ marginBottom: '16px', fontWeight: 700 }}
          >
            Product
          </Typography>
          <LinkFooter href='/'>Kayaroll</LinkFooter>
          <LinkFooter href='/'>Kayacheck</LinkFooter>
          <LinkFooter href='/'>Kayatest</LinkFooter>
        </Box>
        <Box>
          <Typography
            variant='text-sm'
            component='div'
            sx={{ marginBottom: '16px', fontWeight: 700 }}
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
            sx={{ marginBottom: '16px', fontWeight: 700 }}
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
        <Box component='div' sx={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
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