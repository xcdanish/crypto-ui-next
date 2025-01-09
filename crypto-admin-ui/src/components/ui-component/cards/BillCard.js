import PropTypes from 'prop-types';
import Link from 'next/link';

// material-ui
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// assets
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';

// ==============================|| BILL CARD ||============================== //

const BillCard = ({ primary, secondary, link, color, bg }) => (
  <Card sx={{ borderLeft: '10px solid', borderColor: color, bgcolor: bg }}>
    <CardContent>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Typography variant="body1" sx={{ color: 'grey.800' }}>
            {primary}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h2" sx={{ fontWeight: 500, mb: 1.5, color: 'grey.800' }}>
            {secondary}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="text"
            disableElevation
            disableRipple
            component={Link}
            href="#"
            sx={{
              color,
              p: 0,
              '&:hover': { bgcolor: 'transparent' }
            }}
            endIcon={<ArrowRightAltRoundedIcon />}
          >
            {link}
          </Button>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

BillCard.propTypes = {
  primary: PropTypes.string,
  secondary: PropTypes.string,
  link: PropTypes.string,
  color: PropTypes.string,
  bg: PropTypes.string
};

export default BillCard;
