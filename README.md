# npm-toast

Simple toast notifications.

## Installation

Using NPM:

    $ npm i @onosendi/toast

CSS file is located at `@onosendi/toast/build/toast.css`

## Usage

Instantiate with default options.

    import { Toast } from '@onosendi/toast';

    const toast = Toast({
      // Delay in miliseconds. Set to 0 for non disappearing notifications.
      delay: 2000,

      // Show dismiss button.
      dismissible: true,

      // Dismiss button text.
      dismissText: 'dismiss',

      // Place new notifications at the top. Note: if notifications are
      // vertically aligned to the bottom, new notifications will be
      // placed at the bottom.
      newestAtTop: true,

      // Notification position.
      // verticalAlignment-horizontalAlignment
      // position: '[top/center/bottom]-[left/center/right]'
      position: 'bottom-right',

      // Notification severity.
      // Severities: error, info, success, warning
      severity: 'info',
    });

    toast({ message: 'Message with "info" severity' });

    toast({
      message: 'Message with "error" severity',
      severity: 'error',
    });

Without default options:

    import { toast } from '@onosendi/toast';

    toast({
      message: 'Message with "warning" severity',
      severity: 'warning',
    });

    toast({
      message: 'Message with "success" severity',
      severity: 'success',
      options: {
        delay: 1000,
      },
    });
