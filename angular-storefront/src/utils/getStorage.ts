export const getStorage = <T>(
  prefix: string,
  initial: T,
  override: boolean = false
): T => {
  const target: ProxyBase = Array.isArray(initial) ? [] : {};
  const update = () => localStorage.setItem(prefix, JSON.stringify(target));
  const proxyOutput = wrapProxy(target, update) as ProxyBase;
  const itemInStorage = localStorage.getItem(prefix);
  update();
  if (override) return Object.assign(proxyOutput, initial) as T;
  if (itemInStorage)
    return Object.assign(proxyOutput, JSON.parse(itemInStorage)) as T;
  return proxyOutput as T;
};

const wrapProxy = (item: any, update: () => void) => {
  const proxyOutput = new Proxy(item, {
    set: (target: ProxyBase, key: string, value) => {
      target[key] = value;
      if (value && typeof value === 'object') {
        target[key] = wrapProxy(value, update);
      }
      update();
      return true;
    },
  });

  return Object.assign(proxyOutput, item);
};

type ProxyBase = {
  [key: string]: any;
};
