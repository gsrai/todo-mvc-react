/**
 * Based on this https://stackoverflow.com/questions/8012002/create-a-unique-number-with-javascript-time
 */

export const genUniqueId = () => Math.floor(Math.random() * Date.now()).toString(36);

export const noop: VoidFunction = () => {
  /* noop */
};
