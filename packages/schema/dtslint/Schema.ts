import * as ParseResult from "@effect/schema/ParseResult"
import * as S from "@effect/schema/Schema"
import * as Brand from "effect/Brand"
import { identity, pipe } from "effect/Function"

// ---------------------------------------------
// From
// ---------------------------------------------

// $ExpectType never
export type FromNever = S.Schema.From<typeof S.never>

// ---------------------------------------------
// To
// ---------------------------------------------

// $ExpectType never
export type ToNever = S.Schema.To<typeof S.never>

// ---------------------------------------------
// Primitives
// ---------------------------------------------

// $ExpectType Schema<void, void, never>
S.asSchema(S.void)

// $ExpectType $void
S.void

// $ExpectType Schema<undefined, undefined, never>
S.asSchema(S.undefined)

// $ExpectType $undefined
S.undefined

// $ExpectType Schema<string, string, never>
S.asSchema(S.string)

// $ExpectType $string
S.string

// $ExpectType Schema<number, number, never>
S.asSchema(S.number)

// $ExpectType $number
S.number

// $ExpectType Schema<boolean, boolean, never>
S.asSchema(S.boolean)

// $ExpectType $boolean
S.boolean

// $ExpectType Schema<bigint, bigint, never>
S.asSchema(S.bigintFromSelf)

// $ExpectType Schema<bigint, bigint, never>
S.asSchema(S.bigintFromSelf)

// $ExpectType bigintFromSelf
S.bigintFromSelf

// $ExpectType Schema<bigint, string, never>
S.asSchema(S.bigint)

// $ExpectType $bigint
S.bigint

// $ExpectType Schema<symbol, symbol, never>
S.asSchema(S.symbolFromSelf)

// $ExpectType symbolFromSelf
S.symbolFromSelf

// $ExpectType Schema<symbol, string, never>
S.asSchema(S.symbol)

// $ExpectType $symbol
S.symbol

// $ExpectType Schema<unknown, unknown, never>
S.asSchema(S.unknown)

// $ExpectType $unknown
S.unknown

// $ExpectType Schema<any, any, never>
S.asSchema(S.any)

// $ExpectType $any
S.any

// $ExpectType Schema<object, object, never>
S.asSchema(S.object)

// $ExpectType $object
S.object

// ---------------------------------------------
// literals
// ---------------------------------------------

// $ExpectType Schema<null, null, never>
S.asSchema(S.null)

// $ExpectType $null
S.null

// $ExpectType Schema<never, never, never>
S.asSchema(S.literal())

// $ExpectType $never
S.literal()

// $ExpectType Schema<"a", "a", never>
S.asSchema(S.literal("a"))

// $ExpectType literal<"a">
S.literal("a")

// $ExpectType Schema<"a" | "b" | "c", "a" | "b" | "c", never>
S.asSchema(S.literal("a", "b", "c"))

// $ExpectType literals<["a", "b", "c"]>
S.literal("a", "b", "c")

// $ExpectType literal<1>
S.literal(1)

// $ExpectType literal<2n>
S.literal(2n) // bigint literal

// $ExpectType literal<true>
S.literal(true)

// ---------------------------------------------
// strings
// ---------------------------------------------

// $ExpectType Schema<string, string, never>
pipe(S.string, S.maxLength(5))

// $ExpectType Schema<string, string, never>
pipe(S.string, S.minLength(5))

// $ExpectType Schema<string, string, never>
pipe(S.string, S.length(5))

// $ExpectType Schema<string, string, never>
pipe(S.string, S.pattern(/a/))

// $ExpectType Schema<string, string, never>
pipe(S.string, S.startsWith("a"))

// $ExpectType Schema<string, string, never>
pipe(S.string, S.endsWith("a"))

// $ExpectType Schema<string, string, never>
pipe(S.string, S.includes("a"))

// $ExpectType Schema<number, number, never>
pipe(S.number, S.greaterThan(5))

// $ExpectType Schema<number, number, never>
pipe(S.number, S.greaterThanOrEqualTo(5))

// $ExpectType Schema<number, number, never>
pipe(S.number, S.lessThan(5))

// $ExpectType Schema<number, number, never>
pipe(S.number, S.lessThanOrEqualTo(5))

// $ExpectType Schema<number, number, never>
pipe(S.number, S.int())

// $ExpectType Schema<number, number, never>
pipe(S.number, S.nonNaN()) // not NaN

// $ExpectType Schema<number, number, never>
pipe(S.number, S.finite()) // value must be finite, not Infinity or -Infinity

// ---------------------------------------------
// Native enums
// ---------------------------------------------

enum Fruits {
  Apple,
  Banana
}

// $ExpectType Schema<Fruits, Fruits, never>
S.asSchema(S.enums(Fruits))

// $ExpectType enums<typeof Fruits>
S.enums(Fruits)

//
// Nullables
//

// $ExpectType Schema<string | null, string | null, never>
S.asSchema(S.nullable(S.string))

// $ExpectType nullable<$string>
S.nullable(S.string)

// $ExpectType Schema<number | null, string | null, never>
S.asSchema(S.nullable(S.NumberFromString))

// $ExpectType nullable<NumberFromString>
S.nullable(S.NumberFromString)

// ---------------------------------------------
// Unions
// ---------------------------------------------

// $ExpectType Schema<string | number, string | number, never>
S.asSchema(S.union(S.string, S.number))

// $ExpectType union<[$string, $number]>
S.union(S.string, S.number)

// $ExpectType Schema<number | boolean, string | boolean, never>
S.asSchema(S.union(S.boolean, S.NumberFromString))

// $ExpectType union<[$boolean, NumberFromString]>
S.union(S.boolean, S.NumberFromString)

// ---------------------------------------------
// keyof
// ---------------------------------------------

// $ExpectType Schema<"a" | "b", "a" | "b", never>
S.keyof(S.struct({ a: S.string, b: S.NumberFromString }))

// ---------------------------------------------
// Tuples
// ---------------------------------------------

// $ExpectType Schema<readonly [string, number], readonly [string, number], never>
S.asSchema(S.tuple(S.string, S.number))

// $ExpectType tuple<[$string, $number]>
S.tuple(S.string, S.number)

// $ExpectType Schema<readonly [string, number], readonly [string, string], never>
S.asSchema(S.tuple(S.string, S.NumberFromString))

// $ExpectType tuple<[$string, NumberFromString]>
S.tuple(S.string, S.NumberFromString)

