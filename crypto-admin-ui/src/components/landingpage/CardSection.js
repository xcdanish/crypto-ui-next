// material-ui
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// project imports
import FadeInWhenVisible from './Animation';
import SubCard from 'components/ui-component/cards/SubCard';
import Avatar from 'components/ui-component/extended/Avatar';
import { ThemeMode } from 'config';

// assets
import GridViewIcon from '@mui/icons-material/GridView';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import WebOutlinedIcon from '@mui/icons-material/WebOutlined';

// =============================|| LANDING - CARD SECTION ||============================= //

const CardSection = () => {
  const theme = useTheme();

  const cardSX = {
    overflow: 'hidden',
    position: 'relative',
    border: 'none',
    '&:after': {
      content: '""',
      position: 'absolute',
      width: 150,
      height: 150,
      border: '35px solid',
      borderColor: 'background.paper',
      opacity: theme.palette.mode === ThemeMode.DARK ? 0.1 : 0.4,
      borderRadius: '50%',
      top: -72,
      right: -63
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      width: 150,
      height: 150,
      border: '2px solid',
      borderColor: 'background.paper',
      opacity: theme.palette.mode === ThemeMode.DARK ? 0.05 : 0.21,
      borderRadius: '50%',
      top: -97,
      right: -3
    },
    '& .MuiCardContent-root': {
      padding: '20px 38px 20px 30px'
    }
  };

  const landingCards = [
    {
      title: 'Components',
      count: '150+',
      icon: <GridViewIcon sx={{ fontSize: '2.25rem', transform: 'rotate(45deg)' }} />,
      bgcolor: 'warning.main',
      color: 'warning.dark'
    },
    {
      title: 'Application',
      count: '8+',
      icon: <WidgetsOutlinedIcon sx={{ fontSize: '2.25rem' }} />,
      bgcolor: 'primary.200',
      color: 'primary.main'
    },
    {
      title: 'Pages',
      count: '100+',
      icon: <WebOutlinedIcon sx={{ fontSize: '2.25rem' }} />,
      bgcolor: 'secondary.200',
      color: 'secondary.main'
    }
  ];

  return (
    <Container>
      <Grid container justifyContent="center" spacing={{ xs: 3, sm: 5 }} sx={{ textAlign: 'center' }}>
        {landingCards.map((card, index) => (
          <Grid item md={4} sm={6} xs={12} key={index}>
            <FadeInWhenVisible>
              <SubCard sx={{ bgcolor: card.bgcolor, ...cardSX }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Avatar
                    variant="rounded"
                    sx={{
                      bgcolor: 'background.paper',
                      opacity: theme.palette.mode === ThemeMode.DARK ? 1 : 0.5,
                      color: card.color,
                      height: 60,
                      width: 60,
                      borderRadius: '12px'
                    }}
                  >
                    {card.icon}
                  </Avatar>
                  <Stack alignItems="flex-end">
                    <Typography
                      variant="h1"
                      sx={{
                        fontWeight: 800,
                        fontSize: '2.5rem',
                        zIndex: '99',
                        color: theme.palette.mode === ThemeMode.DARK ? 'dark.900' : 'grey.900'
                      }}
                    >
                      {card.count}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 500,
                        fontSize: '1.120rem',
                        textAlign: 'end',
                        color: theme.palette.mode === ThemeMode.DARK ? 'dark.900' : 'grey.900'
                      }}
                    >
                      {card.title}
                    </Typography>
                  </Stack>
                </Stack>
              </SubCard>
            </FadeInWhenVisible>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CardSection;
