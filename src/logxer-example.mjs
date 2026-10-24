import assert from 'node:assert/strict';
import { Logxer } from '@x12i/logxer';
const captured = [];
const logger = new Logxer({ packageName: 'FIXTURE_APP', envPrefix: 'FIXTURE_APP', debugNamespace: 'fixture-app' },
  { logLevel: 'warn', logToConsole: true, logToFile: false, logFormat: 'json', transports: { core: 'builtin' },
    shadow: { enabled: false }, tracing: { enableOtelContext: false }, queryStore: { enabled: false }, queryCache: { enabled: false } },
  { console: (level, message) => captured.push({ level, message }) },
);
logger.debug('This should be filtered');
logger.warn('Local fixture warning');
assert.equal(captured.length, 1);
assert.equal(captured[0].level, 'warn');
assert(captured[0].message.includes('Local fixture warning'));
console.log(captured);
