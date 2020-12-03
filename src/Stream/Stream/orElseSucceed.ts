import type { Stream } from "./definitions"
import { orElse_ } from "./orElse"
import { succeed } from "./succeed"

/**
 * Succeeds with the specified value if this one fails with a typed error.
 */
export function orElseSucceed_<R, E, O, O1>(
  self: Stream<R, E, O>,
  o1: O1
): Stream<R, never, O | O1> {
  return orElse_(self, succeed(o1))
}

/**
 * Succeeds with the specified value if this one fails with a typed error.
 */
export function orElseSucceed<O1>(o1: O1) {
  return <R, E, O>(self: Stream<R, E, O>) => orElseSucceed_(self, o1)
}