// ---------------------------------------------
// rest
// ---------------------------------------------

// $ExpectType Schema<readonly [string, number, ...boolean[]], readonly [string, number, ...boolean[]], never>
pipe(S.tuple(S.string, S.number), S.rest(S.boolean))

// $ExpectType Schema<readonly [string, number, ...number[]], readonly [string, string, ...string[]], never>
pipe(S.tuple(S.string, S.NumberFromString), S.rest(S.NumberFromString))

// ---------------------------------------------
// element
// ---------------------------------------------

// $ExpectType Schema<readonly [string, number, boolean], readonly [string, number, boolean], never>
pipe(S.tuple(S.string, S.number), S.element(S.boolean))

// $ExpectType Schema<readonly [string, number, number], readonly [string, string, string], never>
pipe(S.tuple(S.string, S.NumberFromString), S.element(S.NumberFromString))

// ---------------------------------------------
// optionalElement
// ---------------------------------------------

// $ExpectType Schema<readonly [string, number, boolean?], readonly [string, number, boolean?], never>
pipe(S.tuple(S.string, S.number), S.optionalElement(S.boolean))

// $ExpectType Schema<readonly [string, number, number?], readonly [string, string, string?], never>
pipe(S.tuple(S.string, S.NumberFromString), S.optionalElement(S.NumberFromString))

// ---------------------------------------------
// Arrays
// ---------------------------------------------

// $ExpectType Schema<readonly number[], readonly number[], never>
S.asSchema(S.array(S.number))

// $ExpectType array<$number>
S.array(S.number)

// $ExpectType Schema<readonly number[], readonly string[], never>
S.asSchema(S.array(S.NumberFromString))

// $ExpectType array<NumberFromString>
S.array(S.NumberFromString)

// $ExpectType Schema<readonly [number, ...number[]], readonly [number, ...number[]], never>
S.asSchema(S.nonEmptyArray(S.number))

// $ExpectType nonEmptyArray<$number>
S.nonEmptyArray(S.number)

// $ExpectType Schema<readonly [number, ...number[]], readonly [string, ...string[]], never>
S.asSchema(S.nonEmptyArray(S.NumberFromString))

// $ExpectType nonEmptyArray<NumberFromString>
S.nonEmptyArray(S.NumberFromString)

// ---------------------------------------------
// Structs
// ---------------------------------------------

// $ExpectType Schema<{ readonly a: string; readonly b: number; }, { readonly a: string; readonly b: number; }, never>
S.asSchema(S.struct({ a: S.string, b: S.number }))

// $ExpectType struct<{ a: $string; b: $number; }>
S.struct({ a: S.string, b: S.number })

// $ExpectType Schema<{ readonly a: string; readonly b: number; }, { readonly a: string; readonly b: string; }, never>
S.asSchema(S.struct({ a: S.string, b: S.NumberFromString }))

// $ExpectType struct<{ a: $string; b: NumberFromString; }>
const MyModel = S.struct({ a: S.string, b: S.NumberFromString })

// $ExpectType { readonly a: string; readonly b: string; }
export type MyModelFrom = S.Schema.From<typeof MyModel>

// $ExpectType { readonly a: string; readonly b: number; }
export type MyModelTo = S.Schema.To<typeof MyModel>

// $ExpectType Schema<{ readonly a: never; }, { readonly a: never; }, never>
S.asSchema(S.struct({ a: S.never }))

// $ExpectType struct<{ a: $never; }>
S.struct({ a: S.never })

// ---------------------------------------------
// optional { exact: true }
// ---------------------------------------------

// $ExpectType Schema<{ readonly a: string; readonly b: number; readonly c?: boolean; }, { readonly a: string; readonly b: number; readonly c?: boolean; }, never>
S.asSchema(S.struct({ a: S.string, b: S.number, c: S.optional(S.boolean, { exact: true }) }))

// $ExpectType struct<{ a: $string; b: $number; c: PropertySignature<boolean, true, boolean, true, never>; }>
S.struct({ a: S.string, b: S.number, c: S.optional(S.boolean, { exact: true }) })

// $ExpectType Schema<{ readonly a: string; readonly b: number; readonly c?: number; }, { readonly a: string; readonly b: number; readonly c?: string; }, never>
S.asSchema(S.struct({ a: S.string, b: S.number, c: S.optional(S.NumberFromString, { exact: true }) }))

// $ExpectType struct<{ a: $string; b: $number; c: PropertySignature<string, true, number, true, never>; }>
S.struct({ a: S.string, b: S.number, c: S.optional(S.NumberFromString, { exact: true }) })

// $ExpectType Schema<{ readonly a?: never; }, { readonly a?: never; }, never>
S.asSchema(S.struct({ a: S.optional(S.never, { exact: true }) }))

// $ExpectType struct<{ a: PropertySignature<never, true, never, true, never>; }>
S.struct({ a: S.optional(S.never, { exact: true }) })

// ---------------------------------------------
// optional
// ---------------------------------------------

// $ExpectType Schema<{ readonly a: string; readonly b: number; readonly c?: boolean | undefined; }, { readonly a: string; readonly b: number; readonly c?: boolean | undefined; }, never>
S.asSchema(S.struct({ a: S.string, b: S.number, c: S.optional(S.boolean) }))

// $ExpectType struct<{ a: $string; b: $number; c: PropertySignature<boolean | undefined, true, boolean | undefined, true, never>; }>
S.struct({ a: S.string, b: S.number, c: S.optional(S.boolean) })

// $ExpectType Schema<{ readonly a: string; readonly b: number; readonly c?: number | undefined; }, { readonly a: string; readonly b: number; readonly c?: string | undefined; }, never>
S.asSchema(S.struct({ a: S.string, b: S.number, c: S.optional(S.NumberFromString) }))

// $ExpectType struct<{ a: $string; b: $number; c: PropertySignature<string | undefined, true, number | undefined, true, never>; }>
S.struct({ a: S.string, b: S.number, c: S.optional(S.NumberFromString) })

// $ExpectType Schema<{ readonly a?: undefined; }, { readonly a?: undefined; }, never>
S.asSchema(S.struct({ a: S.optional(S.never) }))

// $ExpectType struct<{ a: PropertySignature<undefined, true, undefined, true, never>; }>
S.struct({ a: S.optional(S.never) })

// ---------------------------------------------
// optional { exact: true, default: () => A }
// ---------------------------------------------

