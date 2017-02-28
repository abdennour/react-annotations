function callLogMethodName(methodName, instance) {
  console.info(methodName, ' method is called within the Class ', instance.constructor.name);
}
function callLogArgs(methodName) {
  console.info(methodName, ' Method is called with following arguments  = \n', ...Array.from(arguments).slice(1));
}

function callLogReturned(methodName, returned) {
  console.info(methodName, ' Method returns  = ', returned);
}

export function LogArgs(target, key, descriptor) {
  const fn = descriptor.value;
  descriptor.value = function() {
    callLogArgs(key, ...arguments);
    return fn.bind(this)(...arguments);
  };
  return descriptor;
}

export function LogMethodName(target, key, descriptor) {
  const fn = descriptor.value;
  descriptor.value = function() {
    callLogMethodName(key, target);
    return fn.bind(this)(...arguments);
  };
  return descriptor;
}

export function LogReturned(target, key, descriptor) {
  const fn = descriptor.value;
  descriptor.value = function() {
    const result = fn.bind(this)(...arguments);
    callLogReturned(key, result);
    return result;
  };
  return descriptor;
}
export function LogAll(target, key, descriptor) {
  const fn = descriptor.value;
  descriptor.value = function() {
    callLogMethodName(key, target);
    callLogArgs(key, ...arguments);
    const result = fn.bind(this)(...arguments);
    callLogReturned(key, result)
    return result;
  };
  return descriptor;
};

export function Log(target, key, descriptor) {
  return LogAll(...arguments);
};
