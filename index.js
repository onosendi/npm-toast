const OPTIONS = {
  delay: 3000,
  dismissible: true,
  dismissText: 'dismiss',
  message: '',
  position: 'top-center',
  severity: 'info',
  useDelay: true,
};

const prefix = ({ element, modifier }) => {
  let result = 'c-toast';
  if (element) {
    result += `__${element}`;
  }
  if (modifier) {
    result += `--${modifier}`;
  }
  return result;
};

class Toast {
  constructor(options = {}) {
    this.options = { ...OPTIONS, ...options };
  }

  emit(options) {
    this.options = { ...this.options, ...options };
    const { hpos, vpos } = this.getPosition();
    console.log(hpos, vpos);
  }

  getPosition() {
    const { position } = this.options;
    const [v, h] = position.split('-');
    const vpos = prefix({ modifier: `vpos-${v}` });
    const hpos = prefix({ modifier: `hpos-${h}` });
    return { vpos, hpos };
  }
}

export default Toast;