// $ExpectType Schema<{ readonly a: string; readonly b: number; readonly c: boolean; }, { readonly a: string; readonly b: number; readonly c?: boolean; }, never>
S.asSchema(S.struct({
  a: S.string,
  b: S.number,
  c: S.optional(S.boolean, { exact: true, default: () => false })
}))

// $ExpectType struct<{ a: $string; b: $number; c: PropertySignature<boolean, true, boolean, false, never>; }>
S.struct({
  a: S.string,
  b: S.number,
  c: S.optional(S.boolean, { exact: true, default: () => false })
})

// $ExpectType Schema<{ readonly a: string; readonly b: number; readonly c: number; }, { readonly a: string; readonly b: number; readonly c?: string; }, never>
S.asSchema(S.struct({
  a: S.string,
  b: S.number,
  c: S.optional(S.NumberFromString, { exact: true, default: () => 0 })
}))

// $ExpectType struct<{ a: $string; b: $number; c: PropertySignature<string, true, number, false, never>; }>
S.struct({
  a: S.string,
  b: S.number,
  c: S.optional(S.NumberFromString, { exact: true, default: () => 0 })
})

// @ts-expect-error
S.struct({ a: S.optional(S.literal("a", "b"), { default: () => "a", exact: true }) })

// ---------------------------------------------
// optional { default: () => A }
// ---------------------------------------------

// $ExpectType Schema<{ readonly a: string; readonly b: number; readonly c: boolean; }, { readonly a: string; readonly b: number; readonly c?: boolean | undefined; }, never>
S.asSchema(S.struct({ a: S.string, b: S.number, c: S.optional(S.boolean, { default: () => false }) }))

// $ExpectType struct<{ a: $string; b: $number; c: PropertySignature<boolean | undefined, true, boolean, false, never>; }>
S.struct({ a: S.string, b: S.number, c: S.optional(S.boolean, { default: () => false }) })

// $ExpectType Schema<{ readonly a: string; readonly b: number; readonly c: number; }, { readonly a: string; readonly b: number; readonly c?: string | undefined; }, never>
S.asSchema(S.struct({ a: S.string, b: S.number, c: S.optional(S.NumberFromString, { default: () => 0 }) }))

// $ExpectType struct<{ a: $string; b: $number; c: PropertySignature<string | undefined, true, number, false, never>; }>
S.struct({ a: S.string, b: S.number, c: S.optional(S.NumberFromString, { default: () => 0 }) })

// @ts-expect-error
S.struct({ a: S.optional(S.literal("a", "b"), { default: () => "a" }) })

// ---------------------------------------------
// optional { nullable: true, default: () => A }
// ---------------------------------------------

// $ExpectType Schema<{ readonly a: number; }, { readonly a?: string | null | undefined; }, never>
S.asSchema(S.struct({ a: S.optional(S.NumberFromString, { nullable: true, default: () => 0 }) }))

// $ExpectType struct<{ a: PropertySignature<string | null | undefined, true, number, false, never>; }>
S.struct({ a: S.optional(S.NumberFromString, { nullable: true, default: () => 0 }) })

// $ExpectType Schema<{ readonly a: number; }, { readonly a?: string | null; }, never>
S.asSchema(S.struct({ a: S.optional(S.NumberFromString, { exact: true, nullable: true, default: () => 0 }) }))

// $ExpectType struct<{ a: PropertySignature<string | null, true, number, false, never>; }>
S.struct({ a: S.optional(S.NumberFromString, { exact: true, nullable: true, default: () => 0 }) })

// @ts-expect-error
S.struct({ a: S.optional(S.literal("a", "b"), { default: () => "a", nullable: true }) })

// ---------------------------------------------
// optional { exact: true, as: "Option" }
// ---------------------------------------------

// $ExpectType Schema<{ readonly a: string; readonly b: number; readonly c: Option<boolean>; }, { readonly a: string; readonly b: number; readonly c?: boolean; }, never>
S.asSchema(S.struct({ a: S.string, b: S.number, c: S.optional(S.boolean, { exact: true, as: "Option" }) }))

// $ExpectType struct<{ a: $string; b: $number; c: PropertySignature<boolean, true, Option<boolean>, false, never>; }>
S.struct({ a: S.string, b: S.number, c: S.optional(S.boolean, { exact: true, as: "Option" }) })

// $ExpectType Schema<{ readonly a: string; readonly b: number; readonly c: Option<number>; }, { readonly a: string; readonly b: number; readonly c?: string; }, never>
S.asSchema(S.struct({
  a: S.string,
  b: S.number,
  c: S.optional(S.NumberFromString, { exact: true, as: "Option" })
}))

// $ExpectType struct<{ a: $string; b: $number; c: PropertySignature<string, true, Option<number>, false, never>; }>
S.struct({
  a: S.string,
  b: S.number,
  c: S.optional(S.NumberFromString, { exact: true, as: "Option" })
})

// ---------------------------------------------
// optional { as: "Option" }
// ---------------------------------------------

// $ExpectType Schema<{ readonly a: string; readonly b: number; readonly c: Option<boolean>; }, { readonly a: string; readonly b: number; readonly c?: boolean | undefined; }, never>
S.asSchema(S.struct({ a: S.string, b: S.number, c: S.optional(S.boolean, { as: "Option" }) }))

// $ExpectType struct<{ a: $string; b: $number; c: PropertySignature<boolean | undefined, true, Option<boolean>, false, never>; }>
S.struct({ a: S.string, b: S.number, c: S.optional(S.boolean, { as: "Option" }) })

// $ExpectType Schema<{ readonly a: string; readonly b: number; readonly c: Option<number>; }, { readonly a: string; readonly b: number; readonly c?: string | undefined; }, never>
S.asSchema(S.struct({ a: S.string, b: S.number, c: S.optional(S.NumberFromString, { as: "Option" }) }))

// $ExpectType struct<{ a: $string; b: $number; c: PropertySignature<string | undefined, true, Option<number>, false, never>; }>
S.struct({ a: S.string, b: S.number, c: S.optional(S.NumberFromString, { as: "Option" }) })

// ---------------------------------------------
// optional { nullable: true, as: "Option" }
// ---------------------------------------------

// $ExpectType Schema<{ readonly a: Option<number>; }, { readonly a?: string | null | undefined; }, never>
S.asSchema(S.struct({ a: S.optional(S.NumberFromString, { nullable: true, as: "Option" }) }))

