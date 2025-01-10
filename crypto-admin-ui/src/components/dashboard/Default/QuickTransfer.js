import React, { useState } from 'react';
import { Avatar, Box, Button, TextField, Typography, Card, CardContent, Grid, MenuItem, IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MainCard from 'components/ui-component/cards/MainCard';

const QuickTransfer = () => {
  const [first, setfirst] = useState('');
  return (
    <MainCard
      border={false}
      content={false}
      title={
        <>
          <Typography variant="h1" fontWeight="bold" gutterBottom fontSize={24}>
            Quick Transfer
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Lorem ipsum dolor sit amet, consectetur.
          </Typography>
        </>
      }
    >
      <Card sx={{ p: 0, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          {/* <Box mt={2} display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center" gap={1}>
              <IconButton sx={{ bgcolor: 'primary.light', color: 'primary.main' }}>
                <LocationOnIcon />
              </IconButton>
              <Typography variant="h5" color="primary" fontWeight="bold">
                23,511 ETH
              </Typography>
            </Box>
          </Box> */}

          <Box mt={0} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" fontWeight="medium">
              Recent Contacts
            </Typography>
            <Typography variant="body2" color="primary" fontWeight="medium" sx={{ cursor: 'pointer', textDecoration: 'underline' }}>
              View More
            </Typography>
          </Box>

          <Box display="flex" gap={2} mt={2}>
            {['Leo', 'Gianna', 'Maren', 'Erin', 'Martin', 'Louis'].map((name, index) => (
              <Box key={index} textAlign="center">
                <Avatar alt={name} src={`https://i.pravatar.cc/150?img=${index + 1}`} sx={{ width: 50, height: 50 }} />
                <Typography variant="caption" display="block" fontWeight="medium">
                  {name}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box mt={4}>
            <TextField
              select
              fullWidth
              label="Amount ETH"
              variant="outlined"
              defaultValue="8,621.22"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            >
              {['8,621.22', '10,000', '12,500', '15,000'].map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option} ETH
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Box mt={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" color="primary" sx={{ borderRadius: 3, py: 1.5, fontWeight: 'bold', fontSize: '1rem' }}>
              Send Money Now
            </Button>
          </Box>
        </CardContent>
      </Card>
    </MainCard>
  );
};

export default QuickTransfer;
