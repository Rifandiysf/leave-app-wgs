
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model tb_balance
 * 
 */
export type tb_balance = $Result.DefaultSelection<Prisma.$tb_balancePayload>
/**
 * Model tb_leave
 * 
 */
export type tb_leave = $Result.DefaultSelection<Prisma.$tb_leavePayload>
/**
 * Model tb_mandatory_leave
 * 
 */
export type tb_mandatory_leave = $Result.DefaultSelection<Prisma.$tb_mandatory_leavePayload>
/**
 * Model tb_special_leave
 * 
 */
export type tb_special_leave = $Result.DefaultSelection<Prisma.$tb_special_leavePayload>
/**
 * Model tb_users
 * 
 */
export type tb_users = $Result.DefaultSelection<Prisma.$tb_usersPayload>
/**
 * Model tb_balance_adjustment
 * 
 */
export type tb_balance_adjustment = $Result.DefaultSelection<Prisma.$tb_balance_adjustmentPayload>
/**
 * Model tb_leave_log
 * 
 */
export type tb_leave_log = $Result.DefaultSelection<Prisma.$tb_leave_logPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const applicable_gender: {
  m: 'm',
  f: 'f',
  mf: 'mf'
};

export type applicable_gender = (typeof applicable_gender)[keyof typeof applicable_gender]


export const gender: {
  male: 'male',
  female: 'female'
};

export type gender = (typeof gender)[keyof typeof gender]


export const leave_type: {
  personal_leave: 'personal_leave',
  mandatory_leave: 'mandatory_leave',
  special_leave: 'special_leave'
};

export type leave_type = (typeof leave_type)[keyof typeof leave_type]


export const role: {
  karyawan_tetap: 'karyawan_tetap',
  karyawan_kontrak: 'karyawan_kontrak',
  magang: 'magang',
  admin: 'admin',
  super_admin: 'super_admin'
};

export type role = (typeof role)[keyof typeof role]


export const status: {
  pending: 'pending',
  approved: 'approved',
  rejected: 'rejected'
};

export type status = (typeof status)[keyof typeof status]


export const status_active: {
  active: 'active',
  resign: 'resign'
};

export type status_active = (typeof status_active)[keyof typeof status_active]

}

export type applicable_gender = $Enums.applicable_gender

export const applicable_gender: typeof $Enums.applicable_gender

export type gender = $Enums.gender

export const gender: typeof $Enums.gender

export type leave_type = $Enums.leave_type

export const leave_type: typeof $Enums.leave_type

export type role = $Enums.role

export const role: typeof $Enums.role

export type status = $Enums.status

export const status: typeof $Enums.status

export type status_active = $Enums.status_active

export const status_active: typeof $Enums.status_active

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Tb_balances
 * const tb_balances = await prisma.tb_balance.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Tb_balances
   * const tb_balances = await prisma.tb_balance.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.tb_balance`: Exposes CRUD operations for the **tb_balance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tb_balances
    * const tb_balances = await prisma.tb_balance.findMany()
    * ```
    */
  get tb_balance(): Prisma.tb_balanceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tb_leave`: Exposes CRUD operations for the **tb_leave** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tb_leaves
    * const tb_leaves = await prisma.tb_leave.findMany()
    * ```
    */
  get tb_leave(): Prisma.tb_leaveDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tb_mandatory_leave`: Exposes CRUD operations for the **tb_mandatory_leave** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tb_mandatory_leaves
    * const tb_mandatory_leaves = await prisma.tb_mandatory_leave.findMany()
    * ```
    */
  get tb_mandatory_leave(): Prisma.tb_mandatory_leaveDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tb_special_leave`: Exposes CRUD operations for the **tb_special_leave** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tb_special_leaves
    * const tb_special_leaves = await prisma.tb_special_leave.findMany()
    * ```
    */
  get tb_special_leave(): Prisma.tb_special_leaveDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tb_users`: Exposes CRUD operations for the **tb_users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tb_users
    * const tb_users = await prisma.tb_users.findMany()
    * ```
    */
  get tb_users(): Prisma.tb_usersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tb_balance_adjustment`: Exposes CRUD operations for the **tb_balance_adjustment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tb_balance_adjustments
    * const tb_balance_adjustments = await prisma.tb_balance_adjustment.findMany()
    * ```
    */
  get tb_balance_adjustment(): Prisma.tb_balance_adjustmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tb_leave_log`: Exposes CRUD operations for the **tb_leave_log** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tb_leave_logs
    * const tb_leave_logs = await prisma.tb_leave_log.findMany()
    * ```
    */
  get tb_leave_log(): Prisma.tb_leave_logDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.11.1
   * Query Engine version: f40f79ec31188888a2e33acda0ecc8fd10a853a9
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    tb_balance: 'tb_balance',
    tb_leave: 'tb_leave',
    tb_mandatory_leave: 'tb_mandatory_leave',
    tb_special_leave: 'tb_special_leave',
    tb_users: 'tb_users',
    tb_balance_adjustment: 'tb_balance_adjustment',
    tb_leave_log: 'tb_leave_log'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "tb_balance" | "tb_leave" | "tb_mandatory_leave" | "tb_special_leave" | "tb_users" | "tb_balance_adjustment" | "tb_leave_log"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      tb_balance: {
        payload: Prisma.$tb_balancePayload<ExtArgs>
        fields: Prisma.tb_balanceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.tb_balanceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_balancePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.tb_balanceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_balancePayload>
          }
          findFirst: {
            args: Prisma.tb_balanceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_balancePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.tb_balanceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_balancePayload>
          }
          findMany: {
            args: Prisma.tb_balanceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_balancePayload>[]
          }
          create: {
            args: Prisma.tb_balanceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_balancePayload>
          }
          createMany: {
            args: Prisma.tb_balanceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.tb_balanceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_balancePayload>[]
          }
          delete: {
            args: Prisma.tb_balanceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_balancePayload>
          }
          update: {
            args: Prisma.tb_balanceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_balancePayload>
          }
          deleteMany: {
            args: Prisma.tb_balanceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.tb_balanceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.tb_balanceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_balancePayload>[]
          }
          upsert: {
            args: Prisma.tb_balanceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_balancePayload>
          }
          aggregate: {
            args: Prisma.Tb_balanceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTb_balance>
          }
          groupBy: {
            args: Prisma.tb_balanceGroupByArgs<ExtArgs>
            result: $Utils.Optional<Tb_balanceGroupByOutputType>[]
          }
          count: {
            args: Prisma.tb_balanceCountArgs<ExtArgs>
            result: $Utils.Optional<Tb_balanceCountAggregateOutputType> | number
          }
        }
      }
      tb_leave: {
        payload: Prisma.$tb_leavePayload<ExtArgs>
        fields: Prisma.tb_leaveFieldRefs
        operations: {
          findUnique: {
            args: Prisma.tb_leaveFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_leavePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.tb_leaveFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_leavePayload>
          }
          findFirst: {
            args: Prisma.tb_leaveFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_leavePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.tb_leaveFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_leavePayload>
          }
          findMany: {
            args: Prisma.tb_leaveFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_leavePayload>[]
          }
          create: {
            args: Prisma.tb_leaveCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_leavePayload>
          }
          createMany: {
            args: Prisma.tb_leaveCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.tb_leaveCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_leavePayload>[]
          }
          delete: {
            args: Prisma.tb_leaveDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_leavePayload>
          }
          update: {
            args: Prisma.tb_leaveUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_leavePayload>
          }
          deleteMany: {
            args: Prisma.tb_leaveDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.tb_leaveUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.tb_leaveUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_leavePayload>[]
          }
          upsert: {
            args: Prisma.tb_leaveUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_leavePayload>
          }
          aggregate: {
            args: Prisma.Tb_leaveAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTb_leave>
          }
          groupBy: {
            args: Prisma.tb_leaveGroupByArgs<ExtArgs>
            result: $Utils.Optional<Tb_leaveGroupByOutputType>[]
          }
          count: {
            args: Prisma.tb_leaveCountArgs<ExtArgs>
            result: $Utils.Optional<Tb_leaveCountAggregateOutputType> | number
          }
        }
      }
      tb_mandatory_leave: {
        payload: Prisma.$tb_mandatory_leavePayload<ExtArgs>
        fields: Prisma.tb_mandatory_leaveFieldRefs
        operations: {
          findUnique: {
            args: Prisma.tb_mandatory_leaveFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_mandatory_leavePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.tb_mandatory_leaveFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_mandatory_leavePayload>
          }
          findFirst: {
            args: Prisma.tb_mandatory_leaveFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_mandatory_leavePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.tb_mandatory_leaveFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_mandatory_leavePayload>
          }
          findMany: {
            args: Prisma.tb_mandatory_leaveFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_mandatory_leavePayload>[]
          }
          create: {
            args: Prisma.tb_mandatory_leaveCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_mandatory_leavePayload>
          }
          createMany: {
            args: Prisma.tb_mandatory_leaveCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.tb_mandatory_leaveCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_mandatory_leavePayload>[]
          }
          delete: {
            args: Prisma.tb_mandatory_leaveDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_mandatory_leavePayload>
          }
          update: {
            args: Prisma.tb_mandatory_leaveUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_mandatory_leavePayload>
          }
          deleteMany: {
            args: Prisma.tb_mandatory_leaveDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.tb_mandatory_leaveUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.tb_mandatory_leaveUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_mandatory_leavePayload>[]
          }
          upsert: {
            args: Prisma.tb_mandatory_leaveUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_mandatory_leavePayload>
          }
          aggregate: {
            args: Prisma.Tb_mandatory_leaveAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTb_mandatory_leave>
          }
          groupBy: {
            args: Prisma.tb_mandatory_leaveGroupByArgs<ExtArgs>
            result: $Utils.Optional<Tb_mandatory_leaveGroupByOutputType>[]
          }
          count: {
            args: Prisma.tb_mandatory_leaveCountArgs<ExtArgs>
            result: $Utils.Optional<Tb_mandatory_leaveCountAggregateOutputType> | number
          }
        }
      }
      tb_special_leave: {
        payload: Prisma.$tb_special_leavePayload<ExtArgs>
        fields: Prisma.tb_special_leaveFieldRefs
        operations: {
          findUnique: {
            args: Prisma.tb_special_leaveFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_special_leavePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.tb_special_leaveFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_special_leavePayload>
          }
          findFirst: {
            args: Prisma.tb_special_leaveFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_special_leavePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.tb_special_leaveFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_special_leavePayload>
          }
          findMany: {
            args: Prisma.tb_special_leaveFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_special_leavePayload>[]
          }
          create: {
            args: Prisma.tb_special_leaveCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_special_leavePayload>
          }
          createMany: {
            args: Prisma.tb_special_leaveCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.tb_special_leaveCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_special_leavePayload>[]
          }
          delete: {
            args: Prisma.tb_special_leaveDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_special_leavePayload>
          }
          update: {
            args: Prisma.tb_special_leaveUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_special_leavePayload>
          }
          deleteMany: {
            args: Prisma.tb_special_leaveDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.tb_special_leaveUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.tb_special_leaveUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_special_leavePayload>[]
          }
          upsert: {
            args: Prisma.tb_special_leaveUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_special_leavePayload>
          }
          aggregate: {
            args: Prisma.Tb_special_leaveAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTb_special_leave>
          }
          groupBy: {
            args: Prisma.tb_special_leaveGroupByArgs<ExtArgs>
            result: $Utils.Optional<Tb_special_leaveGroupByOutputType>[]
          }
          count: {
            args: Prisma.tb_special_leaveCountArgs<ExtArgs>
            result: $Utils.Optional<Tb_special_leaveCountAggregateOutputType> | number
          }
        }
      }
      tb_users: {
        payload: Prisma.$tb_usersPayload<ExtArgs>
        fields: Prisma.tb_usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.tb_usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.tb_usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_usersPayload>
          }
          findFirst: {
            args: Prisma.tb_usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.tb_usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_usersPayload>
          }
          findMany: {
            args: Prisma.tb_usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_usersPayload>[]
          }
          create: {
            args: Prisma.tb_usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_usersPayload>
          }
          createMany: {
            args: Prisma.tb_usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.tb_usersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_usersPayload>[]
          }
          delete: {
            args: Prisma.tb_usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_usersPayload>
          }
          update: {
            args: Prisma.tb_usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_usersPayload>
          }
          deleteMany: {
            args: Prisma.tb_usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.tb_usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.tb_usersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_usersPayload>[]
          }
          upsert: {
            args: Prisma.tb_usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_usersPayload>
          }
          aggregate: {
            args: Prisma.Tb_usersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTb_users>
          }
          groupBy: {
            args: Prisma.tb_usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<Tb_usersGroupByOutputType>[]
          }
          count: {
            args: Prisma.tb_usersCountArgs<ExtArgs>
            result: $Utils.Optional<Tb_usersCountAggregateOutputType> | number
          }
        }
      }
      tb_balance_adjustment: {
        payload: Prisma.$tb_balance_adjustmentPayload<ExtArgs>
        fields: Prisma.tb_balance_adjustmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.tb_balance_adjustmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_balance_adjustmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.tb_balance_adjustmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_balance_adjustmentPayload>
          }
          findFirst: {
            args: Prisma.tb_balance_adjustmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_balance_adjustmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.tb_balance_adjustmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_balance_adjustmentPayload>
          }
          findMany: {
            args: Prisma.tb_balance_adjustmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_balance_adjustmentPayload>[]
          }
          create: {
            args: Prisma.tb_balance_adjustmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_balance_adjustmentPayload>
          }
          createMany: {
            args: Prisma.tb_balance_adjustmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.tb_balance_adjustmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_balance_adjustmentPayload>[]
          }
          delete: {
            args: Prisma.tb_balance_adjustmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_balance_adjustmentPayload>
          }
          update: {
            args: Prisma.tb_balance_adjustmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_balance_adjustmentPayload>
          }
          deleteMany: {
            args: Prisma.tb_balance_adjustmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.tb_balance_adjustmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.tb_balance_adjustmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_balance_adjustmentPayload>[]
          }
          upsert: {
            args: Prisma.tb_balance_adjustmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_balance_adjustmentPayload>
          }
          aggregate: {
            args: Prisma.Tb_balance_adjustmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTb_balance_adjustment>
          }
          groupBy: {
            args: Prisma.tb_balance_adjustmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<Tb_balance_adjustmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.tb_balance_adjustmentCountArgs<ExtArgs>
            result: $Utils.Optional<Tb_balance_adjustmentCountAggregateOutputType> | number
          }
        }
      }
      tb_leave_log: {
        payload: Prisma.$tb_leave_logPayload<ExtArgs>
        fields: Prisma.tb_leave_logFieldRefs
        operations: {
          findUnique: {
            args: Prisma.tb_leave_logFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_leave_logPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.tb_leave_logFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_leave_logPayload>
          }
          findFirst: {
            args: Prisma.tb_leave_logFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_leave_logPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.tb_leave_logFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_leave_logPayload>
          }
          findMany: {
            args: Prisma.tb_leave_logFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_leave_logPayload>[]
          }
          create: {
            args: Prisma.tb_leave_logCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_leave_logPayload>
          }
          createMany: {
            args: Prisma.tb_leave_logCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.tb_leave_logCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_leave_logPayload>[]
          }
          delete: {
            args: Prisma.tb_leave_logDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_leave_logPayload>
          }
          update: {
            args: Prisma.tb_leave_logUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_leave_logPayload>
          }
          deleteMany: {
            args: Prisma.tb_leave_logDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.tb_leave_logUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.tb_leave_logUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_leave_logPayload>[]
          }
          upsert: {
            args: Prisma.tb_leave_logUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tb_leave_logPayload>
          }
          aggregate: {
            args: Prisma.Tb_leave_logAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTb_leave_log>
          }
          groupBy: {
            args: Prisma.tb_leave_logGroupByArgs<ExtArgs>
            result: $Utils.Optional<Tb_leave_logGroupByOutputType>[]
          }
          count: {
            args: Prisma.tb_leave_logCountArgs<ExtArgs>
            result: $Utils.Optional<Tb_leave_logCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    tb_balance?: tb_balanceOmit
    tb_leave?: tb_leaveOmit
    tb_mandatory_leave?: tb_mandatory_leaveOmit
    tb_special_leave?: tb_special_leaveOmit
    tb_users?: tb_usersOmit
    tb_balance_adjustment?: tb_balance_adjustmentOmit
    tb_leave_log?: tb_leave_logOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type Tb_leaveCountOutputType
   */

  export type Tb_leaveCountOutputType = {
    tb_leave_log: number
  }

  export type Tb_leaveCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tb_leave_log?: boolean | Tb_leaveCountOutputTypeCountTb_leave_logArgs
  }

  // Custom InputTypes
  /**
   * Tb_leaveCountOutputType without action
   */
  export type Tb_leaveCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tb_leaveCountOutputType
     */
    select?: Tb_leaveCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Tb_leaveCountOutputType without action
   */
  export type Tb_leaveCountOutputTypeCountTb_leave_logArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tb_leave_logWhereInput
  }


  /**
   * Count Type Tb_mandatory_leaveCountOutputType
   */

  export type Tb_mandatory_leaveCountOutputType = {
    tb_leave: number
  }

  export type Tb_mandatory_leaveCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tb_leave?: boolean | Tb_mandatory_leaveCountOutputTypeCountTb_leaveArgs
  }

  // Custom InputTypes
  /**
   * Tb_mandatory_leaveCountOutputType without action
   */
  export type Tb_mandatory_leaveCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tb_mandatory_leaveCountOutputType
     */
    select?: Tb_mandatory_leaveCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Tb_mandatory_leaveCountOutputType without action
   */
  export type Tb_mandatory_leaveCountOutputTypeCountTb_leaveArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tb_leaveWhereInput
  }


  /**
   * Count Type Tb_special_leaveCountOutputType
   */

  export type Tb_special_leaveCountOutputType = {
    tb_leave: number
  }

  export type Tb_special_leaveCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tb_leave?: boolean | Tb_special_leaveCountOutputTypeCountTb_leaveArgs
  }

  // Custom InputTypes
  /**
   * Tb_special_leaveCountOutputType without action
   */
  export type Tb_special_leaveCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tb_special_leaveCountOutputType
     */
    select?: Tb_special_leaveCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Tb_special_leaveCountOutputType without action
   */
  export type Tb_special_leaveCountOutputTypeCountTb_leaveArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tb_leaveWhereInput
  }


  /**
   * Count Type Tb_usersCountOutputType
   */

  export type Tb_usersCountOutputType = {
    tb_balance: number
    tb_balance_adjustment: number
    tb_leave: number
  }

  export type Tb_usersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tb_balance?: boolean | Tb_usersCountOutputTypeCountTb_balanceArgs
    tb_balance_adjustment?: boolean | Tb_usersCountOutputTypeCountTb_balance_adjustmentArgs
    tb_leave?: boolean | Tb_usersCountOutputTypeCountTb_leaveArgs
  }

  // Custom InputTypes
  /**
   * Tb_usersCountOutputType without action
   */
  export type Tb_usersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tb_usersCountOutputType
     */
    select?: Tb_usersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Tb_usersCountOutputType without action
   */
  export type Tb_usersCountOutputTypeCountTb_balanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tb_balanceWhereInput
  }

  /**
   * Tb_usersCountOutputType without action
   */
  export type Tb_usersCountOutputTypeCountTb_balance_adjustmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tb_balance_adjustmentWhereInput
  }

  /**
   * Tb_usersCountOutputType without action
   */
  export type Tb_usersCountOutputTypeCountTb_leaveArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tb_leaveWhereInput
  }


  /**
   * Models
   */

  /**
   * Model tb_balance
   */

  export type AggregateTb_balance = {
    _count: Tb_balanceCountAggregateOutputType | null
    _avg: Tb_balanceAvgAggregateOutputType | null
    _sum: Tb_balanceSumAggregateOutputType | null
    _min: Tb_balanceMinAggregateOutputType | null
    _max: Tb_balanceMaxAggregateOutputType | null
  }

  export type Tb_balanceAvgAggregateOutputType = {
    amount: number | null
  }

  export type Tb_balanceSumAggregateOutputType = {
    amount: number | null
  }

  export type Tb_balanceMinAggregateOutputType = {
    id_balance: string | null
    amount: number | null
    receive_date: Date | null
    expired_date: Date | null
    NIK: string | null
  }

  export type Tb_balanceMaxAggregateOutputType = {
    id_balance: string | null
    amount: number | null
    receive_date: Date | null
    expired_date: Date | null
    NIK: string | null
  }

  export type Tb_balanceCountAggregateOutputType = {
    id_balance: number
    amount: number
    receive_date: number
    expired_date: number
    NIK: number
    _all: number
  }


  export type Tb_balanceAvgAggregateInputType = {
    amount?: true
  }

  export type Tb_balanceSumAggregateInputType = {
    amount?: true
  }

  export type Tb_balanceMinAggregateInputType = {
    id_balance?: true
    amount?: true
    receive_date?: true
    expired_date?: true
    NIK?: true
  }

  export type Tb_balanceMaxAggregateInputType = {
    id_balance?: true
    amount?: true
    receive_date?: true
    expired_date?: true
    NIK?: true
  }

  export type Tb_balanceCountAggregateInputType = {
    id_balance?: true
    amount?: true
    receive_date?: true
    expired_date?: true
    NIK?: true
    _all?: true
  }

  export type Tb_balanceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tb_balance to aggregate.
     */
    where?: tb_balanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tb_balances to fetch.
     */
    orderBy?: tb_balanceOrderByWithRelationInput | tb_balanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: tb_balanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tb_balances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tb_balances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned tb_balances
    **/
    _count?: true | Tb_balanceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Tb_balanceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Tb_balanceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Tb_balanceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Tb_balanceMaxAggregateInputType
  }

  export type GetTb_balanceAggregateType<T extends Tb_balanceAggregateArgs> = {
        [P in keyof T & keyof AggregateTb_balance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTb_balance[P]>
      : GetScalarType<T[P], AggregateTb_balance[P]>
  }




  export type tb_balanceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tb_balanceWhereInput
    orderBy?: tb_balanceOrderByWithAggregationInput | tb_balanceOrderByWithAggregationInput[]
    by: Tb_balanceScalarFieldEnum[] | Tb_balanceScalarFieldEnum
    having?: tb_balanceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Tb_balanceCountAggregateInputType | true
    _avg?: Tb_balanceAvgAggregateInputType
    _sum?: Tb_balanceSumAggregateInputType
    _min?: Tb_balanceMinAggregateInputType
    _max?: Tb_balanceMaxAggregateInputType
  }

  export type Tb_balanceGroupByOutputType = {
    id_balance: string
    amount: number
    receive_date: Date
    expired_date: Date
    NIK: string
    _count: Tb_balanceCountAggregateOutputType | null
    _avg: Tb_balanceAvgAggregateOutputType | null
    _sum: Tb_balanceSumAggregateOutputType | null
    _min: Tb_balanceMinAggregateOutputType | null
    _max: Tb_balanceMaxAggregateOutputType | null
  }

  type GetTb_balanceGroupByPayload<T extends tb_balanceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Tb_balanceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Tb_balanceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Tb_balanceGroupByOutputType[P]>
            : GetScalarType<T[P], Tb_balanceGroupByOutputType[P]>
        }
      >
    >


  export type tb_balanceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_balance?: boolean
    amount?: boolean
    receive_date?: boolean
    expired_date?: boolean
    NIK?: boolean
    tb_users?: boolean | tb_usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tb_balance"]>

  export type tb_balanceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_balance?: boolean
    amount?: boolean
    receive_date?: boolean
    expired_date?: boolean
    NIK?: boolean
    tb_users?: boolean | tb_usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tb_balance"]>

  export type tb_balanceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_balance?: boolean
    amount?: boolean
    receive_date?: boolean
    expired_date?: boolean
    NIK?: boolean
    tb_users?: boolean | tb_usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tb_balance"]>

  export type tb_balanceSelectScalar = {
    id_balance?: boolean
    amount?: boolean
    receive_date?: boolean
    expired_date?: boolean
    NIK?: boolean
  }

  export type tb_balanceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_balance" | "amount" | "receive_date" | "expired_date" | "NIK", ExtArgs["result"]["tb_balance"]>
  export type tb_balanceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tb_users?: boolean | tb_usersDefaultArgs<ExtArgs>
  }
  export type tb_balanceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tb_users?: boolean | tb_usersDefaultArgs<ExtArgs>
  }
  export type tb_balanceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tb_users?: boolean | tb_usersDefaultArgs<ExtArgs>
  }

  export type $tb_balancePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "tb_balance"
    objects: {
      tb_users: Prisma.$tb_usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id_balance: string
      amount: number
      receive_date: Date
      expired_date: Date
      NIK: string
    }, ExtArgs["result"]["tb_balance"]>
    composites: {}
  }

  type tb_balanceGetPayload<S extends boolean | null | undefined | tb_balanceDefaultArgs> = $Result.GetResult<Prisma.$tb_balancePayload, S>

  type tb_balanceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<tb_balanceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Tb_balanceCountAggregateInputType | true
    }

  export interface tb_balanceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['tb_balance'], meta: { name: 'tb_balance' } }
    /**
     * Find zero or one Tb_balance that matches the filter.
     * @param {tb_balanceFindUniqueArgs} args - Arguments to find a Tb_balance
     * @example
     * // Get one Tb_balance
     * const tb_balance = await prisma.tb_balance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends tb_balanceFindUniqueArgs>(args: SelectSubset<T, tb_balanceFindUniqueArgs<ExtArgs>>): Prisma__tb_balanceClient<$Result.GetResult<Prisma.$tb_balancePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tb_balance that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {tb_balanceFindUniqueOrThrowArgs} args - Arguments to find a Tb_balance
     * @example
     * // Get one Tb_balance
     * const tb_balance = await prisma.tb_balance.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends tb_balanceFindUniqueOrThrowArgs>(args: SelectSubset<T, tb_balanceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__tb_balanceClient<$Result.GetResult<Prisma.$tb_balancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tb_balance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tb_balanceFindFirstArgs} args - Arguments to find a Tb_balance
     * @example
     * // Get one Tb_balance
     * const tb_balance = await prisma.tb_balance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends tb_balanceFindFirstArgs>(args?: SelectSubset<T, tb_balanceFindFirstArgs<ExtArgs>>): Prisma__tb_balanceClient<$Result.GetResult<Prisma.$tb_balancePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tb_balance that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tb_balanceFindFirstOrThrowArgs} args - Arguments to find a Tb_balance
     * @example
     * // Get one Tb_balance
     * const tb_balance = await prisma.tb_balance.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends tb_balanceFindFirstOrThrowArgs>(args?: SelectSubset<T, tb_balanceFindFirstOrThrowArgs<ExtArgs>>): Prisma__tb_balanceClient<$Result.GetResult<Prisma.$tb_balancePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tb_balances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tb_balanceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tb_balances
     * const tb_balances = await prisma.tb_balance.findMany()
     * 
     * // Get first 10 Tb_balances
     * const tb_balances = await prisma.tb_balance.findMany({ take: 10 })
     * 
     * // Only select the `id_balance`
     * const tb_balanceWithId_balanceOnly = await prisma.tb_balance.findMany({ select: { id_balance: true } })
     * 
     */
    findMany<T extends tb_balanceFindManyArgs>(args?: SelectSubset<T, tb_balanceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tb_balancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tb_balance.
     * @param {tb_balanceCreateArgs} args - Arguments to create a Tb_balance.
     * @example
     * // Create one Tb_balance
     * const Tb_balance = await prisma.tb_balance.create({
     *   data: {
     *     // ... data to create a Tb_balance
     *   }
     * })
     * 
     */
    create<T extends tb_balanceCreateArgs>(args: SelectSubset<T, tb_balanceCreateArgs<ExtArgs>>): Prisma__tb_balanceClient<$Result.GetResult<Prisma.$tb_balancePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tb_balances.
     * @param {tb_balanceCreateManyArgs} args - Arguments to create many Tb_balances.
     * @example
     * // Create many Tb_balances
     * const tb_balance = await prisma.tb_balance.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends tb_balanceCreateManyArgs>(args?: SelectSubset<T, tb_balanceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tb_balances and returns the data saved in the database.
     * @param {tb_balanceCreateManyAndReturnArgs} args - Arguments to create many Tb_balances.
     * @example
     * // Create many Tb_balances
     * const tb_balance = await prisma.tb_balance.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tb_balances and only return the `id_balance`
     * const tb_balanceWithId_balanceOnly = await prisma.tb_balance.createManyAndReturn({
     *   select: { id_balance: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends tb_balanceCreateManyAndReturnArgs>(args?: SelectSubset<T, tb_balanceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tb_balancePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tb_balance.
     * @param {tb_balanceDeleteArgs} args - Arguments to delete one Tb_balance.
     * @example
     * // Delete one Tb_balance
     * const Tb_balance = await prisma.tb_balance.delete({
     *   where: {
     *     // ... filter to delete one Tb_balance
     *   }
     * })
     * 
     */
    delete<T extends tb_balanceDeleteArgs>(args: SelectSubset<T, tb_balanceDeleteArgs<ExtArgs>>): Prisma__tb_balanceClient<$Result.GetResult<Prisma.$tb_balancePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tb_balance.
     * @param {tb_balanceUpdateArgs} args - Arguments to update one Tb_balance.
     * @example
     * // Update one Tb_balance
     * const tb_balance = await prisma.tb_balance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends tb_balanceUpdateArgs>(args: SelectSubset<T, tb_balanceUpdateArgs<ExtArgs>>): Prisma__tb_balanceClient<$Result.GetResult<Prisma.$tb_balancePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tb_balances.
     * @param {tb_balanceDeleteManyArgs} args - Arguments to filter Tb_balances to delete.
     * @example
     * // Delete a few Tb_balances
     * const { count } = await prisma.tb_balance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends tb_balanceDeleteManyArgs>(args?: SelectSubset<T, tb_balanceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tb_balances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tb_balanceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tb_balances
     * const tb_balance = await prisma.tb_balance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends tb_balanceUpdateManyArgs>(args: SelectSubset<T, tb_balanceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tb_balances and returns the data updated in the database.
     * @param {tb_balanceUpdateManyAndReturnArgs} args - Arguments to update many Tb_balances.
     * @example
     * // Update many Tb_balances
     * const tb_balance = await prisma.tb_balance.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tb_balances and only return the `id_balance`
     * const tb_balanceWithId_balanceOnly = await prisma.tb_balance.updateManyAndReturn({
     *   select: { id_balance: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends tb_balanceUpdateManyAndReturnArgs>(args: SelectSubset<T, tb_balanceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tb_balancePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tb_balance.
     * @param {tb_balanceUpsertArgs} args - Arguments to update or create a Tb_balance.
     * @example
     * // Update or create a Tb_balance
     * const tb_balance = await prisma.tb_balance.upsert({
     *   create: {
     *     // ... data to create a Tb_balance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tb_balance we want to update
     *   }
     * })
     */
    upsert<T extends tb_balanceUpsertArgs>(args: SelectSubset<T, tb_balanceUpsertArgs<ExtArgs>>): Prisma__tb_balanceClient<$Result.GetResult<Prisma.$tb_balancePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tb_balances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tb_balanceCountArgs} args - Arguments to filter Tb_balances to count.
     * @example
     * // Count the number of Tb_balances
     * const count = await prisma.tb_balance.count({
     *   where: {
     *     // ... the filter for the Tb_balances we want to count
     *   }
     * })
    **/
    count<T extends tb_balanceCountArgs>(
      args?: Subset<T, tb_balanceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Tb_balanceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tb_balance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Tb_balanceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Tb_balanceAggregateArgs>(args: Subset<T, Tb_balanceAggregateArgs>): Prisma.PrismaPromise<GetTb_balanceAggregateType<T>>

    /**
     * Group by Tb_balance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tb_balanceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends tb_balanceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: tb_balanceGroupByArgs['orderBy'] }
        : { orderBy?: tb_balanceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, tb_balanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTb_balanceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the tb_balance model
   */
  readonly fields: tb_balanceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for tb_balance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__tb_balanceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tb_users<T extends tb_usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, tb_usersDefaultArgs<ExtArgs>>): Prisma__tb_usersClient<$Result.GetResult<Prisma.$tb_usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the tb_balance model
   */
  interface tb_balanceFieldRefs {
    readonly id_balance: FieldRef<"tb_balance", 'String'>
    readonly amount: FieldRef<"tb_balance", 'Int'>
    readonly receive_date: FieldRef<"tb_balance", 'DateTime'>
    readonly expired_date: FieldRef<"tb_balance", 'DateTime'>
    readonly NIK: FieldRef<"tb_balance", 'String'>
  }
    

  // Custom InputTypes
  /**
   * tb_balance findUnique
   */
  export type tb_balanceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_balance
     */
    select?: tb_balanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_balance
     */
    omit?: tb_balanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_balanceInclude<ExtArgs> | null
    /**
     * Filter, which tb_balance to fetch.
     */
    where: tb_balanceWhereUniqueInput
  }

  /**
   * tb_balance findUniqueOrThrow
   */
  export type tb_balanceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_balance
     */
    select?: tb_balanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_balance
     */
    omit?: tb_balanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_balanceInclude<ExtArgs> | null
    /**
     * Filter, which tb_balance to fetch.
     */
    where: tb_balanceWhereUniqueInput
  }

  /**
   * tb_balance findFirst
   */
  export type tb_balanceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_balance
     */
    select?: tb_balanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_balance
     */
    omit?: tb_balanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_balanceInclude<ExtArgs> | null
    /**
     * Filter, which tb_balance to fetch.
     */
    where?: tb_balanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tb_balances to fetch.
     */
    orderBy?: tb_balanceOrderByWithRelationInput | tb_balanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tb_balances.
     */
    cursor?: tb_balanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tb_balances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tb_balances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tb_balances.
     */
    distinct?: Tb_balanceScalarFieldEnum | Tb_balanceScalarFieldEnum[]
  }

  /**
   * tb_balance findFirstOrThrow
   */
  export type tb_balanceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_balance
     */
    select?: tb_balanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_balance
     */
    omit?: tb_balanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_balanceInclude<ExtArgs> | null
    /**
     * Filter, which tb_balance to fetch.
     */
    where?: tb_balanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tb_balances to fetch.
     */
    orderBy?: tb_balanceOrderByWithRelationInput | tb_balanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tb_balances.
     */
    cursor?: tb_balanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tb_balances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tb_balances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tb_balances.
     */
    distinct?: Tb_balanceScalarFieldEnum | Tb_balanceScalarFieldEnum[]
  }

  /**
   * tb_balance findMany
   */
  export type tb_balanceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_balance
     */
    select?: tb_balanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_balance
     */
    omit?: tb_balanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_balanceInclude<ExtArgs> | null
    /**
     * Filter, which tb_balances to fetch.
     */
    where?: tb_balanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tb_balances to fetch.
     */
    orderBy?: tb_balanceOrderByWithRelationInput | tb_balanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing tb_balances.
     */
    cursor?: tb_balanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tb_balances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tb_balances.
     */
    skip?: number
    distinct?: Tb_balanceScalarFieldEnum | Tb_balanceScalarFieldEnum[]
  }

  /**
   * tb_balance create
   */
  export type tb_balanceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_balance
     */
    select?: tb_balanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_balance
     */
    omit?: tb_balanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_balanceInclude<ExtArgs> | null
    /**
     * The data needed to create a tb_balance.
     */
    data: XOR<tb_balanceCreateInput, tb_balanceUncheckedCreateInput>
  }

  /**
   * tb_balance createMany
   */
  export type tb_balanceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many tb_balances.
     */
    data: tb_balanceCreateManyInput | tb_balanceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * tb_balance createManyAndReturn
   */
  export type tb_balanceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_balance
     */
    select?: tb_balanceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the tb_balance
     */
    omit?: tb_balanceOmit<ExtArgs> | null
    /**
     * The data used to create many tb_balances.
     */
    data: tb_balanceCreateManyInput | tb_balanceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_balanceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * tb_balance update
   */
  export type tb_balanceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_balance
     */
    select?: tb_balanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_balance
     */
    omit?: tb_balanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_balanceInclude<ExtArgs> | null
    /**
     * The data needed to update a tb_balance.
     */
    data: XOR<tb_balanceUpdateInput, tb_balanceUncheckedUpdateInput>
    /**
     * Choose, which tb_balance to update.
     */
    where: tb_balanceWhereUniqueInput
  }

  /**
   * tb_balance updateMany
   */
  export type tb_balanceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update tb_balances.
     */
    data: XOR<tb_balanceUpdateManyMutationInput, tb_balanceUncheckedUpdateManyInput>
    /**
     * Filter which tb_balances to update
     */
    where?: tb_balanceWhereInput
    /**
     * Limit how many tb_balances to update.
     */
    limit?: number
  }

  /**
   * tb_balance updateManyAndReturn
   */
  export type tb_balanceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_balance
     */
    select?: tb_balanceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the tb_balance
     */
    omit?: tb_balanceOmit<ExtArgs> | null
    /**
     * The data used to update tb_balances.
     */
    data: XOR<tb_balanceUpdateManyMutationInput, tb_balanceUncheckedUpdateManyInput>
    /**
     * Filter which tb_balances to update
     */
    where?: tb_balanceWhereInput
    /**
     * Limit how many tb_balances to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_balanceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * tb_balance upsert
   */
  export type tb_balanceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_balance
     */
    select?: tb_balanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_balance
     */
    omit?: tb_balanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_balanceInclude<ExtArgs> | null
    /**
     * The filter to search for the tb_balance to update in case it exists.
     */
    where: tb_balanceWhereUniqueInput
    /**
     * In case the tb_balance found by the `where` argument doesn't exist, create a new tb_balance with this data.
     */
    create: XOR<tb_balanceCreateInput, tb_balanceUncheckedCreateInput>
    /**
     * In case the tb_balance was found with the provided `where` argument, update it with this data.
     */
    update: XOR<tb_balanceUpdateInput, tb_balanceUncheckedUpdateInput>
  }

  /**
   * tb_balance delete
   */
  export type tb_balanceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_balance
     */
    select?: tb_balanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_balance
     */
    omit?: tb_balanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_balanceInclude<ExtArgs> | null
    /**
     * Filter which tb_balance to delete.
     */
    where: tb_balanceWhereUniqueInput
  }

  /**
   * tb_balance deleteMany
   */
  export type tb_balanceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tb_balances to delete
     */
    where?: tb_balanceWhereInput
    /**
     * Limit how many tb_balances to delete.
     */
    limit?: number
  }

  /**
   * tb_balance without action
   */
  export type tb_balanceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_balance
     */
    select?: tb_balanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_balance
     */
    omit?: tb_balanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_balanceInclude<ExtArgs> | null
  }


  /**
   * Model tb_leave
   */

  export type AggregateTb_leave = {
    _count: Tb_leaveCountAggregateOutputType | null
    _avg: Tb_leaveAvgAggregateOutputType | null
    _sum: Tb_leaveSumAggregateOutputType | null
    _min: Tb_leaveMinAggregateOutputType | null
    _max: Tb_leaveMaxAggregateOutputType | null
  }

  export type Tb_leaveAvgAggregateOutputType = {
    total_days: number | null
  }

  export type Tb_leaveSumAggregateOutputType = {
    total_days: number | null
  }

  export type Tb_leaveMinAggregateOutputType = {
    id_leave: string | null
    title: string | null
    leave_type: $Enums.leave_type | null
    start_date: Date | null
    end_date: Date | null
    total_days: number | null
    reason: string | null
    status: $Enums.status | null
    created_at: Date | null
    NIK: string | null
    id_special: string | null
    id_mandatory: string | null
  }

  export type Tb_leaveMaxAggregateOutputType = {
    id_leave: string | null
    title: string | null
    leave_type: $Enums.leave_type | null
    start_date: Date | null
    end_date: Date | null
    total_days: number | null
    reason: string | null
    status: $Enums.status | null
    created_at: Date | null
    NIK: string | null
    id_special: string | null
    id_mandatory: string | null
  }

  export type Tb_leaveCountAggregateOutputType = {
    id_leave: number
    title: number
    leave_type: number
    start_date: number
    end_date: number
    total_days: number
    reason: number
    status: number
    created_at: number
    NIK: number
    id_special: number
    id_mandatory: number
    _all: number
  }


  export type Tb_leaveAvgAggregateInputType = {
    total_days?: true
  }

  export type Tb_leaveSumAggregateInputType = {
    total_days?: true
  }

  export type Tb_leaveMinAggregateInputType = {
    id_leave?: true
    title?: true
    leave_type?: true
    start_date?: true
    end_date?: true
    total_days?: true
    reason?: true
    status?: true
    created_at?: true
    NIK?: true
    id_special?: true
    id_mandatory?: true
  }

  export type Tb_leaveMaxAggregateInputType = {
    id_leave?: true
    title?: true
    leave_type?: true
    start_date?: true
    end_date?: true
    total_days?: true
    reason?: true
    status?: true
    created_at?: true
    NIK?: true
    id_special?: true
    id_mandatory?: true
  }

  export type Tb_leaveCountAggregateInputType = {
    id_leave?: true
    title?: true
    leave_type?: true
    start_date?: true
    end_date?: true
    total_days?: true
    reason?: true
    status?: true
    created_at?: true
    NIK?: true
    id_special?: true
    id_mandatory?: true
    _all?: true
  }

  export type Tb_leaveAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tb_leave to aggregate.
     */
    where?: tb_leaveWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tb_leaves to fetch.
     */
    orderBy?: tb_leaveOrderByWithRelationInput | tb_leaveOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: tb_leaveWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tb_leaves from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tb_leaves.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned tb_leaves
    **/
    _count?: true | Tb_leaveCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Tb_leaveAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Tb_leaveSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Tb_leaveMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Tb_leaveMaxAggregateInputType
  }

  export type GetTb_leaveAggregateType<T extends Tb_leaveAggregateArgs> = {
        [P in keyof T & keyof AggregateTb_leave]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTb_leave[P]>
      : GetScalarType<T[P], AggregateTb_leave[P]>
  }




  export type tb_leaveGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tb_leaveWhereInput
    orderBy?: tb_leaveOrderByWithAggregationInput | tb_leaveOrderByWithAggregationInput[]
    by: Tb_leaveScalarFieldEnum[] | Tb_leaveScalarFieldEnum
    having?: tb_leaveScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Tb_leaveCountAggregateInputType | true
    _avg?: Tb_leaveAvgAggregateInputType
    _sum?: Tb_leaveSumAggregateInputType
    _min?: Tb_leaveMinAggregateInputType
    _max?: Tb_leaveMaxAggregateInputType
  }

  export type Tb_leaveGroupByOutputType = {
    id_leave: string
    title: string
    leave_type: $Enums.leave_type
    start_date: Date
    end_date: Date
    total_days: number
    reason: string
    status: $Enums.status
    created_at: Date
    NIK: string
    id_special: string | null
    id_mandatory: string | null
    _count: Tb_leaveCountAggregateOutputType | null
    _avg: Tb_leaveAvgAggregateOutputType | null
    _sum: Tb_leaveSumAggregateOutputType | null
    _min: Tb_leaveMinAggregateOutputType | null
    _max: Tb_leaveMaxAggregateOutputType | null
  }

  type GetTb_leaveGroupByPayload<T extends tb_leaveGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Tb_leaveGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Tb_leaveGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Tb_leaveGroupByOutputType[P]>
            : GetScalarType<T[P], Tb_leaveGroupByOutputType[P]>
        }
      >
    >


  export type tb_leaveSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_leave?: boolean
    title?: boolean
    leave_type?: boolean
    start_date?: boolean
    end_date?: boolean
    total_days?: boolean
    reason?: boolean
    status?: boolean
    created_at?: boolean
    NIK?: boolean
    id_special?: boolean
    id_mandatory?: boolean
    tb_users?: boolean | tb_usersDefaultArgs<ExtArgs>
    tb_mandatory_leave?: boolean | tb_leave$tb_mandatory_leaveArgs<ExtArgs>
    tb_special_leave?: boolean | tb_leave$tb_special_leaveArgs<ExtArgs>
    tb_leave_log?: boolean | tb_leave$tb_leave_logArgs<ExtArgs>
    _count?: boolean | Tb_leaveCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tb_leave"]>

  export type tb_leaveSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_leave?: boolean
    title?: boolean
    leave_type?: boolean
    start_date?: boolean
    end_date?: boolean
    total_days?: boolean
    reason?: boolean
    status?: boolean
    created_at?: boolean
    NIK?: boolean
    id_special?: boolean
    id_mandatory?: boolean
    tb_users?: boolean | tb_usersDefaultArgs<ExtArgs>
    tb_mandatory_leave?: boolean | tb_leave$tb_mandatory_leaveArgs<ExtArgs>
    tb_special_leave?: boolean | tb_leave$tb_special_leaveArgs<ExtArgs>
  }, ExtArgs["result"]["tb_leave"]>

  export type tb_leaveSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_leave?: boolean
    title?: boolean
    leave_type?: boolean
    start_date?: boolean
    end_date?: boolean
    total_days?: boolean
    reason?: boolean
    status?: boolean
    created_at?: boolean
    NIK?: boolean
    id_special?: boolean
    id_mandatory?: boolean
    tb_users?: boolean | tb_usersDefaultArgs<ExtArgs>
    tb_mandatory_leave?: boolean | tb_leave$tb_mandatory_leaveArgs<ExtArgs>
    tb_special_leave?: boolean | tb_leave$tb_special_leaveArgs<ExtArgs>
  }, ExtArgs["result"]["tb_leave"]>

  export type tb_leaveSelectScalar = {
    id_leave?: boolean
    title?: boolean
    leave_type?: boolean
    start_date?: boolean
    end_date?: boolean
    total_days?: boolean
    reason?: boolean
    status?: boolean
    created_at?: boolean
    NIK?: boolean
    id_special?: boolean
    id_mandatory?: boolean
  }

  export type tb_leaveOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_leave" | "title" | "leave_type" | "start_date" | "end_date" | "total_days" | "reason" | "status" | "created_at" | "NIK" | "id_special" | "id_mandatory", ExtArgs["result"]["tb_leave"]>
  export type tb_leaveInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tb_users?: boolean | tb_usersDefaultArgs<ExtArgs>
    tb_mandatory_leave?: boolean | tb_leave$tb_mandatory_leaveArgs<ExtArgs>
    tb_special_leave?: boolean | tb_leave$tb_special_leaveArgs<ExtArgs>
    tb_leave_log?: boolean | tb_leave$tb_leave_logArgs<ExtArgs>
    _count?: boolean | Tb_leaveCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type tb_leaveIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tb_users?: boolean | tb_usersDefaultArgs<ExtArgs>
    tb_mandatory_leave?: boolean | tb_leave$tb_mandatory_leaveArgs<ExtArgs>
    tb_special_leave?: boolean | tb_leave$tb_special_leaveArgs<ExtArgs>
  }
  export type tb_leaveIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tb_users?: boolean | tb_usersDefaultArgs<ExtArgs>
    tb_mandatory_leave?: boolean | tb_leave$tb_mandatory_leaveArgs<ExtArgs>
    tb_special_leave?: boolean | tb_leave$tb_special_leaveArgs<ExtArgs>
  }

  export type $tb_leavePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "tb_leave"
    objects: {
      tb_users: Prisma.$tb_usersPayload<ExtArgs>
      tb_mandatory_leave: Prisma.$tb_mandatory_leavePayload<ExtArgs> | null
      tb_special_leave: Prisma.$tb_special_leavePayload<ExtArgs> | null
      tb_leave_log: Prisma.$tb_leave_logPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id_leave: string
      title: string
      leave_type: $Enums.leave_type
      start_date: Date
      end_date: Date
      total_days: number
      reason: string
      status: $Enums.status
      created_at: Date
      NIK: string
      id_special: string | null
      id_mandatory: string | null
    }, ExtArgs["result"]["tb_leave"]>
    composites: {}
  }

  type tb_leaveGetPayload<S extends boolean | null | undefined | tb_leaveDefaultArgs> = $Result.GetResult<Prisma.$tb_leavePayload, S>

  type tb_leaveCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<tb_leaveFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Tb_leaveCountAggregateInputType | true
    }

  export interface tb_leaveDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['tb_leave'], meta: { name: 'tb_leave' } }
    /**
     * Find zero or one Tb_leave that matches the filter.
     * @param {tb_leaveFindUniqueArgs} args - Arguments to find a Tb_leave
     * @example
     * // Get one Tb_leave
     * const tb_leave = await prisma.tb_leave.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends tb_leaveFindUniqueArgs>(args: SelectSubset<T, tb_leaveFindUniqueArgs<ExtArgs>>): Prisma__tb_leaveClient<$Result.GetResult<Prisma.$tb_leavePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tb_leave that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {tb_leaveFindUniqueOrThrowArgs} args - Arguments to find a Tb_leave
     * @example
     * // Get one Tb_leave
     * const tb_leave = await prisma.tb_leave.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends tb_leaveFindUniqueOrThrowArgs>(args: SelectSubset<T, tb_leaveFindUniqueOrThrowArgs<ExtArgs>>): Prisma__tb_leaveClient<$Result.GetResult<Prisma.$tb_leavePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tb_leave that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tb_leaveFindFirstArgs} args - Arguments to find a Tb_leave
     * @example
     * // Get one Tb_leave
     * const tb_leave = await prisma.tb_leave.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends tb_leaveFindFirstArgs>(args?: SelectSubset<T, tb_leaveFindFirstArgs<ExtArgs>>): Prisma__tb_leaveClient<$Result.GetResult<Prisma.$tb_leavePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tb_leave that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tb_leaveFindFirstOrThrowArgs} args - Arguments to find a Tb_leave
     * @example
     * // Get one Tb_leave
     * const tb_leave = await prisma.tb_leave.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends tb_leaveFindFirstOrThrowArgs>(args?: SelectSubset<T, tb_leaveFindFirstOrThrowArgs<ExtArgs>>): Prisma__tb_leaveClient<$Result.GetResult<Prisma.$tb_leavePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tb_leaves that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tb_leaveFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tb_leaves
     * const tb_leaves = await prisma.tb_leave.findMany()
     * 
     * // Get first 10 Tb_leaves
     * const tb_leaves = await prisma.tb_leave.findMany({ take: 10 })
     * 
     * // Only select the `id_leave`
     * const tb_leaveWithId_leaveOnly = await prisma.tb_leave.findMany({ select: { id_leave: true } })
     * 
     */
    findMany<T extends tb_leaveFindManyArgs>(args?: SelectSubset<T, tb_leaveFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tb_leavePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tb_leave.
     * @param {tb_leaveCreateArgs} args - Arguments to create a Tb_leave.
     * @example
     * // Create one Tb_leave
     * const Tb_leave = await prisma.tb_leave.create({
     *   data: {
     *     // ... data to create a Tb_leave
     *   }
     * })
     * 
     */
    create<T extends tb_leaveCreateArgs>(args: SelectSubset<T, tb_leaveCreateArgs<ExtArgs>>): Prisma__tb_leaveClient<$Result.GetResult<Prisma.$tb_leavePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tb_leaves.
     * @param {tb_leaveCreateManyArgs} args - Arguments to create many Tb_leaves.
     * @example
     * // Create many Tb_leaves
     * const tb_leave = await prisma.tb_leave.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends tb_leaveCreateManyArgs>(args?: SelectSubset<T, tb_leaveCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tb_leaves and returns the data saved in the database.
     * @param {tb_leaveCreateManyAndReturnArgs} args - Arguments to create many Tb_leaves.
     * @example
     * // Create many Tb_leaves
     * const tb_leave = await prisma.tb_leave.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tb_leaves and only return the `id_leave`
     * const tb_leaveWithId_leaveOnly = await prisma.tb_leave.createManyAndReturn({
     *   select: { id_leave: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends tb_leaveCreateManyAndReturnArgs>(args?: SelectSubset<T, tb_leaveCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tb_leavePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tb_leave.
     * @param {tb_leaveDeleteArgs} args - Arguments to delete one Tb_leave.
     * @example
     * // Delete one Tb_leave
     * const Tb_leave = await prisma.tb_leave.delete({
     *   where: {
     *     // ... filter to delete one Tb_leave
     *   }
     * })
     * 
     */
    delete<T extends tb_leaveDeleteArgs>(args: SelectSubset<T, tb_leaveDeleteArgs<ExtArgs>>): Prisma__tb_leaveClient<$Result.GetResult<Prisma.$tb_leavePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tb_leave.
     * @param {tb_leaveUpdateArgs} args - Arguments to update one Tb_leave.
     * @example
     * // Update one Tb_leave
     * const tb_leave = await prisma.tb_leave.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends tb_leaveUpdateArgs>(args: SelectSubset<T, tb_leaveUpdateArgs<ExtArgs>>): Prisma__tb_leaveClient<$Result.GetResult<Prisma.$tb_leavePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tb_leaves.
     * @param {tb_leaveDeleteManyArgs} args - Arguments to filter Tb_leaves to delete.
     * @example
     * // Delete a few Tb_leaves
     * const { count } = await prisma.tb_leave.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends tb_leaveDeleteManyArgs>(args?: SelectSubset<T, tb_leaveDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tb_leaves.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tb_leaveUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tb_leaves
     * const tb_leave = await prisma.tb_leave.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends tb_leaveUpdateManyArgs>(args: SelectSubset<T, tb_leaveUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tb_leaves and returns the data updated in the database.
     * @param {tb_leaveUpdateManyAndReturnArgs} args - Arguments to update many Tb_leaves.
     * @example
     * // Update many Tb_leaves
     * const tb_leave = await prisma.tb_leave.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tb_leaves and only return the `id_leave`
     * const tb_leaveWithId_leaveOnly = await prisma.tb_leave.updateManyAndReturn({
     *   select: { id_leave: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends tb_leaveUpdateManyAndReturnArgs>(args: SelectSubset<T, tb_leaveUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tb_leavePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tb_leave.
     * @param {tb_leaveUpsertArgs} args - Arguments to update or create a Tb_leave.
     * @example
     * // Update or create a Tb_leave
     * const tb_leave = await prisma.tb_leave.upsert({
     *   create: {
     *     // ... data to create a Tb_leave
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tb_leave we want to update
     *   }
     * })
     */
    upsert<T extends tb_leaveUpsertArgs>(args: SelectSubset<T, tb_leaveUpsertArgs<ExtArgs>>): Prisma__tb_leaveClient<$Result.GetResult<Prisma.$tb_leavePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tb_leaves.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tb_leaveCountArgs} args - Arguments to filter Tb_leaves to count.
     * @example
     * // Count the number of Tb_leaves
     * const count = await prisma.tb_leave.count({
     *   where: {
     *     // ... the filter for the Tb_leaves we want to count
     *   }
     * })
    **/
    count<T extends tb_leaveCountArgs>(
      args?: Subset<T, tb_leaveCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Tb_leaveCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tb_leave.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Tb_leaveAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Tb_leaveAggregateArgs>(args: Subset<T, Tb_leaveAggregateArgs>): Prisma.PrismaPromise<GetTb_leaveAggregateType<T>>

    /**
     * Group by Tb_leave.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tb_leaveGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends tb_leaveGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: tb_leaveGroupByArgs['orderBy'] }
        : { orderBy?: tb_leaveGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, tb_leaveGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTb_leaveGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the tb_leave model
   */
  readonly fields: tb_leaveFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for tb_leave.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__tb_leaveClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tb_users<T extends tb_usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, tb_usersDefaultArgs<ExtArgs>>): Prisma__tb_usersClient<$Result.GetResult<Prisma.$tb_usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tb_mandatory_leave<T extends tb_leave$tb_mandatory_leaveArgs<ExtArgs> = {}>(args?: Subset<T, tb_leave$tb_mandatory_leaveArgs<ExtArgs>>): Prisma__tb_mandatory_leaveClient<$Result.GetResult<Prisma.$tb_mandatory_leavePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    tb_special_leave<T extends tb_leave$tb_special_leaveArgs<ExtArgs> = {}>(args?: Subset<T, tb_leave$tb_special_leaveArgs<ExtArgs>>): Prisma__tb_special_leaveClient<$Result.GetResult<Prisma.$tb_special_leavePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    tb_leave_log<T extends tb_leave$tb_leave_logArgs<ExtArgs> = {}>(args?: Subset<T, tb_leave$tb_leave_logArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tb_leave_logPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the tb_leave model
   */
  interface tb_leaveFieldRefs {
    readonly id_leave: FieldRef<"tb_leave", 'String'>
    readonly title: FieldRef<"tb_leave", 'String'>
    readonly leave_type: FieldRef<"tb_leave", 'leave_type'>
    readonly start_date: FieldRef<"tb_leave", 'DateTime'>
    readonly end_date: FieldRef<"tb_leave", 'DateTime'>
    readonly total_days: FieldRef<"tb_leave", 'Int'>
    readonly reason: FieldRef<"tb_leave", 'String'>
    readonly status: FieldRef<"tb_leave", 'status'>
    readonly created_at: FieldRef<"tb_leave", 'DateTime'>
    readonly NIK: FieldRef<"tb_leave", 'String'>
    readonly id_special: FieldRef<"tb_leave", 'String'>
    readonly id_mandatory: FieldRef<"tb_leave", 'String'>
  }
    

  // Custom InputTypes
  /**
   * tb_leave findUnique
   */
  export type tb_leaveFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_leave
     */
    select?: tb_leaveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_leave
     */
    omit?: tb_leaveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_leaveInclude<ExtArgs> | null
    /**
     * Filter, which tb_leave to fetch.
     */
    where: tb_leaveWhereUniqueInput
  }

  /**
   * tb_leave findUniqueOrThrow
   */
  export type tb_leaveFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_leave
     */
    select?: tb_leaveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_leave
     */
    omit?: tb_leaveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_leaveInclude<ExtArgs> | null
    /**
     * Filter, which tb_leave to fetch.
     */
    where: tb_leaveWhereUniqueInput
  }

  /**
   * tb_leave findFirst
   */
  export type tb_leaveFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_leave
     */
    select?: tb_leaveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_leave
     */
    omit?: tb_leaveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_leaveInclude<ExtArgs> | null
    /**
     * Filter, which tb_leave to fetch.
     */
    where?: tb_leaveWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tb_leaves to fetch.
     */
    orderBy?: tb_leaveOrderByWithRelationInput | tb_leaveOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tb_leaves.
     */
    cursor?: tb_leaveWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tb_leaves from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tb_leaves.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tb_leaves.
     */
    distinct?: Tb_leaveScalarFieldEnum | Tb_leaveScalarFieldEnum[]
  }

  /**
   * tb_leave findFirstOrThrow
   */
  export type tb_leaveFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_leave
     */
    select?: tb_leaveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_leave
     */
    omit?: tb_leaveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_leaveInclude<ExtArgs> | null
    /**
     * Filter, which tb_leave to fetch.
     */
    where?: tb_leaveWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tb_leaves to fetch.
     */
    orderBy?: tb_leaveOrderByWithRelationInput | tb_leaveOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tb_leaves.
     */
    cursor?: tb_leaveWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tb_leaves from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tb_leaves.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tb_leaves.
     */
    distinct?: Tb_leaveScalarFieldEnum | Tb_leaveScalarFieldEnum[]
  }

  /**
   * tb_leave findMany
   */
  export type tb_leaveFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_leave
     */
    select?: tb_leaveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_leave
     */
    omit?: tb_leaveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_leaveInclude<ExtArgs> | null
    /**
     * Filter, which tb_leaves to fetch.
     */
    where?: tb_leaveWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tb_leaves to fetch.
     */
    orderBy?: tb_leaveOrderByWithRelationInput | tb_leaveOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing tb_leaves.
     */
    cursor?: tb_leaveWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tb_leaves from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tb_leaves.
     */
    skip?: number
    distinct?: Tb_leaveScalarFieldEnum | Tb_leaveScalarFieldEnum[]
  }

  /**
   * tb_leave create
   */
  export type tb_leaveCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_leave
     */
    select?: tb_leaveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_leave
     */
    omit?: tb_leaveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_leaveInclude<ExtArgs> | null
    /**
     * The data needed to create a tb_leave.
     */
    data: XOR<tb_leaveCreateInput, tb_leaveUncheckedCreateInput>
  }

  /**
   * tb_leave createMany
   */
  export type tb_leaveCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many tb_leaves.
     */
    data: tb_leaveCreateManyInput | tb_leaveCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * tb_leave createManyAndReturn
   */
  export type tb_leaveCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_leave
     */
    select?: tb_leaveSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the tb_leave
     */
    omit?: tb_leaveOmit<ExtArgs> | null
    /**
     * The data used to create many tb_leaves.
     */
    data: tb_leaveCreateManyInput | tb_leaveCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_leaveIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * tb_leave update
   */
  export type tb_leaveUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_leave
     */
    select?: tb_leaveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_leave
     */
    omit?: tb_leaveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_leaveInclude<ExtArgs> | null
    /**
     * The data needed to update a tb_leave.
     */
    data: XOR<tb_leaveUpdateInput, tb_leaveUncheckedUpdateInput>
    /**
     * Choose, which tb_leave to update.
     */
    where: tb_leaveWhereUniqueInput
  }

  /**
   * tb_leave updateMany
   */
  export type tb_leaveUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update tb_leaves.
     */
    data: XOR<tb_leaveUpdateManyMutationInput, tb_leaveUncheckedUpdateManyInput>
    /**
     * Filter which tb_leaves to update
     */
    where?: tb_leaveWhereInput
    /**
     * Limit how many tb_leaves to update.
     */
    limit?: number
  }

  /**
   * tb_leave updateManyAndReturn
   */
  export type tb_leaveUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_leave
     */
    select?: tb_leaveSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the tb_leave
     */
    omit?: tb_leaveOmit<ExtArgs> | null
    /**
     * The data used to update tb_leaves.
     */
    data: XOR<tb_leaveUpdateManyMutationInput, tb_leaveUncheckedUpdateManyInput>
    /**
     * Filter which tb_leaves to update
     */
    where?: tb_leaveWhereInput
    /**
     * Limit how many tb_leaves to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_leaveIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * tb_leave upsert
   */
  export type tb_leaveUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_leave
     */
    select?: tb_leaveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_leave
     */
    omit?: tb_leaveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_leaveInclude<ExtArgs> | null
    /**
     * The filter to search for the tb_leave to update in case it exists.
     */
    where: tb_leaveWhereUniqueInput
    /**
     * In case the tb_leave found by the `where` argument doesn't exist, create a new tb_leave with this data.
     */
    create: XOR<tb_leaveCreateInput, tb_leaveUncheckedCreateInput>
    /**
     * In case the tb_leave was found with the provided `where` argument, update it with this data.
     */
    update: XOR<tb_leaveUpdateInput, tb_leaveUncheckedUpdateInput>
  }

  /**
   * tb_leave delete
   */
  export type tb_leaveDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_leave
     */
    select?: tb_leaveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_leave
     */
    omit?: tb_leaveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_leaveInclude<ExtArgs> | null
    /**
     * Filter which tb_leave to delete.
     */
    where: tb_leaveWhereUniqueInput
  }

  /**
   * tb_leave deleteMany
   */
  export type tb_leaveDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tb_leaves to delete
     */
    where?: tb_leaveWhereInput
    /**
     * Limit how many tb_leaves to delete.
     */
    limit?: number
  }

  /**
   * tb_leave.tb_mandatory_leave
   */
  export type tb_leave$tb_mandatory_leaveArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_mandatory_leave
     */
    select?: tb_mandatory_leaveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_mandatory_leave
     */
    omit?: tb_mandatory_leaveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_mandatory_leaveInclude<ExtArgs> | null
    where?: tb_mandatory_leaveWhereInput
  }

  /**
   * tb_leave.tb_special_leave
   */
  export type tb_leave$tb_special_leaveArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_special_leave
     */
    select?: tb_special_leaveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_special_leave
     */
    omit?: tb_special_leaveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_special_leaveInclude<ExtArgs> | null
    where?: tb_special_leaveWhereInput
  }

  /**
   * tb_leave.tb_leave_log
   */
  export type tb_leave$tb_leave_logArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_leave_log
     */
    select?: tb_leave_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_leave_log
     */
    omit?: tb_leave_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_leave_logInclude<ExtArgs> | null
    where?: tb_leave_logWhereInput
    orderBy?: tb_leave_logOrderByWithRelationInput | tb_leave_logOrderByWithRelationInput[]
    cursor?: tb_leave_logWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Tb_leave_logScalarFieldEnum | Tb_leave_logScalarFieldEnum[]
  }

  /**
   * tb_leave without action
   */
  export type tb_leaveDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_leave
     */
    select?: tb_leaveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_leave
     */
    omit?: tb_leaveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_leaveInclude<ExtArgs> | null
  }


  /**
   * Model tb_mandatory_leave
   */

  export type AggregateTb_mandatory_leave = {
    _count: Tb_mandatory_leaveCountAggregateOutputType | null
    _avg: Tb_mandatory_leaveAvgAggregateOutputType | null
    _sum: Tb_mandatory_leaveSumAggregateOutputType | null
    _min: Tb_mandatory_leaveMinAggregateOutputType | null
    _max: Tb_mandatory_leaveMaxAggregateOutputType | null
  }

  export type Tb_mandatory_leaveAvgAggregateOutputType = {
    duration: number | null
  }

  export type Tb_mandatory_leaveSumAggregateOutputType = {
    duration: number | null
  }

  export type Tb_mandatory_leaveMinAggregateOutputType = {
    id_mandatory: string | null
    title: string | null
    duration: number | null
    is_active: boolean | null
    description: string | null
  }

  export type Tb_mandatory_leaveMaxAggregateOutputType = {
    id_mandatory: string | null
    title: string | null
    duration: number | null
    is_active: boolean | null
    description: string | null
  }

  export type Tb_mandatory_leaveCountAggregateOutputType = {
    id_mandatory: number
    title: number
    duration: number
    is_active: number
    description: number
    _all: number
  }


  export type Tb_mandatory_leaveAvgAggregateInputType = {
    duration?: true
  }

  export type Tb_mandatory_leaveSumAggregateInputType = {
    duration?: true
  }

  export type Tb_mandatory_leaveMinAggregateInputType = {
    id_mandatory?: true
    title?: true
    duration?: true
    is_active?: true
    description?: true
  }

  export type Tb_mandatory_leaveMaxAggregateInputType = {
    id_mandatory?: true
    title?: true
    duration?: true
    is_active?: true
    description?: true
  }

  export type Tb_mandatory_leaveCountAggregateInputType = {
    id_mandatory?: true
    title?: true
    duration?: true
    is_active?: true
    description?: true
    _all?: true
  }

  export type Tb_mandatory_leaveAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tb_mandatory_leave to aggregate.
     */
    where?: tb_mandatory_leaveWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tb_mandatory_leaves to fetch.
     */
    orderBy?: tb_mandatory_leaveOrderByWithRelationInput | tb_mandatory_leaveOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: tb_mandatory_leaveWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tb_mandatory_leaves from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tb_mandatory_leaves.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned tb_mandatory_leaves
    **/
    _count?: true | Tb_mandatory_leaveCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Tb_mandatory_leaveAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Tb_mandatory_leaveSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Tb_mandatory_leaveMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Tb_mandatory_leaveMaxAggregateInputType
  }

  export type GetTb_mandatory_leaveAggregateType<T extends Tb_mandatory_leaveAggregateArgs> = {
        [P in keyof T & keyof AggregateTb_mandatory_leave]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTb_mandatory_leave[P]>
      : GetScalarType<T[P], AggregateTb_mandatory_leave[P]>
  }




  export type tb_mandatory_leaveGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tb_mandatory_leaveWhereInput
    orderBy?: tb_mandatory_leaveOrderByWithAggregationInput | tb_mandatory_leaveOrderByWithAggregationInput[]
    by: Tb_mandatory_leaveScalarFieldEnum[] | Tb_mandatory_leaveScalarFieldEnum
    having?: tb_mandatory_leaveScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Tb_mandatory_leaveCountAggregateInputType | true
    _avg?: Tb_mandatory_leaveAvgAggregateInputType
    _sum?: Tb_mandatory_leaveSumAggregateInputType
    _min?: Tb_mandatory_leaveMinAggregateInputType
    _max?: Tb_mandatory_leaveMaxAggregateInputType
  }

  export type Tb_mandatory_leaveGroupByOutputType = {
    id_mandatory: string
    title: string
    duration: number
    is_active: boolean
    description: string
    _count: Tb_mandatory_leaveCountAggregateOutputType | null
    _avg: Tb_mandatory_leaveAvgAggregateOutputType | null
    _sum: Tb_mandatory_leaveSumAggregateOutputType | null
    _min: Tb_mandatory_leaveMinAggregateOutputType | null
    _max: Tb_mandatory_leaveMaxAggregateOutputType | null
  }

  type GetTb_mandatory_leaveGroupByPayload<T extends tb_mandatory_leaveGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Tb_mandatory_leaveGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Tb_mandatory_leaveGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Tb_mandatory_leaveGroupByOutputType[P]>
            : GetScalarType<T[P], Tb_mandatory_leaveGroupByOutputType[P]>
        }
      >
    >


  export type tb_mandatory_leaveSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_mandatory?: boolean
    title?: boolean
    duration?: boolean
    is_active?: boolean
    description?: boolean
    tb_leave?: boolean | tb_mandatory_leave$tb_leaveArgs<ExtArgs>
    _count?: boolean | Tb_mandatory_leaveCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tb_mandatory_leave"]>

  export type tb_mandatory_leaveSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_mandatory?: boolean
    title?: boolean
    duration?: boolean
    is_active?: boolean
    description?: boolean
  }, ExtArgs["result"]["tb_mandatory_leave"]>

  export type tb_mandatory_leaveSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_mandatory?: boolean
    title?: boolean
    duration?: boolean
    is_active?: boolean
    description?: boolean
  }, ExtArgs["result"]["tb_mandatory_leave"]>

  export type tb_mandatory_leaveSelectScalar = {
    id_mandatory?: boolean
    title?: boolean
    duration?: boolean
    is_active?: boolean
    description?: boolean
  }

  export type tb_mandatory_leaveOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_mandatory" | "title" | "duration" | "is_active" | "description", ExtArgs["result"]["tb_mandatory_leave"]>
  export type tb_mandatory_leaveInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tb_leave?: boolean | tb_mandatory_leave$tb_leaveArgs<ExtArgs>
    _count?: boolean | Tb_mandatory_leaveCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type tb_mandatory_leaveIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type tb_mandatory_leaveIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $tb_mandatory_leavePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "tb_mandatory_leave"
    objects: {
      tb_leave: Prisma.$tb_leavePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id_mandatory: string
      title: string
      duration: number
      is_active: boolean
      description: string
    }, ExtArgs["result"]["tb_mandatory_leave"]>
    composites: {}
  }

  type tb_mandatory_leaveGetPayload<S extends boolean | null | undefined | tb_mandatory_leaveDefaultArgs> = $Result.GetResult<Prisma.$tb_mandatory_leavePayload, S>

  type tb_mandatory_leaveCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<tb_mandatory_leaveFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Tb_mandatory_leaveCountAggregateInputType | true
    }

  export interface tb_mandatory_leaveDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['tb_mandatory_leave'], meta: { name: 'tb_mandatory_leave' } }
    /**
     * Find zero or one Tb_mandatory_leave that matches the filter.
     * @param {tb_mandatory_leaveFindUniqueArgs} args - Arguments to find a Tb_mandatory_leave
     * @example
     * // Get one Tb_mandatory_leave
     * const tb_mandatory_leave = await prisma.tb_mandatory_leave.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends tb_mandatory_leaveFindUniqueArgs>(args: SelectSubset<T, tb_mandatory_leaveFindUniqueArgs<ExtArgs>>): Prisma__tb_mandatory_leaveClient<$Result.GetResult<Prisma.$tb_mandatory_leavePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tb_mandatory_leave that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {tb_mandatory_leaveFindUniqueOrThrowArgs} args - Arguments to find a Tb_mandatory_leave
     * @example
     * // Get one Tb_mandatory_leave
     * const tb_mandatory_leave = await prisma.tb_mandatory_leave.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends tb_mandatory_leaveFindUniqueOrThrowArgs>(args: SelectSubset<T, tb_mandatory_leaveFindUniqueOrThrowArgs<ExtArgs>>): Prisma__tb_mandatory_leaveClient<$Result.GetResult<Prisma.$tb_mandatory_leavePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tb_mandatory_leave that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tb_mandatory_leaveFindFirstArgs} args - Arguments to find a Tb_mandatory_leave
     * @example
     * // Get one Tb_mandatory_leave
     * const tb_mandatory_leave = await prisma.tb_mandatory_leave.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends tb_mandatory_leaveFindFirstArgs>(args?: SelectSubset<T, tb_mandatory_leaveFindFirstArgs<ExtArgs>>): Prisma__tb_mandatory_leaveClient<$Result.GetResult<Prisma.$tb_mandatory_leavePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tb_mandatory_leave that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tb_mandatory_leaveFindFirstOrThrowArgs} args - Arguments to find a Tb_mandatory_leave
     * @example
     * // Get one Tb_mandatory_leave
     * const tb_mandatory_leave = await prisma.tb_mandatory_leave.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends tb_mandatory_leaveFindFirstOrThrowArgs>(args?: SelectSubset<T, tb_mandatory_leaveFindFirstOrThrowArgs<ExtArgs>>): Prisma__tb_mandatory_leaveClient<$Result.GetResult<Prisma.$tb_mandatory_leavePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tb_mandatory_leaves that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tb_mandatory_leaveFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tb_mandatory_leaves
     * const tb_mandatory_leaves = await prisma.tb_mandatory_leave.findMany()
     * 
     * // Get first 10 Tb_mandatory_leaves
     * const tb_mandatory_leaves = await prisma.tb_mandatory_leave.findMany({ take: 10 })
     * 
     * // Only select the `id_mandatory`
     * const tb_mandatory_leaveWithId_mandatoryOnly = await prisma.tb_mandatory_leave.findMany({ select: { id_mandatory: true } })
     * 
     */
    findMany<T extends tb_mandatory_leaveFindManyArgs>(args?: SelectSubset<T, tb_mandatory_leaveFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tb_mandatory_leavePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tb_mandatory_leave.
     * @param {tb_mandatory_leaveCreateArgs} args - Arguments to create a Tb_mandatory_leave.
     * @example
     * // Create one Tb_mandatory_leave
     * const Tb_mandatory_leave = await prisma.tb_mandatory_leave.create({
     *   data: {
     *     // ... data to create a Tb_mandatory_leave
     *   }
     * })
     * 
     */
    create<T extends tb_mandatory_leaveCreateArgs>(args: SelectSubset<T, tb_mandatory_leaveCreateArgs<ExtArgs>>): Prisma__tb_mandatory_leaveClient<$Result.GetResult<Prisma.$tb_mandatory_leavePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tb_mandatory_leaves.
     * @param {tb_mandatory_leaveCreateManyArgs} args - Arguments to create many Tb_mandatory_leaves.
     * @example
     * // Create many Tb_mandatory_leaves
     * const tb_mandatory_leave = await prisma.tb_mandatory_leave.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends tb_mandatory_leaveCreateManyArgs>(args?: SelectSubset<T, tb_mandatory_leaveCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tb_mandatory_leaves and returns the data saved in the database.
     * @param {tb_mandatory_leaveCreateManyAndReturnArgs} args - Arguments to create many Tb_mandatory_leaves.
     * @example
     * // Create many Tb_mandatory_leaves
     * const tb_mandatory_leave = await prisma.tb_mandatory_leave.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tb_mandatory_leaves and only return the `id_mandatory`
     * const tb_mandatory_leaveWithId_mandatoryOnly = await prisma.tb_mandatory_leave.createManyAndReturn({
     *   select: { id_mandatory: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends tb_mandatory_leaveCreateManyAndReturnArgs>(args?: SelectSubset<T, tb_mandatory_leaveCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tb_mandatory_leavePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tb_mandatory_leave.
     * @param {tb_mandatory_leaveDeleteArgs} args - Arguments to delete one Tb_mandatory_leave.
     * @example
     * // Delete one Tb_mandatory_leave
     * const Tb_mandatory_leave = await prisma.tb_mandatory_leave.delete({
     *   where: {
     *     // ... filter to delete one Tb_mandatory_leave
     *   }
     * })
     * 
     */
    delete<T extends tb_mandatory_leaveDeleteArgs>(args: SelectSubset<T, tb_mandatory_leaveDeleteArgs<ExtArgs>>): Prisma__tb_mandatory_leaveClient<$Result.GetResult<Prisma.$tb_mandatory_leavePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tb_mandatory_leave.
     * @param {tb_mandatory_leaveUpdateArgs} args - Arguments to update one Tb_mandatory_leave.
     * @example
     * // Update one Tb_mandatory_leave
     * const tb_mandatory_leave = await prisma.tb_mandatory_leave.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends tb_mandatory_leaveUpdateArgs>(args: SelectSubset<T, tb_mandatory_leaveUpdateArgs<ExtArgs>>): Prisma__tb_mandatory_leaveClient<$Result.GetResult<Prisma.$tb_mandatory_leavePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tb_mandatory_leaves.
     * @param {tb_mandatory_leaveDeleteManyArgs} args - Arguments to filter Tb_mandatory_leaves to delete.
     * @example
     * // Delete a few Tb_mandatory_leaves
     * const { count } = await prisma.tb_mandatory_leave.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends tb_mandatory_leaveDeleteManyArgs>(args?: SelectSubset<T, tb_mandatory_leaveDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tb_mandatory_leaves.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tb_mandatory_leaveUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tb_mandatory_leaves
     * const tb_mandatory_leave = await prisma.tb_mandatory_leave.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends tb_mandatory_leaveUpdateManyArgs>(args: SelectSubset<T, tb_mandatory_leaveUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tb_mandatory_leaves and returns the data updated in the database.
     * @param {tb_mandatory_leaveUpdateManyAndReturnArgs} args - Arguments to update many Tb_mandatory_leaves.
     * @example
     * // Update many Tb_mandatory_leaves
     * const tb_mandatory_leave = await prisma.tb_mandatory_leave.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tb_mandatory_leaves and only return the `id_mandatory`
     * const tb_mandatory_leaveWithId_mandatoryOnly = await prisma.tb_mandatory_leave.updateManyAndReturn({
     *   select: { id_mandatory: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends tb_mandatory_leaveUpdateManyAndReturnArgs>(args: SelectSubset<T, tb_mandatory_leaveUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tb_mandatory_leavePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tb_mandatory_leave.
     * @param {tb_mandatory_leaveUpsertArgs} args - Arguments to update or create a Tb_mandatory_leave.
     * @example
     * // Update or create a Tb_mandatory_leave
     * const tb_mandatory_leave = await prisma.tb_mandatory_leave.upsert({
     *   create: {
     *     // ... data to create a Tb_mandatory_leave
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tb_mandatory_leave we want to update
     *   }
     * })
     */
    upsert<T extends tb_mandatory_leaveUpsertArgs>(args: SelectSubset<T, tb_mandatory_leaveUpsertArgs<ExtArgs>>): Prisma__tb_mandatory_leaveClient<$Result.GetResult<Prisma.$tb_mandatory_leavePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tb_mandatory_leaves.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tb_mandatory_leaveCountArgs} args - Arguments to filter Tb_mandatory_leaves to count.
     * @example
     * // Count the number of Tb_mandatory_leaves
     * const count = await prisma.tb_mandatory_leave.count({
     *   where: {
     *     // ... the filter for the Tb_mandatory_leaves we want to count
     *   }
     * })
    **/
    count<T extends tb_mandatory_leaveCountArgs>(
      args?: Subset<T, tb_mandatory_leaveCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Tb_mandatory_leaveCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tb_mandatory_leave.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Tb_mandatory_leaveAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Tb_mandatory_leaveAggregateArgs>(args: Subset<T, Tb_mandatory_leaveAggregateArgs>): Prisma.PrismaPromise<GetTb_mandatory_leaveAggregateType<T>>

    /**
     * Group by Tb_mandatory_leave.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tb_mandatory_leaveGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends tb_mandatory_leaveGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: tb_mandatory_leaveGroupByArgs['orderBy'] }
        : { orderBy?: tb_mandatory_leaveGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, tb_mandatory_leaveGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTb_mandatory_leaveGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the tb_mandatory_leave model
   */
  readonly fields: tb_mandatory_leaveFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for tb_mandatory_leave.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__tb_mandatory_leaveClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tb_leave<T extends tb_mandatory_leave$tb_leaveArgs<ExtArgs> = {}>(args?: Subset<T, tb_mandatory_leave$tb_leaveArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tb_leavePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the tb_mandatory_leave model
   */
  interface tb_mandatory_leaveFieldRefs {
    readonly id_mandatory: FieldRef<"tb_mandatory_leave", 'String'>
    readonly title: FieldRef<"tb_mandatory_leave", 'String'>
    readonly duration: FieldRef<"tb_mandatory_leave", 'Int'>
    readonly is_active: FieldRef<"tb_mandatory_leave", 'Boolean'>
    readonly description: FieldRef<"tb_mandatory_leave", 'String'>
  }
    

  // Custom InputTypes
  /**
   * tb_mandatory_leave findUnique
   */
  export type tb_mandatory_leaveFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_mandatory_leave
     */
    select?: tb_mandatory_leaveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_mandatory_leave
     */
    omit?: tb_mandatory_leaveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_mandatory_leaveInclude<ExtArgs> | null
    /**
     * Filter, which tb_mandatory_leave to fetch.
     */
    where: tb_mandatory_leaveWhereUniqueInput
  }

  /**
   * tb_mandatory_leave findUniqueOrThrow
   */
  export type tb_mandatory_leaveFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_mandatory_leave
     */
    select?: tb_mandatory_leaveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_mandatory_leave
     */
    omit?: tb_mandatory_leaveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_mandatory_leaveInclude<ExtArgs> | null
    /**
     * Filter, which tb_mandatory_leave to fetch.
     */
    where: tb_mandatory_leaveWhereUniqueInput
  }

  /**
   * tb_mandatory_leave findFirst
   */
  export type tb_mandatory_leaveFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_mandatory_leave
     */
    select?: tb_mandatory_leaveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_mandatory_leave
     */
    omit?: tb_mandatory_leaveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_mandatory_leaveInclude<ExtArgs> | null
    /**
     * Filter, which tb_mandatory_leave to fetch.
     */
    where?: tb_mandatory_leaveWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tb_mandatory_leaves to fetch.
     */
    orderBy?: tb_mandatory_leaveOrderByWithRelationInput | tb_mandatory_leaveOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tb_mandatory_leaves.
     */
    cursor?: tb_mandatory_leaveWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tb_mandatory_leaves from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tb_mandatory_leaves.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tb_mandatory_leaves.
     */
    distinct?: Tb_mandatory_leaveScalarFieldEnum | Tb_mandatory_leaveScalarFieldEnum[]
  }

  /**
   * tb_mandatory_leave findFirstOrThrow
   */
  export type tb_mandatory_leaveFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_mandatory_leave
     */
    select?: tb_mandatory_leaveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_mandatory_leave
     */
    omit?: tb_mandatory_leaveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_mandatory_leaveInclude<ExtArgs> | null
    /**
     * Filter, which tb_mandatory_leave to fetch.
     */
    where?: tb_mandatory_leaveWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tb_mandatory_leaves to fetch.
     */
    orderBy?: tb_mandatory_leaveOrderByWithRelationInput | tb_mandatory_leaveOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tb_mandatory_leaves.
     */
    cursor?: tb_mandatory_leaveWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tb_mandatory_leaves from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tb_mandatory_leaves.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tb_mandatory_leaves.
     */
    distinct?: Tb_mandatory_leaveScalarFieldEnum | Tb_mandatory_leaveScalarFieldEnum[]
  }

  /**
   * tb_mandatory_leave findMany
   */
  export type tb_mandatory_leaveFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_mandatory_leave
     */
    select?: tb_mandatory_leaveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_mandatory_leave
     */
    omit?: tb_mandatory_leaveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_mandatory_leaveInclude<ExtArgs> | null
    /**
     * Filter, which tb_mandatory_leaves to fetch.
     */
    where?: tb_mandatory_leaveWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tb_mandatory_leaves to fetch.
     */
    orderBy?: tb_mandatory_leaveOrderByWithRelationInput | tb_mandatory_leaveOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing tb_mandatory_leaves.
     */
    cursor?: tb_mandatory_leaveWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tb_mandatory_leaves from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tb_mandatory_leaves.
     */
    skip?: number
    distinct?: Tb_mandatory_leaveScalarFieldEnum | Tb_mandatory_leaveScalarFieldEnum[]
  }

  /**
   * tb_mandatory_leave create
   */
  export type tb_mandatory_leaveCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_mandatory_leave
     */
    select?: tb_mandatory_leaveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_mandatory_leave
     */
    omit?: tb_mandatory_leaveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_mandatory_leaveInclude<ExtArgs> | null
    /**
     * The data needed to create a tb_mandatory_leave.
     */
    data: XOR<tb_mandatory_leaveCreateInput, tb_mandatory_leaveUncheckedCreateInput>
  }

  /**
   * tb_mandatory_leave createMany
   */
  export type tb_mandatory_leaveCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many tb_mandatory_leaves.
     */
    data: tb_mandatory_leaveCreateManyInput | tb_mandatory_leaveCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * tb_mandatory_leave createManyAndReturn
   */
  export type tb_mandatory_leaveCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_mandatory_leave
     */
    select?: tb_mandatory_leaveSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the tb_mandatory_leave
     */
    omit?: tb_mandatory_leaveOmit<ExtArgs> | null
    /**
     * The data used to create many tb_mandatory_leaves.
     */
    data: tb_mandatory_leaveCreateManyInput | tb_mandatory_leaveCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * tb_mandatory_leave update
   */
  export type tb_mandatory_leaveUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_mandatory_leave
     */
    select?: tb_mandatory_leaveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_mandatory_leave
     */
    omit?: tb_mandatory_leaveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_mandatory_leaveInclude<ExtArgs> | null
    /**
     * The data needed to update a tb_mandatory_leave.
     */
    data: XOR<tb_mandatory_leaveUpdateInput, tb_mandatory_leaveUncheckedUpdateInput>
    /**
     * Choose, which tb_mandatory_leave to update.
     */
    where: tb_mandatory_leaveWhereUniqueInput
  }

  /**
   * tb_mandatory_leave updateMany
   */
  export type tb_mandatory_leaveUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update tb_mandatory_leaves.
     */
    data: XOR<tb_mandatory_leaveUpdateManyMutationInput, tb_mandatory_leaveUncheckedUpdateManyInput>
    /**
     * Filter which tb_mandatory_leaves to update
     */
    where?: tb_mandatory_leaveWhereInput
    /**
     * Limit how many tb_mandatory_leaves to update.
     */
    limit?: number
  }

  /**
   * tb_mandatory_leave updateManyAndReturn
   */
  export type tb_mandatory_leaveUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_mandatory_leave
     */
    select?: tb_mandatory_leaveSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the tb_mandatory_leave
     */
    omit?: tb_mandatory_leaveOmit<ExtArgs> | null
    /**
     * The data used to update tb_mandatory_leaves.
     */
    data: XOR<tb_mandatory_leaveUpdateManyMutationInput, tb_mandatory_leaveUncheckedUpdateManyInput>
    /**
     * Filter which tb_mandatory_leaves to update
     */
    where?: tb_mandatory_leaveWhereInput
    /**
     * Limit how many tb_mandatory_leaves to update.
     */
    limit?: number
  }

  /**
   * tb_mandatory_leave upsert
   */
  export type tb_mandatory_leaveUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_mandatory_leave
     */
    select?: tb_mandatory_leaveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_mandatory_leave
     */
    omit?: tb_mandatory_leaveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_mandatory_leaveInclude<ExtArgs> | null
    /**
     * The filter to search for the tb_mandatory_leave to update in case it exists.
     */
    where: tb_mandatory_leaveWhereUniqueInput
    /**
     * In case the tb_mandatory_leave found by the `where` argument doesn't exist, create a new tb_mandatory_leave with this data.
     */
    create: XOR<tb_mandatory_leaveCreateInput, tb_mandatory_leaveUncheckedCreateInput>
    /**
     * In case the tb_mandatory_leave was found with the provided `where` argument, update it with this data.
     */
    update: XOR<tb_mandatory_leaveUpdateInput, tb_mandatory_leaveUncheckedUpdateInput>
  }

  /**
   * tb_mandatory_leave delete
   */
  export type tb_mandatory_leaveDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_mandatory_leave
     */
    select?: tb_mandatory_leaveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_mandatory_leave
     */
    omit?: tb_mandatory_leaveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_mandatory_leaveInclude<ExtArgs> | null
    /**
     * Filter which tb_mandatory_leave to delete.
     */
    where: tb_mandatory_leaveWhereUniqueInput
  }

  /**
   * tb_mandatory_leave deleteMany
   */
  export type tb_mandatory_leaveDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tb_mandatory_leaves to delete
     */
    where?: tb_mandatory_leaveWhereInput
    /**
     * Limit how many tb_mandatory_leaves to delete.
     */
    limit?: number
  }

  /**
   * tb_mandatory_leave.tb_leave
   */
  export type tb_mandatory_leave$tb_leaveArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_leave
     */
    select?: tb_leaveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_leave
     */
    omit?: tb_leaveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_leaveInclude<ExtArgs> | null
    where?: tb_leaveWhereInput
    orderBy?: tb_leaveOrderByWithRelationInput | tb_leaveOrderByWithRelationInput[]
    cursor?: tb_leaveWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Tb_leaveScalarFieldEnum | Tb_leaveScalarFieldEnum[]
  }

  /**
   * tb_mandatory_leave without action
   */
  export type tb_mandatory_leaveDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_mandatory_leave
     */
    select?: tb_mandatory_leaveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_mandatory_leave
     */
    omit?: tb_mandatory_leaveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_mandatory_leaveInclude<ExtArgs> | null
  }


  /**
   * Model tb_special_leave
   */

  export type AggregateTb_special_leave = {
    _count: Tb_special_leaveCountAggregateOutputType | null
    _avg: Tb_special_leaveAvgAggregateOutputType | null
    _sum: Tb_special_leaveSumAggregateOutputType | null
    _min: Tb_special_leaveMinAggregateOutputType | null
    _max: Tb_special_leaveMaxAggregateOutputType | null
  }

  export type Tb_special_leaveAvgAggregateOutputType = {
    duration: number | null
  }

  export type Tb_special_leaveSumAggregateOutputType = {
    duration: number | null
  }

  export type Tb_special_leaveMinAggregateOutputType = {
    id_special: string | null
    title: string | null
    applicable_gender: $Enums.applicable_gender | null
    duration: number | null
    is_active: boolean | null
    description: string | null
  }

  export type Tb_special_leaveMaxAggregateOutputType = {
    id_special: string | null
    title: string | null
    applicable_gender: $Enums.applicable_gender | null
    duration: number | null
    is_active: boolean | null
    description: string | null
  }

  export type Tb_special_leaveCountAggregateOutputType = {
    id_special: number
    title: number
    applicable_gender: number
    duration: number
    is_active: number
    description: number
    _all: number
  }


  export type Tb_special_leaveAvgAggregateInputType = {
    duration?: true
  }

  export type Tb_special_leaveSumAggregateInputType = {
    duration?: true
  }

  export type Tb_special_leaveMinAggregateInputType = {
    id_special?: true
    title?: true
    applicable_gender?: true
    duration?: true
    is_active?: true
    description?: true
  }

  export type Tb_special_leaveMaxAggregateInputType = {
    id_special?: true
    title?: true
    applicable_gender?: true
    duration?: true
    is_active?: true
    description?: true
  }

  export type Tb_special_leaveCountAggregateInputType = {
    id_special?: true
    title?: true
    applicable_gender?: true
    duration?: true
    is_active?: true
    description?: true
    _all?: true
  }

  export type Tb_special_leaveAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tb_special_leave to aggregate.
     */
    where?: tb_special_leaveWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tb_special_leaves to fetch.
     */
    orderBy?: tb_special_leaveOrderByWithRelationInput | tb_special_leaveOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: tb_special_leaveWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tb_special_leaves from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tb_special_leaves.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned tb_special_leaves
    **/
    _count?: true | Tb_special_leaveCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Tb_special_leaveAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Tb_special_leaveSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Tb_special_leaveMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Tb_special_leaveMaxAggregateInputType
  }

  export type GetTb_special_leaveAggregateType<T extends Tb_special_leaveAggregateArgs> = {
        [P in keyof T & keyof AggregateTb_special_leave]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTb_special_leave[P]>
      : GetScalarType<T[P], AggregateTb_special_leave[P]>
  }




  export type tb_special_leaveGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tb_special_leaveWhereInput
    orderBy?: tb_special_leaveOrderByWithAggregationInput | tb_special_leaveOrderByWithAggregationInput[]
    by: Tb_special_leaveScalarFieldEnum[] | Tb_special_leaveScalarFieldEnum
    having?: tb_special_leaveScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Tb_special_leaveCountAggregateInputType | true
    _avg?: Tb_special_leaveAvgAggregateInputType
    _sum?: Tb_special_leaveSumAggregateInputType
    _min?: Tb_special_leaveMinAggregateInputType
    _max?: Tb_special_leaveMaxAggregateInputType
  }

  export type Tb_special_leaveGroupByOutputType = {
    id_special: string
    title: string
    applicable_gender: $Enums.applicable_gender
    duration: number
    is_active: boolean
    description: string
    _count: Tb_special_leaveCountAggregateOutputType | null
    _avg: Tb_special_leaveAvgAggregateOutputType | null
    _sum: Tb_special_leaveSumAggregateOutputType | null
    _min: Tb_special_leaveMinAggregateOutputType | null
    _max: Tb_special_leaveMaxAggregateOutputType | null
  }

  type GetTb_special_leaveGroupByPayload<T extends tb_special_leaveGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Tb_special_leaveGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Tb_special_leaveGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Tb_special_leaveGroupByOutputType[P]>
            : GetScalarType<T[P], Tb_special_leaveGroupByOutputType[P]>
        }
      >
    >


  export type tb_special_leaveSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_special?: boolean
    title?: boolean
    applicable_gender?: boolean
    duration?: boolean
    is_active?: boolean
    description?: boolean
    tb_leave?: boolean | tb_special_leave$tb_leaveArgs<ExtArgs>
    _count?: boolean | Tb_special_leaveCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tb_special_leave"]>

  export type tb_special_leaveSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_special?: boolean
    title?: boolean
    applicable_gender?: boolean
    duration?: boolean
    is_active?: boolean
    description?: boolean
  }, ExtArgs["result"]["tb_special_leave"]>

  export type tb_special_leaveSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_special?: boolean
    title?: boolean
    applicable_gender?: boolean
    duration?: boolean
    is_active?: boolean
    description?: boolean
  }, ExtArgs["result"]["tb_special_leave"]>

  export type tb_special_leaveSelectScalar = {
    id_special?: boolean
    title?: boolean
    applicable_gender?: boolean
    duration?: boolean
    is_active?: boolean
    description?: boolean
  }

  export type tb_special_leaveOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_special" | "title" | "applicable_gender" | "duration" | "is_active" | "description", ExtArgs["result"]["tb_special_leave"]>
  export type tb_special_leaveInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tb_leave?: boolean | tb_special_leave$tb_leaveArgs<ExtArgs>
    _count?: boolean | Tb_special_leaveCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type tb_special_leaveIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type tb_special_leaveIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $tb_special_leavePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "tb_special_leave"
    objects: {
      tb_leave: Prisma.$tb_leavePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id_special: string
      title: string
      applicable_gender: $Enums.applicable_gender
      duration: number
      is_active: boolean
      description: string
    }, ExtArgs["result"]["tb_special_leave"]>
    composites: {}
  }

  type tb_special_leaveGetPayload<S extends boolean | null | undefined | tb_special_leaveDefaultArgs> = $Result.GetResult<Prisma.$tb_special_leavePayload, S>

  type tb_special_leaveCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<tb_special_leaveFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Tb_special_leaveCountAggregateInputType | true
    }

  export interface tb_special_leaveDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['tb_special_leave'], meta: { name: 'tb_special_leave' } }
    /**
     * Find zero or one Tb_special_leave that matches the filter.
     * @param {tb_special_leaveFindUniqueArgs} args - Arguments to find a Tb_special_leave
     * @example
     * // Get one Tb_special_leave
     * const tb_special_leave = await prisma.tb_special_leave.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends tb_special_leaveFindUniqueArgs>(args: SelectSubset<T, tb_special_leaveFindUniqueArgs<ExtArgs>>): Prisma__tb_special_leaveClient<$Result.GetResult<Prisma.$tb_special_leavePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tb_special_leave that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {tb_special_leaveFindUniqueOrThrowArgs} args - Arguments to find a Tb_special_leave
     * @example
     * // Get one Tb_special_leave
     * const tb_special_leave = await prisma.tb_special_leave.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends tb_special_leaveFindUniqueOrThrowArgs>(args: SelectSubset<T, tb_special_leaveFindUniqueOrThrowArgs<ExtArgs>>): Prisma__tb_special_leaveClient<$Result.GetResult<Prisma.$tb_special_leavePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tb_special_leave that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tb_special_leaveFindFirstArgs} args - Arguments to find a Tb_special_leave
     * @example
     * // Get one Tb_special_leave
     * const tb_special_leave = await prisma.tb_special_leave.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends tb_special_leaveFindFirstArgs>(args?: SelectSubset<T, tb_special_leaveFindFirstArgs<ExtArgs>>): Prisma__tb_special_leaveClient<$Result.GetResult<Prisma.$tb_special_leavePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tb_special_leave that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tb_special_leaveFindFirstOrThrowArgs} args - Arguments to find a Tb_special_leave
     * @example
     * // Get one Tb_special_leave
     * const tb_special_leave = await prisma.tb_special_leave.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends tb_special_leaveFindFirstOrThrowArgs>(args?: SelectSubset<T, tb_special_leaveFindFirstOrThrowArgs<ExtArgs>>): Prisma__tb_special_leaveClient<$Result.GetResult<Prisma.$tb_special_leavePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tb_special_leaves that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tb_special_leaveFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tb_special_leaves
     * const tb_special_leaves = await prisma.tb_special_leave.findMany()
     * 
     * // Get first 10 Tb_special_leaves
     * const tb_special_leaves = await prisma.tb_special_leave.findMany({ take: 10 })
     * 
     * // Only select the `id_special`
     * const tb_special_leaveWithId_specialOnly = await prisma.tb_special_leave.findMany({ select: { id_special: true } })
     * 
     */
    findMany<T extends tb_special_leaveFindManyArgs>(args?: SelectSubset<T, tb_special_leaveFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tb_special_leavePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tb_special_leave.
     * @param {tb_special_leaveCreateArgs} args - Arguments to create a Tb_special_leave.
     * @example
     * // Create one Tb_special_leave
     * const Tb_special_leave = await prisma.tb_special_leave.create({
     *   data: {
     *     // ... data to create a Tb_special_leave
     *   }
     * })
     * 
     */
    create<T extends tb_special_leaveCreateArgs>(args: SelectSubset<T, tb_special_leaveCreateArgs<ExtArgs>>): Prisma__tb_special_leaveClient<$Result.GetResult<Prisma.$tb_special_leavePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tb_special_leaves.
     * @param {tb_special_leaveCreateManyArgs} args - Arguments to create many Tb_special_leaves.
     * @example
     * // Create many Tb_special_leaves
     * const tb_special_leave = await prisma.tb_special_leave.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends tb_special_leaveCreateManyArgs>(args?: SelectSubset<T, tb_special_leaveCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tb_special_leaves and returns the data saved in the database.
     * @param {tb_special_leaveCreateManyAndReturnArgs} args - Arguments to create many Tb_special_leaves.
     * @example
     * // Create many Tb_special_leaves
     * const tb_special_leave = await prisma.tb_special_leave.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tb_special_leaves and only return the `id_special`
     * const tb_special_leaveWithId_specialOnly = await prisma.tb_special_leave.createManyAndReturn({
     *   select: { id_special: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends tb_special_leaveCreateManyAndReturnArgs>(args?: SelectSubset<T, tb_special_leaveCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tb_special_leavePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tb_special_leave.
     * @param {tb_special_leaveDeleteArgs} args - Arguments to delete one Tb_special_leave.
     * @example
     * // Delete one Tb_special_leave
     * const Tb_special_leave = await prisma.tb_special_leave.delete({
     *   where: {
     *     // ... filter to delete one Tb_special_leave
     *   }
     * })
     * 
     */
    delete<T extends tb_special_leaveDeleteArgs>(args: SelectSubset<T, tb_special_leaveDeleteArgs<ExtArgs>>): Prisma__tb_special_leaveClient<$Result.GetResult<Prisma.$tb_special_leavePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tb_special_leave.
     * @param {tb_special_leaveUpdateArgs} args - Arguments to update one Tb_special_leave.
     * @example
     * // Update one Tb_special_leave
     * const tb_special_leave = await prisma.tb_special_leave.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends tb_special_leaveUpdateArgs>(args: SelectSubset<T, tb_special_leaveUpdateArgs<ExtArgs>>): Prisma__tb_special_leaveClient<$Result.GetResult<Prisma.$tb_special_leavePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tb_special_leaves.
     * @param {tb_special_leaveDeleteManyArgs} args - Arguments to filter Tb_special_leaves to delete.
     * @example
     * // Delete a few Tb_special_leaves
     * const { count } = await prisma.tb_special_leave.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends tb_special_leaveDeleteManyArgs>(args?: SelectSubset<T, tb_special_leaveDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tb_special_leaves.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tb_special_leaveUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tb_special_leaves
     * const tb_special_leave = await prisma.tb_special_leave.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends tb_special_leaveUpdateManyArgs>(args: SelectSubset<T, tb_special_leaveUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tb_special_leaves and returns the data updated in the database.
     * @param {tb_special_leaveUpdateManyAndReturnArgs} args - Arguments to update many Tb_special_leaves.
     * @example
     * // Update many Tb_special_leaves
     * const tb_special_leave = await prisma.tb_special_leave.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tb_special_leaves and only return the `id_special`
     * const tb_special_leaveWithId_specialOnly = await prisma.tb_special_leave.updateManyAndReturn({
     *   select: { id_special: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends tb_special_leaveUpdateManyAndReturnArgs>(args: SelectSubset<T, tb_special_leaveUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tb_special_leavePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tb_special_leave.
     * @param {tb_special_leaveUpsertArgs} args - Arguments to update or create a Tb_special_leave.
     * @example
     * // Update or create a Tb_special_leave
     * const tb_special_leave = await prisma.tb_special_leave.upsert({
     *   create: {
     *     // ... data to create a Tb_special_leave
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tb_special_leave we want to update
     *   }
     * })
     */
    upsert<T extends tb_special_leaveUpsertArgs>(args: SelectSubset<T, tb_special_leaveUpsertArgs<ExtArgs>>): Prisma__tb_special_leaveClient<$Result.GetResult<Prisma.$tb_special_leavePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tb_special_leaves.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tb_special_leaveCountArgs} args - Arguments to filter Tb_special_leaves to count.
     * @example
     * // Count the number of Tb_special_leaves
     * const count = await prisma.tb_special_leave.count({
     *   where: {
     *     // ... the filter for the Tb_special_leaves we want to count
     *   }
     * })
    **/
    count<T extends tb_special_leaveCountArgs>(
      args?: Subset<T, tb_special_leaveCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Tb_special_leaveCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tb_special_leave.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Tb_special_leaveAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Tb_special_leaveAggregateArgs>(args: Subset<T, Tb_special_leaveAggregateArgs>): Prisma.PrismaPromise<GetTb_special_leaveAggregateType<T>>

    /**
     * Group by Tb_special_leave.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tb_special_leaveGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends tb_special_leaveGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: tb_special_leaveGroupByArgs['orderBy'] }
        : { orderBy?: tb_special_leaveGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, tb_special_leaveGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTb_special_leaveGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the tb_special_leave model
   */
  readonly fields: tb_special_leaveFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for tb_special_leave.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__tb_special_leaveClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tb_leave<T extends tb_special_leave$tb_leaveArgs<ExtArgs> = {}>(args?: Subset<T, tb_special_leave$tb_leaveArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tb_leavePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the tb_special_leave model
   */
  interface tb_special_leaveFieldRefs {
    readonly id_special: FieldRef<"tb_special_leave", 'String'>
    readonly title: FieldRef<"tb_special_leave", 'String'>
    readonly applicable_gender: FieldRef<"tb_special_leave", 'applicable_gender'>
    readonly duration: FieldRef<"tb_special_leave", 'Int'>
    readonly is_active: FieldRef<"tb_special_leave", 'Boolean'>
    readonly description: FieldRef<"tb_special_leave", 'String'>
  }
    

  // Custom InputTypes
  /**
   * tb_special_leave findUnique
   */
  export type tb_special_leaveFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_special_leave
     */
    select?: tb_special_leaveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_special_leave
     */
    omit?: tb_special_leaveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_special_leaveInclude<ExtArgs> | null
    /**
     * Filter, which tb_special_leave to fetch.
     */
    where: tb_special_leaveWhereUniqueInput
  }

  /**
   * tb_special_leave findUniqueOrThrow
   */
  export type tb_special_leaveFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_special_leave
     */
    select?: tb_special_leaveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_special_leave
     */
    omit?: tb_special_leaveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_special_leaveInclude<ExtArgs> | null
    /**
     * Filter, which tb_special_leave to fetch.
     */
    where: tb_special_leaveWhereUniqueInput
  }

  /**
   * tb_special_leave findFirst
   */
  export type tb_special_leaveFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_special_leave
     */
    select?: tb_special_leaveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_special_leave
     */
    omit?: tb_special_leaveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_special_leaveInclude<ExtArgs> | null
    /**
     * Filter, which tb_special_leave to fetch.
     */
    where?: tb_special_leaveWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tb_special_leaves to fetch.
     */
    orderBy?: tb_special_leaveOrderByWithRelationInput | tb_special_leaveOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tb_special_leaves.
     */
    cursor?: tb_special_leaveWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tb_special_leaves from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tb_special_leaves.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tb_special_leaves.
     */
    distinct?: Tb_special_leaveScalarFieldEnum | Tb_special_leaveScalarFieldEnum[]
  }

  /**
   * tb_special_leave findFirstOrThrow
   */
  export type tb_special_leaveFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_special_leave
     */
    select?: tb_special_leaveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_special_leave
     */
    omit?: tb_special_leaveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_special_leaveInclude<ExtArgs> | null
    /**
     * Filter, which tb_special_leave to fetch.
     */
    where?: tb_special_leaveWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tb_special_leaves to fetch.
     */
    orderBy?: tb_special_leaveOrderByWithRelationInput | tb_special_leaveOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tb_special_leaves.
     */
    cursor?: tb_special_leaveWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tb_special_leaves from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tb_special_leaves.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tb_special_leaves.
     */
    distinct?: Tb_special_leaveScalarFieldEnum | Tb_special_leaveScalarFieldEnum[]
  }

  /**
   * tb_special_leave findMany
   */
  export type tb_special_leaveFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_special_leave
     */
    select?: tb_special_leaveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_special_leave
     */
    omit?: tb_special_leaveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_special_leaveInclude<ExtArgs> | null
    /**
     * Filter, which tb_special_leaves to fetch.
     */
    where?: tb_special_leaveWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tb_special_leaves to fetch.
     */
    orderBy?: tb_special_leaveOrderByWithRelationInput | tb_special_leaveOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing tb_special_leaves.
     */
    cursor?: tb_special_leaveWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tb_special_leaves from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tb_special_leaves.
     */
    skip?: number
    distinct?: Tb_special_leaveScalarFieldEnum | Tb_special_leaveScalarFieldEnum[]
  }

  /**
   * tb_special_leave create
   */
  export type tb_special_leaveCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_special_leave
     */
    select?: tb_special_leaveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_special_leave
     */
    omit?: tb_special_leaveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_special_leaveInclude<ExtArgs> | null
    /**
     * The data needed to create a tb_special_leave.
     */
    data: XOR<tb_special_leaveCreateInput, tb_special_leaveUncheckedCreateInput>
  }

  /**
   * tb_special_leave createMany
   */
  export type tb_special_leaveCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many tb_special_leaves.
     */
    data: tb_special_leaveCreateManyInput | tb_special_leaveCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * tb_special_leave createManyAndReturn
   */
  export type tb_special_leaveCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_special_leave
     */
    select?: tb_special_leaveSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the tb_special_leave
     */
    omit?: tb_special_leaveOmit<ExtArgs> | null
    /**
     * The data used to create many tb_special_leaves.
     */
    data: tb_special_leaveCreateManyInput | tb_special_leaveCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * tb_special_leave update
   */
  export type tb_special_leaveUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_special_leave
     */
    select?: tb_special_leaveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_special_leave
     */
    omit?: tb_special_leaveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_special_leaveInclude<ExtArgs> | null
    /**
     * The data needed to update a tb_special_leave.
     */
    data: XOR<tb_special_leaveUpdateInput, tb_special_leaveUncheckedUpdateInput>
    /**
     * Choose, which tb_special_leave to update.
     */
    where: tb_special_leaveWhereUniqueInput
  }

  /**
   * tb_special_leave updateMany
   */
  export type tb_special_leaveUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update tb_special_leaves.
     */
    data: XOR<tb_special_leaveUpdateManyMutationInput, tb_special_leaveUncheckedUpdateManyInput>
    /**
     * Filter which tb_special_leaves to update
     */
    where?: tb_special_leaveWhereInput
    /**
     * Limit how many tb_special_leaves to update.
     */
    limit?: number
  }

  /**
   * tb_special_leave updateManyAndReturn
   */
  export type tb_special_leaveUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_special_leave
     */
    select?: tb_special_leaveSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the tb_special_leave
     */
    omit?: tb_special_leaveOmit<ExtArgs> | null
    /**
     * The data used to update tb_special_leaves.
     */
    data: XOR<tb_special_leaveUpdateManyMutationInput, tb_special_leaveUncheckedUpdateManyInput>
    /**
     * Filter which tb_special_leaves to update
     */
    where?: tb_special_leaveWhereInput
    /**
     * Limit how many tb_special_leaves to update.
     */
    limit?: number
  }

  /**
   * tb_special_leave upsert
   */
  export type tb_special_leaveUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_special_leave
     */
    select?: tb_special_leaveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_special_leave
     */
    omit?: tb_special_leaveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_special_leaveInclude<ExtArgs> | null
    /**
     * The filter to search for the tb_special_leave to update in case it exists.
     */
    where: tb_special_leaveWhereUniqueInput
    /**
     * In case the tb_special_leave found by the `where` argument doesn't exist, create a new tb_special_leave with this data.
     */
    create: XOR<tb_special_leaveCreateInput, tb_special_leaveUncheckedCreateInput>
    /**
     * In case the tb_special_leave was found with the provided `where` argument, update it with this data.
     */
    update: XOR<tb_special_leaveUpdateInput, tb_special_leaveUncheckedUpdateInput>
  }

  /**
   * tb_special_leave delete
   */
  export type tb_special_leaveDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_special_leave
     */
    select?: tb_special_leaveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_special_leave
     */
    omit?: tb_special_leaveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_special_leaveInclude<ExtArgs> | null
    /**
     * Filter which tb_special_leave to delete.
     */
    where: tb_special_leaveWhereUniqueInput
  }

  /**
   * tb_special_leave deleteMany
   */
  export type tb_special_leaveDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tb_special_leaves to delete
     */
    where?: tb_special_leaveWhereInput
    /**
     * Limit how many tb_special_leaves to delete.
     */
    limit?: number
  }

  /**
   * tb_special_leave.tb_leave
   */
  export type tb_special_leave$tb_leaveArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_leave
     */
    select?: tb_leaveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_leave
     */
    omit?: tb_leaveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_leaveInclude<ExtArgs> | null
    where?: tb_leaveWhereInput
    orderBy?: tb_leaveOrderByWithRelationInput | tb_leaveOrderByWithRelationInput[]
    cursor?: tb_leaveWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Tb_leaveScalarFieldEnum | Tb_leaveScalarFieldEnum[]
  }

  /**
   * tb_special_leave without action
   */
  export type tb_special_leaveDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_special_leave
     */
    select?: tb_special_leaveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_special_leave
     */
    omit?: tb_special_leaveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_special_leaveInclude<ExtArgs> | null
  }


  /**
   * Model tb_users
   */

  export type AggregateTb_users = {
    _count: Tb_usersCountAggregateOutputType | null
    _min: Tb_usersMinAggregateOutputType | null
    _max: Tb_usersMaxAggregateOutputType | null
  }

  export type Tb_usersMinAggregateOutputType = {
    NIK: string | null
    fullname: string | null
    email: string | null
    password: string | null
    gender: $Enums.gender | null
    role: $Enums.role | null
    status_active: $Enums.status_active | null
    join_date: Date | null
  }

  export type Tb_usersMaxAggregateOutputType = {
    NIK: string | null
    fullname: string | null
    email: string | null
    password: string | null
    gender: $Enums.gender | null
    role: $Enums.role | null
    status_active: $Enums.status_active | null
    join_date: Date | null
  }

  export type Tb_usersCountAggregateOutputType = {
    NIK: number
    fullname: number
    email: number
    password: number
    gender: number
    role: number
    status_active: number
    join_date: number
    _all: number
  }


  export type Tb_usersMinAggregateInputType = {
    NIK?: true
    fullname?: true
    email?: true
    password?: true
    gender?: true
    role?: true
    status_active?: true
    join_date?: true
  }

  export type Tb_usersMaxAggregateInputType = {
    NIK?: true
    fullname?: true
    email?: true
    password?: true
    gender?: true
    role?: true
    status_active?: true
    join_date?: true
  }

  export type Tb_usersCountAggregateInputType = {
    NIK?: true
    fullname?: true
    email?: true
    password?: true
    gender?: true
    role?: true
    status_active?: true
    join_date?: true
    _all?: true
  }

  export type Tb_usersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tb_users to aggregate.
     */
    where?: tb_usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tb_users to fetch.
     */
    orderBy?: tb_usersOrderByWithRelationInput | tb_usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: tb_usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tb_users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tb_users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned tb_users
    **/
    _count?: true | Tb_usersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Tb_usersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Tb_usersMaxAggregateInputType
  }

  export type GetTb_usersAggregateType<T extends Tb_usersAggregateArgs> = {
        [P in keyof T & keyof AggregateTb_users]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTb_users[P]>
      : GetScalarType<T[P], AggregateTb_users[P]>
  }




  export type tb_usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tb_usersWhereInput
    orderBy?: tb_usersOrderByWithAggregationInput | tb_usersOrderByWithAggregationInput[]
    by: Tb_usersScalarFieldEnum[] | Tb_usersScalarFieldEnum
    having?: tb_usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Tb_usersCountAggregateInputType | true
    _min?: Tb_usersMinAggregateInputType
    _max?: Tb_usersMaxAggregateInputType
  }

  export type Tb_usersGroupByOutputType = {
    NIK: string
    fullname: string
    email: string
    password: string
    gender: $Enums.gender
    role: $Enums.role
    status_active: $Enums.status_active
    join_date: Date
    _count: Tb_usersCountAggregateOutputType | null
    _min: Tb_usersMinAggregateOutputType | null
    _max: Tb_usersMaxAggregateOutputType | null
  }

  type GetTb_usersGroupByPayload<T extends tb_usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Tb_usersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Tb_usersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Tb_usersGroupByOutputType[P]>
            : GetScalarType<T[P], Tb_usersGroupByOutputType[P]>
        }
      >
    >


  export type tb_usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    NIK?: boolean
    fullname?: boolean
    email?: boolean
    password?: boolean
    gender?: boolean
    role?: boolean
    status_active?: boolean
    join_date?: boolean
    tb_balance?: boolean | tb_users$tb_balanceArgs<ExtArgs>
    tb_balance_adjustment?: boolean | tb_users$tb_balance_adjustmentArgs<ExtArgs>
    tb_leave?: boolean | tb_users$tb_leaveArgs<ExtArgs>
    _count?: boolean | Tb_usersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tb_users"]>

  export type tb_usersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    NIK?: boolean
    fullname?: boolean
    email?: boolean
    password?: boolean
    gender?: boolean
    role?: boolean
    status_active?: boolean
    join_date?: boolean
  }, ExtArgs["result"]["tb_users"]>

  export type tb_usersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    NIK?: boolean
    fullname?: boolean
    email?: boolean
    password?: boolean
    gender?: boolean
    role?: boolean
    status_active?: boolean
    join_date?: boolean
  }, ExtArgs["result"]["tb_users"]>

  export type tb_usersSelectScalar = {
    NIK?: boolean
    fullname?: boolean
    email?: boolean
    password?: boolean
    gender?: boolean
    role?: boolean
    status_active?: boolean
    join_date?: boolean
  }

  export type tb_usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"NIK" | "fullname" | "email" | "password" | "gender" | "role" | "status_active" | "join_date", ExtArgs["result"]["tb_users"]>
  export type tb_usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tb_balance?: boolean | tb_users$tb_balanceArgs<ExtArgs>
    tb_balance_adjustment?: boolean | tb_users$tb_balance_adjustmentArgs<ExtArgs>
    tb_leave?: boolean | tb_users$tb_leaveArgs<ExtArgs>
    _count?: boolean | Tb_usersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type tb_usersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type tb_usersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $tb_usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "tb_users"
    objects: {
      tb_balance: Prisma.$tb_balancePayload<ExtArgs>[]
      tb_balance_adjustment: Prisma.$tb_balance_adjustmentPayload<ExtArgs>[]
      tb_leave: Prisma.$tb_leavePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      NIK: string
      fullname: string
      email: string
      password: string
      gender: $Enums.gender
      role: $Enums.role
      status_active: $Enums.status_active
      join_date: Date
    }, ExtArgs["result"]["tb_users"]>
    composites: {}
  }

  type tb_usersGetPayload<S extends boolean | null | undefined | tb_usersDefaultArgs> = $Result.GetResult<Prisma.$tb_usersPayload, S>

  type tb_usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<tb_usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Tb_usersCountAggregateInputType | true
    }

  export interface tb_usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['tb_users'], meta: { name: 'tb_users' } }
    /**
     * Find zero or one Tb_users that matches the filter.
     * @param {tb_usersFindUniqueArgs} args - Arguments to find a Tb_users
     * @example
     * // Get one Tb_users
     * const tb_users = await prisma.tb_users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends tb_usersFindUniqueArgs>(args: SelectSubset<T, tb_usersFindUniqueArgs<ExtArgs>>): Prisma__tb_usersClient<$Result.GetResult<Prisma.$tb_usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tb_users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {tb_usersFindUniqueOrThrowArgs} args - Arguments to find a Tb_users
     * @example
     * // Get one Tb_users
     * const tb_users = await prisma.tb_users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends tb_usersFindUniqueOrThrowArgs>(args: SelectSubset<T, tb_usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__tb_usersClient<$Result.GetResult<Prisma.$tb_usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tb_users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tb_usersFindFirstArgs} args - Arguments to find a Tb_users
     * @example
     * // Get one Tb_users
     * const tb_users = await prisma.tb_users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends tb_usersFindFirstArgs>(args?: SelectSubset<T, tb_usersFindFirstArgs<ExtArgs>>): Prisma__tb_usersClient<$Result.GetResult<Prisma.$tb_usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tb_users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tb_usersFindFirstOrThrowArgs} args - Arguments to find a Tb_users
     * @example
     * // Get one Tb_users
     * const tb_users = await prisma.tb_users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends tb_usersFindFirstOrThrowArgs>(args?: SelectSubset<T, tb_usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__tb_usersClient<$Result.GetResult<Prisma.$tb_usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tb_users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tb_usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tb_users
     * const tb_users = await prisma.tb_users.findMany()
     * 
     * // Get first 10 Tb_users
     * const tb_users = await prisma.tb_users.findMany({ take: 10 })
     * 
     * // Only select the `NIK`
     * const tb_usersWithNIKOnly = await prisma.tb_users.findMany({ select: { NIK: true } })
     * 
     */
    findMany<T extends tb_usersFindManyArgs>(args?: SelectSubset<T, tb_usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tb_usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tb_users.
     * @param {tb_usersCreateArgs} args - Arguments to create a Tb_users.
     * @example
     * // Create one Tb_users
     * const Tb_users = await prisma.tb_users.create({
     *   data: {
     *     // ... data to create a Tb_users
     *   }
     * })
     * 
     */
    create<T extends tb_usersCreateArgs>(args: SelectSubset<T, tb_usersCreateArgs<ExtArgs>>): Prisma__tb_usersClient<$Result.GetResult<Prisma.$tb_usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tb_users.
     * @param {tb_usersCreateManyArgs} args - Arguments to create many Tb_users.
     * @example
     * // Create many Tb_users
     * const tb_users = await prisma.tb_users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends tb_usersCreateManyArgs>(args?: SelectSubset<T, tb_usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tb_users and returns the data saved in the database.
     * @param {tb_usersCreateManyAndReturnArgs} args - Arguments to create many Tb_users.
     * @example
     * // Create many Tb_users
     * const tb_users = await prisma.tb_users.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tb_users and only return the `NIK`
     * const tb_usersWithNIKOnly = await prisma.tb_users.createManyAndReturn({
     *   select: { NIK: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends tb_usersCreateManyAndReturnArgs>(args?: SelectSubset<T, tb_usersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tb_usersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tb_users.
     * @param {tb_usersDeleteArgs} args - Arguments to delete one Tb_users.
     * @example
     * // Delete one Tb_users
     * const Tb_users = await prisma.tb_users.delete({
     *   where: {
     *     // ... filter to delete one Tb_users
     *   }
     * })
     * 
     */
    delete<T extends tb_usersDeleteArgs>(args: SelectSubset<T, tb_usersDeleteArgs<ExtArgs>>): Prisma__tb_usersClient<$Result.GetResult<Prisma.$tb_usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tb_users.
     * @param {tb_usersUpdateArgs} args - Arguments to update one Tb_users.
     * @example
     * // Update one Tb_users
     * const tb_users = await prisma.tb_users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends tb_usersUpdateArgs>(args: SelectSubset<T, tb_usersUpdateArgs<ExtArgs>>): Prisma__tb_usersClient<$Result.GetResult<Prisma.$tb_usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tb_users.
     * @param {tb_usersDeleteManyArgs} args - Arguments to filter Tb_users to delete.
     * @example
     * // Delete a few Tb_users
     * const { count } = await prisma.tb_users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends tb_usersDeleteManyArgs>(args?: SelectSubset<T, tb_usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tb_users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tb_usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tb_users
     * const tb_users = await prisma.tb_users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends tb_usersUpdateManyArgs>(args: SelectSubset<T, tb_usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tb_users and returns the data updated in the database.
     * @param {tb_usersUpdateManyAndReturnArgs} args - Arguments to update many Tb_users.
     * @example
     * // Update many Tb_users
     * const tb_users = await prisma.tb_users.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tb_users and only return the `NIK`
     * const tb_usersWithNIKOnly = await prisma.tb_users.updateManyAndReturn({
     *   select: { NIK: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends tb_usersUpdateManyAndReturnArgs>(args: SelectSubset<T, tb_usersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tb_usersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tb_users.
     * @param {tb_usersUpsertArgs} args - Arguments to update or create a Tb_users.
     * @example
     * // Update or create a Tb_users
     * const tb_users = await prisma.tb_users.upsert({
     *   create: {
     *     // ... data to create a Tb_users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tb_users we want to update
     *   }
     * })
     */
    upsert<T extends tb_usersUpsertArgs>(args: SelectSubset<T, tb_usersUpsertArgs<ExtArgs>>): Prisma__tb_usersClient<$Result.GetResult<Prisma.$tb_usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tb_users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tb_usersCountArgs} args - Arguments to filter Tb_users to count.
     * @example
     * // Count the number of Tb_users
     * const count = await prisma.tb_users.count({
     *   where: {
     *     // ... the filter for the Tb_users we want to count
     *   }
     * })
    **/
    count<T extends tb_usersCountArgs>(
      args?: Subset<T, tb_usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Tb_usersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tb_users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Tb_usersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Tb_usersAggregateArgs>(args: Subset<T, Tb_usersAggregateArgs>): Prisma.PrismaPromise<GetTb_usersAggregateType<T>>

    /**
     * Group by Tb_users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tb_usersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends tb_usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: tb_usersGroupByArgs['orderBy'] }
        : { orderBy?: tb_usersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, tb_usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTb_usersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the tb_users model
   */
  readonly fields: tb_usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for tb_users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__tb_usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tb_balance<T extends tb_users$tb_balanceArgs<ExtArgs> = {}>(args?: Subset<T, tb_users$tb_balanceArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tb_balancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tb_balance_adjustment<T extends tb_users$tb_balance_adjustmentArgs<ExtArgs> = {}>(args?: Subset<T, tb_users$tb_balance_adjustmentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tb_balance_adjustmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tb_leave<T extends tb_users$tb_leaveArgs<ExtArgs> = {}>(args?: Subset<T, tb_users$tb_leaveArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tb_leavePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the tb_users model
   */
  interface tb_usersFieldRefs {
    readonly NIK: FieldRef<"tb_users", 'String'>
    readonly fullname: FieldRef<"tb_users", 'String'>
    readonly email: FieldRef<"tb_users", 'String'>
    readonly password: FieldRef<"tb_users", 'String'>
    readonly gender: FieldRef<"tb_users", 'gender'>
    readonly role: FieldRef<"tb_users", 'role'>
    readonly status_active: FieldRef<"tb_users", 'status_active'>
    readonly join_date: FieldRef<"tb_users", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * tb_users findUnique
   */
  export type tb_usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_users
     */
    select?: tb_usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_users
     */
    omit?: tb_usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_usersInclude<ExtArgs> | null
    /**
     * Filter, which tb_users to fetch.
     */
    where: tb_usersWhereUniqueInput
  }

  /**
   * tb_users findUniqueOrThrow
   */
  export type tb_usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_users
     */
    select?: tb_usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_users
     */
    omit?: tb_usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_usersInclude<ExtArgs> | null
    /**
     * Filter, which tb_users to fetch.
     */
    where: tb_usersWhereUniqueInput
  }

  /**
   * tb_users findFirst
   */
  export type tb_usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_users
     */
    select?: tb_usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_users
     */
    omit?: tb_usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_usersInclude<ExtArgs> | null
    /**
     * Filter, which tb_users to fetch.
     */
    where?: tb_usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tb_users to fetch.
     */
    orderBy?: tb_usersOrderByWithRelationInput | tb_usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tb_users.
     */
    cursor?: tb_usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tb_users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tb_users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tb_users.
     */
    distinct?: Tb_usersScalarFieldEnum | Tb_usersScalarFieldEnum[]
  }

  /**
   * tb_users findFirstOrThrow
   */
  export type tb_usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_users
     */
    select?: tb_usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_users
     */
    omit?: tb_usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_usersInclude<ExtArgs> | null
    /**
     * Filter, which tb_users to fetch.
     */
    where?: tb_usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tb_users to fetch.
     */
    orderBy?: tb_usersOrderByWithRelationInput | tb_usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tb_users.
     */
    cursor?: tb_usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tb_users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tb_users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tb_users.
     */
    distinct?: Tb_usersScalarFieldEnum | Tb_usersScalarFieldEnum[]
  }

  /**
   * tb_users findMany
   */
  export type tb_usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_users
     */
    select?: tb_usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_users
     */
    omit?: tb_usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_usersInclude<ExtArgs> | null
    /**
     * Filter, which tb_users to fetch.
     */
    where?: tb_usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tb_users to fetch.
     */
    orderBy?: tb_usersOrderByWithRelationInput | tb_usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing tb_users.
     */
    cursor?: tb_usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tb_users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tb_users.
     */
    skip?: number
    distinct?: Tb_usersScalarFieldEnum | Tb_usersScalarFieldEnum[]
  }

  /**
   * tb_users create
   */
  export type tb_usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_users
     */
    select?: tb_usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_users
     */
    omit?: tb_usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_usersInclude<ExtArgs> | null
    /**
     * The data needed to create a tb_users.
     */
    data: XOR<tb_usersCreateInput, tb_usersUncheckedCreateInput>
  }

  /**
   * tb_users createMany
   */
  export type tb_usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many tb_users.
     */
    data: tb_usersCreateManyInput | tb_usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * tb_users createManyAndReturn
   */
  export type tb_usersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_users
     */
    select?: tb_usersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the tb_users
     */
    omit?: tb_usersOmit<ExtArgs> | null
    /**
     * The data used to create many tb_users.
     */
    data: tb_usersCreateManyInput | tb_usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * tb_users update
   */
  export type tb_usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_users
     */
    select?: tb_usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_users
     */
    omit?: tb_usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_usersInclude<ExtArgs> | null
    /**
     * The data needed to update a tb_users.
     */
    data: XOR<tb_usersUpdateInput, tb_usersUncheckedUpdateInput>
    /**
     * Choose, which tb_users to update.
     */
    where: tb_usersWhereUniqueInput
  }

  /**
   * tb_users updateMany
   */
  export type tb_usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update tb_users.
     */
    data: XOR<tb_usersUpdateManyMutationInput, tb_usersUncheckedUpdateManyInput>
    /**
     * Filter which tb_users to update
     */
    where?: tb_usersWhereInput
    /**
     * Limit how many tb_users to update.
     */
    limit?: number
  }

  /**
   * tb_users updateManyAndReturn
   */
  export type tb_usersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_users
     */
    select?: tb_usersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the tb_users
     */
    omit?: tb_usersOmit<ExtArgs> | null
    /**
     * The data used to update tb_users.
     */
    data: XOR<tb_usersUpdateManyMutationInput, tb_usersUncheckedUpdateManyInput>
    /**
     * Filter which tb_users to update
     */
    where?: tb_usersWhereInput
    /**
     * Limit how many tb_users to update.
     */
    limit?: number
  }

  /**
   * tb_users upsert
   */
  export type tb_usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_users
     */
    select?: tb_usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_users
     */
    omit?: tb_usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_usersInclude<ExtArgs> | null
    /**
     * The filter to search for the tb_users to update in case it exists.
     */
    where: tb_usersWhereUniqueInput
    /**
     * In case the tb_users found by the `where` argument doesn't exist, create a new tb_users with this data.
     */
    create: XOR<tb_usersCreateInput, tb_usersUncheckedCreateInput>
    /**
     * In case the tb_users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<tb_usersUpdateInput, tb_usersUncheckedUpdateInput>
  }

  /**
   * tb_users delete
   */
  export type tb_usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_users
     */
    select?: tb_usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_users
     */
    omit?: tb_usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_usersInclude<ExtArgs> | null
    /**
     * Filter which tb_users to delete.
     */
    where: tb_usersWhereUniqueInput
  }

  /**
   * tb_users deleteMany
   */
  export type tb_usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tb_users to delete
     */
    where?: tb_usersWhereInput
    /**
     * Limit how many tb_users to delete.
     */
    limit?: number
  }

  /**
   * tb_users.tb_balance
   */
  export type tb_users$tb_balanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_balance
     */
    select?: tb_balanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_balance
     */
    omit?: tb_balanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_balanceInclude<ExtArgs> | null
    where?: tb_balanceWhereInput
    orderBy?: tb_balanceOrderByWithRelationInput | tb_balanceOrderByWithRelationInput[]
    cursor?: tb_balanceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Tb_balanceScalarFieldEnum | Tb_balanceScalarFieldEnum[]
  }

  /**
   * tb_users.tb_balance_adjustment
   */
  export type tb_users$tb_balance_adjustmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_balance_adjustment
     */
    select?: tb_balance_adjustmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_balance_adjustment
     */
    omit?: tb_balance_adjustmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_balance_adjustmentInclude<ExtArgs> | null
    where?: tb_balance_adjustmentWhereInput
    orderBy?: tb_balance_adjustmentOrderByWithRelationInput | tb_balance_adjustmentOrderByWithRelationInput[]
    cursor?: tb_balance_adjustmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Tb_balance_adjustmentScalarFieldEnum | Tb_balance_adjustmentScalarFieldEnum[]
  }

  /**
   * tb_users.tb_leave
   */
  export type tb_users$tb_leaveArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_leave
     */
    select?: tb_leaveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_leave
     */
    omit?: tb_leaveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_leaveInclude<ExtArgs> | null
    where?: tb_leaveWhereInput
    orderBy?: tb_leaveOrderByWithRelationInput | tb_leaveOrderByWithRelationInput[]
    cursor?: tb_leaveWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Tb_leaveScalarFieldEnum | Tb_leaveScalarFieldEnum[]
  }

  /**
   * tb_users without action
   */
  export type tb_usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_users
     */
    select?: tb_usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_users
     */
    omit?: tb_usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_usersInclude<ExtArgs> | null
  }


  /**
   * Model tb_balance_adjustment
   */

  export type AggregateTb_balance_adjustment = {
    _count: Tb_balance_adjustmentCountAggregateOutputType | null
    _avg: Tb_balance_adjustmentAvgAggregateOutputType | null
    _sum: Tb_balance_adjustmentSumAggregateOutputType | null
    _min: Tb_balance_adjustmentMinAggregateOutputType | null
    _max: Tb_balance_adjustmentMaxAggregateOutputType | null
  }

  export type Tb_balance_adjustmentAvgAggregateOutputType = {
    adjustment_value: number | null
  }

  export type Tb_balance_adjustmentSumAggregateOutputType = {
    adjustment_value: number | null
  }

  export type Tb_balance_adjustmentMinAggregateOutputType = {
    id_adjustment: string | null
    adjustment_value: number | null
    notes: string | null
    created_at: Date | null
    actor: string | null
    NIK: string | null
  }

  export type Tb_balance_adjustmentMaxAggregateOutputType = {
    id_adjustment: string | null
    adjustment_value: number | null
    notes: string | null
    created_at: Date | null
    actor: string | null
    NIK: string | null
  }

  export type Tb_balance_adjustmentCountAggregateOutputType = {
    id_adjustment: number
    adjustment_value: number
    notes: number
    created_at: number
    actor: number
    NIK: number
    _all: number
  }


  export type Tb_balance_adjustmentAvgAggregateInputType = {
    adjustment_value?: true
  }

  export type Tb_balance_adjustmentSumAggregateInputType = {
    adjustment_value?: true
  }

  export type Tb_balance_adjustmentMinAggregateInputType = {
    id_adjustment?: true
    adjustment_value?: true
    notes?: true
    created_at?: true
    actor?: true
    NIK?: true
  }

  export type Tb_balance_adjustmentMaxAggregateInputType = {
    id_adjustment?: true
    adjustment_value?: true
    notes?: true
    created_at?: true
    actor?: true
    NIK?: true
  }

  export type Tb_balance_adjustmentCountAggregateInputType = {
    id_adjustment?: true
    adjustment_value?: true
    notes?: true
    created_at?: true
    actor?: true
    NIK?: true
    _all?: true
  }

  export type Tb_balance_adjustmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tb_balance_adjustment to aggregate.
     */
    where?: tb_balance_adjustmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tb_balance_adjustments to fetch.
     */
    orderBy?: tb_balance_adjustmentOrderByWithRelationInput | tb_balance_adjustmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: tb_balance_adjustmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tb_balance_adjustments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tb_balance_adjustments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned tb_balance_adjustments
    **/
    _count?: true | Tb_balance_adjustmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Tb_balance_adjustmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Tb_balance_adjustmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Tb_balance_adjustmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Tb_balance_adjustmentMaxAggregateInputType
  }

  export type GetTb_balance_adjustmentAggregateType<T extends Tb_balance_adjustmentAggregateArgs> = {
        [P in keyof T & keyof AggregateTb_balance_adjustment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTb_balance_adjustment[P]>
      : GetScalarType<T[P], AggregateTb_balance_adjustment[P]>
  }




  export type tb_balance_adjustmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tb_balance_adjustmentWhereInput
    orderBy?: tb_balance_adjustmentOrderByWithAggregationInput | tb_balance_adjustmentOrderByWithAggregationInput[]
    by: Tb_balance_adjustmentScalarFieldEnum[] | Tb_balance_adjustmentScalarFieldEnum
    having?: tb_balance_adjustmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Tb_balance_adjustmentCountAggregateInputType | true
    _avg?: Tb_balance_adjustmentAvgAggregateInputType
    _sum?: Tb_balance_adjustmentSumAggregateInputType
    _min?: Tb_balance_adjustmentMinAggregateInputType
    _max?: Tb_balance_adjustmentMaxAggregateInputType
  }

  export type Tb_balance_adjustmentGroupByOutputType = {
    id_adjustment: string
    adjustment_value: number
    notes: string
    created_at: Date
    actor: string
    NIK: string
    _count: Tb_balance_adjustmentCountAggregateOutputType | null
    _avg: Tb_balance_adjustmentAvgAggregateOutputType | null
    _sum: Tb_balance_adjustmentSumAggregateOutputType | null
    _min: Tb_balance_adjustmentMinAggregateOutputType | null
    _max: Tb_balance_adjustmentMaxAggregateOutputType | null
  }

  type GetTb_balance_adjustmentGroupByPayload<T extends tb_balance_adjustmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Tb_balance_adjustmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Tb_balance_adjustmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Tb_balance_adjustmentGroupByOutputType[P]>
            : GetScalarType<T[P], Tb_balance_adjustmentGroupByOutputType[P]>
        }
      >
    >


  export type tb_balance_adjustmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_adjustment?: boolean
    adjustment_value?: boolean
    notes?: boolean
    created_at?: boolean
    actor?: boolean
    NIK?: boolean
    tb_users?: boolean | tb_usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tb_balance_adjustment"]>

  export type tb_balance_adjustmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_adjustment?: boolean
    adjustment_value?: boolean
    notes?: boolean
    created_at?: boolean
    actor?: boolean
    NIK?: boolean
    tb_users?: boolean | tb_usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tb_balance_adjustment"]>

  export type tb_balance_adjustmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_adjustment?: boolean
    adjustment_value?: boolean
    notes?: boolean
    created_at?: boolean
    actor?: boolean
    NIK?: boolean
    tb_users?: boolean | tb_usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tb_balance_adjustment"]>

  export type tb_balance_adjustmentSelectScalar = {
    id_adjustment?: boolean
    adjustment_value?: boolean
    notes?: boolean
    created_at?: boolean
    actor?: boolean
    NIK?: boolean
  }

  export type tb_balance_adjustmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_adjustment" | "adjustment_value" | "notes" | "created_at" | "actor" | "NIK", ExtArgs["result"]["tb_balance_adjustment"]>
  export type tb_balance_adjustmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tb_users?: boolean | tb_usersDefaultArgs<ExtArgs>
  }
  export type tb_balance_adjustmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tb_users?: boolean | tb_usersDefaultArgs<ExtArgs>
  }
  export type tb_balance_adjustmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tb_users?: boolean | tb_usersDefaultArgs<ExtArgs>
  }

  export type $tb_balance_adjustmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "tb_balance_adjustment"
    objects: {
      tb_users: Prisma.$tb_usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id_adjustment: string
      adjustment_value: number
      notes: string
      created_at: Date
      actor: string
      NIK: string
    }, ExtArgs["result"]["tb_balance_adjustment"]>
    composites: {}
  }

  type tb_balance_adjustmentGetPayload<S extends boolean | null | undefined | tb_balance_adjustmentDefaultArgs> = $Result.GetResult<Prisma.$tb_balance_adjustmentPayload, S>

  type tb_balance_adjustmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<tb_balance_adjustmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Tb_balance_adjustmentCountAggregateInputType | true
    }

  export interface tb_balance_adjustmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['tb_balance_adjustment'], meta: { name: 'tb_balance_adjustment' } }
    /**
     * Find zero or one Tb_balance_adjustment that matches the filter.
     * @param {tb_balance_adjustmentFindUniqueArgs} args - Arguments to find a Tb_balance_adjustment
     * @example
     * // Get one Tb_balance_adjustment
     * const tb_balance_adjustment = await prisma.tb_balance_adjustment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends tb_balance_adjustmentFindUniqueArgs>(args: SelectSubset<T, tb_balance_adjustmentFindUniqueArgs<ExtArgs>>): Prisma__tb_balance_adjustmentClient<$Result.GetResult<Prisma.$tb_balance_adjustmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tb_balance_adjustment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {tb_balance_adjustmentFindUniqueOrThrowArgs} args - Arguments to find a Tb_balance_adjustment
     * @example
     * // Get one Tb_balance_adjustment
     * const tb_balance_adjustment = await prisma.tb_balance_adjustment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends tb_balance_adjustmentFindUniqueOrThrowArgs>(args: SelectSubset<T, tb_balance_adjustmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__tb_balance_adjustmentClient<$Result.GetResult<Prisma.$tb_balance_adjustmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tb_balance_adjustment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tb_balance_adjustmentFindFirstArgs} args - Arguments to find a Tb_balance_adjustment
     * @example
     * // Get one Tb_balance_adjustment
     * const tb_balance_adjustment = await prisma.tb_balance_adjustment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends tb_balance_adjustmentFindFirstArgs>(args?: SelectSubset<T, tb_balance_adjustmentFindFirstArgs<ExtArgs>>): Prisma__tb_balance_adjustmentClient<$Result.GetResult<Prisma.$tb_balance_adjustmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tb_balance_adjustment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tb_balance_adjustmentFindFirstOrThrowArgs} args - Arguments to find a Tb_balance_adjustment
     * @example
     * // Get one Tb_balance_adjustment
     * const tb_balance_adjustment = await prisma.tb_balance_adjustment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends tb_balance_adjustmentFindFirstOrThrowArgs>(args?: SelectSubset<T, tb_balance_adjustmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__tb_balance_adjustmentClient<$Result.GetResult<Prisma.$tb_balance_adjustmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tb_balance_adjustments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tb_balance_adjustmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tb_balance_adjustments
     * const tb_balance_adjustments = await prisma.tb_balance_adjustment.findMany()
     * 
     * // Get first 10 Tb_balance_adjustments
     * const tb_balance_adjustments = await prisma.tb_balance_adjustment.findMany({ take: 10 })
     * 
     * // Only select the `id_adjustment`
     * const tb_balance_adjustmentWithId_adjustmentOnly = await prisma.tb_balance_adjustment.findMany({ select: { id_adjustment: true } })
     * 
     */
    findMany<T extends tb_balance_adjustmentFindManyArgs>(args?: SelectSubset<T, tb_balance_adjustmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tb_balance_adjustmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tb_balance_adjustment.
     * @param {tb_balance_adjustmentCreateArgs} args - Arguments to create a Tb_balance_adjustment.
     * @example
     * // Create one Tb_balance_adjustment
     * const Tb_balance_adjustment = await prisma.tb_balance_adjustment.create({
     *   data: {
     *     // ... data to create a Tb_balance_adjustment
     *   }
     * })
     * 
     */
    create<T extends tb_balance_adjustmentCreateArgs>(args: SelectSubset<T, tb_balance_adjustmentCreateArgs<ExtArgs>>): Prisma__tb_balance_adjustmentClient<$Result.GetResult<Prisma.$tb_balance_adjustmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tb_balance_adjustments.
     * @param {tb_balance_adjustmentCreateManyArgs} args - Arguments to create many Tb_balance_adjustments.
     * @example
     * // Create many Tb_balance_adjustments
     * const tb_balance_adjustment = await prisma.tb_balance_adjustment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends tb_balance_adjustmentCreateManyArgs>(args?: SelectSubset<T, tb_balance_adjustmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tb_balance_adjustments and returns the data saved in the database.
     * @param {tb_balance_adjustmentCreateManyAndReturnArgs} args - Arguments to create many Tb_balance_adjustments.
     * @example
     * // Create many Tb_balance_adjustments
     * const tb_balance_adjustment = await prisma.tb_balance_adjustment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tb_balance_adjustments and only return the `id_adjustment`
     * const tb_balance_adjustmentWithId_adjustmentOnly = await prisma.tb_balance_adjustment.createManyAndReturn({
     *   select: { id_adjustment: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends tb_balance_adjustmentCreateManyAndReturnArgs>(args?: SelectSubset<T, tb_balance_adjustmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tb_balance_adjustmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tb_balance_adjustment.
     * @param {tb_balance_adjustmentDeleteArgs} args - Arguments to delete one Tb_balance_adjustment.
     * @example
     * // Delete one Tb_balance_adjustment
     * const Tb_balance_adjustment = await prisma.tb_balance_adjustment.delete({
     *   where: {
     *     // ... filter to delete one Tb_balance_adjustment
     *   }
     * })
     * 
     */
    delete<T extends tb_balance_adjustmentDeleteArgs>(args: SelectSubset<T, tb_balance_adjustmentDeleteArgs<ExtArgs>>): Prisma__tb_balance_adjustmentClient<$Result.GetResult<Prisma.$tb_balance_adjustmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tb_balance_adjustment.
     * @param {tb_balance_adjustmentUpdateArgs} args - Arguments to update one Tb_balance_adjustment.
     * @example
     * // Update one Tb_balance_adjustment
     * const tb_balance_adjustment = await prisma.tb_balance_adjustment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends tb_balance_adjustmentUpdateArgs>(args: SelectSubset<T, tb_balance_adjustmentUpdateArgs<ExtArgs>>): Prisma__tb_balance_adjustmentClient<$Result.GetResult<Prisma.$tb_balance_adjustmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tb_balance_adjustments.
     * @param {tb_balance_adjustmentDeleteManyArgs} args - Arguments to filter Tb_balance_adjustments to delete.
     * @example
     * // Delete a few Tb_balance_adjustments
     * const { count } = await prisma.tb_balance_adjustment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends tb_balance_adjustmentDeleteManyArgs>(args?: SelectSubset<T, tb_balance_adjustmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tb_balance_adjustments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tb_balance_adjustmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tb_balance_adjustments
     * const tb_balance_adjustment = await prisma.tb_balance_adjustment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends tb_balance_adjustmentUpdateManyArgs>(args: SelectSubset<T, tb_balance_adjustmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tb_balance_adjustments and returns the data updated in the database.
     * @param {tb_balance_adjustmentUpdateManyAndReturnArgs} args - Arguments to update many Tb_balance_adjustments.
     * @example
     * // Update many Tb_balance_adjustments
     * const tb_balance_adjustment = await prisma.tb_balance_adjustment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tb_balance_adjustments and only return the `id_adjustment`
     * const tb_balance_adjustmentWithId_adjustmentOnly = await prisma.tb_balance_adjustment.updateManyAndReturn({
     *   select: { id_adjustment: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends tb_balance_adjustmentUpdateManyAndReturnArgs>(args: SelectSubset<T, tb_balance_adjustmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tb_balance_adjustmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tb_balance_adjustment.
     * @param {tb_balance_adjustmentUpsertArgs} args - Arguments to update or create a Tb_balance_adjustment.
     * @example
     * // Update or create a Tb_balance_adjustment
     * const tb_balance_adjustment = await prisma.tb_balance_adjustment.upsert({
     *   create: {
     *     // ... data to create a Tb_balance_adjustment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tb_balance_adjustment we want to update
     *   }
     * })
     */
    upsert<T extends tb_balance_adjustmentUpsertArgs>(args: SelectSubset<T, tb_balance_adjustmentUpsertArgs<ExtArgs>>): Prisma__tb_balance_adjustmentClient<$Result.GetResult<Prisma.$tb_balance_adjustmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tb_balance_adjustments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tb_balance_adjustmentCountArgs} args - Arguments to filter Tb_balance_adjustments to count.
     * @example
     * // Count the number of Tb_balance_adjustments
     * const count = await prisma.tb_balance_adjustment.count({
     *   where: {
     *     // ... the filter for the Tb_balance_adjustments we want to count
     *   }
     * })
    **/
    count<T extends tb_balance_adjustmentCountArgs>(
      args?: Subset<T, tb_balance_adjustmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Tb_balance_adjustmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tb_balance_adjustment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Tb_balance_adjustmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Tb_balance_adjustmentAggregateArgs>(args: Subset<T, Tb_balance_adjustmentAggregateArgs>): Prisma.PrismaPromise<GetTb_balance_adjustmentAggregateType<T>>

    /**
     * Group by Tb_balance_adjustment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tb_balance_adjustmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends tb_balance_adjustmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: tb_balance_adjustmentGroupByArgs['orderBy'] }
        : { orderBy?: tb_balance_adjustmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, tb_balance_adjustmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTb_balance_adjustmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the tb_balance_adjustment model
   */
  readonly fields: tb_balance_adjustmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for tb_balance_adjustment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__tb_balance_adjustmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tb_users<T extends tb_usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, tb_usersDefaultArgs<ExtArgs>>): Prisma__tb_usersClient<$Result.GetResult<Prisma.$tb_usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the tb_balance_adjustment model
   */
  interface tb_balance_adjustmentFieldRefs {
    readonly id_adjustment: FieldRef<"tb_balance_adjustment", 'String'>
    readonly adjustment_value: FieldRef<"tb_balance_adjustment", 'Int'>
    readonly notes: FieldRef<"tb_balance_adjustment", 'String'>
    readonly created_at: FieldRef<"tb_balance_adjustment", 'DateTime'>
    readonly actor: FieldRef<"tb_balance_adjustment", 'String'>
    readonly NIK: FieldRef<"tb_balance_adjustment", 'String'>
  }
    

  // Custom InputTypes
  /**
   * tb_balance_adjustment findUnique
   */
  export type tb_balance_adjustmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_balance_adjustment
     */
    select?: tb_balance_adjustmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_balance_adjustment
     */
    omit?: tb_balance_adjustmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_balance_adjustmentInclude<ExtArgs> | null
    /**
     * Filter, which tb_balance_adjustment to fetch.
     */
    where: tb_balance_adjustmentWhereUniqueInput
  }

  /**
   * tb_balance_adjustment findUniqueOrThrow
   */
  export type tb_balance_adjustmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_balance_adjustment
     */
    select?: tb_balance_adjustmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_balance_adjustment
     */
    omit?: tb_balance_adjustmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_balance_adjustmentInclude<ExtArgs> | null
    /**
     * Filter, which tb_balance_adjustment to fetch.
     */
    where: tb_balance_adjustmentWhereUniqueInput
  }

  /**
   * tb_balance_adjustment findFirst
   */
  export type tb_balance_adjustmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_balance_adjustment
     */
    select?: tb_balance_adjustmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_balance_adjustment
     */
    omit?: tb_balance_adjustmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_balance_adjustmentInclude<ExtArgs> | null
    /**
     * Filter, which tb_balance_adjustment to fetch.
     */
    where?: tb_balance_adjustmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tb_balance_adjustments to fetch.
     */
    orderBy?: tb_balance_adjustmentOrderByWithRelationInput | tb_balance_adjustmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tb_balance_adjustments.
     */
    cursor?: tb_balance_adjustmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tb_balance_adjustments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tb_balance_adjustments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tb_balance_adjustments.
     */
    distinct?: Tb_balance_adjustmentScalarFieldEnum | Tb_balance_adjustmentScalarFieldEnum[]
  }

  /**
   * tb_balance_adjustment findFirstOrThrow
   */
  export type tb_balance_adjustmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_balance_adjustment
     */
    select?: tb_balance_adjustmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_balance_adjustment
     */
    omit?: tb_balance_adjustmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_balance_adjustmentInclude<ExtArgs> | null
    /**
     * Filter, which tb_balance_adjustment to fetch.
     */
    where?: tb_balance_adjustmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tb_balance_adjustments to fetch.
     */
    orderBy?: tb_balance_adjustmentOrderByWithRelationInput | tb_balance_adjustmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tb_balance_adjustments.
     */
    cursor?: tb_balance_adjustmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tb_balance_adjustments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tb_balance_adjustments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tb_balance_adjustments.
     */
    distinct?: Tb_balance_adjustmentScalarFieldEnum | Tb_balance_adjustmentScalarFieldEnum[]
  }

  /**
   * tb_balance_adjustment findMany
   */
  export type tb_balance_adjustmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_balance_adjustment
     */
    select?: tb_balance_adjustmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_balance_adjustment
     */
    omit?: tb_balance_adjustmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_balance_adjustmentInclude<ExtArgs> | null
    /**
     * Filter, which tb_balance_adjustments to fetch.
     */
    where?: tb_balance_adjustmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tb_balance_adjustments to fetch.
     */
    orderBy?: tb_balance_adjustmentOrderByWithRelationInput | tb_balance_adjustmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing tb_balance_adjustments.
     */
    cursor?: tb_balance_adjustmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tb_balance_adjustments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tb_balance_adjustments.
     */
    skip?: number
    distinct?: Tb_balance_adjustmentScalarFieldEnum | Tb_balance_adjustmentScalarFieldEnum[]
  }

  /**
   * tb_balance_adjustment create
   */
  export type tb_balance_adjustmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_balance_adjustment
     */
    select?: tb_balance_adjustmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_balance_adjustment
     */
    omit?: tb_balance_adjustmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_balance_adjustmentInclude<ExtArgs> | null
    /**
     * The data needed to create a tb_balance_adjustment.
     */
    data: XOR<tb_balance_adjustmentCreateInput, tb_balance_adjustmentUncheckedCreateInput>
  }

  /**
   * tb_balance_adjustment createMany
   */
  export type tb_balance_adjustmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many tb_balance_adjustments.
     */
    data: tb_balance_adjustmentCreateManyInput | tb_balance_adjustmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * tb_balance_adjustment createManyAndReturn
   */
  export type tb_balance_adjustmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_balance_adjustment
     */
    select?: tb_balance_adjustmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the tb_balance_adjustment
     */
    omit?: tb_balance_adjustmentOmit<ExtArgs> | null
    /**
     * The data used to create many tb_balance_adjustments.
     */
    data: tb_balance_adjustmentCreateManyInput | tb_balance_adjustmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_balance_adjustmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * tb_balance_adjustment update
   */
  export type tb_balance_adjustmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_balance_adjustment
     */
    select?: tb_balance_adjustmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_balance_adjustment
     */
    omit?: tb_balance_adjustmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_balance_adjustmentInclude<ExtArgs> | null
    /**
     * The data needed to update a tb_balance_adjustment.
     */
    data: XOR<tb_balance_adjustmentUpdateInput, tb_balance_adjustmentUncheckedUpdateInput>
    /**
     * Choose, which tb_balance_adjustment to update.
     */
    where: tb_balance_adjustmentWhereUniqueInput
  }

  /**
   * tb_balance_adjustment updateMany
   */
  export type tb_balance_adjustmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update tb_balance_adjustments.
     */
    data: XOR<tb_balance_adjustmentUpdateManyMutationInput, tb_balance_adjustmentUncheckedUpdateManyInput>
    /**
     * Filter which tb_balance_adjustments to update
     */
    where?: tb_balance_adjustmentWhereInput
    /**
     * Limit how many tb_balance_adjustments to update.
     */
    limit?: number
  }

  /**
   * tb_balance_adjustment updateManyAndReturn
   */
  export type tb_balance_adjustmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_balance_adjustment
     */
    select?: tb_balance_adjustmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the tb_balance_adjustment
     */
    omit?: tb_balance_adjustmentOmit<ExtArgs> | null
    /**
     * The data used to update tb_balance_adjustments.
     */
    data: XOR<tb_balance_adjustmentUpdateManyMutationInput, tb_balance_adjustmentUncheckedUpdateManyInput>
    /**
     * Filter which tb_balance_adjustments to update
     */
    where?: tb_balance_adjustmentWhereInput
    /**
     * Limit how many tb_balance_adjustments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_balance_adjustmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * tb_balance_adjustment upsert
   */
  export type tb_balance_adjustmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_balance_adjustment
     */
    select?: tb_balance_adjustmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_balance_adjustment
     */
    omit?: tb_balance_adjustmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_balance_adjustmentInclude<ExtArgs> | null
    /**
     * The filter to search for the tb_balance_adjustment to update in case it exists.
     */
    where: tb_balance_adjustmentWhereUniqueInput
    /**
     * In case the tb_balance_adjustment found by the `where` argument doesn't exist, create a new tb_balance_adjustment with this data.
     */
    create: XOR<tb_balance_adjustmentCreateInput, tb_balance_adjustmentUncheckedCreateInput>
    /**
     * In case the tb_balance_adjustment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<tb_balance_adjustmentUpdateInput, tb_balance_adjustmentUncheckedUpdateInput>
  }

  /**
   * tb_balance_adjustment delete
   */
  export type tb_balance_adjustmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_balance_adjustment
     */
    select?: tb_balance_adjustmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_balance_adjustment
     */
    omit?: tb_balance_adjustmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_balance_adjustmentInclude<ExtArgs> | null
    /**
     * Filter which tb_balance_adjustment to delete.
     */
    where: tb_balance_adjustmentWhereUniqueInput
  }

  /**
   * tb_balance_adjustment deleteMany
   */
  export type tb_balance_adjustmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tb_balance_adjustments to delete
     */
    where?: tb_balance_adjustmentWhereInput
    /**
     * Limit how many tb_balance_adjustments to delete.
     */
    limit?: number
  }

  /**
   * tb_balance_adjustment without action
   */
  export type tb_balance_adjustmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_balance_adjustment
     */
    select?: tb_balance_adjustmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_balance_adjustment
     */
    omit?: tb_balance_adjustmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_balance_adjustmentInclude<ExtArgs> | null
  }


  /**
   * Model tb_leave_log
   */

  export type AggregateTb_leave_log = {
    _count: Tb_leave_logCountAggregateOutputType | null
    _min: Tb_leave_logMinAggregateOutputType | null
    _max: Tb_leave_logMaxAggregateOutputType | null
  }

  export type Tb_leave_logMinAggregateOutputType = {
    id_log: string | null
    old_status: $Enums.status | null
    new_status: $Enums.status | null
    reason: string | null
    changed_at: Date | null
    changed_by_nik: string | null
    id_leave: string | null
  }

  export type Tb_leave_logMaxAggregateOutputType = {
    id_log: string | null
    old_status: $Enums.status | null
    new_status: $Enums.status | null
    reason: string | null
    changed_at: Date | null
    changed_by_nik: string | null
    id_leave: string | null
  }

  export type Tb_leave_logCountAggregateOutputType = {
    id_log: number
    old_status: number
    new_status: number
    reason: number
    changed_at: number
    changed_by_nik: number
    id_leave: number
    _all: number
  }


  export type Tb_leave_logMinAggregateInputType = {
    id_log?: true
    old_status?: true
    new_status?: true
    reason?: true
    changed_at?: true
    changed_by_nik?: true
    id_leave?: true
  }

  export type Tb_leave_logMaxAggregateInputType = {
    id_log?: true
    old_status?: true
    new_status?: true
    reason?: true
    changed_at?: true
    changed_by_nik?: true
    id_leave?: true
  }

  export type Tb_leave_logCountAggregateInputType = {
    id_log?: true
    old_status?: true
    new_status?: true
    reason?: true
    changed_at?: true
    changed_by_nik?: true
    id_leave?: true
    _all?: true
  }

  export type Tb_leave_logAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tb_leave_log to aggregate.
     */
    where?: tb_leave_logWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tb_leave_logs to fetch.
     */
    orderBy?: tb_leave_logOrderByWithRelationInput | tb_leave_logOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: tb_leave_logWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tb_leave_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tb_leave_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned tb_leave_logs
    **/
    _count?: true | Tb_leave_logCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Tb_leave_logMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Tb_leave_logMaxAggregateInputType
  }

  export type GetTb_leave_logAggregateType<T extends Tb_leave_logAggregateArgs> = {
        [P in keyof T & keyof AggregateTb_leave_log]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTb_leave_log[P]>
      : GetScalarType<T[P], AggregateTb_leave_log[P]>
  }




  export type tb_leave_logGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tb_leave_logWhereInput
    orderBy?: tb_leave_logOrderByWithAggregationInput | tb_leave_logOrderByWithAggregationInput[]
    by: Tb_leave_logScalarFieldEnum[] | Tb_leave_logScalarFieldEnum
    having?: tb_leave_logScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Tb_leave_logCountAggregateInputType | true
    _min?: Tb_leave_logMinAggregateInputType
    _max?: Tb_leave_logMaxAggregateInputType
  }

  export type Tb_leave_logGroupByOutputType = {
    id_log: string
    old_status: $Enums.status
    new_status: $Enums.status
    reason: string
    changed_at: Date
    changed_by_nik: string
    id_leave: string
    _count: Tb_leave_logCountAggregateOutputType | null
    _min: Tb_leave_logMinAggregateOutputType | null
    _max: Tb_leave_logMaxAggregateOutputType | null
  }

  type GetTb_leave_logGroupByPayload<T extends tb_leave_logGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Tb_leave_logGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Tb_leave_logGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Tb_leave_logGroupByOutputType[P]>
            : GetScalarType<T[P], Tb_leave_logGroupByOutputType[P]>
        }
      >
    >


  export type tb_leave_logSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_log?: boolean
    old_status?: boolean
    new_status?: boolean
    reason?: boolean
    changed_at?: boolean
    changed_by_nik?: boolean
    id_leave?: boolean
    tb_leave?: boolean | tb_leaveDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tb_leave_log"]>

  export type tb_leave_logSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_log?: boolean
    old_status?: boolean
    new_status?: boolean
    reason?: boolean
    changed_at?: boolean
    changed_by_nik?: boolean
    id_leave?: boolean
    tb_leave?: boolean | tb_leaveDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tb_leave_log"]>

  export type tb_leave_logSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_log?: boolean
    old_status?: boolean
    new_status?: boolean
    reason?: boolean
    changed_at?: boolean
    changed_by_nik?: boolean
    id_leave?: boolean
    tb_leave?: boolean | tb_leaveDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tb_leave_log"]>

  export type tb_leave_logSelectScalar = {
    id_log?: boolean
    old_status?: boolean
    new_status?: boolean
    reason?: boolean
    changed_at?: boolean
    changed_by_nik?: boolean
    id_leave?: boolean
  }

  export type tb_leave_logOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_log" | "old_status" | "new_status" | "reason" | "changed_at" | "changed_by_nik" | "id_leave", ExtArgs["result"]["tb_leave_log"]>
  export type tb_leave_logInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tb_leave?: boolean | tb_leaveDefaultArgs<ExtArgs>
  }
  export type tb_leave_logIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tb_leave?: boolean | tb_leaveDefaultArgs<ExtArgs>
  }
  export type tb_leave_logIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tb_leave?: boolean | tb_leaveDefaultArgs<ExtArgs>
  }

  export type $tb_leave_logPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "tb_leave_log"
    objects: {
      tb_leave: Prisma.$tb_leavePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id_log: string
      old_status: $Enums.status
      new_status: $Enums.status
      reason: string
      changed_at: Date
      changed_by_nik: string
      id_leave: string
    }, ExtArgs["result"]["tb_leave_log"]>
    composites: {}
  }

  type tb_leave_logGetPayload<S extends boolean | null | undefined | tb_leave_logDefaultArgs> = $Result.GetResult<Prisma.$tb_leave_logPayload, S>

  type tb_leave_logCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<tb_leave_logFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Tb_leave_logCountAggregateInputType | true
    }

  export interface tb_leave_logDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['tb_leave_log'], meta: { name: 'tb_leave_log' } }
    /**
     * Find zero or one Tb_leave_log that matches the filter.
     * @param {tb_leave_logFindUniqueArgs} args - Arguments to find a Tb_leave_log
     * @example
     * // Get one Tb_leave_log
     * const tb_leave_log = await prisma.tb_leave_log.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends tb_leave_logFindUniqueArgs>(args: SelectSubset<T, tb_leave_logFindUniqueArgs<ExtArgs>>): Prisma__tb_leave_logClient<$Result.GetResult<Prisma.$tb_leave_logPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tb_leave_log that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {tb_leave_logFindUniqueOrThrowArgs} args - Arguments to find a Tb_leave_log
     * @example
     * // Get one Tb_leave_log
     * const tb_leave_log = await prisma.tb_leave_log.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends tb_leave_logFindUniqueOrThrowArgs>(args: SelectSubset<T, tb_leave_logFindUniqueOrThrowArgs<ExtArgs>>): Prisma__tb_leave_logClient<$Result.GetResult<Prisma.$tb_leave_logPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tb_leave_log that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tb_leave_logFindFirstArgs} args - Arguments to find a Tb_leave_log
     * @example
     * // Get one Tb_leave_log
     * const tb_leave_log = await prisma.tb_leave_log.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends tb_leave_logFindFirstArgs>(args?: SelectSubset<T, tb_leave_logFindFirstArgs<ExtArgs>>): Prisma__tb_leave_logClient<$Result.GetResult<Prisma.$tb_leave_logPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tb_leave_log that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tb_leave_logFindFirstOrThrowArgs} args - Arguments to find a Tb_leave_log
     * @example
     * // Get one Tb_leave_log
     * const tb_leave_log = await prisma.tb_leave_log.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends tb_leave_logFindFirstOrThrowArgs>(args?: SelectSubset<T, tb_leave_logFindFirstOrThrowArgs<ExtArgs>>): Prisma__tb_leave_logClient<$Result.GetResult<Prisma.$tb_leave_logPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tb_leave_logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tb_leave_logFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tb_leave_logs
     * const tb_leave_logs = await prisma.tb_leave_log.findMany()
     * 
     * // Get first 10 Tb_leave_logs
     * const tb_leave_logs = await prisma.tb_leave_log.findMany({ take: 10 })
     * 
     * // Only select the `id_log`
     * const tb_leave_logWithId_logOnly = await prisma.tb_leave_log.findMany({ select: { id_log: true } })
     * 
     */
    findMany<T extends tb_leave_logFindManyArgs>(args?: SelectSubset<T, tb_leave_logFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tb_leave_logPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tb_leave_log.
     * @param {tb_leave_logCreateArgs} args - Arguments to create a Tb_leave_log.
     * @example
     * // Create one Tb_leave_log
     * const Tb_leave_log = await prisma.tb_leave_log.create({
     *   data: {
     *     // ... data to create a Tb_leave_log
     *   }
     * })
     * 
     */
    create<T extends tb_leave_logCreateArgs>(args: SelectSubset<T, tb_leave_logCreateArgs<ExtArgs>>): Prisma__tb_leave_logClient<$Result.GetResult<Prisma.$tb_leave_logPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tb_leave_logs.
     * @param {tb_leave_logCreateManyArgs} args - Arguments to create many Tb_leave_logs.
     * @example
     * // Create many Tb_leave_logs
     * const tb_leave_log = await prisma.tb_leave_log.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends tb_leave_logCreateManyArgs>(args?: SelectSubset<T, tb_leave_logCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tb_leave_logs and returns the data saved in the database.
     * @param {tb_leave_logCreateManyAndReturnArgs} args - Arguments to create many Tb_leave_logs.
     * @example
     * // Create many Tb_leave_logs
     * const tb_leave_log = await prisma.tb_leave_log.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tb_leave_logs and only return the `id_log`
     * const tb_leave_logWithId_logOnly = await prisma.tb_leave_log.createManyAndReturn({
     *   select: { id_log: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends tb_leave_logCreateManyAndReturnArgs>(args?: SelectSubset<T, tb_leave_logCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tb_leave_logPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tb_leave_log.
     * @param {tb_leave_logDeleteArgs} args - Arguments to delete one Tb_leave_log.
     * @example
     * // Delete one Tb_leave_log
     * const Tb_leave_log = await prisma.tb_leave_log.delete({
     *   where: {
     *     // ... filter to delete one Tb_leave_log
     *   }
     * })
     * 
     */
    delete<T extends tb_leave_logDeleteArgs>(args: SelectSubset<T, tb_leave_logDeleteArgs<ExtArgs>>): Prisma__tb_leave_logClient<$Result.GetResult<Prisma.$tb_leave_logPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tb_leave_log.
     * @param {tb_leave_logUpdateArgs} args - Arguments to update one Tb_leave_log.
     * @example
     * // Update one Tb_leave_log
     * const tb_leave_log = await prisma.tb_leave_log.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends tb_leave_logUpdateArgs>(args: SelectSubset<T, tb_leave_logUpdateArgs<ExtArgs>>): Prisma__tb_leave_logClient<$Result.GetResult<Prisma.$tb_leave_logPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tb_leave_logs.
     * @param {tb_leave_logDeleteManyArgs} args - Arguments to filter Tb_leave_logs to delete.
     * @example
     * // Delete a few Tb_leave_logs
     * const { count } = await prisma.tb_leave_log.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends tb_leave_logDeleteManyArgs>(args?: SelectSubset<T, tb_leave_logDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tb_leave_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tb_leave_logUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tb_leave_logs
     * const tb_leave_log = await prisma.tb_leave_log.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends tb_leave_logUpdateManyArgs>(args: SelectSubset<T, tb_leave_logUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tb_leave_logs and returns the data updated in the database.
     * @param {tb_leave_logUpdateManyAndReturnArgs} args - Arguments to update many Tb_leave_logs.
     * @example
     * // Update many Tb_leave_logs
     * const tb_leave_log = await prisma.tb_leave_log.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tb_leave_logs and only return the `id_log`
     * const tb_leave_logWithId_logOnly = await prisma.tb_leave_log.updateManyAndReturn({
     *   select: { id_log: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends tb_leave_logUpdateManyAndReturnArgs>(args: SelectSubset<T, tb_leave_logUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tb_leave_logPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tb_leave_log.
     * @param {tb_leave_logUpsertArgs} args - Arguments to update or create a Tb_leave_log.
     * @example
     * // Update or create a Tb_leave_log
     * const tb_leave_log = await prisma.tb_leave_log.upsert({
     *   create: {
     *     // ... data to create a Tb_leave_log
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tb_leave_log we want to update
     *   }
     * })
     */
    upsert<T extends tb_leave_logUpsertArgs>(args: SelectSubset<T, tb_leave_logUpsertArgs<ExtArgs>>): Prisma__tb_leave_logClient<$Result.GetResult<Prisma.$tb_leave_logPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tb_leave_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tb_leave_logCountArgs} args - Arguments to filter Tb_leave_logs to count.
     * @example
     * // Count the number of Tb_leave_logs
     * const count = await prisma.tb_leave_log.count({
     *   where: {
     *     // ... the filter for the Tb_leave_logs we want to count
     *   }
     * })
    **/
    count<T extends tb_leave_logCountArgs>(
      args?: Subset<T, tb_leave_logCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Tb_leave_logCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tb_leave_log.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Tb_leave_logAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Tb_leave_logAggregateArgs>(args: Subset<T, Tb_leave_logAggregateArgs>): Prisma.PrismaPromise<GetTb_leave_logAggregateType<T>>

    /**
     * Group by Tb_leave_log.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tb_leave_logGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends tb_leave_logGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: tb_leave_logGroupByArgs['orderBy'] }
        : { orderBy?: tb_leave_logGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, tb_leave_logGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTb_leave_logGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the tb_leave_log model
   */
  readonly fields: tb_leave_logFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for tb_leave_log.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__tb_leave_logClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tb_leave<T extends tb_leaveDefaultArgs<ExtArgs> = {}>(args?: Subset<T, tb_leaveDefaultArgs<ExtArgs>>): Prisma__tb_leaveClient<$Result.GetResult<Prisma.$tb_leavePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the tb_leave_log model
   */
  interface tb_leave_logFieldRefs {
    readonly id_log: FieldRef<"tb_leave_log", 'String'>
    readonly old_status: FieldRef<"tb_leave_log", 'status'>
    readonly new_status: FieldRef<"tb_leave_log", 'status'>
    readonly reason: FieldRef<"tb_leave_log", 'String'>
    readonly changed_at: FieldRef<"tb_leave_log", 'DateTime'>
    readonly changed_by_nik: FieldRef<"tb_leave_log", 'String'>
    readonly id_leave: FieldRef<"tb_leave_log", 'String'>
  }
    

  // Custom InputTypes
  /**
   * tb_leave_log findUnique
   */
  export type tb_leave_logFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_leave_log
     */
    select?: tb_leave_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_leave_log
     */
    omit?: tb_leave_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_leave_logInclude<ExtArgs> | null
    /**
     * Filter, which tb_leave_log to fetch.
     */
    where: tb_leave_logWhereUniqueInput
  }

  /**
   * tb_leave_log findUniqueOrThrow
   */
  export type tb_leave_logFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_leave_log
     */
    select?: tb_leave_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_leave_log
     */
    omit?: tb_leave_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_leave_logInclude<ExtArgs> | null
    /**
     * Filter, which tb_leave_log to fetch.
     */
    where: tb_leave_logWhereUniqueInput
  }

  /**
   * tb_leave_log findFirst
   */
  export type tb_leave_logFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_leave_log
     */
    select?: tb_leave_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_leave_log
     */
    omit?: tb_leave_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_leave_logInclude<ExtArgs> | null
    /**
     * Filter, which tb_leave_log to fetch.
     */
    where?: tb_leave_logWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tb_leave_logs to fetch.
     */
    orderBy?: tb_leave_logOrderByWithRelationInput | tb_leave_logOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tb_leave_logs.
     */
    cursor?: tb_leave_logWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tb_leave_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tb_leave_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tb_leave_logs.
     */
    distinct?: Tb_leave_logScalarFieldEnum | Tb_leave_logScalarFieldEnum[]
  }

  /**
   * tb_leave_log findFirstOrThrow
   */
  export type tb_leave_logFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_leave_log
     */
    select?: tb_leave_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_leave_log
     */
    omit?: tb_leave_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_leave_logInclude<ExtArgs> | null
    /**
     * Filter, which tb_leave_log to fetch.
     */
    where?: tb_leave_logWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tb_leave_logs to fetch.
     */
    orderBy?: tb_leave_logOrderByWithRelationInput | tb_leave_logOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tb_leave_logs.
     */
    cursor?: tb_leave_logWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tb_leave_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tb_leave_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tb_leave_logs.
     */
    distinct?: Tb_leave_logScalarFieldEnum | Tb_leave_logScalarFieldEnum[]
  }

  /**
   * tb_leave_log findMany
   */
  export type tb_leave_logFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_leave_log
     */
    select?: tb_leave_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_leave_log
     */
    omit?: tb_leave_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_leave_logInclude<ExtArgs> | null
    /**
     * Filter, which tb_leave_logs to fetch.
     */
    where?: tb_leave_logWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tb_leave_logs to fetch.
     */
    orderBy?: tb_leave_logOrderByWithRelationInput | tb_leave_logOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing tb_leave_logs.
     */
    cursor?: tb_leave_logWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tb_leave_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tb_leave_logs.
     */
    skip?: number
    distinct?: Tb_leave_logScalarFieldEnum | Tb_leave_logScalarFieldEnum[]
  }

  /**
   * tb_leave_log create
   */
  export type tb_leave_logCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_leave_log
     */
    select?: tb_leave_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_leave_log
     */
    omit?: tb_leave_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_leave_logInclude<ExtArgs> | null
    /**
     * The data needed to create a tb_leave_log.
     */
    data: XOR<tb_leave_logCreateInput, tb_leave_logUncheckedCreateInput>
  }

  /**
   * tb_leave_log createMany
   */
  export type tb_leave_logCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many tb_leave_logs.
     */
    data: tb_leave_logCreateManyInput | tb_leave_logCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * tb_leave_log createManyAndReturn
   */
  export type tb_leave_logCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_leave_log
     */
    select?: tb_leave_logSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the tb_leave_log
     */
    omit?: tb_leave_logOmit<ExtArgs> | null
    /**
     * The data used to create many tb_leave_logs.
     */
    data: tb_leave_logCreateManyInput | tb_leave_logCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_leave_logIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * tb_leave_log update
   */
  export type tb_leave_logUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_leave_log
     */
    select?: tb_leave_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_leave_log
     */
    omit?: tb_leave_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_leave_logInclude<ExtArgs> | null
    /**
     * The data needed to update a tb_leave_log.
     */
    data: XOR<tb_leave_logUpdateInput, tb_leave_logUncheckedUpdateInput>
    /**
     * Choose, which tb_leave_log to update.
     */
    where: tb_leave_logWhereUniqueInput
  }

  /**
   * tb_leave_log updateMany
   */
  export type tb_leave_logUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update tb_leave_logs.
     */
    data: XOR<tb_leave_logUpdateManyMutationInput, tb_leave_logUncheckedUpdateManyInput>
    /**
     * Filter which tb_leave_logs to update
     */
    where?: tb_leave_logWhereInput
    /**
     * Limit how many tb_leave_logs to update.
     */
    limit?: number
  }

  /**
   * tb_leave_log updateManyAndReturn
   */
  export type tb_leave_logUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_leave_log
     */
    select?: tb_leave_logSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the tb_leave_log
     */
    omit?: tb_leave_logOmit<ExtArgs> | null
    /**
     * The data used to update tb_leave_logs.
     */
    data: XOR<tb_leave_logUpdateManyMutationInput, tb_leave_logUncheckedUpdateManyInput>
    /**
     * Filter which tb_leave_logs to update
     */
    where?: tb_leave_logWhereInput
    /**
     * Limit how many tb_leave_logs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_leave_logIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * tb_leave_log upsert
   */
  export type tb_leave_logUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_leave_log
     */
    select?: tb_leave_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_leave_log
     */
    omit?: tb_leave_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_leave_logInclude<ExtArgs> | null
    /**
     * The filter to search for the tb_leave_log to update in case it exists.
     */
    where: tb_leave_logWhereUniqueInput
    /**
     * In case the tb_leave_log found by the `where` argument doesn't exist, create a new tb_leave_log with this data.
     */
    create: XOR<tb_leave_logCreateInput, tb_leave_logUncheckedCreateInput>
    /**
     * In case the tb_leave_log was found with the provided `where` argument, update it with this data.
     */
    update: XOR<tb_leave_logUpdateInput, tb_leave_logUncheckedUpdateInput>
  }

  /**
   * tb_leave_log delete
   */
  export type tb_leave_logDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_leave_log
     */
    select?: tb_leave_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_leave_log
     */
    omit?: tb_leave_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_leave_logInclude<ExtArgs> | null
    /**
     * Filter which tb_leave_log to delete.
     */
    where: tb_leave_logWhereUniqueInput
  }

  /**
   * tb_leave_log deleteMany
   */
  export type tb_leave_logDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tb_leave_logs to delete
     */
    where?: tb_leave_logWhereInput
    /**
     * Limit how many tb_leave_logs to delete.
     */
    limit?: number
  }

  /**
   * tb_leave_log without action
   */
  export type tb_leave_logDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tb_leave_log
     */
    select?: tb_leave_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tb_leave_log
     */
    omit?: tb_leave_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tb_leave_logInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const Tb_balanceScalarFieldEnum: {
    id_balance: 'id_balance',
    amount: 'amount',
    receive_date: 'receive_date',
    expired_date: 'expired_date',
    NIK: 'NIK'
  };

  export type Tb_balanceScalarFieldEnum = (typeof Tb_balanceScalarFieldEnum)[keyof typeof Tb_balanceScalarFieldEnum]


  export const Tb_leaveScalarFieldEnum: {
    id_leave: 'id_leave',
    title: 'title',
    leave_type: 'leave_type',
    start_date: 'start_date',
    end_date: 'end_date',
    total_days: 'total_days',
    reason: 'reason',
    status: 'status',
    created_at: 'created_at',
    NIK: 'NIK',
    id_special: 'id_special',
    id_mandatory: 'id_mandatory'
  };

  export type Tb_leaveScalarFieldEnum = (typeof Tb_leaveScalarFieldEnum)[keyof typeof Tb_leaveScalarFieldEnum]


  export const Tb_mandatory_leaveScalarFieldEnum: {
    id_mandatory: 'id_mandatory',
    title: 'title',
    duration: 'duration',
    is_active: 'is_active',
    description: 'description'
  };

  export type Tb_mandatory_leaveScalarFieldEnum = (typeof Tb_mandatory_leaveScalarFieldEnum)[keyof typeof Tb_mandatory_leaveScalarFieldEnum]


  export const Tb_special_leaveScalarFieldEnum: {
    id_special: 'id_special',
    title: 'title',
    applicable_gender: 'applicable_gender',
    duration: 'duration',
    is_active: 'is_active',
    description: 'description'
  };

  export type Tb_special_leaveScalarFieldEnum = (typeof Tb_special_leaveScalarFieldEnum)[keyof typeof Tb_special_leaveScalarFieldEnum]


  export const Tb_usersScalarFieldEnum: {
    NIK: 'NIK',
    fullname: 'fullname',
    email: 'email',
    password: 'password',
    gender: 'gender',
    role: 'role',
    status_active: 'status_active',
    join_date: 'join_date'
  };

  export type Tb_usersScalarFieldEnum = (typeof Tb_usersScalarFieldEnum)[keyof typeof Tb_usersScalarFieldEnum]


  export const Tb_balance_adjustmentScalarFieldEnum: {
    id_adjustment: 'id_adjustment',
    adjustment_value: 'adjustment_value',
    notes: 'notes',
    created_at: 'created_at',
    actor: 'actor',
    NIK: 'NIK'
  };

  export type Tb_balance_adjustmentScalarFieldEnum = (typeof Tb_balance_adjustmentScalarFieldEnum)[keyof typeof Tb_balance_adjustmentScalarFieldEnum]


  export const Tb_leave_logScalarFieldEnum: {
    id_log: 'id_log',
    old_status: 'old_status',
    new_status: 'new_status',
    reason: 'reason',
    changed_at: 'changed_at',
    changed_by_nik: 'changed_by_nik',
    id_leave: 'id_leave'
  };

  export type Tb_leave_logScalarFieldEnum = (typeof Tb_leave_logScalarFieldEnum)[keyof typeof Tb_leave_logScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'leave_type'
   */
  export type Enumleave_typeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'leave_type'>
    


  /**
   * Reference to a field of type 'leave_type[]'
   */
  export type ListEnumleave_typeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'leave_type[]'>
    


  /**
   * Reference to a field of type 'status'
   */
  export type EnumstatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'status'>
    


  /**
   * Reference to a field of type 'status[]'
   */
  export type ListEnumstatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'status[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'applicable_gender'
   */
  export type Enumapplicable_genderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'applicable_gender'>
    


  /**
   * Reference to a field of type 'applicable_gender[]'
   */
  export type ListEnumapplicable_genderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'applicable_gender[]'>
    


  /**
   * Reference to a field of type 'gender'
   */
  export type EnumgenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'gender'>
    


  /**
   * Reference to a field of type 'gender[]'
   */
  export type ListEnumgenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'gender[]'>
    


  /**
   * Reference to a field of type 'role'
   */
  export type EnumroleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'role'>
    


  /**
   * Reference to a field of type 'role[]'
   */
  export type ListEnumroleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'role[]'>
    


  /**
   * Reference to a field of type 'status_active'
   */
  export type Enumstatus_activeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'status_active'>
    


  /**
   * Reference to a field of type 'status_active[]'
   */
  export type ListEnumstatus_activeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'status_active[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type tb_balanceWhereInput = {
    AND?: tb_balanceWhereInput | tb_balanceWhereInput[]
    OR?: tb_balanceWhereInput[]
    NOT?: tb_balanceWhereInput | tb_balanceWhereInput[]
    id_balance?: StringFilter<"tb_balance"> | string
    amount?: IntFilter<"tb_balance"> | number
    receive_date?: DateTimeFilter<"tb_balance"> | Date | string
    expired_date?: DateTimeFilter<"tb_balance"> | Date | string
    NIK?: StringFilter<"tb_balance"> | string
    tb_users?: XOR<Tb_usersScalarRelationFilter, tb_usersWhereInput>
  }

  export type tb_balanceOrderByWithRelationInput = {
    id_balance?: SortOrder
    amount?: SortOrder
    receive_date?: SortOrder
    expired_date?: SortOrder
    NIK?: SortOrder
    tb_users?: tb_usersOrderByWithRelationInput
  }

  export type tb_balanceWhereUniqueInput = Prisma.AtLeast<{
    id_balance?: string
    AND?: tb_balanceWhereInput | tb_balanceWhereInput[]
    OR?: tb_balanceWhereInput[]
    NOT?: tb_balanceWhereInput | tb_balanceWhereInput[]
    amount?: IntFilter<"tb_balance"> | number
    receive_date?: DateTimeFilter<"tb_balance"> | Date | string
    expired_date?: DateTimeFilter<"tb_balance"> | Date | string
    NIK?: StringFilter<"tb_balance"> | string
    tb_users?: XOR<Tb_usersScalarRelationFilter, tb_usersWhereInput>
  }, "id_balance">

  export type tb_balanceOrderByWithAggregationInput = {
    id_balance?: SortOrder
    amount?: SortOrder
    receive_date?: SortOrder
    expired_date?: SortOrder
    NIK?: SortOrder
    _count?: tb_balanceCountOrderByAggregateInput
    _avg?: tb_balanceAvgOrderByAggregateInput
    _max?: tb_balanceMaxOrderByAggregateInput
    _min?: tb_balanceMinOrderByAggregateInput
    _sum?: tb_balanceSumOrderByAggregateInput
  }

  export type tb_balanceScalarWhereWithAggregatesInput = {
    AND?: tb_balanceScalarWhereWithAggregatesInput | tb_balanceScalarWhereWithAggregatesInput[]
    OR?: tb_balanceScalarWhereWithAggregatesInput[]
    NOT?: tb_balanceScalarWhereWithAggregatesInput | tb_balanceScalarWhereWithAggregatesInput[]
    id_balance?: StringWithAggregatesFilter<"tb_balance"> | string
    amount?: IntWithAggregatesFilter<"tb_balance"> | number
    receive_date?: DateTimeWithAggregatesFilter<"tb_balance"> | Date | string
    expired_date?: DateTimeWithAggregatesFilter<"tb_balance"> | Date | string
    NIK?: StringWithAggregatesFilter<"tb_balance"> | string
  }

  export type tb_leaveWhereInput = {
    AND?: tb_leaveWhereInput | tb_leaveWhereInput[]
    OR?: tb_leaveWhereInput[]
    NOT?: tb_leaveWhereInput | tb_leaveWhereInput[]
    id_leave?: StringFilter<"tb_leave"> | string
    title?: StringFilter<"tb_leave"> | string
    leave_type?: Enumleave_typeFilter<"tb_leave"> | $Enums.leave_type
    start_date?: DateTimeFilter<"tb_leave"> | Date | string
    end_date?: DateTimeFilter<"tb_leave"> | Date | string
    total_days?: IntFilter<"tb_leave"> | number
    reason?: StringFilter<"tb_leave"> | string
    status?: EnumstatusFilter<"tb_leave"> | $Enums.status
    created_at?: DateTimeFilter<"tb_leave"> | Date | string
    NIK?: StringFilter<"tb_leave"> | string
    id_special?: StringNullableFilter<"tb_leave"> | string | null
    id_mandatory?: StringNullableFilter<"tb_leave"> | string | null
    tb_users?: XOR<Tb_usersScalarRelationFilter, tb_usersWhereInput>
    tb_mandatory_leave?: XOR<Tb_mandatory_leaveNullableScalarRelationFilter, tb_mandatory_leaveWhereInput> | null
    tb_special_leave?: XOR<Tb_special_leaveNullableScalarRelationFilter, tb_special_leaveWhereInput> | null
    tb_leave_log?: Tb_leave_logListRelationFilter
  }

  export type tb_leaveOrderByWithRelationInput = {
    id_leave?: SortOrder
    title?: SortOrder
    leave_type?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    total_days?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    NIK?: SortOrder
    id_special?: SortOrderInput | SortOrder
    id_mandatory?: SortOrderInput | SortOrder
    tb_users?: tb_usersOrderByWithRelationInput
    tb_mandatory_leave?: tb_mandatory_leaveOrderByWithRelationInput
    tb_special_leave?: tb_special_leaveOrderByWithRelationInput
    tb_leave_log?: tb_leave_logOrderByRelationAggregateInput
  }

  export type tb_leaveWhereUniqueInput = Prisma.AtLeast<{
    id_leave?: string
    AND?: tb_leaveWhereInput | tb_leaveWhereInput[]
    OR?: tb_leaveWhereInput[]
    NOT?: tb_leaveWhereInput | tb_leaveWhereInput[]
    title?: StringFilter<"tb_leave"> | string
    leave_type?: Enumleave_typeFilter<"tb_leave"> | $Enums.leave_type
    start_date?: DateTimeFilter<"tb_leave"> | Date | string
    end_date?: DateTimeFilter<"tb_leave"> | Date | string
    total_days?: IntFilter<"tb_leave"> | number
    reason?: StringFilter<"tb_leave"> | string
    status?: EnumstatusFilter<"tb_leave"> | $Enums.status
    created_at?: DateTimeFilter<"tb_leave"> | Date | string
    NIK?: StringFilter<"tb_leave"> | string
    id_special?: StringNullableFilter<"tb_leave"> | string | null
    id_mandatory?: StringNullableFilter<"tb_leave"> | string | null
    tb_users?: XOR<Tb_usersScalarRelationFilter, tb_usersWhereInput>
    tb_mandatory_leave?: XOR<Tb_mandatory_leaveNullableScalarRelationFilter, tb_mandatory_leaveWhereInput> | null
    tb_special_leave?: XOR<Tb_special_leaveNullableScalarRelationFilter, tb_special_leaveWhereInput> | null
    tb_leave_log?: Tb_leave_logListRelationFilter
  }, "id_leave">

  export type tb_leaveOrderByWithAggregationInput = {
    id_leave?: SortOrder
    title?: SortOrder
    leave_type?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    total_days?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    NIK?: SortOrder
    id_special?: SortOrderInput | SortOrder
    id_mandatory?: SortOrderInput | SortOrder
    _count?: tb_leaveCountOrderByAggregateInput
    _avg?: tb_leaveAvgOrderByAggregateInput
    _max?: tb_leaveMaxOrderByAggregateInput
    _min?: tb_leaveMinOrderByAggregateInput
    _sum?: tb_leaveSumOrderByAggregateInput
  }

  export type tb_leaveScalarWhereWithAggregatesInput = {
    AND?: tb_leaveScalarWhereWithAggregatesInput | tb_leaveScalarWhereWithAggregatesInput[]
    OR?: tb_leaveScalarWhereWithAggregatesInput[]
    NOT?: tb_leaveScalarWhereWithAggregatesInput | tb_leaveScalarWhereWithAggregatesInput[]
    id_leave?: StringWithAggregatesFilter<"tb_leave"> | string
    title?: StringWithAggregatesFilter<"tb_leave"> | string
    leave_type?: Enumleave_typeWithAggregatesFilter<"tb_leave"> | $Enums.leave_type
    start_date?: DateTimeWithAggregatesFilter<"tb_leave"> | Date | string
    end_date?: DateTimeWithAggregatesFilter<"tb_leave"> | Date | string
    total_days?: IntWithAggregatesFilter<"tb_leave"> | number
    reason?: StringWithAggregatesFilter<"tb_leave"> | string
    status?: EnumstatusWithAggregatesFilter<"tb_leave"> | $Enums.status
    created_at?: DateTimeWithAggregatesFilter<"tb_leave"> | Date | string
    NIK?: StringWithAggregatesFilter<"tb_leave"> | string
    id_special?: StringNullableWithAggregatesFilter<"tb_leave"> | string | null
    id_mandatory?: StringNullableWithAggregatesFilter<"tb_leave"> | string | null
  }

  export type tb_mandatory_leaveWhereInput = {
    AND?: tb_mandatory_leaveWhereInput | tb_mandatory_leaveWhereInput[]
    OR?: tb_mandatory_leaveWhereInput[]
    NOT?: tb_mandatory_leaveWhereInput | tb_mandatory_leaveWhereInput[]
    id_mandatory?: StringFilter<"tb_mandatory_leave"> | string
    title?: StringFilter<"tb_mandatory_leave"> | string
    duration?: IntFilter<"tb_mandatory_leave"> | number
    is_active?: BoolFilter<"tb_mandatory_leave"> | boolean
    description?: StringFilter<"tb_mandatory_leave"> | string
    tb_leave?: Tb_leaveListRelationFilter
  }

  export type tb_mandatory_leaveOrderByWithRelationInput = {
    id_mandatory?: SortOrder
    title?: SortOrder
    duration?: SortOrder
    is_active?: SortOrder
    description?: SortOrder
    tb_leave?: tb_leaveOrderByRelationAggregateInput
  }

  export type tb_mandatory_leaveWhereUniqueInput = Prisma.AtLeast<{
    id_mandatory?: string
    AND?: tb_mandatory_leaveWhereInput | tb_mandatory_leaveWhereInput[]
    OR?: tb_mandatory_leaveWhereInput[]
    NOT?: tb_mandatory_leaveWhereInput | tb_mandatory_leaveWhereInput[]
    title?: StringFilter<"tb_mandatory_leave"> | string
    duration?: IntFilter<"tb_mandatory_leave"> | number
    is_active?: BoolFilter<"tb_mandatory_leave"> | boolean
    description?: StringFilter<"tb_mandatory_leave"> | string
    tb_leave?: Tb_leaveListRelationFilter
  }, "id_mandatory">

  export type tb_mandatory_leaveOrderByWithAggregationInput = {
    id_mandatory?: SortOrder
    title?: SortOrder
    duration?: SortOrder
    is_active?: SortOrder
    description?: SortOrder
    _count?: tb_mandatory_leaveCountOrderByAggregateInput
    _avg?: tb_mandatory_leaveAvgOrderByAggregateInput
    _max?: tb_mandatory_leaveMaxOrderByAggregateInput
    _min?: tb_mandatory_leaveMinOrderByAggregateInput
    _sum?: tb_mandatory_leaveSumOrderByAggregateInput
  }

  export type tb_mandatory_leaveScalarWhereWithAggregatesInput = {
    AND?: tb_mandatory_leaveScalarWhereWithAggregatesInput | tb_mandatory_leaveScalarWhereWithAggregatesInput[]
    OR?: tb_mandatory_leaveScalarWhereWithAggregatesInput[]
    NOT?: tb_mandatory_leaveScalarWhereWithAggregatesInput | tb_mandatory_leaveScalarWhereWithAggregatesInput[]
    id_mandatory?: StringWithAggregatesFilter<"tb_mandatory_leave"> | string
    title?: StringWithAggregatesFilter<"tb_mandatory_leave"> | string
    duration?: IntWithAggregatesFilter<"tb_mandatory_leave"> | number
    is_active?: BoolWithAggregatesFilter<"tb_mandatory_leave"> | boolean
    description?: StringWithAggregatesFilter<"tb_mandatory_leave"> | string
  }

  export type tb_special_leaveWhereInput = {
    AND?: tb_special_leaveWhereInput | tb_special_leaveWhereInput[]
    OR?: tb_special_leaveWhereInput[]
    NOT?: tb_special_leaveWhereInput | tb_special_leaveWhereInput[]
    id_special?: StringFilter<"tb_special_leave"> | string
    title?: StringFilter<"tb_special_leave"> | string
    applicable_gender?: Enumapplicable_genderFilter<"tb_special_leave"> | $Enums.applicable_gender
    duration?: IntFilter<"tb_special_leave"> | number
    is_active?: BoolFilter<"tb_special_leave"> | boolean
    description?: StringFilter<"tb_special_leave"> | string
    tb_leave?: Tb_leaveListRelationFilter
  }

  export type tb_special_leaveOrderByWithRelationInput = {
    id_special?: SortOrder
    title?: SortOrder
    applicable_gender?: SortOrder
    duration?: SortOrder
    is_active?: SortOrder
    description?: SortOrder
    tb_leave?: tb_leaveOrderByRelationAggregateInput
  }

  export type tb_special_leaveWhereUniqueInput = Prisma.AtLeast<{
    id_special?: string
    AND?: tb_special_leaveWhereInput | tb_special_leaveWhereInput[]
    OR?: tb_special_leaveWhereInput[]
    NOT?: tb_special_leaveWhereInput | tb_special_leaveWhereInput[]
    title?: StringFilter<"tb_special_leave"> | string
    applicable_gender?: Enumapplicable_genderFilter<"tb_special_leave"> | $Enums.applicable_gender
    duration?: IntFilter<"tb_special_leave"> | number
    is_active?: BoolFilter<"tb_special_leave"> | boolean
    description?: StringFilter<"tb_special_leave"> | string
    tb_leave?: Tb_leaveListRelationFilter
  }, "id_special">

  export type tb_special_leaveOrderByWithAggregationInput = {
    id_special?: SortOrder
    title?: SortOrder
    applicable_gender?: SortOrder
    duration?: SortOrder
    is_active?: SortOrder
    description?: SortOrder
    _count?: tb_special_leaveCountOrderByAggregateInput
    _avg?: tb_special_leaveAvgOrderByAggregateInput
    _max?: tb_special_leaveMaxOrderByAggregateInput
    _min?: tb_special_leaveMinOrderByAggregateInput
    _sum?: tb_special_leaveSumOrderByAggregateInput
  }

  export type tb_special_leaveScalarWhereWithAggregatesInput = {
    AND?: tb_special_leaveScalarWhereWithAggregatesInput | tb_special_leaveScalarWhereWithAggregatesInput[]
    OR?: tb_special_leaveScalarWhereWithAggregatesInput[]
    NOT?: tb_special_leaveScalarWhereWithAggregatesInput | tb_special_leaveScalarWhereWithAggregatesInput[]
    id_special?: StringWithAggregatesFilter<"tb_special_leave"> | string
    title?: StringWithAggregatesFilter<"tb_special_leave"> | string
    applicable_gender?: Enumapplicable_genderWithAggregatesFilter<"tb_special_leave"> | $Enums.applicable_gender
    duration?: IntWithAggregatesFilter<"tb_special_leave"> | number
    is_active?: BoolWithAggregatesFilter<"tb_special_leave"> | boolean
    description?: StringWithAggregatesFilter<"tb_special_leave"> | string
  }

  export type tb_usersWhereInput = {
    AND?: tb_usersWhereInput | tb_usersWhereInput[]
    OR?: tb_usersWhereInput[]
    NOT?: tb_usersWhereInput | tb_usersWhereInput[]
    NIK?: StringFilter<"tb_users"> | string
    fullname?: StringFilter<"tb_users"> | string
    email?: StringFilter<"tb_users"> | string
    password?: StringFilter<"tb_users"> | string
    gender?: EnumgenderFilter<"tb_users"> | $Enums.gender
    role?: EnumroleFilter<"tb_users"> | $Enums.role
    status_active?: Enumstatus_activeFilter<"tb_users"> | $Enums.status_active
    join_date?: DateTimeFilter<"tb_users"> | Date | string
    tb_balance?: Tb_balanceListRelationFilter
    tb_balance_adjustment?: Tb_balance_adjustmentListRelationFilter
    tb_leave?: Tb_leaveListRelationFilter
  }

  export type tb_usersOrderByWithRelationInput = {
    NIK?: SortOrder
    fullname?: SortOrder
    email?: SortOrder
    password?: SortOrder
    gender?: SortOrder
    role?: SortOrder
    status_active?: SortOrder
    join_date?: SortOrder
    tb_balance?: tb_balanceOrderByRelationAggregateInput
    tb_balance_adjustment?: tb_balance_adjustmentOrderByRelationAggregateInput
    tb_leave?: tb_leaveOrderByRelationAggregateInput
  }

  export type tb_usersWhereUniqueInput = Prisma.AtLeast<{
    NIK?: string
    email?: string
    AND?: tb_usersWhereInput | tb_usersWhereInput[]
    OR?: tb_usersWhereInput[]
    NOT?: tb_usersWhereInput | tb_usersWhereInput[]
    fullname?: StringFilter<"tb_users"> | string
    password?: StringFilter<"tb_users"> | string
    gender?: EnumgenderFilter<"tb_users"> | $Enums.gender
    role?: EnumroleFilter<"tb_users"> | $Enums.role
    status_active?: Enumstatus_activeFilter<"tb_users"> | $Enums.status_active
    join_date?: DateTimeFilter<"tb_users"> | Date | string
    tb_balance?: Tb_balanceListRelationFilter
    tb_balance_adjustment?: Tb_balance_adjustmentListRelationFilter
    tb_leave?: Tb_leaveListRelationFilter
  }, "NIK" | "email">

  export type tb_usersOrderByWithAggregationInput = {
    NIK?: SortOrder
    fullname?: SortOrder
    email?: SortOrder
    password?: SortOrder
    gender?: SortOrder
    role?: SortOrder
    status_active?: SortOrder
    join_date?: SortOrder
    _count?: tb_usersCountOrderByAggregateInput
    _max?: tb_usersMaxOrderByAggregateInput
    _min?: tb_usersMinOrderByAggregateInput
  }

  export type tb_usersScalarWhereWithAggregatesInput = {
    AND?: tb_usersScalarWhereWithAggregatesInput | tb_usersScalarWhereWithAggregatesInput[]
    OR?: tb_usersScalarWhereWithAggregatesInput[]
    NOT?: tb_usersScalarWhereWithAggregatesInput | tb_usersScalarWhereWithAggregatesInput[]
    NIK?: StringWithAggregatesFilter<"tb_users"> | string
    fullname?: StringWithAggregatesFilter<"tb_users"> | string
    email?: StringWithAggregatesFilter<"tb_users"> | string
    password?: StringWithAggregatesFilter<"tb_users"> | string
    gender?: EnumgenderWithAggregatesFilter<"tb_users"> | $Enums.gender
    role?: EnumroleWithAggregatesFilter<"tb_users"> | $Enums.role
    status_active?: Enumstatus_activeWithAggregatesFilter<"tb_users"> | $Enums.status_active
    join_date?: DateTimeWithAggregatesFilter<"tb_users"> | Date | string
  }

  export type tb_balance_adjustmentWhereInput = {
    AND?: tb_balance_adjustmentWhereInput | tb_balance_adjustmentWhereInput[]
    OR?: tb_balance_adjustmentWhereInput[]
    NOT?: tb_balance_adjustmentWhereInput | tb_balance_adjustmentWhereInput[]
    id_adjustment?: StringFilter<"tb_balance_adjustment"> | string
    adjustment_value?: IntFilter<"tb_balance_adjustment"> | number
    notes?: StringFilter<"tb_balance_adjustment"> | string
    created_at?: DateTimeFilter<"tb_balance_adjustment"> | Date | string
    actor?: StringFilter<"tb_balance_adjustment"> | string
    NIK?: StringFilter<"tb_balance_adjustment"> | string
    tb_users?: XOR<Tb_usersScalarRelationFilter, tb_usersWhereInput>
  }

  export type tb_balance_adjustmentOrderByWithRelationInput = {
    id_adjustment?: SortOrder
    adjustment_value?: SortOrder
    notes?: SortOrder
    created_at?: SortOrder
    actor?: SortOrder
    NIK?: SortOrder
    tb_users?: tb_usersOrderByWithRelationInput
  }

  export type tb_balance_adjustmentWhereUniqueInput = Prisma.AtLeast<{
    id_adjustment?: string
    AND?: tb_balance_adjustmentWhereInput | tb_balance_adjustmentWhereInput[]
    OR?: tb_balance_adjustmentWhereInput[]
    NOT?: tb_balance_adjustmentWhereInput | tb_balance_adjustmentWhereInput[]
    adjustment_value?: IntFilter<"tb_balance_adjustment"> | number
    notes?: StringFilter<"tb_balance_adjustment"> | string
    created_at?: DateTimeFilter<"tb_balance_adjustment"> | Date | string
    actor?: StringFilter<"tb_balance_adjustment"> | string
    NIK?: StringFilter<"tb_balance_adjustment"> | string
    tb_users?: XOR<Tb_usersScalarRelationFilter, tb_usersWhereInput>
  }, "id_adjustment">

  export type tb_balance_adjustmentOrderByWithAggregationInput = {
    id_adjustment?: SortOrder
    adjustment_value?: SortOrder
    notes?: SortOrder
    created_at?: SortOrder
    actor?: SortOrder
    NIK?: SortOrder
    _count?: tb_balance_adjustmentCountOrderByAggregateInput
    _avg?: tb_balance_adjustmentAvgOrderByAggregateInput
    _max?: tb_balance_adjustmentMaxOrderByAggregateInput
    _min?: tb_balance_adjustmentMinOrderByAggregateInput
    _sum?: tb_balance_adjustmentSumOrderByAggregateInput
  }

  export type tb_balance_adjustmentScalarWhereWithAggregatesInput = {
    AND?: tb_balance_adjustmentScalarWhereWithAggregatesInput | tb_balance_adjustmentScalarWhereWithAggregatesInput[]
    OR?: tb_balance_adjustmentScalarWhereWithAggregatesInput[]
    NOT?: tb_balance_adjustmentScalarWhereWithAggregatesInput | tb_balance_adjustmentScalarWhereWithAggregatesInput[]
    id_adjustment?: StringWithAggregatesFilter<"tb_balance_adjustment"> | string
    adjustment_value?: IntWithAggregatesFilter<"tb_balance_adjustment"> | number
    notes?: StringWithAggregatesFilter<"tb_balance_adjustment"> | string
    created_at?: DateTimeWithAggregatesFilter<"tb_balance_adjustment"> | Date | string
    actor?: StringWithAggregatesFilter<"tb_balance_adjustment"> | string
    NIK?: StringWithAggregatesFilter<"tb_balance_adjustment"> | string
  }

  export type tb_leave_logWhereInput = {
    AND?: tb_leave_logWhereInput | tb_leave_logWhereInput[]
    OR?: tb_leave_logWhereInput[]
    NOT?: tb_leave_logWhereInput | tb_leave_logWhereInput[]
    id_log?: StringFilter<"tb_leave_log"> | string
    old_status?: EnumstatusFilter<"tb_leave_log"> | $Enums.status
    new_status?: EnumstatusFilter<"tb_leave_log"> | $Enums.status
    reason?: StringFilter<"tb_leave_log"> | string
    changed_at?: DateTimeFilter<"tb_leave_log"> | Date | string
    changed_by_nik?: StringFilter<"tb_leave_log"> | string
    id_leave?: StringFilter<"tb_leave_log"> | string
    tb_leave?: XOR<Tb_leaveScalarRelationFilter, tb_leaveWhereInput>
  }

  export type tb_leave_logOrderByWithRelationInput = {
    id_log?: SortOrder
    old_status?: SortOrder
    new_status?: SortOrder
    reason?: SortOrder
    changed_at?: SortOrder
    changed_by_nik?: SortOrder
    id_leave?: SortOrder
    tb_leave?: tb_leaveOrderByWithRelationInput
  }

  export type tb_leave_logWhereUniqueInput = Prisma.AtLeast<{
    id_log?: string
    AND?: tb_leave_logWhereInput | tb_leave_logWhereInput[]
    OR?: tb_leave_logWhereInput[]
    NOT?: tb_leave_logWhereInput | tb_leave_logWhereInput[]
    old_status?: EnumstatusFilter<"tb_leave_log"> | $Enums.status
    new_status?: EnumstatusFilter<"tb_leave_log"> | $Enums.status
    reason?: StringFilter<"tb_leave_log"> | string
    changed_at?: DateTimeFilter<"tb_leave_log"> | Date | string
    changed_by_nik?: StringFilter<"tb_leave_log"> | string
    id_leave?: StringFilter<"tb_leave_log"> | string
    tb_leave?: XOR<Tb_leaveScalarRelationFilter, tb_leaveWhereInput>
  }, "id_log">

  export type tb_leave_logOrderByWithAggregationInput = {
    id_log?: SortOrder
    old_status?: SortOrder
    new_status?: SortOrder
    reason?: SortOrder
    changed_at?: SortOrder
    changed_by_nik?: SortOrder
    id_leave?: SortOrder
    _count?: tb_leave_logCountOrderByAggregateInput
    _max?: tb_leave_logMaxOrderByAggregateInput
    _min?: tb_leave_logMinOrderByAggregateInput
  }

  export type tb_leave_logScalarWhereWithAggregatesInput = {
    AND?: tb_leave_logScalarWhereWithAggregatesInput | tb_leave_logScalarWhereWithAggregatesInput[]
    OR?: tb_leave_logScalarWhereWithAggregatesInput[]
    NOT?: tb_leave_logScalarWhereWithAggregatesInput | tb_leave_logScalarWhereWithAggregatesInput[]
    id_log?: StringWithAggregatesFilter<"tb_leave_log"> | string
    old_status?: EnumstatusWithAggregatesFilter<"tb_leave_log"> | $Enums.status
    new_status?: EnumstatusWithAggregatesFilter<"tb_leave_log"> | $Enums.status
    reason?: StringWithAggregatesFilter<"tb_leave_log"> | string
    changed_at?: DateTimeWithAggregatesFilter<"tb_leave_log"> | Date | string
    changed_by_nik?: StringWithAggregatesFilter<"tb_leave_log"> | string
    id_leave?: StringWithAggregatesFilter<"tb_leave_log"> | string
  }

  export type tb_balanceCreateInput = {
    id_balance?: string
    amount: number
    receive_date: Date | string
    expired_date: Date | string
    tb_users: tb_usersCreateNestedOneWithoutTb_balanceInput
  }

  export type tb_balanceUncheckedCreateInput = {
    id_balance?: string
    amount: number
    receive_date: Date | string
    expired_date: Date | string
    NIK: string
  }

  export type tb_balanceUpdateInput = {
    id_balance?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    receive_date?: DateTimeFieldUpdateOperationsInput | Date | string
    expired_date?: DateTimeFieldUpdateOperationsInput | Date | string
    tb_users?: tb_usersUpdateOneRequiredWithoutTb_balanceNestedInput
  }

  export type tb_balanceUncheckedUpdateInput = {
    id_balance?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    receive_date?: DateTimeFieldUpdateOperationsInput | Date | string
    expired_date?: DateTimeFieldUpdateOperationsInput | Date | string
    NIK?: StringFieldUpdateOperationsInput | string
  }

  export type tb_balanceCreateManyInput = {
    id_balance?: string
    amount: number
    receive_date: Date | string
    expired_date: Date | string
    NIK: string
  }

  export type tb_balanceUpdateManyMutationInput = {
    id_balance?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    receive_date?: DateTimeFieldUpdateOperationsInput | Date | string
    expired_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type tb_balanceUncheckedUpdateManyInput = {
    id_balance?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    receive_date?: DateTimeFieldUpdateOperationsInput | Date | string
    expired_date?: DateTimeFieldUpdateOperationsInput | Date | string
    NIK?: StringFieldUpdateOperationsInput | string
  }

  export type tb_leaveCreateInput = {
    id_leave?: string
    title: string
    leave_type: $Enums.leave_type
    start_date: Date | string
    end_date: Date | string
    total_days: number
    reason: string
    status?: $Enums.status
    created_at?: Date | string
    tb_users: tb_usersCreateNestedOneWithoutTb_leaveInput
    tb_mandatory_leave?: tb_mandatory_leaveCreateNestedOneWithoutTb_leaveInput
    tb_special_leave?: tb_special_leaveCreateNestedOneWithoutTb_leaveInput
    tb_leave_log?: tb_leave_logCreateNestedManyWithoutTb_leaveInput
  }

  export type tb_leaveUncheckedCreateInput = {
    id_leave?: string
    title: string
    leave_type: $Enums.leave_type
    start_date: Date | string
    end_date: Date | string
    total_days: number
    reason: string
    status?: $Enums.status
    created_at?: Date | string
    NIK: string
    id_special?: string | null
    id_mandatory?: string | null
    tb_leave_log?: tb_leave_logUncheckedCreateNestedManyWithoutTb_leaveInput
  }

  export type tb_leaveUpdateInput = {
    id_leave?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    leave_type?: Enumleave_typeFieldUpdateOperationsInput | $Enums.leave_type
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    total_days?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumstatusFieldUpdateOperationsInput | $Enums.status
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tb_users?: tb_usersUpdateOneRequiredWithoutTb_leaveNestedInput
    tb_mandatory_leave?: tb_mandatory_leaveUpdateOneWithoutTb_leaveNestedInput
    tb_special_leave?: tb_special_leaveUpdateOneWithoutTb_leaveNestedInput
    tb_leave_log?: tb_leave_logUpdateManyWithoutTb_leaveNestedInput
  }

  export type tb_leaveUncheckedUpdateInput = {
    id_leave?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    leave_type?: Enumleave_typeFieldUpdateOperationsInput | $Enums.leave_type
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    total_days?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumstatusFieldUpdateOperationsInput | $Enums.status
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    NIK?: StringFieldUpdateOperationsInput | string
    id_special?: NullableStringFieldUpdateOperationsInput | string | null
    id_mandatory?: NullableStringFieldUpdateOperationsInput | string | null
    tb_leave_log?: tb_leave_logUncheckedUpdateManyWithoutTb_leaveNestedInput
  }

  export type tb_leaveCreateManyInput = {
    id_leave?: string
    title: string
    leave_type: $Enums.leave_type
    start_date: Date | string
    end_date: Date | string
    total_days: number
    reason: string
    status?: $Enums.status
    created_at?: Date | string
    NIK: string
    id_special?: string | null
    id_mandatory?: string | null
  }

  export type tb_leaveUpdateManyMutationInput = {
    id_leave?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    leave_type?: Enumleave_typeFieldUpdateOperationsInput | $Enums.leave_type
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    total_days?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumstatusFieldUpdateOperationsInput | $Enums.status
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type tb_leaveUncheckedUpdateManyInput = {
    id_leave?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    leave_type?: Enumleave_typeFieldUpdateOperationsInput | $Enums.leave_type
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    total_days?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumstatusFieldUpdateOperationsInput | $Enums.status
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    NIK?: StringFieldUpdateOperationsInput | string
    id_special?: NullableStringFieldUpdateOperationsInput | string | null
    id_mandatory?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type tb_mandatory_leaveCreateInput = {
    id_mandatory?: string
    title: string
    duration: number
    is_active?: boolean
    description: string
    tb_leave?: tb_leaveCreateNestedManyWithoutTb_mandatory_leaveInput
  }

  export type tb_mandatory_leaveUncheckedCreateInput = {
    id_mandatory?: string
    title: string
    duration: number
    is_active?: boolean
    description: string
    tb_leave?: tb_leaveUncheckedCreateNestedManyWithoutTb_mandatory_leaveInput
  }

  export type tb_mandatory_leaveUpdateInput = {
    id_mandatory?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
    tb_leave?: tb_leaveUpdateManyWithoutTb_mandatory_leaveNestedInput
  }

  export type tb_mandatory_leaveUncheckedUpdateInput = {
    id_mandatory?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
    tb_leave?: tb_leaveUncheckedUpdateManyWithoutTb_mandatory_leaveNestedInput
  }

  export type tb_mandatory_leaveCreateManyInput = {
    id_mandatory?: string
    title: string
    duration: number
    is_active?: boolean
    description: string
  }

  export type tb_mandatory_leaveUpdateManyMutationInput = {
    id_mandatory?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
  }

  export type tb_mandatory_leaveUncheckedUpdateManyInput = {
    id_mandatory?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
  }

  export type tb_special_leaveCreateInput = {
    id_special?: string
    title: string
    applicable_gender: $Enums.applicable_gender
    duration: number
    is_active?: boolean
    description: string
    tb_leave?: tb_leaveCreateNestedManyWithoutTb_special_leaveInput
  }

  export type tb_special_leaveUncheckedCreateInput = {
    id_special?: string
    title: string
    applicable_gender: $Enums.applicable_gender
    duration: number
    is_active?: boolean
    description: string
    tb_leave?: tb_leaveUncheckedCreateNestedManyWithoutTb_special_leaveInput
  }

  export type tb_special_leaveUpdateInput = {
    id_special?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    applicable_gender?: Enumapplicable_genderFieldUpdateOperationsInput | $Enums.applicable_gender
    duration?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
    tb_leave?: tb_leaveUpdateManyWithoutTb_special_leaveNestedInput
  }

  export type tb_special_leaveUncheckedUpdateInput = {
    id_special?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    applicable_gender?: Enumapplicable_genderFieldUpdateOperationsInput | $Enums.applicable_gender
    duration?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
    tb_leave?: tb_leaveUncheckedUpdateManyWithoutTb_special_leaveNestedInput
  }

  export type tb_special_leaveCreateManyInput = {
    id_special?: string
    title: string
    applicable_gender: $Enums.applicable_gender
    duration: number
    is_active?: boolean
    description: string
  }

  export type tb_special_leaveUpdateManyMutationInput = {
    id_special?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    applicable_gender?: Enumapplicable_genderFieldUpdateOperationsInput | $Enums.applicable_gender
    duration?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
  }

  export type tb_special_leaveUncheckedUpdateManyInput = {
    id_special?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    applicable_gender?: Enumapplicable_genderFieldUpdateOperationsInput | $Enums.applicable_gender
    duration?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
  }

  export type tb_usersCreateInput = {
    NIK: string
    fullname: string
    email: string
    password: string
    gender: $Enums.gender
    role: $Enums.role
    status_active?: $Enums.status_active
    join_date: Date | string
    tb_balance?: tb_balanceCreateNestedManyWithoutTb_usersInput
    tb_balance_adjustment?: tb_balance_adjustmentCreateNestedManyWithoutTb_usersInput
    tb_leave?: tb_leaveCreateNestedManyWithoutTb_usersInput
  }

  export type tb_usersUncheckedCreateInput = {
    NIK: string
    fullname: string
    email: string
    password: string
    gender: $Enums.gender
    role: $Enums.role
    status_active?: $Enums.status_active
    join_date: Date | string
    tb_balance?: tb_balanceUncheckedCreateNestedManyWithoutTb_usersInput
    tb_balance_adjustment?: tb_balance_adjustmentUncheckedCreateNestedManyWithoutTb_usersInput
    tb_leave?: tb_leaveUncheckedCreateNestedManyWithoutTb_usersInput
  }

  export type tb_usersUpdateInput = {
    NIK?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    gender?: EnumgenderFieldUpdateOperationsInput | $Enums.gender
    role?: EnumroleFieldUpdateOperationsInput | $Enums.role
    status_active?: Enumstatus_activeFieldUpdateOperationsInput | $Enums.status_active
    join_date?: DateTimeFieldUpdateOperationsInput | Date | string
    tb_balance?: tb_balanceUpdateManyWithoutTb_usersNestedInput
    tb_balance_adjustment?: tb_balance_adjustmentUpdateManyWithoutTb_usersNestedInput
    tb_leave?: tb_leaveUpdateManyWithoutTb_usersNestedInput
  }

  export type tb_usersUncheckedUpdateInput = {
    NIK?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    gender?: EnumgenderFieldUpdateOperationsInput | $Enums.gender
    role?: EnumroleFieldUpdateOperationsInput | $Enums.role
    status_active?: Enumstatus_activeFieldUpdateOperationsInput | $Enums.status_active
    join_date?: DateTimeFieldUpdateOperationsInput | Date | string
    tb_balance?: tb_balanceUncheckedUpdateManyWithoutTb_usersNestedInput
    tb_balance_adjustment?: tb_balance_adjustmentUncheckedUpdateManyWithoutTb_usersNestedInput
    tb_leave?: tb_leaveUncheckedUpdateManyWithoutTb_usersNestedInput
  }

  export type tb_usersCreateManyInput = {
    NIK: string
    fullname: string
    email: string
    password: string
    gender: $Enums.gender
    role: $Enums.role
    status_active?: $Enums.status_active
    join_date: Date | string
  }

  export type tb_usersUpdateManyMutationInput = {
    NIK?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    gender?: EnumgenderFieldUpdateOperationsInput | $Enums.gender
    role?: EnumroleFieldUpdateOperationsInput | $Enums.role
    status_active?: Enumstatus_activeFieldUpdateOperationsInput | $Enums.status_active
    join_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type tb_usersUncheckedUpdateManyInput = {
    NIK?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    gender?: EnumgenderFieldUpdateOperationsInput | $Enums.gender
    role?: EnumroleFieldUpdateOperationsInput | $Enums.role
    status_active?: Enumstatus_activeFieldUpdateOperationsInput | $Enums.status_active
    join_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type tb_balance_adjustmentCreateInput = {
    id_adjustment?: string
    adjustment_value: number
    notes: string
    created_at: Date | string
    actor: string
    tb_users: tb_usersCreateNestedOneWithoutTb_balance_adjustmentInput
  }

  export type tb_balance_adjustmentUncheckedCreateInput = {
    id_adjustment?: string
    adjustment_value: number
    notes: string
    created_at: Date | string
    actor: string
    NIK: string
  }

  export type tb_balance_adjustmentUpdateInput = {
    id_adjustment?: StringFieldUpdateOperationsInput | string
    adjustment_value?: IntFieldUpdateOperationsInput | number
    notes?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    actor?: StringFieldUpdateOperationsInput | string
    tb_users?: tb_usersUpdateOneRequiredWithoutTb_balance_adjustmentNestedInput
  }

  export type tb_balance_adjustmentUncheckedUpdateInput = {
    id_adjustment?: StringFieldUpdateOperationsInput | string
    adjustment_value?: IntFieldUpdateOperationsInput | number
    notes?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    actor?: StringFieldUpdateOperationsInput | string
    NIK?: StringFieldUpdateOperationsInput | string
  }

  export type tb_balance_adjustmentCreateManyInput = {
    id_adjustment?: string
    adjustment_value: number
    notes: string
    created_at: Date | string
    actor: string
    NIK: string
  }

  export type tb_balance_adjustmentUpdateManyMutationInput = {
    id_adjustment?: StringFieldUpdateOperationsInput | string
    adjustment_value?: IntFieldUpdateOperationsInput | number
    notes?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    actor?: StringFieldUpdateOperationsInput | string
  }

  export type tb_balance_adjustmentUncheckedUpdateManyInput = {
    id_adjustment?: StringFieldUpdateOperationsInput | string
    adjustment_value?: IntFieldUpdateOperationsInput | number
    notes?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    actor?: StringFieldUpdateOperationsInput | string
    NIK?: StringFieldUpdateOperationsInput | string
  }

  export type tb_leave_logCreateInput = {
    id_log?: string
    old_status: $Enums.status
    new_status: $Enums.status
    reason: string
    changed_at: Date | string
    changed_by_nik: string
    tb_leave: tb_leaveCreateNestedOneWithoutTb_leave_logInput
  }

  export type tb_leave_logUncheckedCreateInput = {
    id_log?: string
    old_status: $Enums.status
    new_status: $Enums.status
    reason: string
    changed_at: Date | string
    changed_by_nik: string
    id_leave: string
  }

  export type tb_leave_logUpdateInput = {
    id_log?: StringFieldUpdateOperationsInput | string
    old_status?: EnumstatusFieldUpdateOperationsInput | $Enums.status
    new_status?: EnumstatusFieldUpdateOperationsInput | $Enums.status
    reason?: StringFieldUpdateOperationsInput | string
    changed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    changed_by_nik?: StringFieldUpdateOperationsInput | string
    tb_leave?: tb_leaveUpdateOneRequiredWithoutTb_leave_logNestedInput
  }

  export type tb_leave_logUncheckedUpdateInput = {
    id_log?: StringFieldUpdateOperationsInput | string
    old_status?: EnumstatusFieldUpdateOperationsInput | $Enums.status
    new_status?: EnumstatusFieldUpdateOperationsInput | $Enums.status
    reason?: StringFieldUpdateOperationsInput | string
    changed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    changed_by_nik?: StringFieldUpdateOperationsInput | string
    id_leave?: StringFieldUpdateOperationsInput | string
  }

  export type tb_leave_logCreateManyInput = {
    id_log?: string
    old_status: $Enums.status
    new_status: $Enums.status
    reason: string
    changed_at: Date | string
    changed_by_nik: string
    id_leave: string
  }

  export type tb_leave_logUpdateManyMutationInput = {
    id_log?: StringFieldUpdateOperationsInput | string
    old_status?: EnumstatusFieldUpdateOperationsInput | $Enums.status
    new_status?: EnumstatusFieldUpdateOperationsInput | $Enums.status
    reason?: StringFieldUpdateOperationsInput | string
    changed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    changed_by_nik?: StringFieldUpdateOperationsInput | string
  }

  export type tb_leave_logUncheckedUpdateManyInput = {
    id_log?: StringFieldUpdateOperationsInput | string
    old_status?: EnumstatusFieldUpdateOperationsInput | $Enums.status
    new_status?: EnumstatusFieldUpdateOperationsInput | $Enums.status
    reason?: StringFieldUpdateOperationsInput | string
    changed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    changed_by_nik?: StringFieldUpdateOperationsInput | string
    id_leave?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type Tb_usersScalarRelationFilter = {
    is?: tb_usersWhereInput
    isNot?: tb_usersWhereInput
  }

  export type tb_balanceCountOrderByAggregateInput = {
    id_balance?: SortOrder
    amount?: SortOrder
    receive_date?: SortOrder
    expired_date?: SortOrder
    NIK?: SortOrder
  }

  export type tb_balanceAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type tb_balanceMaxOrderByAggregateInput = {
    id_balance?: SortOrder
    amount?: SortOrder
    receive_date?: SortOrder
    expired_date?: SortOrder
    NIK?: SortOrder
  }

  export type tb_balanceMinOrderByAggregateInput = {
    id_balance?: SortOrder
    amount?: SortOrder
    receive_date?: SortOrder
    expired_date?: SortOrder
    NIK?: SortOrder
  }

  export type tb_balanceSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type Enumleave_typeFilter<$PrismaModel = never> = {
    equals?: $Enums.leave_type | Enumleave_typeFieldRefInput<$PrismaModel>
    in?: $Enums.leave_type[] | ListEnumleave_typeFieldRefInput<$PrismaModel>
    notIn?: $Enums.leave_type[] | ListEnumleave_typeFieldRefInput<$PrismaModel>
    not?: NestedEnumleave_typeFilter<$PrismaModel> | $Enums.leave_type
  }

  export type EnumstatusFilter<$PrismaModel = never> = {
    equals?: $Enums.status | EnumstatusFieldRefInput<$PrismaModel>
    in?: $Enums.status[] | ListEnumstatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.status[] | ListEnumstatusFieldRefInput<$PrismaModel>
    not?: NestedEnumstatusFilter<$PrismaModel> | $Enums.status
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type Tb_mandatory_leaveNullableScalarRelationFilter = {
    is?: tb_mandatory_leaveWhereInput | null
    isNot?: tb_mandatory_leaveWhereInput | null
  }

  export type Tb_special_leaveNullableScalarRelationFilter = {
    is?: tb_special_leaveWhereInput | null
    isNot?: tb_special_leaveWhereInput | null
  }

  export type Tb_leave_logListRelationFilter = {
    every?: tb_leave_logWhereInput
    some?: tb_leave_logWhereInput
    none?: tb_leave_logWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type tb_leave_logOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type tb_leaveCountOrderByAggregateInput = {
    id_leave?: SortOrder
    title?: SortOrder
    leave_type?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    total_days?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    NIK?: SortOrder
    id_special?: SortOrder
    id_mandatory?: SortOrder
  }

  export type tb_leaveAvgOrderByAggregateInput = {
    total_days?: SortOrder
  }

  export type tb_leaveMaxOrderByAggregateInput = {
    id_leave?: SortOrder
    title?: SortOrder
    leave_type?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    total_days?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    NIK?: SortOrder
    id_special?: SortOrder
    id_mandatory?: SortOrder
  }

  export type tb_leaveMinOrderByAggregateInput = {
    id_leave?: SortOrder
    title?: SortOrder
    leave_type?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    total_days?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    NIK?: SortOrder
    id_special?: SortOrder
    id_mandatory?: SortOrder
  }

  export type tb_leaveSumOrderByAggregateInput = {
    total_days?: SortOrder
  }

  export type Enumleave_typeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.leave_type | Enumleave_typeFieldRefInput<$PrismaModel>
    in?: $Enums.leave_type[] | ListEnumleave_typeFieldRefInput<$PrismaModel>
    notIn?: $Enums.leave_type[] | ListEnumleave_typeFieldRefInput<$PrismaModel>
    not?: NestedEnumleave_typeWithAggregatesFilter<$PrismaModel> | $Enums.leave_type
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumleave_typeFilter<$PrismaModel>
    _max?: NestedEnumleave_typeFilter<$PrismaModel>
  }

  export type EnumstatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.status | EnumstatusFieldRefInput<$PrismaModel>
    in?: $Enums.status[] | ListEnumstatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.status[] | ListEnumstatusFieldRefInput<$PrismaModel>
    not?: NestedEnumstatusWithAggregatesFilter<$PrismaModel> | $Enums.status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumstatusFilter<$PrismaModel>
    _max?: NestedEnumstatusFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type Tb_leaveListRelationFilter = {
    every?: tb_leaveWhereInput
    some?: tb_leaveWhereInput
    none?: tb_leaveWhereInput
  }

  export type tb_leaveOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type tb_mandatory_leaveCountOrderByAggregateInput = {
    id_mandatory?: SortOrder
    title?: SortOrder
    duration?: SortOrder
    is_active?: SortOrder
    description?: SortOrder
  }

  export type tb_mandatory_leaveAvgOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type tb_mandatory_leaveMaxOrderByAggregateInput = {
    id_mandatory?: SortOrder
    title?: SortOrder
    duration?: SortOrder
    is_active?: SortOrder
    description?: SortOrder
  }

  export type tb_mandatory_leaveMinOrderByAggregateInput = {
    id_mandatory?: SortOrder
    title?: SortOrder
    duration?: SortOrder
    is_active?: SortOrder
    description?: SortOrder
  }

  export type tb_mandatory_leaveSumOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type Enumapplicable_genderFilter<$PrismaModel = never> = {
    equals?: $Enums.applicable_gender | Enumapplicable_genderFieldRefInput<$PrismaModel>
    in?: $Enums.applicable_gender[] | ListEnumapplicable_genderFieldRefInput<$PrismaModel>
    notIn?: $Enums.applicable_gender[] | ListEnumapplicable_genderFieldRefInput<$PrismaModel>
    not?: NestedEnumapplicable_genderFilter<$PrismaModel> | $Enums.applicable_gender
  }

  export type tb_special_leaveCountOrderByAggregateInput = {
    id_special?: SortOrder
    title?: SortOrder
    applicable_gender?: SortOrder
    duration?: SortOrder
    is_active?: SortOrder
    description?: SortOrder
  }

  export type tb_special_leaveAvgOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type tb_special_leaveMaxOrderByAggregateInput = {
    id_special?: SortOrder
    title?: SortOrder
    applicable_gender?: SortOrder
    duration?: SortOrder
    is_active?: SortOrder
    description?: SortOrder
  }

  export type tb_special_leaveMinOrderByAggregateInput = {
    id_special?: SortOrder
    title?: SortOrder
    applicable_gender?: SortOrder
    duration?: SortOrder
    is_active?: SortOrder
    description?: SortOrder
  }

  export type tb_special_leaveSumOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type Enumapplicable_genderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.applicable_gender | Enumapplicable_genderFieldRefInput<$PrismaModel>
    in?: $Enums.applicable_gender[] | ListEnumapplicable_genderFieldRefInput<$PrismaModel>
    notIn?: $Enums.applicable_gender[] | ListEnumapplicable_genderFieldRefInput<$PrismaModel>
    not?: NestedEnumapplicable_genderWithAggregatesFilter<$PrismaModel> | $Enums.applicable_gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumapplicable_genderFilter<$PrismaModel>
    _max?: NestedEnumapplicable_genderFilter<$PrismaModel>
  }

  export type EnumgenderFilter<$PrismaModel = never> = {
    equals?: $Enums.gender | EnumgenderFieldRefInput<$PrismaModel>
    in?: $Enums.gender[] | ListEnumgenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.gender[] | ListEnumgenderFieldRefInput<$PrismaModel>
    not?: NestedEnumgenderFilter<$PrismaModel> | $Enums.gender
  }

  export type EnumroleFilter<$PrismaModel = never> = {
    equals?: $Enums.role | EnumroleFieldRefInput<$PrismaModel>
    in?: $Enums.role[] | ListEnumroleFieldRefInput<$PrismaModel>
    notIn?: $Enums.role[] | ListEnumroleFieldRefInput<$PrismaModel>
    not?: NestedEnumroleFilter<$PrismaModel> | $Enums.role
  }

  export type Enumstatus_activeFilter<$PrismaModel = never> = {
    equals?: $Enums.status_active | Enumstatus_activeFieldRefInput<$PrismaModel>
    in?: $Enums.status_active[] | ListEnumstatus_activeFieldRefInput<$PrismaModel>
    notIn?: $Enums.status_active[] | ListEnumstatus_activeFieldRefInput<$PrismaModel>
    not?: NestedEnumstatus_activeFilter<$PrismaModel> | $Enums.status_active
  }

  export type Tb_balanceListRelationFilter = {
    every?: tb_balanceWhereInput
    some?: tb_balanceWhereInput
    none?: tb_balanceWhereInput
  }

  export type Tb_balance_adjustmentListRelationFilter = {
    every?: tb_balance_adjustmentWhereInput
    some?: tb_balance_adjustmentWhereInput
    none?: tb_balance_adjustmentWhereInput
  }

  export type tb_balanceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type tb_balance_adjustmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type tb_usersCountOrderByAggregateInput = {
    NIK?: SortOrder
    fullname?: SortOrder
    email?: SortOrder
    password?: SortOrder
    gender?: SortOrder
    role?: SortOrder
    status_active?: SortOrder
    join_date?: SortOrder
  }

  export type tb_usersMaxOrderByAggregateInput = {
    NIK?: SortOrder
    fullname?: SortOrder
    email?: SortOrder
    password?: SortOrder
    gender?: SortOrder
    role?: SortOrder
    status_active?: SortOrder
    join_date?: SortOrder
  }

  export type tb_usersMinOrderByAggregateInput = {
    NIK?: SortOrder
    fullname?: SortOrder
    email?: SortOrder
    password?: SortOrder
    gender?: SortOrder
    role?: SortOrder
    status_active?: SortOrder
    join_date?: SortOrder
  }

  export type EnumgenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.gender | EnumgenderFieldRefInput<$PrismaModel>
    in?: $Enums.gender[] | ListEnumgenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.gender[] | ListEnumgenderFieldRefInput<$PrismaModel>
    not?: NestedEnumgenderWithAggregatesFilter<$PrismaModel> | $Enums.gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumgenderFilter<$PrismaModel>
    _max?: NestedEnumgenderFilter<$PrismaModel>
  }

  export type EnumroleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.role | EnumroleFieldRefInput<$PrismaModel>
    in?: $Enums.role[] | ListEnumroleFieldRefInput<$PrismaModel>
    notIn?: $Enums.role[] | ListEnumroleFieldRefInput<$PrismaModel>
    not?: NestedEnumroleWithAggregatesFilter<$PrismaModel> | $Enums.role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumroleFilter<$PrismaModel>
    _max?: NestedEnumroleFilter<$PrismaModel>
  }

  export type Enumstatus_activeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.status_active | Enumstatus_activeFieldRefInput<$PrismaModel>
    in?: $Enums.status_active[] | ListEnumstatus_activeFieldRefInput<$PrismaModel>
    notIn?: $Enums.status_active[] | ListEnumstatus_activeFieldRefInput<$PrismaModel>
    not?: NestedEnumstatus_activeWithAggregatesFilter<$PrismaModel> | $Enums.status_active
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumstatus_activeFilter<$PrismaModel>
    _max?: NestedEnumstatus_activeFilter<$PrismaModel>
  }

  export type tb_balance_adjustmentCountOrderByAggregateInput = {
    id_adjustment?: SortOrder
    adjustment_value?: SortOrder
    notes?: SortOrder
    created_at?: SortOrder
    actor?: SortOrder
    NIK?: SortOrder
  }

  export type tb_balance_adjustmentAvgOrderByAggregateInput = {
    adjustment_value?: SortOrder
  }

  export type tb_balance_adjustmentMaxOrderByAggregateInput = {
    id_adjustment?: SortOrder
    adjustment_value?: SortOrder
    notes?: SortOrder
    created_at?: SortOrder
    actor?: SortOrder
    NIK?: SortOrder
  }

  export type tb_balance_adjustmentMinOrderByAggregateInput = {
    id_adjustment?: SortOrder
    adjustment_value?: SortOrder
    notes?: SortOrder
    created_at?: SortOrder
    actor?: SortOrder
    NIK?: SortOrder
  }

  export type tb_balance_adjustmentSumOrderByAggregateInput = {
    adjustment_value?: SortOrder
  }

  export type Tb_leaveScalarRelationFilter = {
    is?: tb_leaveWhereInput
    isNot?: tb_leaveWhereInput
  }

  export type tb_leave_logCountOrderByAggregateInput = {
    id_log?: SortOrder
    old_status?: SortOrder
    new_status?: SortOrder
    reason?: SortOrder
    changed_at?: SortOrder
    changed_by_nik?: SortOrder
    id_leave?: SortOrder
  }

  export type tb_leave_logMaxOrderByAggregateInput = {
    id_log?: SortOrder
    old_status?: SortOrder
    new_status?: SortOrder
    reason?: SortOrder
    changed_at?: SortOrder
    changed_by_nik?: SortOrder
    id_leave?: SortOrder
  }

  export type tb_leave_logMinOrderByAggregateInput = {
    id_log?: SortOrder
    old_status?: SortOrder
    new_status?: SortOrder
    reason?: SortOrder
    changed_at?: SortOrder
    changed_by_nik?: SortOrder
    id_leave?: SortOrder
  }

  export type tb_usersCreateNestedOneWithoutTb_balanceInput = {
    create?: XOR<tb_usersCreateWithoutTb_balanceInput, tb_usersUncheckedCreateWithoutTb_balanceInput>
    connectOrCreate?: tb_usersCreateOrConnectWithoutTb_balanceInput
    connect?: tb_usersWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type tb_usersUpdateOneRequiredWithoutTb_balanceNestedInput = {
    create?: XOR<tb_usersCreateWithoutTb_balanceInput, tb_usersUncheckedCreateWithoutTb_balanceInput>
    connectOrCreate?: tb_usersCreateOrConnectWithoutTb_balanceInput
    upsert?: tb_usersUpsertWithoutTb_balanceInput
    connect?: tb_usersWhereUniqueInput
    update?: XOR<XOR<tb_usersUpdateToOneWithWhereWithoutTb_balanceInput, tb_usersUpdateWithoutTb_balanceInput>, tb_usersUncheckedUpdateWithoutTb_balanceInput>
  }

  export type tb_usersCreateNestedOneWithoutTb_leaveInput = {
    create?: XOR<tb_usersCreateWithoutTb_leaveInput, tb_usersUncheckedCreateWithoutTb_leaveInput>
    connectOrCreate?: tb_usersCreateOrConnectWithoutTb_leaveInput
    connect?: tb_usersWhereUniqueInput
  }

  export type tb_mandatory_leaveCreateNestedOneWithoutTb_leaveInput = {
    create?: XOR<tb_mandatory_leaveCreateWithoutTb_leaveInput, tb_mandatory_leaveUncheckedCreateWithoutTb_leaveInput>
    connectOrCreate?: tb_mandatory_leaveCreateOrConnectWithoutTb_leaveInput
    connect?: tb_mandatory_leaveWhereUniqueInput
  }

  export type tb_special_leaveCreateNestedOneWithoutTb_leaveInput = {
    create?: XOR<tb_special_leaveCreateWithoutTb_leaveInput, tb_special_leaveUncheckedCreateWithoutTb_leaveInput>
    connectOrCreate?: tb_special_leaveCreateOrConnectWithoutTb_leaveInput
    connect?: tb_special_leaveWhereUniqueInput
  }

  export type tb_leave_logCreateNestedManyWithoutTb_leaveInput = {
    create?: XOR<tb_leave_logCreateWithoutTb_leaveInput, tb_leave_logUncheckedCreateWithoutTb_leaveInput> | tb_leave_logCreateWithoutTb_leaveInput[] | tb_leave_logUncheckedCreateWithoutTb_leaveInput[]
    connectOrCreate?: tb_leave_logCreateOrConnectWithoutTb_leaveInput | tb_leave_logCreateOrConnectWithoutTb_leaveInput[]
    createMany?: tb_leave_logCreateManyTb_leaveInputEnvelope
    connect?: tb_leave_logWhereUniqueInput | tb_leave_logWhereUniqueInput[]
  }

  export type tb_leave_logUncheckedCreateNestedManyWithoutTb_leaveInput = {
    create?: XOR<tb_leave_logCreateWithoutTb_leaveInput, tb_leave_logUncheckedCreateWithoutTb_leaveInput> | tb_leave_logCreateWithoutTb_leaveInput[] | tb_leave_logUncheckedCreateWithoutTb_leaveInput[]
    connectOrCreate?: tb_leave_logCreateOrConnectWithoutTb_leaveInput | tb_leave_logCreateOrConnectWithoutTb_leaveInput[]
    createMany?: tb_leave_logCreateManyTb_leaveInputEnvelope
    connect?: tb_leave_logWhereUniqueInput | tb_leave_logWhereUniqueInput[]
  }

  export type Enumleave_typeFieldUpdateOperationsInput = {
    set?: $Enums.leave_type
  }

  export type EnumstatusFieldUpdateOperationsInput = {
    set?: $Enums.status
  }

  export type tb_usersUpdateOneRequiredWithoutTb_leaveNestedInput = {
    create?: XOR<tb_usersCreateWithoutTb_leaveInput, tb_usersUncheckedCreateWithoutTb_leaveInput>
    connectOrCreate?: tb_usersCreateOrConnectWithoutTb_leaveInput
    upsert?: tb_usersUpsertWithoutTb_leaveInput
    connect?: tb_usersWhereUniqueInput
    update?: XOR<XOR<tb_usersUpdateToOneWithWhereWithoutTb_leaveInput, tb_usersUpdateWithoutTb_leaveInput>, tb_usersUncheckedUpdateWithoutTb_leaveInput>
  }

  export type tb_mandatory_leaveUpdateOneWithoutTb_leaveNestedInput = {
    create?: XOR<tb_mandatory_leaveCreateWithoutTb_leaveInput, tb_mandatory_leaveUncheckedCreateWithoutTb_leaveInput>
    connectOrCreate?: tb_mandatory_leaveCreateOrConnectWithoutTb_leaveInput
    upsert?: tb_mandatory_leaveUpsertWithoutTb_leaveInput
    disconnect?: tb_mandatory_leaveWhereInput | boolean
    delete?: tb_mandatory_leaveWhereInput | boolean
    connect?: tb_mandatory_leaveWhereUniqueInput
    update?: XOR<XOR<tb_mandatory_leaveUpdateToOneWithWhereWithoutTb_leaveInput, tb_mandatory_leaveUpdateWithoutTb_leaveInput>, tb_mandatory_leaveUncheckedUpdateWithoutTb_leaveInput>
  }

  export type tb_special_leaveUpdateOneWithoutTb_leaveNestedInput = {
    create?: XOR<tb_special_leaveCreateWithoutTb_leaveInput, tb_special_leaveUncheckedCreateWithoutTb_leaveInput>
    connectOrCreate?: tb_special_leaveCreateOrConnectWithoutTb_leaveInput
    upsert?: tb_special_leaveUpsertWithoutTb_leaveInput
    disconnect?: tb_special_leaveWhereInput | boolean
    delete?: tb_special_leaveWhereInput | boolean
    connect?: tb_special_leaveWhereUniqueInput
    update?: XOR<XOR<tb_special_leaveUpdateToOneWithWhereWithoutTb_leaveInput, tb_special_leaveUpdateWithoutTb_leaveInput>, tb_special_leaveUncheckedUpdateWithoutTb_leaveInput>
  }

  export type tb_leave_logUpdateManyWithoutTb_leaveNestedInput = {
    create?: XOR<tb_leave_logCreateWithoutTb_leaveInput, tb_leave_logUncheckedCreateWithoutTb_leaveInput> | tb_leave_logCreateWithoutTb_leaveInput[] | tb_leave_logUncheckedCreateWithoutTb_leaveInput[]
    connectOrCreate?: tb_leave_logCreateOrConnectWithoutTb_leaveInput | tb_leave_logCreateOrConnectWithoutTb_leaveInput[]
    upsert?: tb_leave_logUpsertWithWhereUniqueWithoutTb_leaveInput | tb_leave_logUpsertWithWhereUniqueWithoutTb_leaveInput[]
    createMany?: tb_leave_logCreateManyTb_leaveInputEnvelope
    set?: tb_leave_logWhereUniqueInput | tb_leave_logWhereUniqueInput[]
    disconnect?: tb_leave_logWhereUniqueInput | tb_leave_logWhereUniqueInput[]
    delete?: tb_leave_logWhereUniqueInput | tb_leave_logWhereUniqueInput[]
    connect?: tb_leave_logWhereUniqueInput | tb_leave_logWhereUniqueInput[]
    update?: tb_leave_logUpdateWithWhereUniqueWithoutTb_leaveInput | tb_leave_logUpdateWithWhereUniqueWithoutTb_leaveInput[]
    updateMany?: tb_leave_logUpdateManyWithWhereWithoutTb_leaveInput | tb_leave_logUpdateManyWithWhereWithoutTb_leaveInput[]
    deleteMany?: tb_leave_logScalarWhereInput | tb_leave_logScalarWhereInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type tb_leave_logUncheckedUpdateManyWithoutTb_leaveNestedInput = {
    create?: XOR<tb_leave_logCreateWithoutTb_leaveInput, tb_leave_logUncheckedCreateWithoutTb_leaveInput> | tb_leave_logCreateWithoutTb_leaveInput[] | tb_leave_logUncheckedCreateWithoutTb_leaveInput[]
    connectOrCreate?: tb_leave_logCreateOrConnectWithoutTb_leaveInput | tb_leave_logCreateOrConnectWithoutTb_leaveInput[]
    upsert?: tb_leave_logUpsertWithWhereUniqueWithoutTb_leaveInput | tb_leave_logUpsertWithWhereUniqueWithoutTb_leaveInput[]
    createMany?: tb_leave_logCreateManyTb_leaveInputEnvelope
    set?: tb_leave_logWhereUniqueInput | tb_leave_logWhereUniqueInput[]
    disconnect?: tb_leave_logWhereUniqueInput | tb_leave_logWhereUniqueInput[]
    delete?: tb_leave_logWhereUniqueInput | tb_leave_logWhereUniqueInput[]
    connect?: tb_leave_logWhereUniqueInput | tb_leave_logWhereUniqueInput[]
    update?: tb_leave_logUpdateWithWhereUniqueWithoutTb_leaveInput | tb_leave_logUpdateWithWhereUniqueWithoutTb_leaveInput[]
    updateMany?: tb_leave_logUpdateManyWithWhereWithoutTb_leaveInput | tb_leave_logUpdateManyWithWhereWithoutTb_leaveInput[]
    deleteMany?: tb_leave_logScalarWhereInput | tb_leave_logScalarWhereInput[]
  }

  export type tb_leaveCreateNestedManyWithoutTb_mandatory_leaveInput = {
    create?: XOR<tb_leaveCreateWithoutTb_mandatory_leaveInput, tb_leaveUncheckedCreateWithoutTb_mandatory_leaveInput> | tb_leaveCreateWithoutTb_mandatory_leaveInput[] | tb_leaveUncheckedCreateWithoutTb_mandatory_leaveInput[]
    connectOrCreate?: tb_leaveCreateOrConnectWithoutTb_mandatory_leaveInput | tb_leaveCreateOrConnectWithoutTb_mandatory_leaveInput[]
    createMany?: tb_leaveCreateManyTb_mandatory_leaveInputEnvelope
    connect?: tb_leaveWhereUniqueInput | tb_leaveWhereUniqueInput[]
  }

  export type tb_leaveUncheckedCreateNestedManyWithoutTb_mandatory_leaveInput = {
    create?: XOR<tb_leaveCreateWithoutTb_mandatory_leaveInput, tb_leaveUncheckedCreateWithoutTb_mandatory_leaveInput> | tb_leaveCreateWithoutTb_mandatory_leaveInput[] | tb_leaveUncheckedCreateWithoutTb_mandatory_leaveInput[]
    connectOrCreate?: tb_leaveCreateOrConnectWithoutTb_mandatory_leaveInput | tb_leaveCreateOrConnectWithoutTb_mandatory_leaveInput[]
    createMany?: tb_leaveCreateManyTb_mandatory_leaveInputEnvelope
    connect?: tb_leaveWhereUniqueInput | tb_leaveWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type tb_leaveUpdateManyWithoutTb_mandatory_leaveNestedInput = {
    create?: XOR<tb_leaveCreateWithoutTb_mandatory_leaveInput, tb_leaveUncheckedCreateWithoutTb_mandatory_leaveInput> | tb_leaveCreateWithoutTb_mandatory_leaveInput[] | tb_leaveUncheckedCreateWithoutTb_mandatory_leaveInput[]
    connectOrCreate?: tb_leaveCreateOrConnectWithoutTb_mandatory_leaveInput | tb_leaveCreateOrConnectWithoutTb_mandatory_leaveInput[]
    upsert?: tb_leaveUpsertWithWhereUniqueWithoutTb_mandatory_leaveInput | tb_leaveUpsertWithWhereUniqueWithoutTb_mandatory_leaveInput[]
    createMany?: tb_leaveCreateManyTb_mandatory_leaveInputEnvelope
    set?: tb_leaveWhereUniqueInput | tb_leaveWhereUniqueInput[]
    disconnect?: tb_leaveWhereUniqueInput | tb_leaveWhereUniqueInput[]
    delete?: tb_leaveWhereUniqueInput | tb_leaveWhereUniqueInput[]
    connect?: tb_leaveWhereUniqueInput | tb_leaveWhereUniqueInput[]
    update?: tb_leaveUpdateWithWhereUniqueWithoutTb_mandatory_leaveInput | tb_leaveUpdateWithWhereUniqueWithoutTb_mandatory_leaveInput[]
    updateMany?: tb_leaveUpdateManyWithWhereWithoutTb_mandatory_leaveInput | tb_leaveUpdateManyWithWhereWithoutTb_mandatory_leaveInput[]
    deleteMany?: tb_leaveScalarWhereInput | tb_leaveScalarWhereInput[]
  }

  export type tb_leaveUncheckedUpdateManyWithoutTb_mandatory_leaveNestedInput = {
    create?: XOR<tb_leaveCreateWithoutTb_mandatory_leaveInput, tb_leaveUncheckedCreateWithoutTb_mandatory_leaveInput> | tb_leaveCreateWithoutTb_mandatory_leaveInput[] | tb_leaveUncheckedCreateWithoutTb_mandatory_leaveInput[]
    connectOrCreate?: tb_leaveCreateOrConnectWithoutTb_mandatory_leaveInput | tb_leaveCreateOrConnectWithoutTb_mandatory_leaveInput[]
    upsert?: tb_leaveUpsertWithWhereUniqueWithoutTb_mandatory_leaveInput | tb_leaveUpsertWithWhereUniqueWithoutTb_mandatory_leaveInput[]
    createMany?: tb_leaveCreateManyTb_mandatory_leaveInputEnvelope
    set?: tb_leaveWhereUniqueInput | tb_leaveWhereUniqueInput[]
    disconnect?: tb_leaveWhereUniqueInput | tb_leaveWhereUniqueInput[]
    delete?: tb_leaveWhereUniqueInput | tb_leaveWhereUniqueInput[]
    connect?: tb_leaveWhereUniqueInput | tb_leaveWhereUniqueInput[]
    update?: tb_leaveUpdateWithWhereUniqueWithoutTb_mandatory_leaveInput | tb_leaveUpdateWithWhereUniqueWithoutTb_mandatory_leaveInput[]
    updateMany?: tb_leaveUpdateManyWithWhereWithoutTb_mandatory_leaveInput | tb_leaveUpdateManyWithWhereWithoutTb_mandatory_leaveInput[]
    deleteMany?: tb_leaveScalarWhereInput | tb_leaveScalarWhereInput[]
  }

  export type tb_leaveCreateNestedManyWithoutTb_special_leaveInput = {
    create?: XOR<tb_leaveCreateWithoutTb_special_leaveInput, tb_leaveUncheckedCreateWithoutTb_special_leaveInput> | tb_leaveCreateWithoutTb_special_leaveInput[] | tb_leaveUncheckedCreateWithoutTb_special_leaveInput[]
    connectOrCreate?: tb_leaveCreateOrConnectWithoutTb_special_leaveInput | tb_leaveCreateOrConnectWithoutTb_special_leaveInput[]
    createMany?: tb_leaveCreateManyTb_special_leaveInputEnvelope
    connect?: tb_leaveWhereUniqueInput | tb_leaveWhereUniqueInput[]
  }

  export type tb_leaveUncheckedCreateNestedManyWithoutTb_special_leaveInput = {
    create?: XOR<tb_leaveCreateWithoutTb_special_leaveInput, tb_leaveUncheckedCreateWithoutTb_special_leaveInput> | tb_leaveCreateWithoutTb_special_leaveInput[] | tb_leaveUncheckedCreateWithoutTb_special_leaveInput[]
    connectOrCreate?: tb_leaveCreateOrConnectWithoutTb_special_leaveInput | tb_leaveCreateOrConnectWithoutTb_special_leaveInput[]
    createMany?: tb_leaveCreateManyTb_special_leaveInputEnvelope
    connect?: tb_leaveWhereUniqueInput | tb_leaveWhereUniqueInput[]
  }

  export type Enumapplicable_genderFieldUpdateOperationsInput = {
    set?: $Enums.applicable_gender
  }

  export type tb_leaveUpdateManyWithoutTb_special_leaveNestedInput = {
    create?: XOR<tb_leaveCreateWithoutTb_special_leaveInput, tb_leaveUncheckedCreateWithoutTb_special_leaveInput> | tb_leaveCreateWithoutTb_special_leaveInput[] | tb_leaveUncheckedCreateWithoutTb_special_leaveInput[]
    connectOrCreate?: tb_leaveCreateOrConnectWithoutTb_special_leaveInput | tb_leaveCreateOrConnectWithoutTb_special_leaveInput[]
    upsert?: tb_leaveUpsertWithWhereUniqueWithoutTb_special_leaveInput | tb_leaveUpsertWithWhereUniqueWithoutTb_special_leaveInput[]
    createMany?: tb_leaveCreateManyTb_special_leaveInputEnvelope
    set?: tb_leaveWhereUniqueInput | tb_leaveWhereUniqueInput[]
    disconnect?: tb_leaveWhereUniqueInput | tb_leaveWhereUniqueInput[]
    delete?: tb_leaveWhereUniqueInput | tb_leaveWhereUniqueInput[]
    connect?: tb_leaveWhereUniqueInput | tb_leaveWhereUniqueInput[]
    update?: tb_leaveUpdateWithWhereUniqueWithoutTb_special_leaveInput | tb_leaveUpdateWithWhereUniqueWithoutTb_special_leaveInput[]
    updateMany?: tb_leaveUpdateManyWithWhereWithoutTb_special_leaveInput | tb_leaveUpdateManyWithWhereWithoutTb_special_leaveInput[]
    deleteMany?: tb_leaveScalarWhereInput | tb_leaveScalarWhereInput[]
  }

  export type tb_leaveUncheckedUpdateManyWithoutTb_special_leaveNestedInput = {
    create?: XOR<tb_leaveCreateWithoutTb_special_leaveInput, tb_leaveUncheckedCreateWithoutTb_special_leaveInput> | tb_leaveCreateWithoutTb_special_leaveInput[] | tb_leaveUncheckedCreateWithoutTb_special_leaveInput[]
    connectOrCreate?: tb_leaveCreateOrConnectWithoutTb_special_leaveInput | tb_leaveCreateOrConnectWithoutTb_special_leaveInput[]
    upsert?: tb_leaveUpsertWithWhereUniqueWithoutTb_special_leaveInput | tb_leaveUpsertWithWhereUniqueWithoutTb_special_leaveInput[]
    createMany?: tb_leaveCreateManyTb_special_leaveInputEnvelope
    set?: tb_leaveWhereUniqueInput | tb_leaveWhereUniqueInput[]
    disconnect?: tb_leaveWhereUniqueInput | tb_leaveWhereUniqueInput[]
    delete?: tb_leaveWhereUniqueInput | tb_leaveWhereUniqueInput[]
    connect?: tb_leaveWhereUniqueInput | tb_leaveWhereUniqueInput[]
    update?: tb_leaveUpdateWithWhereUniqueWithoutTb_special_leaveInput | tb_leaveUpdateWithWhereUniqueWithoutTb_special_leaveInput[]
    updateMany?: tb_leaveUpdateManyWithWhereWithoutTb_special_leaveInput | tb_leaveUpdateManyWithWhereWithoutTb_special_leaveInput[]
    deleteMany?: tb_leaveScalarWhereInput | tb_leaveScalarWhereInput[]
  }

  export type tb_balanceCreateNestedManyWithoutTb_usersInput = {
    create?: XOR<tb_balanceCreateWithoutTb_usersInput, tb_balanceUncheckedCreateWithoutTb_usersInput> | tb_balanceCreateWithoutTb_usersInput[] | tb_balanceUncheckedCreateWithoutTb_usersInput[]
    connectOrCreate?: tb_balanceCreateOrConnectWithoutTb_usersInput | tb_balanceCreateOrConnectWithoutTb_usersInput[]
    createMany?: tb_balanceCreateManyTb_usersInputEnvelope
    connect?: tb_balanceWhereUniqueInput | tb_balanceWhereUniqueInput[]
  }

  export type tb_balance_adjustmentCreateNestedManyWithoutTb_usersInput = {
    create?: XOR<tb_balance_adjustmentCreateWithoutTb_usersInput, tb_balance_adjustmentUncheckedCreateWithoutTb_usersInput> | tb_balance_adjustmentCreateWithoutTb_usersInput[] | tb_balance_adjustmentUncheckedCreateWithoutTb_usersInput[]
    connectOrCreate?: tb_balance_adjustmentCreateOrConnectWithoutTb_usersInput | tb_balance_adjustmentCreateOrConnectWithoutTb_usersInput[]
    createMany?: tb_balance_adjustmentCreateManyTb_usersInputEnvelope
    connect?: tb_balance_adjustmentWhereUniqueInput | tb_balance_adjustmentWhereUniqueInput[]
  }

  export type tb_leaveCreateNestedManyWithoutTb_usersInput = {
    create?: XOR<tb_leaveCreateWithoutTb_usersInput, tb_leaveUncheckedCreateWithoutTb_usersInput> | tb_leaveCreateWithoutTb_usersInput[] | tb_leaveUncheckedCreateWithoutTb_usersInput[]
    connectOrCreate?: tb_leaveCreateOrConnectWithoutTb_usersInput | tb_leaveCreateOrConnectWithoutTb_usersInput[]
    createMany?: tb_leaveCreateManyTb_usersInputEnvelope
    connect?: tb_leaveWhereUniqueInput | tb_leaveWhereUniqueInput[]
  }

  export type tb_balanceUncheckedCreateNestedManyWithoutTb_usersInput = {
    create?: XOR<tb_balanceCreateWithoutTb_usersInput, tb_balanceUncheckedCreateWithoutTb_usersInput> | tb_balanceCreateWithoutTb_usersInput[] | tb_balanceUncheckedCreateWithoutTb_usersInput[]
    connectOrCreate?: tb_balanceCreateOrConnectWithoutTb_usersInput | tb_balanceCreateOrConnectWithoutTb_usersInput[]
    createMany?: tb_balanceCreateManyTb_usersInputEnvelope
    connect?: tb_balanceWhereUniqueInput | tb_balanceWhereUniqueInput[]
  }

  export type tb_balance_adjustmentUncheckedCreateNestedManyWithoutTb_usersInput = {
    create?: XOR<tb_balance_adjustmentCreateWithoutTb_usersInput, tb_balance_adjustmentUncheckedCreateWithoutTb_usersInput> | tb_balance_adjustmentCreateWithoutTb_usersInput[] | tb_balance_adjustmentUncheckedCreateWithoutTb_usersInput[]
    connectOrCreate?: tb_balance_adjustmentCreateOrConnectWithoutTb_usersInput | tb_balance_adjustmentCreateOrConnectWithoutTb_usersInput[]
    createMany?: tb_balance_adjustmentCreateManyTb_usersInputEnvelope
    connect?: tb_balance_adjustmentWhereUniqueInput | tb_balance_adjustmentWhereUniqueInput[]
  }

  export type tb_leaveUncheckedCreateNestedManyWithoutTb_usersInput = {
    create?: XOR<tb_leaveCreateWithoutTb_usersInput, tb_leaveUncheckedCreateWithoutTb_usersInput> | tb_leaveCreateWithoutTb_usersInput[] | tb_leaveUncheckedCreateWithoutTb_usersInput[]
    connectOrCreate?: tb_leaveCreateOrConnectWithoutTb_usersInput | tb_leaveCreateOrConnectWithoutTb_usersInput[]
    createMany?: tb_leaveCreateManyTb_usersInputEnvelope
    connect?: tb_leaveWhereUniqueInput | tb_leaveWhereUniqueInput[]
  }

  export type EnumgenderFieldUpdateOperationsInput = {
    set?: $Enums.gender
  }

  export type EnumroleFieldUpdateOperationsInput = {
    set?: $Enums.role
  }

  export type Enumstatus_activeFieldUpdateOperationsInput = {
    set?: $Enums.status_active
  }

  export type tb_balanceUpdateManyWithoutTb_usersNestedInput = {
    create?: XOR<tb_balanceCreateWithoutTb_usersInput, tb_balanceUncheckedCreateWithoutTb_usersInput> | tb_balanceCreateWithoutTb_usersInput[] | tb_balanceUncheckedCreateWithoutTb_usersInput[]
    connectOrCreate?: tb_balanceCreateOrConnectWithoutTb_usersInput | tb_balanceCreateOrConnectWithoutTb_usersInput[]
    upsert?: tb_balanceUpsertWithWhereUniqueWithoutTb_usersInput | tb_balanceUpsertWithWhereUniqueWithoutTb_usersInput[]
    createMany?: tb_balanceCreateManyTb_usersInputEnvelope
    set?: tb_balanceWhereUniqueInput | tb_balanceWhereUniqueInput[]
    disconnect?: tb_balanceWhereUniqueInput | tb_balanceWhereUniqueInput[]
    delete?: tb_balanceWhereUniqueInput | tb_balanceWhereUniqueInput[]
    connect?: tb_balanceWhereUniqueInput | tb_balanceWhereUniqueInput[]
    update?: tb_balanceUpdateWithWhereUniqueWithoutTb_usersInput | tb_balanceUpdateWithWhereUniqueWithoutTb_usersInput[]
    updateMany?: tb_balanceUpdateManyWithWhereWithoutTb_usersInput | tb_balanceUpdateManyWithWhereWithoutTb_usersInput[]
    deleteMany?: tb_balanceScalarWhereInput | tb_balanceScalarWhereInput[]
  }

  export type tb_balance_adjustmentUpdateManyWithoutTb_usersNestedInput = {
    create?: XOR<tb_balance_adjustmentCreateWithoutTb_usersInput, tb_balance_adjustmentUncheckedCreateWithoutTb_usersInput> | tb_balance_adjustmentCreateWithoutTb_usersInput[] | tb_balance_adjustmentUncheckedCreateWithoutTb_usersInput[]
    connectOrCreate?: tb_balance_adjustmentCreateOrConnectWithoutTb_usersInput | tb_balance_adjustmentCreateOrConnectWithoutTb_usersInput[]
    upsert?: tb_balance_adjustmentUpsertWithWhereUniqueWithoutTb_usersInput | tb_balance_adjustmentUpsertWithWhereUniqueWithoutTb_usersInput[]
    createMany?: tb_balance_adjustmentCreateManyTb_usersInputEnvelope
    set?: tb_balance_adjustmentWhereUniqueInput | tb_balance_adjustmentWhereUniqueInput[]
    disconnect?: tb_balance_adjustmentWhereUniqueInput | tb_balance_adjustmentWhereUniqueInput[]
    delete?: tb_balance_adjustmentWhereUniqueInput | tb_balance_adjustmentWhereUniqueInput[]
    connect?: tb_balance_adjustmentWhereUniqueInput | tb_balance_adjustmentWhereUniqueInput[]
    update?: tb_balance_adjustmentUpdateWithWhereUniqueWithoutTb_usersInput | tb_balance_adjustmentUpdateWithWhereUniqueWithoutTb_usersInput[]
    updateMany?: tb_balance_adjustmentUpdateManyWithWhereWithoutTb_usersInput | tb_balance_adjustmentUpdateManyWithWhereWithoutTb_usersInput[]
    deleteMany?: tb_balance_adjustmentScalarWhereInput | tb_balance_adjustmentScalarWhereInput[]
  }

  export type tb_leaveUpdateManyWithoutTb_usersNestedInput = {
    create?: XOR<tb_leaveCreateWithoutTb_usersInput, tb_leaveUncheckedCreateWithoutTb_usersInput> | tb_leaveCreateWithoutTb_usersInput[] | tb_leaveUncheckedCreateWithoutTb_usersInput[]
    connectOrCreate?: tb_leaveCreateOrConnectWithoutTb_usersInput | tb_leaveCreateOrConnectWithoutTb_usersInput[]
    upsert?: tb_leaveUpsertWithWhereUniqueWithoutTb_usersInput | tb_leaveUpsertWithWhereUniqueWithoutTb_usersInput[]
    createMany?: tb_leaveCreateManyTb_usersInputEnvelope
    set?: tb_leaveWhereUniqueInput | tb_leaveWhereUniqueInput[]
    disconnect?: tb_leaveWhereUniqueInput | tb_leaveWhereUniqueInput[]
    delete?: tb_leaveWhereUniqueInput | tb_leaveWhereUniqueInput[]
    connect?: tb_leaveWhereUniqueInput | tb_leaveWhereUniqueInput[]
    update?: tb_leaveUpdateWithWhereUniqueWithoutTb_usersInput | tb_leaveUpdateWithWhereUniqueWithoutTb_usersInput[]
    updateMany?: tb_leaveUpdateManyWithWhereWithoutTb_usersInput | tb_leaveUpdateManyWithWhereWithoutTb_usersInput[]
    deleteMany?: tb_leaveScalarWhereInput | tb_leaveScalarWhereInput[]
  }

  export type tb_balanceUncheckedUpdateManyWithoutTb_usersNestedInput = {
    create?: XOR<tb_balanceCreateWithoutTb_usersInput, tb_balanceUncheckedCreateWithoutTb_usersInput> | tb_balanceCreateWithoutTb_usersInput[] | tb_balanceUncheckedCreateWithoutTb_usersInput[]
    connectOrCreate?: tb_balanceCreateOrConnectWithoutTb_usersInput | tb_balanceCreateOrConnectWithoutTb_usersInput[]
    upsert?: tb_balanceUpsertWithWhereUniqueWithoutTb_usersInput | tb_balanceUpsertWithWhereUniqueWithoutTb_usersInput[]
    createMany?: tb_balanceCreateManyTb_usersInputEnvelope
    set?: tb_balanceWhereUniqueInput | tb_balanceWhereUniqueInput[]
    disconnect?: tb_balanceWhereUniqueInput | tb_balanceWhereUniqueInput[]
    delete?: tb_balanceWhereUniqueInput | tb_balanceWhereUniqueInput[]
    connect?: tb_balanceWhereUniqueInput | tb_balanceWhereUniqueInput[]
    update?: tb_balanceUpdateWithWhereUniqueWithoutTb_usersInput | tb_balanceUpdateWithWhereUniqueWithoutTb_usersInput[]
    updateMany?: tb_balanceUpdateManyWithWhereWithoutTb_usersInput | tb_balanceUpdateManyWithWhereWithoutTb_usersInput[]
    deleteMany?: tb_balanceScalarWhereInput | tb_balanceScalarWhereInput[]
  }

  export type tb_balance_adjustmentUncheckedUpdateManyWithoutTb_usersNestedInput = {
    create?: XOR<tb_balance_adjustmentCreateWithoutTb_usersInput, tb_balance_adjustmentUncheckedCreateWithoutTb_usersInput> | tb_balance_adjustmentCreateWithoutTb_usersInput[] | tb_balance_adjustmentUncheckedCreateWithoutTb_usersInput[]
    connectOrCreate?: tb_balance_adjustmentCreateOrConnectWithoutTb_usersInput | tb_balance_adjustmentCreateOrConnectWithoutTb_usersInput[]
    upsert?: tb_balance_adjustmentUpsertWithWhereUniqueWithoutTb_usersInput | tb_balance_adjustmentUpsertWithWhereUniqueWithoutTb_usersInput[]
    createMany?: tb_balance_adjustmentCreateManyTb_usersInputEnvelope
    set?: tb_balance_adjustmentWhereUniqueInput | tb_balance_adjustmentWhereUniqueInput[]
    disconnect?: tb_balance_adjustmentWhereUniqueInput | tb_balance_adjustmentWhereUniqueInput[]
    delete?: tb_balance_adjustmentWhereUniqueInput | tb_balance_adjustmentWhereUniqueInput[]
    connect?: tb_balance_adjustmentWhereUniqueInput | tb_balance_adjustmentWhereUniqueInput[]
    update?: tb_balance_adjustmentUpdateWithWhereUniqueWithoutTb_usersInput | tb_balance_adjustmentUpdateWithWhereUniqueWithoutTb_usersInput[]
    updateMany?: tb_balance_adjustmentUpdateManyWithWhereWithoutTb_usersInput | tb_balance_adjustmentUpdateManyWithWhereWithoutTb_usersInput[]
    deleteMany?: tb_balance_adjustmentScalarWhereInput | tb_balance_adjustmentScalarWhereInput[]
  }

  export type tb_leaveUncheckedUpdateManyWithoutTb_usersNestedInput = {
    create?: XOR<tb_leaveCreateWithoutTb_usersInput, tb_leaveUncheckedCreateWithoutTb_usersInput> | tb_leaveCreateWithoutTb_usersInput[] | tb_leaveUncheckedCreateWithoutTb_usersInput[]
    connectOrCreate?: tb_leaveCreateOrConnectWithoutTb_usersInput | tb_leaveCreateOrConnectWithoutTb_usersInput[]
    upsert?: tb_leaveUpsertWithWhereUniqueWithoutTb_usersInput | tb_leaveUpsertWithWhereUniqueWithoutTb_usersInput[]
    createMany?: tb_leaveCreateManyTb_usersInputEnvelope
    set?: tb_leaveWhereUniqueInput | tb_leaveWhereUniqueInput[]
    disconnect?: tb_leaveWhereUniqueInput | tb_leaveWhereUniqueInput[]
    delete?: tb_leaveWhereUniqueInput | tb_leaveWhereUniqueInput[]
    connect?: tb_leaveWhereUniqueInput | tb_leaveWhereUniqueInput[]
    update?: tb_leaveUpdateWithWhereUniqueWithoutTb_usersInput | tb_leaveUpdateWithWhereUniqueWithoutTb_usersInput[]
    updateMany?: tb_leaveUpdateManyWithWhereWithoutTb_usersInput | tb_leaveUpdateManyWithWhereWithoutTb_usersInput[]
    deleteMany?: tb_leaveScalarWhereInput | tb_leaveScalarWhereInput[]
  }

  export type tb_usersCreateNestedOneWithoutTb_balance_adjustmentInput = {
    create?: XOR<tb_usersCreateWithoutTb_balance_adjustmentInput, tb_usersUncheckedCreateWithoutTb_balance_adjustmentInput>
    connectOrCreate?: tb_usersCreateOrConnectWithoutTb_balance_adjustmentInput
    connect?: tb_usersWhereUniqueInput
  }

  export type tb_usersUpdateOneRequiredWithoutTb_balance_adjustmentNestedInput = {
    create?: XOR<tb_usersCreateWithoutTb_balance_adjustmentInput, tb_usersUncheckedCreateWithoutTb_balance_adjustmentInput>
    connectOrCreate?: tb_usersCreateOrConnectWithoutTb_balance_adjustmentInput
    upsert?: tb_usersUpsertWithoutTb_balance_adjustmentInput
    connect?: tb_usersWhereUniqueInput
    update?: XOR<XOR<tb_usersUpdateToOneWithWhereWithoutTb_balance_adjustmentInput, tb_usersUpdateWithoutTb_balance_adjustmentInput>, tb_usersUncheckedUpdateWithoutTb_balance_adjustmentInput>
  }

  export type tb_leaveCreateNestedOneWithoutTb_leave_logInput = {
    create?: XOR<tb_leaveCreateWithoutTb_leave_logInput, tb_leaveUncheckedCreateWithoutTb_leave_logInput>
    connectOrCreate?: tb_leaveCreateOrConnectWithoutTb_leave_logInput
    connect?: tb_leaveWhereUniqueInput
  }

  export type tb_leaveUpdateOneRequiredWithoutTb_leave_logNestedInput = {
    create?: XOR<tb_leaveCreateWithoutTb_leave_logInput, tb_leaveUncheckedCreateWithoutTb_leave_logInput>
    connectOrCreate?: tb_leaveCreateOrConnectWithoutTb_leave_logInput
    upsert?: tb_leaveUpsertWithoutTb_leave_logInput
    connect?: tb_leaveWhereUniqueInput
    update?: XOR<XOR<tb_leaveUpdateToOneWithWhereWithoutTb_leave_logInput, tb_leaveUpdateWithoutTb_leave_logInput>, tb_leaveUncheckedUpdateWithoutTb_leave_logInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumleave_typeFilter<$PrismaModel = never> = {
    equals?: $Enums.leave_type | Enumleave_typeFieldRefInput<$PrismaModel>
    in?: $Enums.leave_type[] | ListEnumleave_typeFieldRefInput<$PrismaModel>
    notIn?: $Enums.leave_type[] | ListEnumleave_typeFieldRefInput<$PrismaModel>
    not?: NestedEnumleave_typeFilter<$PrismaModel> | $Enums.leave_type
  }

  export type NestedEnumstatusFilter<$PrismaModel = never> = {
    equals?: $Enums.status | EnumstatusFieldRefInput<$PrismaModel>
    in?: $Enums.status[] | ListEnumstatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.status[] | ListEnumstatusFieldRefInput<$PrismaModel>
    not?: NestedEnumstatusFilter<$PrismaModel> | $Enums.status
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumleave_typeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.leave_type | Enumleave_typeFieldRefInput<$PrismaModel>
    in?: $Enums.leave_type[] | ListEnumleave_typeFieldRefInput<$PrismaModel>
    notIn?: $Enums.leave_type[] | ListEnumleave_typeFieldRefInput<$PrismaModel>
    not?: NestedEnumleave_typeWithAggregatesFilter<$PrismaModel> | $Enums.leave_type
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumleave_typeFilter<$PrismaModel>
    _max?: NestedEnumleave_typeFilter<$PrismaModel>
  }

  export type NestedEnumstatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.status | EnumstatusFieldRefInput<$PrismaModel>
    in?: $Enums.status[] | ListEnumstatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.status[] | ListEnumstatusFieldRefInput<$PrismaModel>
    not?: NestedEnumstatusWithAggregatesFilter<$PrismaModel> | $Enums.status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumstatusFilter<$PrismaModel>
    _max?: NestedEnumstatusFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumapplicable_genderFilter<$PrismaModel = never> = {
    equals?: $Enums.applicable_gender | Enumapplicable_genderFieldRefInput<$PrismaModel>
    in?: $Enums.applicable_gender[] | ListEnumapplicable_genderFieldRefInput<$PrismaModel>
    notIn?: $Enums.applicable_gender[] | ListEnumapplicable_genderFieldRefInput<$PrismaModel>
    not?: NestedEnumapplicable_genderFilter<$PrismaModel> | $Enums.applicable_gender
  }

  export type NestedEnumapplicable_genderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.applicable_gender | Enumapplicable_genderFieldRefInput<$PrismaModel>
    in?: $Enums.applicable_gender[] | ListEnumapplicable_genderFieldRefInput<$PrismaModel>
    notIn?: $Enums.applicable_gender[] | ListEnumapplicable_genderFieldRefInput<$PrismaModel>
    not?: NestedEnumapplicable_genderWithAggregatesFilter<$PrismaModel> | $Enums.applicable_gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumapplicable_genderFilter<$PrismaModel>
    _max?: NestedEnumapplicable_genderFilter<$PrismaModel>
  }

  export type NestedEnumgenderFilter<$PrismaModel = never> = {
    equals?: $Enums.gender | EnumgenderFieldRefInput<$PrismaModel>
    in?: $Enums.gender[] | ListEnumgenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.gender[] | ListEnumgenderFieldRefInput<$PrismaModel>
    not?: NestedEnumgenderFilter<$PrismaModel> | $Enums.gender
  }

  export type NestedEnumroleFilter<$PrismaModel = never> = {
    equals?: $Enums.role | EnumroleFieldRefInput<$PrismaModel>
    in?: $Enums.role[] | ListEnumroleFieldRefInput<$PrismaModel>
    notIn?: $Enums.role[] | ListEnumroleFieldRefInput<$PrismaModel>
    not?: NestedEnumroleFilter<$PrismaModel> | $Enums.role
  }

  export type NestedEnumstatus_activeFilter<$PrismaModel = never> = {
    equals?: $Enums.status_active | Enumstatus_activeFieldRefInput<$PrismaModel>
    in?: $Enums.status_active[] | ListEnumstatus_activeFieldRefInput<$PrismaModel>
    notIn?: $Enums.status_active[] | ListEnumstatus_activeFieldRefInput<$PrismaModel>
    not?: NestedEnumstatus_activeFilter<$PrismaModel> | $Enums.status_active
  }

  export type NestedEnumgenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.gender | EnumgenderFieldRefInput<$PrismaModel>
    in?: $Enums.gender[] | ListEnumgenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.gender[] | ListEnumgenderFieldRefInput<$PrismaModel>
    not?: NestedEnumgenderWithAggregatesFilter<$PrismaModel> | $Enums.gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumgenderFilter<$PrismaModel>
    _max?: NestedEnumgenderFilter<$PrismaModel>
  }

  export type NestedEnumroleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.role | EnumroleFieldRefInput<$PrismaModel>
    in?: $Enums.role[] | ListEnumroleFieldRefInput<$PrismaModel>
    notIn?: $Enums.role[] | ListEnumroleFieldRefInput<$PrismaModel>
    not?: NestedEnumroleWithAggregatesFilter<$PrismaModel> | $Enums.role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumroleFilter<$PrismaModel>
    _max?: NestedEnumroleFilter<$PrismaModel>
  }

  export type NestedEnumstatus_activeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.status_active | Enumstatus_activeFieldRefInput<$PrismaModel>
    in?: $Enums.status_active[] | ListEnumstatus_activeFieldRefInput<$PrismaModel>
    notIn?: $Enums.status_active[] | ListEnumstatus_activeFieldRefInput<$PrismaModel>
    not?: NestedEnumstatus_activeWithAggregatesFilter<$PrismaModel> | $Enums.status_active
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumstatus_activeFilter<$PrismaModel>
    _max?: NestedEnumstatus_activeFilter<$PrismaModel>
  }

  export type tb_usersCreateWithoutTb_balanceInput = {
    NIK: string
    fullname: string
    email: string
    password: string
    gender: $Enums.gender
    role: $Enums.role
    status_active?: $Enums.status_active
    join_date: Date | string
    tb_balance_adjustment?: tb_balance_adjustmentCreateNestedManyWithoutTb_usersInput
    tb_leave?: tb_leaveCreateNestedManyWithoutTb_usersInput
  }

  export type tb_usersUncheckedCreateWithoutTb_balanceInput = {
    NIK: string
    fullname: string
    email: string
    password: string
    gender: $Enums.gender
    role: $Enums.role
    status_active?: $Enums.status_active
    join_date: Date | string
    tb_balance_adjustment?: tb_balance_adjustmentUncheckedCreateNestedManyWithoutTb_usersInput
    tb_leave?: tb_leaveUncheckedCreateNestedManyWithoutTb_usersInput
  }

  export type tb_usersCreateOrConnectWithoutTb_balanceInput = {
    where: tb_usersWhereUniqueInput
    create: XOR<tb_usersCreateWithoutTb_balanceInput, tb_usersUncheckedCreateWithoutTb_balanceInput>
  }

  export type tb_usersUpsertWithoutTb_balanceInput = {
    update: XOR<tb_usersUpdateWithoutTb_balanceInput, tb_usersUncheckedUpdateWithoutTb_balanceInput>
    create: XOR<tb_usersCreateWithoutTb_balanceInput, tb_usersUncheckedCreateWithoutTb_balanceInput>
    where?: tb_usersWhereInput
  }

  export type tb_usersUpdateToOneWithWhereWithoutTb_balanceInput = {
    where?: tb_usersWhereInput
    data: XOR<tb_usersUpdateWithoutTb_balanceInput, tb_usersUncheckedUpdateWithoutTb_balanceInput>
  }

  export type tb_usersUpdateWithoutTb_balanceInput = {
    NIK?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    gender?: EnumgenderFieldUpdateOperationsInput | $Enums.gender
    role?: EnumroleFieldUpdateOperationsInput | $Enums.role
    status_active?: Enumstatus_activeFieldUpdateOperationsInput | $Enums.status_active
    join_date?: DateTimeFieldUpdateOperationsInput | Date | string
    tb_balance_adjustment?: tb_balance_adjustmentUpdateManyWithoutTb_usersNestedInput
    tb_leave?: tb_leaveUpdateManyWithoutTb_usersNestedInput
  }

  export type tb_usersUncheckedUpdateWithoutTb_balanceInput = {
    NIK?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    gender?: EnumgenderFieldUpdateOperationsInput | $Enums.gender
    role?: EnumroleFieldUpdateOperationsInput | $Enums.role
    status_active?: Enumstatus_activeFieldUpdateOperationsInput | $Enums.status_active
    join_date?: DateTimeFieldUpdateOperationsInput | Date | string
    tb_balance_adjustment?: tb_balance_adjustmentUncheckedUpdateManyWithoutTb_usersNestedInput
    tb_leave?: tb_leaveUncheckedUpdateManyWithoutTb_usersNestedInput
  }

  export type tb_usersCreateWithoutTb_leaveInput = {
    NIK: string
    fullname: string
    email: string
    password: string
    gender: $Enums.gender
    role: $Enums.role
    status_active?: $Enums.status_active
    join_date: Date | string
    tb_balance?: tb_balanceCreateNestedManyWithoutTb_usersInput
    tb_balance_adjustment?: tb_balance_adjustmentCreateNestedManyWithoutTb_usersInput
  }

  export type tb_usersUncheckedCreateWithoutTb_leaveInput = {
    NIK: string
    fullname: string
    email: string
    password: string
    gender: $Enums.gender
    role: $Enums.role
    status_active?: $Enums.status_active
    join_date: Date | string
    tb_balance?: tb_balanceUncheckedCreateNestedManyWithoutTb_usersInput
    tb_balance_adjustment?: tb_balance_adjustmentUncheckedCreateNestedManyWithoutTb_usersInput
  }

  export type tb_usersCreateOrConnectWithoutTb_leaveInput = {
    where: tb_usersWhereUniqueInput
    create: XOR<tb_usersCreateWithoutTb_leaveInput, tb_usersUncheckedCreateWithoutTb_leaveInput>
  }

  export type tb_mandatory_leaveCreateWithoutTb_leaveInput = {
    id_mandatory?: string
    title: string
    duration: number
    is_active?: boolean
    description: string
  }

  export type tb_mandatory_leaveUncheckedCreateWithoutTb_leaveInput = {
    id_mandatory?: string
    title: string
    duration: number
    is_active?: boolean
    description: string
  }

  export type tb_mandatory_leaveCreateOrConnectWithoutTb_leaveInput = {
    where: tb_mandatory_leaveWhereUniqueInput
    create: XOR<tb_mandatory_leaveCreateWithoutTb_leaveInput, tb_mandatory_leaveUncheckedCreateWithoutTb_leaveInput>
  }

  export type tb_special_leaveCreateWithoutTb_leaveInput = {
    id_special?: string
    title: string
    applicable_gender: $Enums.applicable_gender
    duration: number
    is_active?: boolean
    description: string
  }

  export type tb_special_leaveUncheckedCreateWithoutTb_leaveInput = {
    id_special?: string
    title: string
    applicable_gender: $Enums.applicable_gender
    duration: number
    is_active?: boolean
    description: string
  }

  export type tb_special_leaveCreateOrConnectWithoutTb_leaveInput = {
    where: tb_special_leaveWhereUniqueInput
    create: XOR<tb_special_leaveCreateWithoutTb_leaveInput, tb_special_leaveUncheckedCreateWithoutTb_leaveInput>
  }

  export type tb_leave_logCreateWithoutTb_leaveInput = {
    id_log?: string
    old_status: $Enums.status
    new_status: $Enums.status
    reason: string
    changed_at: Date | string
    changed_by_nik: string
  }

  export type tb_leave_logUncheckedCreateWithoutTb_leaveInput = {
    id_log?: string
    old_status: $Enums.status
    new_status: $Enums.status
    reason: string
    changed_at: Date | string
    changed_by_nik: string
  }

  export type tb_leave_logCreateOrConnectWithoutTb_leaveInput = {
    where: tb_leave_logWhereUniqueInput
    create: XOR<tb_leave_logCreateWithoutTb_leaveInput, tb_leave_logUncheckedCreateWithoutTb_leaveInput>
  }

  export type tb_leave_logCreateManyTb_leaveInputEnvelope = {
    data: tb_leave_logCreateManyTb_leaveInput | tb_leave_logCreateManyTb_leaveInput[]
    skipDuplicates?: boolean
  }

  export type tb_usersUpsertWithoutTb_leaveInput = {
    update: XOR<tb_usersUpdateWithoutTb_leaveInput, tb_usersUncheckedUpdateWithoutTb_leaveInput>
    create: XOR<tb_usersCreateWithoutTb_leaveInput, tb_usersUncheckedCreateWithoutTb_leaveInput>
    where?: tb_usersWhereInput
  }

  export type tb_usersUpdateToOneWithWhereWithoutTb_leaveInput = {
    where?: tb_usersWhereInput
    data: XOR<tb_usersUpdateWithoutTb_leaveInput, tb_usersUncheckedUpdateWithoutTb_leaveInput>
  }

  export type tb_usersUpdateWithoutTb_leaveInput = {
    NIK?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    gender?: EnumgenderFieldUpdateOperationsInput | $Enums.gender
    role?: EnumroleFieldUpdateOperationsInput | $Enums.role
    status_active?: Enumstatus_activeFieldUpdateOperationsInput | $Enums.status_active
    join_date?: DateTimeFieldUpdateOperationsInput | Date | string
    tb_balance?: tb_balanceUpdateManyWithoutTb_usersNestedInput
    tb_balance_adjustment?: tb_balance_adjustmentUpdateManyWithoutTb_usersNestedInput
  }

  export type tb_usersUncheckedUpdateWithoutTb_leaveInput = {
    NIK?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    gender?: EnumgenderFieldUpdateOperationsInput | $Enums.gender
    role?: EnumroleFieldUpdateOperationsInput | $Enums.role
    status_active?: Enumstatus_activeFieldUpdateOperationsInput | $Enums.status_active
    join_date?: DateTimeFieldUpdateOperationsInput | Date | string
    tb_balance?: tb_balanceUncheckedUpdateManyWithoutTb_usersNestedInput
    tb_balance_adjustment?: tb_balance_adjustmentUncheckedUpdateManyWithoutTb_usersNestedInput
  }

  export type tb_mandatory_leaveUpsertWithoutTb_leaveInput = {
    update: XOR<tb_mandatory_leaveUpdateWithoutTb_leaveInput, tb_mandatory_leaveUncheckedUpdateWithoutTb_leaveInput>
    create: XOR<tb_mandatory_leaveCreateWithoutTb_leaveInput, tb_mandatory_leaveUncheckedCreateWithoutTb_leaveInput>
    where?: tb_mandatory_leaveWhereInput
  }

  export type tb_mandatory_leaveUpdateToOneWithWhereWithoutTb_leaveInput = {
    where?: tb_mandatory_leaveWhereInput
    data: XOR<tb_mandatory_leaveUpdateWithoutTb_leaveInput, tb_mandatory_leaveUncheckedUpdateWithoutTb_leaveInput>
  }

  export type tb_mandatory_leaveUpdateWithoutTb_leaveInput = {
    id_mandatory?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
  }

  export type tb_mandatory_leaveUncheckedUpdateWithoutTb_leaveInput = {
    id_mandatory?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
  }

  export type tb_special_leaveUpsertWithoutTb_leaveInput = {
    update: XOR<tb_special_leaveUpdateWithoutTb_leaveInput, tb_special_leaveUncheckedUpdateWithoutTb_leaveInput>
    create: XOR<tb_special_leaveCreateWithoutTb_leaveInput, tb_special_leaveUncheckedCreateWithoutTb_leaveInput>
    where?: tb_special_leaveWhereInput
  }

  export type tb_special_leaveUpdateToOneWithWhereWithoutTb_leaveInput = {
    where?: tb_special_leaveWhereInput
    data: XOR<tb_special_leaveUpdateWithoutTb_leaveInput, tb_special_leaveUncheckedUpdateWithoutTb_leaveInput>
  }

  export type tb_special_leaveUpdateWithoutTb_leaveInput = {
    id_special?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    applicable_gender?: Enumapplicable_genderFieldUpdateOperationsInput | $Enums.applicable_gender
    duration?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
  }

  export type tb_special_leaveUncheckedUpdateWithoutTb_leaveInput = {
    id_special?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    applicable_gender?: Enumapplicable_genderFieldUpdateOperationsInput | $Enums.applicable_gender
    duration?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
  }

  export type tb_leave_logUpsertWithWhereUniqueWithoutTb_leaveInput = {
    where: tb_leave_logWhereUniqueInput
    update: XOR<tb_leave_logUpdateWithoutTb_leaveInput, tb_leave_logUncheckedUpdateWithoutTb_leaveInput>
    create: XOR<tb_leave_logCreateWithoutTb_leaveInput, tb_leave_logUncheckedCreateWithoutTb_leaveInput>
  }

  export type tb_leave_logUpdateWithWhereUniqueWithoutTb_leaveInput = {
    where: tb_leave_logWhereUniqueInput
    data: XOR<tb_leave_logUpdateWithoutTb_leaveInput, tb_leave_logUncheckedUpdateWithoutTb_leaveInput>
  }

  export type tb_leave_logUpdateManyWithWhereWithoutTb_leaveInput = {
    where: tb_leave_logScalarWhereInput
    data: XOR<tb_leave_logUpdateManyMutationInput, tb_leave_logUncheckedUpdateManyWithoutTb_leaveInput>
  }

  export type tb_leave_logScalarWhereInput = {
    AND?: tb_leave_logScalarWhereInput | tb_leave_logScalarWhereInput[]
    OR?: tb_leave_logScalarWhereInput[]
    NOT?: tb_leave_logScalarWhereInput | tb_leave_logScalarWhereInput[]
    id_log?: StringFilter<"tb_leave_log"> | string
    old_status?: EnumstatusFilter<"tb_leave_log"> | $Enums.status
    new_status?: EnumstatusFilter<"tb_leave_log"> | $Enums.status
    reason?: StringFilter<"tb_leave_log"> | string
    changed_at?: DateTimeFilter<"tb_leave_log"> | Date | string
    changed_by_nik?: StringFilter<"tb_leave_log"> | string
    id_leave?: StringFilter<"tb_leave_log"> | string
  }

  export type tb_leaveCreateWithoutTb_mandatory_leaveInput = {
    id_leave?: string
    title: string
    leave_type: $Enums.leave_type
    start_date: Date | string
    end_date: Date | string
    total_days: number
    reason: string
    status?: $Enums.status
    created_at?: Date | string
    tb_users: tb_usersCreateNestedOneWithoutTb_leaveInput
    tb_special_leave?: tb_special_leaveCreateNestedOneWithoutTb_leaveInput
    tb_leave_log?: tb_leave_logCreateNestedManyWithoutTb_leaveInput
  }

  export type tb_leaveUncheckedCreateWithoutTb_mandatory_leaveInput = {
    id_leave?: string
    title: string
    leave_type: $Enums.leave_type
    start_date: Date | string
    end_date: Date | string
    total_days: number
    reason: string
    status?: $Enums.status
    created_at?: Date | string
    NIK: string
    id_special?: string | null
    tb_leave_log?: tb_leave_logUncheckedCreateNestedManyWithoutTb_leaveInput
  }

  export type tb_leaveCreateOrConnectWithoutTb_mandatory_leaveInput = {
    where: tb_leaveWhereUniqueInput
    create: XOR<tb_leaveCreateWithoutTb_mandatory_leaveInput, tb_leaveUncheckedCreateWithoutTb_mandatory_leaveInput>
  }

  export type tb_leaveCreateManyTb_mandatory_leaveInputEnvelope = {
    data: tb_leaveCreateManyTb_mandatory_leaveInput | tb_leaveCreateManyTb_mandatory_leaveInput[]
    skipDuplicates?: boolean
  }

  export type tb_leaveUpsertWithWhereUniqueWithoutTb_mandatory_leaveInput = {
    where: tb_leaveWhereUniqueInput
    update: XOR<tb_leaveUpdateWithoutTb_mandatory_leaveInput, tb_leaveUncheckedUpdateWithoutTb_mandatory_leaveInput>
    create: XOR<tb_leaveCreateWithoutTb_mandatory_leaveInput, tb_leaveUncheckedCreateWithoutTb_mandatory_leaveInput>
  }

  export type tb_leaveUpdateWithWhereUniqueWithoutTb_mandatory_leaveInput = {
    where: tb_leaveWhereUniqueInput
    data: XOR<tb_leaveUpdateWithoutTb_mandatory_leaveInput, tb_leaveUncheckedUpdateWithoutTb_mandatory_leaveInput>
  }

  export type tb_leaveUpdateManyWithWhereWithoutTb_mandatory_leaveInput = {
    where: tb_leaveScalarWhereInput
    data: XOR<tb_leaveUpdateManyMutationInput, tb_leaveUncheckedUpdateManyWithoutTb_mandatory_leaveInput>
  }

  export type tb_leaveScalarWhereInput = {
    AND?: tb_leaveScalarWhereInput | tb_leaveScalarWhereInput[]
    OR?: tb_leaveScalarWhereInput[]
    NOT?: tb_leaveScalarWhereInput | tb_leaveScalarWhereInput[]
    id_leave?: StringFilter<"tb_leave"> | string
    title?: StringFilter<"tb_leave"> | string
    leave_type?: Enumleave_typeFilter<"tb_leave"> | $Enums.leave_type
    start_date?: DateTimeFilter<"tb_leave"> | Date | string
    end_date?: DateTimeFilter<"tb_leave"> | Date | string
    total_days?: IntFilter<"tb_leave"> | number
    reason?: StringFilter<"tb_leave"> | string
    status?: EnumstatusFilter<"tb_leave"> | $Enums.status
    created_at?: DateTimeFilter<"tb_leave"> | Date | string
    NIK?: StringFilter<"tb_leave"> | string
    id_special?: StringNullableFilter<"tb_leave"> | string | null
    id_mandatory?: StringNullableFilter<"tb_leave"> | string | null
  }

  export type tb_leaveCreateWithoutTb_special_leaveInput = {
    id_leave?: string
    title: string
    leave_type: $Enums.leave_type
    start_date: Date | string
    end_date: Date | string
    total_days: number
    reason: string
    status?: $Enums.status
    created_at?: Date | string
    tb_users: tb_usersCreateNestedOneWithoutTb_leaveInput
    tb_mandatory_leave?: tb_mandatory_leaveCreateNestedOneWithoutTb_leaveInput
    tb_leave_log?: tb_leave_logCreateNestedManyWithoutTb_leaveInput
  }

  export type tb_leaveUncheckedCreateWithoutTb_special_leaveInput = {
    id_leave?: string
    title: string
    leave_type: $Enums.leave_type
    start_date: Date | string
    end_date: Date | string
    total_days: number
    reason: string
    status?: $Enums.status
    created_at?: Date | string
    NIK: string
    id_mandatory?: string | null
    tb_leave_log?: tb_leave_logUncheckedCreateNestedManyWithoutTb_leaveInput
  }

  export type tb_leaveCreateOrConnectWithoutTb_special_leaveInput = {
    where: tb_leaveWhereUniqueInput
    create: XOR<tb_leaveCreateWithoutTb_special_leaveInput, tb_leaveUncheckedCreateWithoutTb_special_leaveInput>
  }

  export type tb_leaveCreateManyTb_special_leaveInputEnvelope = {
    data: tb_leaveCreateManyTb_special_leaveInput | tb_leaveCreateManyTb_special_leaveInput[]
    skipDuplicates?: boolean
  }

  export type tb_leaveUpsertWithWhereUniqueWithoutTb_special_leaveInput = {
    where: tb_leaveWhereUniqueInput
    update: XOR<tb_leaveUpdateWithoutTb_special_leaveInput, tb_leaveUncheckedUpdateWithoutTb_special_leaveInput>
    create: XOR<tb_leaveCreateWithoutTb_special_leaveInput, tb_leaveUncheckedCreateWithoutTb_special_leaveInput>
  }

  export type tb_leaveUpdateWithWhereUniqueWithoutTb_special_leaveInput = {
    where: tb_leaveWhereUniqueInput
    data: XOR<tb_leaveUpdateWithoutTb_special_leaveInput, tb_leaveUncheckedUpdateWithoutTb_special_leaveInput>
  }

  export type tb_leaveUpdateManyWithWhereWithoutTb_special_leaveInput = {
    where: tb_leaveScalarWhereInput
    data: XOR<tb_leaveUpdateManyMutationInput, tb_leaveUncheckedUpdateManyWithoutTb_special_leaveInput>
  }

  export type tb_balanceCreateWithoutTb_usersInput = {
    id_balance?: string
    amount: number
    receive_date: Date | string
    expired_date: Date | string
  }

  export type tb_balanceUncheckedCreateWithoutTb_usersInput = {
    id_balance?: string
    amount: number
    receive_date: Date | string
    expired_date: Date | string
  }

  export type tb_balanceCreateOrConnectWithoutTb_usersInput = {
    where: tb_balanceWhereUniqueInput
    create: XOR<tb_balanceCreateWithoutTb_usersInput, tb_balanceUncheckedCreateWithoutTb_usersInput>
  }

  export type tb_balanceCreateManyTb_usersInputEnvelope = {
    data: tb_balanceCreateManyTb_usersInput | tb_balanceCreateManyTb_usersInput[]
    skipDuplicates?: boolean
  }

  export type tb_balance_adjustmentCreateWithoutTb_usersInput = {
    id_adjustment?: string
    adjustment_value: number
    notes: string
    created_at: Date | string
    actor: string
  }

  export type tb_balance_adjustmentUncheckedCreateWithoutTb_usersInput = {
    id_adjustment?: string
    adjustment_value: number
    notes: string
    created_at: Date | string
    actor: string
  }

  export type tb_balance_adjustmentCreateOrConnectWithoutTb_usersInput = {
    where: tb_balance_adjustmentWhereUniqueInput
    create: XOR<tb_balance_adjustmentCreateWithoutTb_usersInput, tb_balance_adjustmentUncheckedCreateWithoutTb_usersInput>
  }

  export type tb_balance_adjustmentCreateManyTb_usersInputEnvelope = {
    data: tb_balance_adjustmentCreateManyTb_usersInput | tb_balance_adjustmentCreateManyTb_usersInput[]
    skipDuplicates?: boolean
  }

  export type tb_leaveCreateWithoutTb_usersInput = {
    id_leave?: string
    title: string
    leave_type: $Enums.leave_type
    start_date: Date | string
    end_date: Date | string
    total_days: number
    reason: string
    status?: $Enums.status
    created_at?: Date | string
    tb_mandatory_leave?: tb_mandatory_leaveCreateNestedOneWithoutTb_leaveInput
    tb_special_leave?: tb_special_leaveCreateNestedOneWithoutTb_leaveInput
    tb_leave_log?: tb_leave_logCreateNestedManyWithoutTb_leaveInput
  }

  export type tb_leaveUncheckedCreateWithoutTb_usersInput = {
    id_leave?: string
    title: string
    leave_type: $Enums.leave_type
    start_date: Date | string
    end_date: Date | string
    total_days: number
    reason: string
    status?: $Enums.status
    created_at?: Date | string
    id_special?: string | null
    id_mandatory?: string | null
    tb_leave_log?: tb_leave_logUncheckedCreateNestedManyWithoutTb_leaveInput
  }

  export type tb_leaveCreateOrConnectWithoutTb_usersInput = {
    where: tb_leaveWhereUniqueInput
    create: XOR<tb_leaveCreateWithoutTb_usersInput, tb_leaveUncheckedCreateWithoutTb_usersInput>
  }

  export type tb_leaveCreateManyTb_usersInputEnvelope = {
    data: tb_leaveCreateManyTb_usersInput | tb_leaveCreateManyTb_usersInput[]
    skipDuplicates?: boolean
  }

  export type tb_balanceUpsertWithWhereUniqueWithoutTb_usersInput = {
    where: tb_balanceWhereUniqueInput
    update: XOR<tb_balanceUpdateWithoutTb_usersInput, tb_balanceUncheckedUpdateWithoutTb_usersInput>
    create: XOR<tb_balanceCreateWithoutTb_usersInput, tb_balanceUncheckedCreateWithoutTb_usersInput>
  }

  export type tb_balanceUpdateWithWhereUniqueWithoutTb_usersInput = {
    where: tb_balanceWhereUniqueInput
    data: XOR<tb_balanceUpdateWithoutTb_usersInput, tb_balanceUncheckedUpdateWithoutTb_usersInput>
  }

  export type tb_balanceUpdateManyWithWhereWithoutTb_usersInput = {
    where: tb_balanceScalarWhereInput
    data: XOR<tb_balanceUpdateManyMutationInput, tb_balanceUncheckedUpdateManyWithoutTb_usersInput>
  }

  export type tb_balanceScalarWhereInput = {
    AND?: tb_balanceScalarWhereInput | tb_balanceScalarWhereInput[]
    OR?: tb_balanceScalarWhereInput[]
    NOT?: tb_balanceScalarWhereInput | tb_balanceScalarWhereInput[]
    id_balance?: StringFilter<"tb_balance"> | string
    amount?: IntFilter<"tb_balance"> | number
    receive_date?: DateTimeFilter<"tb_balance"> | Date | string
    expired_date?: DateTimeFilter<"tb_balance"> | Date | string
    NIK?: StringFilter<"tb_balance"> | string
  }

  export type tb_balance_adjustmentUpsertWithWhereUniqueWithoutTb_usersInput = {
    where: tb_balance_adjustmentWhereUniqueInput
    update: XOR<tb_balance_adjustmentUpdateWithoutTb_usersInput, tb_balance_adjustmentUncheckedUpdateWithoutTb_usersInput>
    create: XOR<tb_balance_adjustmentCreateWithoutTb_usersInput, tb_balance_adjustmentUncheckedCreateWithoutTb_usersInput>
  }

  export type tb_balance_adjustmentUpdateWithWhereUniqueWithoutTb_usersInput = {
    where: tb_balance_adjustmentWhereUniqueInput
    data: XOR<tb_balance_adjustmentUpdateWithoutTb_usersInput, tb_balance_adjustmentUncheckedUpdateWithoutTb_usersInput>
  }

  export type tb_balance_adjustmentUpdateManyWithWhereWithoutTb_usersInput = {
    where: tb_balance_adjustmentScalarWhereInput
    data: XOR<tb_balance_adjustmentUpdateManyMutationInput, tb_balance_adjustmentUncheckedUpdateManyWithoutTb_usersInput>
  }

  export type tb_balance_adjustmentScalarWhereInput = {
    AND?: tb_balance_adjustmentScalarWhereInput | tb_balance_adjustmentScalarWhereInput[]
    OR?: tb_balance_adjustmentScalarWhereInput[]
    NOT?: tb_balance_adjustmentScalarWhereInput | tb_balance_adjustmentScalarWhereInput[]
    id_adjustment?: StringFilter<"tb_balance_adjustment"> | string
    adjustment_value?: IntFilter<"tb_balance_adjustment"> | number
    notes?: StringFilter<"tb_balance_adjustment"> | string
    created_at?: DateTimeFilter<"tb_balance_adjustment"> | Date | string
    actor?: StringFilter<"tb_balance_adjustment"> | string
    NIK?: StringFilter<"tb_balance_adjustment"> | string
  }

  export type tb_leaveUpsertWithWhereUniqueWithoutTb_usersInput = {
    where: tb_leaveWhereUniqueInput
    update: XOR<tb_leaveUpdateWithoutTb_usersInput, tb_leaveUncheckedUpdateWithoutTb_usersInput>
    create: XOR<tb_leaveCreateWithoutTb_usersInput, tb_leaveUncheckedCreateWithoutTb_usersInput>
  }

  export type tb_leaveUpdateWithWhereUniqueWithoutTb_usersInput = {
    where: tb_leaveWhereUniqueInput
    data: XOR<tb_leaveUpdateWithoutTb_usersInput, tb_leaveUncheckedUpdateWithoutTb_usersInput>
  }

  export type tb_leaveUpdateManyWithWhereWithoutTb_usersInput = {
    where: tb_leaveScalarWhereInput
    data: XOR<tb_leaveUpdateManyMutationInput, tb_leaveUncheckedUpdateManyWithoutTb_usersInput>
  }

  export type tb_usersCreateWithoutTb_balance_adjustmentInput = {
    NIK: string
    fullname: string
    email: string
    password: string
    gender: $Enums.gender
    role: $Enums.role
    status_active?: $Enums.status_active
    join_date: Date | string
    tb_balance?: tb_balanceCreateNestedManyWithoutTb_usersInput
    tb_leave?: tb_leaveCreateNestedManyWithoutTb_usersInput
  }

  export type tb_usersUncheckedCreateWithoutTb_balance_adjustmentInput = {
    NIK: string
    fullname: string
    email: string
    password: string
    gender: $Enums.gender
    role: $Enums.role
    status_active?: $Enums.status_active
    join_date: Date | string
    tb_balance?: tb_balanceUncheckedCreateNestedManyWithoutTb_usersInput
    tb_leave?: tb_leaveUncheckedCreateNestedManyWithoutTb_usersInput
  }

  export type tb_usersCreateOrConnectWithoutTb_balance_adjustmentInput = {
    where: tb_usersWhereUniqueInput
    create: XOR<tb_usersCreateWithoutTb_balance_adjustmentInput, tb_usersUncheckedCreateWithoutTb_balance_adjustmentInput>
  }

  export type tb_usersUpsertWithoutTb_balance_adjustmentInput = {
    update: XOR<tb_usersUpdateWithoutTb_balance_adjustmentInput, tb_usersUncheckedUpdateWithoutTb_balance_adjustmentInput>
    create: XOR<tb_usersCreateWithoutTb_balance_adjustmentInput, tb_usersUncheckedCreateWithoutTb_balance_adjustmentInput>
    where?: tb_usersWhereInput
  }

  export type tb_usersUpdateToOneWithWhereWithoutTb_balance_adjustmentInput = {
    where?: tb_usersWhereInput
    data: XOR<tb_usersUpdateWithoutTb_balance_adjustmentInput, tb_usersUncheckedUpdateWithoutTb_balance_adjustmentInput>
  }

  export type tb_usersUpdateWithoutTb_balance_adjustmentInput = {
    NIK?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    gender?: EnumgenderFieldUpdateOperationsInput | $Enums.gender
    role?: EnumroleFieldUpdateOperationsInput | $Enums.role
    status_active?: Enumstatus_activeFieldUpdateOperationsInput | $Enums.status_active
    join_date?: DateTimeFieldUpdateOperationsInput | Date | string
    tb_balance?: tb_balanceUpdateManyWithoutTb_usersNestedInput
    tb_leave?: tb_leaveUpdateManyWithoutTb_usersNestedInput
  }

  export type tb_usersUncheckedUpdateWithoutTb_balance_adjustmentInput = {
    NIK?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    gender?: EnumgenderFieldUpdateOperationsInput | $Enums.gender
    role?: EnumroleFieldUpdateOperationsInput | $Enums.role
    status_active?: Enumstatus_activeFieldUpdateOperationsInput | $Enums.status_active
    join_date?: DateTimeFieldUpdateOperationsInput | Date | string
    tb_balance?: tb_balanceUncheckedUpdateManyWithoutTb_usersNestedInput
    tb_leave?: tb_leaveUncheckedUpdateManyWithoutTb_usersNestedInput
  }

  export type tb_leaveCreateWithoutTb_leave_logInput = {
    id_leave?: string
    title: string
    leave_type: $Enums.leave_type
    start_date: Date | string
    end_date: Date | string
    total_days: number
    reason: string
    status?: $Enums.status
    created_at?: Date | string
    tb_users: tb_usersCreateNestedOneWithoutTb_leaveInput
    tb_mandatory_leave?: tb_mandatory_leaveCreateNestedOneWithoutTb_leaveInput
    tb_special_leave?: tb_special_leaveCreateNestedOneWithoutTb_leaveInput
  }

  export type tb_leaveUncheckedCreateWithoutTb_leave_logInput = {
    id_leave?: string
    title: string
    leave_type: $Enums.leave_type
    start_date: Date | string
    end_date: Date | string
    total_days: number
    reason: string
    status?: $Enums.status
    created_at?: Date | string
    NIK: string
    id_special?: string | null
    id_mandatory?: string | null
  }

  export type tb_leaveCreateOrConnectWithoutTb_leave_logInput = {
    where: tb_leaveWhereUniqueInput
    create: XOR<tb_leaveCreateWithoutTb_leave_logInput, tb_leaveUncheckedCreateWithoutTb_leave_logInput>
  }

  export type tb_leaveUpsertWithoutTb_leave_logInput = {
    update: XOR<tb_leaveUpdateWithoutTb_leave_logInput, tb_leaveUncheckedUpdateWithoutTb_leave_logInput>
    create: XOR<tb_leaveCreateWithoutTb_leave_logInput, tb_leaveUncheckedCreateWithoutTb_leave_logInput>
    where?: tb_leaveWhereInput
  }

  export type tb_leaveUpdateToOneWithWhereWithoutTb_leave_logInput = {
    where?: tb_leaveWhereInput
    data: XOR<tb_leaveUpdateWithoutTb_leave_logInput, tb_leaveUncheckedUpdateWithoutTb_leave_logInput>
  }

  export type tb_leaveUpdateWithoutTb_leave_logInput = {
    id_leave?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    leave_type?: Enumleave_typeFieldUpdateOperationsInput | $Enums.leave_type
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    total_days?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumstatusFieldUpdateOperationsInput | $Enums.status
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tb_users?: tb_usersUpdateOneRequiredWithoutTb_leaveNestedInput
    tb_mandatory_leave?: tb_mandatory_leaveUpdateOneWithoutTb_leaveNestedInput
    tb_special_leave?: tb_special_leaveUpdateOneWithoutTb_leaveNestedInput
  }

  export type tb_leaveUncheckedUpdateWithoutTb_leave_logInput = {
    id_leave?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    leave_type?: Enumleave_typeFieldUpdateOperationsInput | $Enums.leave_type
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    total_days?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumstatusFieldUpdateOperationsInput | $Enums.status
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    NIK?: StringFieldUpdateOperationsInput | string
    id_special?: NullableStringFieldUpdateOperationsInput | string | null
    id_mandatory?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type tb_leave_logCreateManyTb_leaveInput = {
    id_log?: string
    old_status: $Enums.status
    new_status: $Enums.status
    reason: string
    changed_at: Date | string
    changed_by_nik: string
  }

  export type tb_leave_logUpdateWithoutTb_leaveInput = {
    id_log?: StringFieldUpdateOperationsInput | string
    old_status?: EnumstatusFieldUpdateOperationsInput | $Enums.status
    new_status?: EnumstatusFieldUpdateOperationsInput | $Enums.status
    reason?: StringFieldUpdateOperationsInput | string
    changed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    changed_by_nik?: StringFieldUpdateOperationsInput | string
  }

  export type tb_leave_logUncheckedUpdateWithoutTb_leaveInput = {
    id_log?: StringFieldUpdateOperationsInput | string
    old_status?: EnumstatusFieldUpdateOperationsInput | $Enums.status
    new_status?: EnumstatusFieldUpdateOperationsInput | $Enums.status
    reason?: StringFieldUpdateOperationsInput | string
    changed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    changed_by_nik?: StringFieldUpdateOperationsInput | string
  }

  export type tb_leave_logUncheckedUpdateManyWithoutTb_leaveInput = {
    id_log?: StringFieldUpdateOperationsInput | string
    old_status?: EnumstatusFieldUpdateOperationsInput | $Enums.status
    new_status?: EnumstatusFieldUpdateOperationsInput | $Enums.status
    reason?: StringFieldUpdateOperationsInput | string
    changed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    changed_by_nik?: StringFieldUpdateOperationsInput | string
  }

  export type tb_leaveCreateManyTb_mandatory_leaveInput = {
    id_leave?: string
    title: string
    leave_type: $Enums.leave_type
    start_date: Date | string
    end_date: Date | string
    total_days: number
    reason: string
    status?: $Enums.status
    created_at?: Date | string
    NIK: string
    id_special?: string | null
  }

  export type tb_leaveUpdateWithoutTb_mandatory_leaveInput = {
    id_leave?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    leave_type?: Enumleave_typeFieldUpdateOperationsInput | $Enums.leave_type
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    total_days?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumstatusFieldUpdateOperationsInput | $Enums.status
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tb_users?: tb_usersUpdateOneRequiredWithoutTb_leaveNestedInput
    tb_special_leave?: tb_special_leaveUpdateOneWithoutTb_leaveNestedInput
    tb_leave_log?: tb_leave_logUpdateManyWithoutTb_leaveNestedInput
  }

  export type tb_leaveUncheckedUpdateWithoutTb_mandatory_leaveInput = {
    id_leave?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    leave_type?: Enumleave_typeFieldUpdateOperationsInput | $Enums.leave_type
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    total_days?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumstatusFieldUpdateOperationsInput | $Enums.status
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    NIK?: StringFieldUpdateOperationsInput | string
    id_special?: NullableStringFieldUpdateOperationsInput | string | null
    tb_leave_log?: tb_leave_logUncheckedUpdateManyWithoutTb_leaveNestedInput
  }

  export type tb_leaveUncheckedUpdateManyWithoutTb_mandatory_leaveInput = {
    id_leave?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    leave_type?: Enumleave_typeFieldUpdateOperationsInput | $Enums.leave_type
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    total_days?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumstatusFieldUpdateOperationsInput | $Enums.status
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    NIK?: StringFieldUpdateOperationsInput | string
    id_special?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type tb_leaveCreateManyTb_special_leaveInput = {
    id_leave?: string
    title: string
    leave_type: $Enums.leave_type
    start_date: Date | string
    end_date: Date | string
    total_days: number
    reason: string
    status?: $Enums.status
    created_at?: Date | string
    NIK: string
    id_mandatory?: string | null
  }

  export type tb_leaveUpdateWithoutTb_special_leaveInput = {
    id_leave?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    leave_type?: Enumleave_typeFieldUpdateOperationsInput | $Enums.leave_type
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    total_days?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumstatusFieldUpdateOperationsInput | $Enums.status
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tb_users?: tb_usersUpdateOneRequiredWithoutTb_leaveNestedInput
    tb_mandatory_leave?: tb_mandatory_leaveUpdateOneWithoutTb_leaveNestedInput
    tb_leave_log?: tb_leave_logUpdateManyWithoutTb_leaveNestedInput
  }

  export type tb_leaveUncheckedUpdateWithoutTb_special_leaveInput = {
    id_leave?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    leave_type?: Enumleave_typeFieldUpdateOperationsInput | $Enums.leave_type
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    total_days?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumstatusFieldUpdateOperationsInput | $Enums.status
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    NIK?: StringFieldUpdateOperationsInput | string
    id_mandatory?: NullableStringFieldUpdateOperationsInput | string | null
    tb_leave_log?: tb_leave_logUncheckedUpdateManyWithoutTb_leaveNestedInput
  }

  export type tb_leaveUncheckedUpdateManyWithoutTb_special_leaveInput = {
    id_leave?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    leave_type?: Enumleave_typeFieldUpdateOperationsInput | $Enums.leave_type
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    total_days?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumstatusFieldUpdateOperationsInput | $Enums.status
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    NIK?: StringFieldUpdateOperationsInput | string
    id_mandatory?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type tb_balanceCreateManyTb_usersInput = {
    id_balance?: string
    amount: number
    receive_date: Date | string
    expired_date: Date | string
  }

  export type tb_balance_adjustmentCreateManyTb_usersInput = {
    id_adjustment?: string
    adjustment_value: number
    notes: string
    created_at: Date | string
    actor: string
  }

  export type tb_leaveCreateManyTb_usersInput = {
    id_leave?: string
    title: string
    leave_type: $Enums.leave_type
    start_date: Date | string
    end_date: Date | string
    total_days: number
    reason: string
    status?: $Enums.status
    created_at?: Date | string
    id_special?: string | null
    id_mandatory?: string | null
  }

  export type tb_balanceUpdateWithoutTb_usersInput = {
    id_balance?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    receive_date?: DateTimeFieldUpdateOperationsInput | Date | string
    expired_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type tb_balanceUncheckedUpdateWithoutTb_usersInput = {
    id_balance?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    receive_date?: DateTimeFieldUpdateOperationsInput | Date | string
    expired_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type tb_balanceUncheckedUpdateManyWithoutTb_usersInput = {
    id_balance?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    receive_date?: DateTimeFieldUpdateOperationsInput | Date | string
    expired_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type tb_balance_adjustmentUpdateWithoutTb_usersInput = {
    id_adjustment?: StringFieldUpdateOperationsInput | string
    adjustment_value?: IntFieldUpdateOperationsInput | number
    notes?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    actor?: StringFieldUpdateOperationsInput | string
  }

  export type tb_balance_adjustmentUncheckedUpdateWithoutTb_usersInput = {
    id_adjustment?: StringFieldUpdateOperationsInput | string
    adjustment_value?: IntFieldUpdateOperationsInput | number
    notes?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    actor?: StringFieldUpdateOperationsInput | string
  }

  export type tb_balance_adjustmentUncheckedUpdateManyWithoutTb_usersInput = {
    id_adjustment?: StringFieldUpdateOperationsInput | string
    adjustment_value?: IntFieldUpdateOperationsInput | number
    notes?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    actor?: StringFieldUpdateOperationsInput | string
  }

  export type tb_leaveUpdateWithoutTb_usersInput = {
    id_leave?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    leave_type?: Enumleave_typeFieldUpdateOperationsInput | $Enums.leave_type
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    total_days?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumstatusFieldUpdateOperationsInput | $Enums.status
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tb_mandatory_leave?: tb_mandatory_leaveUpdateOneWithoutTb_leaveNestedInput
    tb_special_leave?: tb_special_leaveUpdateOneWithoutTb_leaveNestedInput
    tb_leave_log?: tb_leave_logUpdateManyWithoutTb_leaveNestedInput
  }

  export type tb_leaveUncheckedUpdateWithoutTb_usersInput = {
    id_leave?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    leave_type?: Enumleave_typeFieldUpdateOperationsInput | $Enums.leave_type
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    total_days?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumstatusFieldUpdateOperationsInput | $Enums.status
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    id_special?: NullableStringFieldUpdateOperationsInput | string | null
    id_mandatory?: NullableStringFieldUpdateOperationsInput | string | null
    tb_leave_log?: tb_leave_logUncheckedUpdateManyWithoutTb_leaveNestedInput
  }

  export type tb_leaveUncheckedUpdateManyWithoutTb_usersInput = {
    id_leave?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    leave_type?: Enumleave_typeFieldUpdateOperationsInput | $Enums.leave_type
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    total_days?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumstatusFieldUpdateOperationsInput | $Enums.status
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    id_special?: NullableStringFieldUpdateOperationsInput | string | null
    id_mandatory?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}