// $ExpectType struct<{ a: PropertySignature<string | null | undefined, true, Option<number>, false, never>; }>
S.struct({ a: S.optional(S.NumberFromString, { nullable: true, as: "Option" }) })

// $ExpectType Schema<{ readonly a: Option<number>; }, { readonly a?: string | null; }, never>
S.asSchema(S.struct({ a: S.optional(S.NumberFromString, { exact: true, nullable: true, as: "Option" }) }))

// $ExpectType struct<{ a: PropertySignature<string | null, true, Option<number>, false, never>; }>
S.struct({ a: S.optional(S.NumberFromString, { exact: true, nullable: true, as: "Option" }) })

// ---------------------------------------------
// pick
// ---------------------------------------------

// $ExpectType Schema<{ readonly a: string; readonly b: number; }, { readonly a: string; readonly b: number; }, never>
pipe(S.struct({ a: S.string, b: S.number, c: S.boolean }), S.pick("a", "b"))

// $ExpectType Schema<{ readonly a: string; readonly b: number; }, { readonly a: string; readonly b: string; }, never>
pipe(S.struct({ a: S.string, b: S.NumberFromString, c: S.boolean }), S.pick("a", "b"))

// ---------------------------------------------
// pick - optional
// ---------------------------------------------

// $ExpectType Schema<{ readonly a?: string; readonly b: number; }, { readonly a?: string; readonly b: number; }, never>
pipe(
  S.struct({ a: S.optional(S.string, { exact: true }), b: S.number, c: S.boolean }),
  S.pick("a", "b")
)

// $ExpectType Schema<{ readonly a?: string; readonly b: number; }, { readonly a?: string; readonly b: string; }, never>
pipe(
  S.struct({ a: S.optional(S.string, { exact: true }), b: S.NumberFromString, c: S.boolean }),
  S.pick("a", "b")
)

// $ExpectType Schema<{ readonly a: string; readonly b: number; }, { readonly a?: string; readonly b: string; }, never>
pipe(
  S.struct({
    a: S.optional(S.string, { exact: true, default: () => "" }),
    b: S.NumberFromString,
    c: S.boolean
  }),
  S.pick("a", "b")
)

// ---------------------------------------------
// omit
// ---------------------------------------------

// $ExpectType Schema<{ readonly a: string; readonly b: number; }, { readonly a: string; readonly b: number; }, never>
pipe(S.struct({ a: S.string, b: S.number, c: S.boolean }), S.omit("c"))

// $ExpectType Schema<{ readonly a: string; readonly b: number; }, { readonly a: string; readonly b: string; }, never>
pipe(S.struct({ a: S.string, b: S.NumberFromString, c: S.boolean }), S.omit("c"))

// ---------------------------------------------
// omit - optional
// ---------------------------------------------

// $ExpectType Schema<{ readonly a?: string; readonly b: number; }, { readonly a?: string; readonly b: number; }, never>
pipe(S.struct({ a: S.optional(S.string, { exact: true }), b: S.number, c: S.boolean }), S.omit("c"))

// $ExpectType Schema<{ readonly a?: string; readonly b: number; }, { readonly a?: string; readonly b: string; }, never>
pipe(
  S.struct({ a: S.optional(S.string, { exact: true }), b: S.NumberFromString, c: S.boolean }),
  S.omit("c")
)

// $ExpectType Schema<{ readonly a: string; readonly b: number; }, { readonly a?: string; readonly b: string; }, never>
pipe(
  S.struct({
    a: S.optional(S.string, { exact: true, default: () => "" }),
    b: S.NumberFromString,
    c: S.boolean
  }),
  S.omit("c")
)

// ---------------------------------------------
// brand
// ---------------------------------------------

// $ExpectType Schema<number & Brand<"Int">, number, never>
S.asSchema(pipe(S.number, S.int(), S.brand("Int")))

// $ExpectType brand<Schema<number, number, never>, "Int">
pipe(S.number, S.int(), S.brand("Int"))

// $ExpectType Schema<number & Brand<"Int">, string, never>
S.asSchema(pipe(S.NumberFromString, S.int(), S.brand("Int")))

// $ExpectType brand<Schema<number, string, never>, "Int">
pipe(S.NumberFromString, S.int(), S.brand("Int"))

// ---------------------------------------------
// Partial
// ---------------------------------------------

// $ExpectType Schema<{ readonly a?: string; readonly b?: number; }, { readonly a?: string; readonly b?: number; }, never>
S.partial(S.struct({ a: S.string, b: S.number }), { exact: true })

// $ExpectType Schema<{ readonly a?: string; readonly b?: number; }, { readonly a?: string; readonly b?: string; }, never>
S.partial(S.struct({ a: S.string, b: S.NumberFromString }), { exact: true })

// $ExpectType Schema<{ readonly a?: string | undefined; readonly b?: number | undefined; }, { readonly a?: string | undefined; readonly b?: number | undefined; }, never>
S.partial(S.struct({ a: S.string, b: S.number }))

// $ExpectType Schema<{ readonly a?: string | undefined; readonly b?: number | undefined; }, { readonly a?: string | undefined; readonly b?: string | undefined; }, never>
S.partial(S.struct({ a: S.string, b: S.NumberFromString }))

// ---------------------------------------------
// Required
// ---------------------------------------------

// $ExpectType Schema<{ readonly a: string; readonly b: number; }, { readonly a: string; readonly b: number; }, never>
S.required(
  S.struct({ a: S.optional(S.string, { exact: true }), b: S.optional(S.number, { exact: true }) })
)

// $ExpectType Schema<{ readonly b: number; readonly a: string; readonly c: number; }, { readonly b: string; readonly a: string; readonly c: string; }, never>
S.required(
  S.struct({
    a: S.optional(S.string, { exact: true }),
    b: S.NumberFromString,
    c: S.optional(S.NumberFromString, { exact: true })
  })
)

// ---------------------------------------------
// record
// ---------------------------------------------

// $ExpectType Schema<{ readonly [x: string]: string; }, { readonly [x: string]: string; }, never>
S.asSchema(S.record(S.string, S.string))

// $ExpectType Schema<{ readonly [x: string]: number; }, { readonly [x: string]: string; }, never>
S.asSchema(S.record(S.string, S.NumberFromString))

