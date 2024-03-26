/**
 * @since 1.0.0
 */
import * as Schema from "@effect/schema/Schema"
import * as Effect from "effect/Effect"
import * as Error from "./Error.js"

/**
 * @since 1.0.0
 */
export const decodeUnknown = <A, I, R>(
  schema: Schema.Schema<A, I, R>,
  type: Error.SchemaError["type"]
): (input: unknown) => Effect.Effect<A, Error.SchemaError, R> => {
  const parse = Schema.decodeUnknown(schema)

  return (input) => Effect.mapError(parse(input), (_) => new Error.SchemaError({ type, error: _.error }))
}

/**
 * @since 1.0.0
 */
export const encode = <A, I, R>(
  schema: Schema.Schema<A, I, R>,
  type: Error.SchemaError["type"]
): (input: A) => Effect.Effect<I, Error.SchemaError, R> => {
  const encode = Schema.encode(schema)
  return (input) =>
    Effect.mapError(
      encode(input),
      ({ error }) => new Error.SchemaError({ type, error })
    )
}
