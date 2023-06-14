import {
  AppBar,
  Box,
  BoxProps,
  IconButton,
  Typography,
  Toolbar,
  styled,
  Grid,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { Image as ImageType, Icons } from "@/utils/assetsConstant";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import Link from "next/link";

const WrapperContainer = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    padding: "80px 135px",
  },
  [theme.breakpoints.only("md")]: {
    padding: "80px 45px",
  },
  [theme.breakpoints.down("md")]: {
    padding: "40px 24px",
  },
  background: "white",
  display: "flex",
  alignItems: "center",
}));

const WrapperContainerSpotlight = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    padding: "80px 135px",
  },
  [theme.breakpoints.only("md")]: {
    padding: "80px 45px",
  },
  [theme.breakpoints.down("md")]: {
    padding: "40px 24px",
  },
  background: "#F9FAFB",
  display: "flex",
  alignItems: "center",
}));

const WrapperTopBarContent = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
  justifyContent: "space-between",
  margin: "0 70px",
  height: "36px",
  alignItems: "center",
}));

const WrapperNavbarContent = styled(Toolbar)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    margin: "0 70px",
    padding: "12px 0",
  },
  [theme.breakpoints.down("md")]: {
    margin: "0 24px",
    padding: "16px 0",
  },
  display: "flex",
  justifyContent: "space-between",
}));

const LinkTopBar = styled(Link)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
  color: theme.palette.primary.main,
  textDecoration: "none",
  fontSize: 16,
  fontWeight: 500,
  padding: "8px 10px",
}));

const LinkMenu = styled(Link)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
  color: theme.palette.primary.main,
  textDecoration: "none",
  fontSize: 16,
  fontWeight: 500,
  padding: "8px 16px",
}));

const LinkFooter = styled(Link)(() => ({
  display: "block",
  color: "#4B5563",
  textDecoration: "none",
  fontWeight: 400,
  fontSize: 14,
  mb: "8px",
}));

const Topbar = () => {
  return (
    <WrapperTopBarContent>
      <LinkTopBar href="/">ID | EN</LinkTopBar>
      <LinkTopBar href="/">Contact Support</LinkTopBar>
    </WrapperTopBarContent>
  );
};

