// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';

// project imports
import MainCard from 'components/ui-component/cards/MainCard';
import AnimateButton from 'components/ui-component/extended/AnimateButton';
import { dispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  color: yup.array().min(1, 'At least one color is required')
});

// ==============================|| FORM VALIDATION - CHECKBOX FORMIK ||============================== //

const CheckboxForms = () => {
  const formik = useFormik({
    initialValues: {
      color: []
    },
    validationSchema,
    onSubmit: () => {
      dispatch(
        openSnackbar({
          open: true,
          message: 'Checkbox - Submit Success',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    }
  });

  return (
    <MainCard title="Checkbox">
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item>
            <Checkbox value="primary" name="color" color="primary" onChange={formik.handleChange} />
          </Grid>
          <Grid item>
            <Checkbox value="secondary" name="color" color="secondary" sx={{ color: 'secondary.main' }} onChange={formik.handleChange} />
          </Grid>
          <Grid item>
            <Checkbox
              value="error"
              name="color"
              sx={{
                color: 'error.main',
                '&.Mui-checked': {
                  color: 'error.main'
                }
              }}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sx={{ pt: '0 !important' }}>
            {formik.errors.color && (
              <FormHelperText error id="standard-weight-helper-text-email-login">
                {' '}
                {formik.errors.color}{' '}
              </FormHelperText>
            )}
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end">
              <AnimateButton>
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </AnimateButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </MainCard>
  );
};

export default CheckboxForms;
