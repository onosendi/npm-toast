import bemify from 'bemify-js';

const DEFAULT_OPTIONS = {
  delay: 3000,
  dismissible: true,
  dismissText: 'dismiss',
  newestAtTop: true,
  position: 'bottom-right',
  severity: 'info',
};

const getOptions = (defaultOptions, globalOptions, overrideOptions) => ({
  ...defaultOptions,
  ...globalOptions,
  ...overrideOptions,
});

const getSeverity = (severity, options) => severity || options.severity;

const getPositions = (position) => {
  const [vpos, hpos] = position.split('-');
  return { vpos, hpos };
};

const createList = ({ position }, className) => {
  const { vpos, hpos } = getPositions(position);
  const ul = document.createElement('ul');
  ul.className = bemify(className, [`--vpos-${vpos}`, `--hpos-${hpos}`]);
  return ul;
};

const createListItem = (message, severity, className) => {
  const li = document.createElement('li');
  const text = document.createTextNode(message);
  li.className = bemify(className, ['__item', `--${severity}`]);
  li.append(text);
  return li;
};

const renderListItem = (list, listItem, options) => {
  const { newestAtTop, position } = options;
  const { vpos } = getPositions(position);
  const before = ['top', 'center'].includes(vpos) ? newestAtTop : !newestAtTop;
  if (before) {
    list.insertBefore(listItem, list.childNodes[0]);
  } else {
    list.appendChild(listItem);
  }
};

export const Toast = (globalOptions = {}) => ({
  message,
  severity: toastSeverity,
  options: overrideOptions = {},
}) => {
  const options = getOptions(DEFAULT_OPTIONS, globalOptions, overrideOptions);
  const severity = getSeverity(toastSeverity, options);

  const className = 'c-toast';

  let list = document.querySelector(`.${className}`);
  if (!list) {
    list = createList(options, className);
    document.body.appendChild(list);
  }
  const listItem = createListItem(message, severity, className);
  renderListItem(list, listItem, options);
};

export const toast = Toast();
