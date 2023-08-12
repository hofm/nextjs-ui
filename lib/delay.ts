export const delay = (delayInMS: number) => {
  return new Promise((resolve) => setTimeout(resolve, delayInMS));
};
