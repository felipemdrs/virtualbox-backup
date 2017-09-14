const virtualbox = require('virtualbox');

function savestate (vm) {
  return new Promise ((resolve, reject) => {
    virtualbox.savestate(vm, (error) => {
      if (error) {
        reject(error);
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

function resume (vm) {
  return new Promise ((resolve, reject) => {
    virtualbox.resume(vm, (error) => {
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
      await resume(vm);
      
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}
