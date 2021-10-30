import compose from 'compose-function';
import { withRouter } from './with-router';
import { withThemeProvider } from './with-theme-provider';

export const withProviders = compose(withThemeProvider, withRouter);
