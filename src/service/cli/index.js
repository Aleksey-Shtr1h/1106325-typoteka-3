`use strict`;

const generate = require(`./generate`);

const Cli = {
  [generate.name]: generate,
};

module.exports = {
  Cli,
};
