import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Controller, useForm } from 'react-hook-form/';
import { UserForLogin } from '../api/account/login';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/actions/auth';
import CombinedStore from '../store/CombinedStore';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector<CombinedStore, boolean>(
    (s) => s.auth.isAuthenticated
  );

  const isAuthenticating = useSelector<CombinedStore, boolean>(
    (s) => s.auth.isAuthenticating
  );

  const authErrors = useSelector<CombinedStore, boolean>(
    (s) => s.auth.errors
  );

  const { control, handleSubmit, errors } = useForm<UserForLogin>();

  const onSubmit = (data: UserForLogin) => {
    if (isAuthenticating) {
      return;
    }

    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
    
  }, [isAuthenticated, history])

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="username"
            defaultValue={''}
            rules={{
              required: true,
            }}
            errors={errors}
            render={({ ref, value, onChange, onBlur }) => (
              <TextField
                inputRef={ref}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                error={errors.username !== undefined}
                helperText={errors.username && 'Please provide a valid username'}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="text"
                label="Username"
                autoFocus
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            defaultValue={''}
            rules={{
              required: true
            }}
            errors={errors}
            render={({ ref, value, onChange, onBlur }) => (
              <TextField
                inputRef={ref}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                error={errors.password !== undefined}
                helperText={
                  errors.password && 'Please provide a valid password'
                }
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                autoComplete="current-password"
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
          { authErrors && <FormHelperText error>Sorry something went wrong</FormHelperText> }
        </form>
      </div>
    </Container>
  );
}