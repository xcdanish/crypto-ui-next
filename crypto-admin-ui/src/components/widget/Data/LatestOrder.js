// material-ui
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// project imports
import Chip from 'components/ui-component/extended/Chip';
import MainCard from 'components/ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// assets
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const Phone1 = '/assets/images/widget/phone-1.jpg';
const Phone2 = '/assets/images/widget/phone-2.jpg';
const Phone3 = '/assets/images/widget/phone-3.jpg';
const Phone4 = '/assets/images/widget/phone-4.jpg';

// table data
function createData(customer, cid, photo, product, quantity, date, status, statuscolor) {
  return { customer, cid, photo, product, quantity, date, status, statuscolor };
}

const rows = [
  createData('John Deo', '#81412314', Phone1, 'Moto G5', '10', '17-2-2017', 'Pending', 'warning'),
  createData('Jenny William', '#68457898', Phone2, 'iPhone 8', '16', '20-2-2017', 'Paid', 'primary'),
  createData('Lori Moore', '#45457898', Phone3, 'Redmi 4', '20', '17-2-2017', 'Success', 'success'),
  createData('Austin Pena', '#62446232', Phone4, 'Jio', '15', '25-4-2017', 'Failed', 'error')
];

// =========================|| LATEST ORDER CARD ||========================= //

export default function LatestOrder() {
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <MainCard title="Latest Order" content={false}>
          <TableContainer>
            <Table sx={{ minWidth: 350 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ pl: 3 }}>Customer</TableCell>
                  <TableCell>Order Id</TableCell>
                  <TableCell>Photo</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center" sx={{ pr: 3 }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow hover key={index}>
                    <TableCell sx={{ pl: 3 }}>{row.customer}</TableCell>
                    <TableCell>{row.cid}</TableCell>
                    <TableCell>
                      <CardMedia component="img" image={row.photo} title="image" sx={{ width: 20, height: 'auto' }} />
                    </TableCell>
                    <TableCell>{row.product}</TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="center">{row.date}</TableCell>
                    <TableCell align="center">
                      <Chip chipcolor={row.statuscolor} label={row.status} size="small" />
                    </TableCell>
                    <TableCell align="center" sx={{ pr: 3 }}>
                      <Stack direction="row" justifyContent="center" alignItems="center">
                        <IconButton color="primary" size="large" aria-label="edit">
                          <EditOutlinedIcon />
                        </IconButton>
                        <IconButton color="inherit" size="large" aria-label="delete">
                          <DeleteOutlineOutlinedIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button variant="text" size="small">
              View all Orders
            </Button>
          </CardActions>
        </MainCard>
      </Grid>
    </Grid>
  );
}
