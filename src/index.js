import './styles.scss';

const DEFAULT_OPTIONS = {
  delay: 3000,
  dismissible: true,
  dismissText: 'dismiss',
  position: 'top-center',
  severity: 'info',
  useDelay: true,
};

const getOptions = (defaultOptions, globalOptions, overrideOptions) => ({
  ...defaultOptions,
  ...globalOptions,
  ...overrideOptions,
});

const getSeverity = (severity, options) => severity || options.severity;

export const Toast = (globalOptions = {}) => ({
  message,
  severity: toastSeverity,
  options: overrideOptions = {},
}) => {
  const options = getOptions(DEFAULT_OPTIONS, globalOptions, overrideOptions);
  const severity = getSeverity(toastSeverity, options);

  console.log(message, severity);
};

export const toast = Toast();
