import test from 'ava';
import fetch from 'node-fetch';

test('resolves index', async (t) => {
  const response = await fetch('http://localhost:8080/');
  const data = await response.text();
  return t.is(data, 'Hello World');
});