// $ExpectType Schema<{ readonly [x: string]: string; }, { readonly [x: string]: string; }, never>
S.asSchema(S.record(pipe(S.string, S.minLength(2)), S.string))

// $ExpectType Schema<{ readonly a: string; readonly b: string; }, { readonly a: string; readonly b: string; }, never>
S.asSchema(S.record(S.union(S.literal("a"), S.literal("b")), S.string))

// $ExpectType Schema<{ readonly [x: symbol]: string; }, { readonly [x: symbol]: string; }, never>
S.asSchema(S.record(S.symbolFromSelf, S.string))

// $ExpectType Schema<{ readonly [x: `a${string}`]: string; }, { readonly [x: `a${string}`]: string; }, never>
S.asSchema(S.record(S.templateLiteral(S.literal("a"), S.string), S.string))

// $ExpectType Schema<{ readonly [x: string & Brand<"UserId">]: string; }, { readonly [x: string]: string; }, never>
S.asSchema(S.record(S.string.pipe(S.brand("UserId")), S.string))

// $ExpectType Schema<{ readonly [x: string & Brand<symbol>]: string; }, { readonly [x: string]: string; }, never>
S.asSchema(S.record(S.string.pipe(S.brand(Symbol.for("UserId"))), S.string))

// ---------------------------------------------
// Extend
// ---------------------------------------------

// $ExpectType Schema<{ readonly a: string; readonly b: string; readonly c: string; }, { readonly a: string; readonly b: string; readonly c: string; }, never>
pipe(
  S.struct({ a: S.string, b: S.string }),
  S.extend(S.struct({ c: S.string }))
)

// dual
// $ExpectType Schema<{ readonly a: string; readonly b: string; readonly c: string; }, { readonly a: string; readonly b: string; readonly c: string; }, never>
S.extend(S.struct({ a: S.string, b: S.string }), S.struct({ c: S.string }))

// rises an error in TypeScript@5.0
// // $ExpectType Schema<{ readonly [x: string]: string; readonly a: string; readonly b: string; readonly c: string; }, { readonly [x: string]: string; readonly a: string; readonly b: string; readonly c: string; }, never>
// pipe(
//   S.struct({ a: S.string, b: S.string }),
//   S.extend(S.struct({ c: S.string })),
//   S.extend(S.record(S.string, S.string))
// )

// ---------------------------------------------
// suspend
// ---------------------------------------------

interface SuspendTo1 {
  readonly a: number
  readonly as: ReadonlyArray<SuspendTo1>
}
const suspend1: S.Schema<SuspendTo1> = S.struct({
  a: S.number,
  as: S.array(S.suspend(() => suspend1))
})

interface LazyFrom2 {
  readonly a: string
  readonly as: ReadonlyArray<LazyFrom2>
}
interface LazyTo2 {
  readonly a: number
  readonly as: ReadonlyArray<LazyTo2>
}
const lazy2: S.Schema<LazyTo2, LazyFrom2> = S.struct({
  a: S.NumberFromString,
  as: S.array(S.suspend(() => lazy2))
})

// ---------------------------------------------
// rename
// ---------------------------------------------

// $ExpectType Schema<{ readonly a: string; readonly b: number; }, { readonly a: string; readonly b: number; }, never>
S.rename(S.struct({ a: S.string, b: S.number }), {})

// $ExpectType Schema<{ readonly c: string; readonly b: number; }, { readonly a: string; readonly b: number; }, never>
S.rename(S.struct({ a: S.string, b: S.number }), { a: "c" })

// $ExpectType Schema<{ readonly c: string; readonly d: number; }, { readonly a: string; readonly b: number; }, never>
S.rename(S.struct({ a: S.string, b: S.number }), { a: "c", b: "d" })

const a = Symbol.for("@effect/schema/dtslint/a")

// $ExpectType Schema<{ readonly [a]: string; readonly b: number; }, { readonly a: string; readonly b: number; }, never>
S.rename(S.struct({ a: S.string, b: S.number }), { a })

// @ts-expect-error
S.rename(S.struct({ a: S.string, b: S.number }), { c: "d" })

// @ts-expect-error
S.rename(S.struct({ a: S.string, b: S.number }), { a: "c", d: "e" })

// $ExpectType Schema<{ readonly a: string; readonly b: number; }, { readonly a: string; readonly b: number; }, never>
S.struct({ a: S.string, b: S.number }).pipe(S.rename({}))

// $ExpectType Schema<{ readonly c: string; readonly b: number; }, { readonly a: string; readonly b: number; }, never>
S.struct({ a: S.string, b: S.number }).pipe(S.rename({ a: "c" }))

// @ts-expect-error
S.struct({ a: S.string, b: S.number }).pipe(S.rename({ c: "d" }))

// @ts-expect-error
S.struct({ a: S.string, b: S.number }).pipe(S.rename({ a: "c", d: "e" }))

// ---------------------------------------------
// option
// ---------------------------------------------

// $ExpectType Schema<Option<number>, OptionFrom<number>, never>
S.asSchema(S.option(S.number))

// $ExpectType option<$number>
S.option(S.number)

// $ExpectType Schema<Option<number>, OptionFrom<string>, never>
S.asSchema(S.option(S.NumberFromString))

// $ExpectType option<NumberFromString>
S.option(S.NumberFromString)

// ---------------------------------------------
// optionFromSelf
// ---------------------------------------------

// $ExpectType Schema<Option<number>, Option<number>, never>
S.asSchema(S.optionFromSelf(S.number))

// $ExpectType optionFromSelf<$number>
S.optionFromSelf(S.number)

// $ExpectType Schema<Option<number>, Option<string>, never>
S.asSchema(S.optionFromSelf(S.NumberFromString))

// $ExpectType optionFromSelf<NumberFromString>
S.optionFromSelf(S.NumberFromString)

// ---------------------------------------------
// optionFromNullable
// ---------------------------------------------

// $ExpectType Schema<Option<number>, number | null, never>
S.asSchema(S.optionFromNullable(S.number))

// $ExpectType optionFromNullable<$number>
S.optionFromNullable(S.number)

// $ExpectType Schema<Option<number>, string | null, never>
S.asSchema(S.optionFromNullable(S.NumberFromString))

// $ExpectType optionFromNullable<NumberFromString>
S.optionFromNullable(S.NumberFromString)

// ---------------------------------------------
// optionFromUndefined
// ---------------------------------------------

