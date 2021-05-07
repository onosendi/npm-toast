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

const removeListItem = (list, listItem) => {
  listItem.remove();
  const listItems = list.querySelector('li');
  if (!listItems) {
    list.remove();
  }
};

const createList = (options, className) => {
  let ul = document.querySelector(`.${className}`);
  if (!ul) {
    ul = document.createElement('ul');
    const { vpos, hpos } = getPositions(options.position);
    ul.className = bemify(className, [`--vpos-${vpos}`, `--hpos-${hpos}`]);
  }
  return ul;
};

const createListItem = (message, severity, list, options, className) => {
  const li = document.createElement('li');
  const liText = document.createTextNode(message);
  li.className = bemify(className, ['__item', `--${severity}`]);
  li.append(liText);

  const { dismissible, dismissText } = options;
  if (dismissible) {
    const button = document.createElement('button');
    button.className = bemify(className, '__dismiss');
    button.setAttribute('type', 'button');
    const buttonText = document.createTextNode(dismissText);
    button.append(buttonText);
    button.addEventListener('click', () => {
      removeListItem(list, li);
    });
    li.appendChild(button);
  }
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

const manageDelay = (list, listItem, options) => {
  const { delay } = options;
  if (delay > 0) {
    setTimeout(() => {
      removeListItem(list, listItem);
    }, delay);
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

  const list = createList(options, className);
  document.body.appendChild(list);

  const listItem = createListItem(message, severity, list, options, className);
  renderListItem(list, listItem, options);

  manageDelay(list, listItem, options);
};

export const toast = Toast();
