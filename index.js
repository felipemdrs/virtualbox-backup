const virtualbox = require('virtualbox');

function savestate(vm) {
  return Promise ((resolve, reject) => {
    virtualbox.savestate(vm, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

function vmExport(vm, output) {
  return Promise ((resolve, reject) => {
    virtualbox.export(vm, output, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

function resume(vm) {
  return Promise ((resolve, reject) => {
    virtualbox.resume(vm, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

module.export = async function (vm, output) {
    await savestate(vm);
    await vmExport(vm, output);
    await resume(vm);
}
