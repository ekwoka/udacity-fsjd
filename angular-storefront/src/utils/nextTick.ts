export const nextTick = (): Promise<void> => {
  return new Promise((resolve) => {
    queueMicrotask(() => setTimeout(() => resolve(), 0));
  });
};
