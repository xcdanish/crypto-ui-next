import PropTypes from 'prop-types';

// material-ui
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'components/ui-component/cards/MainCard';
import SkeletonPopularCard from 'components/ui-component/cards/Skeleton/PopularCard';

// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

// ==============================|| CLIENT INSIGHT ||============================== //

const ClientInsights = ({ isLoading }) => {
  const clientData = [
    { name: 'Agilulf Fuxg', percentage: '10', status: 'Loss', amount: '5678.09' },
    { name: 'Adaline Bergfalks', percentage: '10', status: 'Profit', amount: '5678.09' },
    { name: 'Hazle', percentage: '10', status: 'Loss', amount: '5678.09' },
    { name: 'Herman Essertg', percentage: '10', status: 'Loss', amount: '5678.09' },
    { name: 'Adaline Bergfalks', percentage: '10', status: 'Profit', amount: '5678.09' },
    { name: 'Wilhelmine Durrg', percentage: '10', status: 'Profit', amount: '5678.09' }
  ];

  if (isLoading) <SkeletonPopularCard />;

  return (
    <MainCard content={false}>
      <CardContent sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container alignContent="center" justifyContent="space-between">
              <Typography variant="h4">Client Insights</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TableContainer>
              <Table>
                <TableBody>
                  {clientData.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ px: 0, py: 1 }}>
                        <Stack spacing={0.5} sx={{ minWidth: 120 }}>
                          <Typography variant="h5">{data.name}</Typography>
                          <Typography variant="subtitle2" color={data.status === 'Loss' ? 'orange.dark' : 'success.dark'}>
                            {data.percentage}% {data.status}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h5">£{data.amount}</Typography>
                      </TableCell>
                      <TableCell sx={{ px: 0, py: 1 }} align="right">
                        <Button variant="text" sx={{ fontSize: '0.75rem' }}>
                          History
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ pb: 1.75, pt: 0, justifyContent: 'center' }}>
        <Button size="small" disableElevation endIcon={<ChevronRightOutlinedIcon />}>
          View All
        </Button>
      </CardActions>
    </MainCard>
  );
};

ClientInsights.propTypes = {
  isLoading: PropTypes.bool
};

export default ClientInsights;
