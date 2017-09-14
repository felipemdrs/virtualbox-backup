const virtualbox = require('virtualbox');

function savestate (vm) {
  return new Promise ((resolve, reject) => {
    virtualbox.isRunning(vm, (error, isRunning) => {
      if (isRunning) {
        virtualbox.savestate(vm, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  });
}

function vmExport (vm, output) {
  return new Promise ((resolve, reject) => {
    virtualbox.export(vm, output, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

function start (vm) {
  return new Promise ((resolve, reject) => {
    virtualbox.start(vm, false, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

module.exports = function (vm, output) {
  return new Promise (async (resolve, reject) => {
    try {
      await savestate(vm);
      await vmExport(vm, output);
      await start(vm);
      
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}
