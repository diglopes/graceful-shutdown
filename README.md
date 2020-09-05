# Graceful Shutdown
## Shutting down NodeJS server correctly

### What "graceful shutdown" means?

Graceful shutdown is a way to close your application handling all the pending tasks before you kill the server, not abruptly interrupting the open connections or long tasks running.

**Graceful shutdown means when all your requests to the server is respond and not any data processing work left.**

### Which benefits you can get from it?

Prevents unexpected outcomes that can happen when closing connections immediately. We can not forecast the implications of killing the server suddenly and this should scare you!

### How that works?

Four important steps to do a graceful shutdown:

- Handle process kill signal
  - A signal is an asyncronous notification sent to a **process** or to a specific **thread** to notify an event that occurred
- Stop new requests from client
- Close all data process
- Exit from process