// $ExpectType Schema<Option<number>, string | undefined, never>
S.asSchema(S.optionFromOrUndefined(S.NumberFromString))

// $ExpectType optionFromOrUndefined<NumberFromString>
S.optionFromOrUndefined(S.NumberFromString)

// ---------------------------------------------
// optionFromNullish
// ---------------------------------------------

// $ExpectType Schema<Option<number>, string | null | undefined, never>
S.asSchema(S.optionFromNullish(S.NumberFromString, null))

// $ExpectType optionFromNullish<NumberFromString>
S.optionFromNullish(S.NumberFromString, undefined)

// ---------------------------------------------
// instanceOf
// ---------------------------------------------

class Test {
  constructor(readonly name: string) {}
}

// $ExpectType Schema<Test, Test, never>
S.asSchema(S.instanceOf(Test))

// $ExpectType instanceOf<Test>
S.instanceOf(Test)

// ---------------------------------------------
// Template literals
// ---------------------------------------------

// $ExpectType Schema<`a${string}`, `a${string}`, never>
S.asSchema(S.templateLiteral(S.literal("a"), S.string))

// $ExpectType templateLiteral<`a${string}`>
S.templateLiteral(S.literal("a"), S.string)

// example from https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html
const EmailLocaleIDs = S.literal("welcome_email", "email_heading")
const FooterLocaleIDs = S.literal("footer_title", "footer_sendoff")

// $ExpectType Schema<"welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id", "welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id", never>
S.asSchema(S.templateLiteral(S.union(EmailLocaleIDs, FooterLocaleIDs), S.literal("_id")))

// $ExpectType templateLiteral<"welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id">
S.templateLiteral(S.union(EmailLocaleIDs, FooterLocaleIDs), S.literal("_id"))

// ---------------------------------------------
// attachPropertySignature
// ---------------------------------------------

// $ExpectType Schema<{ readonly radius: number; readonly kind: "circle"; }, { readonly radius: number; }, never>
pipe(S.struct({ radius: S.number }), S.attachPropertySignature("kind", "circle"))

// $ExpectType Schema<{ readonly radius: number; readonly kind: "circle"; }, { readonly radius: string; }, never>
pipe(S.struct({ radius: S.NumberFromString }), S.attachPropertySignature("kind", "circle"))

// ---------------------------------------------
// filter
// ---------------------------------------------

const predicateFilter1 = (u: unknown) => typeof u === "string"
const FromFilter = S.union(S.string, S.number)

// $ExpectType Schema<string | number, string | number, never>
pipe(FromFilter, S.filter(predicateFilter1))

const FromRefinement = S.struct({
  a: S.optional(S.string, { exact: true }),
  b: S.optional(S.number, { exact: true })
})

// $ExpectType Schema<{ readonly a?: string; readonly b?: number; } & { readonly b: number; }, { readonly a?: string; readonly b?: number; }, never>
pipe(FromRefinement, S.filter(S.is(S.struct({ b: S.number }))))

const LiteralFilter = S.literal("a", "b")
const predicateFilter2 = (u: unknown): u is "a" => typeof u === "string" && u === "a"

// $ExpectType Schema<"a", "a" | "b", never>
pipe(LiteralFilter, S.filter(predicateFilter2))

// $ExpectType Schema<"a", "a" | "b", never>
pipe(LiteralFilter, S.filter(S.is(S.literal("a"))))

// $ExpectType Schema<never, "a" | "b", never>
pipe(LiteralFilter, S.filter(S.is(S.literal("c"))))

declare const UnionFilter: S.Schema<
  { readonly a: string } | { readonly b: string },
  { readonly a: string } | { readonly b: string },
  never
>

// $ExpectType Schema<({ readonly a: string; } | { readonly b: string; }) & { readonly b: string; }, { readonly a: string; } | { readonly b: string; }, never>
pipe(UnionFilter, S.filter(S.is(S.struct({ b: S.string }))))

// $ExpectType Schema<number & Brand<"MyNumber">, number, never>
pipe(S.number, S.filter((n): n is number & Brand.Brand<"MyNumber"> => n > 0))

// annotations
pipe(
  S.string,
  S.filter(
    (
      _s // $ExpectType string
    ) => true,
    {
      arbitrary: (
        _from // $ExpectType Arbitrary<string>
      ) =>
      (fc) => fc.string(),
      pretty: (
        _from // $ExpectType Pretty<string>
      ) =>
      (s) => s,
      equivalence: () =>
      (
        _a, // $ExpectType string
        _b // $ExpectType string
      ) => true
    }
  )
)

// ---------------------------------------------
// compose
// ---------------------------------------------

// A -> B -> C

// $ExpectType Schema<readonly number[], string, never>
S.compose(S.split(","), S.array(S.NumberFromString))

// $ExpectType Schema<readonly number[], string, never>
S.split(",").pipe(S.compose(S.array(S.NumberFromString)))

// decoding (strict: false)

// $ExpectType Schema<number, string | null, never>
S.compose(S.union(S.null, S.string), S.NumberFromString, { strict: false })

// $ExpectType Schema<number, string | null, never>
S.union(S.null, S.string).pipe(S.compose(S.NumberFromString, { strict: false }))

// decoding (strict: true)

// @ts-expect-error
S.compose(S.union(S.null, S.string), S.NumberFromString)

// @ts-expect-error
S.union(S.null, S.string).pipe(S.compose(S.NumberFromString))

// encoding (strict: false)

// $ExpectType Schema<number | null, string, never>
S.compose(S.NumberFromString, S.union(S.null, S.number), { strict: false })

// $ExpectType Schema<number | null, string, never>
S.NumberFromString.pipe(S.compose(S.union(S.null, S.number), { strict: false }))

// encoding (strict: true)

// @ts-expect-error
S.compose(S.NumberFromString, S.union(S.null, S.number))

// @ts-expect-error
S.NumberFromString.pipe(S.compose(S.union(S.null, S.number)))

// ---------------------------------------------
// fromBrand
// ---------------------------------------------

type Eur = number & Brand.Brand<"Eur">
const Eur = Brand.nominal<Eur>()

// $ExpectType Schema<number & Brand<"Eur">, number, never>
S.number.pipe(S.fromBrand(Eur))

// ---------------------------------------------
// mutable
// ---------------------------------------------

// $ExpectType Schema<string, string, never>
S.mutable(S.string)

// $ExpectType Schema<{ a: number; }, { a: number; }, never>
S.mutable(S.struct({ a: S.number }))

