import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { isTruthy } from "../service/isTruthy";

afterEach(cleanup);

test("isTruthy acts correctly with falsy data", () => {
  expect(isTruthy([])).toBe(false);
  expect(isTruthy({})).toBe(false);
  expect(isTruthy(null)).toBe(false);
  expect(isTruthy(undefined)).toBe(false);
  expect(isTruthy("")).toBe(false);
});

test("isTruthy acts correctly with truthy data", () => {
  const jsonObject =
  {
    "foo": [
      { "first": "one" },
      { "second": "two" }
    ],
    "bar": [
      { "first": 1 },
      { "second": 2 }
    ]
  }
  const foo = { foo: "I am a foo." };
  const bar = "I am a bar.";
  const someArray = [1, 2, 3]
  expect(isTruthy(jsonObject)).toBe(true);
  expect(isTruthy(foo)).toBe(true);
  expect(isTruthy(bar)).toBe(true);
  expect(isTruthy(someArray)).toBe(true);
});