const Navbar = () => {
  return (
    <AppBar
      component="nav"
      sx={{
        background: "#FFFFFF",
        color: "primary.main",
        filter: "drop-shadow(0px 6px 20px rgba(0, 0, 0, 0.05))",
        boxShadow: "none",
      }}
    >
      <Topbar />
      <WrapperNavbarContent disableGutters>
        <Box sx={{ display: "flex" }}>
          <Image
            src={ImageType.KAYAROLL_LOGO}
            alt="logo"
            width={151}
            height={40}
            style={{ marginRight: "80px" }}
          />
          <LinkMenu href="/">About Us</LinkMenu>
          <LinkMenu href="/">Solution</LinkMenu>
          <LinkMenu href="/">Resource</LinkMenu>
          <LinkMenu href="/">Subscription</LinkMenu>
          <LinkMenu href="/">Partnership</LinkMenu>
        </Box>
        <Box sx={{ display: { sm: "block", md: "none" } }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Button
            variant="outlined"
            color="primary"
            sx={{ marginRight: "16px", textTransform: "none" }}
          >
            Login
          </Button>
          <Button variant="contained" color="primary">
            Sign Up for free
          </Button>
        </Box>
      </WrapperNavbarContent>
    </AppBar>
  );
};

export default function CloneDashboard() {
  return (
    <>
      <Box component="div" sx={{ marginTop: "100px" }}>
        <Navbar />

        <WrapperContainer sx={{ justifyContent: "space-between" }}>
          <Box component="div">
            <Typography
              variant="text-5xl"
              component="div"
              color="primary.main"
              sx={{ fontWeight: 700 }}
            >
              The Smoother The Better.
            </Typography>

            <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
              <Image
                src={Icons.CHECK_CIRCLE}
                alt="preview"
                height={20}
                width={20}
              />
              <Typography variant="text-lg" sx={{ marginLeft: "8px" }}>
                EASY TO USE
              </Typography>
            </Box>
            <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
              <Image
                src={Icons.CHECK_CIRCLE}
                alt="preview"
                height={20}
                width={20}
              />
              <Typography variant="text-lg" sx={{ marginLeft: "8px" }}>
                SAVE TIME
              </Typography>
            </Box>
            <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
              <Image
                src={Icons.CHECK_CIRCLE}
                alt="preview"
                height={20}
                width={20}
              />
              <Typography variant="text-lg" sx={{ marginLeft: "8px" }}>
                FREE UP TO 50 EMPLOYEES
              </Typography>
            </Box>

            <Button
              variant="contained"
              sx={{ marginTop: "40px", width: { xs: "100%", md: "auto" } }}
            >
              Get a Free Demo
            </Button>
          </Box>

          <Box component="div">
            <Image
              src={ImageType.PREVIEW_DASHBOARD}
              alt="preview"
              height={320}
              width={476}
            />
          </Box>
        </WrapperContainer>

        <WrapperContainer sx={{ justifyContent: "center" }}>
          <Box component="div" sx={{ width: "100%" }}>
            <Typography
              variant="text-4xl"
              component="div"
              sx={{
                marginBottom: "24px",
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              We’ve helped 100+ SMEs and Startups
            </Typography>

            <Box
              component="div"
              sx={{
                marginBottom: "40px",
                display: "flex",
                justifyContent: "space-between",
                alignContent: "center",
              }}
            >
              <Image
                src={ImageType.SAMSUNG}
                alt="samsung"
                height={64}
                width={80}
              />
              <Image src={ImageType.GOJEK} alt="gojek" height={64} width={80} />
              <Image src={ImageType.APPLE} alt="apple" height={64} width={80} />
              <Image src={ImageType.SLACK} alt="slack" height={64} width={80} />
              <Image
                src={ImageType.TOKOPEDIA}
                alt="tokopedia"
                height={64}
                width={80}
              />
              <Image
                src={ImageType.MSGLOW}
                alt="msglow"
                height={64}
                width={80}
              />
              <Image
                src={ImageType.MYDOCTORS}
                alt="mydoctors"
                height={64}
                width={80}
              />
            </Box>
            <Box
              component="div"
              sx={{
                marginBottom: "40px",
                display: "flex",
                justifyContent: "space-evenly",
                alignContent: "center",
              }}
            >
              <Image src={ImageType.UDEMY} alt="udemy" height={64} width={80} />
              <Image
                src={ImageType.COURSERA}
                alt="coursera"
                height={64}
                width={80}
              />
              <Image
                src={ImageType.RUANGGURU}
                alt="ruangguru"
                height={64}
                width={80}
              />
              <Image
                src={ImageType.SCHOTERS}
                alt="schoters"
                height={64}
                width={80}
              />
              <Image
                src={ImageType.ADIDAS}
                alt="adidas"
                height={64}
                width={80}
              />
              <Image
                src={ImageType.BASSETT}
                alt="basset"
                height={64}
                width={80}
              />
            </Box>
          </Box>
        </WrapperContainer>

        <WrapperContainerSpotlight sx={{ justifyContent: "center" }}>
          <Box
            component="div"
            sx={{ display: "flex", flexDirection: "column", width: "100%" }}
          >
            <Typography
              variant="text-4xl"
              component="div"
              sx={{ fontWeight: 700, textAlign: "center" }}
            >
              About Kayaroll
            </Typography>
            <Typography
              variant="text-base"
              sx={{
                marginBottom: "24px",
                fontWeight: 400,
                textAlign: "center",
              }}
            >
              A friend to SMEs and Start‑ups,
              <br />
              We’re here to help you keep payroll processes simple, smooth and
              secure,
              <br />
              So that you can focus on what’s important!
            </Typography>

            <Grid container spacing={1}>
              <Grid item xs={12} md={4} lg={4} xl={4}>
                <Paper
                  sx={{
                    padding: "36px 24px",
                    display: "flex",
                    flexDirection: { xs: "row", md: "column" },
                    justifyContent: "flex-start",
                    textAlign: "center",
                    height: "100%",
                    alignItems: "center",
                  }}
                  elevation={0}
                >
                  <Image
                    src={Icons.ABOUT_1}
                    alt="about1"
                    width={80}
                    height={80}
                  />
                  <Box
                    sx={{ marginTop: { xs: "0px", md: "16px" }, width: "100%" }}
                  >
                    <Typography
                      component="div"
                      variant="text-lg"
                      sx={{ fontWeight: 700 }}
                    >
                      Found in 2020
                    </Typography>
                    <Typography
                      variant="text-base"
                      component="div"
                      sx={{ fontWeight: 400 }}
                    >
                      We’re here to offer
                      <br />A Fresh Approach
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={4} xl={4}>
                <Paper
                  sx={{
                    padding: "36px 24px",
                    display: "flex",
                    flexDirection: { xs: "row", md: "column" },
                    justifyContent: "flex-start",
                    textAlign: "center",
                    height: "100%",
                    alignItems: "center",
                  }}
                  elevation={0}
                >
                  <Image
                    src={Icons.ABOUT_2}
                    alt="about2"
                    width={80}
                    height={80}
                  />
                  <Box
                    sx={{ marginTop: { xs: "0px", md: "16px" }, width: "100%" }}
                  >
                    <Typography
                      component="div"
                      variant="text-lg"
                      sx={{ fontWeight: 700 }}
                    >
                      Singaporean Company
                    </Typography>
                    <Typography
                      variant="text-base"
                      component="div"
                      sx={{ fontWeight: 400 }}
                    >
                      Fully Homegrown
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={4} xl={4}>
                <Paper
                  sx={{
                    padding: "36px 24px",
                    display: "flex",
                    flexDirection: { xs: "row", md: "column" },
                    justifyContent: "flex-start",
                    textAlign: "center",
                    height: "100%",
                    alignItems: "center",
                  }}
                  elevation={0}
                >
                  <Image
                    src={Icons.ABOUT_3}
                    alt="about3"
                    width={80}
                    height={80}
                  />
                  <Box
                    sx={{ marginTop: { xs: "0px", md: "16px" }, width: "100%" }}
                  >
                    <Typography
                      component="div"
                      variant="text-lg"
                      sx={{ fontWeight: 700 }}
                    >
                      SMEs Friendly
                    </Typography>
                    <Typography
                      variant="text-base"
                      component="div"
                      sx={{ fontWeight: 400 }}
                    >
                      SME Friendly. We’re focused on <br /> Empowering SMEs and
                      Start-ups
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </WrapperContainerSpotlight>

        <WrapperContainer sx={{ justifyContent: "space-between" }}>
          <Box component="div" sx={{ width: { xs: "70%", md: "50%" } }}>
            <Typography
              variant="text-4xl"
              component="div"
              sx={{ fontWeight: 700 }}
            >
              Save Your Money
            </Typography>
            <Typography
              variant="text-base"
              component="div"
              sx={{ fontWeight: 400 }}
            >
              Time-consuming payroll calculations and processes <br />
              that take up critical resources.
            </Typography>
          </Box>
          <Box
            component="div"
            sx={{
              position: "relative",
              width: { xs: "30%", md: "50%" },
              height: { xs: "90px", md: "275px" },
            }}
          >
            <Image
              src={ImageType.LANDING_1}
              alt="landing1"
              fill
              sizes="(max-width: 1130px) 100%, 410px"
              style={{ objectFit: "contain" }}
            />
          </Box>
        </WrapperContainer>

        <WrapperContainer sx={{ justifyContent: "space-between" }}>
          <Box
            component="div"
            sx={{
              position: "relative",
              width: { xs: "30%", md: "50%" },
              height: { xs: "90px", md: "275px" },
            }}
          >
            <Image
              src={ImageType.LANDING_2}
              alt="landing2"
              fill
              sizes="(max-width: 1130px) 100%, 410px"
              style={{ objectFit: "contain" }}
            />
          </Box>
          <Box component="div" sx={{ width: { xs: "70%", md: "50%" } }}>
            <Typography
              variant="text-4xl"
              component="div"
              sx={{ fontWeight: 700 }}
            >
              Save Your Time
            </Typography>
            <Typography
              variant="text-base"
              component="div"
              sx={{ fontWeight: 400 }}
            >
              To any business, time is money. Digitalize to rid yourself of
              tedious paperwork
              <br />
              and improve efficiency.
            </Typography>
          </Box>
        </WrapperContainer>

        <WrapperContainer sx={{ justifyContent: "space-between" }}>
          <Box component="div" sx={{ width: { xs: "70%", md: "50%" } }}>
            <Typography
              variant="text-4xl"
              component="div"
              sx={{ fontWeight: 700 }}
            >
              Stay Compliant
            </Typography>
            <Typography
              variant="text-base"
              component="div"
              sx={{ fontWeight: 400 }}
            >
              Our systems are well attuned to government reporting requirements.
            </Typography>
          </Box>
          <Box
            component="div"
            sx={{
              position: "relative",
              width: { xs: "30%", md: "50%" },
              height: { xs: "90px", md: "275px" },
            }}
          >
            <Image
              src={ImageType.LANDING_3}
              alt="landing3"
              fill
              sizes="(max-width: 1130px) 100%, 410px"
              style={{ objectFit: "contain" }}
            />
          </Box>
        </WrapperContainer>

        <WrapperContainerSpotlight sx={{ justifyContent: "center" }}>
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Typography
              variant="text-4xl"
              component="div"
              sx={{
                marginBottom: "24px",
                textAlign: "center",
                fontWeight: 700,
              }}
            >
              Why choose Kayaroll?
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={12} md={4} lg={4} xl={4}>
                <Paper
                  sx={{
                    padding: "36px 24px",
                    display: "flex",
                    flexDirection: { xs: "row", md: "column" },
                    justifyContent: "flex-start",
                    textAlign: "center",
                    height: "100%",
                    alignItems: "center",
                  }}
                  elevation={0}
                >
                  <Image src={Icons.WHY_1} alt="why1" width={80} height={80} />
                  <Box
                    sx={{ marginTop: { xs: "0px", md: "16px" }, width: "100%" }}
                  >
                    <Typography
                      component="div"
                      variant="text-lg"
                      sx={{ fontWeight: 700 }}
                    >
                      Simple and Intuitive User Interface
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={4} xl={4}>
                <Paper
                  sx={{
                    padding: "36px 24px",
                    display: "flex",
                    flexDirection: { xs: "row", md: "column" },
                    justifyContent: "flex-start",
                    textAlign: "center",
                    height: "100%",
                    alignItems: "center",
                  }}
                  elevation={0}
                >
                  <Image src={Icons.WHY_2} alt="why2" width={80} height={80} />
                  <Box
                    sx={{ marginTop: { xs: "0px", md: "16px" }, width: "100%" }}
                  >
                    <Typography
                      component="div"
                      variant="text-lg"
                      sx={{ fontWeight: 700 }}
                    >
                      RAS Integrated and Compliant
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={4} xl={4}>
                <Paper
                  sx={{
                    padding: "36px 24px",
                    display: "flex",
                    flexDirection: { xs: "row", md: "column" },
                    justifyContent: "flex-start",
                    textAlign: "center",
                    height: "100%",
                    alignItems: "center",
                  }}
                  elevation={0}
                >
                  <Image src={Icons.WHY_3} alt="why3" width={80} height={80} />
                  <Box
                    sx={{ marginTop: { xs: "0px", md: "16px" }, width: "100%" }}
                  >
                    <Typography
                      component="div"
                      variant="text-lg"
                      sx={{ fontWeight: 700 }}
                    >
                      Excellent Customer Support
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </WrapperContainerSpotlight>

        <WrapperContainer
          sx={{
            justifyContent: { xs: "center", md: "space-between" },
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box sx={{ width: { xs: "100%", md: "40%" } }}>
            <Typography
              variant="text-4xl"
              component="div"
              sx={{ marginBottom: "16px", fontWeight: 700 }}
            >
              Frequently asked questions
            </Typography>
            <Typography
              variant="text-base"
              component="div"
              sx={{ fontWeight: 400 }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum Blandit risus vitae viverra porta. Nam ullamcorper est
              ac fermentum condimentum.
            </Typography>
          </Box>
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              mt: { xs: "10px", md: "0" },
            }}
          >
            <Accordion>
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>What is kayaroll?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>How to try Kayaroll?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography>Do we need to pay use kayaroll?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                aria-controls="panel4a-content"
                id="panel4a-header"
              >
                <Typography>Is kayaroll software secure?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </WrapperContainer>

        <WrapperContainer sx={{ justifyContent: "center" }}>
          <Box component="div">
            <Box sx={{ textAlign: "center" }}>
              <Image
                src={ImageType.KAYAROLL_MINI}
                width={64}
                height={64}
                alt="kayaroll"
              />
            </Box>
            <Typography
              variant="text-4xl"
              component="div"
              sx={{ fontWeight: 700, textAlign: "center" }}
            >
              Sign-up with us and enjoy our services for FREE today!
            </Typography>
            <Typography
              variant="text-base"
              component="div"
              sx={{ fontWeight: 400, textAlign: "center" }}
            >
              Hurry! Register your company today, to be first in line for when
              our product <br />
              hits the ground, and enjoy our solution completely FREE!
            </Typography>
            <Box sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                LinkComponent={Link}
                href="/register"
                sx={{
                  textTransform: "none",
                  marginTop: "40px",
                  width: { xs: "100%", md: "auto" },
                }}
              >
                Try for free
              </Button>
            </Box>
          </Box>
        </WrapperContainer>

        <WrapperContainerSpotlight
          sx={{ justifyContent: "space-between", alignItems: "start" }}
        >
          <Box sx={{ mb: { xs: "24px", md: "0" } }}>
            <Image
              src={ImageType.KAYAROLL_LOGO}
              width={151}
              height={40}
              alt="kayaroll"
            />
          </Box>
          <Box sx={{ mb: { xs: "16px", md: "0" } }}>
            <Typography
              variant="text-sm"
              component="div"
              sx={{ mb: { xs: "8px", md: "16px" }, fontWeight: 700 }}
            >
              Product
            </Typography>
            <LinkFooter href="/">Kayaroll</LinkFooter>
            <LinkFooter href="/">Kayacheck</LinkFooter>
            <LinkFooter href="/">Kayatest</LinkFooter>
          </Box>
          <Box sx={{ mb: { xs: "16px", md: "0" } }}>
            <Typography
              variant="text-sm"
              component="div"
              sx={{ mb: { xs: "8px", md: "16px" }, fontWeight: 700 }}
            >
              Solution
            </Typography>
            <LinkFooter href="/">Software</LinkFooter>
            <LinkFooter href="/">Pricing</LinkFooter>
          </Box>
          <Box>
            <Typography
              variant="text-sm"
              component="div"
              sx={{ mb: { xs: "8px", md: "16px" }, fontWeight: 700 }}
            >
              Company
            </Typography>
            <LinkFooter href="/">About Kayaroll</LinkFooter>
            <LinkFooter href="/">Career</LinkFooter>
            <LinkFooter href="/">Contact us</LinkFooter>
            <LinkFooter href="/">Help Center</LinkFooter>
            <LinkFooter href="/">Privacy Policy</LinkFooter>
            <LinkFooter href="/">Blog</LinkFooter>
          </Box>
          <Box
            component="div"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "16px",
              mt: { xs: "24px", md: "0" },
            }}
          >
            <Image
              src={Icons.FOOTER_WHATSAPP}
              width={32}
              height={32}
              alt="whatsapp"
            />
            <Image
              src={Icons.FOOTER_INSTAGRAM}
              width={32}
              height={32}
              alt="instagram"
            />
            <Image
              src={Icons.FOOTER_LINKEDIN}
              width={32}
              height={32}
              alt="linkedin"
            />
            <Image
              src={Icons.FOOTER_FACEBOOK}
              width={32}
              height={32}
              alt="facebook"
            />
          </Box>
        </WrapperContainerSpotlight>
      </Box>
    </>
  );
}