// $ExpectType Schema<{ [x: string]: number; }, { [x: string]: number; }, never>
S.mutable(S.record(S.string, S.number))

// $ExpectType Schema<string[], string[], never>
S.mutable(S.array(S.string))

// $ExpectType Schema<string[] | { a: number; }, string[] | { a: number; }, never>
S.mutable(S.union(S.struct({ a: S.number }), S.array(S.string)))

// $ExpectType Schema<string[], string[], never>
S.mutable(S.array(S.string).pipe(S.maxItems(2)))

// $ExpectType Schema<string[], string[], never>
S.mutable(S.suspend(() => S.array(S.string)))

// $ExpectType Schema<string[], string[], never>
S.mutable(S.transform(S.array(S.string), S.array(S.string), identity, identity))

// ---------------------------------------------
// transform
// ---------------------------------------------

// $ExpectType Schema<number, string, never>
S.string.pipe(S.transform(S.number, (s) => s.length, (n) => String(n)))

// $ExpectType Schema<number, string, never>
S.string.pipe(S.transform(S.number, (s) => s, (n) => n, { strict: false }))

// @ts-expect-error
S.string.pipe(S.transform(S.number, (s) => s, (n) => String(n)))

// @ts-expect-error
S.string.pipe(S.transform(S.number, (s) => s.length, (n) => n))

// ---------------------------------------------
// transformOrFail
// ---------------------------------------------

// $ExpectType Schema<number, string, never>
S.string.pipe(
  S.transformOrFail(
    S.number,
    (s) => ParseResult.succeed(s.length),
    (n) => ParseResult.succeed(String(n))
  )
)

// $ExpectType Schema<number, string, never>
S.string.pipe(
  S.transformOrFail(
    S.number,
    (s) => ParseResult.succeed(s),
    (n) => ParseResult.succeed(String(n)),
    { strict: false }
  )
)

S.string.pipe(
  // @ts-expect-error
  S.transformOrFail(S.number, (s) => ParseResult.succeed(s), (n) => ParseResult.succeed(String(n)))
)

S.string.pipe(
  // @ts-expect-error
  S.transformOrFail(S.number, (s) => ParseResult.succeed(s.length), (n) => ParseResult.succeed(n))
)

// ---------------------------------------------
// transformLiteral
// ---------------------------------------------

// $ExpectType Schema<"a", 0, never>
S.asSchema(S.transformLiteral(0, "a"))

// $ExpectType transformLiteral<"a", 0>
S.transformLiteral(0, "a")

// ---------------------------------------------
// transformLiterals
// ---------------------------------------------

// $ExpectType Schema<"a" | "b", 0 | 1, never>
S.asSchema(S.transformLiterals([0, "a"], [1, "b"]))

// $ExpectType union<[transformLiteral<"a", 0>, transformLiteral<"b", 1>]>
S.transformLiterals([0, "a"], [1, "b"])

// ---------------------------------------------
// Class
// ---------------------------------------------

class MyClass extends S.Class<MyClass>()({
  a: S.string
}) {}

// $ExpectType { readonly a: string; }
export type MyClassFrom = S.Schema.From<typeof MyClass>

// $ExpectType MyClass
export type MyClassTo = S.Schema.To<typeof MyClass>

// $ExpectType Schema<{ readonly a: string; }, { readonly a: string; }, never>
MyClass.struct

class MyTaggedClass extends S.TaggedClass<MyTaggedClass>()("MyTaggedClass", {
  a: S.string
}) {}

// $ExpectType [props: { readonly a: string; }, disableValidation?: boolean | undefined]
export type MyTaggedClassParams = ConstructorParameters<typeof MyTaggedClass>

// $ExpectType { readonly _tag: "MyTaggedClass"; readonly a: string; }
export type MyTaggedClassFrom = S.Schema.From<typeof MyTaggedClass>

// $ExpectType MyTaggedClass
export type MyTaggedClassTo = S.Schema.To<typeof MyTaggedClass>

// $ExpectType Schema<{ readonly _tag: "MyTaggedClass"; readonly a: string; }, { readonly _tag: "MyTaggedClass"; readonly a: string; }, never>
MyTaggedClass.struct

class VoidTaggedClass extends S.TaggedClass<VoidTaggedClass>()("VoidTaggedClass", {}) {}

// $ExpectType [props?: void | {}, disableValidation?: boolean | undefined]
export type VoidTaggedClassParams = ConstructorParameters<typeof VoidTaggedClass>

// ---------------------------------------------
// BigDecimal
// ---------------------------------------------

// $ExpectType Schema<BigDecimal, string, never>
S.asSchema(S.BigDecimal)

// $ExpectType $BigDecimal
S.BigDecimal

// $ExpectType Schema<BigDecimal, BigDecimal, never>
S.asSchema(S.BigDecimalFromSelf)

// $ExpectType BigDecimalFromSelf
S.BigDecimalFromSelf

// $ExpectType Schema<BigDecimal, number, never>
S.asSchema(S.BigDecimalFromNumber)

// $ExpectType BigDecimalFromNumber
S.BigDecimalFromNumber

// ---------------------------------------------
// Duration
// ---------------------------------------------

// $ExpectType Schema<Duration, readonly [seconds: number, nanos: number], never>
S.Duration

// $ExpectType Schema<Duration, Duration, never>
S.DurationFromSelf

// $ExpectType Schema<Duration, number, never>
S.DurationFromMillis

// $ExpectType Schema<Duration, bigint, never>
S.DurationFromNanos

// ---------------------------------------------
// Secret
// ---------------------------------------------

// $ExpectType Schema<Secret, string, never>
S.Secret

// $ExpectType Schema<Secret, Secret, never>
S.SecretFromSelf

// ---------------------------------------------
// propertySignatureAnnotations
// ---------------------------------------------

// $ExpectType PropertySignature<string, false, string, false, never>
S.string.pipe(S.propertySignatureAnnotations({ description: "description" }))

// $ExpectType PropertySignature<string | undefined, true, string | undefined, true, never>
S.optional(S.string).pipe(S.propertySignatureAnnotations({ description: "description" }))

// ---------------------------------------------
// pluck
// ---------------------------------------------

// $ExpectType Schema<string, { readonly a: string; readonly b: number; }, never>
S.pluck(S.struct({ a: S.string, b: S.number }), "a")

