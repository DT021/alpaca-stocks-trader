const { createServer } = require('http');
const { ENGINE_PORT, DB } = require('./config/env');
const engine = require('./engine/engine');

class App {
  constructor() {
    this.server = createServer();
    this.registerEvents();
    this.start()
  }

  registerEvents() {
    process.on('SIGTERM', () => this.handleExit());
  }

  start() {
    this.server.listen(ENGINE_PORT, () => {
      console.log('Engine running on port:', ENGINE_PORT);
      engine.start();
    });
  }

  handleExit() {
    this.server.close(() => process.exit(0));
  }
}

module.exports = new App();
