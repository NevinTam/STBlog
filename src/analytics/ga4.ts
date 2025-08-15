
import ReactGA from 'react-ga4';

const GA_MEASUREMENT_ID = 'G-L0KCEMVECM';

export const initializeGA = () => {
  ReactGA.initialize(GA_MEASUREMENT_ID);
};

export const logPageView = (asPath: any) => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
};

export const logEvent = (category: string, action: string, label?: string) => {
  ReactGA.event({ category, action, label });
};
