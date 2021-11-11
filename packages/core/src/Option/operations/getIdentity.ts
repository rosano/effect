// ets_tracing: off

import * as O from "@effect-ts/system/Option"

import type { Associative } from "../../Associative"
import { makeIdentity } from "../../Identity"

export function getIdentity<A>(A: Associative<A>) {
  return makeIdentity<O.Option<A>>(O.none, (x, y) =>
    O.isNone(x) ? y : O.isNone(y) ? x : O.some(A.combine(x.value, y.value))
  )
}
