'use strict';

const getRunCmdEnv = require('./utils/getRunCmdEnv');

function runCmd(cmd, _args, fn) {
  if (process.platform === 'win32' && cmd === 'npm') {
    cmd = 'npm.cmd';
  }
  // eslint-disable-next-line no-console
  console.log('process.platform', process.platform);
  const args = _args || [];
  const runner = require('child_process').spawn(cmd, args, {
    // keep color
    stdio: 'inherit',
    env: getRunCmdEnv(),
  });

  runner.on('close', code => {
    if (fn) {
      fn(code);
    }
  });
}

module.exports = runCmd;
