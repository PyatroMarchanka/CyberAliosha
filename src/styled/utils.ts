import { theme } from './../utils/theme';
export const isMobile = () => {
  if (!window || !window.matchMedia) {
  }

  const mediaQueryList = window.matchMedia(theme.breakpoints.belowMobile);

  if (mediaQueryList.matches) {
    return true;
  }

  return false;
};

export const isTablet = () => {
  if (!window || !window.matchMedia) {
  }

  const lessTabletQueryList = window.matchMedia(theme.breakpoints.belowTabletM);
  const aboveMobileQueryList = window.matchMedia(`(min-width: 601px)`);

  if (lessTabletQueryList.matches && aboveMobileQueryList.matches) {
    return true;
  }

  return false;
};

export const isSmallLaptop = () => {
  if (!window || !window.matchMedia) {
  }

  const lessTabletQueryList = window.matchMedia(theme.breakpoints.belowLaptopL);
  const aboveMobileQueryList = window.matchMedia(`(min-width: 926px)`);

  if (lessTabletQueryList.matches && aboveMobileQueryList.matches) {
    return true;
  }

  return false;
};

export const getDevice = () => {
  if (isMobile()) {
    return 'mobile';
  }

  if (isTablet()) {
    return 'tablet';
  }

  if (isSmallLaptop()) {
    return 'smallLaptop';
  }

  return 'desktop';
};