// $ExpectType Schema<string, { readonly a: string; readonly b: number; }, never>
pipe(S.struct({ a: S.string, b: S.number }), S.pluck("a"))

// ---------------------------------------------
// head
// ---------------------------------------------

// $ExpectType Schema<Option<number>, readonly number[], never>
S.head(S.array(S.number))

// ---------------------------------------------
// headOr
// ---------------------------------------------

// $ExpectType Schema<number, readonly number[], never>
S.headOr(S.array(S.number))

// ---------------------------------------------
// cause
// ---------------------------------------------

declare const defect: S.Schema<unknown, unknown, "defect">

// $ExpectType Schema<Cause<string>, CauseFrom<string>, never>
S.cause({ error: S.string })

// $ExpectType Schema<Cause<string>, CauseFrom<string>, "defect">
S.cause({ error: S.string, defect })

// ---------------------------------------------
// causeFromSelf
// ---------------------------------------------

// $ExpectType Schema<Cause<string>, Cause<string>, never>
S.causeFromSelf({ error: S.string })

// $ExpectType Schema<Cause<string>, Cause<string>, "defect">
S.causeFromSelf({ error: S.string, defect })

// ---------------------------------------------
// eitherFromSelf
// ---------------------------------------------

// $ExpectType Schema<Either<number, string>, Either<string, string>, never>
S.asSchema(S.eitherFromSelf({ right: S.NumberFromString, left: S.string }))

// $ExpectType eitherFromSelf<NumberFromString, $string>
S.eitherFromSelf({ right: S.NumberFromString, left: S.string })

// ---------------------------------------------
// either
// ---------------------------------------------

// $ExpectType Schema<Either<number, string>, EitherFrom<string, string>, never>
S.asSchema(S.either({ right: S.NumberFromString, left: S.string }))

// $ExpectType either<NumberFromString, $string>
S.either({ right: S.NumberFromString, left: S.string })

// ---------------------------------------------
// eitherFromUnion
// ---------------------------------------------

// $ExpectType Schema<Either<number, boolean>, string | boolean, never>
S.asSchema(S.eitherFromUnion({ right: S.NumberFromString, left: S.boolean }))

// $ExpectType eitherFromUnion<NumberFromString, $boolean>
S.eitherFromUnion({ right: S.NumberFromString, left: S.boolean })

// ---------------------------------------------
// readonlyMapFromSelf
// ---------------------------------------------

// $ExpectType Schema<ReadonlyMap<number, string>, ReadonlyMap<string, string>, never>
S.asSchema(S.readonlyMapFromSelf({ key: S.NumberFromString, value: S.string }))

// $ExpectType readonlyMapFromSelf<NumberFromString, $string>
S.readonlyMapFromSelf({ key: S.NumberFromString, value: S.string })

// ---------------------------------------------
// readonlyMap
// ---------------------------------------------

// $ExpectType Schema<ReadonlyMap<number, string>, readonly (readonly [string, string])[], never>
S.asSchema(S.readonlyMap({ key: S.NumberFromString, value: S.string }))

// $ExpectType readonlyMap<NumberFromString, $string>
S.readonlyMap({ key: S.NumberFromString, value: S.string })

// ---------------------------------------------
// hashMapFromSelf
// ---------------------------------------------

// $ExpectType Schema<HashMap<number, string>, HashMap<string, string>, never>
S.asSchema(S.hashMapFromSelf({ key: S.NumberFromString, value: S.string }))

// $ExpectType hashMapFromSelf<NumberFromString, $string>
S.hashMapFromSelf({ key: S.NumberFromString, value: S.string })

// ---------------------------------------------
// hashMap
// ---------------------------------------------

// $ExpectType Schema<HashMap<number, string>, readonly (readonly [string, string])[], never>
S.asSchema(S.hashMap({ key: S.NumberFromString, value: S.string }))

// $ExpectType hashMap<NumberFromString, $string>
S.hashMap({ key: S.NumberFromString, value: S.string })

// ---------------------------------------------
// readonlySetFromSelf
// ---------------------------------------------

// $ExpectType Schema<ReadonlySet<number>, ReadonlySet<string>, never>
S.asSchema(S.readonlySetFromSelf(S.NumberFromString))

// $ExpectType readonlySetFromSelf<NumberFromString>
S.readonlySetFromSelf(S.NumberFromString)

// ---------------------------------------------
// readonlySet
// ---------------------------------------------

// $ExpectType Schema<ReadonlySet<number>, readonly string[], never>
S.asSchema(S.readonlySet(S.NumberFromString))

// $ExpectType readonlySet<NumberFromString>
S.readonlySet(S.NumberFromString)

// ---------------------------------------------
// hashSetFromSelf
// ---------------------------------------------

// $ExpectType Schema<HashSet<number>, HashSet<string>, never>
S.asSchema(S.hashSetFromSelf(S.NumberFromString))

// $ExpectType hashSetFromSelf<NumberFromString>
S.hashSetFromSelf(S.NumberFromString)

// ---------------------------------------------
// hashSet
// ---------------------------------------------

// $ExpectType Schema<HashSet<number>, readonly string[], never>
S.asSchema(S.hashSet(S.NumberFromString))

// $ExpectType hashSet<NumberFromString>
S.hashSet(S.NumberFromString)

// ---------------------------------------------
// chunkFromSelf
// ---------------------------------------------

// $ExpectType Schema<Chunk<number>, Chunk<string>, never>
S.asSchema(S.chunkFromSelf(S.NumberFromString))

// $ExpectType chunkFromSelf<NumberFromString>
S.chunkFromSelf(S.NumberFromString)

// ---------------------------------------------
// chunk
// ---------------------------------------------

// $ExpectType Schema<Chunk<number>, readonly string[], never>
S.asSchema(S.chunk(S.NumberFromString))

// $ExpectType chunk<NumberFromString>
S.chunk(S.NumberFromString)

// ---------------------------------------------
// listFromSelf
// ---------------------------------------------

// $ExpectType Schema<List<number>, List<string>, never>
S.asSchema(S.listFromSelf(S.NumberFromString))

// $ExpectType listFromSelf<NumberFromString>
S.listFromSelf(S.NumberFromString)

// ---------------------------------------------
// list
// ---------------------------------------------

// $ExpectType Schema<List<number>, readonly string[], never>
S.asSchema(S.list(S.NumberFromString))

// $ExpectType list<NumberFromString>
S.list(S.NumberFromString)
