// ets_tracing: off

import * as O from "@effect-ts/system/Option"

import type { OptionURI } from "../../Modules"
import * as P from "../../Prelude"

export const compactF = P.implementCompactF<[P.URI<OptionURI>]>()(
  (_) => (F) => (f) => (fa) => {
    return O.isNone(fa) ? P.succeedF(F)(O.none) : f(fa.value)
  }
)
