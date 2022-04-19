import 'reflect-metadata';

import { CaviaApplication, CaviaFactory } from '@caviajs/core';

import { App } from './app';

(async () => {
  const app: CaviaApplication = await CaviaFactory.create(App);

  const listener = async (signal) => {
    try {
      await app.shutdown(signal);

      process.removeListener(signal, listener);
      process.kill(process.pid, signal);
    } catch (e) {
      process.exit(1);
    }
  };

  process.on('SIGINT', listener);

  await app.listen();
})();
