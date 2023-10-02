/**
 * @param {string} str
 */
module.exports = (str) => {
  const arrStr = str.trim().split(" ");

  const commandObj = {
    command: arrStr.at(0),
    args: arrStr.slice(1),
  };

  return commandObj;
};
