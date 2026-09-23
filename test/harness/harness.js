'use strict';

class AssertionError extends Error {}
const TIMEOUT_MILLISECONDS = 5 * 1000;

function createTimeout() {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new TimeoutError()), TIMEOUT_MILLISECONDS);
  });
}

{
  const tests = [];
  const runTests = async () => {
    // Reject attempts to define tests asynchronously
    Object.freeze(tests);

    for (const {title, body} of tests) {
      try {
        await runTest(title, body);
      } catch (error) {
        // TODO report test error
        break;
      }
    }
    // TODO report results
  };

  async function test(title, body) {
    tests.push({title, body});
  }

  Promise.resolve().then(runTests);

  const runTest = async (title, body) => {
    const t = {
      atDriver: {
        // TODO: implement
        async userIntent() {},
        // TODO: implement
        async createSession() {},
        // TODO: implement
        once() {},
        // TODO: implement
        on() {},
      },
      pause(duration) {
        return new Promise((resolve) => setTimeout(resolve, duration));
      },
    };

    try {
      await Promise.race([body(t), createTimeout()]);
      // TODO: count pass
    } catch (error) {
      // TODO: count failure
    } finally {
      // TODO: unsubscribe listeners
    }
  };
}

function assert(value, message) {
  if (!value) {
    // TODO: write message
    throw new AssertionError();
  }
}

assert.equal = function(a, b, message) {
  if (!Object.is(a, b)) {
    // TODO: write message
    throw new AssertionError();
  }
};

assert.object = function(value, message) {
  if (!value) {
    // TODO: write message
    throw new AssertionError();
  }
  if (typeof value !== 'object') {
    // TODO: write message
    throw new AssertionError();
  }
};
