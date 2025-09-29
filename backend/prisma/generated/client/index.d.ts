
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
 * Model Priority
 * 
 */
export type Priority = $Result.DefaultSelection<Prisma.$PriorityPayload>
/**
 * Model Status
 * 
 */
export type Status = $Result.DefaultSelection<Prisma.$StatusPayload>
/**
 * Model Tenant
 * 
 */
export type Tenant = $Result.DefaultSelection<Prisma.$TenantPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Department
 * 
 */
export type Department = $Result.DefaultSelection<Prisma.$DepartmentPayload>
/**
 * Model Column
 * 
 */
export type Column = $Result.DefaultSelection<Prisma.$ColumnPayload>
/**
 * Model Ticket
 * 
 */
export type Ticket = $Result.DefaultSelection<Prisma.$TicketPayload>
/**
 * Model TicketComment
 * 
 */
export type TicketComment = $Result.DefaultSelection<Prisma.$TicketCommentPayload>
/**
 * Model Attachment
 * 
 */
export type Attachment = $Result.DefaultSelection<Prisma.$AttachmentPayload>
/**
 * Model SLA
 * 
 */
export type SLA = $Result.DefaultSelection<Prisma.$SLAPayload>
/**
 * Model Workflow
 * 
 */
export type Workflow = $Result.DefaultSelection<Prisma.$WorkflowPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  super_admin: 'super_admin',
  admin: 'admin',
  agent: 'agent',
  customer: 'customer'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Priorities
 * const priorities = await prisma.priority.findMany()
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
   * // Fetch zero or more Priorities
   * const priorities = await prisma.priority.findMany()
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
   * `prisma.priority`: Exposes CRUD operations for the **Priority** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Priorities
    * const priorities = await prisma.priority.findMany()
    * ```
    */
  get priority(): Prisma.PriorityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.status`: Exposes CRUD operations for the **Status** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Statuses
    * const statuses = await prisma.status.findMany()
    * ```
    */
  get status(): Prisma.StatusDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tenant`: Exposes CRUD operations for the **Tenant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tenants
    * const tenants = await prisma.tenant.findMany()
    * ```
    */
  get tenant(): Prisma.TenantDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.department`: Exposes CRUD operations for the **Department** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Departments
    * const departments = await prisma.department.findMany()
    * ```
    */
  get department(): Prisma.DepartmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.column`: Exposes CRUD operations for the **Column** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Columns
    * const columns = await prisma.column.findMany()
    * ```
    */
  get column(): Prisma.ColumnDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ticket`: Exposes CRUD operations for the **Ticket** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tickets
    * const tickets = await prisma.ticket.findMany()
    * ```
    */
  get ticket(): Prisma.TicketDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ticketComment`: Exposes CRUD operations for the **TicketComment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TicketComments
    * const ticketComments = await prisma.ticketComment.findMany()
    * ```
    */
  get ticketComment(): Prisma.TicketCommentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.attachment`: Exposes CRUD operations for the **Attachment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Attachments
    * const attachments = await prisma.attachment.findMany()
    * ```
    */
  get attachment(): Prisma.AttachmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sLA`: Exposes CRUD operations for the **SLA** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SLAS
    * const sLAS = await prisma.sLA.findMany()
    * ```
    */
  get sLA(): Prisma.SLADelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workflow`: Exposes CRUD operations for the **Workflow** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Workflows
    * const workflows = await prisma.workflow.findMany()
    * ```
    */
  get workflow(): Prisma.WorkflowDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.12.0
   * Query Engine version: 8047c96bbd92db98a2abc7c9323ce77c02c89dbc
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
    Priority: 'Priority',
    Status: 'Status',
    Tenant: 'Tenant',
    User: 'User',
    Department: 'Department',
    Column: 'Column',
    Ticket: 'Ticket',
    TicketComment: 'TicketComment',
    Attachment: 'Attachment',
    SLA: 'SLA',
    Workflow: 'Workflow'
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
      modelProps: "priority" | "status" | "tenant" | "user" | "department" | "column" | "ticket" | "ticketComment" | "attachment" | "sLA" | "workflow"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Priority: {
        payload: Prisma.$PriorityPayload<ExtArgs>
        fields: Prisma.PriorityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PriorityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriorityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PriorityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriorityPayload>
          }
          findFirst: {
            args: Prisma.PriorityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriorityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PriorityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriorityPayload>
          }
          findMany: {
            args: Prisma.PriorityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriorityPayload>[]
          }
          create: {
            args: Prisma.PriorityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriorityPayload>
          }
          createMany: {
            args: Prisma.PriorityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PriorityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriorityPayload>[]
          }
          delete: {
            args: Prisma.PriorityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriorityPayload>
          }
          update: {
            args: Prisma.PriorityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriorityPayload>
          }
          deleteMany: {
            args: Prisma.PriorityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PriorityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PriorityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriorityPayload>[]
          }
          upsert: {
            args: Prisma.PriorityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriorityPayload>
          }
          aggregate: {
            args: Prisma.PriorityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePriority>
          }
          groupBy: {
            args: Prisma.PriorityGroupByArgs<ExtArgs>
            result: $Utils.Optional<PriorityGroupByOutputType>[]
          }
          count: {
            args: Prisma.PriorityCountArgs<ExtArgs>
            result: $Utils.Optional<PriorityCountAggregateOutputType> | number
          }
        }
      }
      Status: {
        payload: Prisma.$StatusPayload<ExtArgs>
        fields: Prisma.StatusFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StatusFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StatusFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusPayload>
          }
          findFirst: {
            args: Prisma.StatusFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StatusFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusPayload>
          }
          findMany: {
            args: Prisma.StatusFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusPayload>[]
          }
          create: {
            args: Prisma.StatusCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusPayload>
          }
          createMany: {
            args: Prisma.StatusCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StatusCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusPayload>[]
          }
          delete: {
            args: Prisma.StatusDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusPayload>
          }
          update: {
            args: Prisma.StatusUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusPayload>
          }
          deleteMany: {
            args: Prisma.StatusDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StatusUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StatusUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusPayload>[]
          }
          upsert: {
            args: Prisma.StatusUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusPayload>
          }
          aggregate: {
            args: Prisma.StatusAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStatus>
          }
          groupBy: {
            args: Prisma.StatusGroupByArgs<ExtArgs>
            result: $Utils.Optional<StatusGroupByOutputType>[]
          }
          count: {
            args: Prisma.StatusCountArgs<ExtArgs>
            result: $Utils.Optional<StatusCountAggregateOutputType> | number
          }
        }
      }
      Tenant: {
        payload: Prisma.$TenantPayload<ExtArgs>
        fields: Prisma.TenantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TenantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TenantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          findFirst: {
            args: Prisma.TenantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TenantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          findMany: {
            args: Prisma.TenantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>[]
          }
          create: {
            args: Prisma.TenantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          createMany: {
            args: Prisma.TenantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TenantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>[]
          }
          delete: {
            args: Prisma.TenantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          update: {
            args: Prisma.TenantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          deleteMany: {
            args: Prisma.TenantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TenantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TenantUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>[]
          }
          upsert: {
            args: Prisma.TenantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          aggregate: {
            args: Prisma.TenantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTenant>
          }
          groupBy: {
            args: Prisma.TenantGroupByArgs<ExtArgs>
            result: $Utils.Optional<TenantGroupByOutputType>[]
          }
          count: {
            args: Prisma.TenantCountArgs<ExtArgs>
            result: $Utils.Optional<TenantCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Department: {
        payload: Prisma.$DepartmentPayload<ExtArgs>
        fields: Prisma.DepartmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DepartmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DepartmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          findFirst: {
            args: Prisma.DepartmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DepartmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          findMany: {
            args: Prisma.DepartmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>[]
          }
          create: {
            args: Prisma.DepartmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          createMany: {
            args: Prisma.DepartmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DepartmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>[]
          }
          delete: {
            args: Prisma.DepartmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          update: {
            args: Prisma.DepartmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          deleteMany: {
            args: Prisma.DepartmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DepartmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DepartmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>[]
          }
          upsert: {
            args: Prisma.DepartmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          aggregate: {
            args: Prisma.DepartmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDepartment>
          }
          groupBy: {
            args: Prisma.DepartmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<DepartmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.DepartmentCountArgs<ExtArgs>
            result: $Utils.Optional<DepartmentCountAggregateOutputType> | number
          }
        }
      }
      Column: {
        payload: Prisma.$ColumnPayload<ExtArgs>
        fields: Prisma.ColumnFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ColumnFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColumnPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ColumnFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColumnPayload>
          }
          findFirst: {
            args: Prisma.ColumnFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColumnPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ColumnFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColumnPayload>
          }
          findMany: {
            args: Prisma.ColumnFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColumnPayload>[]
          }
          create: {
            args: Prisma.ColumnCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColumnPayload>
          }
          createMany: {
            args: Prisma.ColumnCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ColumnCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColumnPayload>[]
          }
          delete: {
            args: Prisma.ColumnDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColumnPayload>
          }
          update: {
            args: Prisma.ColumnUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColumnPayload>
          }
          deleteMany: {
            args: Prisma.ColumnDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ColumnUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ColumnUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColumnPayload>[]
          }
          upsert: {
            args: Prisma.ColumnUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColumnPayload>
          }
          aggregate: {
            args: Prisma.ColumnAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateColumn>
          }
          groupBy: {
            args: Prisma.ColumnGroupByArgs<ExtArgs>
            result: $Utils.Optional<ColumnGroupByOutputType>[]
          }
          count: {
            args: Prisma.ColumnCountArgs<ExtArgs>
            result: $Utils.Optional<ColumnCountAggregateOutputType> | number
          }
        }
      }
      Ticket: {
        payload: Prisma.$TicketPayload<ExtArgs>
        fields: Prisma.TicketFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TicketFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TicketFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          findFirst: {
            args: Prisma.TicketFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TicketFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          findMany: {
            args: Prisma.TicketFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>[]
          }
          create: {
            args: Prisma.TicketCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          createMany: {
            args: Prisma.TicketCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TicketCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>[]
          }
          delete: {
            args: Prisma.TicketDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          update: {
            args: Prisma.TicketUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          deleteMany: {
            args: Prisma.TicketDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TicketUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TicketUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>[]
          }
          upsert: {
            args: Prisma.TicketUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          aggregate: {
            args: Prisma.TicketAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTicket>
          }
          groupBy: {
            args: Prisma.TicketGroupByArgs<ExtArgs>
            result: $Utils.Optional<TicketGroupByOutputType>[]
          }
          count: {
            args: Prisma.TicketCountArgs<ExtArgs>
            result: $Utils.Optional<TicketCountAggregateOutputType> | number
          }
        }
      }
      TicketComment: {
        payload: Prisma.$TicketCommentPayload<ExtArgs>
        fields: Prisma.TicketCommentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TicketCommentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketCommentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TicketCommentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketCommentPayload>
          }
          findFirst: {
            args: Prisma.TicketCommentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketCommentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TicketCommentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketCommentPayload>
          }
          findMany: {
            args: Prisma.TicketCommentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketCommentPayload>[]
          }
          create: {
            args: Prisma.TicketCommentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketCommentPayload>
          }
          createMany: {
            args: Prisma.TicketCommentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TicketCommentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketCommentPayload>[]
          }
          delete: {
            args: Prisma.TicketCommentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketCommentPayload>
          }
          update: {
            args: Prisma.TicketCommentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketCommentPayload>
          }
          deleteMany: {
            args: Prisma.TicketCommentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TicketCommentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TicketCommentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketCommentPayload>[]
          }
          upsert: {
            args: Prisma.TicketCommentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketCommentPayload>
          }
          aggregate: {
            args: Prisma.TicketCommentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTicketComment>
          }
          groupBy: {
            args: Prisma.TicketCommentGroupByArgs<ExtArgs>
            result: $Utils.Optional<TicketCommentGroupByOutputType>[]
          }
          count: {
            args: Prisma.TicketCommentCountArgs<ExtArgs>
            result: $Utils.Optional<TicketCommentCountAggregateOutputType> | number
          }
        }
      }
      Attachment: {
        payload: Prisma.$AttachmentPayload<ExtArgs>
        fields: Prisma.AttachmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AttachmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AttachmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>
          }
          findFirst: {
            args: Prisma.AttachmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AttachmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>
          }
          findMany: {
            args: Prisma.AttachmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>[]
          }
          create: {
            args: Prisma.AttachmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>
          }
          createMany: {
            args: Prisma.AttachmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AttachmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>[]
          }
          delete: {
            args: Prisma.AttachmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>
          }
          update: {
            args: Prisma.AttachmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>
          }
          deleteMany: {
            args: Prisma.AttachmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AttachmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AttachmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>[]
          }
          upsert: {
            args: Prisma.AttachmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>
          }
          aggregate: {
            args: Prisma.AttachmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAttachment>
          }
          groupBy: {
            args: Prisma.AttachmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AttachmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AttachmentCountArgs<ExtArgs>
            result: $Utils.Optional<AttachmentCountAggregateOutputType> | number
          }
        }
      }
      SLA: {
        payload: Prisma.$SLAPayload<ExtArgs>
        fields: Prisma.SLAFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SLAFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SLAPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SLAFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SLAPayload>
          }
          findFirst: {
            args: Prisma.SLAFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SLAPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SLAFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SLAPayload>
          }
          findMany: {
            args: Prisma.SLAFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SLAPayload>[]
          }
          create: {
            args: Prisma.SLACreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SLAPayload>
          }
          createMany: {
            args: Prisma.SLACreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SLACreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SLAPayload>[]
          }
          delete: {
            args: Prisma.SLADeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SLAPayload>
          }
          update: {
            args: Prisma.SLAUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SLAPayload>
          }
          deleteMany: {
            args: Prisma.SLADeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SLAUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SLAUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SLAPayload>[]
          }
          upsert: {
            args: Prisma.SLAUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SLAPayload>
          }
          aggregate: {
            args: Prisma.SLAAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSLA>
          }
          groupBy: {
            args: Prisma.SLAGroupByArgs<ExtArgs>
            result: $Utils.Optional<SLAGroupByOutputType>[]
          }
          count: {
            args: Prisma.SLACountArgs<ExtArgs>
            result: $Utils.Optional<SLACountAggregateOutputType> | number
          }
        }
      }
      Workflow: {
        payload: Prisma.$WorkflowPayload<ExtArgs>
        fields: Prisma.WorkflowFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkflowFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkflowFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowPayload>
          }
          findFirst: {
            args: Prisma.WorkflowFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkflowFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowPayload>
          }
          findMany: {
            args: Prisma.WorkflowFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowPayload>[]
          }
          create: {
            args: Prisma.WorkflowCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowPayload>
          }
          createMany: {
            args: Prisma.WorkflowCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkflowCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowPayload>[]
          }
          delete: {
            args: Prisma.WorkflowDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowPayload>
          }
          update: {
            args: Prisma.WorkflowUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowPayload>
          }
          deleteMany: {
            args: Prisma.WorkflowDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkflowUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorkflowUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowPayload>[]
          }
          upsert: {
            args: Prisma.WorkflowUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowPayload>
          }
          aggregate: {
            args: Prisma.WorkflowAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkflow>
          }
          groupBy: {
            args: Prisma.WorkflowGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkflowGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkflowCountArgs<ExtArgs>
            result: $Utils.Optional<WorkflowCountAggregateOutputType> | number
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
    priority?: PriorityOmit
    status?: StatusOmit
    tenant?: TenantOmit
    user?: UserOmit
    department?: DepartmentOmit
    column?: ColumnOmit
    ticket?: TicketOmit
    ticketComment?: TicketCommentOmit
    attachment?: AttachmentOmit
    sLA?: SLAOmit
    workflow?: WorkflowOmit
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
   * Count Type PriorityCountOutputType
   */

  export type PriorityCountOutputType = {
    tickets: number
    slas: number
  }

  export type PriorityCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tickets?: boolean | PriorityCountOutputTypeCountTicketsArgs
    slas?: boolean | PriorityCountOutputTypeCountSlasArgs
  }

  // Custom InputTypes
  /**
   * PriorityCountOutputType without action
   */
  export type PriorityCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriorityCountOutputType
     */
    select?: PriorityCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PriorityCountOutputType without action
   */
  export type PriorityCountOutputTypeCountTicketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketWhereInput
  }

  /**
   * PriorityCountOutputType without action
   */
  export type PriorityCountOutputTypeCountSlasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SLAWhereInput
  }


  /**
   * Count Type StatusCountOutputType
   */

  export type StatusCountOutputType = {
    columns: number
  }

  export type StatusCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    columns?: boolean | StatusCountOutputTypeCountColumnsArgs
  }

  // Custom InputTypes
  /**
   * StatusCountOutputType without action
   */
  export type StatusCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusCountOutputType
     */
    select?: StatusCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StatusCountOutputType without action
   */
  export type StatusCountOutputTypeCountColumnsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ColumnWhereInput
  }


  /**
   * Count Type TenantCountOutputType
   */

  export type TenantCountOutputType = {
    users: number
    departments: number
    tickets: number
    columns: number
    slas: number
    workflows: number
    priorities: number
    statuses: number
  }

  export type TenantCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | TenantCountOutputTypeCountUsersArgs
    departments?: boolean | TenantCountOutputTypeCountDepartmentsArgs
    tickets?: boolean | TenantCountOutputTypeCountTicketsArgs
    columns?: boolean | TenantCountOutputTypeCountColumnsArgs
    slas?: boolean | TenantCountOutputTypeCountSlasArgs
    workflows?: boolean | TenantCountOutputTypeCountWorkflowsArgs
    priorities?: boolean | TenantCountOutputTypeCountPrioritiesArgs
    statuses?: boolean | TenantCountOutputTypeCountStatusesArgs
  }

  // Custom InputTypes
  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantCountOutputType
     */
    select?: TenantCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountDepartmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DepartmentWhereInput
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountTicketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketWhereInput
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountColumnsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ColumnWhereInput
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountSlasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SLAWhereInput
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountWorkflowsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkflowWhereInput
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountPrioritiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PriorityWhereInput
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountStatusesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StatusWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    ticketsCreated: number
    ticketsAssigned: number
    comments: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ticketsCreated?: boolean | UserCountOutputTypeCountTicketsCreatedArgs
    ticketsAssigned?: boolean | UserCountOutputTypeCountTicketsAssignedArgs
    comments?: boolean | UserCountOutputTypeCountCommentsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTicketsCreatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTicketsAssignedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketCommentWhereInput
  }


  /**
   * Count Type DepartmentCountOutputType
   */

  export type DepartmentCountOutputType = {
    tickets: number
  }

  export type DepartmentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tickets?: boolean | DepartmentCountOutputTypeCountTicketsArgs
  }

  // Custom InputTypes
  /**
   * DepartmentCountOutputType without action
   */
  export type DepartmentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DepartmentCountOutputType
     */
    select?: DepartmentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DepartmentCountOutputType without action
   */
  export type DepartmentCountOutputTypeCountTicketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketWhereInput
  }


  /**
   * Count Type ColumnCountOutputType
   */

  export type ColumnCountOutputType = {
    tickets: number
  }

  export type ColumnCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tickets?: boolean | ColumnCountOutputTypeCountTicketsArgs
  }

  // Custom InputTypes
  /**
   * ColumnCountOutputType without action
   */
  export type ColumnCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColumnCountOutputType
     */
    select?: ColumnCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ColumnCountOutputType without action
   */
  export type ColumnCountOutputTypeCountTicketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketWhereInput
  }


  /**
   * Count Type TicketCountOutputType
   */

  export type TicketCountOutputType = {
    comments: number
    attachments: number
  }

  export type TicketCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comments?: boolean | TicketCountOutputTypeCountCommentsArgs
    attachments?: boolean | TicketCountOutputTypeCountAttachmentsArgs
  }

  // Custom InputTypes
  /**
   * TicketCountOutputType without action
   */
  export type TicketCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketCountOutputType
     */
    select?: TicketCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TicketCountOutputType without action
   */
  export type TicketCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketCommentWhereInput
  }

  /**
   * TicketCountOutputType without action
   */
  export type TicketCountOutputTypeCountAttachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttachmentWhereInput
  }


  /**
   * Count Type TicketCommentCountOutputType
   */

  export type TicketCommentCountOutputType = {
    attachments: number
  }

  export type TicketCommentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attachments?: boolean | TicketCommentCountOutputTypeCountAttachmentsArgs
  }

  // Custom InputTypes
  /**
   * TicketCommentCountOutputType without action
   */
  export type TicketCommentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketCommentCountOutputType
     */
    select?: TicketCommentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TicketCommentCountOutputType without action
   */
  export type TicketCommentCountOutputTypeCountAttachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttachmentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Priority
   */

  export type AggregatePriority = {
    _count: PriorityCountAggregateOutputType | null
    _avg: PriorityAvgAggregateOutputType | null
    _sum: PrioritySumAggregateOutputType | null
    _min: PriorityMinAggregateOutputType | null
    _max: PriorityMaxAggregateOutputType | null
  }

  export type PriorityAvgAggregateOutputType = {
    order: number | null
  }

  export type PrioritySumAggregateOutputType = {
    order: number | null
  }

  export type PriorityMinAggregateOutputType = {
    id: string | null
    name: string | null
    color: string | null
    order: number | null
    isDefault: boolean | null
    tenantId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PriorityMaxAggregateOutputType = {
    id: string | null
    name: string | null
    color: string | null
    order: number | null
    isDefault: boolean | null
    tenantId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PriorityCountAggregateOutputType = {
    id: number
    name: number
    color: number
    order: number
    isDefault: number
    tenantId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PriorityAvgAggregateInputType = {
    order?: true
  }

  export type PrioritySumAggregateInputType = {
    order?: true
  }

  export type PriorityMinAggregateInputType = {
    id?: true
    name?: true
    color?: true
    order?: true
    isDefault?: true
    tenantId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PriorityMaxAggregateInputType = {
    id?: true
    name?: true
    color?: true
    order?: true
    isDefault?: true
    tenantId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PriorityCountAggregateInputType = {
    id?: true
    name?: true
    color?: true
    order?: true
    isDefault?: true
    tenantId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PriorityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Priority to aggregate.
     */
    where?: PriorityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Priorities to fetch.
     */
    orderBy?: PriorityOrderByWithRelationInput | PriorityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PriorityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Priorities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Priorities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Priorities
    **/
    _count?: true | PriorityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PriorityAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PrioritySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PriorityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PriorityMaxAggregateInputType
  }

  export type GetPriorityAggregateType<T extends PriorityAggregateArgs> = {
        [P in keyof T & keyof AggregatePriority]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePriority[P]>
      : GetScalarType<T[P], AggregatePriority[P]>
  }




  export type PriorityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PriorityWhereInput
    orderBy?: PriorityOrderByWithAggregationInput | PriorityOrderByWithAggregationInput[]
    by: PriorityScalarFieldEnum[] | PriorityScalarFieldEnum
    having?: PriorityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PriorityCountAggregateInputType | true
    _avg?: PriorityAvgAggregateInputType
    _sum?: PrioritySumAggregateInputType
    _min?: PriorityMinAggregateInputType
    _max?: PriorityMaxAggregateInputType
  }

  export type PriorityGroupByOutputType = {
    id: string
    name: string
    color: string
    order: number
    isDefault: boolean
    tenantId: string
    createdAt: Date
    updatedAt: Date
    _count: PriorityCountAggregateOutputType | null
    _avg: PriorityAvgAggregateOutputType | null
    _sum: PrioritySumAggregateOutputType | null
    _min: PriorityMinAggregateOutputType | null
    _max: PriorityMaxAggregateOutputType | null
  }

  type GetPriorityGroupByPayload<T extends PriorityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PriorityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PriorityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PriorityGroupByOutputType[P]>
            : GetScalarType<T[P], PriorityGroupByOutputType[P]>
        }
      >
    >


  export type PrioritySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    color?: boolean
    order?: boolean
    isDefault?: boolean
    tenantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    tickets?: boolean | Priority$ticketsArgs<ExtArgs>
    slas?: boolean | Priority$slasArgs<ExtArgs>
    _count?: boolean | PriorityCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["priority"]>

  export type PrioritySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    color?: boolean
    order?: boolean
    isDefault?: boolean
    tenantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["priority"]>

  export type PrioritySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    color?: boolean
    order?: boolean
    isDefault?: boolean
    tenantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["priority"]>

  export type PrioritySelectScalar = {
    id?: boolean
    name?: boolean
    color?: boolean
    order?: boolean
    isDefault?: boolean
    tenantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PriorityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "color" | "order" | "isDefault" | "tenantId" | "createdAt" | "updatedAt", ExtArgs["result"]["priority"]>
  export type PriorityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    tickets?: boolean | Priority$ticketsArgs<ExtArgs>
    slas?: boolean | Priority$slasArgs<ExtArgs>
    _count?: boolean | PriorityCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PriorityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type PriorityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }

  export type $PriorityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Priority"
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs>
      tickets: Prisma.$TicketPayload<ExtArgs>[]
      slas: Prisma.$SLAPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      color: string
      order: number
      isDefault: boolean
      tenantId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["priority"]>
    composites: {}
  }

  type PriorityGetPayload<S extends boolean | null | undefined | PriorityDefaultArgs> = $Result.GetResult<Prisma.$PriorityPayload, S>

  type PriorityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PriorityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PriorityCountAggregateInputType | true
    }

  export interface PriorityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Priority'], meta: { name: 'Priority' } }
    /**
     * Find zero or one Priority that matches the filter.
     * @param {PriorityFindUniqueArgs} args - Arguments to find a Priority
     * @example
     * // Get one Priority
     * const priority = await prisma.priority.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PriorityFindUniqueArgs>(args: SelectSubset<T, PriorityFindUniqueArgs<ExtArgs>>): Prisma__PriorityClient<$Result.GetResult<Prisma.$PriorityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Priority that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PriorityFindUniqueOrThrowArgs} args - Arguments to find a Priority
     * @example
     * // Get one Priority
     * const priority = await prisma.priority.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PriorityFindUniqueOrThrowArgs>(args: SelectSubset<T, PriorityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PriorityClient<$Result.GetResult<Prisma.$PriorityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Priority that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriorityFindFirstArgs} args - Arguments to find a Priority
     * @example
     * // Get one Priority
     * const priority = await prisma.priority.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PriorityFindFirstArgs>(args?: SelectSubset<T, PriorityFindFirstArgs<ExtArgs>>): Prisma__PriorityClient<$Result.GetResult<Prisma.$PriorityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Priority that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriorityFindFirstOrThrowArgs} args - Arguments to find a Priority
     * @example
     * // Get one Priority
     * const priority = await prisma.priority.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PriorityFindFirstOrThrowArgs>(args?: SelectSubset<T, PriorityFindFirstOrThrowArgs<ExtArgs>>): Prisma__PriorityClient<$Result.GetResult<Prisma.$PriorityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Priorities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriorityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Priorities
     * const priorities = await prisma.priority.findMany()
     * 
     * // Get first 10 Priorities
     * const priorities = await prisma.priority.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const priorityWithIdOnly = await prisma.priority.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PriorityFindManyArgs>(args?: SelectSubset<T, PriorityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PriorityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Priority.
     * @param {PriorityCreateArgs} args - Arguments to create a Priority.
     * @example
     * // Create one Priority
     * const Priority = await prisma.priority.create({
     *   data: {
     *     // ... data to create a Priority
     *   }
     * })
     * 
     */
    create<T extends PriorityCreateArgs>(args: SelectSubset<T, PriorityCreateArgs<ExtArgs>>): Prisma__PriorityClient<$Result.GetResult<Prisma.$PriorityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Priorities.
     * @param {PriorityCreateManyArgs} args - Arguments to create many Priorities.
     * @example
     * // Create many Priorities
     * const priority = await prisma.priority.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PriorityCreateManyArgs>(args?: SelectSubset<T, PriorityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Priorities and returns the data saved in the database.
     * @param {PriorityCreateManyAndReturnArgs} args - Arguments to create many Priorities.
     * @example
     * // Create many Priorities
     * const priority = await prisma.priority.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Priorities and only return the `id`
     * const priorityWithIdOnly = await prisma.priority.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PriorityCreateManyAndReturnArgs>(args?: SelectSubset<T, PriorityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PriorityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Priority.
     * @param {PriorityDeleteArgs} args - Arguments to delete one Priority.
     * @example
     * // Delete one Priority
     * const Priority = await prisma.priority.delete({
     *   where: {
     *     // ... filter to delete one Priority
     *   }
     * })
     * 
     */
    delete<T extends PriorityDeleteArgs>(args: SelectSubset<T, PriorityDeleteArgs<ExtArgs>>): Prisma__PriorityClient<$Result.GetResult<Prisma.$PriorityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Priority.
     * @param {PriorityUpdateArgs} args - Arguments to update one Priority.
     * @example
     * // Update one Priority
     * const priority = await prisma.priority.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PriorityUpdateArgs>(args: SelectSubset<T, PriorityUpdateArgs<ExtArgs>>): Prisma__PriorityClient<$Result.GetResult<Prisma.$PriorityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Priorities.
     * @param {PriorityDeleteManyArgs} args - Arguments to filter Priorities to delete.
     * @example
     * // Delete a few Priorities
     * const { count } = await prisma.priority.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PriorityDeleteManyArgs>(args?: SelectSubset<T, PriorityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Priorities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriorityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Priorities
     * const priority = await prisma.priority.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PriorityUpdateManyArgs>(args: SelectSubset<T, PriorityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Priorities and returns the data updated in the database.
     * @param {PriorityUpdateManyAndReturnArgs} args - Arguments to update many Priorities.
     * @example
     * // Update many Priorities
     * const priority = await prisma.priority.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Priorities and only return the `id`
     * const priorityWithIdOnly = await prisma.priority.updateManyAndReturn({
     *   select: { id: true },
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
    updateManyAndReturn<T extends PriorityUpdateManyAndReturnArgs>(args: SelectSubset<T, PriorityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PriorityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Priority.
     * @param {PriorityUpsertArgs} args - Arguments to update or create a Priority.
     * @example
     * // Update or create a Priority
     * const priority = await prisma.priority.upsert({
     *   create: {
     *     // ... data to create a Priority
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Priority we want to update
     *   }
     * })
     */
    upsert<T extends PriorityUpsertArgs>(args: SelectSubset<T, PriorityUpsertArgs<ExtArgs>>): Prisma__PriorityClient<$Result.GetResult<Prisma.$PriorityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Priorities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriorityCountArgs} args - Arguments to filter Priorities to count.
     * @example
     * // Count the number of Priorities
     * const count = await prisma.priority.count({
     *   where: {
     *     // ... the filter for the Priorities we want to count
     *   }
     * })
    **/
    count<T extends PriorityCountArgs>(
      args?: Subset<T, PriorityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PriorityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Priority.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriorityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PriorityAggregateArgs>(args: Subset<T, PriorityAggregateArgs>): Prisma.PrismaPromise<GetPriorityAggregateType<T>>

    /**
     * Group by Priority.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriorityGroupByArgs} args - Group by arguments.
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
      T extends PriorityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PriorityGroupByArgs['orderBy'] }
        : { orderBy?: PriorityGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PriorityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPriorityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Priority model
   */
  readonly fields: PriorityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Priority.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PriorityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tickets<T extends Priority$ticketsArgs<ExtArgs> = {}>(args?: Subset<T, Priority$ticketsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    slas<T extends Priority$slasArgs<ExtArgs> = {}>(args?: Subset<T, Priority$slasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SLAPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Priority model
   */
  interface PriorityFieldRefs {
    readonly id: FieldRef<"Priority", 'String'>
    readonly name: FieldRef<"Priority", 'String'>
    readonly color: FieldRef<"Priority", 'String'>
    readonly order: FieldRef<"Priority", 'Int'>
    readonly isDefault: FieldRef<"Priority", 'Boolean'>
    readonly tenantId: FieldRef<"Priority", 'String'>
    readonly createdAt: FieldRef<"Priority", 'DateTime'>
    readonly updatedAt: FieldRef<"Priority", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Priority findUnique
   */
  export type PriorityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Priority
     */
    select?: PrioritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Priority
     */
    omit?: PriorityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriorityInclude<ExtArgs> | null
    /**
     * Filter, which Priority to fetch.
     */
    where: PriorityWhereUniqueInput
  }

  /**
   * Priority findUniqueOrThrow
   */
  export type PriorityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Priority
     */
    select?: PrioritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Priority
     */
    omit?: PriorityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriorityInclude<ExtArgs> | null
    /**
     * Filter, which Priority to fetch.
     */
    where: PriorityWhereUniqueInput
  }

  /**
   * Priority findFirst
   */
  export type PriorityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Priority
     */
    select?: PrioritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Priority
     */
    omit?: PriorityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriorityInclude<ExtArgs> | null
    /**
     * Filter, which Priority to fetch.
     */
    where?: PriorityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Priorities to fetch.
     */
    orderBy?: PriorityOrderByWithRelationInput | PriorityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Priorities.
     */
    cursor?: PriorityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Priorities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Priorities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Priorities.
     */
    distinct?: PriorityScalarFieldEnum | PriorityScalarFieldEnum[]
  }

  /**
   * Priority findFirstOrThrow
   */
  export type PriorityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Priority
     */
    select?: PrioritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Priority
     */
    omit?: PriorityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriorityInclude<ExtArgs> | null
    /**
     * Filter, which Priority to fetch.
     */
    where?: PriorityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Priorities to fetch.
     */
    orderBy?: PriorityOrderByWithRelationInput | PriorityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Priorities.
     */
    cursor?: PriorityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Priorities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Priorities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Priorities.
     */
    distinct?: PriorityScalarFieldEnum | PriorityScalarFieldEnum[]
  }

  /**
   * Priority findMany
   */
  export type PriorityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Priority
     */
    select?: PrioritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Priority
     */
    omit?: PriorityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriorityInclude<ExtArgs> | null
    /**
     * Filter, which Priorities to fetch.
     */
    where?: PriorityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Priorities to fetch.
     */
    orderBy?: PriorityOrderByWithRelationInput | PriorityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Priorities.
     */
    cursor?: PriorityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Priorities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Priorities.
     */
    skip?: number
    distinct?: PriorityScalarFieldEnum | PriorityScalarFieldEnum[]
  }

  /**
   * Priority create
   */
  export type PriorityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Priority
     */
    select?: PrioritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Priority
     */
    omit?: PriorityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriorityInclude<ExtArgs> | null
    /**
     * The data needed to create a Priority.
     */
    data: XOR<PriorityCreateInput, PriorityUncheckedCreateInput>
  }

  /**
   * Priority createMany
   */
  export type PriorityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Priorities.
     */
    data: PriorityCreateManyInput | PriorityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Priority createManyAndReturn
   */
  export type PriorityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Priority
     */
    select?: PrioritySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Priority
     */
    omit?: PriorityOmit<ExtArgs> | null
    /**
     * The data used to create many Priorities.
     */
    data: PriorityCreateManyInput | PriorityCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriorityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Priority update
   */
  export type PriorityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Priority
     */
    select?: PrioritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Priority
     */
    omit?: PriorityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriorityInclude<ExtArgs> | null
    /**
     * The data needed to update a Priority.
     */
    data: XOR<PriorityUpdateInput, PriorityUncheckedUpdateInput>
    /**
     * Choose, which Priority to update.
     */
    where: PriorityWhereUniqueInput
  }

  /**
   * Priority updateMany
   */
  export type PriorityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Priorities.
     */
    data: XOR<PriorityUpdateManyMutationInput, PriorityUncheckedUpdateManyInput>
    /**
     * Filter which Priorities to update
     */
    where?: PriorityWhereInput
    /**
     * Limit how many Priorities to update.
     */
    limit?: number
  }

  /**
   * Priority updateManyAndReturn
   */
  export type PriorityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Priority
     */
    select?: PrioritySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Priority
     */
    omit?: PriorityOmit<ExtArgs> | null
    /**
     * The data used to update Priorities.
     */
    data: XOR<PriorityUpdateManyMutationInput, PriorityUncheckedUpdateManyInput>
    /**
     * Filter which Priorities to update
     */
    where?: PriorityWhereInput
    /**
     * Limit how many Priorities to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriorityIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Priority upsert
   */
  export type PriorityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Priority
     */
    select?: PrioritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Priority
     */
    omit?: PriorityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriorityInclude<ExtArgs> | null
    /**
     * The filter to search for the Priority to update in case it exists.
     */
    where: PriorityWhereUniqueInput
    /**
     * In case the Priority found by the `where` argument doesn't exist, create a new Priority with this data.
     */
    create: XOR<PriorityCreateInput, PriorityUncheckedCreateInput>
    /**
     * In case the Priority was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PriorityUpdateInput, PriorityUncheckedUpdateInput>
  }

  /**
   * Priority delete
   */
  export type PriorityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Priority
     */
    select?: PrioritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Priority
     */
    omit?: PriorityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriorityInclude<ExtArgs> | null
    /**
     * Filter which Priority to delete.
     */
    where: PriorityWhereUniqueInput
  }

  /**
   * Priority deleteMany
   */
  export type PriorityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Priorities to delete
     */
    where?: PriorityWhereInput
    /**
     * Limit how many Priorities to delete.
     */
    limit?: number
  }

  /**
   * Priority.tickets
   */
  export type Priority$ticketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    where?: TicketWhereInput
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    cursor?: TicketWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }

  /**
   * Priority.slas
   */
  export type Priority$slasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SLA
     */
    select?: SLASelect<ExtArgs> | null
    /**
     * Omit specific fields from the SLA
     */
    omit?: SLAOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SLAInclude<ExtArgs> | null
    where?: SLAWhereInput
    orderBy?: SLAOrderByWithRelationInput | SLAOrderByWithRelationInput[]
    cursor?: SLAWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SLAScalarFieldEnum | SLAScalarFieldEnum[]
  }

  /**
   * Priority without action
   */
  export type PriorityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Priority
     */
    select?: PrioritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Priority
     */
    omit?: PriorityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriorityInclude<ExtArgs> | null
  }


  /**
   * Model Status
   */

  export type AggregateStatus = {
    _count: StatusCountAggregateOutputType | null
    _avg: StatusAvgAggregateOutputType | null
    _sum: StatusSumAggregateOutputType | null
    _min: StatusMinAggregateOutputType | null
    _max: StatusMaxAggregateOutputType | null
  }

  export type StatusAvgAggregateOutputType = {
    order: number | null
  }

  export type StatusSumAggregateOutputType = {
    order: number | null
  }

  export type StatusMinAggregateOutputType = {
    id: string | null
    name: string | null
    color: string | null
    order: number | null
    isDefault: boolean | null
    tenantId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StatusMaxAggregateOutputType = {
    id: string | null
    name: string | null
    color: string | null
    order: number | null
    isDefault: boolean | null
    tenantId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StatusCountAggregateOutputType = {
    id: number
    name: number
    color: number
    order: number
    isDefault: number
    tenantId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StatusAvgAggregateInputType = {
    order?: true
  }

  export type StatusSumAggregateInputType = {
    order?: true
  }

  export type StatusMinAggregateInputType = {
    id?: true
    name?: true
    color?: true
    order?: true
    isDefault?: true
    tenantId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StatusMaxAggregateInputType = {
    id?: true
    name?: true
    color?: true
    order?: true
    isDefault?: true
    tenantId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StatusCountAggregateInputType = {
    id?: true
    name?: true
    color?: true
    order?: true
    isDefault?: true
    tenantId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StatusAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Status to aggregate.
     */
    where?: StatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Statuses to fetch.
     */
    orderBy?: StatusOrderByWithRelationInput | StatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Statuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Statuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Statuses
    **/
    _count?: true | StatusCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StatusAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StatusSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StatusMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StatusMaxAggregateInputType
  }

  export type GetStatusAggregateType<T extends StatusAggregateArgs> = {
        [P in keyof T & keyof AggregateStatus]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStatus[P]>
      : GetScalarType<T[P], AggregateStatus[P]>
  }




  export type StatusGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StatusWhereInput
    orderBy?: StatusOrderByWithAggregationInput | StatusOrderByWithAggregationInput[]
    by: StatusScalarFieldEnum[] | StatusScalarFieldEnum
    having?: StatusScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StatusCountAggregateInputType | true
    _avg?: StatusAvgAggregateInputType
    _sum?: StatusSumAggregateInputType
    _min?: StatusMinAggregateInputType
    _max?: StatusMaxAggregateInputType
  }

  export type StatusGroupByOutputType = {
    id: string
    name: string
    color: string
    order: number
    isDefault: boolean
    tenantId: string
    createdAt: Date
    updatedAt: Date
    _count: StatusCountAggregateOutputType | null
    _avg: StatusAvgAggregateOutputType | null
    _sum: StatusSumAggregateOutputType | null
    _min: StatusMinAggregateOutputType | null
    _max: StatusMaxAggregateOutputType | null
  }

  type GetStatusGroupByPayload<T extends StatusGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StatusGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StatusGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StatusGroupByOutputType[P]>
            : GetScalarType<T[P], StatusGroupByOutputType[P]>
        }
      >
    >


  export type StatusSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    color?: boolean
    order?: boolean
    isDefault?: boolean
    tenantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    columns?: boolean | Status$columnsArgs<ExtArgs>
    _count?: boolean | StatusCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["status"]>

  export type StatusSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    color?: boolean
    order?: boolean
    isDefault?: boolean
    tenantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["status"]>

  export type StatusSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    color?: boolean
    order?: boolean
    isDefault?: boolean
    tenantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["status"]>

  export type StatusSelectScalar = {
    id?: boolean
    name?: boolean
    color?: boolean
    order?: boolean
    isDefault?: boolean
    tenantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StatusOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "color" | "order" | "isDefault" | "tenantId" | "createdAt" | "updatedAt", ExtArgs["result"]["status"]>
  export type StatusInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    columns?: boolean | Status$columnsArgs<ExtArgs>
    _count?: boolean | StatusCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StatusIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type StatusIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }

  export type $StatusPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Status"
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs>
      columns: Prisma.$ColumnPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      color: string
      order: number
      isDefault: boolean
      tenantId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["status"]>
    composites: {}
  }

  type StatusGetPayload<S extends boolean | null | undefined | StatusDefaultArgs> = $Result.GetResult<Prisma.$StatusPayload, S>

  type StatusCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StatusFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StatusCountAggregateInputType | true
    }

  export interface StatusDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Status'], meta: { name: 'Status' } }
    /**
     * Find zero or one Status that matches the filter.
     * @param {StatusFindUniqueArgs} args - Arguments to find a Status
     * @example
     * // Get one Status
     * const status = await prisma.status.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StatusFindUniqueArgs>(args: SelectSubset<T, StatusFindUniqueArgs<ExtArgs>>): Prisma__StatusClient<$Result.GetResult<Prisma.$StatusPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Status that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StatusFindUniqueOrThrowArgs} args - Arguments to find a Status
     * @example
     * // Get one Status
     * const status = await prisma.status.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StatusFindUniqueOrThrowArgs>(args: SelectSubset<T, StatusFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StatusClient<$Result.GetResult<Prisma.$StatusPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Status that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusFindFirstArgs} args - Arguments to find a Status
     * @example
     * // Get one Status
     * const status = await prisma.status.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StatusFindFirstArgs>(args?: SelectSubset<T, StatusFindFirstArgs<ExtArgs>>): Prisma__StatusClient<$Result.GetResult<Prisma.$StatusPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Status that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusFindFirstOrThrowArgs} args - Arguments to find a Status
     * @example
     * // Get one Status
     * const status = await prisma.status.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StatusFindFirstOrThrowArgs>(args?: SelectSubset<T, StatusFindFirstOrThrowArgs<ExtArgs>>): Prisma__StatusClient<$Result.GetResult<Prisma.$StatusPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Statuses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Statuses
     * const statuses = await prisma.status.findMany()
     * 
     * // Get first 10 Statuses
     * const statuses = await prisma.status.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const statusWithIdOnly = await prisma.status.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StatusFindManyArgs>(args?: SelectSubset<T, StatusFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StatusPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Status.
     * @param {StatusCreateArgs} args - Arguments to create a Status.
     * @example
     * // Create one Status
     * const Status = await prisma.status.create({
     *   data: {
     *     // ... data to create a Status
     *   }
     * })
     * 
     */
    create<T extends StatusCreateArgs>(args: SelectSubset<T, StatusCreateArgs<ExtArgs>>): Prisma__StatusClient<$Result.GetResult<Prisma.$StatusPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Statuses.
     * @param {StatusCreateManyArgs} args - Arguments to create many Statuses.
     * @example
     * // Create many Statuses
     * const status = await prisma.status.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StatusCreateManyArgs>(args?: SelectSubset<T, StatusCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Statuses and returns the data saved in the database.
     * @param {StatusCreateManyAndReturnArgs} args - Arguments to create many Statuses.
     * @example
     * // Create many Statuses
     * const status = await prisma.status.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Statuses and only return the `id`
     * const statusWithIdOnly = await prisma.status.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StatusCreateManyAndReturnArgs>(args?: SelectSubset<T, StatusCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StatusPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Status.
     * @param {StatusDeleteArgs} args - Arguments to delete one Status.
     * @example
     * // Delete one Status
     * const Status = await prisma.status.delete({
     *   where: {
     *     // ... filter to delete one Status
     *   }
     * })
     * 
     */
    delete<T extends StatusDeleteArgs>(args: SelectSubset<T, StatusDeleteArgs<ExtArgs>>): Prisma__StatusClient<$Result.GetResult<Prisma.$StatusPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Status.
     * @param {StatusUpdateArgs} args - Arguments to update one Status.
     * @example
     * // Update one Status
     * const status = await prisma.status.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StatusUpdateArgs>(args: SelectSubset<T, StatusUpdateArgs<ExtArgs>>): Prisma__StatusClient<$Result.GetResult<Prisma.$StatusPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Statuses.
     * @param {StatusDeleteManyArgs} args - Arguments to filter Statuses to delete.
     * @example
     * // Delete a few Statuses
     * const { count } = await prisma.status.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StatusDeleteManyArgs>(args?: SelectSubset<T, StatusDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Statuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Statuses
     * const status = await prisma.status.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StatusUpdateManyArgs>(args: SelectSubset<T, StatusUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Statuses and returns the data updated in the database.
     * @param {StatusUpdateManyAndReturnArgs} args - Arguments to update many Statuses.
     * @example
     * // Update many Statuses
     * const status = await prisma.status.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Statuses and only return the `id`
     * const statusWithIdOnly = await prisma.status.updateManyAndReturn({
     *   select: { id: true },
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
    updateManyAndReturn<T extends StatusUpdateManyAndReturnArgs>(args: SelectSubset<T, StatusUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StatusPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Status.
     * @param {StatusUpsertArgs} args - Arguments to update or create a Status.
     * @example
     * // Update or create a Status
     * const status = await prisma.status.upsert({
     *   create: {
     *     // ... data to create a Status
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Status we want to update
     *   }
     * })
     */
    upsert<T extends StatusUpsertArgs>(args: SelectSubset<T, StatusUpsertArgs<ExtArgs>>): Prisma__StatusClient<$Result.GetResult<Prisma.$StatusPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Statuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusCountArgs} args - Arguments to filter Statuses to count.
     * @example
     * // Count the number of Statuses
     * const count = await prisma.status.count({
     *   where: {
     *     // ... the filter for the Statuses we want to count
     *   }
     * })
    **/
    count<T extends StatusCountArgs>(
      args?: Subset<T, StatusCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StatusCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Status.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StatusAggregateArgs>(args: Subset<T, StatusAggregateArgs>): Prisma.PrismaPromise<GetStatusAggregateType<T>>

    /**
     * Group by Status.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusGroupByArgs} args - Group by arguments.
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
      T extends StatusGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StatusGroupByArgs['orderBy'] }
        : { orderBy?: StatusGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StatusGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStatusGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Status model
   */
  readonly fields: StatusFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Status.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StatusClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    columns<T extends Status$columnsArgs<ExtArgs> = {}>(args?: Subset<T, Status$columnsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Status model
   */
  interface StatusFieldRefs {
    readonly id: FieldRef<"Status", 'String'>
    readonly name: FieldRef<"Status", 'String'>
    readonly color: FieldRef<"Status", 'String'>
    readonly order: FieldRef<"Status", 'Int'>
    readonly isDefault: FieldRef<"Status", 'Boolean'>
    readonly tenantId: FieldRef<"Status", 'String'>
    readonly createdAt: FieldRef<"Status", 'DateTime'>
    readonly updatedAt: FieldRef<"Status", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Status findUnique
   */
  export type StatusFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Status
     */
    select?: StatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Status
     */
    omit?: StatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusInclude<ExtArgs> | null
    /**
     * Filter, which Status to fetch.
     */
    where: StatusWhereUniqueInput
  }

  /**
   * Status findUniqueOrThrow
   */
  export type StatusFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Status
     */
    select?: StatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Status
     */
    omit?: StatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusInclude<ExtArgs> | null
    /**
     * Filter, which Status to fetch.
     */
    where: StatusWhereUniqueInput
  }

  /**
   * Status findFirst
   */
  export type StatusFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Status
     */
    select?: StatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Status
     */
    omit?: StatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusInclude<ExtArgs> | null
    /**
     * Filter, which Status to fetch.
     */
    where?: StatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Statuses to fetch.
     */
    orderBy?: StatusOrderByWithRelationInput | StatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Statuses.
     */
    cursor?: StatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Statuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Statuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Statuses.
     */
    distinct?: StatusScalarFieldEnum | StatusScalarFieldEnum[]
  }

  /**
   * Status findFirstOrThrow
   */
  export type StatusFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Status
     */
    select?: StatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Status
     */
    omit?: StatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusInclude<ExtArgs> | null
    /**
     * Filter, which Status to fetch.
     */
    where?: StatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Statuses to fetch.
     */
    orderBy?: StatusOrderByWithRelationInput | StatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Statuses.
     */
    cursor?: StatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Statuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Statuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Statuses.
     */
    distinct?: StatusScalarFieldEnum | StatusScalarFieldEnum[]
  }

  /**
   * Status findMany
   */
  export type StatusFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Status
     */
    select?: StatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Status
     */
    omit?: StatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusInclude<ExtArgs> | null
    /**
     * Filter, which Statuses to fetch.
     */
    where?: StatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Statuses to fetch.
     */
    orderBy?: StatusOrderByWithRelationInput | StatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Statuses.
     */
    cursor?: StatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Statuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Statuses.
     */
    skip?: number
    distinct?: StatusScalarFieldEnum | StatusScalarFieldEnum[]
  }

  /**
   * Status create
   */
  export type StatusCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Status
     */
    select?: StatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Status
     */
    omit?: StatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusInclude<ExtArgs> | null
    /**
     * The data needed to create a Status.
     */
    data: XOR<StatusCreateInput, StatusUncheckedCreateInput>
  }

  /**
   * Status createMany
   */
  export type StatusCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Statuses.
     */
    data: StatusCreateManyInput | StatusCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Status createManyAndReturn
   */
  export type StatusCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Status
     */
    select?: StatusSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Status
     */
    omit?: StatusOmit<ExtArgs> | null
    /**
     * The data used to create many Statuses.
     */
    data: StatusCreateManyInput | StatusCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Status update
   */
  export type StatusUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Status
     */
    select?: StatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Status
     */
    omit?: StatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusInclude<ExtArgs> | null
    /**
     * The data needed to update a Status.
     */
    data: XOR<StatusUpdateInput, StatusUncheckedUpdateInput>
    /**
     * Choose, which Status to update.
     */
    where: StatusWhereUniqueInput
  }

  /**
   * Status updateMany
   */
  export type StatusUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Statuses.
     */
    data: XOR<StatusUpdateManyMutationInput, StatusUncheckedUpdateManyInput>
    /**
     * Filter which Statuses to update
     */
    where?: StatusWhereInput
    /**
     * Limit how many Statuses to update.
     */
    limit?: number
  }

  /**
   * Status updateManyAndReturn
   */
  export type StatusUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Status
     */
    select?: StatusSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Status
     */
    omit?: StatusOmit<ExtArgs> | null
    /**
     * The data used to update Statuses.
     */
    data: XOR<StatusUpdateManyMutationInput, StatusUncheckedUpdateManyInput>
    /**
     * Filter which Statuses to update
     */
    where?: StatusWhereInput
    /**
     * Limit how many Statuses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Status upsert
   */
  export type StatusUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Status
     */
    select?: StatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Status
     */
    omit?: StatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusInclude<ExtArgs> | null
    /**
     * The filter to search for the Status to update in case it exists.
     */
    where: StatusWhereUniqueInput
    /**
     * In case the Status found by the `where` argument doesn't exist, create a new Status with this data.
     */
    create: XOR<StatusCreateInput, StatusUncheckedCreateInput>
    /**
     * In case the Status was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StatusUpdateInput, StatusUncheckedUpdateInput>
  }

  /**
   * Status delete
   */
  export type StatusDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Status
     */
    select?: StatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Status
     */
    omit?: StatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusInclude<ExtArgs> | null
    /**
     * Filter which Status to delete.
     */
    where: StatusWhereUniqueInput
  }

  /**
   * Status deleteMany
   */
  export type StatusDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Statuses to delete
     */
    where?: StatusWhereInput
    /**
     * Limit how many Statuses to delete.
     */
    limit?: number
  }

  /**
   * Status.columns
   */
  export type Status$columnsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnInclude<ExtArgs> | null
    where?: ColumnWhereInput
    orderBy?: ColumnOrderByWithRelationInput | ColumnOrderByWithRelationInput[]
    cursor?: ColumnWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ColumnScalarFieldEnum | ColumnScalarFieldEnum[]
  }

  /**
   * Status without action
   */
  export type StatusDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Status
     */
    select?: StatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Status
     */
    omit?: StatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusInclude<ExtArgs> | null
  }


  /**
   * Model Tenant
   */

  export type AggregateTenant = {
    _count: TenantCountAggregateOutputType | null
    _min: TenantMinAggregateOutputType | null
    _max: TenantMaxAggregateOutputType | null
  }

  export type TenantMinAggregateOutputType = {
    id: string | null
    name: string | null
    avatar: string | null
    createdAt: Date | null
  }

  export type TenantMaxAggregateOutputType = {
    id: string | null
    name: string | null
    avatar: string | null
    createdAt: Date | null
  }

  export type TenantCountAggregateOutputType = {
    id: number
    name: number
    avatar: number
    createdAt: number
    _all: number
  }


  export type TenantMinAggregateInputType = {
    id?: true
    name?: true
    avatar?: true
    createdAt?: true
  }

  export type TenantMaxAggregateInputType = {
    id?: true
    name?: true
    avatar?: true
    createdAt?: true
  }

  export type TenantCountAggregateInputType = {
    id?: true
    name?: true
    avatar?: true
    createdAt?: true
    _all?: true
  }

  export type TenantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tenant to aggregate.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tenants
    **/
    _count?: true | TenantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TenantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TenantMaxAggregateInputType
  }

  export type GetTenantAggregateType<T extends TenantAggregateArgs> = {
        [P in keyof T & keyof AggregateTenant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTenant[P]>
      : GetScalarType<T[P], AggregateTenant[P]>
  }




  export type TenantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TenantWhereInput
    orderBy?: TenantOrderByWithAggregationInput | TenantOrderByWithAggregationInput[]
    by: TenantScalarFieldEnum[] | TenantScalarFieldEnum
    having?: TenantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TenantCountAggregateInputType | true
    _min?: TenantMinAggregateInputType
    _max?: TenantMaxAggregateInputType
  }

  export type TenantGroupByOutputType = {
    id: string
    name: string
    avatar: string | null
    createdAt: Date
    _count: TenantCountAggregateOutputType | null
    _min: TenantMinAggregateOutputType | null
    _max: TenantMaxAggregateOutputType | null
  }

  type GetTenantGroupByPayload<T extends TenantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TenantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TenantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TenantGroupByOutputType[P]>
            : GetScalarType<T[P], TenantGroupByOutputType[P]>
        }
      >
    >


  export type TenantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    avatar?: boolean
    createdAt?: boolean
    users?: boolean | Tenant$usersArgs<ExtArgs>
    departments?: boolean | Tenant$departmentsArgs<ExtArgs>
    tickets?: boolean | Tenant$ticketsArgs<ExtArgs>
    columns?: boolean | Tenant$columnsArgs<ExtArgs>
    slas?: boolean | Tenant$slasArgs<ExtArgs>
    workflows?: boolean | Tenant$workflowsArgs<ExtArgs>
    priorities?: boolean | Tenant$prioritiesArgs<ExtArgs>
    statuses?: boolean | Tenant$statusesArgs<ExtArgs>
    _count?: boolean | TenantCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tenant"]>

  export type TenantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    avatar?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["tenant"]>

  export type TenantSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    avatar?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["tenant"]>

  export type TenantSelectScalar = {
    id?: boolean
    name?: boolean
    avatar?: boolean
    createdAt?: boolean
  }

  export type TenantOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "avatar" | "createdAt", ExtArgs["result"]["tenant"]>
  export type TenantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Tenant$usersArgs<ExtArgs>
    departments?: boolean | Tenant$departmentsArgs<ExtArgs>
    tickets?: boolean | Tenant$ticketsArgs<ExtArgs>
    columns?: boolean | Tenant$columnsArgs<ExtArgs>
    slas?: boolean | Tenant$slasArgs<ExtArgs>
    workflows?: boolean | Tenant$workflowsArgs<ExtArgs>
    priorities?: boolean | Tenant$prioritiesArgs<ExtArgs>
    statuses?: boolean | Tenant$statusesArgs<ExtArgs>
    _count?: boolean | TenantCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TenantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TenantIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TenantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tenant"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
      departments: Prisma.$DepartmentPayload<ExtArgs>[]
      tickets: Prisma.$TicketPayload<ExtArgs>[]
      columns: Prisma.$ColumnPayload<ExtArgs>[]
      slas: Prisma.$SLAPayload<ExtArgs>[]
      workflows: Prisma.$WorkflowPayload<ExtArgs>[]
      priorities: Prisma.$PriorityPayload<ExtArgs>[]
      statuses: Prisma.$StatusPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      avatar: string | null
      createdAt: Date
    }, ExtArgs["result"]["tenant"]>
    composites: {}
  }

  type TenantGetPayload<S extends boolean | null | undefined | TenantDefaultArgs> = $Result.GetResult<Prisma.$TenantPayload, S>

  type TenantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TenantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TenantCountAggregateInputType | true
    }

  export interface TenantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tenant'], meta: { name: 'Tenant' } }
    /**
     * Find zero or one Tenant that matches the filter.
     * @param {TenantFindUniqueArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TenantFindUniqueArgs>(args: SelectSubset<T, TenantFindUniqueArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tenant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TenantFindUniqueOrThrowArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TenantFindUniqueOrThrowArgs>(args: SelectSubset<T, TenantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tenant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindFirstArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TenantFindFirstArgs>(args?: SelectSubset<T, TenantFindFirstArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tenant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindFirstOrThrowArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TenantFindFirstOrThrowArgs>(args?: SelectSubset<T, TenantFindFirstOrThrowArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tenants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tenants
     * const tenants = await prisma.tenant.findMany()
     * 
     * // Get first 10 Tenants
     * const tenants = await prisma.tenant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tenantWithIdOnly = await prisma.tenant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TenantFindManyArgs>(args?: SelectSubset<T, TenantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tenant.
     * @param {TenantCreateArgs} args - Arguments to create a Tenant.
     * @example
     * // Create one Tenant
     * const Tenant = await prisma.tenant.create({
     *   data: {
     *     // ... data to create a Tenant
     *   }
     * })
     * 
     */
    create<T extends TenantCreateArgs>(args: SelectSubset<T, TenantCreateArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tenants.
     * @param {TenantCreateManyArgs} args - Arguments to create many Tenants.
     * @example
     * // Create many Tenants
     * const tenant = await prisma.tenant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TenantCreateManyArgs>(args?: SelectSubset<T, TenantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tenants and returns the data saved in the database.
     * @param {TenantCreateManyAndReturnArgs} args - Arguments to create many Tenants.
     * @example
     * // Create many Tenants
     * const tenant = await prisma.tenant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tenants and only return the `id`
     * const tenantWithIdOnly = await prisma.tenant.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TenantCreateManyAndReturnArgs>(args?: SelectSubset<T, TenantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tenant.
     * @param {TenantDeleteArgs} args - Arguments to delete one Tenant.
     * @example
     * // Delete one Tenant
     * const Tenant = await prisma.tenant.delete({
     *   where: {
     *     // ... filter to delete one Tenant
     *   }
     * })
     * 
     */
    delete<T extends TenantDeleteArgs>(args: SelectSubset<T, TenantDeleteArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tenant.
     * @param {TenantUpdateArgs} args - Arguments to update one Tenant.
     * @example
     * // Update one Tenant
     * const tenant = await prisma.tenant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TenantUpdateArgs>(args: SelectSubset<T, TenantUpdateArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tenants.
     * @param {TenantDeleteManyArgs} args - Arguments to filter Tenants to delete.
     * @example
     * // Delete a few Tenants
     * const { count } = await prisma.tenant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TenantDeleteManyArgs>(args?: SelectSubset<T, TenantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tenants
     * const tenant = await prisma.tenant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TenantUpdateManyArgs>(args: SelectSubset<T, TenantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tenants and returns the data updated in the database.
     * @param {TenantUpdateManyAndReturnArgs} args - Arguments to update many Tenants.
     * @example
     * // Update many Tenants
     * const tenant = await prisma.tenant.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tenants and only return the `id`
     * const tenantWithIdOnly = await prisma.tenant.updateManyAndReturn({
     *   select: { id: true },
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
    updateManyAndReturn<T extends TenantUpdateManyAndReturnArgs>(args: SelectSubset<T, TenantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tenant.
     * @param {TenantUpsertArgs} args - Arguments to update or create a Tenant.
     * @example
     * // Update or create a Tenant
     * const tenant = await prisma.tenant.upsert({
     *   create: {
     *     // ... data to create a Tenant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tenant we want to update
     *   }
     * })
     */
    upsert<T extends TenantUpsertArgs>(args: SelectSubset<T, TenantUpsertArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantCountArgs} args - Arguments to filter Tenants to count.
     * @example
     * // Count the number of Tenants
     * const count = await prisma.tenant.count({
     *   where: {
     *     // ... the filter for the Tenants we want to count
     *   }
     * })
    **/
    count<T extends TenantCountArgs>(
      args?: Subset<T, TenantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TenantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tenant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TenantAggregateArgs>(args: Subset<T, TenantAggregateArgs>): Prisma.PrismaPromise<GetTenantAggregateType<T>>

    /**
     * Group by Tenant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantGroupByArgs} args - Group by arguments.
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
      T extends TenantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TenantGroupByArgs['orderBy'] }
        : { orderBy?: TenantGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TenantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTenantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tenant model
   */
  readonly fields: TenantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tenant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TenantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Tenant$usersArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    departments<T extends Tenant$departmentsArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$departmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tickets<T extends Tenant$ticketsArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$ticketsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    columns<T extends Tenant$columnsArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$columnsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    slas<T extends Tenant$slasArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$slasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SLAPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    workflows<T extends Tenant$workflowsArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$workflowsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    priorities<T extends Tenant$prioritiesArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$prioritiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PriorityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    statuses<T extends Tenant$statusesArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$statusesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StatusPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Tenant model
   */
  interface TenantFieldRefs {
    readonly id: FieldRef<"Tenant", 'String'>
    readonly name: FieldRef<"Tenant", 'String'>
    readonly avatar: FieldRef<"Tenant", 'String'>
    readonly createdAt: FieldRef<"Tenant", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Tenant findUnique
   */
  export type TenantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant findUniqueOrThrow
   */
  export type TenantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant findFirst
   */
  export type TenantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tenants.
     */
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Tenant findFirstOrThrow
   */
  export type TenantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tenants.
     */
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Tenant findMany
   */
  export type TenantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenants to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Tenant create
   */
  export type TenantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The data needed to create a Tenant.
     */
    data: XOR<TenantCreateInput, TenantUncheckedCreateInput>
  }

  /**
   * Tenant createMany
   */
  export type TenantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tenants.
     */
    data: TenantCreateManyInput | TenantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tenant createManyAndReturn
   */
  export type TenantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * The data used to create many Tenants.
     */
    data: TenantCreateManyInput | TenantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tenant update
   */
  export type TenantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The data needed to update a Tenant.
     */
    data: XOR<TenantUpdateInput, TenantUncheckedUpdateInput>
    /**
     * Choose, which Tenant to update.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant updateMany
   */
  export type TenantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tenants.
     */
    data: XOR<TenantUpdateManyMutationInput, TenantUncheckedUpdateManyInput>
    /**
     * Filter which Tenants to update
     */
    where?: TenantWhereInput
    /**
     * Limit how many Tenants to update.
     */
    limit?: number
  }

  /**
   * Tenant updateManyAndReturn
   */
  export type TenantUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * The data used to update Tenants.
     */
    data: XOR<TenantUpdateManyMutationInput, TenantUncheckedUpdateManyInput>
    /**
     * Filter which Tenants to update
     */
    where?: TenantWhereInput
    /**
     * Limit how many Tenants to update.
     */
    limit?: number
  }

  /**
   * Tenant upsert
   */
  export type TenantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The filter to search for the Tenant to update in case it exists.
     */
    where: TenantWhereUniqueInput
    /**
     * In case the Tenant found by the `where` argument doesn't exist, create a new Tenant with this data.
     */
    create: XOR<TenantCreateInput, TenantUncheckedCreateInput>
    /**
     * In case the Tenant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TenantUpdateInput, TenantUncheckedUpdateInput>
  }

  /**
   * Tenant delete
   */
  export type TenantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter which Tenant to delete.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant deleteMany
   */
  export type TenantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tenants to delete
     */
    where?: TenantWhereInput
    /**
     * Limit how many Tenants to delete.
     */
    limit?: number
  }

  /**
   * Tenant.users
   */
  export type Tenant$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Tenant.departments
   */
  export type Tenant$departmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    where?: DepartmentWhereInput
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    cursor?: DepartmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DepartmentScalarFieldEnum | DepartmentScalarFieldEnum[]
  }

  /**
   * Tenant.tickets
   */
  export type Tenant$ticketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    where?: TicketWhereInput
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    cursor?: TicketWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }

  /**
   * Tenant.columns
   */
  export type Tenant$columnsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnInclude<ExtArgs> | null
    where?: ColumnWhereInput
    orderBy?: ColumnOrderByWithRelationInput | ColumnOrderByWithRelationInput[]
    cursor?: ColumnWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ColumnScalarFieldEnum | ColumnScalarFieldEnum[]
  }

  /**
   * Tenant.slas
   */
  export type Tenant$slasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SLA
     */
    select?: SLASelect<ExtArgs> | null
    /**
     * Omit specific fields from the SLA
     */
    omit?: SLAOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SLAInclude<ExtArgs> | null
    where?: SLAWhereInput
    orderBy?: SLAOrderByWithRelationInput | SLAOrderByWithRelationInput[]
    cursor?: SLAWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SLAScalarFieldEnum | SLAScalarFieldEnum[]
  }

  /**
   * Tenant.workflows
   */
  export type Tenant$workflowsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workflow
     */
    omit?: WorkflowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowInclude<ExtArgs> | null
    where?: WorkflowWhereInput
    orderBy?: WorkflowOrderByWithRelationInput | WorkflowOrderByWithRelationInput[]
    cursor?: WorkflowWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkflowScalarFieldEnum | WorkflowScalarFieldEnum[]
  }

  /**
   * Tenant.priorities
   */
  export type Tenant$prioritiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Priority
     */
    select?: PrioritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Priority
     */
    omit?: PriorityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriorityInclude<ExtArgs> | null
    where?: PriorityWhereInput
    orderBy?: PriorityOrderByWithRelationInput | PriorityOrderByWithRelationInput[]
    cursor?: PriorityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PriorityScalarFieldEnum | PriorityScalarFieldEnum[]
  }

  /**
   * Tenant.statuses
   */
  export type Tenant$statusesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Status
     */
    select?: StatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Status
     */
    omit?: StatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusInclude<ExtArgs> | null
    where?: StatusWhereInput
    orderBy?: StatusOrderByWithRelationInput | StatusOrderByWithRelationInput[]
    cursor?: StatusWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StatusScalarFieldEnum | StatusScalarFieldEnum[]
  }

  /**
   * Tenant without action
   */
  export type TenantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    username: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.UserRole | null
    isActive: boolean | null
    avatar: string | null
    createdAt: Date | null
    deletedAt: Date | null
    refreshToken: string | null
    resetPasswordToken: string | null
    resetPasswordTokenExpiry: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    username: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.UserRole | null
    isActive: boolean | null
    avatar: string | null
    createdAt: Date | null
    deletedAt: Date | null
    refreshToken: string | null
    resetPasswordToken: string | null
    resetPasswordTokenExpiry: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    tenantId: number
    username: number
    email: number
    passwordHash: number
    role: number
    isActive: number
    avatar: number
    createdAt: number
    deletedAt: number
    refreshToken: number
    resetPasswordToken: number
    resetPasswordTokenExpiry: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    tenantId?: true
    username?: true
    email?: true
    passwordHash?: true
    role?: true
    isActive?: true
    avatar?: true
    createdAt?: true
    deletedAt?: true
    refreshToken?: true
    resetPasswordToken?: true
    resetPasswordTokenExpiry?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    tenantId?: true
    username?: true
    email?: true
    passwordHash?: true
    role?: true
    isActive?: true
    avatar?: true
    createdAt?: true
    deletedAt?: true
    refreshToken?: true
    resetPasswordToken?: true
    resetPasswordTokenExpiry?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    tenantId?: true
    username?: true
    email?: true
    passwordHash?: true
    role?: true
    isActive?: true
    avatar?: true
    createdAt?: true
    deletedAt?: true
    refreshToken?: true
    resetPasswordToken?: true
    resetPasswordTokenExpiry?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    tenantId: string
    username: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    isActive: boolean
    avatar: string | null
    createdAt: Date
    deletedAt: Date | null
    refreshToken: string | null
    resetPasswordToken: string | null
    resetPasswordTokenExpiry: Date | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    username?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    isActive?: boolean
    avatar?: boolean
    createdAt?: boolean
    deletedAt?: boolean
    refreshToken?: boolean
    resetPasswordToken?: boolean
    resetPasswordTokenExpiry?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    ticketsCreated?: boolean | User$ticketsCreatedArgs<ExtArgs>
    ticketsAssigned?: boolean | User$ticketsAssignedArgs<ExtArgs>
    comments?: boolean | User$commentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    username?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    isActive?: boolean
    avatar?: boolean
    createdAt?: boolean
    deletedAt?: boolean
    refreshToken?: boolean
    resetPasswordToken?: boolean
    resetPasswordTokenExpiry?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    username?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    isActive?: boolean
    avatar?: boolean
    createdAt?: boolean
    deletedAt?: boolean
    refreshToken?: boolean
    resetPasswordToken?: boolean
    resetPasswordTokenExpiry?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    tenantId?: boolean
    username?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    isActive?: boolean
    avatar?: boolean
    createdAt?: boolean
    deletedAt?: boolean
    refreshToken?: boolean
    resetPasswordToken?: boolean
    resetPasswordTokenExpiry?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "username" | "email" | "passwordHash" | "role" | "isActive" | "avatar" | "createdAt" | "deletedAt" | "refreshToken" | "resetPasswordToken" | "resetPasswordTokenExpiry", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    ticketsCreated?: boolean | User$ticketsCreatedArgs<ExtArgs>
    ticketsAssigned?: boolean | User$ticketsAssignedArgs<ExtArgs>
    comments?: boolean | User$commentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs>
      ticketsCreated: Prisma.$TicketPayload<ExtArgs>[]
      ticketsAssigned: Prisma.$TicketPayload<ExtArgs>[]
      comments: Prisma.$TicketCommentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      username: string
      email: string
      passwordHash: string
      role: $Enums.UserRole
      isActive: boolean
      avatar: string | null
      createdAt: Date
      deletedAt: Date | null
      refreshToken: string | null
      resetPasswordToken: string | null
      resetPasswordTokenExpiry: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    ticketsCreated<T extends User$ticketsCreatedArgs<ExtArgs> = {}>(args?: Subset<T, User$ticketsCreatedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ticketsAssigned<T extends User$ticketsAssignedArgs<ExtArgs> = {}>(args?: Subset<T, User$ticketsAssignedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    comments<T extends User$commentsArgs<ExtArgs> = {}>(args?: Subset<T, User$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketCommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly tenantId: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly avatar: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly deletedAt: FieldRef<"User", 'DateTime'>
    readonly refreshToken: FieldRef<"User", 'String'>
    readonly resetPasswordToken: FieldRef<"User", 'String'>
    readonly resetPasswordTokenExpiry: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.ticketsCreated
   */
  export type User$ticketsCreatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    where?: TicketWhereInput
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    cursor?: TicketWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }

  /**
   * User.ticketsAssigned
   */
  export type User$ticketsAssignedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    where?: TicketWhereInput
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    cursor?: TicketWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }

  /**
   * User.comments
   */
  export type User$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketComment
     */
    select?: TicketCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketComment
     */
    omit?: TicketCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketCommentInclude<ExtArgs> | null
    where?: TicketCommentWhereInput
    orderBy?: TicketCommentOrderByWithRelationInput | TicketCommentOrderByWithRelationInput[]
    cursor?: TicketCommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TicketCommentScalarFieldEnum | TicketCommentScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Department
   */

  export type AggregateDepartment = {
    _count: DepartmentCountAggregateOutputType | null
    _min: DepartmentMinAggregateOutputType | null
    _max: DepartmentMaxAggregateOutputType | null
  }

  export type DepartmentMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DepartmentMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DepartmentCountAggregateOutputType = {
    id: number
    tenantId: number
    name: number
    description: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DepartmentMinAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DepartmentMaxAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DepartmentCountAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DepartmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Department to aggregate.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Departments
    **/
    _count?: true | DepartmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DepartmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DepartmentMaxAggregateInputType
  }

  export type GetDepartmentAggregateType<T extends DepartmentAggregateArgs> = {
        [P in keyof T & keyof AggregateDepartment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDepartment[P]>
      : GetScalarType<T[P], AggregateDepartment[P]>
  }




  export type DepartmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DepartmentWhereInput
    orderBy?: DepartmentOrderByWithAggregationInput | DepartmentOrderByWithAggregationInput[]
    by: DepartmentScalarFieldEnum[] | DepartmentScalarFieldEnum
    having?: DepartmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DepartmentCountAggregateInputType | true
    _min?: DepartmentMinAggregateInputType
    _max?: DepartmentMaxAggregateInputType
  }

  export type DepartmentGroupByOutputType = {
    id: string
    tenantId: string
    name: string
    description: string | null
    createdAt: Date
    updatedAt: Date
    _count: DepartmentCountAggregateOutputType | null
    _min: DepartmentMinAggregateOutputType | null
    _max: DepartmentMaxAggregateOutputType | null
  }

  type GetDepartmentGroupByPayload<T extends DepartmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DepartmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DepartmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DepartmentGroupByOutputType[P]>
            : GetScalarType<T[P], DepartmentGroupByOutputType[P]>
        }
      >
    >


  export type DepartmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    tickets?: boolean | Department$ticketsArgs<ExtArgs>
    _count?: boolean | DepartmentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["department"]>

  export type DepartmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["department"]>

  export type DepartmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["department"]>

  export type DepartmentSelectScalar = {
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DepartmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "name" | "description" | "createdAt" | "updatedAt", ExtArgs["result"]["department"]>
  export type DepartmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    tickets?: boolean | Department$ticketsArgs<ExtArgs>
    _count?: boolean | DepartmentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DepartmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type DepartmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }

  export type $DepartmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Department"
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs>
      tickets: Prisma.$TicketPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      name: string
      description: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["department"]>
    composites: {}
  }

  type DepartmentGetPayload<S extends boolean | null | undefined | DepartmentDefaultArgs> = $Result.GetResult<Prisma.$DepartmentPayload, S>

  type DepartmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DepartmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DepartmentCountAggregateInputType | true
    }

  export interface DepartmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Department'], meta: { name: 'Department' } }
    /**
     * Find zero or one Department that matches the filter.
     * @param {DepartmentFindUniqueArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DepartmentFindUniqueArgs>(args: SelectSubset<T, DepartmentFindUniqueArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Department that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DepartmentFindUniqueOrThrowArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DepartmentFindUniqueOrThrowArgs>(args: SelectSubset<T, DepartmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Department that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentFindFirstArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DepartmentFindFirstArgs>(args?: SelectSubset<T, DepartmentFindFirstArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Department that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentFindFirstOrThrowArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DepartmentFindFirstOrThrowArgs>(args?: SelectSubset<T, DepartmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Departments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Departments
     * const departments = await prisma.department.findMany()
     * 
     * // Get first 10 Departments
     * const departments = await prisma.department.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const departmentWithIdOnly = await prisma.department.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DepartmentFindManyArgs>(args?: SelectSubset<T, DepartmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Department.
     * @param {DepartmentCreateArgs} args - Arguments to create a Department.
     * @example
     * // Create one Department
     * const Department = await prisma.department.create({
     *   data: {
     *     // ... data to create a Department
     *   }
     * })
     * 
     */
    create<T extends DepartmentCreateArgs>(args: SelectSubset<T, DepartmentCreateArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Departments.
     * @param {DepartmentCreateManyArgs} args - Arguments to create many Departments.
     * @example
     * // Create many Departments
     * const department = await prisma.department.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DepartmentCreateManyArgs>(args?: SelectSubset<T, DepartmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Departments and returns the data saved in the database.
     * @param {DepartmentCreateManyAndReturnArgs} args - Arguments to create many Departments.
     * @example
     * // Create many Departments
     * const department = await prisma.department.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Departments and only return the `id`
     * const departmentWithIdOnly = await prisma.department.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DepartmentCreateManyAndReturnArgs>(args?: SelectSubset<T, DepartmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Department.
     * @param {DepartmentDeleteArgs} args - Arguments to delete one Department.
     * @example
     * // Delete one Department
     * const Department = await prisma.department.delete({
     *   where: {
     *     // ... filter to delete one Department
     *   }
     * })
     * 
     */
    delete<T extends DepartmentDeleteArgs>(args: SelectSubset<T, DepartmentDeleteArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Department.
     * @param {DepartmentUpdateArgs} args - Arguments to update one Department.
     * @example
     * // Update one Department
     * const department = await prisma.department.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DepartmentUpdateArgs>(args: SelectSubset<T, DepartmentUpdateArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Departments.
     * @param {DepartmentDeleteManyArgs} args - Arguments to filter Departments to delete.
     * @example
     * // Delete a few Departments
     * const { count } = await prisma.department.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DepartmentDeleteManyArgs>(args?: SelectSubset<T, DepartmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Departments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Departments
     * const department = await prisma.department.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DepartmentUpdateManyArgs>(args: SelectSubset<T, DepartmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Departments and returns the data updated in the database.
     * @param {DepartmentUpdateManyAndReturnArgs} args - Arguments to update many Departments.
     * @example
     * // Update many Departments
     * const department = await prisma.department.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Departments and only return the `id`
     * const departmentWithIdOnly = await prisma.department.updateManyAndReturn({
     *   select: { id: true },
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
    updateManyAndReturn<T extends DepartmentUpdateManyAndReturnArgs>(args: SelectSubset<T, DepartmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Department.
     * @param {DepartmentUpsertArgs} args - Arguments to update or create a Department.
     * @example
     * // Update or create a Department
     * const department = await prisma.department.upsert({
     *   create: {
     *     // ... data to create a Department
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Department we want to update
     *   }
     * })
     */
    upsert<T extends DepartmentUpsertArgs>(args: SelectSubset<T, DepartmentUpsertArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Departments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentCountArgs} args - Arguments to filter Departments to count.
     * @example
     * // Count the number of Departments
     * const count = await prisma.department.count({
     *   where: {
     *     // ... the filter for the Departments we want to count
     *   }
     * })
    **/
    count<T extends DepartmentCountArgs>(
      args?: Subset<T, DepartmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DepartmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Department.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DepartmentAggregateArgs>(args: Subset<T, DepartmentAggregateArgs>): Prisma.PrismaPromise<GetDepartmentAggregateType<T>>

    /**
     * Group by Department.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentGroupByArgs} args - Group by arguments.
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
      T extends DepartmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DepartmentGroupByArgs['orderBy'] }
        : { orderBy?: DepartmentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DepartmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDepartmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Department model
   */
  readonly fields: DepartmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Department.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DepartmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tickets<T extends Department$ticketsArgs<ExtArgs> = {}>(args?: Subset<T, Department$ticketsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Department model
   */
  interface DepartmentFieldRefs {
    readonly id: FieldRef<"Department", 'String'>
    readonly tenantId: FieldRef<"Department", 'String'>
    readonly name: FieldRef<"Department", 'String'>
    readonly description: FieldRef<"Department", 'String'>
    readonly createdAt: FieldRef<"Department", 'DateTime'>
    readonly updatedAt: FieldRef<"Department", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Department findUnique
   */
  export type DepartmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department findUniqueOrThrow
   */
  export type DepartmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department findFirst
   */
  export type DepartmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Departments.
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Departments.
     */
    distinct?: DepartmentScalarFieldEnum | DepartmentScalarFieldEnum[]
  }

  /**
   * Department findFirstOrThrow
   */
  export type DepartmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Departments.
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Departments.
     */
    distinct?: DepartmentScalarFieldEnum | DepartmentScalarFieldEnum[]
  }

  /**
   * Department findMany
   */
  export type DepartmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Departments to fetch.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Departments.
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    distinct?: DepartmentScalarFieldEnum | DepartmentScalarFieldEnum[]
  }

  /**
   * Department create
   */
  export type DepartmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Department.
     */
    data: XOR<DepartmentCreateInput, DepartmentUncheckedCreateInput>
  }

  /**
   * Department createMany
   */
  export type DepartmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Departments.
     */
    data: DepartmentCreateManyInput | DepartmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Department createManyAndReturn
   */
  export type DepartmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * The data used to create many Departments.
     */
    data: DepartmentCreateManyInput | DepartmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Department update
   */
  export type DepartmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Department.
     */
    data: XOR<DepartmentUpdateInput, DepartmentUncheckedUpdateInput>
    /**
     * Choose, which Department to update.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department updateMany
   */
  export type DepartmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Departments.
     */
    data: XOR<DepartmentUpdateManyMutationInput, DepartmentUncheckedUpdateManyInput>
    /**
     * Filter which Departments to update
     */
    where?: DepartmentWhereInput
    /**
     * Limit how many Departments to update.
     */
    limit?: number
  }

  /**
   * Department updateManyAndReturn
   */
  export type DepartmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * The data used to update Departments.
     */
    data: XOR<DepartmentUpdateManyMutationInput, DepartmentUncheckedUpdateManyInput>
    /**
     * Filter which Departments to update
     */
    where?: DepartmentWhereInput
    /**
     * Limit how many Departments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Department upsert
   */
  export type DepartmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Department to update in case it exists.
     */
    where: DepartmentWhereUniqueInput
    /**
     * In case the Department found by the `where` argument doesn't exist, create a new Department with this data.
     */
    create: XOR<DepartmentCreateInput, DepartmentUncheckedCreateInput>
    /**
     * In case the Department was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DepartmentUpdateInput, DepartmentUncheckedUpdateInput>
  }

  /**
   * Department delete
   */
  export type DepartmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter which Department to delete.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department deleteMany
   */
  export type DepartmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Departments to delete
     */
    where?: DepartmentWhereInput
    /**
     * Limit how many Departments to delete.
     */
    limit?: number
  }

  /**
   * Department.tickets
   */
  export type Department$ticketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    where?: TicketWhereInput
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    cursor?: TicketWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }

  /**
   * Department without action
   */
  export type DepartmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
  }


  /**
   * Model Column
   */

  export type AggregateColumn = {
    _count: ColumnCountAggregateOutputType | null
    _avg: ColumnAvgAggregateOutputType | null
    _sum: ColumnSumAggregateOutputType | null
    _min: ColumnMinAggregateOutputType | null
    _max: ColumnMaxAggregateOutputType | null
  }

  export type ColumnAvgAggregateOutputType = {
    order: number | null
  }

  export type ColumnSumAggregateOutputType = {
    order: number | null
  }

  export type ColumnMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    description: string | null
    order: number | null
    color: string | null
    isDefault: boolean | null
    statusId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ColumnMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    description: string | null
    order: number | null
    color: string | null
    isDefault: boolean | null
    statusId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ColumnCountAggregateOutputType = {
    id: number
    tenantId: number
    name: number
    description: number
    order: number
    color: number
    isDefault: number
    statusId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ColumnAvgAggregateInputType = {
    order?: true
  }

  export type ColumnSumAggregateInputType = {
    order?: true
  }

  export type ColumnMinAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    description?: true
    order?: true
    color?: true
    isDefault?: true
    statusId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ColumnMaxAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    description?: true
    order?: true
    color?: true
    isDefault?: true
    statusId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ColumnCountAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    description?: true
    order?: true
    color?: true
    isDefault?: true
    statusId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ColumnAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Column to aggregate.
     */
    where?: ColumnWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Columns to fetch.
     */
    orderBy?: ColumnOrderByWithRelationInput | ColumnOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ColumnWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Columns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Columns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Columns
    **/
    _count?: true | ColumnCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ColumnAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ColumnSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ColumnMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ColumnMaxAggregateInputType
  }

  export type GetColumnAggregateType<T extends ColumnAggregateArgs> = {
        [P in keyof T & keyof AggregateColumn]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateColumn[P]>
      : GetScalarType<T[P], AggregateColumn[P]>
  }




  export type ColumnGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ColumnWhereInput
    orderBy?: ColumnOrderByWithAggregationInput | ColumnOrderByWithAggregationInput[]
    by: ColumnScalarFieldEnum[] | ColumnScalarFieldEnum
    having?: ColumnScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ColumnCountAggregateInputType | true
    _avg?: ColumnAvgAggregateInputType
    _sum?: ColumnSumAggregateInputType
    _min?: ColumnMinAggregateInputType
    _max?: ColumnMaxAggregateInputType
  }

  export type ColumnGroupByOutputType = {
    id: string
    tenantId: string
    name: string
    description: string | null
    order: number
    color: string | null
    isDefault: boolean
    statusId: string | null
    createdAt: Date
    updatedAt: Date
    _count: ColumnCountAggregateOutputType | null
    _avg: ColumnAvgAggregateOutputType | null
    _sum: ColumnSumAggregateOutputType | null
    _min: ColumnMinAggregateOutputType | null
    _max: ColumnMaxAggregateOutputType | null
  }

  type GetColumnGroupByPayload<T extends ColumnGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ColumnGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ColumnGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ColumnGroupByOutputType[P]>
            : GetScalarType<T[P], ColumnGroupByOutputType[P]>
        }
      >
    >


  export type ColumnSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    order?: boolean
    color?: boolean
    isDefault?: boolean
    statusId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    status?: boolean | Column$statusArgs<ExtArgs>
    tickets?: boolean | Column$ticketsArgs<ExtArgs>
    _count?: boolean | ColumnCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["column"]>

  export type ColumnSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    order?: boolean
    color?: boolean
    isDefault?: boolean
    statusId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    status?: boolean | Column$statusArgs<ExtArgs>
  }, ExtArgs["result"]["column"]>

  export type ColumnSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    order?: boolean
    color?: boolean
    isDefault?: boolean
    statusId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    status?: boolean | Column$statusArgs<ExtArgs>
  }, ExtArgs["result"]["column"]>

  export type ColumnSelectScalar = {
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    order?: boolean
    color?: boolean
    isDefault?: boolean
    statusId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ColumnOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "name" | "description" | "order" | "color" | "isDefault" | "statusId" | "createdAt" | "updatedAt", ExtArgs["result"]["column"]>
  export type ColumnInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    status?: boolean | Column$statusArgs<ExtArgs>
    tickets?: boolean | Column$ticketsArgs<ExtArgs>
    _count?: boolean | ColumnCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ColumnIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    status?: boolean | Column$statusArgs<ExtArgs>
  }
  export type ColumnIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    status?: boolean | Column$statusArgs<ExtArgs>
  }

  export type $ColumnPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Column"
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs>
      status: Prisma.$StatusPayload<ExtArgs> | null
      tickets: Prisma.$TicketPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      name: string
      description: string | null
      order: number
      color: string | null
      isDefault: boolean
      statusId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["column"]>
    composites: {}
  }

  type ColumnGetPayload<S extends boolean | null | undefined | ColumnDefaultArgs> = $Result.GetResult<Prisma.$ColumnPayload, S>

  type ColumnCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ColumnFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ColumnCountAggregateInputType | true
    }

  export interface ColumnDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Column'], meta: { name: 'Column' } }
    /**
     * Find zero or one Column that matches the filter.
     * @param {ColumnFindUniqueArgs} args - Arguments to find a Column
     * @example
     * // Get one Column
     * const column = await prisma.column.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ColumnFindUniqueArgs>(args: SelectSubset<T, ColumnFindUniqueArgs<ExtArgs>>): Prisma__ColumnClient<$Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Column that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ColumnFindUniqueOrThrowArgs} args - Arguments to find a Column
     * @example
     * // Get one Column
     * const column = await prisma.column.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ColumnFindUniqueOrThrowArgs>(args: SelectSubset<T, ColumnFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ColumnClient<$Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Column that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColumnFindFirstArgs} args - Arguments to find a Column
     * @example
     * // Get one Column
     * const column = await prisma.column.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ColumnFindFirstArgs>(args?: SelectSubset<T, ColumnFindFirstArgs<ExtArgs>>): Prisma__ColumnClient<$Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Column that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColumnFindFirstOrThrowArgs} args - Arguments to find a Column
     * @example
     * // Get one Column
     * const column = await prisma.column.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ColumnFindFirstOrThrowArgs>(args?: SelectSubset<T, ColumnFindFirstOrThrowArgs<ExtArgs>>): Prisma__ColumnClient<$Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Columns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColumnFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Columns
     * const columns = await prisma.column.findMany()
     * 
     * // Get first 10 Columns
     * const columns = await prisma.column.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const columnWithIdOnly = await prisma.column.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ColumnFindManyArgs>(args?: SelectSubset<T, ColumnFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Column.
     * @param {ColumnCreateArgs} args - Arguments to create a Column.
     * @example
     * // Create one Column
     * const Column = await prisma.column.create({
     *   data: {
     *     // ... data to create a Column
     *   }
     * })
     * 
     */
    create<T extends ColumnCreateArgs>(args: SelectSubset<T, ColumnCreateArgs<ExtArgs>>): Prisma__ColumnClient<$Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Columns.
     * @param {ColumnCreateManyArgs} args - Arguments to create many Columns.
     * @example
     * // Create many Columns
     * const column = await prisma.column.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ColumnCreateManyArgs>(args?: SelectSubset<T, ColumnCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Columns and returns the data saved in the database.
     * @param {ColumnCreateManyAndReturnArgs} args - Arguments to create many Columns.
     * @example
     * // Create many Columns
     * const column = await prisma.column.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Columns and only return the `id`
     * const columnWithIdOnly = await prisma.column.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ColumnCreateManyAndReturnArgs>(args?: SelectSubset<T, ColumnCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Column.
     * @param {ColumnDeleteArgs} args - Arguments to delete one Column.
     * @example
     * // Delete one Column
     * const Column = await prisma.column.delete({
     *   where: {
     *     // ... filter to delete one Column
     *   }
     * })
     * 
     */
    delete<T extends ColumnDeleteArgs>(args: SelectSubset<T, ColumnDeleteArgs<ExtArgs>>): Prisma__ColumnClient<$Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Column.
     * @param {ColumnUpdateArgs} args - Arguments to update one Column.
     * @example
     * // Update one Column
     * const column = await prisma.column.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ColumnUpdateArgs>(args: SelectSubset<T, ColumnUpdateArgs<ExtArgs>>): Prisma__ColumnClient<$Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Columns.
     * @param {ColumnDeleteManyArgs} args - Arguments to filter Columns to delete.
     * @example
     * // Delete a few Columns
     * const { count } = await prisma.column.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ColumnDeleteManyArgs>(args?: SelectSubset<T, ColumnDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Columns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColumnUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Columns
     * const column = await prisma.column.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ColumnUpdateManyArgs>(args: SelectSubset<T, ColumnUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Columns and returns the data updated in the database.
     * @param {ColumnUpdateManyAndReturnArgs} args - Arguments to update many Columns.
     * @example
     * // Update many Columns
     * const column = await prisma.column.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Columns and only return the `id`
     * const columnWithIdOnly = await prisma.column.updateManyAndReturn({
     *   select: { id: true },
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
    updateManyAndReturn<T extends ColumnUpdateManyAndReturnArgs>(args: SelectSubset<T, ColumnUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Column.
     * @param {ColumnUpsertArgs} args - Arguments to update or create a Column.
     * @example
     * // Update or create a Column
     * const column = await prisma.column.upsert({
     *   create: {
     *     // ... data to create a Column
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Column we want to update
     *   }
     * })
     */
    upsert<T extends ColumnUpsertArgs>(args: SelectSubset<T, ColumnUpsertArgs<ExtArgs>>): Prisma__ColumnClient<$Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Columns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColumnCountArgs} args - Arguments to filter Columns to count.
     * @example
     * // Count the number of Columns
     * const count = await prisma.column.count({
     *   where: {
     *     // ... the filter for the Columns we want to count
     *   }
     * })
    **/
    count<T extends ColumnCountArgs>(
      args?: Subset<T, ColumnCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ColumnCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Column.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColumnAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ColumnAggregateArgs>(args: Subset<T, ColumnAggregateArgs>): Prisma.PrismaPromise<GetColumnAggregateType<T>>

    /**
     * Group by Column.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColumnGroupByArgs} args - Group by arguments.
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
      T extends ColumnGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ColumnGroupByArgs['orderBy'] }
        : { orderBy?: ColumnGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ColumnGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetColumnGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Column model
   */
  readonly fields: ColumnFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Column.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ColumnClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    status<T extends Column$statusArgs<ExtArgs> = {}>(args?: Subset<T, Column$statusArgs<ExtArgs>>): Prisma__StatusClient<$Result.GetResult<Prisma.$StatusPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    tickets<T extends Column$ticketsArgs<ExtArgs> = {}>(args?: Subset<T, Column$ticketsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Column model
   */
  interface ColumnFieldRefs {
    readonly id: FieldRef<"Column", 'String'>
    readonly tenantId: FieldRef<"Column", 'String'>
    readonly name: FieldRef<"Column", 'String'>
    readonly description: FieldRef<"Column", 'String'>
    readonly order: FieldRef<"Column", 'Int'>
    readonly color: FieldRef<"Column", 'String'>
    readonly isDefault: FieldRef<"Column", 'Boolean'>
    readonly statusId: FieldRef<"Column", 'String'>
    readonly createdAt: FieldRef<"Column", 'DateTime'>
    readonly updatedAt: FieldRef<"Column", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Column findUnique
   */
  export type ColumnFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnInclude<ExtArgs> | null
    /**
     * Filter, which Column to fetch.
     */
    where: ColumnWhereUniqueInput
  }

  /**
   * Column findUniqueOrThrow
   */
  export type ColumnFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnInclude<ExtArgs> | null
    /**
     * Filter, which Column to fetch.
     */
    where: ColumnWhereUniqueInput
  }

  /**
   * Column findFirst
   */
  export type ColumnFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnInclude<ExtArgs> | null
    /**
     * Filter, which Column to fetch.
     */
    where?: ColumnWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Columns to fetch.
     */
    orderBy?: ColumnOrderByWithRelationInput | ColumnOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Columns.
     */
    cursor?: ColumnWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Columns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Columns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Columns.
     */
    distinct?: ColumnScalarFieldEnum | ColumnScalarFieldEnum[]
  }

  /**
   * Column findFirstOrThrow
   */
  export type ColumnFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnInclude<ExtArgs> | null
    /**
     * Filter, which Column to fetch.
     */
    where?: ColumnWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Columns to fetch.
     */
    orderBy?: ColumnOrderByWithRelationInput | ColumnOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Columns.
     */
    cursor?: ColumnWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Columns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Columns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Columns.
     */
    distinct?: ColumnScalarFieldEnum | ColumnScalarFieldEnum[]
  }

  /**
   * Column findMany
   */
  export type ColumnFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnInclude<ExtArgs> | null
    /**
     * Filter, which Columns to fetch.
     */
    where?: ColumnWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Columns to fetch.
     */
    orderBy?: ColumnOrderByWithRelationInput | ColumnOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Columns.
     */
    cursor?: ColumnWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Columns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Columns.
     */
    skip?: number
    distinct?: ColumnScalarFieldEnum | ColumnScalarFieldEnum[]
  }

  /**
   * Column create
   */
  export type ColumnCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnInclude<ExtArgs> | null
    /**
     * The data needed to create a Column.
     */
    data: XOR<ColumnCreateInput, ColumnUncheckedCreateInput>
  }

  /**
   * Column createMany
   */
  export type ColumnCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Columns.
     */
    data: ColumnCreateManyInput | ColumnCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Column createManyAndReturn
   */
  export type ColumnCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null
    /**
     * The data used to create many Columns.
     */
    data: ColumnCreateManyInput | ColumnCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Column update
   */
  export type ColumnUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnInclude<ExtArgs> | null
    /**
     * The data needed to update a Column.
     */
    data: XOR<ColumnUpdateInput, ColumnUncheckedUpdateInput>
    /**
     * Choose, which Column to update.
     */
    where: ColumnWhereUniqueInput
  }

  /**
   * Column updateMany
   */
  export type ColumnUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Columns.
     */
    data: XOR<ColumnUpdateManyMutationInput, ColumnUncheckedUpdateManyInput>
    /**
     * Filter which Columns to update
     */
    where?: ColumnWhereInput
    /**
     * Limit how many Columns to update.
     */
    limit?: number
  }

  /**
   * Column updateManyAndReturn
   */
  export type ColumnUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null
    /**
     * The data used to update Columns.
     */
    data: XOR<ColumnUpdateManyMutationInput, ColumnUncheckedUpdateManyInput>
    /**
     * Filter which Columns to update
     */
    where?: ColumnWhereInput
    /**
     * Limit how many Columns to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Column upsert
   */
  export type ColumnUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnInclude<ExtArgs> | null
    /**
     * The filter to search for the Column to update in case it exists.
     */
    where: ColumnWhereUniqueInput
    /**
     * In case the Column found by the `where` argument doesn't exist, create a new Column with this data.
     */
    create: XOR<ColumnCreateInput, ColumnUncheckedCreateInput>
    /**
     * In case the Column was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ColumnUpdateInput, ColumnUncheckedUpdateInput>
  }

  /**
   * Column delete
   */
  export type ColumnDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnInclude<ExtArgs> | null
    /**
     * Filter which Column to delete.
     */
    where: ColumnWhereUniqueInput
  }

  /**
   * Column deleteMany
   */
  export type ColumnDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Columns to delete
     */
    where?: ColumnWhereInput
    /**
     * Limit how many Columns to delete.
     */
    limit?: number
  }

  /**
   * Column.status
   */
  export type Column$statusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Status
     */
    select?: StatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Status
     */
    omit?: StatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusInclude<ExtArgs> | null
    where?: StatusWhereInput
  }

  /**
   * Column.tickets
   */
  export type Column$ticketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    where?: TicketWhereInput
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    cursor?: TicketWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }

  /**
   * Column without action
   */
  export type ColumnDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnInclude<ExtArgs> | null
  }


  /**
   * Model Ticket
   */

  export type AggregateTicket = {
    _count: TicketCountAggregateOutputType | null
    _min: TicketMinAggregateOutputType | null
    _max: TicketMaxAggregateOutputType | null
  }

  export type TicketMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    title: string | null
    description: string | null
    status: string | null
    priorityId: string | null
    afterId: string | null
    columnId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    closedAt: Date | null
    deletedAt: Date | null
    creatorId: string | null
    assigneeId: string | null
    departmentId: string | null
  }

  export type TicketMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    title: string | null
    description: string | null
    status: string | null
    priorityId: string | null
    afterId: string | null
    columnId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    closedAt: Date | null
    deletedAt: Date | null
    creatorId: string | null
    assigneeId: string | null
    departmentId: string | null
  }

  export type TicketCountAggregateOutputType = {
    id: number
    tenantId: number
    title: number
    description: number
    status: number
    priorityId: number
    afterId: number
    columnId: number
    createdAt: number
    updatedAt: number
    closedAt: number
    deletedAt: number
    creatorId: number
    assigneeId: number
    departmentId: number
    _all: number
  }


  export type TicketMinAggregateInputType = {
    id?: true
    tenantId?: true
    title?: true
    description?: true
    status?: true
    priorityId?: true
    afterId?: true
    columnId?: true
    createdAt?: true
    updatedAt?: true
    closedAt?: true
    deletedAt?: true
    creatorId?: true
    assigneeId?: true
    departmentId?: true
  }

  export type TicketMaxAggregateInputType = {
    id?: true
    tenantId?: true
    title?: true
    description?: true
    status?: true
    priorityId?: true
    afterId?: true
    columnId?: true
    createdAt?: true
    updatedAt?: true
    closedAt?: true
    deletedAt?: true
    creatorId?: true
    assigneeId?: true
    departmentId?: true
  }

  export type TicketCountAggregateInputType = {
    id?: true
    tenantId?: true
    title?: true
    description?: true
    status?: true
    priorityId?: true
    afterId?: true
    columnId?: true
    createdAt?: true
    updatedAt?: true
    closedAt?: true
    deletedAt?: true
    creatorId?: true
    assigneeId?: true
    departmentId?: true
    _all?: true
  }

  export type TicketAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ticket to aggregate.
     */
    where?: TicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tickets to fetch.
     */
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tickets
    **/
    _count?: true | TicketCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TicketMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TicketMaxAggregateInputType
  }

  export type GetTicketAggregateType<T extends TicketAggregateArgs> = {
        [P in keyof T & keyof AggregateTicket]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTicket[P]>
      : GetScalarType<T[P], AggregateTicket[P]>
  }




  export type TicketGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketWhereInput
    orderBy?: TicketOrderByWithAggregationInput | TicketOrderByWithAggregationInput[]
    by: TicketScalarFieldEnum[] | TicketScalarFieldEnum
    having?: TicketScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TicketCountAggregateInputType | true
    _min?: TicketMinAggregateInputType
    _max?: TicketMaxAggregateInputType
  }

  export type TicketGroupByOutputType = {
    id: string
    tenantId: string
    title: string
    description: string | null
    status: string
    priorityId: string | null
    afterId: string | null
    columnId: string | null
    createdAt: Date
    updatedAt: Date
    closedAt: Date | null
    deletedAt: Date | null
    creatorId: string
    assigneeId: string | null
    departmentId: string | null
    _count: TicketCountAggregateOutputType | null
    _min: TicketMinAggregateOutputType | null
    _max: TicketMaxAggregateOutputType | null
  }

  type GetTicketGroupByPayload<T extends TicketGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TicketGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TicketGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TicketGroupByOutputType[P]>
            : GetScalarType<T[P], TicketGroupByOutputType[P]>
        }
      >
    >


  export type TicketSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    priorityId?: boolean
    afterId?: boolean
    columnId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    closedAt?: boolean
    deletedAt?: boolean
    creatorId?: boolean
    assigneeId?: boolean
    departmentId?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    priority?: boolean | Ticket$priorityArgs<ExtArgs>
    column?: boolean | Ticket$columnArgs<ExtArgs>
    creator?: boolean | UserDefaultArgs<ExtArgs>
    assignee?: boolean | Ticket$assigneeArgs<ExtArgs>
    department?: boolean | Ticket$departmentArgs<ExtArgs>
    comments?: boolean | Ticket$commentsArgs<ExtArgs>
    attachments?: boolean | Ticket$attachmentsArgs<ExtArgs>
    _count?: boolean | TicketCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ticket"]>

  export type TicketSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    priorityId?: boolean
    afterId?: boolean
    columnId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    closedAt?: boolean
    deletedAt?: boolean
    creatorId?: boolean
    assigneeId?: boolean
    departmentId?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    priority?: boolean | Ticket$priorityArgs<ExtArgs>
    column?: boolean | Ticket$columnArgs<ExtArgs>
    creator?: boolean | UserDefaultArgs<ExtArgs>
    assignee?: boolean | Ticket$assigneeArgs<ExtArgs>
    department?: boolean | Ticket$departmentArgs<ExtArgs>
  }, ExtArgs["result"]["ticket"]>

  export type TicketSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    priorityId?: boolean
    afterId?: boolean
    columnId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    closedAt?: boolean
    deletedAt?: boolean
    creatorId?: boolean
    assigneeId?: boolean
    departmentId?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    priority?: boolean | Ticket$priorityArgs<ExtArgs>
    column?: boolean | Ticket$columnArgs<ExtArgs>
    creator?: boolean | UserDefaultArgs<ExtArgs>
    assignee?: boolean | Ticket$assigneeArgs<ExtArgs>
    department?: boolean | Ticket$departmentArgs<ExtArgs>
  }, ExtArgs["result"]["ticket"]>

  export type TicketSelectScalar = {
    id?: boolean
    tenantId?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    priorityId?: boolean
    afterId?: boolean
    columnId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    closedAt?: boolean
    deletedAt?: boolean
    creatorId?: boolean
    assigneeId?: boolean
    departmentId?: boolean
  }

  export type TicketOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "title" | "description" | "status" | "priorityId" | "afterId" | "columnId" | "createdAt" | "updatedAt" | "closedAt" | "deletedAt" | "creatorId" | "assigneeId" | "departmentId", ExtArgs["result"]["ticket"]>
  export type TicketInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    priority?: boolean | Ticket$priorityArgs<ExtArgs>
    column?: boolean | Ticket$columnArgs<ExtArgs>
    creator?: boolean | UserDefaultArgs<ExtArgs>
    assignee?: boolean | Ticket$assigneeArgs<ExtArgs>
    department?: boolean | Ticket$departmentArgs<ExtArgs>
    comments?: boolean | Ticket$commentsArgs<ExtArgs>
    attachments?: boolean | Ticket$attachmentsArgs<ExtArgs>
    _count?: boolean | TicketCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TicketIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    priority?: boolean | Ticket$priorityArgs<ExtArgs>
    column?: boolean | Ticket$columnArgs<ExtArgs>
    creator?: boolean | UserDefaultArgs<ExtArgs>
    assignee?: boolean | Ticket$assigneeArgs<ExtArgs>
    department?: boolean | Ticket$departmentArgs<ExtArgs>
  }
  export type TicketIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    priority?: boolean | Ticket$priorityArgs<ExtArgs>
    column?: boolean | Ticket$columnArgs<ExtArgs>
    creator?: boolean | UserDefaultArgs<ExtArgs>
    assignee?: boolean | Ticket$assigneeArgs<ExtArgs>
    department?: boolean | Ticket$departmentArgs<ExtArgs>
  }

  export type $TicketPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Ticket"
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs>
      priority: Prisma.$PriorityPayload<ExtArgs> | null
      column: Prisma.$ColumnPayload<ExtArgs> | null
      creator: Prisma.$UserPayload<ExtArgs>
      assignee: Prisma.$UserPayload<ExtArgs> | null
      department: Prisma.$DepartmentPayload<ExtArgs> | null
      comments: Prisma.$TicketCommentPayload<ExtArgs>[]
      attachments: Prisma.$AttachmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      title: string
      description: string | null
      status: string
      priorityId: string | null
      afterId: string | null
      columnId: string | null
      createdAt: Date
      updatedAt: Date
      closedAt: Date | null
      deletedAt: Date | null
      creatorId: string
      assigneeId: string | null
      departmentId: string | null
    }, ExtArgs["result"]["ticket"]>
    composites: {}
  }

  type TicketGetPayload<S extends boolean | null | undefined | TicketDefaultArgs> = $Result.GetResult<Prisma.$TicketPayload, S>

  type TicketCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TicketFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TicketCountAggregateInputType | true
    }

  export interface TicketDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Ticket'], meta: { name: 'Ticket' } }
    /**
     * Find zero or one Ticket that matches the filter.
     * @param {TicketFindUniqueArgs} args - Arguments to find a Ticket
     * @example
     * // Get one Ticket
     * const ticket = await prisma.ticket.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TicketFindUniqueArgs>(args: SelectSubset<T, TicketFindUniqueArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Ticket that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TicketFindUniqueOrThrowArgs} args - Arguments to find a Ticket
     * @example
     * // Get one Ticket
     * const ticket = await prisma.ticket.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TicketFindUniqueOrThrowArgs>(args: SelectSubset<T, TicketFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ticket that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketFindFirstArgs} args - Arguments to find a Ticket
     * @example
     * // Get one Ticket
     * const ticket = await prisma.ticket.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TicketFindFirstArgs>(args?: SelectSubset<T, TicketFindFirstArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ticket that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketFindFirstOrThrowArgs} args - Arguments to find a Ticket
     * @example
     * // Get one Ticket
     * const ticket = await prisma.ticket.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TicketFindFirstOrThrowArgs>(args?: SelectSubset<T, TicketFindFirstOrThrowArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tickets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tickets
     * const tickets = await prisma.ticket.findMany()
     * 
     * // Get first 10 Tickets
     * const tickets = await prisma.ticket.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ticketWithIdOnly = await prisma.ticket.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TicketFindManyArgs>(args?: SelectSubset<T, TicketFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Ticket.
     * @param {TicketCreateArgs} args - Arguments to create a Ticket.
     * @example
     * // Create one Ticket
     * const Ticket = await prisma.ticket.create({
     *   data: {
     *     // ... data to create a Ticket
     *   }
     * })
     * 
     */
    create<T extends TicketCreateArgs>(args: SelectSubset<T, TicketCreateArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tickets.
     * @param {TicketCreateManyArgs} args - Arguments to create many Tickets.
     * @example
     * // Create many Tickets
     * const ticket = await prisma.ticket.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TicketCreateManyArgs>(args?: SelectSubset<T, TicketCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tickets and returns the data saved in the database.
     * @param {TicketCreateManyAndReturnArgs} args - Arguments to create many Tickets.
     * @example
     * // Create many Tickets
     * const ticket = await prisma.ticket.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tickets and only return the `id`
     * const ticketWithIdOnly = await prisma.ticket.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TicketCreateManyAndReturnArgs>(args?: SelectSubset<T, TicketCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Ticket.
     * @param {TicketDeleteArgs} args - Arguments to delete one Ticket.
     * @example
     * // Delete one Ticket
     * const Ticket = await prisma.ticket.delete({
     *   where: {
     *     // ... filter to delete one Ticket
     *   }
     * })
     * 
     */
    delete<T extends TicketDeleteArgs>(args: SelectSubset<T, TicketDeleteArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Ticket.
     * @param {TicketUpdateArgs} args - Arguments to update one Ticket.
     * @example
     * // Update one Ticket
     * const ticket = await prisma.ticket.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TicketUpdateArgs>(args: SelectSubset<T, TicketUpdateArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tickets.
     * @param {TicketDeleteManyArgs} args - Arguments to filter Tickets to delete.
     * @example
     * // Delete a few Tickets
     * const { count } = await prisma.ticket.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TicketDeleteManyArgs>(args?: SelectSubset<T, TicketDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tickets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tickets
     * const ticket = await prisma.ticket.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TicketUpdateManyArgs>(args: SelectSubset<T, TicketUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tickets and returns the data updated in the database.
     * @param {TicketUpdateManyAndReturnArgs} args - Arguments to update many Tickets.
     * @example
     * // Update many Tickets
     * const ticket = await prisma.ticket.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tickets and only return the `id`
     * const ticketWithIdOnly = await prisma.ticket.updateManyAndReturn({
     *   select: { id: true },
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
    updateManyAndReturn<T extends TicketUpdateManyAndReturnArgs>(args: SelectSubset<T, TicketUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Ticket.
     * @param {TicketUpsertArgs} args - Arguments to update or create a Ticket.
     * @example
     * // Update or create a Ticket
     * const ticket = await prisma.ticket.upsert({
     *   create: {
     *     // ... data to create a Ticket
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ticket we want to update
     *   }
     * })
     */
    upsert<T extends TicketUpsertArgs>(args: SelectSubset<T, TicketUpsertArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tickets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketCountArgs} args - Arguments to filter Tickets to count.
     * @example
     * // Count the number of Tickets
     * const count = await prisma.ticket.count({
     *   where: {
     *     // ... the filter for the Tickets we want to count
     *   }
     * })
    **/
    count<T extends TicketCountArgs>(
      args?: Subset<T, TicketCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TicketCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Ticket.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TicketAggregateArgs>(args: Subset<T, TicketAggregateArgs>): Prisma.PrismaPromise<GetTicketAggregateType<T>>

    /**
     * Group by Ticket.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketGroupByArgs} args - Group by arguments.
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
      T extends TicketGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TicketGroupByArgs['orderBy'] }
        : { orderBy?: TicketGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TicketGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTicketGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Ticket model
   */
  readonly fields: TicketFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Ticket.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TicketClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    priority<T extends Ticket$priorityArgs<ExtArgs> = {}>(args?: Subset<T, Ticket$priorityArgs<ExtArgs>>): Prisma__PriorityClient<$Result.GetResult<Prisma.$PriorityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    column<T extends Ticket$columnArgs<ExtArgs> = {}>(args?: Subset<T, Ticket$columnArgs<ExtArgs>>): Prisma__ColumnClient<$Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    creator<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    assignee<T extends Ticket$assigneeArgs<ExtArgs> = {}>(args?: Subset<T, Ticket$assigneeArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    department<T extends Ticket$departmentArgs<ExtArgs> = {}>(args?: Subset<T, Ticket$departmentArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    comments<T extends Ticket$commentsArgs<ExtArgs> = {}>(args?: Subset<T, Ticket$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketCommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    attachments<T extends Ticket$attachmentsArgs<ExtArgs> = {}>(args?: Subset<T, Ticket$attachmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Ticket model
   */
  interface TicketFieldRefs {
    readonly id: FieldRef<"Ticket", 'String'>
    readonly tenantId: FieldRef<"Ticket", 'String'>
    readonly title: FieldRef<"Ticket", 'String'>
    readonly description: FieldRef<"Ticket", 'String'>
    readonly status: FieldRef<"Ticket", 'String'>
    readonly priorityId: FieldRef<"Ticket", 'String'>
    readonly afterId: FieldRef<"Ticket", 'String'>
    readonly columnId: FieldRef<"Ticket", 'String'>
    readonly createdAt: FieldRef<"Ticket", 'DateTime'>
    readonly updatedAt: FieldRef<"Ticket", 'DateTime'>
    readonly closedAt: FieldRef<"Ticket", 'DateTime'>
    readonly deletedAt: FieldRef<"Ticket", 'DateTime'>
    readonly creatorId: FieldRef<"Ticket", 'String'>
    readonly assigneeId: FieldRef<"Ticket", 'String'>
    readonly departmentId: FieldRef<"Ticket", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Ticket findUnique
   */
  export type TicketFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Ticket to fetch.
     */
    where: TicketWhereUniqueInput
  }

  /**
   * Ticket findUniqueOrThrow
   */
  export type TicketFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Ticket to fetch.
     */
    where: TicketWhereUniqueInput
  }

  /**
   * Ticket findFirst
   */
  export type TicketFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Ticket to fetch.
     */
    where?: TicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tickets to fetch.
     */
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tickets.
     */
    cursor?: TicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tickets.
     */
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }

  /**
   * Ticket findFirstOrThrow
   */
  export type TicketFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Ticket to fetch.
     */
    where?: TicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tickets to fetch.
     */
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tickets.
     */
    cursor?: TicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tickets.
     */
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }

  /**
   * Ticket findMany
   */
  export type TicketFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Tickets to fetch.
     */
    where?: TicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tickets to fetch.
     */
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tickets.
     */
    cursor?: TicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tickets.
     */
    skip?: number
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }

  /**
   * Ticket create
   */
  export type TicketCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * The data needed to create a Ticket.
     */
    data: XOR<TicketCreateInput, TicketUncheckedCreateInput>
  }

  /**
   * Ticket createMany
   */
  export type TicketCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tickets.
     */
    data: TicketCreateManyInput | TicketCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Ticket createManyAndReturn
   */
  export type TicketCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * The data used to create many Tickets.
     */
    data: TicketCreateManyInput | TicketCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Ticket update
   */
  export type TicketUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * The data needed to update a Ticket.
     */
    data: XOR<TicketUpdateInput, TicketUncheckedUpdateInput>
    /**
     * Choose, which Ticket to update.
     */
    where: TicketWhereUniqueInput
  }

  /**
   * Ticket updateMany
   */
  export type TicketUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tickets.
     */
    data: XOR<TicketUpdateManyMutationInput, TicketUncheckedUpdateManyInput>
    /**
     * Filter which Tickets to update
     */
    where?: TicketWhereInput
    /**
     * Limit how many Tickets to update.
     */
    limit?: number
  }

  /**
   * Ticket updateManyAndReturn
   */
  export type TicketUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * The data used to update Tickets.
     */
    data: XOR<TicketUpdateManyMutationInput, TicketUncheckedUpdateManyInput>
    /**
     * Filter which Tickets to update
     */
    where?: TicketWhereInput
    /**
     * Limit how many Tickets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Ticket upsert
   */
  export type TicketUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * The filter to search for the Ticket to update in case it exists.
     */
    where: TicketWhereUniqueInput
    /**
     * In case the Ticket found by the `where` argument doesn't exist, create a new Ticket with this data.
     */
    create: XOR<TicketCreateInput, TicketUncheckedCreateInput>
    /**
     * In case the Ticket was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TicketUpdateInput, TicketUncheckedUpdateInput>
  }

  /**
   * Ticket delete
   */
  export type TicketDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter which Ticket to delete.
     */
    where: TicketWhereUniqueInput
  }

  /**
   * Ticket deleteMany
   */
  export type TicketDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tickets to delete
     */
    where?: TicketWhereInput
    /**
     * Limit how many Tickets to delete.
     */
    limit?: number
  }

  /**
   * Ticket.priority
   */
  export type Ticket$priorityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Priority
     */
    select?: PrioritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Priority
     */
    omit?: PriorityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriorityInclude<ExtArgs> | null
    where?: PriorityWhereInput
  }

  /**
   * Ticket.column
   */
  export type Ticket$columnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnInclude<ExtArgs> | null
    where?: ColumnWhereInput
  }

  /**
   * Ticket.assignee
   */
  export type Ticket$assigneeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Ticket.department
   */
  export type Ticket$departmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    where?: DepartmentWhereInput
  }

  /**
   * Ticket.comments
   */
  export type Ticket$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketComment
     */
    select?: TicketCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketComment
     */
    omit?: TicketCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketCommentInclude<ExtArgs> | null
    where?: TicketCommentWhereInput
    orderBy?: TicketCommentOrderByWithRelationInput | TicketCommentOrderByWithRelationInput[]
    cursor?: TicketCommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TicketCommentScalarFieldEnum | TicketCommentScalarFieldEnum[]
  }

  /**
   * Ticket.attachments
   */
  export type Ticket$attachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    where?: AttachmentWhereInput
    orderBy?: AttachmentOrderByWithRelationInput | AttachmentOrderByWithRelationInput[]
    cursor?: AttachmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AttachmentScalarFieldEnum | AttachmentScalarFieldEnum[]
  }

  /**
   * Ticket without action
   */
  export type TicketDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
  }


  /**
   * Model TicketComment
   */

  export type AggregateTicketComment = {
    _count: TicketCommentCountAggregateOutputType | null
    _min: TicketCommentMinAggregateOutputType | null
    _max: TicketCommentMaxAggregateOutputType | null
  }

  export type TicketCommentMinAggregateOutputType = {
    id: string | null
    ticketId: string | null
    userId: string | null
    comment: string | null
    createdAt: Date | null
  }

  export type TicketCommentMaxAggregateOutputType = {
    id: string | null
    ticketId: string | null
    userId: string | null
    comment: string | null
    createdAt: Date | null
  }

  export type TicketCommentCountAggregateOutputType = {
    id: number
    ticketId: number
    userId: number
    comment: number
    createdAt: number
    _all: number
  }


  export type TicketCommentMinAggregateInputType = {
    id?: true
    ticketId?: true
    userId?: true
    comment?: true
    createdAt?: true
  }

  export type TicketCommentMaxAggregateInputType = {
    id?: true
    ticketId?: true
    userId?: true
    comment?: true
    createdAt?: true
  }

  export type TicketCommentCountAggregateInputType = {
    id?: true
    ticketId?: true
    userId?: true
    comment?: true
    createdAt?: true
    _all?: true
  }

  export type TicketCommentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TicketComment to aggregate.
     */
    where?: TicketCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TicketComments to fetch.
     */
    orderBy?: TicketCommentOrderByWithRelationInput | TicketCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TicketCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TicketComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TicketComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TicketComments
    **/
    _count?: true | TicketCommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TicketCommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TicketCommentMaxAggregateInputType
  }

  export type GetTicketCommentAggregateType<T extends TicketCommentAggregateArgs> = {
        [P in keyof T & keyof AggregateTicketComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTicketComment[P]>
      : GetScalarType<T[P], AggregateTicketComment[P]>
  }




  export type TicketCommentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketCommentWhereInput
    orderBy?: TicketCommentOrderByWithAggregationInput | TicketCommentOrderByWithAggregationInput[]
    by: TicketCommentScalarFieldEnum[] | TicketCommentScalarFieldEnum
    having?: TicketCommentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TicketCommentCountAggregateInputType | true
    _min?: TicketCommentMinAggregateInputType
    _max?: TicketCommentMaxAggregateInputType
  }

  export type TicketCommentGroupByOutputType = {
    id: string
    ticketId: string
    userId: string
    comment: string
    createdAt: Date
    _count: TicketCommentCountAggregateOutputType | null
    _min: TicketCommentMinAggregateOutputType | null
    _max: TicketCommentMaxAggregateOutputType | null
  }

  type GetTicketCommentGroupByPayload<T extends TicketCommentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TicketCommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TicketCommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TicketCommentGroupByOutputType[P]>
            : GetScalarType<T[P], TicketCommentGroupByOutputType[P]>
        }
      >
    >


  export type TicketCommentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ticketId?: boolean
    userId?: boolean
    comment?: boolean
    createdAt?: boolean
    ticket?: boolean | TicketDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    attachments?: boolean | TicketComment$attachmentsArgs<ExtArgs>
    _count?: boolean | TicketCommentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ticketComment"]>

  export type TicketCommentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ticketId?: boolean
    userId?: boolean
    comment?: boolean
    createdAt?: boolean
    ticket?: boolean | TicketDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ticketComment"]>

  export type TicketCommentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ticketId?: boolean
    userId?: boolean
    comment?: boolean
    createdAt?: boolean
    ticket?: boolean | TicketDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ticketComment"]>

  export type TicketCommentSelectScalar = {
    id?: boolean
    ticketId?: boolean
    userId?: boolean
    comment?: boolean
    createdAt?: boolean
  }

  export type TicketCommentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ticketId" | "userId" | "comment" | "createdAt", ExtArgs["result"]["ticketComment"]>
  export type TicketCommentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ticket?: boolean | TicketDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    attachments?: boolean | TicketComment$attachmentsArgs<ExtArgs>
    _count?: boolean | TicketCommentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TicketCommentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ticket?: boolean | TicketDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TicketCommentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ticket?: boolean | TicketDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TicketCommentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TicketComment"
    objects: {
      ticket: Prisma.$TicketPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
      attachments: Prisma.$AttachmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      ticketId: string
      userId: string
      comment: string
      createdAt: Date
    }, ExtArgs["result"]["ticketComment"]>
    composites: {}
  }

  type TicketCommentGetPayload<S extends boolean | null | undefined | TicketCommentDefaultArgs> = $Result.GetResult<Prisma.$TicketCommentPayload, S>

  type TicketCommentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TicketCommentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TicketCommentCountAggregateInputType | true
    }

  export interface TicketCommentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TicketComment'], meta: { name: 'TicketComment' } }
    /**
     * Find zero or one TicketComment that matches the filter.
     * @param {TicketCommentFindUniqueArgs} args - Arguments to find a TicketComment
     * @example
     * // Get one TicketComment
     * const ticketComment = await prisma.ticketComment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TicketCommentFindUniqueArgs>(args: SelectSubset<T, TicketCommentFindUniqueArgs<ExtArgs>>): Prisma__TicketCommentClient<$Result.GetResult<Prisma.$TicketCommentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TicketComment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TicketCommentFindUniqueOrThrowArgs} args - Arguments to find a TicketComment
     * @example
     * // Get one TicketComment
     * const ticketComment = await prisma.ticketComment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TicketCommentFindUniqueOrThrowArgs>(args: SelectSubset<T, TicketCommentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TicketCommentClient<$Result.GetResult<Prisma.$TicketCommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TicketComment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketCommentFindFirstArgs} args - Arguments to find a TicketComment
     * @example
     * // Get one TicketComment
     * const ticketComment = await prisma.ticketComment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TicketCommentFindFirstArgs>(args?: SelectSubset<T, TicketCommentFindFirstArgs<ExtArgs>>): Prisma__TicketCommentClient<$Result.GetResult<Prisma.$TicketCommentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TicketComment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketCommentFindFirstOrThrowArgs} args - Arguments to find a TicketComment
     * @example
     * // Get one TicketComment
     * const ticketComment = await prisma.ticketComment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TicketCommentFindFirstOrThrowArgs>(args?: SelectSubset<T, TicketCommentFindFirstOrThrowArgs<ExtArgs>>): Prisma__TicketCommentClient<$Result.GetResult<Prisma.$TicketCommentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TicketComments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketCommentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TicketComments
     * const ticketComments = await prisma.ticketComment.findMany()
     * 
     * // Get first 10 TicketComments
     * const ticketComments = await prisma.ticketComment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ticketCommentWithIdOnly = await prisma.ticketComment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TicketCommentFindManyArgs>(args?: SelectSubset<T, TicketCommentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketCommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TicketComment.
     * @param {TicketCommentCreateArgs} args - Arguments to create a TicketComment.
     * @example
     * // Create one TicketComment
     * const TicketComment = await prisma.ticketComment.create({
     *   data: {
     *     // ... data to create a TicketComment
     *   }
     * })
     * 
     */
    create<T extends TicketCommentCreateArgs>(args: SelectSubset<T, TicketCommentCreateArgs<ExtArgs>>): Prisma__TicketCommentClient<$Result.GetResult<Prisma.$TicketCommentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TicketComments.
     * @param {TicketCommentCreateManyArgs} args - Arguments to create many TicketComments.
     * @example
     * // Create many TicketComments
     * const ticketComment = await prisma.ticketComment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TicketCommentCreateManyArgs>(args?: SelectSubset<T, TicketCommentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TicketComments and returns the data saved in the database.
     * @param {TicketCommentCreateManyAndReturnArgs} args - Arguments to create many TicketComments.
     * @example
     * // Create many TicketComments
     * const ticketComment = await prisma.ticketComment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TicketComments and only return the `id`
     * const ticketCommentWithIdOnly = await prisma.ticketComment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TicketCommentCreateManyAndReturnArgs>(args?: SelectSubset<T, TicketCommentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketCommentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TicketComment.
     * @param {TicketCommentDeleteArgs} args - Arguments to delete one TicketComment.
     * @example
     * // Delete one TicketComment
     * const TicketComment = await prisma.ticketComment.delete({
     *   where: {
     *     // ... filter to delete one TicketComment
     *   }
     * })
     * 
     */
    delete<T extends TicketCommentDeleteArgs>(args: SelectSubset<T, TicketCommentDeleteArgs<ExtArgs>>): Prisma__TicketCommentClient<$Result.GetResult<Prisma.$TicketCommentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TicketComment.
     * @param {TicketCommentUpdateArgs} args - Arguments to update one TicketComment.
     * @example
     * // Update one TicketComment
     * const ticketComment = await prisma.ticketComment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TicketCommentUpdateArgs>(args: SelectSubset<T, TicketCommentUpdateArgs<ExtArgs>>): Prisma__TicketCommentClient<$Result.GetResult<Prisma.$TicketCommentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TicketComments.
     * @param {TicketCommentDeleteManyArgs} args - Arguments to filter TicketComments to delete.
     * @example
     * // Delete a few TicketComments
     * const { count } = await prisma.ticketComment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TicketCommentDeleteManyArgs>(args?: SelectSubset<T, TicketCommentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TicketComments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketCommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TicketComments
     * const ticketComment = await prisma.ticketComment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TicketCommentUpdateManyArgs>(args: SelectSubset<T, TicketCommentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TicketComments and returns the data updated in the database.
     * @param {TicketCommentUpdateManyAndReturnArgs} args - Arguments to update many TicketComments.
     * @example
     * // Update many TicketComments
     * const ticketComment = await prisma.ticketComment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TicketComments and only return the `id`
     * const ticketCommentWithIdOnly = await prisma.ticketComment.updateManyAndReturn({
     *   select: { id: true },
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
    updateManyAndReturn<T extends TicketCommentUpdateManyAndReturnArgs>(args: SelectSubset<T, TicketCommentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketCommentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TicketComment.
     * @param {TicketCommentUpsertArgs} args - Arguments to update or create a TicketComment.
     * @example
     * // Update or create a TicketComment
     * const ticketComment = await prisma.ticketComment.upsert({
     *   create: {
     *     // ... data to create a TicketComment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TicketComment we want to update
     *   }
     * })
     */
    upsert<T extends TicketCommentUpsertArgs>(args: SelectSubset<T, TicketCommentUpsertArgs<ExtArgs>>): Prisma__TicketCommentClient<$Result.GetResult<Prisma.$TicketCommentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TicketComments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketCommentCountArgs} args - Arguments to filter TicketComments to count.
     * @example
     * // Count the number of TicketComments
     * const count = await prisma.ticketComment.count({
     *   where: {
     *     // ... the filter for the TicketComments we want to count
     *   }
     * })
    **/
    count<T extends TicketCommentCountArgs>(
      args?: Subset<T, TicketCommentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TicketCommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TicketComment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketCommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TicketCommentAggregateArgs>(args: Subset<T, TicketCommentAggregateArgs>): Prisma.PrismaPromise<GetTicketCommentAggregateType<T>>

    /**
     * Group by TicketComment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketCommentGroupByArgs} args - Group by arguments.
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
      T extends TicketCommentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TicketCommentGroupByArgs['orderBy'] }
        : { orderBy?: TicketCommentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TicketCommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTicketCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TicketComment model
   */
  readonly fields: TicketCommentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TicketComment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TicketCommentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ticket<T extends TicketDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TicketDefaultArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    attachments<T extends TicketComment$attachmentsArgs<ExtArgs> = {}>(args?: Subset<T, TicketComment$attachmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the TicketComment model
   */
  interface TicketCommentFieldRefs {
    readonly id: FieldRef<"TicketComment", 'String'>
    readonly ticketId: FieldRef<"TicketComment", 'String'>
    readonly userId: FieldRef<"TicketComment", 'String'>
    readonly comment: FieldRef<"TicketComment", 'String'>
    readonly createdAt: FieldRef<"TicketComment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TicketComment findUnique
   */
  export type TicketCommentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketComment
     */
    select?: TicketCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketComment
     */
    omit?: TicketCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketCommentInclude<ExtArgs> | null
    /**
     * Filter, which TicketComment to fetch.
     */
    where: TicketCommentWhereUniqueInput
  }

  /**
   * TicketComment findUniqueOrThrow
   */
  export type TicketCommentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketComment
     */
    select?: TicketCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketComment
     */
    omit?: TicketCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketCommentInclude<ExtArgs> | null
    /**
     * Filter, which TicketComment to fetch.
     */
    where: TicketCommentWhereUniqueInput
  }

  /**
   * TicketComment findFirst
   */
  export type TicketCommentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketComment
     */
    select?: TicketCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketComment
     */
    omit?: TicketCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketCommentInclude<ExtArgs> | null
    /**
     * Filter, which TicketComment to fetch.
     */
    where?: TicketCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TicketComments to fetch.
     */
    orderBy?: TicketCommentOrderByWithRelationInput | TicketCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TicketComments.
     */
    cursor?: TicketCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TicketComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TicketComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TicketComments.
     */
    distinct?: TicketCommentScalarFieldEnum | TicketCommentScalarFieldEnum[]
  }

  /**
   * TicketComment findFirstOrThrow
   */
  export type TicketCommentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketComment
     */
    select?: TicketCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketComment
     */
    omit?: TicketCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketCommentInclude<ExtArgs> | null
    /**
     * Filter, which TicketComment to fetch.
     */
    where?: TicketCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TicketComments to fetch.
     */
    orderBy?: TicketCommentOrderByWithRelationInput | TicketCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TicketComments.
     */
    cursor?: TicketCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TicketComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TicketComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TicketComments.
     */
    distinct?: TicketCommentScalarFieldEnum | TicketCommentScalarFieldEnum[]
  }

  /**
   * TicketComment findMany
   */
  export type TicketCommentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketComment
     */
    select?: TicketCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketComment
     */
    omit?: TicketCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketCommentInclude<ExtArgs> | null
    /**
     * Filter, which TicketComments to fetch.
     */
    where?: TicketCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TicketComments to fetch.
     */
    orderBy?: TicketCommentOrderByWithRelationInput | TicketCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TicketComments.
     */
    cursor?: TicketCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TicketComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TicketComments.
     */
    skip?: number
    distinct?: TicketCommentScalarFieldEnum | TicketCommentScalarFieldEnum[]
  }

  /**
   * TicketComment create
   */
  export type TicketCommentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketComment
     */
    select?: TicketCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketComment
     */
    omit?: TicketCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketCommentInclude<ExtArgs> | null
    /**
     * The data needed to create a TicketComment.
     */
    data: XOR<TicketCommentCreateInput, TicketCommentUncheckedCreateInput>
  }

  /**
   * TicketComment createMany
   */
  export type TicketCommentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TicketComments.
     */
    data: TicketCommentCreateManyInput | TicketCommentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TicketComment createManyAndReturn
   */
  export type TicketCommentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketComment
     */
    select?: TicketCommentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TicketComment
     */
    omit?: TicketCommentOmit<ExtArgs> | null
    /**
     * The data used to create many TicketComments.
     */
    data: TicketCommentCreateManyInput | TicketCommentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketCommentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TicketComment update
   */
  export type TicketCommentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketComment
     */
    select?: TicketCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketComment
     */
    omit?: TicketCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketCommentInclude<ExtArgs> | null
    /**
     * The data needed to update a TicketComment.
     */
    data: XOR<TicketCommentUpdateInput, TicketCommentUncheckedUpdateInput>
    /**
     * Choose, which TicketComment to update.
     */
    where: TicketCommentWhereUniqueInput
  }

  /**
   * TicketComment updateMany
   */
  export type TicketCommentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TicketComments.
     */
    data: XOR<TicketCommentUpdateManyMutationInput, TicketCommentUncheckedUpdateManyInput>
    /**
     * Filter which TicketComments to update
     */
    where?: TicketCommentWhereInput
    /**
     * Limit how many TicketComments to update.
     */
    limit?: number
  }

  /**
   * TicketComment updateManyAndReturn
   */
  export type TicketCommentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketComment
     */
    select?: TicketCommentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TicketComment
     */
    omit?: TicketCommentOmit<ExtArgs> | null
    /**
     * The data used to update TicketComments.
     */
    data: XOR<TicketCommentUpdateManyMutationInput, TicketCommentUncheckedUpdateManyInput>
    /**
     * Filter which TicketComments to update
     */
    where?: TicketCommentWhereInput
    /**
     * Limit how many TicketComments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketCommentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TicketComment upsert
   */
  export type TicketCommentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketComment
     */
    select?: TicketCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketComment
     */
    omit?: TicketCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketCommentInclude<ExtArgs> | null
    /**
     * The filter to search for the TicketComment to update in case it exists.
     */
    where: TicketCommentWhereUniqueInput
    /**
     * In case the TicketComment found by the `where` argument doesn't exist, create a new TicketComment with this data.
     */
    create: XOR<TicketCommentCreateInput, TicketCommentUncheckedCreateInput>
    /**
     * In case the TicketComment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TicketCommentUpdateInput, TicketCommentUncheckedUpdateInput>
  }

  /**
   * TicketComment delete
   */
  export type TicketCommentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketComment
     */
    select?: TicketCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketComment
     */
    omit?: TicketCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketCommentInclude<ExtArgs> | null
    /**
     * Filter which TicketComment to delete.
     */
    where: TicketCommentWhereUniqueInput
  }

  /**
   * TicketComment deleteMany
   */
  export type TicketCommentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TicketComments to delete
     */
    where?: TicketCommentWhereInput
    /**
     * Limit how many TicketComments to delete.
     */
    limit?: number
  }

  /**
   * TicketComment.attachments
   */
  export type TicketComment$attachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    where?: AttachmentWhereInput
    orderBy?: AttachmentOrderByWithRelationInput | AttachmentOrderByWithRelationInput[]
    cursor?: AttachmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AttachmentScalarFieldEnum | AttachmentScalarFieldEnum[]
  }

  /**
   * TicketComment without action
   */
  export type TicketCommentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketComment
     */
    select?: TicketCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketComment
     */
    omit?: TicketCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketCommentInclude<ExtArgs> | null
  }


  /**
   * Model Attachment
   */

  export type AggregateAttachment = {
    _count: AttachmentCountAggregateOutputType | null
    _avg: AttachmentAvgAggregateOutputType | null
    _sum: AttachmentSumAggregateOutputType | null
    _min: AttachmentMinAggregateOutputType | null
    _max: AttachmentMaxAggregateOutputType | null
  }

  export type AttachmentAvgAggregateOutputType = {
    size: number | null
  }

  export type AttachmentSumAggregateOutputType = {
    size: number | null
  }

  export type AttachmentMinAggregateOutputType = {
    id: string | null
    filename: string | null
    originalName: string | null
    mimeType: string | null
    size: number | null
    filePath: string | null
    url: string | null
    ticketId: string | null
    commentId: string | null
    uploadedBy: string | null
    tenantId: string | null
    uploadedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type AttachmentMaxAggregateOutputType = {
    id: string | null
    filename: string | null
    originalName: string | null
    mimeType: string | null
    size: number | null
    filePath: string | null
    url: string | null
    ticketId: string | null
    commentId: string | null
    uploadedBy: string | null
    tenantId: string | null
    uploadedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type AttachmentCountAggregateOutputType = {
    id: number
    filename: number
    originalName: number
    mimeType: number
    size: number
    filePath: number
    url: number
    ticketId: number
    commentId: number
    uploadedBy: number
    tenantId: number
    uploadedAt: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type AttachmentAvgAggregateInputType = {
    size?: true
  }

  export type AttachmentSumAggregateInputType = {
    size?: true
  }

  export type AttachmentMinAggregateInputType = {
    id?: true
    filename?: true
    originalName?: true
    mimeType?: true
    size?: true
    filePath?: true
    url?: true
    ticketId?: true
    commentId?: true
    uploadedBy?: true
    tenantId?: true
    uploadedAt?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type AttachmentMaxAggregateInputType = {
    id?: true
    filename?: true
    originalName?: true
    mimeType?: true
    size?: true
    filePath?: true
    url?: true
    ticketId?: true
    commentId?: true
    uploadedBy?: true
    tenantId?: true
    uploadedAt?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type AttachmentCountAggregateInputType = {
    id?: true
    filename?: true
    originalName?: true
    mimeType?: true
    size?: true
    filePath?: true
    url?: true
    ticketId?: true
    commentId?: true
    uploadedBy?: true
    tenantId?: true
    uploadedAt?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type AttachmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Attachment to aggregate.
     */
    where?: AttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attachments to fetch.
     */
    orderBy?: AttachmentOrderByWithRelationInput | AttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Attachments
    **/
    _count?: true | AttachmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AttachmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AttachmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AttachmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AttachmentMaxAggregateInputType
  }

  export type GetAttachmentAggregateType<T extends AttachmentAggregateArgs> = {
        [P in keyof T & keyof AggregateAttachment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAttachment[P]>
      : GetScalarType<T[P], AggregateAttachment[P]>
  }




  export type AttachmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttachmentWhereInput
    orderBy?: AttachmentOrderByWithAggregationInput | AttachmentOrderByWithAggregationInput[]
    by: AttachmentScalarFieldEnum[] | AttachmentScalarFieldEnum
    having?: AttachmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AttachmentCountAggregateInputType | true
    _avg?: AttachmentAvgAggregateInputType
    _sum?: AttachmentSumAggregateInputType
    _min?: AttachmentMinAggregateInputType
    _max?: AttachmentMaxAggregateInputType
  }

  export type AttachmentGroupByOutputType = {
    id: string
    filename: string
    originalName: string
    mimeType: string
    size: number
    filePath: string
    url: string
    ticketId: string | null
    commentId: string | null
    uploadedBy: string
    tenantId: string
    uploadedAt: Date
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: AttachmentCountAggregateOutputType | null
    _avg: AttachmentAvgAggregateOutputType | null
    _sum: AttachmentSumAggregateOutputType | null
    _min: AttachmentMinAggregateOutputType | null
    _max: AttachmentMaxAggregateOutputType | null
  }

  type GetAttachmentGroupByPayload<T extends AttachmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AttachmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AttachmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AttachmentGroupByOutputType[P]>
            : GetScalarType<T[P], AttachmentGroupByOutputType[P]>
        }
      >
    >


  export type AttachmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    filename?: boolean
    originalName?: boolean
    mimeType?: boolean
    size?: boolean
    filePath?: boolean
    url?: boolean
    ticketId?: boolean
    commentId?: boolean
    uploadedBy?: boolean
    tenantId?: boolean
    uploadedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    ticket?: boolean | Attachment$ticketArgs<ExtArgs>
    comment?: boolean | Attachment$commentArgs<ExtArgs>
  }, ExtArgs["result"]["attachment"]>

  export type AttachmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    filename?: boolean
    originalName?: boolean
    mimeType?: boolean
    size?: boolean
    filePath?: boolean
    url?: boolean
    ticketId?: boolean
    commentId?: boolean
    uploadedBy?: boolean
    tenantId?: boolean
    uploadedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    ticket?: boolean | Attachment$ticketArgs<ExtArgs>
    comment?: boolean | Attachment$commentArgs<ExtArgs>
  }, ExtArgs["result"]["attachment"]>

  export type AttachmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    filename?: boolean
    originalName?: boolean
    mimeType?: boolean
    size?: boolean
    filePath?: boolean
    url?: boolean
    ticketId?: boolean
    commentId?: boolean
    uploadedBy?: boolean
    tenantId?: boolean
    uploadedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    ticket?: boolean | Attachment$ticketArgs<ExtArgs>
    comment?: boolean | Attachment$commentArgs<ExtArgs>
  }, ExtArgs["result"]["attachment"]>

  export type AttachmentSelectScalar = {
    id?: boolean
    filename?: boolean
    originalName?: boolean
    mimeType?: boolean
    size?: boolean
    filePath?: boolean
    url?: boolean
    ticketId?: boolean
    commentId?: boolean
    uploadedBy?: boolean
    tenantId?: boolean
    uploadedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type AttachmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "filename" | "originalName" | "mimeType" | "size" | "filePath" | "url" | "ticketId" | "commentId" | "uploadedBy" | "tenantId" | "uploadedAt" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["attachment"]>
  export type AttachmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ticket?: boolean | Attachment$ticketArgs<ExtArgs>
    comment?: boolean | Attachment$commentArgs<ExtArgs>
  }
  export type AttachmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ticket?: boolean | Attachment$ticketArgs<ExtArgs>
    comment?: boolean | Attachment$commentArgs<ExtArgs>
  }
  export type AttachmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ticket?: boolean | Attachment$ticketArgs<ExtArgs>
    comment?: boolean | Attachment$commentArgs<ExtArgs>
  }

  export type $AttachmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Attachment"
    objects: {
      ticket: Prisma.$TicketPayload<ExtArgs> | null
      comment: Prisma.$TicketCommentPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      filename: string
      originalName: string
      mimeType: string
      size: number
      filePath: string
      url: string
      ticketId: string | null
      commentId: string | null
      uploadedBy: string
      tenantId: string
      uploadedAt: Date
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["attachment"]>
    composites: {}
  }

  type AttachmentGetPayload<S extends boolean | null | undefined | AttachmentDefaultArgs> = $Result.GetResult<Prisma.$AttachmentPayload, S>

  type AttachmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AttachmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AttachmentCountAggregateInputType | true
    }

  export interface AttachmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Attachment'], meta: { name: 'Attachment' } }
    /**
     * Find zero or one Attachment that matches the filter.
     * @param {AttachmentFindUniqueArgs} args - Arguments to find a Attachment
     * @example
     * // Get one Attachment
     * const attachment = await prisma.attachment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AttachmentFindUniqueArgs>(args: SelectSubset<T, AttachmentFindUniqueArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Attachment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AttachmentFindUniqueOrThrowArgs} args - Arguments to find a Attachment
     * @example
     * // Get one Attachment
     * const attachment = await prisma.attachment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AttachmentFindUniqueOrThrowArgs>(args: SelectSubset<T, AttachmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attachment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentFindFirstArgs} args - Arguments to find a Attachment
     * @example
     * // Get one Attachment
     * const attachment = await prisma.attachment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AttachmentFindFirstArgs>(args?: SelectSubset<T, AttachmentFindFirstArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attachment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentFindFirstOrThrowArgs} args - Arguments to find a Attachment
     * @example
     * // Get one Attachment
     * const attachment = await prisma.attachment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AttachmentFindFirstOrThrowArgs>(args?: SelectSubset<T, AttachmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Attachments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Attachments
     * const attachments = await prisma.attachment.findMany()
     * 
     * // Get first 10 Attachments
     * const attachments = await prisma.attachment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const attachmentWithIdOnly = await prisma.attachment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AttachmentFindManyArgs>(args?: SelectSubset<T, AttachmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Attachment.
     * @param {AttachmentCreateArgs} args - Arguments to create a Attachment.
     * @example
     * // Create one Attachment
     * const Attachment = await prisma.attachment.create({
     *   data: {
     *     // ... data to create a Attachment
     *   }
     * })
     * 
     */
    create<T extends AttachmentCreateArgs>(args: SelectSubset<T, AttachmentCreateArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Attachments.
     * @param {AttachmentCreateManyArgs} args - Arguments to create many Attachments.
     * @example
     * // Create many Attachments
     * const attachment = await prisma.attachment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AttachmentCreateManyArgs>(args?: SelectSubset<T, AttachmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Attachments and returns the data saved in the database.
     * @param {AttachmentCreateManyAndReturnArgs} args - Arguments to create many Attachments.
     * @example
     * // Create many Attachments
     * const attachment = await prisma.attachment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Attachments and only return the `id`
     * const attachmentWithIdOnly = await prisma.attachment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AttachmentCreateManyAndReturnArgs>(args?: SelectSubset<T, AttachmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Attachment.
     * @param {AttachmentDeleteArgs} args - Arguments to delete one Attachment.
     * @example
     * // Delete one Attachment
     * const Attachment = await prisma.attachment.delete({
     *   where: {
     *     // ... filter to delete one Attachment
     *   }
     * })
     * 
     */
    delete<T extends AttachmentDeleteArgs>(args: SelectSubset<T, AttachmentDeleteArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Attachment.
     * @param {AttachmentUpdateArgs} args - Arguments to update one Attachment.
     * @example
     * // Update one Attachment
     * const attachment = await prisma.attachment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AttachmentUpdateArgs>(args: SelectSubset<T, AttachmentUpdateArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Attachments.
     * @param {AttachmentDeleteManyArgs} args - Arguments to filter Attachments to delete.
     * @example
     * // Delete a few Attachments
     * const { count } = await prisma.attachment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AttachmentDeleteManyArgs>(args?: SelectSubset<T, AttachmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Attachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Attachments
     * const attachment = await prisma.attachment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AttachmentUpdateManyArgs>(args: SelectSubset<T, AttachmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Attachments and returns the data updated in the database.
     * @param {AttachmentUpdateManyAndReturnArgs} args - Arguments to update many Attachments.
     * @example
     * // Update many Attachments
     * const attachment = await prisma.attachment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Attachments and only return the `id`
     * const attachmentWithIdOnly = await prisma.attachment.updateManyAndReturn({
     *   select: { id: true },
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
    updateManyAndReturn<T extends AttachmentUpdateManyAndReturnArgs>(args: SelectSubset<T, AttachmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Attachment.
     * @param {AttachmentUpsertArgs} args - Arguments to update or create a Attachment.
     * @example
     * // Update or create a Attachment
     * const attachment = await prisma.attachment.upsert({
     *   create: {
     *     // ... data to create a Attachment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Attachment we want to update
     *   }
     * })
     */
    upsert<T extends AttachmentUpsertArgs>(args: SelectSubset<T, AttachmentUpsertArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Attachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentCountArgs} args - Arguments to filter Attachments to count.
     * @example
     * // Count the number of Attachments
     * const count = await prisma.attachment.count({
     *   where: {
     *     // ... the filter for the Attachments we want to count
     *   }
     * })
    **/
    count<T extends AttachmentCountArgs>(
      args?: Subset<T, AttachmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AttachmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Attachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AttachmentAggregateArgs>(args: Subset<T, AttachmentAggregateArgs>): Prisma.PrismaPromise<GetAttachmentAggregateType<T>>

    /**
     * Group by Attachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentGroupByArgs} args - Group by arguments.
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
      T extends AttachmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AttachmentGroupByArgs['orderBy'] }
        : { orderBy?: AttachmentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AttachmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAttachmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Attachment model
   */
  readonly fields: AttachmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Attachment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AttachmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ticket<T extends Attachment$ticketArgs<ExtArgs> = {}>(args?: Subset<T, Attachment$ticketArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    comment<T extends Attachment$commentArgs<ExtArgs> = {}>(args?: Subset<T, Attachment$commentArgs<ExtArgs>>): Prisma__TicketCommentClient<$Result.GetResult<Prisma.$TicketCommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Attachment model
   */
  interface AttachmentFieldRefs {
    readonly id: FieldRef<"Attachment", 'String'>
    readonly filename: FieldRef<"Attachment", 'String'>
    readonly originalName: FieldRef<"Attachment", 'String'>
    readonly mimeType: FieldRef<"Attachment", 'String'>
    readonly size: FieldRef<"Attachment", 'Int'>
    readonly filePath: FieldRef<"Attachment", 'String'>
    readonly url: FieldRef<"Attachment", 'String'>
    readonly ticketId: FieldRef<"Attachment", 'String'>
    readonly commentId: FieldRef<"Attachment", 'String'>
    readonly uploadedBy: FieldRef<"Attachment", 'String'>
    readonly tenantId: FieldRef<"Attachment", 'String'>
    readonly uploadedAt: FieldRef<"Attachment", 'DateTime'>
    readonly createdAt: FieldRef<"Attachment", 'DateTime'>
    readonly updatedAt: FieldRef<"Attachment", 'DateTime'>
    readonly deletedAt: FieldRef<"Attachment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Attachment findUnique
   */
  export type AttachmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * Filter, which Attachment to fetch.
     */
    where: AttachmentWhereUniqueInput
  }

  /**
   * Attachment findUniqueOrThrow
   */
  export type AttachmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * Filter, which Attachment to fetch.
     */
    where: AttachmentWhereUniqueInput
  }

  /**
   * Attachment findFirst
   */
  export type AttachmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * Filter, which Attachment to fetch.
     */
    where?: AttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attachments to fetch.
     */
    orderBy?: AttachmentOrderByWithRelationInput | AttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Attachments.
     */
    cursor?: AttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attachments.
     */
    distinct?: AttachmentScalarFieldEnum | AttachmentScalarFieldEnum[]
  }

  /**
   * Attachment findFirstOrThrow
   */
  export type AttachmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * Filter, which Attachment to fetch.
     */
    where?: AttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attachments to fetch.
     */
    orderBy?: AttachmentOrderByWithRelationInput | AttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Attachments.
     */
    cursor?: AttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attachments.
     */
    distinct?: AttachmentScalarFieldEnum | AttachmentScalarFieldEnum[]
  }

  /**
   * Attachment findMany
   */
  export type AttachmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * Filter, which Attachments to fetch.
     */
    where?: AttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attachments to fetch.
     */
    orderBy?: AttachmentOrderByWithRelationInput | AttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Attachments.
     */
    cursor?: AttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attachments.
     */
    skip?: number
    distinct?: AttachmentScalarFieldEnum | AttachmentScalarFieldEnum[]
  }

  /**
   * Attachment create
   */
  export type AttachmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Attachment.
     */
    data: XOR<AttachmentCreateInput, AttachmentUncheckedCreateInput>
  }

  /**
   * Attachment createMany
   */
  export type AttachmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Attachments.
     */
    data: AttachmentCreateManyInput | AttachmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Attachment createManyAndReturn
   */
  export type AttachmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * The data used to create many Attachments.
     */
    data: AttachmentCreateManyInput | AttachmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Attachment update
   */
  export type AttachmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Attachment.
     */
    data: XOR<AttachmentUpdateInput, AttachmentUncheckedUpdateInput>
    /**
     * Choose, which Attachment to update.
     */
    where: AttachmentWhereUniqueInput
  }

  /**
   * Attachment updateMany
   */
  export type AttachmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Attachments.
     */
    data: XOR<AttachmentUpdateManyMutationInput, AttachmentUncheckedUpdateManyInput>
    /**
     * Filter which Attachments to update
     */
    where?: AttachmentWhereInput
    /**
     * Limit how many Attachments to update.
     */
    limit?: number
  }

  /**
   * Attachment updateManyAndReturn
   */
  export type AttachmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * The data used to update Attachments.
     */
    data: XOR<AttachmentUpdateManyMutationInput, AttachmentUncheckedUpdateManyInput>
    /**
     * Filter which Attachments to update
     */
    where?: AttachmentWhereInput
    /**
     * Limit how many Attachments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Attachment upsert
   */
  export type AttachmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Attachment to update in case it exists.
     */
    where: AttachmentWhereUniqueInput
    /**
     * In case the Attachment found by the `where` argument doesn't exist, create a new Attachment with this data.
     */
    create: XOR<AttachmentCreateInput, AttachmentUncheckedCreateInput>
    /**
     * In case the Attachment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AttachmentUpdateInput, AttachmentUncheckedUpdateInput>
  }

  /**
   * Attachment delete
   */
  export type AttachmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * Filter which Attachment to delete.
     */
    where: AttachmentWhereUniqueInput
  }

  /**
   * Attachment deleteMany
   */
  export type AttachmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Attachments to delete
     */
    where?: AttachmentWhereInput
    /**
     * Limit how many Attachments to delete.
     */
    limit?: number
  }

  /**
   * Attachment.ticket
   */
  export type Attachment$ticketArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    where?: TicketWhereInput
  }

  /**
   * Attachment.comment
   */
  export type Attachment$commentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketComment
     */
    select?: TicketCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketComment
     */
    omit?: TicketCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketCommentInclude<ExtArgs> | null
    where?: TicketCommentWhereInput
  }

  /**
   * Attachment without action
   */
  export type AttachmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
  }


  /**
   * Model SLA
   */

  export type AggregateSLA = {
    _count: SLACountAggregateOutputType | null
    _avg: SLAAvgAggregateOutputType | null
    _sum: SLASumAggregateOutputType | null
    _min: SLAMinAggregateOutputType | null
    _max: SLAMaxAggregateOutputType | null
  }

  export type SLAAvgAggregateOutputType = {
    responseTime: number | null
    resolutionTime: number | null
  }

  export type SLASumAggregateOutputType = {
    responseTime: number | null
    resolutionTime: number | null
  }

  export type SLAMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    description: string | null
    responseTime: number | null
    resolutionTime: number | null
    priorityId: string | null
    departmentId: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SLAMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    description: string | null
    responseTime: number | null
    resolutionTime: number | null
    priorityId: string | null
    departmentId: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SLACountAggregateOutputType = {
    id: number
    tenantId: number
    name: number
    description: number
    responseTime: number
    resolutionTime: number
    priorityId: number
    departmentId: number
    isActive: number
    escalationRules: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SLAAvgAggregateInputType = {
    responseTime?: true
    resolutionTime?: true
  }

  export type SLASumAggregateInputType = {
    responseTime?: true
    resolutionTime?: true
  }

  export type SLAMinAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    description?: true
    responseTime?: true
    resolutionTime?: true
    priorityId?: true
    departmentId?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SLAMaxAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    description?: true
    responseTime?: true
    resolutionTime?: true
    priorityId?: true
    departmentId?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SLACountAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    description?: true
    responseTime?: true
    resolutionTime?: true
    priorityId?: true
    departmentId?: true
    isActive?: true
    escalationRules?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SLAAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SLA to aggregate.
     */
    where?: SLAWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SLAS to fetch.
     */
    orderBy?: SLAOrderByWithRelationInput | SLAOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SLAWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SLAS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SLAS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SLAS
    **/
    _count?: true | SLACountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SLAAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SLASumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SLAMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SLAMaxAggregateInputType
  }

  export type GetSLAAggregateType<T extends SLAAggregateArgs> = {
        [P in keyof T & keyof AggregateSLA]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSLA[P]>
      : GetScalarType<T[P], AggregateSLA[P]>
  }




  export type SLAGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SLAWhereInput
    orderBy?: SLAOrderByWithAggregationInput | SLAOrderByWithAggregationInput[]
    by: SLAScalarFieldEnum[] | SLAScalarFieldEnum
    having?: SLAScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SLACountAggregateInputType | true
    _avg?: SLAAvgAggregateInputType
    _sum?: SLASumAggregateInputType
    _min?: SLAMinAggregateInputType
    _max?: SLAMaxAggregateInputType
  }

  export type SLAGroupByOutputType = {
    id: string
    tenantId: string
    name: string
    description: string | null
    responseTime: number
    resolutionTime: number
    priorityId: string | null
    departmentId: string | null
    isActive: boolean
    escalationRules: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: SLACountAggregateOutputType | null
    _avg: SLAAvgAggregateOutputType | null
    _sum: SLASumAggregateOutputType | null
    _min: SLAMinAggregateOutputType | null
    _max: SLAMaxAggregateOutputType | null
  }

  type GetSLAGroupByPayload<T extends SLAGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SLAGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SLAGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SLAGroupByOutputType[P]>
            : GetScalarType<T[P], SLAGroupByOutputType[P]>
        }
      >
    >


  export type SLASelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    responseTime?: boolean
    resolutionTime?: boolean
    priorityId?: boolean
    departmentId?: boolean
    isActive?: boolean
    escalationRules?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    priority?: boolean | SLA$priorityArgs<ExtArgs>
  }, ExtArgs["result"]["sLA"]>

  export type SLASelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    responseTime?: boolean
    resolutionTime?: boolean
    priorityId?: boolean
    departmentId?: boolean
    isActive?: boolean
    escalationRules?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    priority?: boolean | SLA$priorityArgs<ExtArgs>
  }, ExtArgs["result"]["sLA"]>

  export type SLASelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    responseTime?: boolean
    resolutionTime?: boolean
    priorityId?: boolean
    departmentId?: boolean
    isActive?: boolean
    escalationRules?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    priority?: boolean | SLA$priorityArgs<ExtArgs>
  }, ExtArgs["result"]["sLA"]>

  export type SLASelectScalar = {
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    responseTime?: boolean
    resolutionTime?: boolean
    priorityId?: boolean
    departmentId?: boolean
    isActive?: boolean
    escalationRules?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SLAOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "name" | "description" | "responseTime" | "resolutionTime" | "priorityId" | "departmentId" | "isActive" | "escalationRules" | "createdAt" | "updatedAt", ExtArgs["result"]["sLA"]>
  export type SLAInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    priority?: boolean | SLA$priorityArgs<ExtArgs>
  }
  export type SLAIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    priority?: boolean | SLA$priorityArgs<ExtArgs>
  }
  export type SLAIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    priority?: boolean | SLA$priorityArgs<ExtArgs>
  }

  export type $SLAPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SLA"
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs>
      priority: Prisma.$PriorityPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      name: string
      description: string | null
      responseTime: number
      resolutionTime: number
      priorityId: string | null
      departmentId: string | null
      isActive: boolean
      escalationRules: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["sLA"]>
    composites: {}
  }

  type SLAGetPayload<S extends boolean | null | undefined | SLADefaultArgs> = $Result.GetResult<Prisma.$SLAPayload, S>

  type SLACountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SLAFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SLACountAggregateInputType | true
    }

  export interface SLADelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SLA'], meta: { name: 'SLA' } }
    /**
     * Find zero or one SLA that matches the filter.
     * @param {SLAFindUniqueArgs} args - Arguments to find a SLA
     * @example
     * // Get one SLA
     * const sLA = await prisma.sLA.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SLAFindUniqueArgs>(args: SelectSubset<T, SLAFindUniqueArgs<ExtArgs>>): Prisma__SLAClient<$Result.GetResult<Prisma.$SLAPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SLA that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SLAFindUniqueOrThrowArgs} args - Arguments to find a SLA
     * @example
     * // Get one SLA
     * const sLA = await prisma.sLA.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SLAFindUniqueOrThrowArgs>(args: SelectSubset<T, SLAFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SLAClient<$Result.GetResult<Prisma.$SLAPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SLA that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SLAFindFirstArgs} args - Arguments to find a SLA
     * @example
     * // Get one SLA
     * const sLA = await prisma.sLA.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SLAFindFirstArgs>(args?: SelectSubset<T, SLAFindFirstArgs<ExtArgs>>): Prisma__SLAClient<$Result.GetResult<Prisma.$SLAPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SLA that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SLAFindFirstOrThrowArgs} args - Arguments to find a SLA
     * @example
     * // Get one SLA
     * const sLA = await prisma.sLA.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SLAFindFirstOrThrowArgs>(args?: SelectSubset<T, SLAFindFirstOrThrowArgs<ExtArgs>>): Prisma__SLAClient<$Result.GetResult<Prisma.$SLAPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SLAS that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SLAFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SLAS
     * const sLAS = await prisma.sLA.findMany()
     * 
     * // Get first 10 SLAS
     * const sLAS = await prisma.sLA.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sLAWithIdOnly = await prisma.sLA.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SLAFindManyArgs>(args?: SelectSubset<T, SLAFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SLAPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SLA.
     * @param {SLACreateArgs} args - Arguments to create a SLA.
     * @example
     * // Create one SLA
     * const SLA = await prisma.sLA.create({
     *   data: {
     *     // ... data to create a SLA
     *   }
     * })
     * 
     */
    create<T extends SLACreateArgs>(args: SelectSubset<T, SLACreateArgs<ExtArgs>>): Prisma__SLAClient<$Result.GetResult<Prisma.$SLAPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SLAS.
     * @param {SLACreateManyArgs} args - Arguments to create many SLAS.
     * @example
     * // Create many SLAS
     * const sLA = await prisma.sLA.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SLACreateManyArgs>(args?: SelectSubset<T, SLACreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SLAS and returns the data saved in the database.
     * @param {SLACreateManyAndReturnArgs} args - Arguments to create many SLAS.
     * @example
     * // Create many SLAS
     * const sLA = await prisma.sLA.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SLAS and only return the `id`
     * const sLAWithIdOnly = await prisma.sLA.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SLACreateManyAndReturnArgs>(args?: SelectSubset<T, SLACreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SLAPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SLA.
     * @param {SLADeleteArgs} args - Arguments to delete one SLA.
     * @example
     * // Delete one SLA
     * const SLA = await prisma.sLA.delete({
     *   where: {
     *     // ... filter to delete one SLA
     *   }
     * })
     * 
     */
    delete<T extends SLADeleteArgs>(args: SelectSubset<T, SLADeleteArgs<ExtArgs>>): Prisma__SLAClient<$Result.GetResult<Prisma.$SLAPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SLA.
     * @param {SLAUpdateArgs} args - Arguments to update one SLA.
     * @example
     * // Update one SLA
     * const sLA = await prisma.sLA.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SLAUpdateArgs>(args: SelectSubset<T, SLAUpdateArgs<ExtArgs>>): Prisma__SLAClient<$Result.GetResult<Prisma.$SLAPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SLAS.
     * @param {SLADeleteManyArgs} args - Arguments to filter SLAS to delete.
     * @example
     * // Delete a few SLAS
     * const { count } = await prisma.sLA.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SLADeleteManyArgs>(args?: SelectSubset<T, SLADeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SLAS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SLAUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SLAS
     * const sLA = await prisma.sLA.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SLAUpdateManyArgs>(args: SelectSubset<T, SLAUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SLAS and returns the data updated in the database.
     * @param {SLAUpdateManyAndReturnArgs} args - Arguments to update many SLAS.
     * @example
     * // Update many SLAS
     * const sLA = await prisma.sLA.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SLAS and only return the `id`
     * const sLAWithIdOnly = await prisma.sLA.updateManyAndReturn({
     *   select: { id: true },
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
    updateManyAndReturn<T extends SLAUpdateManyAndReturnArgs>(args: SelectSubset<T, SLAUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SLAPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SLA.
     * @param {SLAUpsertArgs} args - Arguments to update or create a SLA.
     * @example
     * // Update or create a SLA
     * const sLA = await prisma.sLA.upsert({
     *   create: {
     *     // ... data to create a SLA
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SLA we want to update
     *   }
     * })
     */
    upsert<T extends SLAUpsertArgs>(args: SelectSubset<T, SLAUpsertArgs<ExtArgs>>): Prisma__SLAClient<$Result.GetResult<Prisma.$SLAPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SLAS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SLACountArgs} args - Arguments to filter SLAS to count.
     * @example
     * // Count the number of SLAS
     * const count = await prisma.sLA.count({
     *   where: {
     *     // ... the filter for the SLAS we want to count
     *   }
     * })
    **/
    count<T extends SLACountArgs>(
      args?: Subset<T, SLACountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SLACountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SLA.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SLAAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SLAAggregateArgs>(args: Subset<T, SLAAggregateArgs>): Prisma.PrismaPromise<GetSLAAggregateType<T>>

    /**
     * Group by SLA.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SLAGroupByArgs} args - Group by arguments.
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
      T extends SLAGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SLAGroupByArgs['orderBy'] }
        : { orderBy?: SLAGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SLAGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSLAGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SLA model
   */
  readonly fields: SLAFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SLA.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SLAClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    priority<T extends SLA$priorityArgs<ExtArgs> = {}>(args?: Subset<T, SLA$priorityArgs<ExtArgs>>): Prisma__PriorityClient<$Result.GetResult<Prisma.$PriorityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the SLA model
   */
  interface SLAFieldRefs {
    readonly id: FieldRef<"SLA", 'String'>
    readonly tenantId: FieldRef<"SLA", 'String'>
    readonly name: FieldRef<"SLA", 'String'>
    readonly description: FieldRef<"SLA", 'String'>
    readonly responseTime: FieldRef<"SLA", 'Int'>
    readonly resolutionTime: FieldRef<"SLA", 'Int'>
    readonly priorityId: FieldRef<"SLA", 'String'>
    readonly departmentId: FieldRef<"SLA", 'String'>
    readonly isActive: FieldRef<"SLA", 'Boolean'>
    readonly escalationRules: FieldRef<"SLA", 'Json'>
    readonly createdAt: FieldRef<"SLA", 'DateTime'>
    readonly updatedAt: FieldRef<"SLA", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SLA findUnique
   */
  export type SLAFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SLA
     */
    select?: SLASelect<ExtArgs> | null
    /**
     * Omit specific fields from the SLA
     */
    omit?: SLAOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SLAInclude<ExtArgs> | null
    /**
     * Filter, which SLA to fetch.
     */
    where: SLAWhereUniqueInput
  }

  /**
   * SLA findUniqueOrThrow
   */
  export type SLAFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SLA
     */
    select?: SLASelect<ExtArgs> | null
    /**
     * Omit specific fields from the SLA
     */
    omit?: SLAOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SLAInclude<ExtArgs> | null
    /**
     * Filter, which SLA to fetch.
     */
    where: SLAWhereUniqueInput
  }

  /**
   * SLA findFirst
   */
  export type SLAFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SLA
     */
    select?: SLASelect<ExtArgs> | null
    /**
     * Omit specific fields from the SLA
     */
    omit?: SLAOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SLAInclude<ExtArgs> | null
    /**
     * Filter, which SLA to fetch.
     */
    where?: SLAWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SLAS to fetch.
     */
    orderBy?: SLAOrderByWithRelationInput | SLAOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SLAS.
     */
    cursor?: SLAWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SLAS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SLAS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SLAS.
     */
    distinct?: SLAScalarFieldEnum | SLAScalarFieldEnum[]
  }

  /**
   * SLA findFirstOrThrow
   */
  export type SLAFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SLA
     */
    select?: SLASelect<ExtArgs> | null
    /**
     * Omit specific fields from the SLA
     */
    omit?: SLAOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SLAInclude<ExtArgs> | null
    /**
     * Filter, which SLA to fetch.
     */
    where?: SLAWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SLAS to fetch.
     */
    orderBy?: SLAOrderByWithRelationInput | SLAOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SLAS.
     */
    cursor?: SLAWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SLAS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SLAS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SLAS.
     */
    distinct?: SLAScalarFieldEnum | SLAScalarFieldEnum[]
  }

  /**
   * SLA findMany
   */
  export type SLAFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SLA
     */
    select?: SLASelect<ExtArgs> | null
    /**
     * Omit specific fields from the SLA
     */
    omit?: SLAOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SLAInclude<ExtArgs> | null
    /**
     * Filter, which SLAS to fetch.
     */
    where?: SLAWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SLAS to fetch.
     */
    orderBy?: SLAOrderByWithRelationInput | SLAOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SLAS.
     */
    cursor?: SLAWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SLAS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SLAS.
     */
    skip?: number
    distinct?: SLAScalarFieldEnum | SLAScalarFieldEnum[]
  }

  /**
   * SLA create
   */
  export type SLACreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SLA
     */
    select?: SLASelect<ExtArgs> | null
    /**
     * Omit specific fields from the SLA
     */
    omit?: SLAOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SLAInclude<ExtArgs> | null
    /**
     * The data needed to create a SLA.
     */
    data: XOR<SLACreateInput, SLAUncheckedCreateInput>
  }

  /**
   * SLA createMany
   */
  export type SLACreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SLAS.
     */
    data: SLACreateManyInput | SLACreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SLA createManyAndReturn
   */
  export type SLACreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SLA
     */
    select?: SLASelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SLA
     */
    omit?: SLAOmit<ExtArgs> | null
    /**
     * The data used to create many SLAS.
     */
    data: SLACreateManyInput | SLACreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SLAIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SLA update
   */
  export type SLAUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SLA
     */
    select?: SLASelect<ExtArgs> | null
    /**
     * Omit specific fields from the SLA
     */
    omit?: SLAOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SLAInclude<ExtArgs> | null
    /**
     * The data needed to update a SLA.
     */
    data: XOR<SLAUpdateInput, SLAUncheckedUpdateInput>
    /**
     * Choose, which SLA to update.
     */
    where: SLAWhereUniqueInput
  }

  /**
   * SLA updateMany
   */
  export type SLAUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SLAS.
     */
    data: XOR<SLAUpdateManyMutationInput, SLAUncheckedUpdateManyInput>
    /**
     * Filter which SLAS to update
     */
    where?: SLAWhereInput
    /**
     * Limit how many SLAS to update.
     */
    limit?: number
  }

  /**
   * SLA updateManyAndReturn
   */
  export type SLAUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SLA
     */
    select?: SLASelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SLA
     */
    omit?: SLAOmit<ExtArgs> | null
    /**
     * The data used to update SLAS.
     */
    data: XOR<SLAUpdateManyMutationInput, SLAUncheckedUpdateManyInput>
    /**
     * Filter which SLAS to update
     */
    where?: SLAWhereInput
    /**
     * Limit how many SLAS to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SLAIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SLA upsert
   */
  export type SLAUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SLA
     */
    select?: SLASelect<ExtArgs> | null
    /**
     * Omit specific fields from the SLA
     */
    omit?: SLAOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SLAInclude<ExtArgs> | null
    /**
     * The filter to search for the SLA to update in case it exists.
     */
    where: SLAWhereUniqueInput
    /**
     * In case the SLA found by the `where` argument doesn't exist, create a new SLA with this data.
     */
    create: XOR<SLACreateInput, SLAUncheckedCreateInput>
    /**
     * In case the SLA was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SLAUpdateInput, SLAUncheckedUpdateInput>
  }

  /**
   * SLA delete
   */
  export type SLADeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SLA
     */
    select?: SLASelect<ExtArgs> | null
    /**
     * Omit specific fields from the SLA
     */
    omit?: SLAOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SLAInclude<ExtArgs> | null
    /**
     * Filter which SLA to delete.
     */
    where: SLAWhereUniqueInput
  }

  /**
   * SLA deleteMany
   */
  export type SLADeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SLAS to delete
     */
    where?: SLAWhereInput
    /**
     * Limit how many SLAS to delete.
     */
    limit?: number
  }

  /**
   * SLA.priority
   */
  export type SLA$priorityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Priority
     */
    select?: PrioritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Priority
     */
    omit?: PriorityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriorityInclude<ExtArgs> | null
    where?: PriorityWhereInput
  }

  /**
   * SLA without action
   */
  export type SLADefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SLA
     */
    select?: SLASelect<ExtArgs> | null
    /**
     * Omit specific fields from the SLA
     */
    omit?: SLAOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SLAInclude<ExtArgs> | null
  }


  /**
   * Model Workflow
   */

  export type AggregateWorkflow = {
    _count: WorkflowCountAggregateOutputType | null
    _min: WorkflowMinAggregateOutputType | null
    _max: WorkflowMaxAggregateOutputType | null
  }

  export type WorkflowMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    description: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WorkflowMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    description: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WorkflowCountAggregateOutputType = {
    id: number
    tenantId: number
    name: number
    description: number
    rules: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WorkflowMinAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WorkflowMaxAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WorkflowCountAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    description?: true
    rules?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WorkflowAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Workflow to aggregate.
     */
    where?: WorkflowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workflows to fetch.
     */
    orderBy?: WorkflowOrderByWithRelationInput | WorkflowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkflowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workflows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workflows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Workflows
    **/
    _count?: true | WorkflowCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkflowMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkflowMaxAggregateInputType
  }

  export type GetWorkflowAggregateType<T extends WorkflowAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkflow]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkflow[P]>
      : GetScalarType<T[P], AggregateWorkflow[P]>
  }




  export type WorkflowGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkflowWhereInput
    orderBy?: WorkflowOrderByWithAggregationInput | WorkflowOrderByWithAggregationInput[]
    by: WorkflowScalarFieldEnum[] | WorkflowScalarFieldEnum
    having?: WorkflowScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkflowCountAggregateInputType | true
    _min?: WorkflowMinAggregateInputType
    _max?: WorkflowMaxAggregateInputType
  }

  export type WorkflowGroupByOutputType = {
    id: string
    tenantId: string
    name: string
    description: string | null
    rules: JsonValue
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: WorkflowCountAggregateOutputType | null
    _min: WorkflowMinAggregateOutputType | null
    _max: WorkflowMaxAggregateOutputType | null
  }

  type GetWorkflowGroupByPayload<T extends WorkflowGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkflowGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkflowGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkflowGroupByOutputType[P]>
            : GetScalarType<T[P], WorkflowGroupByOutputType[P]>
        }
      >
    >


  export type WorkflowSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    rules?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workflow"]>

  export type WorkflowSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    rules?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workflow"]>

  export type WorkflowSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    rules?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workflow"]>

  export type WorkflowSelectScalar = {
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    rules?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WorkflowOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "name" | "description" | "rules" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["workflow"]>
  export type WorkflowInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type WorkflowIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type WorkflowIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }

  export type $WorkflowPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Workflow"
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      name: string
      description: string | null
      rules: Prisma.JsonValue
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["workflow"]>
    composites: {}
  }

  type WorkflowGetPayload<S extends boolean | null | undefined | WorkflowDefaultArgs> = $Result.GetResult<Prisma.$WorkflowPayload, S>

  type WorkflowCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkflowFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkflowCountAggregateInputType | true
    }

  export interface WorkflowDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Workflow'], meta: { name: 'Workflow' } }
    /**
     * Find zero or one Workflow that matches the filter.
     * @param {WorkflowFindUniqueArgs} args - Arguments to find a Workflow
     * @example
     * // Get one Workflow
     * const workflow = await prisma.workflow.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkflowFindUniqueArgs>(args: SelectSubset<T, WorkflowFindUniqueArgs<ExtArgs>>): Prisma__WorkflowClient<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Workflow that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkflowFindUniqueOrThrowArgs} args - Arguments to find a Workflow
     * @example
     * // Get one Workflow
     * const workflow = await prisma.workflow.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkflowFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkflowFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkflowClient<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Workflow that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowFindFirstArgs} args - Arguments to find a Workflow
     * @example
     * // Get one Workflow
     * const workflow = await prisma.workflow.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkflowFindFirstArgs>(args?: SelectSubset<T, WorkflowFindFirstArgs<ExtArgs>>): Prisma__WorkflowClient<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Workflow that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowFindFirstOrThrowArgs} args - Arguments to find a Workflow
     * @example
     * // Get one Workflow
     * const workflow = await prisma.workflow.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkflowFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkflowFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkflowClient<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Workflows that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Workflows
     * const workflows = await prisma.workflow.findMany()
     * 
     * // Get first 10 Workflows
     * const workflows = await prisma.workflow.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workflowWithIdOnly = await prisma.workflow.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkflowFindManyArgs>(args?: SelectSubset<T, WorkflowFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Workflow.
     * @param {WorkflowCreateArgs} args - Arguments to create a Workflow.
     * @example
     * // Create one Workflow
     * const Workflow = await prisma.workflow.create({
     *   data: {
     *     // ... data to create a Workflow
     *   }
     * })
     * 
     */
    create<T extends WorkflowCreateArgs>(args: SelectSubset<T, WorkflowCreateArgs<ExtArgs>>): Prisma__WorkflowClient<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Workflows.
     * @param {WorkflowCreateManyArgs} args - Arguments to create many Workflows.
     * @example
     * // Create many Workflows
     * const workflow = await prisma.workflow.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkflowCreateManyArgs>(args?: SelectSubset<T, WorkflowCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Workflows and returns the data saved in the database.
     * @param {WorkflowCreateManyAndReturnArgs} args - Arguments to create many Workflows.
     * @example
     * // Create many Workflows
     * const workflow = await prisma.workflow.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Workflows and only return the `id`
     * const workflowWithIdOnly = await prisma.workflow.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkflowCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkflowCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Workflow.
     * @param {WorkflowDeleteArgs} args - Arguments to delete one Workflow.
     * @example
     * // Delete one Workflow
     * const Workflow = await prisma.workflow.delete({
     *   where: {
     *     // ... filter to delete one Workflow
     *   }
     * })
     * 
     */
    delete<T extends WorkflowDeleteArgs>(args: SelectSubset<T, WorkflowDeleteArgs<ExtArgs>>): Prisma__WorkflowClient<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Workflow.
     * @param {WorkflowUpdateArgs} args - Arguments to update one Workflow.
     * @example
     * // Update one Workflow
     * const workflow = await prisma.workflow.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkflowUpdateArgs>(args: SelectSubset<T, WorkflowUpdateArgs<ExtArgs>>): Prisma__WorkflowClient<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Workflows.
     * @param {WorkflowDeleteManyArgs} args - Arguments to filter Workflows to delete.
     * @example
     * // Delete a few Workflows
     * const { count } = await prisma.workflow.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkflowDeleteManyArgs>(args?: SelectSubset<T, WorkflowDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Workflows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Workflows
     * const workflow = await prisma.workflow.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkflowUpdateManyArgs>(args: SelectSubset<T, WorkflowUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Workflows and returns the data updated in the database.
     * @param {WorkflowUpdateManyAndReturnArgs} args - Arguments to update many Workflows.
     * @example
     * // Update many Workflows
     * const workflow = await prisma.workflow.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Workflows and only return the `id`
     * const workflowWithIdOnly = await prisma.workflow.updateManyAndReturn({
     *   select: { id: true },
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
    updateManyAndReturn<T extends WorkflowUpdateManyAndReturnArgs>(args: SelectSubset<T, WorkflowUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Workflow.
     * @param {WorkflowUpsertArgs} args - Arguments to update or create a Workflow.
     * @example
     * // Update or create a Workflow
     * const workflow = await prisma.workflow.upsert({
     *   create: {
     *     // ... data to create a Workflow
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Workflow we want to update
     *   }
     * })
     */
    upsert<T extends WorkflowUpsertArgs>(args: SelectSubset<T, WorkflowUpsertArgs<ExtArgs>>): Prisma__WorkflowClient<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Workflows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowCountArgs} args - Arguments to filter Workflows to count.
     * @example
     * // Count the number of Workflows
     * const count = await prisma.workflow.count({
     *   where: {
     *     // ... the filter for the Workflows we want to count
     *   }
     * })
    **/
    count<T extends WorkflowCountArgs>(
      args?: Subset<T, WorkflowCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkflowCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Workflow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WorkflowAggregateArgs>(args: Subset<T, WorkflowAggregateArgs>): Prisma.PrismaPromise<GetWorkflowAggregateType<T>>

    /**
     * Group by Workflow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowGroupByArgs} args - Group by arguments.
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
      T extends WorkflowGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkflowGroupByArgs['orderBy'] }
        : { orderBy?: WorkflowGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, WorkflowGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkflowGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Workflow model
   */
  readonly fields: WorkflowFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Workflow.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkflowClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Workflow model
   */
  interface WorkflowFieldRefs {
    readonly id: FieldRef<"Workflow", 'String'>
    readonly tenantId: FieldRef<"Workflow", 'String'>
    readonly name: FieldRef<"Workflow", 'String'>
    readonly description: FieldRef<"Workflow", 'String'>
    readonly rules: FieldRef<"Workflow", 'Json'>
    readonly isActive: FieldRef<"Workflow", 'Boolean'>
    readonly createdAt: FieldRef<"Workflow", 'DateTime'>
    readonly updatedAt: FieldRef<"Workflow", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Workflow findUnique
   */
  export type WorkflowFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workflow
     */
    omit?: WorkflowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowInclude<ExtArgs> | null
    /**
     * Filter, which Workflow to fetch.
     */
    where: WorkflowWhereUniqueInput
  }

  /**
   * Workflow findUniqueOrThrow
   */
  export type WorkflowFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workflow
     */
    omit?: WorkflowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowInclude<ExtArgs> | null
    /**
     * Filter, which Workflow to fetch.
     */
    where: WorkflowWhereUniqueInput
  }

  /**
   * Workflow findFirst
   */
  export type WorkflowFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workflow
     */
    omit?: WorkflowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowInclude<ExtArgs> | null
    /**
     * Filter, which Workflow to fetch.
     */
    where?: WorkflowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workflows to fetch.
     */
    orderBy?: WorkflowOrderByWithRelationInput | WorkflowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Workflows.
     */
    cursor?: WorkflowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workflows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workflows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Workflows.
     */
    distinct?: WorkflowScalarFieldEnum | WorkflowScalarFieldEnum[]
  }

  /**
   * Workflow findFirstOrThrow
   */
  export type WorkflowFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workflow
     */
    omit?: WorkflowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowInclude<ExtArgs> | null
    /**
     * Filter, which Workflow to fetch.
     */
    where?: WorkflowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workflows to fetch.
     */
    orderBy?: WorkflowOrderByWithRelationInput | WorkflowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Workflows.
     */
    cursor?: WorkflowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workflows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workflows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Workflows.
     */
    distinct?: WorkflowScalarFieldEnum | WorkflowScalarFieldEnum[]
  }

  /**
   * Workflow findMany
   */
  export type WorkflowFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workflow
     */
    omit?: WorkflowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowInclude<ExtArgs> | null
    /**
     * Filter, which Workflows to fetch.
     */
    where?: WorkflowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workflows to fetch.
     */
    orderBy?: WorkflowOrderByWithRelationInput | WorkflowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Workflows.
     */
    cursor?: WorkflowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workflows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workflows.
     */
    skip?: number
    distinct?: WorkflowScalarFieldEnum | WorkflowScalarFieldEnum[]
  }

  /**
   * Workflow create
   */
  export type WorkflowCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workflow
     */
    omit?: WorkflowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowInclude<ExtArgs> | null
    /**
     * The data needed to create a Workflow.
     */
    data: XOR<WorkflowCreateInput, WorkflowUncheckedCreateInput>
  }

  /**
   * Workflow createMany
   */
  export type WorkflowCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Workflows.
     */
    data: WorkflowCreateManyInput | WorkflowCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Workflow createManyAndReturn
   */
  export type WorkflowCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Workflow
     */
    omit?: WorkflowOmit<ExtArgs> | null
    /**
     * The data used to create many Workflows.
     */
    data: WorkflowCreateManyInput | WorkflowCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Workflow update
   */
  export type WorkflowUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workflow
     */
    omit?: WorkflowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowInclude<ExtArgs> | null
    /**
     * The data needed to update a Workflow.
     */
    data: XOR<WorkflowUpdateInput, WorkflowUncheckedUpdateInput>
    /**
     * Choose, which Workflow to update.
     */
    where: WorkflowWhereUniqueInput
  }

  /**
   * Workflow updateMany
   */
  export type WorkflowUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Workflows.
     */
    data: XOR<WorkflowUpdateManyMutationInput, WorkflowUncheckedUpdateManyInput>
    /**
     * Filter which Workflows to update
     */
    where?: WorkflowWhereInput
    /**
     * Limit how many Workflows to update.
     */
    limit?: number
  }

  /**
   * Workflow updateManyAndReturn
   */
  export type WorkflowUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Workflow
     */
    omit?: WorkflowOmit<ExtArgs> | null
    /**
     * The data used to update Workflows.
     */
    data: XOR<WorkflowUpdateManyMutationInput, WorkflowUncheckedUpdateManyInput>
    /**
     * Filter which Workflows to update
     */
    where?: WorkflowWhereInput
    /**
     * Limit how many Workflows to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Workflow upsert
   */
  export type WorkflowUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workflow
     */
    omit?: WorkflowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowInclude<ExtArgs> | null
    /**
     * The filter to search for the Workflow to update in case it exists.
     */
    where: WorkflowWhereUniqueInput
    /**
     * In case the Workflow found by the `where` argument doesn't exist, create a new Workflow with this data.
     */
    create: XOR<WorkflowCreateInput, WorkflowUncheckedCreateInput>
    /**
     * In case the Workflow was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkflowUpdateInput, WorkflowUncheckedUpdateInput>
  }

  /**
   * Workflow delete
   */
  export type WorkflowDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workflow
     */
    omit?: WorkflowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowInclude<ExtArgs> | null
    /**
     * Filter which Workflow to delete.
     */
    where: WorkflowWhereUniqueInput
  }

  /**
   * Workflow deleteMany
   */
  export type WorkflowDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Workflows to delete
     */
    where?: WorkflowWhereInput
    /**
     * Limit how many Workflows to delete.
     */
    limit?: number
  }

  /**
   * Workflow without action
   */
  export type WorkflowDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workflow
     */
    omit?: WorkflowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowInclude<ExtArgs> | null
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


  export const PriorityScalarFieldEnum: {
    id: 'id',
    name: 'name',
    color: 'color',
    order: 'order',
    isDefault: 'isDefault',
    tenantId: 'tenantId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PriorityScalarFieldEnum = (typeof PriorityScalarFieldEnum)[keyof typeof PriorityScalarFieldEnum]


  export const StatusScalarFieldEnum: {
    id: 'id',
    name: 'name',
    color: 'color',
    order: 'order',
    isDefault: 'isDefault',
    tenantId: 'tenantId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StatusScalarFieldEnum = (typeof StatusScalarFieldEnum)[keyof typeof StatusScalarFieldEnum]


  export const TenantScalarFieldEnum: {
    id: 'id',
    name: 'name',
    avatar: 'avatar',
    createdAt: 'createdAt'
  };

  export type TenantScalarFieldEnum = (typeof TenantScalarFieldEnum)[keyof typeof TenantScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    username: 'username',
    email: 'email',
    passwordHash: 'passwordHash',
    role: 'role',
    isActive: 'isActive',
    avatar: 'avatar',
    createdAt: 'createdAt',
    deletedAt: 'deletedAt',
    refreshToken: 'refreshToken',
    resetPasswordToken: 'resetPasswordToken',
    resetPasswordTokenExpiry: 'resetPasswordTokenExpiry'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const DepartmentScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    name: 'name',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DepartmentScalarFieldEnum = (typeof DepartmentScalarFieldEnum)[keyof typeof DepartmentScalarFieldEnum]


  export const ColumnScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    name: 'name',
    description: 'description',
    order: 'order',
    color: 'color',
    isDefault: 'isDefault',
    statusId: 'statusId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ColumnScalarFieldEnum = (typeof ColumnScalarFieldEnum)[keyof typeof ColumnScalarFieldEnum]


  export const TicketScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    title: 'title',
    description: 'description',
    status: 'status',
    priorityId: 'priorityId',
    afterId: 'afterId',
    columnId: 'columnId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    closedAt: 'closedAt',
    deletedAt: 'deletedAt',
    creatorId: 'creatorId',
    assigneeId: 'assigneeId',
    departmentId: 'departmentId'
  };

  export type TicketScalarFieldEnum = (typeof TicketScalarFieldEnum)[keyof typeof TicketScalarFieldEnum]


  export const TicketCommentScalarFieldEnum: {
    id: 'id',
    ticketId: 'ticketId',
    userId: 'userId',
    comment: 'comment',
    createdAt: 'createdAt'
  };

  export type TicketCommentScalarFieldEnum = (typeof TicketCommentScalarFieldEnum)[keyof typeof TicketCommentScalarFieldEnum]


  export const AttachmentScalarFieldEnum: {
    id: 'id',
    filename: 'filename',
    originalName: 'originalName',
    mimeType: 'mimeType',
    size: 'size',
    filePath: 'filePath',
    url: 'url',
    ticketId: 'ticketId',
    commentId: 'commentId',
    uploadedBy: 'uploadedBy',
    tenantId: 'tenantId',
    uploadedAt: 'uploadedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type AttachmentScalarFieldEnum = (typeof AttachmentScalarFieldEnum)[keyof typeof AttachmentScalarFieldEnum]


  export const SLAScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    name: 'name',
    description: 'description',
    responseTime: 'responseTime',
    resolutionTime: 'resolutionTime',
    priorityId: 'priorityId',
    departmentId: 'departmentId',
    isActive: 'isActive',
    escalationRules: 'escalationRules',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SLAScalarFieldEnum = (typeof SLAScalarFieldEnum)[keyof typeof SLAScalarFieldEnum]


  export const WorkflowScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    name: 'name',
    description: 'description',
    rules: 'rules',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WorkflowScalarFieldEnum = (typeof WorkflowScalarFieldEnum)[keyof typeof WorkflowScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


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


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


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
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


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


  export type PriorityWhereInput = {
    AND?: PriorityWhereInput | PriorityWhereInput[]
    OR?: PriorityWhereInput[]
    NOT?: PriorityWhereInput | PriorityWhereInput[]
    id?: StringFilter<"Priority"> | string
    name?: StringFilter<"Priority"> | string
    color?: StringFilter<"Priority"> | string
    order?: IntFilter<"Priority"> | number
    isDefault?: BoolFilter<"Priority"> | boolean
    tenantId?: StringFilter<"Priority"> | string
    createdAt?: DateTimeFilter<"Priority"> | Date | string
    updatedAt?: DateTimeFilter<"Priority"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    tickets?: TicketListRelationFilter
    slas?: SLAListRelationFilter
  }

  export type PriorityOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    order?: SortOrder
    isDefault?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenant?: TenantOrderByWithRelationInput
    tickets?: TicketOrderByRelationAggregateInput
    slas?: SLAOrderByRelationAggregateInput
  }

  export type PriorityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PriorityWhereInput | PriorityWhereInput[]
    OR?: PriorityWhereInput[]
    NOT?: PriorityWhereInput | PriorityWhereInput[]
    name?: StringFilter<"Priority"> | string
    color?: StringFilter<"Priority"> | string
    order?: IntFilter<"Priority"> | number
    isDefault?: BoolFilter<"Priority"> | boolean
    tenantId?: StringFilter<"Priority"> | string
    createdAt?: DateTimeFilter<"Priority"> | Date | string
    updatedAt?: DateTimeFilter<"Priority"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    tickets?: TicketListRelationFilter
    slas?: SLAListRelationFilter
  }, "id">

  export type PriorityOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    order?: SortOrder
    isDefault?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PriorityCountOrderByAggregateInput
    _avg?: PriorityAvgOrderByAggregateInput
    _max?: PriorityMaxOrderByAggregateInput
    _min?: PriorityMinOrderByAggregateInput
    _sum?: PrioritySumOrderByAggregateInput
  }

  export type PriorityScalarWhereWithAggregatesInput = {
    AND?: PriorityScalarWhereWithAggregatesInput | PriorityScalarWhereWithAggregatesInput[]
    OR?: PriorityScalarWhereWithAggregatesInput[]
    NOT?: PriorityScalarWhereWithAggregatesInput | PriorityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Priority"> | string
    name?: StringWithAggregatesFilter<"Priority"> | string
    color?: StringWithAggregatesFilter<"Priority"> | string
    order?: IntWithAggregatesFilter<"Priority"> | number
    isDefault?: BoolWithAggregatesFilter<"Priority"> | boolean
    tenantId?: StringWithAggregatesFilter<"Priority"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Priority"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Priority"> | Date | string
  }

  export type StatusWhereInput = {
    AND?: StatusWhereInput | StatusWhereInput[]
    OR?: StatusWhereInput[]
    NOT?: StatusWhereInput | StatusWhereInput[]
    id?: StringFilter<"Status"> | string
    name?: StringFilter<"Status"> | string
    color?: StringFilter<"Status"> | string
    order?: IntFilter<"Status"> | number
    isDefault?: BoolFilter<"Status"> | boolean
    tenantId?: StringFilter<"Status"> | string
    createdAt?: DateTimeFilter<"Status"> | Date | string
    updatedAt?: DateTimeFilter<"Status"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    columns?: ColumnListRelationFilter
  }

  export type StatusOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    order?: SortOrder
    isDefault?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenant?: TenantOrderByWithRelationInput
    columns?: ColumnOrderByRelationAggregateInput
  }

  export type StatusWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StatusWhereInput | StatusWhereInput[]
    OR?: StatusWhereInput[]
    NOT?: StatusWhereInput | StatusWhereInput[]
    name?: StringFilter<"Status"> | string
    color?: StringFilter<"Status"> | string
    order?: IntFilter<"Status"> | number
    isDefault?: BoolFilter<"Status"> | boolean
    tenantId?: StringFilter<"Status"> | string
    createdAt?: DateTimeFilter<"Status"> | Date | string
    updatedAt?: DateTimeFilter<"Status"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    columns?: ColumnListRelationFilter
  }, "id">

  export type StatusOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    order?: SortOrder
    isDefault?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StatusCountOrderByAggregateInput
    _avg?: StatusAvgOrderByAggregateInput
    _max?: StatusMaxOrderByAggregateInput
    _min?: StatusMinOrderByAggregateInput
    _sum?: StatusSumOrderByAggregateInput
  }

  export type StatusScalarWhereWithAggregatesInput = {
    AND?: StatusScalarWhereWithAggregatesInput | StatusScalarWhereWithAggregatesInput[]
    OR?: StatusScalarWhereWithAggregatesInput[]
    NOT?: StatusScalarWhereWithAggregatesInput | StatusScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Status"> | string
    name?: StringWithAggregatesFilter<"Status"> | string
    color?: StringWithAggregatesFilter<"Status"> | string
    order?: IntWithAggregatesFilter<"Status"> | number
    isDefault?: BoolWithAggregatesFilter<"Status"> | boolean
    tenantId?: StringWithAggregatesFilter<"Status"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Status"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Status"> | Date | string
  }

  export type TenantWhereInput = {
    AND?: TenantWhereInput | TenantWhereInput[]
    OR?: TenantWhereInput[]
    NOT?: TenantWhereInput | TenantWhereInput[]
    id?: StringFilter<"Tenant"> | string
    name?: StringFilter<"Tenant"> | string
    avatar?: StringNullableFilter<"Tenant"> | string | null
    createdAt?: DateTimeFilter<"Tenant"> | Date | string
    users?: UserListRelationFilter
    departments?: DepartmentListRelationFilter
    tickets?: TicketListRelationFilter
    columns?: ColumnListRelationFilter
    slas?: SLAListRelationFilter
    workflows?: WorkflowListRelationFilter
    priorities?: PriorityListRelationFilter
    statuses?: StatusListRelationFilter
  }

  export type TenantOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    avatar?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    users?: UserOrderByRelationAggregateInput
    departments?: DepartmentOrderByRelationAggregateInput
    tickets?: TicketOrderByRelationAggregateInput
    columns?: ColumnOrderByRelationAggregateInput
    slas?: SLAOrderByRelationAggregateInput
    workflows?: WorkflowOrderByRelationAggregateInput
    priorities?: PriorityOrderByRelationAggregateInput
    statuses?: StatusOrderByRelationAggregateInput
  }

  export type TenantWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TenantWhereInput | TenantWhereInput[]
    OR?: TenantWhereInput[]
    NOT?: TenantWhereInput | TenantWhereInput[]
    name?: StringFilter<"Tenant"> | string
    avatar?: StringNullableFilter<"Tenant"> | string | null
    createdAt?: DateTimeFilter<"Tenant"> | Date | string
    users?: UserListRelationFilter
    departments?: DepartmentListRelationFilter
    tickets?: TicketListRelationFilter
    columns?: ColumnListRelationFilter
    slas?: SLAListRelationFilter
    workflows?: WorkflowListRelationFilter
    priorities?: PriorityListRelationFilter
    statuses?: StatusListRelationFilter
  }, "id">

  export type TenantOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    avatar?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: TenantCountOrderByAggregateInput
    _max?: TenantMaxOrderByAggregateInput
    _min?: TenantMinOrderByAggregateInput
  }

  export type TenantScalarWhereWithAggregatesInput = {
    AND?: TenantScalarWhereWithAggregatesInput | TenantScalarWhereWithAggregatesInput[]
    OR?: TenantScalarWhereWithAggregatesInput[]
    NOT?: TenantScalarWhereWithAggregatesInput | TenantScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Tenant"> | string
    name?: StringWithAggregatesFilter<"Tenant"> | string
    avatar?: StringNullableWithAggregatesFilter<"Tenant"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Tenant"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    tenantId?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    isActive?: BoolFilter<"User"> | boolean
    avatar?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    refreshToken?: StringNullableFilter<"User"> | string | null
    resetPasswordToken?: StringNullableFilter<"User"> | string | null
    resetPasswordTokenExpiry?: DateTimeNullableFilter<"User"> | Date | string | null
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    ticketsCreated?: TicketListRelationFilter
    ticketsAssigned?: TicketListRelationFilter
    comments?: TicketCommentListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    username?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    avatar?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    resetPasswordToken?: SortOrderInput | SortOrder
    resetPasswordTokenExpiry?: SortOrderInput | SortOrder
    tenant?: TenantOrderByWithRelationInput
    ticketsCreated?: TicketOrderByRelationAggregateInput
    ticketsAssigned?: TicketOrderByRelationAggregateInput
    comments?: TicketCommentOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    tenantId?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    isActive?: BoolFilter<"User"> | boolean
    avatar?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    refreshToken?: StringNullableFilter<"User"> | string | null
    resetPasswordToken?: StringNullableFilter<"User"> | string | null
    resetPasswordTokenExpiry?: DateTimeNullableFilter<"User"> | Date | string | null
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    ticketsCreated?: TicketListRelationFilter
    ticketsAssigned?: TicketListRelationFilter
    comments?: TicketCommentListRelationFilter
  }, "id" | "username" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    username?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    avatar?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    resetPasswordToken?: SortOrderInput | SortOrder
    resetPasswordTokenExpiry?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    tenantId?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    avatar?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    refreshToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    resetPasswordToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    resetPasswordTokenExpiry?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type DepartmentWhereInput = {
    AND?: DepartmentWhereInput | DepartmentWhereInput[]
    OR?: DepartmentWhereInput[]
    NOT?: DepartmentWhereInput | DepartmentWhereInput[]
    id?: StringFilter<"Department"> | string
    tenantId?: StringFilter<"Department"> | string
    name?: StringFilter<"Department"> | string
    description?: StringNullableFilter<"Department"> | string | null
    createdAt?: DateTimeFilter<"Department"> | Date | string
    updatedAt?: DateTimeFilter<"Department"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    tickets?: TicketListRelationFilter
  }

  export type DepartmentOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenant?: TenantOrderByWithRelationInput
    tickets?: TicketOrderByRelationAggregateInput
  }

  export type DepartmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DepartmentWhereInput | DepartmentWhereInput[]
    OR?: DepartmentWhereInput[]
    NOT?: DepartmentWhereInput | DepartmentWhereInput[]
    tenantId?: StringFilter<"Department"> | string
    name?: StringFilter<"Department"> | string
    description?: StringNullableFilter<"Department"> | string | null
    createdAt?: DateTimeFilter<"Department"> | Date | string
    updatedAt?: DateTimeFilter<"Department"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    tickets?: TicketListRelationFilter
  }, "id">

  export type DepartmentOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DepartmentCountOrderByAggregateInput
    _max?: DepartmentMaxOrderByAggregateInput
    _min?: DepartmentMinOrderByAggregateInput
  }

  export type DepartmentScalarWhereWithAggregatesInput = {
    AND?: DepartmentScalarWhereWithAggregatesInput | DepartmentScalarWhereWithAggregatesInput[]
    OR?: DepartmentScalarWhereWithAggregatesInput[]
    NOT?: DepartmentScalarWhereWithAggregatesInput | DepartmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Department"> | string
    tenantId?: StringWithAggregatesFilter<"Department"> | string
    name?: StringWithAggregatesFilter<"Department"> | string
    description?: StringNullableWithAggregatesFilter<"Department"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Department"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Department"> | Date | string
  }

  export type ColumnWhereInput = {
    AND?: ColumnWhereInput | ColumnWhereInput[]
    OR?: ColumnWhereInput[]
    NOT?: ColumnWhereInput | ColumnWhereInput[]
    id?: StringFilter<"Column"> | string
    tenantId?: StringFilter<"Column"> | string
    name?: StringFilter<"Column"> | string
    description?: StringNullableFilter<"Column"> | string | null
    order?: IntFilter<"Column"> | number
    color?: StringNullableFilter<"Column"> | string | null
    isDefault?: BoolFilter<"Column"> | boolean
    statusId?: StringNullableFilter<"Column"> | string | null
    createdAt?: DateTimeFilter<"Column"> | Date | string
    updatedAt?: DateTimeFilter<"Column"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    status?: XOR<StatusNullableScalarRelationFilter, StatusWhereInput> | null
    tickets?: TicketListRelationFilter
  }

  export type ColumnOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    order?: SortOrder
    color?: SortOrderInput | SortOrder
    isDefault?: SortOrder
    statusId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenant?: TenantOrderByWithRelationInput
    status?: StatusOrderByWithRelationInput
    tickets?: TicketOrderByRelationAggregateInput
  }

  export type ColumnWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ColumnWhereInput | ColumnWhereInput[]
    OR?: ColumnWhereInput[]
    NOT?: ColumnWhereInput | ColumnWhereInput[]
    tenantId?: StringFilter<"Column"> | string
    name?: StringFilter<"Column"> | string
    description?: StringNullableFilter<"Column"> | string | null
    order?: IntFilter<"Column"> | number
    color?: StringNullableFilter<"Column"> | string | null
    isDefault?: BoolFilter<"Column"> | boolean
    statusId?: StringNullableFilter<"Column"> | string | null
    createdAt?: DateTimeFilter<"Column"> | Date | string
    updatedAt?: DateTimeFilter<"Column"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    status?: XOR<StatusNullableScalarRelationFilter, StatusWhereInput> | null
    tickets?: TicketListRelationFilter
  }, "id">

  export type ColumnOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    order?: SortOrder
    color?: SortOrderInput | SortOrder
    isDefault?: SortOrder
    statusId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ColumnCountOrderByAggregateInput
    _avg?: ColumnAvgOrderByAggregateInput
    _max?: ColumnMaxOrderByAggregateInput
    _min?: ColumnMinOrderByAggregateInput
    _sum?: ColumnSumOrderByAggregateInput
  }

  export type ColumnScalarWhereWithAggregatesInput = {
    AND?: ColumnScalarWhereWithAggregatesInput | ColumnScalarWhereWithAggregatesInput[]
    OR?: ColumnScalarWhereWithAggregatesInput[]
    NOT?: ColumnScalarWhereWithAggregatesInput | ColumnScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Column"> | string
    tenantId?: StringWithAggregatesFilter<"Column"> | string
    name?: StringWithAggregatesFilter<"Column"> | string
    description?: StringNullableWithAggregatesFilter<"Column"> | string | null
    order?: IntWithAggregatesFilter<"Column"> | number
    color?: StringNullableWithAggregatesFilter<"Column"> | string | null
    isDefault?: BoolWithAggregatesFilter<"Column"> | boolean
    statusId?: StringNullableWithAggregatesFilter<"Column"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Column"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Column"> | Date | string
  }

  export type TicketWhereInput = {
    AND?: TicketWhereInput | TicketWhereInput[]
    OR?: TicketWhereInput[]
    NOT?: TicketWhereInput | TicketWhereInput[]
    id?: StringFilter<"Ticket"> | string
    tenantId?: StringFilter<"Ticket"> | string
    title?: StringFilter<"Ticket"> | string
    description?: StringNullableFilter<"Ticket"> | string | null
    status?: StringFilter<"Ticket"> | string
    priorityId?: StringNullableFilter<"Ticket"> | string | null
    afterId?: StringNullableFilter<"Ticket"> | string | null
    columnId?: StringNullableFilter<"Ticket"> | string | null
    createdAt?: DateTimeFilter<"Ticket"> | Date | string
    updatedAt?: DateTimeFilter<"Ticket"> | Date | string
    closedAt?: DateTimeNullableFilter<"Ticket"> | Date | string | null
    deletedAt?: DateTimeNullableFilter<"Ticket"> | Date | string | null
    creatorId?: StringFilter<"Ticket"> | string
    assigneeId?: StringNullableFilter<"Ticket"> | string | null
    departmentId?: StringNullableFilter<"Ticket"> | string | null
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    priority?: XOR<PriorityNullableScalarRelationFilter, PriorityWhereInput> | null
    column?: XOR<ColumnNullableScalarRelationFilter, ColumnWhereInput> | null
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    assignee?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    department?: XOR<DepartmentNullableScalarRelationFilter, DepartmentWhereInput> | null
    comments?: TicketCommentListRelationFilter
    attachments?: AttachmentListRelationFilter
  }

  export type TicketOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    priorityId?: SortOrderInput | SortOrder
    afterId?: SortOrderInput | SortOrder
    columnId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    closedAt?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    creatorId?: SortOrder
    assigneeId?: SortOrderInput | SortOrder
    departmentId?: SortOrderInput | SortOrder
    tenant?: TenantOrderByWithRelationInput
    priority?: PriorityOrderByWithRelationInput
    column?: ColumnOrderByWithRelationInput
    creator?: UserOrderByWithRelationInput
    assignee?: UserOrderByWithRelationInput
    department?: DepartmentOrderByWithRelationInput
    comments?: TicketCommentOrderByRelationAggregateInput
    attachments?: AttachmentOrderByRelationAggregateInput
  }

  export type TicketWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TicketWhereInput | TicketWhereInput[]
    OR?: TicketWhereInput[]
    NOT?: TicketWhereInput | TicketWhereInput[]
    tenantId?: StringFilter<"Ticket"> | string
    title?: StringFilter<"Ticket"> | string
    description?: StringNullableFilter<"Ticket"> | string | null
    status?: StringFilter<"Ticket"> | string
    priorityId?: StringNullableFilter<"Ticket"> | string | null
    afterId?: StringNullableFilter<"Ticket"> | string | null
    columnId?: StringNullableFilter<"Ticket"> | string | null
    createdAt?: DateTimeFilter<"Ticket"> | Date | string
    updatedAt?: DateTimeFilter<"Ticket"> | Date | string
    closedAt?: DateTimeNullableFilter<"Ticket"> | Date | string | null
    deletedAt?: DateTimeNullableFilter<"Ticket"> | Date | string | null
    creatorId?: StringFilter<"Ticket"> | string
    assigneeId?: StringNullableFilter<"Ticket"> | string | null
    departmentId?: StringNullableFilter<"Ticket"> | string | null
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    priority?: XOR<PriorityNullableScalarRelationFilter, PriorityWhereInput> | null
    column?: XOR<ColumnNullableScalarRelationFilter, ColumnWhereInput> | null
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    assignee?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    department?: XOR<DepartmentNullableScalarRelationFilter, DepartmentWhereInput> | null
    comments?: TicketCommentListRelationFilter
    attachments?: AttachmentListRelationFilter
  }, "id">

  export type TicketOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    priorityId?: SortOrderInput | SortOrder
    afterId?: SortOrderInput | SortOrder
    columnId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    closedAt?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    creatorId?: SortOrder
    assigneeId?: SortOrderInput | SortOrder
    departmentId?: SortOrderInput | SortOrder
    _count?: TicketCountOrderByAggregateInput
    _max?: TicketMaxOrderByAggregateInput
    _min?: TicketMinOrderByAggregateInput
  }

  export type TicketScalarWhereWithAggregatesInput = {
    AND?: TicketScalarWhereWithAggregatesInput | TicketScalarWhereWithAggregatesInput[]
    OR?: TicketScalarWhereWithAggregatesInput[]
    NOT?: TicketScalarWhereWithAggregatesInput | TicketScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Ticket"> | string
    tenantId?: StringWithAggregatesFilter<"Ticket"> | string
    title?: StringWithAggregatesFilter<"Ticket"> | string
    description?: StringNullableWithAggregatesFilter<"Ticket"> | string | null
    status?: StringWithAggregatesFilter<"Ticket"> | string
    priorityId?: StringNullableWithAggregatesFilter<"Ticket"> | string | null
    afterId?: StringNullableWithAggregatesFilter<"Ticket"> | string | null
    columnId?: StringNullableWithAggregatesFilter<"Ticket"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Ticket"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Ticket"> | Date | string
    closedAt?: DateTimeNullableWithAggregatesFilter<"Ticket"> | Date | string | null
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Ticket"> | Date | string | null
    creatorId?: StringWithAggregatesFilter<"Ticket"> | string
    assigneeId?: StringNullableWithAggregatesFilter<"Ticket"> | string | null
    departmentId?: StringNullableWithAggregatesFilter<"Ticket"> | string | null
  }

  export type TicketCommentWhereInput = {
    AND?: TicketCommentWhereInput | TicketCommentWhereInput[]
    OR?: TicketCommentWhereInput[]
    NOT?: TicketCommentWhereInput | TicketCommentWhereInput[]
    id?: StringFilter<"TicketComment"> | string
    ticketId?: StringFilter<"TicketComment"> | string
    userId?: StringFilter<"TicketComment"> | string
    comment?: StringFilter<"TicketComment"> | string
    createdAt?: DateTimeFilter<"TicketComment"> | Date | string
    ticket?: XOR<TicketScalarRelationFilter, TicketWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    attachments?: AttachmentListRelationFilter
  }

  export type TicketCommentOrderByWithRelationInput = {
    id?: SortOrder
    ticketId?: SortOrder
    userId?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
    ticket?: TicketOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    attachments?: AttachmentOrderByRelationAggregateInput
  }

  export type TicketCommentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TicketCommentWhereInput | TicketCommentWhereInput[]
    OR?: TicketCommentWhereInput[]
    NOT?: TicketCommentWhereInput | TicketCommentWhereInput[]
    ticketId?: StringFilter<"TicketComment"> | string
    userId?: StringFilter<"TicketComment"> | string
    comment?: StringFilter<"TicketComment"> | string
    createdAt?: DateTimeFilter<"TicketComment"> | Date | string
    ticket?: XOR<TicketScalarRelationFilter, TicketWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    attachments?: AttachmentListRelationFilter
  }, "id">

  export type TicketCommentOrderByWithAggregationInput = {
    id?: SortOrder
    ticketId?: SortOrder
    userId?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
    _count?: TicketCommentCountOrderByAggregateInput
    _max?: TicketCommentMaxOrderByAggregateInput
    _min?: TicketCommentMinOrderByAggregateInput
  }

  export type TicketCommentScalarWhereWithAggregatesInput = {
    AND?: TicketCommentScalarWhereWithAggregatesInput | TicketCommentScalarWhereWithAggregatesInput[]
    OR?: TicketCommentScalarWhereWithAggregatesInput[]
    NOT?: TicketCommentScalarWhereWithAggregatesInput | TicketCommentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TicketComment"> | string
    ticketId?: StringWithAggregatesFilter<"TicketComment"> | string
    userId?: StringWithAggregatesFilter<"TicketComment"> | string
    comment?: StringWithAggregatesFilter<"TicketComment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"TicketComment"> | Date | string
  }

  export type AttachmentWhereInput = {
    AND?: AttachmentWhereInput | AttachmentWhereInput[]
    OR?: AttachmentWhereInput[]
    NOT?: AttachmentWhereInput | AttachmentWhereInput[]
    id?: StringFilter<"Attachment"> | string
    filename?: StringFilter<"Attachment"> | string
    originalName?: StringFilter<"Attachment"> | string
    mimeType?: StringFilter<"Attachment"> | string
    size?: IntFilter<"Attachment"> | number
    filePath?: StringFilter<"Attachment"> | string
    url?: StringFilter<"Attachment"> | string
    ticketId?: StringNullableFilter<"Attachment"> | string | null
    commentId?: StringNullableFilter<"Attachment"> | string | null
    uploadedBy?: StringFilter<"Attachment"> | string
    tenantId?: StringFilter<"Attachment"> | string
    uploadedAt?: DateTimeFilter<"Attachment"> | Date | string
    createdAt?: DateTimeFilter<"Attachment"> | Date | string
    updatedAt?: DateTimeFilter<"Attachment"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Attachment"> | Date | string | null
    ticket?: XOR<TicketNullableScalarRelationFilter, TicketWhereInput> | null
    comment?: XOR<TicketCommentNullableScalarRelationFilter, TicketCommentWhereInput> | null
  }

  export type AttachmentOrderByWithRelationInput = {
    id?: SortOrder
    filename?: SortOrder
    originalName?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    filePath?: SortOrder
    url?: SortOrder
    ticketId?: SortOrderInput | SortOrder
    commentId?: SortOrderInput | SortOrder
    uploadedBy?: SortOrder
    tenantId?: SortOrder
    uploadedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    ticket?: TicketOrderByWithRelationInput
    comment?: TicketCommentOrderByWithRelationInput
  }

  export type AttachmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AttachmentWhereInput | AttachmentWhereInput[]
    OR?: AttachmentWhereInput[]
    NOT?: AttachmentWhereInput | AttachmentWhereInput[]
    filename?: StringFilter<"Attachment"> | string
    originalName?: StringFilter<"Attachment"> | string
    mimeType?: StringFilter<"Attachment"> | string
    size?: IntFilter<"Attachment"> | number
    filePath?: StringFilter<"Attachment"> | string
    url?: StringFilter<"Attachment"> | string
    ticketId?: StringNullableFilter<"Attachment"> | string | null
    commentId?: StringNullableFilter<"Attachment"> | string | null
    uploadedBy?: StringFilter<"Attachment"> | string
    tenantId?: StringFilter<"Attachment"> | string
    uploadedAt?: DateTimeFilter<"Attachment"> | Date | string
    createdAt?: DateTimeFilter<"Attachment"> | Date | string
    updatedAt?: DateTimeFilter<"Attachment"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Attachment"> | Date | string | null
    ticket?: XOR<TicketNullableScalarRelationFilter, TicketWhereInput> | null
    comment?: XOR<TicketCommentNullableScalarRelationFilter, TicketCommentWhereInput> | null
  }, "id">

  export type AttachmentOrderByWithAggregationInput = {
    id?: SortOrder
    filename?: SortOrder
    originalName?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    filePath?: SortOrder
    url?: SortOrder
    ticketId?: SortOrderInput | SortOrder
    commentId?: SortOrderInput | SortOrder
    uploadedBy?: SortOrder
    tenantId?: SortOrder
    uploadedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: AttachmentCountOrderByAggregateInput
    _avg?: AttachmentAvgOrderByAggregateInput
    _max?: AttachmentMaxOrderByAggregateInput
    _min?: AttachmentMinOrderByAggregateInput
    _sum?: AttachmentSumOrderByAggregateInput
  }

  export type AttachmentScalarWhereWithAggregatesInput = {
    AND?: AttachmentScalarWhereWithAggregatesInput | AttachmentScalarWhereWithAggregatesInput[]
    OR?: AttachmentScalarWhereWithAggregatesInput[]
    NOT?: AttachmentScalarWhereWithAggregatesInput | AttachmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Attachment"> | string
    filename?: StringWithAggregatesFilter<"Attachment"> | string
    originalName?: StringWithAggregatesFilter<"Attachment"> | string
    mimeType?: StringWithAggregatesFilter<"Attachment"> | string
    size?: IntWithAggregatesFilter<"Attachment"> | number
    filePath?: StringWithAggregatesFilter<"Attachment"> | string
    url?: StringWithAggregatesFilter<"Attachment"> | string
    ticketId?: StringNullableWithAggregatesFilter<"Attachment"> | string | null
    commentId?: StringNullableWithAggregatesFilter<"Attachment"> | string | null
    uploadedBy?: StringWithAggregatesFilter<"Attachment"> | string
    tenantId?: StringWithAggregatesFilter<"Attachment"> | string
    uploadedAt?: DateTimeWithAggregatesFilter<"Attachment"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Attachment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Attachment"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Attachment"> | Date | string | null
  }

  export type SLAWhereInput = {
    AND?: SLAWhereInput | SLAWhereInput[]
    OR?: SLAWhereInput[]
    NOT?: SLAWhereInput | SLAWhereInput[]
    id?: StringFilter<"SLA"> | string
    tenantId?: StringFilter<"SLA"> | string
    name?: StringFilter<"SLA"> | string
    description?: StringNullableFilter<"SLA"> | string | null
    responseTime?: IntFilter<"SLA"> | number
    resolutionTime?: IntFilter<"SLA"> | number
    priorityId?: StringNullableFilter<"SLA"> | string | null
    departmentId?: StringNullableFilter<"SLA"> | string | null
    isActive?: BoolFilter<"SLA"> | boolean
    escalationRules?: JsonNullableFilter<"SLA">
    createdAt?: DateTimeFilter<"SLA"> | Date | string
    updatedAt?: DateTimeFilter<"SLA"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    priority?: XOR<PriorityNullableScalarRelationFilter, PriorityWhereInput> | null
  }

  export type SLAOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    responseTime?: SortOrder
    resolutionTime?: SortOrder
    priorityId?: SortOrderInput | SortOrder
    departmentId?: SortOrderInput | SortOrder
    isActive?: SortOrder
    escalationRules?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenant?: TenantOrderByWithRelationInput
    priority?: PriorityOrderByWithRelationInput
  }

  export type SLAWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SLAWhereInput | SLAWhereInput[]
    OR?: SLAWhereInput[]
    NOT?: SLAWhereInput | SLAWhereInput[]
    tenantId?: StringFilter<"SLA"> | string
    name?: StringFilter<"SLA"> | string
    description?: StringNullableFilter<"SLA"> | string | null
    responseTime?: IntFilter<"SLA"> | number
    resolutionTime?: IntFilter<"SLA"> | number
    priorityId?: StringNullableFilter<"SLA"> | string | null
    departmentId?: StringNullableFilter<"SLA"> | string | null
    isActive?: BoolFilter<"SLA"> | boolean
    escalationRules?: JsonNullableFilter<"SLA">
    createdAt?: DateTimeFilter<"SLA"> | Date | string
    updatedAt?: DateTimeFilter<"SLA"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    priority?: XOR<PriorityNullableScalarRelationFilter, PriorityWhereInput> | null
  }, "id">

  export type SLAOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    responseTime?: SortOrder
    resolutionTime?: SortOrder
    priorityId?: SortOrderInput | SortOrder
    departmentId?: SortOrderInput | SortOrder
    isActive?: SortOrder
    escalationRules?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SLACountOrderByAggregateInput
    _avg?: SLAAvgOrderByAggregateInput
    _max?: SLAMaxOrderByAggregateInput
    _min?: SLAMinOrderByAggregateInput
    _sum?: SLASumOrderByAggregateInput
  }

  export type SLAScalarWhereWithAggregatesInput = {
    AND?: SLAScalarWhereWithAggregatesInput | SLAScalarWhereWithAggregatesInput[]
    OR?: SLAScalarWhereWithAggregatesInput[]
    NOT?: SLAScalarWhereWithAggregatesInput | SLAScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SLA"> | string
    tenantId?: StringWithAggregatesFilter<"SLA"> | string
    name?: StringWithAggregatesFilter<"SLA"> | string
    description?: StringNullableWithAggregatesFilter<"SLA"> | string | null
    responseTime?: IntWithAggregatesFilter<"SLA"> | number
    resolutionTime?: IntWithAggregatesFilter<"SLA"> | number
    priorityId?: StringNullableWithAggregatesFilter<"SLA"> | string | null
    departmentId?: StringNullableWithAggregatesFilter<"SLA"> | string | null
    isActive?: BoolWithAggregatesFilter<"SLA"> | boolean
    escalationRules?: JsonNullableWithAggregatesFilter<"SLA">
    createdAt?: DateTimeWithAggregatesFilter<"SLA"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SLA"> | Date | string
  }

  export type WorkflowWhereInput = {
    AND?: WorkflowWhereInput | WorkflowWhereInput[]
    OR?: WorkflowWhereInput[]
    NOT?: WorkflowWhereInput | WorkflowWhereInput[]
    id?: StringFilter<"Workflow"> | string
    tenantId?: StringFilter<"Workflow"> | string
    name?: StringFilter<"Workflow"> | string
    description?: StringNullableFilter<"Workflow"> | string | null
    rules?: JsonFilter<"Workflow">
    isActive?: BoolFilter<"Workflow"> | boolean
    createdAt?: DateTimeFilter<"Workflow"> | Date | string
    updatedAt?: DateTimeFilter<"Workflow"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
  }

  export type WorkflowOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    rules?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenant?: TenantOrderByWithRelationInput
  }

  export type WorkflowWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WorkflowWhereInput | WorkflowWhereInput[]
    OR?: WorkflowWhereInput[]
    NOT?: WorkflowWhereInput | WorkflowWhereInput[]
    tenantId?: StringFilter<"Workflow"> | string
    name?: StringFilter<"Workflow"> | string
    description?: StringNullableFilter<"Workflow"> | string | null
    rules?: JsonFilter<"Workflow">
    isActive?: BoolFilter<"Workflow"> | boolean
    createdAt?: DateTimeFilter<"Workflow"> | Date | string
    updatedAt?: DateTimeFilter<"Workflow"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
  }, "id">

  export type WorkflowOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    rules?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WorkflowCountOrderByAggregateInput
    _max?: WorkflowMaxOrderByAggregateInput
    _min?: WorkflowMinOrderByAggregateInput
  }

  export type WorkflowScalarWhereWithAggregatesInput = {
    AND?: WorkflowScalarWhereWithAggregatesInput | WorkflowScalarWhereWithAggregatesInput[]
    OR?: WorkflowScalarWhereWithAggregatesInput[]
    NOT?: WorkflowScalarWhereWithAggregatesInput | WorkflowScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Workflow"> | string
    tenantId?: StringWithAggregatesFilter<"Workflow"> | string
    name?: StringWithAggregatesFilter<"Workflow"> | string
    description?: StringNullableWithAggregatesFilter<"Workflow"> | string | null
    rules?: JsonWithAggregatesFilter<"Workflow">
    isActive?: BoolWithAggregatesFilter<"Workflow"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Workflow"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Workflow"> | Date | string
  }

  export type PriorityCreateInput = {
    id?: string
    name: string
    color: string
    order?: number
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutPrioritiesInput
    tickets?: TicketCreateNestedManyWithoutPriorityInput
    slas?: SLACreateNestedManyWithoutPriorityInput
  }

  export type PriorityUncheckedCreateInput = {
    id?: string
    name: string
    color: string
    order?: number
    isDefault?: boolean
    tenantId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tickets?: TicketUncheckedCreateNestedManyWithoutPriorityInput
    slas?: SLAUncheckedCreateNestedManyWithoutPriorityInput
  }

  export type PriorityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutPrioritiesNestedInput
    tickets?: TicketUpdateManyWithoutPriorityNestedInput
    slas?: SLAUpdateManyWithoutPriorityNestedInput
  }

  export type PriorityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tickets?: TicketUncheckedUpdateManyWithoutPriorityNestedInput
    slas?: SLAUncheckedUpdateManyWithoutPriorityNestedInput
  }

  export type PriorityCreateManyInput = {
    id?: string
    name: string
    color: string
    order?: number
    isDefault?: boolean
    tenantId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PriorityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriorityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StatusCreateInput = {
    id?: string
    name: string
    color: string
    order?: number
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutStatusesInput
    columns?: ColumnCreateNestedManyWithoutStatusInput
  }

  export type StatusUncheckedCreateInput = {
    id?: string
    name: string
    color: string
    order?: number
    isDefault?: boolean
    tenantId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    columns?: ColumnUncheckedCreateNestedManyWithoutStatusInput
  }

  export type StatusUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutStatusesNestedInput
    columns?: ColumnUpdateManyWithoutStatusNestedInput
  }

  export type StatusUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    columns?: ColumnUncheckedUpdateManyWithoutStatusNestedInput
  }

  export type StatusCreateManyInput = {
    id?: string
    name: string
    color: string
    order?: number
    isDefault?: boolean
    tenantId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StatusUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StatusUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantCreateInput = {
    id?: string
    name: string
    avatar?: string | null
    createdAt?: Date | string
    users?: UserCreateNestedManyWithoutTenantInput
    departments?: DepartmentCreateNestedManyWithoutTenantInput
    tickets?: TicketCreateNestedManyWithoutTenantInput
    columns?: ColumnCreateNestedManyWithoutTenantInput
    slas?: SLACreateNestedManyWithoutTenantInput
    workflows?: WorkflowCreateNestedManyWithoutTenantInput
    priorities?: PriorityCreateNestedManyWithoutTenantInput
    statuses?: StatusCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateInput = {
    id?: string
    name: string
    avatar?: string | null
    createdAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutTenantInput
    departments?: DepartmentUncheckedCreateNestedManyWithoutTenantInput
    tickets?: TicketUncheckedCreateNestedManyWithoutTenantInput
    columns?: ColumnUncheckedCreateNestedManyWithoutTenantInput
    slas?: SLAUncheckedCreateNestedManyWithoutTenantInput
    workflows?: WorkflowUncheckedCreateNestedManyWithoutTenantInput
    priorities?: PriorityUncheckedCreateNestedManyWithoutTenantInput
    statuses?: StatusUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutTenantNestedInput
    departments?: DepartmentUpdateManyWithoutTenantNestedInput
    tickets?: TicketUpdateManyWithoutTenantNestedInput
    columns?: ColumnUpdateManyWithoutTenantNestedInput
    slas?: SLAUpdateManyWithoutTenantNestedInput
    workflows?: WorkflowUpdateManyWithoutTenantNestedInput
    priorities?: PriorityUpdateManyWithoutTenantNestedInput
    statuses?: StatusUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutTenantNestedInput
    departments?: DepartmentUncheckedUpdateManyWithoutTenantNestedInput
    tickets?: TicketUncheckedUpdateManyWithoutTenantNestedInput
    columns?: ColumnUncheckedUpdateManyWithoutTenantNestedInput
    slas?: SLAUncheckedUpdateManyWithoutTenantNestedInput
    workflows?: WorkflowUncheckedUpdateManyWithoutTenantNestedInput
    priorities?: PriorityUncheckedUpdateManyWithoutTenantNestedInput
    statuses?: StatusUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type TenantCreateManyInput = {
    id?: string
    name: string
    avatar?: string | null
    createdAt?: Date | string
  }

  export type TenantUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    avatar?: string | null
    createdAt?: Date | string
    deletedAt?: Date | string | null
    refreshToken?: string | null
    resetPasswordToken?: string | null
    resetPasswordTokenExpiry?: Date | string | null
    tenant: TenantCreateNestedOneWithoutUsersInput
    ticketsCreated?: TicketCreateNestedManyWithoutCreatorInput
    ticketsAssigned?: TicketCreateNestedManyWithoutAssigneeInput
    comments?: TicketCommentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    tenantId: string
    username: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    avatar?: string | null
    createdAt?: Date | string
    deletedAt?: Date | string | null
    refreshToken?: string | null
    resetPasswordToken?: string | null
    resetPasswordTokenExpiry?: Date | string | null
    ticketsCreated?: TicketUncheckedCreateNestedManyWithoutCreatorInput
    ticketsAssigned?: TicketUncheckedCreateNestedManyWithoutAssigneeInput
    comments?: TicketCommentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tenant?: TenantUpdateOneRequiredWithoutUsersNestedInput
    ticketsCreated?: TicketUpdateManyWithoutCreatorNestedInput
    ticketsAssigned?: TicketUpdateManyWithoutAssigneeNestedInput
    comments?: TicketCommentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ticketsCreated?: TicketUncheckedUpdateManyWithoutCreatorNestedInput
    ticketsAssigned?: TicketUncheckedUpdateManyWithoutAssigneeNestedInput
    comments?: TicketCommentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    tenantId: string
    username: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    avatar?: string | null
    createdAt?: Date | string
    deletedAt?: Date | string | null
    refreshToken?: string | null
    resetPasswordToken?: string | null
    resetPasswordTokenExpiry?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DepartmentCreateInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutDepartmentsInput
    tickets?: TicketCreateNestedManyWithoutDepartmentInput
  }

  export type DepartmentUncheckedCreateInput = {
    id?: string
    tenantId: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tickets?: TicketUncheckedCreateNestedManyWithoutDepartmentInput
  }

  export type DepartmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutDepartmentsNestedInput
    tickets?: TicketUpdateManyWithoutDepartmentNestedInput
  }

  export type DepartmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tickets?: TicketUncheckedUpdateManyWithoutDepartmentNestedInput
  }

  export type DepartmentCreateManyInput = {
    id?: string
    tenantId: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DepartmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DepartmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ColumnCreateInput = {
    id?: string
    name: string
    description?: string | null
    order?: number
    color?: string | null
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutColumnsInput
    status?: StatusCreateNestedOneWithoutColumnsInput
    tickets?: TicketCreateNestedManyWithoutColumnInput
  }

  export type ColumnUncheckedCreateInput = {
    id?: string
    tenantId: string
    name: string
    description?: string | null
    order?: number
    color?: string | null
    isDefault?: boolean
    statusId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tickets?: TicketUncheckedCreateNestedManyWithoutColumnInput
  }

  export type ColumnUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutColumnsNestedInput
    status?: StatusUpdateOneWithoutColumnsNestedInput
    tickets?: TicketUpdateManyWithoutColumnNestedInput
  }

  export type ColumnUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    statusId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tickets?: TicketUncheckedUpdateManyWithoutColumnNestedInput
  }

  export type ColumnCreateManyInput = {
    id?: string
    tenantId: string
    name: string
    description?: string | null
    order?: number
    color?: string | null
    isDefault?: boolean
    statusId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ColumnUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ColumnUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    statusId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketCreateInput = {
    id?: string
    title: string
    description?: string | null
    status?: string
    afterId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    closedAt?: Date | string | null
    deletedAt?: Date | string | null
    tenant: TenantCreateNestedOneWithoutTicketsInput
    priority?: PriorityCreateNestedOneWithoutTicketsInput
    column?: ColumnCreateNestedOneWithoutTicketsInput
    creator: UserCreateNestedOneWithoutTicketsCreatedInput
    assignee?: UserCreateNestedOneWithoutTicketsAssignedInput
    department?: DepartmentCreateNestedOneWithoutTicketsInput
    comments?: TicketCommentCreateNestedManyWithoutTicketInput
    attachments?: AttachmentCreateNestedManyWithoutTicketInput
  }

  export type TicketUncheckedCreateInput = {
    id?: string
    tenantId: string
    title: string
    description?: string | null
    status?: string
    priorityId?: string | null
    afterId?: string | null
    columnId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    closedAt?: Date | string | null
    deletedAt?: Date | string | null
    creatorId: string
    assigneeId?: string | null
    departmentId?: string | null
    comments?: TicketCommentUncheckedCreateNestedManyWithoutTicketInput
    attachments?: AttachmentUncheckedCreateNestedManyWithoutTicketInput
  }

  export type TicketUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    afterId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tenant?: TenantUpdateOneRequiredWithoutTicketsNestedInput
    priority?: PriorityUpdateOneWithoutTicketsNestedInput
    column?: ColumnUpdateOneWithoutTicketsNestedInput
    creator?: UserUpdateOneRequiredWithoutTicketsCreatedNestedInput
    assignee?: UserUpdateOneWithoutTicketsAssignedNestedInput
    department?: DepartmentUpdateOneWithoutTicketsNestedInput
    comments?: TicketCommentUpdateManyWithoutTicketNestedInput
    attachments?: AttachmentUpdateManyWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priorityId?: NullableStringFieldUpdateOperationsInput | string | null
    afterId?: NullableStringFieldUpdateOperationsInput | string | null
    columnId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creatorId?: StringFieldUpdateOperationsInput | string
    assigneeId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: TicketCommentUncheckedUpdateManyWithoutTicketNestedInput
    attachments?: AttachmentUncheckedUpdateManyWithoutTicketNestedInput
  }

  export type TicketCreateManyInput = {
    id?: string
    tenantId: string
    title: string
    description?: string | null
    status?: string
    priorityId?: string | null
    afterId?: string | null
    columnId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    closedAt?: Date | string | null
    deletedAt?: Date | string | null
    creatorId: string
    assigneeId?: string | null
    departmentId?: string | null
  }

  export type TicketUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    afterId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TicketUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priorityId?: NullableStringFieldUpdateOperationsInput | string | null
    afterId?: NullableStringFieldUpdateOperationsInput | string | null
    columnId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creatorId?: StringFieldUpdateOperationsInput | string
    assigneeId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TicketCommentCreateInput = {
    id?: string
    comment: string
    createdAt?: Date | string
    ticket: TicketCreateNestedOneWithoutCommentsInput
    user: UserCreateNestedOneWithoutCommentsInput
    attachments?: AttachmentCreateNestedManyWithoutCommentInput
  }

  export type TicketCommentUncheckedCreateInput = {
    id?: string
    ticketId: string
    userId: string
    comment: string
    createdAt?: Date | string
    attachments?: AttachmentUncheckedCreateNestedManyWithoutCommentInput
  }

  export type TicketCommentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ticket?: TicketUpdateOneRequiredWithoutCommentsNestedInput
    user?: UserUpdateOneRequiredWithoutCommentsNestedInput
    attachments?: AttachmentUpdateManyWithoutCommentNestedInput
  }

  export type TicketCommentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ticketId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attachments?: AttachmentUncheckedUpdateManyWithoutCommentNestedInput
  }

  export type TicketCommentCreateManyInput = {
    id?: string
    ticketId: string
    userId: string
    comment: string
    createdAt?: Date | string
  }

  export type TicketCommentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketCommentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ticketId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttachmentCreateInput = {
    id?: string
    filename: string
    originalName: string
    mimeType: string
    size: number
    filePath: string
    url: string
    uploadedBy: string
    tenantId: string
    uploadedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    ticket?: TicketCreateNestedOneWithoutAttachmentsInput
    comment?: TicketCommentCreateNestedOneWithoutAttachmentsInput
  }

  export type AttachmentUncheckedCreateInput = {
    id?: string
    filename: string
    originalName: string
    mimeType: string
    size: number
    filePath: string
    url: string
    ticketId?: string | null
    commentId?: string | null
    uploadedBy: string
    tenantId: string
    uploadedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type AttachmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    filePath?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    uploadedBy?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ticket?: TicketUpdateOneWithoutAttachmentsNestedInput
    comment?: TicketCommentUpdateOneWithoutAttachmentsNestedInput
  }

  export type AttachmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    filePath?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    ticketId?: NullableStringFieldUpdateOperationsInput | string | null
    commentId?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedBy?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AttachmentCreateManyInput = {
    id?: string
    filename: string
    originalName: string
    mimeType: string
    size: number
    filePath: string
    url: string
    ticketId?: string | null
    commentId?: string | null
    uploadedBy: string
    tenantId: string
    uploadedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type AttachmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    filePath?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    uploadedBy?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AttachmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    filePath?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    ticketId?: NullableStringFieldUpdateOperationsInput | string | null
    commentId?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedBy?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SLACreateInput = {
    id?: string
    name: string
    description?: string | null
    responseTime?: number
    resolutionTime?: number
    departmentId?: string | null
    isActive?: boolean
    escalationRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutSlasInput
    priority?: PriorityCreateNestedOneWithoutSlasInput
  }

  export type SLAUncheckedCreateInput = {
    id?: string
    tenantId: string
    name: string
    description?: string | null
    responseTime?: number
    resolutionTime?: number
    priorityId?: string | null
    departmentId?: string | null
    isActive?: boolean
    escalationRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SLAUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    responseTime?: IntFieldUpdateOperationsInput | number
    resolutionTime?: IntFieldUpdateOperationsInput | number
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    escalationRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutSlasNestedInput
    priority?: PriorityUpdateOneWithoutSlasNestedInput
  }

  export type SLAUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    responseTime?: IntFieldUpdateOperationsInput | number
    resolutionTime?: IntFieldUpdateOperationsInput | number
    priorityId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    escalationRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SLACreateManyInput = {
    id?: string
    tenantId: string
    name: string
    description?: string | null
    responseTime?: number
    resolutionTime?: number
    priorityId?: string | null
    departmentId?: string | null
    isActive?: boolean
    escalationRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SLAUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    responseTime?: IntFieldUpdateOperationsInput | number
    resolutionTime?: IntFieldUpdateOperationsInput | number
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    escalationRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SLAUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    responseTime?: IntFieldUpdateOperationsInput | number
    resolutionTime?: IntFieldUpdateOperationsInput | number
    priorityId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    escalationRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkflowCreateInput = {
    id?: string
    name: string
    description?: string | null
    rules: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutWorkflowsInput
  }

  export type WorkflowUncheckedCreateInput = {
    id?: string
    tenantId: string
    name: string
    description?: string | null
    rules: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkflowUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    rules?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutWorkflowsNestedInput
  }

  export type WorkflowUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    rules?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkflowCreateManyInput = {
    id?: string
    tenantId: string
    name: string
    description?: string | null
    rules: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkflowUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    rules?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkflowUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    rules?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type TenantScalarRelationFilter = {
    is?: TenantWhereInput
    isNot?: TenantWhereInput
  }

  export type TicketListRelationFilter = {
    every?: TicketWhereInput
    some?: TicketWhereInput
    none?: TicketWhereInput
  }

  export type SLAListRelationFilter = {
    every?: SLAWhereInput
    some?: SLAWhereInput
    none?: SLAWhereInput
  }

  export type TicketOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SLAOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PriorityCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    order?: SortOrder
    isDefault?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PriorityAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type PriorityMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    order?: SortOrder
    isDefault?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PriorityMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    order?: SortOrder
    isDefault?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PrioritySumOrderByAggregateInput = {
    order?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type ColumnListRelationFilter = {
    every?: ColumnWhereInput
    some?: ColumnWhereInput
    none?: ColumnWhereInput
  }

  export type ColumnOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StatusCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    order?: SortOrder
    isDefault?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StatusAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type StatusMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    order?: SortOrder
    isDefault?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StatusMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    order?: SortOrder
    isDefault?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StatusSumOrderByAggregateInput = {
    order?: SortOrder
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

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type DepartmentListRelationFilter = {
    every?: DepartmentWhereInput
    some?: DepartmentWhereInput
    none?: DepartmentWhereInput
  }

  export type WorkflowListRelationFilter = {
    every?: WorkflowWhereInput
    some?: WorkflowWhereInput
    none?: WorkflowWhereInput
  }

  export type PriorityListRelationFilter = {
    every?: PriorityWhereInput
    some?: PriorityWhereInput
    none?: PriorityWhereInput
  }

  export type StatusListRelationFilter = {
    every?: StatusWhereInput
    some?: StatusWhereInput
    none?: StatusWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DepartmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorkflowOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PriorityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StatusOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TenantCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
  }

  export type TenantMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
  }

  export type TenantMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
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

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type TicketCommentListRelationFilter = {
    every?: TicketCommentWhereInput
    some?: TicketCommentWhereInput
    none?: TicketCommentWhereInput
  }

  export type TicketCommentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    username?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrder
    refreshToken?: SortOrder
    resetPasswordToken?: SortOrder
    resetPasswordTokenExpiry?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    username?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrder
    refreshToken?: SortOrder
    resetPasswordToken?: SortOrder
    resetPasswordTokenExpiry?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    username?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrder
    refreshToken?: SortOrder
    resetPasswordToken?: SortOrder
    resetPasswordTokenExpiry?: SortOrder
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DepartmentCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DepartmentMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DepartmentMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StatusNullableScalarRelationFilter = {
    is?: StatusWhereInput | null
    isNot?: StatusWhereInput | null
  }

  export type ColumnCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    order?: SortOrder
    color?: SortOrder
    isDefault?: SortOrder
    statusId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ColumnAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type ColumnMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    order?: SortOrder
    color?: SortOrder
    isDefault?: SortOrder
    statusId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ColumnMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    order?: SortOrder
    color?: SortOrder
    isDefault?: SortOrder
    statusId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ColumnSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type PriorityNullableScalarRelationFilter = {
    is?: PriorityWhereInput | null
    isNot?: PriorityWhereInput | null
  }

  export type ColumnNullableScalarRelationFilter = {
    is?: ColumnWhereInput | null
    isNot?: ColumnWhereInput | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type DepartmentNullableScalarRelationFilter = {
    is?: DepartmentWhereInput | null
    isNot?: DepartmentWhereInput | null
  }

  export type AttachmentListRelationFilter = {
    every?: AttachmentWhereInput
    some?: AttachmentWhereInput
    none?: AttachmentWhereInput
  }

  export type AttachmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TicketCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priorityId?: SortOrder
    afterId?: SortOrder
    columnId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    closedAt?: SortOrder
    deletedAt?: SortOrder
    creatorId?: SortOrder
    assigneeId?: SortOrder
    departmentId?: SortOrder
  }

  export type TicketMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priorityId?: SortOrder
    afterId?: SortOrder
    columnId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    closedAt?: SortOrder
    deletedAt?: SortOrder
    creatorId?: SortOrder
    assigneeId?: SortOrder
    departmentId?: SortOrder
  }

  export type TicketMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priorityId?: SortOrder
    afterId?: SortOrder
    columnId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    closedAt?: SortOrder
    deletedAt?: SortOrder
    creatorId?: SortOrder
    assigneeId?: SortOrder
    departmentId?: SortOrder
  }

  export type TicketScalarRelationFilter = {
    is?: TicketWhereInput
    isNot?: TicketWhereInput
  }

  export type TicketCommentCountOrderByAggregateInput = {
    id?: SortOrder
    ticketId?: SortOrder
    userId?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
  }

  export type TicketCommentMaxOrderByAggregateInput = {
    id?: SortOrder
    ticketId?: SortOrder
    userId?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
  }

  export type TicketCommentMinOrderByAggregateInput = {
    id?: SortOrder
    ticketId?: SortOrder
    userId?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
  }

  export type TicketNullableScalarRelationFilter = {
    is?: TicketWhereInput | null
    isNot?: TicketWhereInput | null
  }

  export type TicketCommentNullableScalarRelationFilter = {
    is?: TicketCommentWhereInput | null
    isNot?: TicketCommentWhereInput | null
  }

  export type AttachmentCountOrderByAggregateInput = {
    id?: SortOrder
    filename?: SortOrder
    originalName?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    filePath?: SortOrder
    url?: SortOrder
    ticketId?: SortOrder
    commentId?: SortOrder
    uploadedBy?: SortOrder
    tenantId?: SortOrder
    uploadedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type AttachmentAvgOrderByAggregateInput = {
    size?: SortOrder
  }

  export type AttachmentMaxOrderByAggregateInput = {
    id?: SortOrder
    filename?: SortOrder
    originalName?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    filePath?: SortOrder
    url?: SortOrder
    ticketId?: SortOrder
    commentId?: SortOrder
    uploadedBy?: SortOrder
    tenantId?: SortOrder
    uploadedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type AttachmentMinOrderByAggregateInput = {
    id?: SortOrder
    filename?: SortOrder
    originalName?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    filePath?: SortOrder
    url?: SortOrder
    ticketId?: SortOrder
    commentId?: SortOrder
    uploadedBy?: SortOrder
    tenantId?: SortOrder
    uploadedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type AttachmentSumOrderByAggregateInput = {
    size?: SortOrder
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type SLACountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    responseTime?: SortOrder
    resolutionTime?: SortOrder
    priorityId?: SortOrder
    departmentId?: SortOrder
    isActive?: SortOrder
    escalationRules?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SLAAvgOrderByAggregateInput = {
    responseTime?: SortOrder
    resolutionTime?: SortOrder
  }

  export type SLAMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    responseTime?: SortOrder
    resolutionTime?: SortOrder
    priorityId?: SortOrder
    departmentId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SLAMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    responseTime?: SortOrder
    resolutionTime?: SortOrder
    priorityId?: SortOrder
    departmentId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SLASumOrderByAggregateInput = {
    responseTime?: SortOrder
    resolutionTime?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type WorkflowCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    rules?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkflowMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkflowMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type TenantCreateNestedOneWithoutPrioritiesInput = {
    create?: XOR<TenantCreateWithoutPrioritiesInput, TenantUncheckedCreateWithoutPrioritiesInput>
    connectOrCreate?: TenantCreateOrConnectWithoutPrioritiesInput
    connect?: TenantWhereUniqueInput
  }

  export type TicketCreateNestedManyWithoutPriorityInput = {
    create?: XOR<TicketCreateWithoutPriorityInput, TicketUncheckedCreateWithoutPriorityInput> | TicketCreateWithoutPriorityInput[] | TicketUncheckedCreateWithoutPriorityInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutPriorityInput | TicketCreateOrConnectWithoutPriorityInput[]
    createMany?: TicketCreateManyPriorityInputEnvelope
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type SLACreateNestedManyWithoutPriorityInput = {
    create?: XOR<SLACreateWithoutPriorityInput, SLAUncheckedCreateWithoutPriorityInput> | SLACreateWithoutPriorityInput[] | SLAUncheckedCreateWithoutPriorityInput[]
    connectOrCreate?: SLACreateOrConnectWithoutPriorityInput | SLACreateOrConnectWithoutPriorityInput[]
    createMany?: SLACreateManyPriorityInputEnvelope
    connect?: SLAWhereUniqueInput | SLAWhereUniqueInput[]
  }

  export type TicketUncheckedCreateNestedManyWithoutPriorityInput = {
    create?: XOR<TicketCreateWithoutPriorityInput, TicketUncheckedCreateWithoutPriorityInput> | TicketCreateWithoutPriorityInput[] | TicketUncheckedCreateWithoutPriorityInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutPriorityInput | TicketCreateOrConnectWithoutPriorityInput[]
    createMany?: TicketCreateManyPriorityInputEnvelope
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type SLAUncheckedCreateNestedManyWithoutPriorityInput = {
    create?: XOR<SLACreateWithoutPriorityInput, SLAUncheckedCreateWithoutPriorityInput> | SLACreateWithoutPriorityInput[] | SLAUncheckedCreateWithoutPriorityInput[]
    connectOrCreate?: SLACreateOrConnectWithoutPriorityInput | SLACreateOrConnectWithoutPriorityInput[]
    createMany?: SLACreateManyPriorityInputEnvelope
    connect?: SLAWhereUniqueInput | SLAWhereUniqueInput[]
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

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TenantUpdateOneRequiredWithoutPrioritiesNestedInput = {
    create?: XOR<TenantCreateWithoutPrioritiesInput, TenantUncheckedCreateWithoutPrioritiesInput>
    connectOrCreate?: TenantCreateOrConnectWithoutPrioritiesInput
    upsert?: TenantUpsertWithoutPrioritiesInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutPrioritiesInput, TenantUpdateWithoutPrioritiesInput>, TenantUncheckedUpdateWithoutPrioritiesInput>
  }

  export type TicketUpdateManyWithoutPriorityNestedInput = {
    create?: XOR<TicketCreateWithoutPriorityInput, TicketUncheckedCreateWithoutPriorityInput> | TicketCreateWithoutPriorityInput[] | TicketUncheckedCreateWithoutPriorityInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutPriorityInput | TicketCreateOrConnectWithoutPriorityInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutPriorityInput | TicketUpsertWithWhereUniqueWithoutPriorityInput[]
    createMany?: TicketCreateManyPriorityInputEnvelope
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutPriorityInput | TicketUpdateWithWhereUniqueWithoutPriorityInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutPriorityInput | TicketUpdateManyWithWhereWithoutPriorityInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type SLAUpdateManyWithoutPriorityNestedInput = {
    create?: XOR<SLACreateWithoutPriorityInput, SLAUncheckedCreateWithoutPriorityInput> | SLACreateWithoutPriorityInput[] | SLAUncheckedCreateWithoutPriorityInput[]
    connectOrCreate?: SLACreateOrConnectWithoutPriorityInput | SLACreateOrConnectWithoutPriorityInput[]
    upsert?: SLAUpsertWithWhereUniqueWithoutPriorityInput | SLAUpsertWithWhereUniqueWithoutPriorityInput[]
    createMany?: SLACreateManyPriorityInputEnvelope
    set?: SLAWhereUniqueInput | SLAWhereUniqueInput[]
    disconnect?: SLAWhereUniqueInput | SLAWhereUniqueInput[]
    delete?: SLAWhereUniqueInput | SLAWhereUniqueInput[]
    connect?: SLAWhereUniqueInput | SLAWhereUniqueInput[]
    update?: SLAUpdateWithWhereUniqueWithoutPriorityInput | SLAUpdateWithWhereUniqueWithoutPriorityInput[]
    updateMany?: SLAUpdateManyWithWhereWithoutPriorityInput | SLAUpdateManyWithWhereWithoutPriorityInput[]
    deleteMany?: SLAScalarWhereInput | SLAScalarWhereInput[]
  }

  export type TicketUncheckedUpdateManyWithoutPriorityNestedInput = {
    create?: XOR<TicketCreateWithoutPriorityInput, TicketUncheckedCreateWithoutPriorityInput> | TicketCreateWithoutPriorityInput[] | TicketUncheckedCreateWithoutPriorityInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutPriorityInput | TicketCreateOrConnectWithoutPriorityInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutPriorityInput | TicketUpsertWithWhereUniqueWithoutPriorityInput[]
    createMany?: TicketCreateManyPriorityInputEnvelope
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutPriorityInput | TicketUpdateWithWhereUniqueWithoutPriorityInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutPriorityInput | TicketUpdateManyWithWhereWithoutPriorityInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type SLAUncheckedUpdateManyWithoutPriorityNestedInput = {
    create?: XOR<SLACreateWithoutPriorityInput, SLAUncheckedCreateWithoutPriorityInput> | SLACreateWithoutPriorityInput[] | SLAUncheckedCreateWithoutPriorityInput[]
    connectOrCreate?: SLACreateOrConnectWithoutPriorityInput | SLACreateOrConnectWithoutPriorityInput[]
    upsert?: SLAUpsertWithWhereUniqueWithoutPriorityInput | SLAUpsertWithWhereUniqueWithoutPriorityInput[]
    createMany?: SLACreateManyPriorityInputEnvelope
    set?: SLAWhereUniqueInput | SLAWhereUniqueInput[]
    disconnect?: SLAWhereUniqueInput | SLAWhereUniqueInput[]
    delete?: SLAWhereUniqueInput | SLAWhereUniqueInput[]
    connect?: SLAWhereUniqueInput | SLAWhereUniqueInput[]
    update?: SLAUpdateWithWhereUniqueWithoutPriorityInput | SLAUpdateWithWhereUniqueWithoutPriorityInput[]
    updateMany?: SLAUpdateManyWithWhereWithoutPriorityInput | SLAUpdateManyWithWhereWithoutPriorityInput[]
    deleteMany?: SLAScalarWhereInput | SLAScalarWhereInput[]
  }

  export type TenantCreateNestedOneWithoutStatusesInput = {
    create?: XOR<TenantCreateWithoutStatusesInput, TenantUncheckedCreateWithoutStatusesInput>
    connectOrCreate?: TenantCreateOrConnectWithoutStatusesInput
    connect?: TenantWhereUniqueInput
  }

  export type ColumnCreateNestedManyWithoutStatusInput = {
    create?: XOR<ColumnCreateWithoutStatusInput, ColumnUncheckedCreateWithoutStatusInput> | ColumnCreateWithoutStatusInput[] | ColumnUncheckedCreateWithoutStatusInput[]
    connectOrCreate?: ColumnCreateOrConnectWithoutStatusInput | ColumnCreateOrConnectWithoutStatusInput[]
    createMany?: ColumnCreateManyStatusInputEnvelope
    connect?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[]
  }

  export type ColumnUncheckedCreateNestedManyWithoutStatusInput = {
    create?: XOR<ColumnCreateWithoutStatusInput, ColumnUncheckedCreateWithoutStatusInput> | ColumnCreateWithoutStatusInput[] | ColumnUncheckedCreateWithoutStatusInput[]
    connectOrCreate?: ColumnCreateOrConnectWithoutStatusInput | ColumnCreateOrConnectWithoutStatusInput[]
    createMany?: ColumnCreateManyStatusInputEnvelope
    connect?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[]
  }

  export type TenantUpdateOneRequiredWithoutStatusesNestedInput = {
    create?: XOR<TenantCreateWithoutStatusesInput, TenantUncheckedCreateWithoutStatusesInput>
    connectOrCreate?: TenantCreateOrConnectWithoutStatusesInput
    upsert?: TenantUpsertWithoutStatusesInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutStatusesInput, TenantUpdateWithoutStatusesInput>, TenantUncheckedUpdateWithoutStatusesInput>
  }

  export type ColumnUpdateManyWithoutStatusNestedInput = {
    create?: XOR<ColumnCreateWithoutStatusInput, ColumnUncheckedCreateWithoutStatusInput> | ColumnCreateWithoutStatusInput[] | ColumnUncheckedCreateWithoutStatusInput[]
    connectOrCreate?: ColumnCreateOrConnectWithoutStatusInput | ColumnCreateOrConnectWithoutStatusInput[]
    upsert?: ColumnUpsertWithWhereUniqueWithoutStatusInput | ColumnUpsertWithWhereUniqueWithoutStatusInput[]
    createMany?: ColumnCreateManyStatusInputEnvelope
    set?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[]
    disconnect?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[]
    delete?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[]
    connect?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[]
    update?: ColumnUpdateWithWhereUniqueWithoutStatusInput | ColumnUpdateWithWhereUniqueWithoutStatusInput[]
    updateMany?: ColumnUpdateManyWithWhereWithoutStatusInput | ColumnUpdateManyWithWhereWithoutStatusInput[]
    deleteMany?: ColumnScalarWhereInput | ColumnScalarWhereInput[]
  }

  export type ColumnUncheckedUpdateManyWithoutStatusNestedInput = {
    create?: XOR<ColumnCreateWithoutStatusInput, ColumnUncheckedCreateWithoutStatusInput> | ColumnCreateWithoutStatusInput[] | ColumnUncheckedCreateWithoutStatusInput[]
    connectOrCreate?: ColumnCreateOrConnectWithoutStatusInput | ColumnCreateOrConnectWithoutStatusInput[]
    upsert?: ColumnUpsertWithWhereUniqueWithoutStatusInput | ColumnUpsertWithWhereUniqueWithoutStatusInput[]
    createMany?: ColumnCreateManyStatusInputEnvelope
    set?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[]
    disconnect?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[]
    delete?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[]
    connect?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[]
    update?: ColumnUpdateWithWhereUniqueWithoutStatusInput | ColumnUpdateWithWhereUniqueWithoutStatusInput[]
    updateMany?: ColumnUpdateManyWithWhereWithoutStatusInput | ColumnUpdateManyWithWhereWithoutStatusInput[]
    deleteMany?: ColumnScalarWhereInput | ColumnScalarWhereInput[]
  }

  export type UserCreateNestedManyWithoutTenantInput = {
    create?: XOR<UserCreateWithoutTenantInput, UserUncheckedCreateWithoutTenantInput> | UserCreateWithoutTenantInput[] | UserUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: UserCreateOrConnectWithoutTenantInput | UserCreateOrConnectWithoutTenantInput[]
    createMany?: UserCreateManyTenantInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type DepartmentCreateNestedManyWithoutTenantInput = {
    create?: XOR<DepartmentCreateWithoutTenantInput, DepartmentUncheckedCreateWithoutTenantInput> | DepartmentCreateWithoutTenantInput[] | DepartmentUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: DepartmentCreateOrConnectWithoutTenantInput | DepartmentCreateOrConnectWithoutTenantInput[]
    createMany?: DepartmentCreateManyTenantInputEnvelope
    connect?: DepartmentWhereUniqueInput | DepartmentWhereUniqueInput[]
  }

  export type TicketCreateNestedManyWithoutTenantInput = {
    create?: XOR<TicketCreateWithoutTenantInput, TicketUncheckedCreateWithoutTenantInput> | TicketCreateWithoutTenantInput[] | TicketUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutTenantInput | TicketCreateOrConnectWithoutTenantInput[]
    createMany?: TicketCreateManyTenantInputEnvelope
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type ColumnCreateNestedManyWithoutTenantInput = {
    create?: XOR<ColumnCreateWithoutTenantInput, ColumnUncheckedCreateWithoutTenantInput> | ColumnCreateWithoutTenantInput[] | ColumnUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: ColumnCreateOrConnectWithoutTenantInput | ColumnCreateOrConnectWithoutTenantInput[]
    createMany?: ColumnCreateManyTenantInputEnvelope
    connect?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[]
  }

  export type SLACreateNestedManyWithoutTenantInput = {
    create?: XOR<SLACreateWithoutTenantInput, SLAUncheckedCreateWithoutTenantInput> | SLACreateWithoutTenantInput[] | SLAUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: SLACreateOrConnectWithoutTenantInput | SLACreateOrConnectWithoutTenantInput[]
    createMany?: SLACreateManyTenantInputEnvelope
    connect?: SLAWhereUniqueInput | SLAWhereUniqueInput[]
  }

  export type WorkflowCreateNestedManyWithoutTenantInput = {
    create?: XOR<WorkflowCreateWithoutTenantInput, WorkflowUncheckedCreateWithoutTenantInput> | WorkflowCreateWithoutTenantInput[] | WorkflowUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: WorkflowCreateOrConnectWithoutTenantInput | WorkflowCreateOrConnectWithoutTenantInput[]
    createMany?: WorkflowCreateManyTenantInputEnvelope
    connect?: WorkflowWhereUniqueInput | WorkflowWhereUniqueInput[]
  }

  export type PriorityCreateNestedManyWithoutTenantInput = {
    create?: XOR<PriorityCreateWithoutTenantInput, PriorityUncheckedCreateWithoutTenantInput> | PriorityCreateWithoutTenantInput[] | PriorityUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: PriorityCreateOrConnectWithoutTenantInput | PriorityCreateOrConnectWithoutTenantInput[]
    createMany?: PriorityCreateManyTenantInputEnvelope
    connect?: PriorityWhereUniqueInput | PriorityWhereUniqueInput[]
  }

  export type StatusCreateNestedManyWithoutTenantInput = {
    create?: XOR<StatusCreateWithoutTenantInput, StatusUncheckedCreateWithoutTenantInput> | StatusCreateWithoutTenantInput[] | StatusUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: StatusCreateOrConnectWithoutTenantInput | StatusCreateOrConnectWithoutTenantInput[]
    createMany?: StatusCreateManyTenantInputEnvelope
    connect?: StatusWhereUniqueInput | StatusWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<UserCreateWithoutTenantInput, UserUncheckedCreateWithoutTenantInput> | UserCreateWithoutTenantInput[] | UserUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: UserCreateOrConnectWithoutTenantInput | UserCreateOrConnectWithoutTenantInput[]
    createMany?: UserCreateManyTenantInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type DepartmentUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<DepartmentCreateWithoutTenantInput, DepartmentUncheckedCreateWithoutTenantInput> | DepartmentCreateWithoutTenantInput[] | DepartmentUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: DepartmentCreateOrConnectWithoutTenantInput | DepartmentCreateOrConnectWithoutTenantInput[]
    createMany?: DepartmentCreateManyTenantInputEnvelope
    connect?: DepartmentWhereUniqueInput | DepartmentWhereUniqueInput[]
  }

  export type TicketUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<TicketCreateWithoutTenantInput, TicketUncheckedCreateWithoutTenantInput> | TicketCreateWithoutTenantInput[] | TicketUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutTenantInput | TicketCreateOrConnectWithoutTenantInput[]
    createMany?: TicketCreateManyTenantInputEnvelope
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type ColumnUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<ColumnCreateWithoutTenantInput, ColumnUncheckedCreateWithoutTenantInput> | ColumnCreateWithoutTenantInput[] | ColumnUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: ColumnCreateOrConnectWithoutTenantInput | ColumnCreateOrConnectWithoutTenantInput[]
    createMany?: ColumnCreateManyTenantInputEnvelope
    connect?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[]
  }

  export type SLAUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<SLACreateWithoutTenantInput, SLAUncheckedCreateWithoutTenantInput> | SLACreateWithoutTenantInput[] | SLAUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: SLACreateOrConnectWithoutTenantInput | SLACreateOrConnectWithoutTenantInput[]
    createMany?: SLACreateManyTenantInputEnvelope
    connect?: SLAWhereUniqueInput | SLAWhereUniqueInput[]
  }

  export type WorkflowUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<WorkflowCreateWithoutTenantInput, WorkflowUncheckedCreateWithoutTenantInput> | WorkflowCreateWithoutTenantInput[] | WorkflowUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: WorkflowCreateOrConnectWithoutTenantInput | WorkflowCreateOrConnectWithoutTenantInput[]
    createMany?: WorkflowCreateManyTenantInputEnvelope
    connect?: WorkflowWhereUniqueInput | WorkflowWhereUniqueInput[]
  }

  export type PriorityUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<PriorityCreateWithoutTenantInput, PriorityUncheckedCreateWithoutTenantInput> | PriorityCreateWithoutTenantInput[] | PriorityUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: PriorityCreateOrConnectWithoutTenantInput | PriorityCreateOrConnectWithoutTenantInput[]
    createMany?: PriorityCreateManyTenantInputEnvelope
    connect?: PriorityWhereUniqueInput | PriorityWhereUniqueInput[]
  }

  export type StatusUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<StatusCreateWithoutTenantInput, StatusUncheckedCreateWithoutTenantInput> | StatusCreateWithoutTenantInput[] | StatusUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: StatusCreateOrConnectWithoutTenantInput | StatusCreateOrConnectWithoutTenantInput[]
    createMany?: StatusCreateManyTenantInputEnvelope
    connect?: StatusWhereUniqueInput | StatusWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UserUpdateManyWithoutTenantNestedInput = {
    create?: XOR<UserCreateWithoutTenantInput, UserUncheckedCreateWithoutTenantInput> | UserCreateWithoutTenantInput[] | UserUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: UserCreateOrConnectWithoutTenantInput | UserCreateOrConnectWithoutTenantInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutTenantInput | UserUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: UserCreateManyTenantInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutTenantInput | UserUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: UserUpdateManyWithWhereWithoutTenantInput | UserUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type DepartmentUpdateManyWithoutTenantNestedInput = {
    create?: XOR<DepartmentCreateWithoutTenantInput, DepartmentUncheckedCreateWithoutTenantInput> | DepartmentCreateWithoutTenantInput[] | DepartmentUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: DepartmentCreateOrConnectWithoutTenantInput | DepartmentCreateOrConnectWithoutTenantInput[]
    upsert?: DepartmentUpsertWithWhereUniqueWithoutTenantInput | DepartmentUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: DepartmentCreateManyTenantInputEnvelope
    set?: DepartmentWhereUniqueInput | DepartmentWhereUniqueInput[]
    disconnect?: DepartmentWhereUniqueInput | DepartmentWhereUniqueInput[]
    delete?: DepartmentWhereUniqueInput | DepartmentWhereUniqueInput[]
    connect?: DepartmentWhereUniqueInput | DepartmentWhereUniqueInput[]
    update?: DepartmentUpdateWithWhereUniqueWithoutTenantInput | DepartmentUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: DepartmentUpdateManyWithWhereWithoutTenantInput | DepartmentUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: DepartmentScalarWhereInput | DepartmentScalarWhereInput[]
  }

  export type TicketUpdateManyWithoutTenantNestedInput = {
    create?: XOR<TicketCreateWithoutTenantInput, TicketUncheckedCreateWithoutTenantInput> | TicketCreateWithoutTenantInput[] | TicketUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutTenantInput | TicketCreateOrConnectWithoutTenantInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutTenantInput | TicketUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: TicketCreateManyTenantInputEnvelope
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutTenantInput | TicketUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutTenantInput | TicketUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type ColumnUpdateManyWithoutTenantNestedInput = {
    create?: XOR<ColumnCreateWithoutTenantInput, ColumnUncheckedCreateWithoutTenantInput> | ColumnCreateWithoutTenantInput[] | ColumnUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: ColumnCreateOrConnectWithoutTenantInput | ColumnCreateOrConnectWithoutTenantInput[]
    upsert?: ColumnUpsertWithWhereUniqueWithoutTenantInput | ColumnUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: ColumnCreateManyTenantInputEnvelope
    set?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[]
    disconnect?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[]
    delete?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[]
    connect?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[]
    update?: ColumnUpdateWithWhereUniqueWithoutTenantInput | ColumnUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: ColumnUpdateManyWithWhereWithoutTenantInput | ColumnUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: ColumnScalarWhereInput | ColumnScalarWhereInput[]
  }

  export type SLAUpdateManyWithoutTenantNestedInput = {
    create?: XOR<SLACreateWithoutTenantInput, SLAUncheckedCreateWithoutTenantInput> | SLACreateWithoutTenantInput[] | SLAUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: SLACreateOrConnectWithoutTenantInput | SLACreateOrConnectWithoutTenantInput[]
    upsert?: SLAUpsertWithWhereUniqueWithoutTenantInput | SLAUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: SLACreateManyTenantInputEnvelope
    set?: SLAWhereUniqueInput | SLAWhereUniqueInput[]
    disconnect?: SLAWhereUniqueInput | SLAWhereUniqueInput[]
    delete?: SLAWhereUniqueInput | SLAWhereUniqueInput[]
    connect?: SLAWhereUniqueInput | SLAWhereUniqueInput[]
    update?: SLAUpdateWithWhereUniqueWithoutTenantInput | SLAUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: SLAUpdateManyWithWhereWithoutTenantInput | SLAUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: SLAScalarWhereInput | SLAScalarWhereInput[]
  }

  export type WorkflowUpdateManyWithoutTenantNestedInput = {
    create?: XOR<WorkflowCreateWithoutTenantInput, WorkflowUncheckedCreateWithoutTenantInput> | WorkflowCreateWithoutTenantInput[] | WorkflowUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: WorkflowCreateOrConnectWithoutTenantInput | WorkflowCreateOrConnectWithoutTenantInput[]
    upsert?: WorkflowUpsertWithWhereUniqueWithoutTenantInput | WorkflowUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: WorkflowCreateManyTenantInputEnvelope
    set?: WorkflowWhereUniqueInput | WorkflowWhereUniqueInput[]
    disconnect?: WorkflowWhereUniqueInput | WorkflowWhereUniqueInput[]
    delete?: WorkflowWhereUniqueInput | WorkflowWhereUniqueInput[]
    connect?: WorkflowWhereUniqueInput | WorkflowWhereUniqueInput[]
    update?: WorkflowUpdateWithWhereUniqueWithoutTenantInput | WorkflowUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: WorkflowUpdateManyWithWhereWithoutTenantInput | WorkflowUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: WorkflowScalarWhereInput | WorkflowScalarWhereInput[]
  }

  export type PriorityUpdateManyWithoutTenantNestedInput = {
    create?: XOR<PriorityCreateWithoutTenantInput, PriorityUncheckedCreateWithoutTenantInput> | PriorityCreateWithoutTenantInput[] | PriorityUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: PriorityCreateOrConnectWithoutTenantInput | PriorityCreateOrConnectWithoutTenantInput[]
    upsert?: PriorityUpsertWithWhereUniqueWithoutTenantInput | PriorityUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: PriorityCreateManyTenantInputEnvelope
    set?: PriorityWhereUniqueInput | PriorityWhereUniqueInput[]
    disconnect?: PriorityWhereUniqueInput | PriorityWhereUniqueInput[]
    delete?: PriorityWhereUniqueInput | PriorityWhereUniqueInput[]
    connect?: PriorityWhereUniqueInput | PriorityWhereUniqueInput[]
    update?: PriorityUpdateWithWhereUniqueWithoutTenantInput | PriorityUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: PriorityUpdateManyWithWhereWithoutTenantInput | PriorityUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: PriorityScalarWhereInput | PriorityScalarWhereInput[]
  }

  export type StatusUpdateManyWithoutTenantNestedInput = {
    create?: XOR<StatusCreateWithoutTenantInput, StatusUncheckedCreateWithoutTenantInput> | StatusCreateWithoutTenantInput[] | StatusUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: StatusCreateOrConnectWithoutTenantInput | StatusCreateOrConnectWithoutTenantInput[]
    upsert?: StatusUpsertWithWhereUniqueWithoutTenantInput | StatusUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: StatusCreateManyTenantInputEnvelope
    set?: StatusWhereUniqueInput | StatusWhereUniqueInput[]
    disconnect?: StatusWhereUniqueInput | StatusWhereUniqueInput[]
    delete?: StatusWhereUniqueInput | StatusWhereUniqueInput[]
    connect?: StatusWhereUniqueInput | StatusWhereUniqueInput[]
    update?: StatusUpdateWithWhereUniqueWithoutTenantInput | StatusUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: StatusUpdateManyWithWhereWithoutTenantInput | StatusUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: StatusScalarWhereInput | StatusScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<UserCreateWithoutTenantInput, UserUncheckedCreateWithoutTenantInput> | UserCreateWithoutTenantInput[] | UserUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: UserCreateOrConnectWithoutTenantInput | UserCreateOrConnectWithoutTenantInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutTenantInput | UserUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: UserCreateManyTenantInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutTenantInput | UserUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: UserUpdateManyWithWhereWithoutTenantInput | UserUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type DepartmentUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<DepartmentCreateWithoutTenantInput, DepartmentUncheckedCreateWithoutTenantInput> | DepartmentCreateWithoutTenantInput[] | DepartmentUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: DepartmentCreateOrConnectWithoutTenantInput | DepartmentCreateOrConnectWithoutTenantInput[]
    upsert?: DepartmentUpsertWithWhereUniqueWithoutTenantInput | DepartmentUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: DepartmentCreateManyTenantInputEnvelope
    set?: DepartmentWhereUniqueInput | DepartmentWhereUniqueInput[]
    disconnect?: DepartmentWhereUniqueInput | DepartmentWhereUniqueInput[]
    delete?: DepartmentWhereUniqueInput | DepartmentWhereUniqueInput[]
    connect?: DepartmentWhereUniqueInput | DepartmentWhereUniqueInput[]
    update?: DepartmentUpdateWithWhereUniqueWithoutTenantInput | DepartmentUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: DepartmentUpdateManyWithWhereWithoutTenantInput | DepartmentUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: DepartmentScalarWhereInput | DepartmentScalarWhereInput[]
  }

  export type TicketUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<TicketCreateWithoutTenantInput, TicketUncheckedCreateWithoutTenantInput> | TicketCreateWithoutTenantInput[] | TicketUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutTenantInput | TicketCreateOrConnectWithoutTenantInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutTenantInput | TicketUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: TicketCreateManyTenantInputEnvelope
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutTenantInput | TicketUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutTenantInput | TicketUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type ColumnUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<ColumnCreateWithoutTenantInput, ColumnUncheckedCreateWithoutTenantInput> | ColumnCreateWithoutTenantInput[] | ColumnUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: ColumnCreateOrConnectWithoutTenantInput | ColumnCreateOrConnectWithoutTenantInput[]
    upsert?: ColumnUpsertWithWhereUniqueWithoutTenantInput | ColumnUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: ColumnCreateManyTenantInputEnvelope
    set?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[]
    disconnect?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[]
    delete?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[]
    connect?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[]
    update?: ColumnUpdateWithWhereUniqueWithoutTenantInput | ColumnUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: ColumnUpdateManyWithWhereWithoutTenantInput | ColumnUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: ColumnScalarWhereInput | ColumnScalarWhereInput[]
  }

  export type SLAUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<SLACreateWithoutTenantInput, SLAUncheckedCreateWithoutTenantInput> | SLACreateWithoutTenantInput[] | SLAUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: SLACreateOrConnectWithoutTenantInput | SLACreateOrConnectWithoutTenantInput[]
    upsert?: SLAUpsertWithWhereUniqueWithoutTenantInput | SLAUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: SLACreateManyTenantInputEnvelope
    set?: SLAWhereUniqueInput | SLAWhereUniqueInput[]
    disconnect?: SLAWhereUniqueInput | SLAWhereUniqueInput[]
    delete?: SLAWhereUniqueInput | SLAWhereUniqueInput[]
    connect?: SLAWhereUniqueInput | SLAWhereUniqueInput[]
    update?: SLAUpdateWithWhereUniqueWithoutTenantInput | SLAUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: SLAUpdateManyWithWhereWithoutTenantInput | SLAUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: SLAScalarWhereInput | SLAScalarWhereInput[]
  }

  export type WorkflowUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<WorkflowCreateWithoutTenantInput, WorkflowUncheckedCreateWithoutTenantInput> | WorkflowCreateWithoutTenantInput[] | WorkflowUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: WorkflowCreateOrConnectWithoutTenantInput | WorkflowCreateOrConnectWithoutTenantInput[]
    upsert?: WorkflowUpsertWithWhereUniqueWithoutTenantInput | WorkflowUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: WorkflowCreateManyTenantInputEnvelope
    set?: WorkflowWhereUniqueInput | WorkflowWhereUniqueInput[]
    disconnect?: WorkflowWhereUniqueInput | WorkflowWhereUniqueInput[]
    delete?: WorkflowWhereUniqueInput | WorkflowWhereUniqueInput[]
    connect?: WorkflowWhereUniqueInput | WorkflowWhereUniqueInput[]
    update?: WorkflowUpdateWithWhereUniqueWithoutTenantInput | WorkflowUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: WorkflowUpdateManyWithWhereWithoutTenantInput | WorkflowUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: WorkflowScalarWhereInput | WorkflowScalarWhereInput[]
  }

  export type PriorityUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<PriorityCreateWithoutTenantInput, PriorityUncheckedCreateWithoutTenantInput> | PriorityCreateWithoutTenantInput[] | PriorityUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: PriorityCreateOrConnectWithoutTenantInput | PriorityCreateOrConnectWithoutTenantInput[]
    upsert?: PriorityUpsertWithWhereUniqueWithoutTenantInput | PriorityUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: PriorityCreateManyTenantInputEnvelope
    set?: PriorityWhereUniqueInput | PriorityWhereUniqueInput[]
    disconnect?: PriorityWhereUniqueInput | PriorityWhereUniqueInput[]
    delete?: PriorityWhereUniqueInput | PriorityWhereUniqueInput[]
    connect?: PriorityWhereUniqueInput | PriorityWhereUniqueInput[]
    update?: PriorityUpdateWithWhereUniqueWithoutTenantInput | PriorityUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: PriorityUpdateManyWithWhereWithoutTenantInput | PriorityUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: PriorityScalarWhereInput | PriorityScalarWhereInput[]
  }

  export type StatusUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<StatusCreateWithoutTenantInput, StatusUncheckedCreateWithoutTenantInput> | StatusCreateWithoutTenantInput[] | StatusUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: StatusCreateOrConnectWithoutTenantInput | StatusCreateOrConnectWithoutTenantInput[]
    upsert?: StatusUpsertWithWhereUniqueWithoutTenantInput | StatusUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: StatusCreateManyTenantInputEnvelope
    set?: StatusWhereUniqueInput | StatusWhereUniqueInput[]
    disconnect?: StatusWhereUniqueInput | StatusWhereUniqueInput[]
    delete?: StatusWhereUniqueInput | StatusWhereUniqueInput[]
    connect?: StatusWhereUniqueInput | StatusWhereUniqueInput[]
    update?: StatusUpdateWithWhereUniqueWithoutTenantInput | StatusUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: StatusUpdateManyWithWhereWithoutTenantInput | StatusUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: StatusScalarWhereInput | StatusScalarWhereInput[]
  }

  export type TenantCreateNestedOneWithoutUsersInput = {
    create?: XOR<TenantCreateWithoutUsersInput, TenantUncheckedCreateWithoutUsersInput>
    connectOrCreate?: TenantCreateOrConnectWithoutUsersInput
    connect?: TenantWhereUniqueInput
  }

  export type TicketCreateNestedManyWithoutCreatorInput = {
    create?: XOR<TicketCreateWithoutCreatorInput, TicketUncheckedCreateWithoutCreatorInput> | TicketCreateWithoutCreatorInput[] | TicketUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutCreatorInput | TicketCreateOrConnectWithoutCreatorInput[]
    createMany?: TicketCreateManyCreatorInputEnvelope
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type TicketCreateNestedManyWithoutAssigneeInput = {
    create?: XOR<TicketCreateWithoutAssigneeInput, TicketUncheckedCreateWithoutAssigneeInput> | TicketCreateWithoutAssigneeInput[] | TicketUncheckedCreateWithoutAssigneeInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutAssigneeInput | TicketCreateOrConnectWithoutAssigneeInput[]
    createMany?: TicketCreateManyAssigneeInputEnvelope
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type TicketCommentCreateNestedManyWithoutUserInput = {
    create?: XOR<TicketCommentCreateWithoutUserInput, TicketCommentUncheckedCreateWithoutUserInput> | TicketCommentCreateWithoutUserInput[] | TicketCommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TicketCommentCreateOrConnectWithoutUserInput | TicketCommentCreateOrConnectWithoutUserInput[]
    createMany?: TicketCommentCreateManyUserInputEnvelope
    connect?: TicketCommentWhereUniqueInput | TicketCommentWhereUniqueInput[]
  }

  export type TicketUncheckedCreateNestedManyWithoutCreatorInput = {
    create?: XOR<TicketCreateWithoutCreatorInput, TicketUncheckedCreateWithoutCreatorInput> | TicketCreateWithoutCreatorInput[] | TicketUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutCreatorInput | TicketCreateOrConnectWithoutCreatorInput[]
    createMany?: TicketCreateManyCreatorInputEnvelope
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type TicketUncheckedCreateNestedManyWithoutAssigneeInput = {
    create?: XOR<TicketCreateWithoutAssigneeInput, TicketUncheckedCreateWithoutAssigneeInput> | TicketCreateWithoutAssigneeInput[] | TicketUncheckedCreateWithoutAssigneeInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutAssigneeInput | TicketCreateOrConnectWithoutAssigneeInput[]
    createMany?: TicketCreateManyAssigneeInputEnvelope
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type TicketCommentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TicketCommentCreateWithoutUserInput, TicketCommentUncheckedCreateWithoutUserInput> | TicketCommentCreateWithoutUserInput[] | TicketCommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TicketCommentCreateOrConnectWithoutUserInput | TicketCommentCreateOrConnectWithoutUserInput[]
    createMany?: TicketCommentCreateManyUserInputEnvelope
    connect?: TicketCommentWhereUniqueInput | TicketCommentWhereUniqueInput[]
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type TenantUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<TenantCreateWithoutUsersInput, TenantUncheckedCreateWithoutUsersInput>
    connectOrCreate?: TenantCreateOrConnectWithoutUsersInput
    upsert?: TenantUpsertWithoutUsersInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutUsersInput, TenantUpdateWithoutUsersInput>, TenantUncheckedUpdateWithoutUsersInput>
  }

  export type TicketUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<TicketCreateWithoutCreatorInput, TicketUncheckedCreateWithoutCreatorInput> | TicketCreateWithoutCreatorInput[] | TicketUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutCreatorInput | TicketCreateOrConnectWithoutCreatorInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutCreatorInput | TicketUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: TicketCreateManyCreatorInputEnvelope
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutCreatorInput | TicketUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutCreatorInput | TicketUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type TicketUpdateManyWithoutAssigneeNestedInput = {
    create?: XOR<TicketCreateWithoutAssigneeInput, TicketUncheckedCreateWithoutAssigneeInput> | TicketCreateWithoutAssigneeInput[] | TicketUncheckedCreateWithoutAssigneeInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutAssigneeInput | TicketCreateOrConnectWithoutAssigneeInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutAssigneeInput | TicketUpsertWithWhereUniqueWithoutAssigneeInput[]
    createMany?: TicketCreateManyAssigneeInputEnvelope
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutAssigneeInput | TicketUpdateWithWhereUniqueWithoutAssigneeInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutAssigneeInput | TicketUpdateManyWithWhereWithoutAssigneeInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type TicketCommentUpdateManyWithoutUserNestedInput = {
    create?: XOR<TicketCommentCreateWithoutUserInput, TicketCommentUncheckedCreateWithoutUserInput> | TicketCommentCreateWithoutUserInput[] | TicketCommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TicketCommentCreateOrConnectWithoutUserInput | TicketCommentCreateOrConnectWithoutUserInput[]
    upsert?: TicketCommentUpsertWithWhereUniqueWithoutUserInput | TicketCommentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TicketCommentCreateManyUserInputEnvelope
    set?: TicketCommentWhereUniqueInput | TicketCommentWhereUniqueInput[]
    disconnect?: TicketCommentWhereUniqueInput | TicketCommentWhereUniqueInput[]
    delete?: TicketCommentWhereUniqueInput | TicketCommentWhereUniqueInput[]
    connect?: TicketCommentWhereUniqueInput | TicketCommentWhereUniqueInput[]
    update?: TicketCommentUpdateWithWhereUniqueWithoutUserInput | TicketCommentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TicketCommentUpdateManyWithWhereWithoutUserInput | TicketCommentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TicketCommentScalarWhereInput | TicketCommentScalarWhereInput[]
  }

  export type TicketUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<TicketCreateWithoutCreatorInput, TicketUncheckedCreateWithoutCreatorInput> | TicketCreateWithoutCreatorInput[] | TicketUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutCreatorInput | TicketCreateOrConnectWithoutCreatorInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutCreatorInput | TicketUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: TicketCreateManyCreatorInputEnvelope
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutCreatorInput | TicketUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutCreatorInput | TicketUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type TicketUncheckedUpdateManyWithoutAssigneeNestedInput = {
    create?: XOR<TicketCreateWithoutAssigneeInput, TicketUncheckedCreateWithoutAssigneeInput> | TicketCreateWithoutAssigneeInput[] | TicketUncheckedCreateWithoutAssigneeInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutAssigneeInput | TicketCreateOrConnectWithoutAssigneeInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutAssigneeInput | TicketUpsertWithWhereUniqueWithoutAssigneeInput[]
    createMany?: TicketCreateManyAssigneeInputEnvelope
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutAssigneeInput | TicketUpdateWithWhereUniqueWithoutAssigneeInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutAssigneeInput | TicketUpdateManyWithWhereWithoutAssigneeInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type TicketCommentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TicketCommentCreateWithoutUserInput, TicketCommentUncheckedCreateWithoutUserInput> | TicketCommentCreateWithoutUserInput[] | TicketCommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TicketCommentCreateOrConnectWithoutUserInput | TicketCommentCreateOrConnectWithoutUserInput[]
    upsert?: TicketCommentUpsertWithWhereUniqueWithoutUserInput | TicketCommentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TicketCommentCreateManyUserInputEnvelope
    set?: TicketCommentWhereUniqueInput | TicketCommentWhereUniqueInput[]
    disconnect?: TicketCommentWhereUniqueInput | TicketCommentWhereUniqueInput[]
    delete?: TicketCommentWhereUniqueInput | TicketCommentWhereUniqueInput[]
    connect?: TicketCommentWhereUniqueInput | TicketCommentWhereUniqueInput[]
    update?: TicketCommentUpdateWithWhereUniqueWithoutUserInput | TicketCommentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TicketCommentUpdateManyWithWhereWithoutUserInput | TicketCommentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TicketCommentScalarWhereInput | TicketCommentScalarWhereInput[]
  }

  export type TenantCreateNestedOneWithoutDepartmentsInput = {
    create?: XOR<TenantCreateWithoutDepartmentsInput, TenantUncheckedCreateWithoutDepartmentsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutDepartmentsInput
    connect?: TenantWhereUniqueInput
  }

  export type TicketCreateNestedManyWithoutDepartmentInput = {
    create?: XOR<TicketCreateWithoutDepartmentInput, TicketUncheckedCreateWithoutDepartmentInput> | TicketCreateWithoutDepartmentInput[] | TicketUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutDepartmentInput | TicketCreateOrConnectWithoutDepartmentInput[]
    createMany?: TicketCreateManyDepartmentInputEnvelope
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type TicketUncheckedCreateNestedManyWithoutDepartmentInput = {
    create?: XOR<TicketCreateWithoutDepartmentInput, TicketUncheckedCreateWithoutDepartmentInput> | TicketCreateWithoutDepartmentInput[] | TicketUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutDepartmentInput | TicketCreateOrConnectWithoutDepartmentInput[]
    createMany?: TicketCreateManyDepartmentInputEnvelope
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type TenantUpdateOneRequiredWithoutDepartmentsNestedInput = {
    create?: XOR<TenantCreateWithoutDepartmentsInput, TenantUncheckedCreateWithoutDepartmentsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutDepartmentsInput
    upsert?: TenantUpsertWithoutDepartmentsInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutDepartmentsInput, TenantUpdateWithoutDepartmentsInput>, TenantUncheckedUpdateWithoutDepartmentsInput>
  }

  export type TicketUpdateManyWithoutDepartmentNestedInput = {
    create?: XOR<TicketCreateWithoutDepartmentInput, TicketUncheckedCreateWithoutDepartmentInput> | TicketCreateWithoutDepartmentInput[] | TicketUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutDepartmentInput | TicketCreateOrConnectWithoutDepartmentInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutDepartmentInput | TicketUpsertWithWhereUniqueWithoutDepartmentInput[]
    createMany?: TicketCreateManyDepartmentInputEnvelope
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutDepartmentInput | TicketUpdateWithWhereUniqueWithoutDepartmentInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutDepartmentInput | TicketUpdateManyWithWhereWithoutDepartmentInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type TicketUncheckedUpdateManyWithoutDepartmentNestedInput = {
    create?: XOR<TicketCreateWithoutDepartmentInput, TicketUncheckedCreateWithoutDepartmentInput> | TicketCreateWithoutDepartmentInput[] | TicketUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutDepartmentInput | TicketCreateOrConnectWithoutDepartmentInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutDepartmentInput | TicketUpsertWithWhereUniqueWithoutDepartmentInput[]
    createMany?: TicketCreateManyDepartmentInputEnvelope
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutDepartmentInput | TicketUpdateWithWhereUniqueWithoutDepartmentInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutDepartmentInput | TicketUpdateManyWithWhereWithoutDepartmentInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type TenantCreateNestedOneWithoutColumnsInput = {
    create?: XOR<TenantCreateWithoutColumnsInput, TenantUncheckedCreateWithoutColumnsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutColumnsInput
    connect?: TenantWhereUniqueInput
  }

  export type StatusCreateNestedOneWithoutColumnsInput = {
    create?: XOR<StatusCreateWithoutColumnsInput, StatusUncheckedCreateWithoutColumnsInput>
    connectOrCreate?: StatusCreateOrConnectWithoutColumnsInput
    connect?: StatusWhereUniqueInput
  }

  export type TicketCreateNestedManyWithoutColumnInput = {
    create?: XOR<TicketCreateWithoutColumnInput, TicketUncheckedCreateWithoutColumnInput> | TicketCreateWithoutColumnInput[] | TicketUncheckedCreateWithoutColumnInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutColumnInput | TicketCreateOrConnectWithoutColumnInput[]
    createMany?: TicketCreateManyColumnInputEnvelope
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type TicketUncheckedCreateNestedManyWithoutColumnInput = {
    create?: XOR<TicketCreateWithoutColumnInput, TicketUncheckedCreateWithoutColumnInput> | TicketCreateWithoutColumnInput[] | TicketUncheckedCreateWithoutColumnInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutColumnInput | TicketCreateOrConnectWithoutColumnInput[]
    createMany?: TicketCreateManyColumnInputEnvelope
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type TenantUpdateOneRequiredWithoutColumnsNestedInput = {
    create?: XOR<TenantCreateWithoutColumnsInput, TenantUncheckedCreateWithoutColumnsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutColumnsInput
    upsert?: TenantUpsertWithoutColumnsInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutColumnsInput, TenantUpdateWithoutColumnsInput>, TenantUncheckedUpdateWithoutColumnsInput>
  }

  export type StatusUpdateOneWithoutColumnsNestedInput = {
    create?: XOR<StatusCreateWithoutColumnsInput, StatusUncheckedCreateWithoutColumnsInput>
    connectOrCreate?: StatusCreateOrConnectWithoutColumnsInput
    upsert?: StatusUpsertWithoutColumnsInput
    disconnect?: StatusWhereInput | boolean
    delete?: StatusWhereInput | boolean
    connect?: StatusWhereUniqueInput
    update?: XOR<XOR<StatusUpdateToOneWithWhereWithoutColumnsInput, StatusUpdateWithoutColumnsInput>, StatusUncheckedUpdateWithoutColumnsInput>
  }

  export type TicketUpdateManyWithoutColumnNestedInput = {
    create?: XOR<TicketCreateWithoutColumnInput, TicketUncheckedCreateWithoutColumnInput> | TicketCreateWithoutColumnInput[] | TicketUncheckedCreateWithoutColumnInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutColumnInput | TicketCreateOrConnectWithoutColumnInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutColumnInput | TicketUpsertWithWhereUniqueWithoutColumnInput[]
    createMany?: TicketCreateManyColumnInputEnvelope
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutColumnInput | TicketUpdateWithWhereUniqueWithoutColumnInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutColumnInput | TicketUpdateManyWithWhereWithoutColumnInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type TicketUncheckedUpdateManyWithoutColumnNestedInput = {
    create?: XOR<TicketCreateWithoutColumnInput, TicketUncheckedCreateWithoutColumnInput> | TicketCreateWithoutColumnInput[] | TicketUncheckedCreateWithoutColumnInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutColumnInput | TicketCreateOrConnectWithoutColumnInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutColumnInput | TicketUpsertWithWhereUniqueWithoutColumnInput[]
    createMany?: TicketCreateManyColumnInputEnvelope
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutColumnInput | TicketUpdateWithWhereUniqueWithoutColumnInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutColumnInput | TicketUpdateManyWithWhereWithoutColumnInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type TenantCreateNestedOneWithoutTicketsInput = {
    create?: XOR<TenantCreateWithoutTicketsInput, TenantUncheckedCreateWithoutTicketsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutTicketsInput
    connect?: TenantWhereUniqueInput
  }

  export type PriorityCreateNestedOneWithoutTicketsInput = {
    create?: XOR<PriorityCreateWithoutTicketsInput, PriorityUncheckedCreateWithoutTicketsInput>
    connectOrCreate?: PriorityCreateOrConnectWithoutTicketsInput
    connect?: PriorityWhereUniqueInput
  }

  export type ColumnCreateNestedOneWithoutTicketsInput = {
    create?: XOR<ColumnCreateWithoutTicketsInput, ColumnUncheckedCreateWithoutTicketsInput>
    connectOrCreate?: ColumnCreateOrConnectWithoutTicketsInput
    connect?: ColumnWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTicketsCreatedInput = {
    create?: XOR<UserCreateWithoutTicketsCreatedInput, UserUncheckedCreateWithoutTicketsCreatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutTicketsCreatedInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTicketsAssignedInput = {
    create?: XOR<UserCreateWithoutTicketsAssignedInput, UserUncheckedCreateWithoutTicketsAssignedInput>
    connectOrCreate?: UserCreateOrConnectWithoutTicketsAssignedInput
    connect?: UserWhereUniqueInput
  }

  export type DepartmentCreateNestedOneWithoutTicketsInput = {
    create?: XOR<DepartmentCreateWithoutTicketsInput, DepartmentUncheckedCreateWithoutTicketsInput>
    connectOrCreate?: DepartmentCreateOrConnectWithoutTicketsInput
    connect?: DepartmentWhereUniqueInput
  }

  export type TicketCommentCreateNestedManyWithoutTicketInput = {
    create?: XOR<TicketCommentCreateWithoutTicketInput, TicketCommentUncheckedCreateWithoutTicketInput> | TicketCommentCreateWithoutTicketInput[] | TicketCommentUncheckedCreateWithoutTicketInput[]
    connectOrCreate?: TicketCommentCreateOrConnectWithoutTicketInput | TicketCommentCreateOrConnectWithoutTicketInput[]
    createMany?: TicketCommentCreateManyTicketInputEnvelope
    connect?: TicketCommentWhereUniqueInput | TicketCommentWhereUniqueInput[]
  }

  export type AttachmentCreateNestedManyWithoutTicketInput = {
    create?: XOR<AttachmentCreateWithoutTicketInput, AttachmentUncheckedCreateWithoutTicketInput> | AttachmentCreateWithoutTicketInput[] | AttachmentUncheckedCreateWithoutTicketInput[]
    connectOrCreate?: AttachmentCreateOrConnectWithoutTicketInput | AttachmentCreateOrConnectWithoutTicketInput[]
    createMany?: AttachmentCreateManyTicketInputEnvelope
    connect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
  }

  export type TicketCommentUncheckedCreateNestedManyWithoutTicketInput = {
    create?: XOR<TicketCommentCreateWithoutTicketInput, TicketCommentUncheckedCreateWithoutTicketInput> | TicketCommentCreateWithoutTicketInput[] | TicketCommentUncheckedCreateWithoutTicketInput[]
    connectOrCreate?: TicketCommentCreateOrConnectWithoutTicketInput | TicketCommentCreateOrConnectWithoutTicketInput[]
    createMany?: TicketCommentCreateManyTicketInputEnvelope
    connect?: TicketCommentWhereUniqueInput | TicketCommentWhereUniqueInput[]
  }

  export type AttachmentUncheckedCreateNestedManyWithoutTicketInput = {
    create?: XOR<AttachmentCreateWithoutTicketInput, AttachmentUncheckedCreateWithoutTicketInput> | AttachmentCreateWithoutTicketInput[] | AttachmentUncheckedCreateWithoutTicketInput[]
    connectOrCreate?: AttachmentCreateOrConnectWithoutTicketInput | AttachmentCreateOrConnectWithoutTicketInput[]
    createMany?: AttachmentCreateManyTicketInputEnvelope
    connect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
  }

  export type TenantUpdateOneRequiredWithoutTicketsNestedInput = {
    create?: XOR<TenantCreateWithoutTicketsInput, TenantUncheckedCreateWithoutTicketsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutTicketsInput
    upsert?: TenantUpsertWithoutTicketsInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutTicketsInput, TenantUpdateWithoutTicketsInput>, TenantUncheckedUpdateWithoutTicketsInput>
  }

  export type PriorityUpdateOneWithoutTicketsNestedInput = {
    create?: XOR<PriorityCreateWithoutTicketsInput, PriorityUncheckedCreateWithoutTicketsInput>
    connectOrCreate?: PriorityCreateOrConnectWithoutTicketsInput
    upsert?: PriorityUpsertWithoutTicketsInput
    disconnect?: PriorityWhereInput | boolean
    delete?: PriorityWhereInput | boolean
    connect?: PriorityWhereUniqueInput
    update?: XOR<XOR<PriorityUpdateToOneWithWhereWithoutTicketsInput, PriorityUpdateWithoutTicketsInput>, PriorityUncheckedUpdateWithoutTicketsInput>
  }

  export type ColumnUpdateOneWithoutTicketsNestedInput = {
    create?: XOR<ColumnCreateWithoutTicketsInput, ColumnUncheckedCreateWithoutTicketsInput>
    connectOrCreate?: ColumnCreateOrConnectWithoutTicketsInput
    upsert?: ColumnUpsertWithoutTicketsInput
    disconnect?: ColumnWhereInput | boolean
    delete?: ColumnWhereInput | boolean
    connect?: ColumnWhereUniqueInput
    update?: XOR<XOR<ColumnUpdateToOneWithWhereWithoutTicketsInput, ColumnUpdateWithoutTicketsInput>, ColumnUncheckedUpdateWithoutTicketsInput>
  }

  export type UserUpdateOneRequiredWithoutTicketsCreatedNestedInput = {
    create?: XOR<UserCreateWithoutTicketsCreatedInput, UserUncheckedCreateWithoutTicketsCreatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutTicketsCreatedInput
    upsert?: UserUpsertWithoutTicketsCreatedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTicketsCreatedInput, UserUpdateWithoutTicketsCreatedInput>, UserUncheckedUpdateWithoutTicketsCreatedInput>
  }

  export type UserUpdateOneWithoutTicketsAssignedNestedInput = {
    create?: XOR<UserCreateWithoutTicketsAssignedInput, UserUncheckedCreateWithoutTicketsAssignedInput>
    connectOrCreate?: UserCreateOrConnectWithoutTicketsAssignedInput
    upsert?: UserUpsertWithoutTicketsAssignedInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTicketsAssignedInput, UserUpdateWithoutTicketsAssignedInput>, UserUncheckedUpdateWithoutTicketsAssignedInput>
  }

  export type DepartmentUpdateOneWithoutTicketsNestedInput = {
    create?: XOR<DepartmentCreateWithoutTicketsInput, DepartmentUncheckedCreateWithoutTicketsInput>
    connectOrCreate?: DepartmentCreateOrConnectWithoutTicketsInput
    upsert?: DepartmentUpsertWithoutTicketsInput
    disconnect?: DepartmentWhereInput | boolean
    delete?: DepartmentWhereInput | boolean
    connect?: DepartmentWhereUniqueInput
    update?: XOR<XOR<DepartmentUpdateToOneWithWhereWithoutTicketsInput, DepartmentUpdateWithoutTicketsInput>, DepartmentUncheckedUpdateWithoutTicketsInput>
  }

  export type TicketCommentUpdateManyWithoutTicketNestedInput = {
    create?: XOR<TicketCommentCreateWithoutTicketInput, TicketCommentUncheckedCreateWithoutTicketInput> | TicketCommentCreateWithoutTicketInput[] | TicketCommentUncheckedCreateWithoutTicketInput[]
    connectOrCreate?: TicketCommentCreateOrConnectWithoutTicketInput | TicketCommentCreateOrConnectWithoutTicketInput[]
    upsert?: TicketCommentUpsertWithWhereUniqueWithoutTicketInput | TicketCommentUpsertWithWhereUniqueWithoutTicketInput[]
    createMany?: TicketCommentCreateManyTicketInputEnvelope
    set?: TicketCommentWhereUniqueInput | TicketCommentWhereUniqueInput[]
    disconnect?: TicketCommentWhereUniqueInput | TicketCommentWhereUniqueInput[]
    delete?: TicketCommentWhereUniqueInput | TicketCommentWhereUniqueInput[]
    connect?: TicketCommentWhereUniqueInput | TicketCommentWhereUniqueInput[]
    update?: TicketCommentUpdateWithWhereUniqueWithoutTicketInput | TicketCommentUpdateWithWhereUniqueWithoutTicketInput[]
    updateMany?: TicketCommentUpdateManyWithWhereWithoutTicketInput | TicketCommentUpdateManyWithWhereWithoutTicketInput[]
    deleteMany?: TicketCommentScalarWhereInput | TicketCommentScalarWhereInput[]
  }

  export type AttachmentUpdateManyWithoutTicketNestedInput = {
    create?: XOR<AttachmentCreateWithoutTicketInput, AttachmentUncheckedCreateWithoutTicketInput> | AttachmentCreateWithoutTicketInput[] | AttachmentUncheckedCreateWithoutTicketInput[]
    connectOrCreate?: AttachmentCreateOrConnectWithoutTicketInput | AttachmentCreateOrConnectWithoutTicketInput[]
    upsert?: AttachmentUpsertWithWhereUniqueWithoutTicketInput | AttachmentUpsertWithWhereUniqueWithoutTicketInput[]
    createMany?: AttachmentCreateManyTicketInputEnvelope
    set?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    disconnect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    delete?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    connect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    update?: AttachmentUpdateWithWhereUniqueWithoutTicketInput | AttachmentUpdateWithWhereUniqueWithoutTicketInput[]
    updateMany?: AttachmentUpdateManyWithWhereWithoutTicketInput | AttachmentUpdateManyWithWhereWithoutTicketInput[]
    deleteMany?: AttachmentScalarWhereInput | AttachmentScalarWhereInput[]
  }

  export type TicketCommentUncheckedUpdateManyWithoutTicketNestedInput = {
    create?: XOR<TicketCommentCreateWithoutTicketInput, TicketCommentUncheckedCreateWithoutTicketInput> | TicketCommentCreateWithoutTicketInput[] | TicketCommentUncheckedCreateWithoutTicketInput[]
    connectOrCreate?: TicketCommentCreateOrConnectWithoutTicketInput | TicketCommentCreateOrConnectWithoutTicketInput[]
    upsert?: TicketCommentUpsertWithWhereUniqueWithoutTicketInput | TicketCommentUpsertWithWhereUniqueWithoutTicketInput[]
    createMany?: TicketCommentCreateManyTicketInputEnvelope
    set?: TicketCommentWhereUniqueInput | TicketCommentWhereUniqueInput[]
    disconnect?: TicketCommentWhereUniqueInput | TicketCommentWhereUniqueInput[]
    delete?: TicketCommentWhereUniqueInput | TicketCommentWhereUniqueInput[]
    connect?: TicketCommentWhereUniqueInput | TicketCommentWhereUniqueInput[]
    update?: TicketCommentUpdateWithWhereUniqueWithoutTicketInput | TicketCommentUpdateWithWhereUniqueWithoutTicketInput[]
    updateMany?: TicketCommentUpdateManyWithWhereWithoutTicketInput | TicketCommentUpdateManyWithWhereWithoutTicketInput[]
    deleteMany?: TicketCommentScalarWhereInput | TicketCommentScalarWhereInput[]
  }

  export type AttachmentUncheckedUpdateManyWithoutTicketNestedInput = {
    create?: XOR<AttachmentCreateWithoutTicketInput, AttachmentUncheckedCreateWithoutTicketInput> | AttachmentCreateWithoutTicketInput[] | AttachmentUncheckedCreateWithoutTicketInput[]
    connectOrCreate?: AttachmentCreateOrConnectWithoutTicketInput | AttachmentCreateOrConnectWithoutTicketInput[]
    upsert?: AttachmentUpsertWithWhereUniqueWithoutTicketInput | AttachmentUpsertWithWhereUniqueWithoutTicketInput[]
    createMany?: AttachmentCreateManyTicketInputEnvelope
    set?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    disconnect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    delete?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    connect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    update?: AttachmentUpdateWithWhereUniqueWithoutTicketInput | AttachmentUpdateWithWhereUniqueWithoutTicketInput[]
    updateMany?: AttachmentUpdateManyWithWhereWithoutTicketInput | AttachmentUpdateManyWithWhereWithoutTicketInput[]
    deleteMany?: AttachmentScalarWhereInput | AttachmentScalarWhereInput[]
  }

  export type TicketCreateNestedOneWithoutCommentsInput = {
    create?: XOR<TicketCreateWithoutCommentsInput, TicketUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: TicketCreateOrConnectWithoutCommentsInput
    connect?: TicketWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCommentsInput = {
    create?: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommentsInput
    connect?: UserWhereUniqueInput
  }

  export type AttachmentCreateNestedManyWithoutCommentInput = {
    create?: XOR<AttachmentCreateWithoutCommentInput, AttachmentUncheckedCreateWithoutCommentInput> | AttachmentCreateWithoutCommentInput[] | AttachmentUncheckedCreateWithoutCommentInput[]
    connectOrCreate?: AttachmentCreateOrConnectWithoutCommentInput | AttachmentCreateOrConnectWithoutCommentInput[]
    createMany?: AttachmentCreateManyCommentInputEnvelope
    connect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
  }

  export type AttachmentUncheckedCreateNestedManyWithoutCommentInput = {
    create?: XOR<AttachmentCreateWithoutCommentInput, AttachmentUncheckedCreateWithoutCommentInput> | AttachmentCreateWithoutCommentInput[] | AttachmentUncheckedCreateWithoutCommentInput[]
    connectOrCreate?: AttachmentCreateOrConnectWithoutCommentInput | AttachmentCreateOrConnectWithoutCommentInput[]
    createMany?: AttachmentCreateManyCommentInputEnvelope
    connect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
  }

  export type TicketUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<TicketCreateWithoutCommentsInput, TicketUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: TicketCreateOrConnectWithoutCommentsInput
    upsert?: TicketUpsertWithoutCommentsInput
    connect?: TicketWhereUniqueInput
    update?: XOR<XOR<TicketUpdateToOneWithWhereWithoutCommentsInput, TicketUpdateWithoutCommentsInput>, TicketUncheckedUpdateWithoutCommentsInput>
  }

  export type UserUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommentsInput
    upsert?: UserUpsertWithoutCommentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCommentsInput, UserUpdateWithoutCommentsInput>, UserUncheckedUpdateWithoutCommentsInput>
  }

  export type AttachmentUpdateManyWithoutCommentNestedInput = {
    create?: XOR<AttachmentCreateWithoutCommentInput, AttachmentUncheckedCreateWithoutCommentInput> | AttachmentCreateWithoutCommentInput[] | AttachmentUncheckedCreateWithoutCommentInput[]
    connectOrCreate?: AttachmentCreateOrConnectWithoutCommentInput | AttachmentCreateOrConnectWithoutCommentInput[]
    upsert?: AttachmentUpsertWithWhereUniqueWithoutCommentInput | AttachmentUpsertWithWhereUniqueWithoutCommentInput[]
    createMany?: AttachmentCreateManyCommentInputEnvelope
    set?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    disconnect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    delete?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    connect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    update?: AttachmentUpdateWithWhereUniqueWithoutCommentInput | AttachmentUpdateWithWhereUniqueWithoutCommentInput[]
    updateMany?: AttachmentUpdateManyWithWhereWithoutCommentInput | AttachmentUpdateManyWithWhereWithoutCommentInput[]
    deleteMany?: AttachmentScalarWhereInput | AttachmentScalarWhereInput[]
  }

  export type AttachmentUncheckedUpdateManyWithoutCommentNestedInput = {
    create?: XOR<AttachmentCreateWithoutCommentInput, AttachmentUncheckedCreateWithoutCommentInput> | AttachmentCreateWithoutCommentInput[] | AttachmentUncheckedCreateWithoutCommentInput[]
    connectOrCreate?: AttachmentCreateOrConnectWithoutCommentInput | AttachmentCreateOrConnectWithoutCommentInput[]
    upsert?: AttachmentUpsertWithWhereUniqueWithoutCommentInput | AttachmentUpsertWithWhereUniqueWithoutCommentInput[]
    createMany?: AttachmentCreateManyCommentInputEnvelope
    set?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    disconnect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    delete?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    connect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    update?: AttachmentUpdateWithWhereUniqueWithoutCommentInput | AttachmentUpdateWithWhereUniqueWithoutCommentInput[]
    updateMany?: AttachmentUpdateManyWithWhereWithoutCommentInput | AttachmentUpdateManyWithWhereWithoutCommentInput[]
    deleteMany?: AttachmentScalarWhereInput | AttachmentScalarWhereInput[]
  }

  export type TicketCreateNestedOneWithoutAttachmentsInput = {
    create?: XOR<TicketCreateWithoutAttachmentsInput, TicketUncheckedCreateWithoutAttachmentsInput>
    connectOrCreate?: TicketCreateOrConnectWithoutAttachmentsInput
    connect?: TicketWhereUniqueInput
  }

  export type TicketCommentCreateNestedOneWithoutAttachmentsInput = {
    create?: XOR<TicketCommentCreateWithoutAttachmentsInput, TicketCommentUncheckedCreateWithoutAttachmentsInput>
    connectOrCreate?: TicketCommentCreateOrConnectWithoutAttachmentsInput
    connect?: TicketCommentWhereUniqueInput
  }

  export type TicketUpdateOneWithoutAttachmentsNestedInput = {
    create?: XOR<TicketCreateWithoutAttachmentsInput, TicketUncheckedCreateWithoutAttachmentsInput>
    connectOrCreate?: TicketCreateOrConnectWithoutAttachmentsInput
    upsert?: TicketUpsertWithoutAttachmentsInput
    disconnect?: TicketWhereInput | boolean
    delete?: TicketWhereInput | boolean
    connect?: TicketWhereUniqueInput
    update?: XOR<XOR<TicketUpdateToOneWithWhereWithoutAttachmentsInput, TicketUpdateWithoutAttachmentsInput>, TicketUncheckedUpdateWithoutAttachmentsInput>
  }

  export type TicketCommentUpdateOneWithoutAttachmentsNestedInput = {
    create?: XOR<TicketCommentCreateWithoutAttachmentsInput, TicketCommentUncheckedCreateWithoutAttachmentsInput>
    connectOrCreate?: TicketCommentCreateOrConnectWithoutAttachmentsInput
    upsert?: TicketCommentUpsertWithoutAttachmentsInput
    disconnect?: TicketCommentWhereInput | boolean
    delete?: TicketCommentWhereInput | boolean
    connect?: TicketCommentWhereUniqueInput
    update?: XOR<XOR<TicketCommentUpdateToOneWithWhereWithoutAttachmentsInput, TicketCommentUpdateWithoutAttachmentsInput>, TicketCommentUncheckedUpdateWithoutAttachmentsInput>
  }

  export type TenantCreateNestedOneWithoutSlasInput = {
    create?: XOR<TenantCreateWithoutSlasInput, TenantUncheckedCreateWithoutSlasInput>
    connectOrCreate?: TenantCreateOrConnectWithoutSlasInput
    connect?: TenantWhereUniqueInput
  }

  export type PriorityCreateNestedOneWithoutSlasInput = {
    create?: XOR<PriorityCreateWithoutSlasInput, PriorityUncheckedCreateWithoutSlasInput>
    connectOrCreate?: PriorityCreateOrConnectWithoutSlasInput
    connect?: PriorityWhereUniqueInput
  }

  export type TenantUpdateOneRequiredWithoutSlasNestedInput = {
    create?: XOR<TenantCreateWithoutSlasInput, TenantUncheckedCreateWithoutSlasInput>
    connectOrCreate?: TenantCreateOrConnectWithoutSlasInput
    upsert?: TenantUpsertWithoutSlasInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutSlasInput, TenantUpdateWithoutSlasInput>, TenantUncheckedUpdateWithoutSlasInput>
  }

  export type PriorityUpdateOneWithoutSlasNestedInput = {
    create?: XOR<PriorityCreateWithoutSlasInput, PriorityUncheckedCreateWithoutSlasInput>
    connectOrCreate?: PriorityCreateOrConnectWithoutSlasInput
    upsert?: PriorityUpsertWithoutSlasInput
    disconnect?: PriorityWhereInput | boolean
    delete?: PriorityWhereInput | boolean
    connect?: PriorityWhereUniqueInput
    update?: XOR<XOR<PriorityUpdateToOneWithWhereWithoutSlasInput, PriorityUpdateWithoutSlasInput>, PriorityUncheckedUpdateWithoutSlasInput>
  }

  export type TenantCreateNestedOneWithoutWorkflowsInput = {
    create?: XOR<TenantCreateWithoutWorkflowsInput, TenantUncheckedCreateWithoutWorkflowsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutWorkflowsInput
    connect?: TenantWhereUniqueInput
  }

  export type TenantUpdateOneRequiredWithoutWorkflowsNestedInput = {
    create?: XOR<TenantCreateWithoutWorkflowsInput, TenantUncheckedCreateWithoutWorkflowsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutWorkflowsInput
    upsert?: TenantUpsertWithoutWorkflowsInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutWorkflowsInput, TenantUpdateWithoutWorkflowsInput>, TenantUncheckedUpdateWithoutWorkflowsInput>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type TenantCreateWithoutPrioritiesInput = {
    id?: string
    name: string
    avatar?: string | null
    createdAt?: Date | string
    users?: UserCreateNestedManyWithoutTenantInput
    departments?: DepartmentCreateNestedManyWithoutTenantInput
    tickets?: TicketCreateNestedManyWithoutTenantInput
    columns?: ColumnCreateNestedManyWithoutTenantInput
    slas?: SLACreateNestedManyWithoutTenantInput
    workflows?: WorkflowCreateNestedManyWithoutTenantInput
    statuses?: StatusCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutPrioritiesInput = {
    id?: string
    name: string
    avatar?: string | null
    createdAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutTenantInput
    departments?: DepartmentUncheckedCreateNestedManyWithoutTenantInput
    tickets?: TicketUncheckedCreateNestedManyWithoutTenantInput
    columns?: ColumnUncheckedCreateNestedManyWithoutTenantInput
    slas?: SLAUncheckedCreateNestedManyWithoutTenantInput
    workflows?: WorkflowUncheckedCreateNestedManyWithoutTenantInput
    statuses?: StatusUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutPrioritiesInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutPrioritiesInput, TenantUncheckedCreateWithoutPrioritiesInput>
  }

  export type TicketCreateWithoutPriorityInput = {
    id?: string
    title: string
    description?: string | null
    status?: string
    afterId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    closedAt?: Date | string | null
    deletedAt?: Date | string | null
    tenant: TenantCreateNestedOneWithoutTicketsInput
    column?: ColumnCreateNestedOneWithoutTicketsInput
    creator: UserCreateNestedOneWithoutTicketsCreatedInput
    assignee?: UserCreateNestedOneWithoutTicketsAssignedInput
    department?: DepartmentCreateNestedOneWithoutTicketsInput
    comments?: TicketCommentCreateNestedManyWithoutTicketInput
    attachments?: AttachmentCreateNestedManyWithoutTicketInput
  }

  export type TicketUncheckedCreateWithoutPriorityInput = {
    id?: string
    tenantId: string
    title: string
    description?: string | null
    status?: string
    afterId?: string | null
    columnId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    closedAt?: Date | string | null
    deletedAt?: Date | string | null
    creatorId: string
    assigneeId?: string | null
    departmentId?: string | null
    comments?: TicketCommentUncheckedCreateNestedManyWithoutTicketInput
    attachments?: AttachmentUncheckedCreateNestedManyWithoutTicketInput
  }

  export type TicketCreateOrConnectWithoutPriorityInput = {
    where: TicketWhereUniqueInput
    create: XOR<TicketCreateWithoutPriorityInput, TicketUncheckedCreateWithoutPriorityInput>
  }

  export type TicketCreateManyPriorityInputEnvelope = {
    data: TicketCreateManyPriorityInput | TicketCreateManyPriorityInput[]
    skipDuplicates?: boolean
  }

  export type SLACreateWithoutPriorityInput = {
    id?: string
    name: string
    description?: string | null
    responseTime?: number
    resolutionTime?: number
    departmentId?: string | null
    isActive?: boolean
    escalationRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutSlasInput
  }

  export type SLAUncheckedCreateWithoutPriorityInput = {
    id?: string
    tenantId: string
    name: string
    description?: string | null
    responseTime?: number
    resolutionTime?: number
    departmentId?: string | null
    isActive?: boolean
    escalationRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SLACreateOrConnectWithoutPriorityInput = {
    where: SLAWhereUniqueInput
    create: XOR<SLACreateWithoutPriorityInput, SLAUncheckedCreateWithoutPriorityInput>
  }

  export type SLACreateManyPriorityInputEnvelope = {
    data: SLACreateManyPriorityInput | SLACreateManyPriorityInput[]
    skipDuplicates?: boolean
  }

  export type TenantUpsertWithoutPrioritiesInput = {
    update: XOR<TenantUpdateWithoutPrioritiesInput, TenantUncheckedUpdateWithoutPrioritiesInput>
    create: XOR<TenantCreateWithoutPrioritiesInput, TenantUncheckedCreateWithoutPrioritiesInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutPrioritiesInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutPrioritiesInput, TenantUncheckedUpdateWithoutPrioritiesInput>
  }

  export type TenantUpdateWithoutPrioritiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutTenantNestedInput
    departments?: DepartmentUpdateManyWithoutTenantNestedInput
    tickets?: TicketUpdateManyWithoutTenantNestedInput
    columns?: ColumnUpdateManyWithoutTenantNestedInput
    slas?: SLAUpdateManyWithoutTenantNestedInput
    workflows?: WorkflowUpdateManyWithoutTenantNestedInput
    statuses?: StatusUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutPrioritiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutTenantNestedInput
    departments?: DepartmentUncheckedUpdateManyWithoutTenantNestedInput
    tickets?: TicketUncheckedUpdateManyWithoutTenantNestedInput
    columns?: ColumnUncheckedUpdateManyWithoutTenantNestedInput
    slas?: SLAUncheckedUpdateManyWithoutTenantNestedInput
    workflows?: WorkflowUncheckedUpdateManyWithoutTenantNestedInput
    statuses?: StatusUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type TicketUpsertWithWhereUniqueWithoutPriorityInput = {
    where: TicketWhereUniqueInput
    update: XOR<TicketUpdateWithoutPriorityInput, TicketUncheckedUpdateWithoutPriorityInput>
    create: XOR<TicketCreateWithoutPriorityInput, TicketUncheckedCreateWithoutPriorityInput>
  }

  export type TicketUpdateWithWhereUniqueWithoutPriorityInput = {
    where: TicketWhereUniqueInput
    data: XOR<TicketUpdateWithoutPriorityInput, TicketUncheckedUpdateWithoutPriorityInput>
  }

  export type TicketUpdateManyWithWhereWithoutPriorityInput = {
    where: TicketScalarWhereInput
    data: XOR<TicketUpdateManyMutationInput, TicketUncheckedUpdateManyWithoutPriorityInput>
  }

  export type TicketScalarWhereInput = {
    AND?: TicketScalarWhereInput | TicketScalarWhereInput[]
    OR?: TicketScalarWhereInput[]
    NOT?: TicketScalarWhereInput | TicketScalarWhereInput[]
    id?: StringFilter<"Ticket"> | string
    tenantId?: StringFilter<"Ticket"> | string
    title?: StringFilter<"Ticket"> | string
    description?: StringNullableFilter<"Ticket"> | string | null
    status?: StringFilter<"Ticket"> | string
    priorityId?: StringNullableFilter<"Ticket"> | string | null
    afterId?: StringNullableFilter<"Ticket"> | string | null
    columnId?: StringNullableFilter<"Ticket"> | string | null
    createdAt?: DateTimeFilter<"Ticket"> | Date | string
    updatedAt?: DateTimeFilter<"Ticket"> | Date | string
    closedAt?: DateTimeNullableFilter<"Ticket"> | Date | string | null
    deletedAt?: DateTimeNullableFilter<"Ticket"> | Date | string | null
    creatorId?: StringFilter<"Ticket"> | string
    assigneeId?: StringNullableFilter<"Ticket"> | string | null
    departmentId?: StringNullableFilter<"Ticket"> | string | null
  }

  export type SLAUpsertWithWhereUniqueWithoutPriorityInput = {
    where: SLAWhereUniqueInput
    update: XOR<SLAUpdateWithoutPriorityInput, SLAUncheckedUpdateWithoutPriorityInput>
    create: XOR<SLACreateWithoutPriorityInput, SLAUncheckedCreateWithoutPriorityInput>
  }

  export type SLAUpdateWithWhereUniqueWithoutPriorityInput = {
    where: SLAWhereUniqueInput
    data: XOR<SLAUpdateWithoutPriorityInput, SLAUncheckedUpdateWithoutPriorityInput>
  }

  export type SLAUpdateManyWithWhereWithoutPriorityInput = {
    where: SLAScalarWhereInput
    data: XOR<SLAUpdateManyMutationInput, SLAUncheckedUpdateManyWithoutPriorityInput>
  }

  export type SLAScalarWhereInput = {
    AND?: SLAScalarWhereInput | SLAScalarWhereInput[]
    OR?: SLAScalarWhereInput[]
    NOT?: SLAScalarWhereInput | SLAScalarWhereInput[]
    id?: StringFilter<"SLA"> | string
    tenantId?: StringFilter<"SLA"> | string
    name?: StringFilter<"SLA"> | string
    description?: StringNullableFilter<"SLA"> | string | null
    responseTime?: IntFilter<"SLA"> | number
    resolutionTime?: IntFilter<"SLA"> | number
    priorityId?: StringNullableFilter<"SLA"> | string | null
    departmentId?: StringNullableFilter<"SLA"> | string | null
    isActive?: BoolFilter<"SLA"> | boolean
    escalationRules?: JsonNullableFilter<"SLA">
    createdAt?: DateTimeFilter<"SLA"> | Date | string
    updatedAt?: DateTimeFilter<"SLA"> | Date | string
  }

  export type TenantCreateWithoutStatusesInput = {
    id?: string
    name: string
    avatar?: string | null
    createdAt?: Date | string
    users?: UserCreateNestedManyWithoutTenantInput
    departments?: DepartmentCreateNestedManyWithoutTenantInput
    tickets?: TicketCreateNestedManyWithoutTenantInput
    columns?: ColumnCreateNestedManyWithoutTenantInput
    slas?: SLACreateNestedManyWithoutTenantInput
    workflows?: WorkflowCreateNestedManyWithoutTenantInput
    priorities?: PriorityCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutStatusesInput = {
    id?: string
    name: string
    avatar?: string | null
    createdAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutTenantInput
    departments?: DepartmentUncheckedCreateNestedManyWithoutTenantInput
    tickets?: TicketUncheckedCreateNestedManyWithoutTenantInput
    columns?: ColumnUncheckedCreateNestedManyWithoutTenantInput
    slas?: SLAUncheckedCreateNestedManyWithoutTenantInput
    workflows?: WorkflowUncheckedCreateNestedManyWithoutTenantInput
    priorities?: PriorityUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutStatusesInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutStatusesInput, TenantUncheckedCreateWithoutStatusesInput>
  }

  export type ColumnCreateWithoutStatusInput = {
    id?: string
    name: string
    description?: string | null
    order?: number
    color?: string | null
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutColumnsInput
    tickets?: TicketCreateNestedManyWithoutColumnInput
  }

  export type ColumnUncheckedCreateWithoutStatusInput = {
    id?: string
    tenantId: string
    name: string
    description?: string | null
    order?: number
    color?: string | null
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tickets?: TicketUncheckedCreateNestedManyWithoutColumnInput
  }

  export type ColumnCreateOrConnectWithoutStatusInput = {
    where: ColumnWhereUniqueInput
    create: XOR<ColumnCreateWithoutStatusInput, ColumnUncheckedCreateWithoutStatusInput>
  }

  export type ColumnCreateManyStatusInputEnvelope = {
    data: ColumnCreateManyStatusInput | ColumnCreateManyStatusInput[]
    skipDuplicates?: boolean
  }

  export type TenantUpsertWithoutStatusesInput = {
    update: XOR<TenantUpdateWithoutStatusesInput, TenantUncheckedUpdateWithoutStatusesInput>
    create: XOR<TenantCreateWithoutStatusesInput, TenantUncheckedCreateWithoutStatusesInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutStatusesInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutStatusesInput, TenantUncheckedUpdateWithoutStatusesInput>
  }

  export type TenantUpdateWithoutStatusesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutTenantNestedInput
    departments?: DepartmentUpdateManyWithoutTenantNestedInput
    tickets?: TicketUpdateManyWithoutTenantNestedInput
    columns?: ColumnUpdateManyWithoutTenantNestedInput
    slas?: SLAUpdateManyWithoutTenantNestedInput
    workflows?: WorkflowUpdateManyWithoutTenantNestedInput
    priorities?: PriorityUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutStatusesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutTenantNestedInput
    departments?: DepartmentUncheckedUpdateManyWithoutTenantNestedInput
    tickets?: TicketUncheckedUpdateManyWithoutTenantNestedInput
    columns?: ColumnUncheckedUpdateManyWithoutTenantNestedInput
    slas?: SLAUncheckedUpdateManyWithoutTenantNestedInput
    workflows?: WorkflowUncheckedUpdateManyWithoutTenantNestedInput
    priorities?: PriorityUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type ColumnUpsertWithWhereUniqueWithoutStatusInput = {
    where: ColumnWhereUniqueInput
    update: XOR<ColumnUpdateWithoutStatusInput, ColumnUncheckedUpdateWithoutStatusInput>
    create: XOR<ColumnCreateWithoutStatusInput, ColumnUncheckedCreateWithoutStatusInput>
  }

  export type ColumnUpdateWithWhereUniqueWithoutStatusInput = {
    where: ColumnWhereUniqueInput
    data: XOR<ColumnUpdateWithoutStatusInput, ColumnUncheckedUpdateWithoutStatusInput>
  }

  export type ColumnUpdateManyWithWhereWithoutStatusInput = {
    where: ColumnScalarWhereInput
    data: XOR<ColumnUpdateManyMutationInput, ColumnUncheckedUpdateManyWithoutStatusInput>
  }

  export type ColumnScalarWhereInput = {
    AND?: ColumnScalarWhereInput | ColumnScalarWhereInput[]
    OR?: ColumnScalarWhereInput[]
    NOT?: ColumnScalarWhereInput | ColumnScalarWhereInput[]
    id?: StringFilter<"Column"> | string
    tenantId?: StringFilter<"Column"> | string
    name?: StringFilter<"Column"> | string
    description?: StringNullableFilter<"Column"> | string | null
    order?: IntFilter<"Column"> | number
    color?: StringNullableFilter<"Column"> | string | null
    isDefault?: BoolFilter<"Column"> | boolean
    statusId?: StringNullableFilter<"Column"> | string | null
    createdAt?: DateTimeFilter<"Column"> | Date | string
    updatedAt?: DateTimeFilter<"Column"> | Date | string
  }

  export type UserCreateWithoutTenantInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    avatar?: string | null
    createdAt?: Date | string
    deletedAt?: Date | string | null
    refreshToken?: string | null
    resetPasswordToken?: string | null
    resetPasswordTokenExpiry?: Date | string | null
    ticketsCreated?: TicketCreateNestedManyWithoutCreatorInput
    ticketsAssigned?: TicketCreateNestedManyWithoutAssigneeInput
    comments?: TicketCommentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTenantInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    avatar?: string | null
    createdAt?: Date | string
    deletedAt?: Date | string | null
    refreshToken?: string | null
    resetPasswordToken?: string | null
    resetPasswordTokenExpiry?: Date | string | null
    ticketsCreated?: TicketUncheckedCreateNestedManyWithoutCreatorInput
    ticketsAssigned?: TicketUncheckedCreateNestedManyWithoutAssigneeInput
    comments?: TicketCommentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTenantInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTenantInput, UserUncheckedCreateWithoutTenantInput>
  }

  export type UserCreateManyTenantInputEnvelope = {
    data: UserCreateManyTenantInput | UserCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type DepartmentCreateWithoutTenantInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tickets?: TicketCreateNestedManyWithoutDepartmentInput
  }

  export type DepartmentUncheckedCreateWithoutTenantInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tickets?: TicketUncheckedCreateNestedManyWithoutDepartmentInput
  }

  export type DepartmentCreateOrConnectWithoutTenantInput = {
    where: DepartmentWhereUniqueInput
    create: XOR<DepartmentCreateWithoutTenantInput, DepartmentUncheckedCreateWithoutTenantInput>
  }

  export type DepartmentCreateManyTenantInputEnvelope = {
    data: DepartmentCreateManyTenantInput | DepartmentCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type TicketCreateWithoutTenantInput = {
    id?: string
    title: string
    description?: string | null
    status?: string
    afterId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    closedAt?: Date | string | null
    deletedAt?: Date | string | null
    priority?: PriorityCreateNestedOneWithoutTicketsInput
    column?: ColumnCreateNestedOneWithoutTicketsInput
    creator: UserCreateNestedOneWithoutTicketsCreatedInput
    assignee?: UserCreateNestedOneWithoutTicketsAssignedInput
    department?: DepartmentCreateNestedOneWithoutTicketsInput
    comments?: TicketCommentCreateNestedManyWithoutTicketInput
    attachments?: AttachmentCreateNestedManyWithoutTicketInput
  }

  export type TicketUncheckedCreateWithoutTenantInput = {
    id?: string
    title: string
    description?: string | null
    status?: string
    priorityId?: string | null
    afterId?: string | null
    columnId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    closedAt?: Date | string | null
    deletedAt?: Date | string | null
    creatorId: string
    assigneeId?: string | null
    departmentId?: string | null
    comments?: TicketCommentUncheckedCreateNestedManyWithoutTicketInput
    attachments?: AttachmentUncheckedCreateNestedManyWithoutTicketInput
  }

  export type TicketCreateOrConnectWithoutTenantInput = {
    where: TicketWhereUniqueInput
    create: XOR<TicketCreateWithoutTenantInput, TicketUncheckedCreateWithoutTenantInput>
  }

  export type TicketCreateManyTenantInputEnvelope = {
    data: TicketCreateManyTenantInput | TicketCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type ColumnCreateWithoutTenantInput = {
    id?: string
    name: string
    description?: string | null
    order?: number
    color?: string | null
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    status?: StatusCreateNestedOneWithoutColumnsInput
    tickets?: TicketCreateNestedManyWithoutColumnInput
  }

  export type ColumnUncheckedCreateWithoutTenantInput = {
    id?: string
    name: string
    description?: string | null
    order?: number
    color?: string | null
    isDefault?: boolean
    statusId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tickets?: TicketUncheckedCreateNestedManyWithoutColumnInput
  }

  export type ColumnCreateOrConnectWithoutTenantInput = {
    where: ColumnWhereUniqueInput
    create: XOR<ColumnCreateWithoutTenantInput, ColumnUncheckedCreateWithoutTenantInput>
  }

  export type ColumnCreateManyTenantInputEnvelope = {
    data: ColumnCreateManyTenantInput | ColumnCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type SLACreateWithoutTenantInput = {
    id?: string
    name: string
    description?: string | null
    responseTime?: number
    resolutionTime?: number
    departmentId?: string | null
    isActive?: boolean
    escalationRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    priority?: PriorityCreateNestedOneWithoutSlasInput
  }

  export type SLAUncheckedCreateWithoutTenantInput = {
    id?: string
    name: string
    description?: string | null
    responseTime?: number
    resolutionTime?: number
    priorityId?: string | null
    departmentId?: string | null
    isActive?: boolean
    escalationRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SLACreateOrConnectWithoutTenantInput = {
    where: SLAWhereUniqueInput
    create: XOR<SLACreateWithoutTenantInput, SLAUncheckedCreateWithoutTenantInput>
  }

  export type SLACreateManyTenantInputEnvelope = {
    data: SLACreateManyTenantInput | SLACreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type WorkflowCreateWithoutTenantInput = {
    id?: string
    name: string
    description?: string | null
    rules: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkflowUncheckedCreateWithoutTenantInput = {
    id?: string
    name: string
    description?: string | null
    rules: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkflowCreateOrConnectWithoutTenantInput = {
    where: WorkflowWhereUniqueInput
    create: XOR<WorkflowCreateWithoutTenantInput, WorkflowUncheckedCreateWithoutTenantInput>
  }

  export type WorkflowCreateManyTenantInputEnvelope = {
    data: WorkflowCreateManyTenantInput | WorkflowCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type PriorityCreateWithoutTenantInput = {
    id?: string
    name: string
    color: string
    order?: number
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tickets?: TicketCreateNestedManyWithoutPriorityInput
    slas?: SLACreateNestedManyWithoutPriorityInput
  }

  export type PriorityUncheckedCreateWithoutTenantInput = {
    id?: string
    name: string
    color: string
    order?: number
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tickets?: TicketUncheckedCreateNestedManyWithoutPriorityInput
    slas?: SLAUncheckedCreateNestedManyWithoutPriorityInput
  }

  export type PriorityCreateOrConnectWithoutTenantInput = {
    where: PriorityWhereUniqueInput
    create: XOR<PriorityCreateWithoutTenantInput, PriorityUncheckedCreateWithoutTenantInput>
  }

  export type PriorityCreateManyTenantInputEnvelope = {
    data: PriorityCreateManyTenantInput | PriorityCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type StatusCreateWithoutTenantInput = {
    id?: string
    name: string
    color: string
    order?: number
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    columns?: ColumnCreateNestedManyWithoutStatusInput
  }

  export type StatusUncheckedCreateWithoutTenantInput = {
    id?: string
    name: string
    color: string
    order?: number
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    columns?: ColumnUncheckedCreateNestedManyWithoutStatusInput
  }

  export type StatusCreateOrConnectWithoutTenantInput = {
    where: StatusWhereUniqueInput
    create: XOR<StatusCreateWithoutTenantInput, StatusUncheckedCreateWithoutTenantInput>
  }

  export type StatusCreateManyTenantInputEnvelope = {
    data: StatusCreateManyTenantInput | StatusCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutTenantInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutTenantInput, UserUncheckedUpdateWithoutTenantInput>
    create: XOR<UserCreateWithoutTenantInput, UserUncheckedCreateWithoutTenantInput>
  }

  export type UserUpdateWithWhereUniqueWithoutTenantInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutTenantInput, UserUncheckedUpdateWithoutTenantInput>
  }

  export type UserUpdateManyWithWhereWithoutTenantInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutTenantInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    tenantId?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    isActive?: BoolFilter<"User"> | boolean
    avatar?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    refreshToken?: StringNullableFilter<"User"> | string | null
    resetPasswordToken?: StringNullableFilter<"User"> | string | null
    resetPasswordTokenExpiry?: DateTimeNullableFilter<"User"> | Date | string | null
  }

  export type DepartmentUpsertWithWhereUniqueWithoutTenantInput = {
    where: DepartmentWhereUniqueInput
    update: XOR<DepartmentUpdateWithoutTenantInput, DepartmentUncheckedUpdateWithoutTenantInput>
    create: XOR<DepartmentCreateWithoutTenantInput, DepartmentUncheckedCreateWithoutTenantInput>
  }

  export type DepartmentUpdateWithWhereUniqueWithoutTenantInput = {
    where: DepartmentWhereUniqueInput
    data: XOR<DepartmentUpdateWithoutTenantInput, DepartmentUncheckedUpdateWithoutTenantInput>
  }

  export type DepartmentUpdateManyWithWhereWithoutTenantInput = {
    where: DepartmentScalarWhereInput
    data: XOR<DepartmentUpdateManyMutationInput, DepartmentUncheckedUpdateManyWithoutTenantInput>
  }

  export type DepartmentScalarWhereInput = {
    AND?: DepartmentScalarWhereInput | DepartmentScalarWhereInput[]
    OR?: DepartmentScalarWhereInput[]
    NOT?: DepartmentScalarWhereInput | DepartmentScalarWhereInput[]
    id?: StringFilter<"Department"> | string
    tenantId?: StringFilter<"Department"> | string
    name?: StringFilter<"Department"> | string
    description?: StringNullableFilter<"Department"> | string | null
    createdAt?: DateTimeFilter<"Department"> | Date | string
    updatedAt?: DateTimeFilter<"Department"> | Date | string
  }

  export type TicketUpsertWithWhereUniqueWithoutTenantInput = {
    where: TicketWhereUniqueInput
    update: XOR<TicketUpdateWithoutTenantInput, TicketUncheckedUpdateWithoutTenantInput>
    create: XOR<TicketCreateWithoutTenantInput, TicketUncheckedCreateWithoutTenantInput>
  }

  export type TicketUpdateWithWhereUniqueWithoutTenantInput = {
    where: TicketWhereUniqueInput
    data: XOR<TicketUpdateWithoutTenantInput, TicketUncheckedUpdateWithoutTenantInput>
  }

  export type TicketUpdateManyWithWhereWithoutTenantInput = {
    where: TicketScalarWhereInput
    data: XOR<TicketUpdateManyMutationInput, TicketUncheckedUpdateManyWithoutTenantInput>
  }

  export type ColumnUpsertWithWhereUniqueWithoutTenantInput = {
    where: ColumnWhereUniqueInput
    update: XOR<ColumnUpdateWithoutTenantInput, ColumnUncheckedUpdateWithoutTenantInput>
    create: XOR<ColumnCreateWithoutTenantInput, ColumnUncheckedCreateWithoutTenantInput>
  }

  export type ColumnUpdateWithWhereUniqueWithoutTenantInput = {
    where: ColumnWhereUniqueInput
    data: XOR<ColumnUpdateWithoutTenantInput, ColumnUncheckedUpdateWithoutTenantInput>
  }

  export type ColumnUpdateManyWithWhereWithoutTenantInput = {
    where: ColumnScalarWhereInput
    data: XOR<ColumnUpdateManyMutationInput, ColumnUncheckedUpdateManyWithoutTenantInput>
  }

  export type SLAUpsertWithWhereUniqueWithoutTenantInput = {
    where: SLAWhereUniqueInput
    update: XOR<SLAUpdateWithoutTenantInput, SLAUncheckedUpdateWithoutTenantInput>
    create: XOR<SLACreateWithoutTenantInput, SLAUncheckedCreateWithoutTenantInput>
  }

  export type SLAUpdateWithWhereUniqueWithoutTenantInput = {
    where: SLAWhereUniqueInput
    data: XOR<SLAUpdateWithoutTenantInput, SLAUncheckedUpdateWithoutTenantInput>
  }

  export type SLAUpdateManyWithWhereWithoutTenantInput = {
    where: SLAScalarWhereInput
    data: XOR<SLAUpdateManyMutationInput, SLAUncheckedUpdateManyWithoutTenantInput>
  }

  export type WorkflowUpsertWithWhereUniqueWithoutTenantInput = {
    where: WorkflowWhereUniqueInput
    update: XOR<WorkflowUpdateWithoutTenantInput, WorkflowUncheckedUpdateWithoutTenantInput>
    create: XOR<WorkflowCreateWithoutTenantInput, WorkflowUncheckedCreateWithoutTenantInput>
  }

  export type WorkflowUpdateWithWhereUniqueWithoutTenantInput = {
    where: WorkflowWhereUniqueInput
    data: XOR<WorkflowUpdateWithoutTenantInput, WorkflowUncheckedUpdateWithoutTenantInput>
  }

  export type WorkflowUpdateManyWithWhereWithoutTenantInput = {
    where: WorkflowScalarWhereInput
    data: XOR<WorkflowUpdateManyMutationInput, WorkflowUncheckedUpdateManyWithoutTenantInput>
  }

  export type WorkflowScalarWhereInput = {
    AND?: WorkflowScalarWhereInput | WorkflowScalarWhereInput[]
    OR?: WorkflowScalarWhereInput[]
    NOT?: WorkflowScalarWhereInput | WorkflowScalarWhereInput[]
    id?: StringFilter<"Workflow"> | string
    tenantId?: StringFilter<"Workflow"> | string
    name?: StringFilter<"Workflow"> | string
    description?: StringNullableFilter<"Workflow"> | string | null
    rules?: JsonFilter<"Workflow">
    isActive?: BoolFilter<"Workflow"> | boolean
    createdAt?: DateTimeFilter<"Workflow"> | Date | string
    updatedAt?: DateTimeFilter<"Workflow"> | Date | string
  }

  export type PriorityUpsertWithWhereUniqueWithoutTenantInput = {
    where: PriorityWhereUniqueInput
    update: XOR<PriorityUpdateWithoutTenantInput, PriorityUncheckedUpdateWithoutTenantInput>
    create: XOR<PriorityCreateWithoutTenantInput, PriorityUncheckedCreateWithoutTenantInput>
  }

  export type PriorityUpdateWithWhereUniqueWithoutTenantInput = {
    where: PriorityWhereUniqueInput
    data: XOR<PriorityUpdateWithoutTenantInput, PriorityUncheckedUpdateWithoutTenantInput>
  }

  export type PriorityUpdateManyWithWhereWithoutTenantInput = {
    where: PriorityScalarWhereInput
    data: XOR<PriorityUpdateManyMutationInput, PriorityUncheckedUpdateManyWithoutTenantInput>
  }

  export type PriorityScalarWhereInput = {
    AND?: PriorityScalarWhereInput | PriorityScalarWhereInput[]
    OR?: PriorityScalarWhereInput[]
    NOT?: PriorityScalarWhereInput | PriorityScalarWhereInput[]
    id?: StringFilter<"Priority"> | string
    name?: StringFilter<"Priority"> | string
    color?: StringFilter<"Priority"> | string
    order?: IntFilter<"Priority"> | number
    isDefault?: BoolFilter<"Priority"> | boolean
    tenantId?: StringFilter<"Priority"> | string
    createdAt?: DateTimeFilter<"Priority"> | Date | string
    updatedAt?: DateTimeFilter<"Priority"> | Date | string
  }

  export type StatusUpsertWithWhereUniqueWithoutTenantInput = {
    where: StatusWhereUniqueInput
    update: XOR<StatusUpdateWithoutTenantInput, StatusUncheckedUpdateWithoutTenantInput>
    create: XOR<StatusCreateWithoutTenantInput, StatusUncheckedCreateWithoutTenantInput>
  }

  export type StatusUpdateWithWhereUniqueWithoutTenantInput = {
    where: StatusWhereUniqueInput
    data: XOR<StatusUpdateWithoutTenantInput, StatusUncheckedUpdateWithoutTenantInput>
  }

  export type StatusUpdateManyWithWhereWithoutTenantInput = {
    where: StatusScalarWhereInput
    data: XOR<StatusUpdateManyMutationInput, StatusUncheckedUpdateManyWithoutTenantInput>
  }

  export type StatusScalarWhereInput = {
    AND?: StatusScalarWhereInput | StatusScalarWhereInput[]
    OR?: StatusScalarWhereInput[]
    NOT?: StatusScalarWhereInput | StatusScalarWhereInput[]
    id?: StringFilter<"Status"> | string
    name?: StringFilter<"Status"> | string
    color?: StringFilter<"Status"> | string
    order?: IntFilter<"Status"> | number
    isDefault?: BoolFilter<"Status"> | boolean
    tenantId?: StringFilter<"Status"> | string
    createdAt?: DateTimeFilter<"Status"> | Date | string
    updatedAt?: DateTimeFilter<"Status"> | Date | string
  }

  export type TenantCreateWithoutUsersInput = {
    id?: string
    name: string
    avatar?: string | null
    createdAt?: Date | string
    departments?: DepartmentCreateNestedManyWithoutTenantInput
    tickets?: TicketCreateNestedManyWithoutTenantInput
    columns?: ColumnCreateNestedManyWithoutTenantInput
    slas?: SLACreateNestedManyWithoutTenantInput
    workflows?: WorkflowCreateNestedManyWithoutTenantInput
    priorities?: PriorityCreateNestedManyWithoutTenantInput
    statuses?: StatusCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    avatar?: string | null
    createdAt?: Date | string
    departments?: DepartmentUncheckedCreateNestedManyWithoutTenantInput
    tickets?: TicketUncheckedCreateNestedManyWithoutTenantInput
    columns?: ColumnUncheckedCreateNestedManyWithoutTenantInput
    slas?: SLAUncheckedCreateNestedManyWithoutTenantInput
    workflows?: WorkflowUncheckedCreateNestedManyWithoutTenantInput
    priorities?: PriorityUncheckedCreateNestedManyWithoutTenantInput
    statuses?: StatusUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutUsersInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutUsersInput, TenantUncheckedCreateWithoutUsersInput>
  }

  export type TicketCreateWithoutCreatorInput = {
    id?: string
    title: string
    description?: string | null
    status?: string
    afterId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    closedAt?: Date | string | null
    deletedAt?: Date | string | null
    tenant: TenantCreateNestedOneWithoutTicketsInput
    priority?: PriorityCreateNestedOneWithoutTicketsInput
    column?: ColumnCreateNestedOneWithoutTicketsInput
    assignee?: UserCreateNestedOneWithoutTicketsAssignedInput
    department?: DepartmentCreateNestedOneWithoutTicketsInput
    comments?: TicketCommentCreateNestedManyWithoutTicketInput
    attachments?: AttachmentCreateNestedManyWithoutTicketInput
  }

  export type TicketUncheckedCreateWithoutCreatorInput = {
    id?: string
    tenantId: string
    title: string
    description?: string | null
    status?: string
    priorityId?: string | null
    afterId?: string | null
    columnId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    closedAt?: Date | string | null
    deletedAt?: Date | string | null
    assigneeId?: string | null
    departmentId?: string | null
    comments?: TicketCommentUncheckedCreateNestedManyWithoutTicketInput
    attachments?: AttachmentUncheckedCreateNestedManyWithoutTicketInput
  }

  export type TicketCreateOrConnectWithoutCreatorInput = {
    where: TicketWhereUniqueInput
    create: XOR<TicketCreateWithoutCreatorInput, TicketUncheckedCreateWithoutCreatorInput>
  }

  export type TicketCreateManyCreatorInputEnvelope = {
    data: TicketCreateManyCreatorInput | TicketCreateManyCreatorInput[]
    skipDuplicates?: boolean
  }

  export type TicketCreateWithoutAssigneeInput = {
    id?: string
    title: string
    description?: string | null
    status?: string
    afterId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    closedAt?: Date | string | null
    deletedAt?: Date | string | null
    tenant: TenantCreateNestedOneWithoutTicketsInput
    priority?: PriorityCreateNestedOneWithoutTicketsInput
    column?: ColumnCreateNestedOneWithoutTicketsInput
    creator: UserCreateNestedOneWithoutTicketsCreatedInput
    department?: DepartmentCreateNestedOneWithoutTicketsInput
    comments?: TicketCommentCreateNestedManyWithoutTicketInput
    attachments?: AttachmentCreateNestedManyWithoutTicketInput
  }

  export type TicketUncheckedCreateWithoutAssigneeInput = {
    id?: string
    tenantId: string
    title: string
    description?: string | null
    status?: string
    priorityId?: string | null
    afterId?: string | null
    columnId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    closedAt?: Date | string | null
    deletedAt?: Date | string | null
    creatorId: string
    departmentId?: string | null
    comments?: TicketCommentUncheckedCreateNestedManyWithoutTicketInput
    attachments?: AttachmentUncheckedCreateNestedManyWithoutTicketInput
  }

  export type TicketCreateOrConnectWithoutAssigneeInput = {
    where: TicketWhereUniqueInput
    create: XOR<TicketCreateWithoutAssigneeInput, TicketUncheckedCreateWithoutAssigneeInput>
  }

  export type TicketCreateManyAssigneeInputEnvelope = {
    data: TicketCreateManyAssigneeInput | TicketCreateManyAssigneeInput[]
    skipDuplicates?: boolean
  }

  export type TicketCommentCreateWithoutUserInput = {
    id?: string
    comment: string
    createdAt?: Date | string
    ticket: TicketCreateNestedOneWithoutCommentsInput
    attachments?: AttachmentCreateNestedManyWithoutCommentInput
  }

  export type TicketCommentUncheckedCreateWithoutUserInput = {
    id?: string
    ticketId: string
    comment: string
    createdAt?: Date | string
    attachments?: AttachmentUncheckedCreateNestedManyWithoutCommentInput
  }

  export type TicketCommentCreateOrConnectWithoutUserInput = {
    where: TicketCommentWhereUniqueInput
    create: XOR<TicketCommentCreateWithoutUserInput, TicketCommentUncheckedCreateWithoutUserInput>
  }

  export type TicketCommentCreateManyUserInputEnvelope = {
    data: TicketCommentCreateManyUserInput | TicketCommentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TenantUpsertWithoutUsersInput = {
    update: XOR<TenantUpdateWithoutUsersInput, TenantUncheckedUpdateWithoutUsersInput>
    create: XOR<TenantCreateWithoutUsersInput, TenantUncheckedCreateWithoutUsersInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutUsersInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutUsersInput, TenantUncheckedUpdateWithoutUsersInput>
  }

  export type TenantUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    departments?: DepartmentUpdateManyWithoutTenantNestedInput
    tickets?: TicketUpdateManyWithoutTenantNestedInput
    columns?: ColumnUpdateManyWithoutTenantNestedInput
    slas?: SLAUpdateManyWithoutTenantNestedInput
    workflows?: WorkflowUpdateManyWithoutTenantNestedInput
    priorities?: PriorityUpdateManyWithoutTenantNestedInput
    statuses?: StatusUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    departments?: DepartmentUncheckedUpdateManyWithoutTenantNestedInput
    tickets?: TicketUncheckedUpdateManyWithoutTenantNestedInput
    columns?: ColumnUncheckedUpdateManyWithoutTenantNestedInput
    slas?: SLAUncheckedUpdateManyWithoutTenantNestedInput
    workflows?: WorkflowUncheckedUpdateManyWithoutTenantNestedInput
    priorities?: PriorityUncheckedUpdateManyWithoutTenantNestedInput
    statuses?: StatusUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type TicketUpsertWithWhereUniqueWithoutCreatorInput = {
    where: TicketWhereUniqueInput
    update: XOR<TicketUpdateWithoutCreatorInput, TicketUncheckedUpdateWithoutCreatorInput>
    create: XOR<TicketCreateWithoutCreatorInput, TicketUncheckedCreateWithoutCreatorInput>
  }

  export type TicketUpdateWithWhereUniqueWithoutCreatorInput = {
    where: TicketWhereUniqueInput
    data: XOR<TicketUpdateWithoutCreatorInput, TicketUncheckedUpdateWithoutCreatorInput>
  }

  export type TicketUpdateManyWithWhereWithoutCreatorInput = {
    where: TicketScalarWhereInput
    data: XOR<TicketUpdateManyMutationInput, TicketUncheckedUpdateManyWithoutCreatorInput>
  }

  export type TicketUpsertWithWhereUniqueWithoutAssigneeInput = {
    where: TicketWhereUniqueInput
    update: XOR<TicketUpdateWithoutAssigneeInput, TicketUncheckedUpdateWithoutAssigneeInput>
    create: XOR<TicketCreateWithoutAssigneeInput, TicketUncheckedCreateWithoutAssigneeInput>
  }

  export type TicketUpdateWithWhereUniqueWithoutAssigneeInput = {
    where: TicketWhereUniqueInput
    data: XOR<TicketUpdateWithoutAssigneeInput, TicketUncheckedUpdateWithoutAssigneeInput>
  }

  export type TicketUpdateManyWithWhereWithoutAssigneeInput = {
    where: TicketScalarWhereInput
    data: XOR<TicketUpdateManyMutationInput, TicketUncheckedUpdateManyWithoutAssigneeInput>
  }

  export type TicketCommentUpsertWithWhereUniqueWithoutUserInput = {
    where: TicketCommentWhereUniqueInput
    update: XOR<TicketCommentUpdateWithoutUserInput, TicketCommentUncheckedUpdateWithoutUserInput>
    create: XOR<TicketCommentCreateWithoutUserInput, TicketCommentUncheckedCreateWithoutUserInput>
  }

  export type TicketCommentUpdateWithWhereUniqueWithoutUserInput = {
    where: TicketCommentWhereUniqueInput
    data: XOR<TicketCommentUpdateWithoutUserInput, TicketCommentUncheckedUpdateWithoutUserInput>
  }

  export type TicketCommentUpdateManyWithWhereWithoutUserInput = {
    where: TicketCommentScalarWhereInput
    data: XOR<TicketCommentUpdateManyMutationInput, TicketCommentUncheckedUpdateManyWithoutUserInput>
  }

  export type TicketCommentScalarWhereInput = {
    AND?: TicketCommentScalarWhereInput | TicketCommentScalarWhereInput[]
    OR?: TicketCommentScalarWhereInput[]
    NOT?: TicketCommentScalarWhereInput | TicketCommentScalarWhereInput[]
    id?: StringFilter<"TicketComment"> | string
    ticketId?: StringFilter<"TicketComment"> | string
    userId?: StringFilter<"TicketComment"> | string
    comment?: StringFilter<"TicketComment"> | string
    createdAt?: DateTimeFilter<"TicketComment"> | Date | string
  }

  export type TenantCreateWithoutDepartmentsInput = {
    id?: string
    name: string
    avatar?: string | null
    createdAt?: Date | string
    users?: UserCreateNestedManyWithoutTenantInput
    tickets?: TicketCreateNestedManyWithoutTenantInput
    columns?: ColumnCreateNestedManyWithoutTenantInput
    slas?: SLACreateNestedManyWithoutTenantInput
    workflows?: WorkflowCreateNestedManyWithoutTenantInput
    priorities?: PriorityCreateNestedManyWithoutTenantInput
    statuses?: StatusCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutDepartmentsInput = {
    id?: string
    name: string
    avatar?: string | null
    createdAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutTenantInput
    tickets?: TicketUncheckedCreateNestedManyWithoutTenantInput
    columns?: ColumnUncheckedCreateNestedManyWithoutTenantInput
    slas?: SLAUncheckedCreateNestedManyWithoutTenantInput
    workflows?: WorkflowUncheckedCreateNestedManyWithoutTenantInput
    priorities?: PriorityUncheckedCreateNestedManyWithoutTenantInput
    statuses?: StatusUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutDepartmentsInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutDepartmentsInput, TenantUncheckedCreateWithoutDepartmentsInput>
  }

  export type TicketCreateWithoutDepartmentInput = {
    id?: string
    title: string
    description?: string | null
    status?: string
    afterId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    closedAt?: Date | string | null
    deletedAt?: Date | string | null
    tenant: TenantCreateNestedOneWithoutTicketsInput
    priority?: PriorityCreateNestedOneWithoutTicketsInput
    column?: ColumnCreateNestedOneWithoutTicketsInput
    creator: UserCreateNestedOneWithoutTicketsCreatedInput
    assignee?: UserCreateNestedOneWithoutTicketsAssignedInput
    comments?: TicketCommentCreateNestedManyWithoutTicketInput
    attachments?: AttachmentCreateNestedManyWithoutTicketInput
  }

  export type TicketUncheckedCreateWithoutDepartmentInput = {
    id?: string
    tenantId: string
    title: string
    description?: string | null
    status?: string
    priorityId?: string | null
    afterId?: string | null
    columnId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    closedAt?: Date | string | null
    deletedAt?: Date | string | null
    creatorId: string
    assigneeId?: string | null
    comments?: TicketCommentUncheckedCreateNestedManyWithoutTicketInput
    attachments?: AttachmentUncheckedCreateNestedManyWithoutTicketInput
  }

  export type TicketCreateOrConnectWithoutDepartmentInput = {
    where: TicketWhereUniqueInput
    create: XOR<TicketCreateWithoutDepartmentInput, TicketUncheckedCreateWithoutDepartmentInput>
  }

  export type TicketCreateManyDepartmentInputEnvelope = {
    data: TicketCreateManyDepartmentInput | TicketCreateManyDepartmentInput[]
    skipDuplicates?: boolean
  }

  export type TenantUpsertWithoutDepartmentsInput = {
    update: XOR<TenantUpdateWithoutDepartmentsInput, TenantUncheckedUpdateWithoutDepartmentsInput>
    create: XOR<TenantCreateWithoutDepartmentsInput, TenantUncheckedCreateWithoutDepartmentsInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutDepartmentsInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutDepartmentsInput, TenantUncheckedUpdateWithoutDepartmentsInput>
  }

  export type TenantUpdateWithoutDepartmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutTenantNestedInput
    tickets?: TicketUpdateManyWithoutTenantNestedInput
    columns?: ColumnUpdateManyWithoutTenantNestedInput
    slas?: SLAUpdateManyWithoutTenantNestedInput
    workflows?: WorkflowUpdateManyWithoutTenantNestedInput
    priorities?: PriorityUpdateManyWithoutTenantNestedInput
    statuses?: StatusUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutDepartmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutTenantNestedInput
    tickets?: TicketUncheckedUpdateManyWithoutTenantNestedInput
    columns?: ColumnUncheckedUpdateManyWithoutTenantNestedInput
    slas?: SLAUncheckedUpdateManyWithoutTenantNestedInput
    workflows?: WorkflowUncheckedUpdateManyWithoutTenantNestedInput
    priorities?: PriorityUncheckedUpdateManyWithoutTenantNestedInput
    statuses?: StatusUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type TicketUpsertWithWhereUniqueWithoutDepartmentInput = {
    where: TicketWhereUniqueInput
    update: XOR<TicketUpdateWithoutDepartmentInput, TicketUncheckedUpdateWithoutDepartmentInput>
    create: XOR<TicketCreateWithoutDepartmentInput, TicketUncheckedCreateWithoutDepartmentInput>
  }

  export type TicketUpdateWithWhereUniqueWithoutDepartmentInput = {
    where: TicketWhereUniqueInput
    data: XOR<TicketUpdateWithoutDepartmentInput, TicketUncheckedUpdateWithoutDepartmentInput>
  }

  export type TicketUpdateManyWithWhereWithoutDepartmentInput = {
    where: TicketScalarWhereInput
    data: XOR<TicketUpdateManyMutationInput, TicketUncheckedUpdateManyWithoutDepartmentInput>
  }

  export type TenantCreateWithoutColumnsInput = {
    id?: string
    name: string
    avatar?: string | null
    createdAt?: Date | string
    users?: UserCreateNestedManyWithoutTenantInput
    departments?: DepartmentCreateNestedManyWithoutTenantInput
    tickets?: TicketCreateNestedManyWithoutTenantInput
    slas?: SLACreateNestedManyWithoutTenantInput
    workflows?: WorkflowCreateNestedManyWithoutTenantInput
    priorities?: PriorityCreateNestedManyWithoutTenantInput
    statuses?: StatusCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutColumnsInput = {
    id?: string
    name: string
    avatar?: string | null
    createdAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutTenantInput
    departments?: DepartmentUncheckedCreateNestedManyWithoutTenantInput
    tickets?: TicketUncheckedCreateNestedManyWithoutTenantInput
    slas?: SLAUncheckedCreateNestedManyWithoutTenantInput
    workflows?: WorkflowUncheckedCreateNestedManyWithoutTenantInput
    priorities?: PriorityUncheckedCreateNestedManyWithoutTenantInput
    statuses?: StatusUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutColumnsInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutColumnsInput, TenantUncheckedCreateWithoutColumnsInput>
  }

  export type StatusCreateWithoutColumnsInput = {
    id?: string
    name: string
    color: string
    order?: number
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutStatusesInput
  }

  export type StatusUncheckedCreateWithoutColumnsInput = {
    id?: string
    name: string
    color: string
    order?: number
    isDefault?: boolean
    tenantId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StatusCreateOrConnectWithoutColumnsInput = {
    where: StatusWhereUniqueInput
    create: XOR<StatusCreateWithoutColumnsInput, StatusUncheckedCreateWithoutColumnsInput>
  }

  export type TicketCreateWithoutColumnInput = {
    id?: string
    title: string
    description?: string | null
    status?: string
    afterId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    closedAt?: Date | string | null
    deletedAt?: Date | string | null
    tenant: TenantCreateNestedOneWithoutTicketsInput
    priority?: PriorityCreateNestedOneWithoutTicketsInput
    creator: UserCreateNestedOneWithoutTicketsCreatedInput
    assignee?: UserCreateNestedOneWithoutTicketsAssignedInput
    department?: DepartmentCreateNestedOneWithoutTicketsInput
    comments?: TicketCommentCreateNestedManyWithoutTicketInput
    attachments?: AttachmentCreateNestedManyWithoutTicketInput
  }

  export type TicketUncheckedCreateWithoutColumnInput = {
    id?: string
    tenantId: string
    title: string
    description?: string | null
    status?: string
    priorityId?: string | null
    afterId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    closedAt?: Date | string | null
    deletedAt?: Date | string | null
    creatorId: string
    assigneeId?: string | null
    departmentId?: string | null
    comments?: TicketCommentUncheckedCreateNestedManyWithoutTicketInput
    attachments?: AttachmentUncheckedCreateNestedManyWithoutTicketInput
  }

  export type TicketCreateOrConnectWithoutColumnInput = {
    where: TicketWhereUniqueInput
    create: XOR<TicketCreateWithoutColumnInput, TicketUncheckedCreateWithoutColumnInput>
  }

  export type TicketCreateManyColumnInputEnvelope = {
    data: TicketCreateManyColumnInput | TicketCreateManyColumnInput[]
    skipDuplicates?: boolean
  }

  export type TenantUpsertWithoutColumnsInput = {
    update: XOR<TenantUpdateWithoutColumnsInput, TenantUncheckedUpdateWithoutColumnsInput>
    create: XOR<TenantCreateWithoutColumnsInput, TenantUncheckedCreateWithoutColumnsInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutColumnsInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutColumnsInput, TenantUncheckedUpdateWithoutColumnsInput>
  }

  export type TenantUpdateWithoutColumnsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutTenantNestedInput
    departments?: DepartmentUpdateManyWithoutTenantNestedInput
    tickets?: TicketUpdateManyWithoutTenantNestedInput
    slas?: SLAUpdateManyWithoutTenantNestedInput
    workflows?: WorkflowUpdateManyWithoutTenantNestedInput
    priorities?: PriorityUpdateManyWithoutTenantNestedInput
    statuses?: StatusUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutColumnsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutTenantNestedInput
    departments?: DepartmentUncheckedUpdateManyWithoutTenantNestedInput
    tickets?: TicketUncheckedUpdateManyWithoutTenantNestedInput
    slas?: SLAUncheckedUpdateManyWithoutTenantNestedInput
    workflows?: WorkflowUncheckedUpdateManyWithoutTenantNestedInput
    priorities?: PriorityUncheckedUpdateManyWithoutTenantNestedInput
    statuses?: StatusUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type StatusUpsertWithoutColumnsInput = {
    update: XOR<StatusUpdateWithoutColumnsInput, StatusUncheckedUpdateWithoutColumnsInput>
    create: XOR<StatusCreateWithoutColumnsInput, StatusUncheckedCreateWithoutColumnsInput>
    where?: StatusWhereInput
  }

  export type StatusUpdateToOneWithWhereWithoutColumnsInput = {
    where?: StatusWhereInput
    data: XOR<StatusUpdateWithoutColumnsInput, StatusUncheckedUpdateWithoutColumnsInput>
  }

  export type StatusUpdateWithoutColumnsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutStatusesNestedInput
  }

  export type StatusUncheckedUpdateWithoutColumnsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketUpsertWithWhereUniqueWithoutColumnInput = {
    where: TicketWhereUniqueInput
    update: XOR<TicketUpdateWithoutColumnInput, TicketUncheckedUpdateWithoutColumnInput>
    create: XOR<TicketCreateWithoutColumnInput, TicketUncheckedCreateWithoutColumnInput>
  }

  export type TicketUpdateWithWhereUniqueWithoutColumnInput = {
    where: TicketWhereUniqueInput
    data: XOR<TicketUpdateWithoutColumnInput, TicketUncheckedUpdateWithoutColumnInput>
  }

  export type TicketUpdateManyWithWhereWithoutColumnInput = {
    where: TicketScalarWhereInput
    data: XOR<TicketUpdateManyMutationInput, TicketUncheckedUpdateManyWithoutColumnInput>
  }

  export type TenantCreateWithoutTicketsInput = {
    id?: string
    name: string
    avatar?: string | null
    createdAt?: Date | string
    users?: UserCreateNestedManyWithoutTenantInput
    departments?: DepartmentCreateNestedManyWithoutTenantInput
    columns?: ColumnCreateNestedManyWithoutTenantInput
    slas?: SLACreateNestedManyWithoutTenantInput
    workflows?: WorkflowCreateNestedManyWithoutTenantInput
    priorities?: PriorityCreateNestedManyWithoutTenantInput
    statuses?: StatusCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutTicketsInput = {
    id?: string
    name: string
    avatar?: string | null
    createdAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutTenantInput
    departments?: DepartmentUncheckedCreateNestedManyWithoutTenantInput
    columns?: ColumnUncheckedCreateNestedManyWithoutTenantInput
    slas?: SLAUncheckedCreateNestedManyWithoutTenantInput
    workflows?: WorkflowUncheckedCreateNestedManyWithoutTenantInput
    priorities?: PriorityUncheckedCreateNestedManyWithoutTenantInput
    statuses?: StatusUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutTicketsInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutTicketsInput, TenantUncheckedCreateWithoutTicketsInput>
  }

  export type PriorityCreateWithoutTicketsInput = {
    id?: string
    name: string
    color: string
    order?: number
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutPrioritiesInput
    slas?: SLACreateNestedManyWithoutPriorityInput
  }

  export type PriorityUncheckedCreateWithoutTicketsInput = {
    id?: string
    name: string
    color: string
    order?: number
    isDefault?: boolean
    tenantId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    slas?: SLAUncheckedCreateNestedManyWithoutPriorityInput
  }

  export type PriorityCreateOrConnectWithoutTicketsInput = {
    where: PriorityWhereUniqueInput
    create: XOR<PriorityCreateWithoutTicketsInput, PriorityUncheckedCreateWithoutTicketsInput>
  }

  export type ColumnCreateWithoutTicketsInput = {
    id?: string
    name: string
    description?: string | null
    order?: number
    color?: string | null
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutColumnsInput
    status?: StatusCreateNestedOneWithoutColumnsInput
  }

  export type ColumnUncheckedCreateWithoutTicketsInput = {
    id?: string
    tenantId: string
    name: string
    description?: string | null
    order?: number
    color?: string | null
    isDefault?: boolean
    statusId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ColumnCreateOrConnectWithoutTicketsInput = {
    where: ColumnWhereUniqueInput
    create: XOR<ColumnCreateWithoutTicketsInput, ColumnUncheckedCreateWithoutTicketsInput>
  }

  export type UserCreateWithoutTicketsCreatedInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    avatar?: string | null
    createdAt?: Date | string
    deletedAt?: Date | string | null
    refreshToken?: string | null
    resetPasswordToken?: string | null
    resetPasswordTokenExpiry?: Date | string | null
    tenant: TenantCreateNestedOneWithoutUsersInput
    ticketsAssigned?: TicketCreateNestedManyWithoutAssigneeInput
    comments?: TicketCommentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTicketsCreatedInput = {
    id?: string
    tenantId: string
    username: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    avatar?: string | null
    createdAt?: Date | string
    deletedAt?: Date | string | null
    refreshToken?: string | null
    resetPasswordToken?: string | null
    resetPasswordTokenExpiry?: Date | string | null
    ticketsAssigned?: TicketUncheckedCreateNestedManyWithoutAssigneeInput
    comments?: TicketCommentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTicketsCreatedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTicketsCreatedInput, UserUncheckedCreateWithoutTicketsCreatedInput>
  }

  export type UserCreateWithoutTicketsAssignedInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    avatar?: string | null
    createdAt?: Date | string
    deletedAt?: Date | string | null
    refreshToken?: string | null
    resetPasswordToken?: string | null
    resetPasswordTokenExpiry?: Date | string | null
    tenant: TenantCreateNestedOneWithoutUsersInput
    ticketsCreated?: TicketCreateNestedManyWithoutCreatorInput
    comments?: TicketCommentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTicketsAssignedInput = {
    id?: string
    tenantId: string
    username: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    avatar?: string | null
    createdAt?: Date | string
    deletedAt?: Date | string | null
    refreshToken?: string | null
    resetPasswordToken?: string | null
    resetPasswordTokenExpiry?: Date | string | null
    ticketsCreated?: TicketUncheckedCreateNestedManyWithoutCreatorInput
    comments?: TicketCommentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTicketsAssignedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTicketsAssignedInput, UserUncheckedCreateWithoutTicketsAssignedInput>
  }

  export type DepartmentCreateWithoutTicketsInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutDepartmentsInput
  }

  export type DepartmentUncheckedCreateWithoutTicketsInput = {
    id?: string
    tenantId: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DepartmentCreateOrConnectWithoutTicketsInput = {
    where: DepartmentWhereUniqueInput
    create: XOR<DepartmentCreateWithoutTicketsInput, DepartmentUncheckedCreateWithoutTicketsInput>
  }

  export type TicketCommentCreateWithoutTicketInput = {
    id?: string
    comment: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutCommentsInput
    attachments?: AttachmentCreateNestedManyWithoutCommentInput
  }

  export type TicketCommentUncheckedCreateWithoutTicketInput = {
    id?: string
    userId: string
    comment: string
    createdAt?: Date | string
    attachments?: AttachmentUncheckedCreateNestedManyWithoutCommentInput
  }

  export type TicketCommentCreateOrConnectWithoutTicketInput = {
    where: TicketCommentWhereUniqueInput
    create: XOR<TicketCommentCreateWithoutTicketInput, TicketCommentUncheckedCreateWithoutTicketInput>
  }

  export type TicketCommentCreateManyTicketInputEnvelope = {
    data: TicketCommentCreateManyTicketInput | TicketCommentCreateManyTicketInput[]
    skipDuplicates?: boolean
  }

  export type AttachmentCreateWithoutTicketInput = {
    id?: string
    filename: string
    originalName: string
    mimeType: string
    size: number
    filePath: string
    url: string
    uploadedBy: string
    tenantId: string
    uploadedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    comment?: TicketCommentCreateNestedOneWithoutAttachmentsInput
  }

  export type AttachmentUncheckedCreateWithoutTicketInput = {
    id?: string
    filename: string
    originalName: string
    mimeType: string
    size: number
    filePath: string
    url: string
    commentId?: string | null
    uploadedBy: string
    tenantId: string
    uploadedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type AttachmentCreateOrConnectWithoutTicketInput = {
    where: AttachmentWhereUniqueInput
    create: XOR<AttachmentCreateWithoutTicketInput, AttachmentUncheckedCreateWithoutTicketInput>
  }

  export type AttachmentCreateManyTicketInputEnvelope = {
    data: AttachmentCreateManyTicketInput | AttachmentCreateManyTicketInput[]
    skipDuplicates?: boolean
  }

  export type TenantUpsertWithoutTicketsInput = {
    update: XOR<TenantUpdateWithoutTicketsInput, TenantUncheckedUpdateWithoutTicketsInput>
    create: XOR<TenantCreateWithoutTicketsInput, TenantUncheckedCreateWithoutTicketsInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutTicketsInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutTicketsInput, TenantUncheckedUpdateWithoutTicketsInput>
  }

  export type TenantUpdateWithoutTicketsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutTenantNestedInput
    departments?: DepartmentUpdateManyWithoutTenantNestedInput
    columns?: ColumnUpdateManyWithoutTenantNestedInput
    slas?: SLAUpdateManyWithoutTenantNestedInput
    workflows?: WorkflowUpdateManyWithoutTenantNestedInput
    priorities?: PriorityUpdateManyWithoutTenantNestedInput
    statuses?: StatusUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutTicketsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutTenantNestedInput
    departments?: DepartmentUncheckedUpdateManyWithoutTenantNestedInput
    columns?: ColumnUncheckedUpdateManyWithoutTenantNestedInput
    slas?: SLAUncheckedUpdateManyWithoutTenantNestedInput
    workflows?: WorkflowUncheckedUpdateManyWithoutTenantNestedInput
    priorities?: PriorityUncheckedUpdateManyWithoutTenantNestedInput
    statuses?: StatusUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type PriorityUpsertWithoutTicketsInput = {
    update: XOR<PriorityUpdateWithoutTicketsInput, PriorityUncheckedUpdateWithoutTicketsInput>
    create: XOR<PriorityCreateWithoutTicketsInput, PriorityUncheckedCreateWithoutTicketsInput>
    where?: PriorityWhereInput
  }

  export type PriorityUpdateToOneWithWhereWithoutTicketsInput = {
    where?: PriorityWhereInput
    data: XOR<PriorityUpdateWithoutTicketsInput, PriorityUncheckedUpdateWithoutTicketsInput>
  }

  export type PriorityUpdateWithoutTicketsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutPrioritiesNestedInput
    slas?: SLAUpdateManyWithoutPriorityNestedInput
  }

  export type PriorityUncheckedUpdateWithoutTicketsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slas?: SLAUncheckedUpdateManyWithoutPriorityNestedInput
  }

  export type ColumnUpsertWithoutTicketsInput = {
    update: XOR<ColumnUpdateWithoutTicketsInput, ColumnUncheckedUpdateWithoutTicketsInput>
    create: XOR<ColumnCreateWithoutTicketsInput, ColumnUncheckedCreateWithoutTicketsInput>
    where?: ColumnWhereInput
  }

  export type ColumnUpdateToOneWithWhereWithoutTicketsInput = {
    where?: ColumnWhereInput
    data: XOR<ColumnUpdateWithoutTicketsInput, ColumnUncheckedUpdateWithoutTicketsInput>
  }

  export type ColumnUpdateWithoutTicketsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutColumnsNestedInput
    status?: StatusUpdateOneWithoutColumnsNestedInput
  }

  export type ColumnUncheckedUpdateWithoutTicketsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    statusId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutTicketsCreatedInput = {
    update: XOR<UserUpdateWithoutTicketsCreatedInput, UserUncheckedUpdateWithoutTicketsCreatedInput>
    create: XOR<UserCreateWithoutTicketsCreatedInput, UserUncheckedCreateWithoutTicketsCreatedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTicketsCreatedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTicketsCreatedInput, UserUncheckedUpdateWithoutTicketsCreatedInput>
  }

  export type UserUpdateWithoutTicketsCreatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tenant?: TenantUpdateOneRequiredWithoutUsersNestedInput
    ticketsAssigned?: TicketUpdateManyWithoutAssigneeNestedInput
    comments?: TicketCommentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTicketsCreatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ticketsAssigned?: TicketUncheckedUpdateManyWithoutAssigneeNestedInput
    comments?: TicketCommentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutTicketsAssignedInput = {
    update: XOR<UserUpdateWithoutTicketsAssignedInput, UserUncheckedUpdateWithoutTicketsAssignedInput>
    create: XOR<UserCreateWithoutTicketsAssignedInput, UserUncheckedCreateWithoutTicketsAssignedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTicketsAssignedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTicketsAssignedInput, UserUncheckedUpdateWithoutTicketsAssignedInput>
  }

  export type UserUpdateWithoutTicketsAssignedInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tenant?: TenantUpdateOneRequiredWithoutUsersNestedInput
    ticketsCreated?: TicketUpdateManyWithoutCreatorNestedInput
    comments?: TicketCommentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTicketsAssignedInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ticketsCreated?: TicketUncheckedUpdateManyWithoutCreatorNestedInput
    comments?: TicketCommentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type DepartmentUpsertWithoutTicketsInput = {
    update: XOR<DepartmentUpdateWithoutTicketsInput, DepartmentUncheckedUpdateWithoutTicketsInput>
    create: XOR<DepartmentCreateWithoutTicketsInput, DepartmentUncheckedCreateWithoutTicketsInput>
    where?: DepartmentWhereInput
  }

  export type DepartmentUpdateToOneWithWhereWithoutTicketsInput = {
    where?: DepartmentWhereInput
    data: XOR<DepartmentUpdateWithoutTicketsInput, DepartmentUncheckedUpdateWithoutTicketsInput>
  }

  export type DepartmentUpdateWithoutTicketsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutDepartmentsNestedInput
  }

  export type DepartmentUncheckedUpdateWithoutTicketsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketCommentUpsertWithWhereUniqueWithoutTicketInput = {
    where: TicketCommentWhereUniqueInput
    update: XOR<TicketCommentUpdateWithoutTicketInput, TicketCommentUncheckedUpdateWithoutTicketInput>
    create: XOR<TicketCommentCreateWithoutTicketInput, TicketCommentUncheckedCreateWithoutTicketInput>
  }

  export type TicketCommentUpdateWithWhereUniqueWithoutTicketInput = {
    where: TicketCommentWhereUniqueInput
    data: XOR<TicketCommentUpdateWithoutTicketInput, TicketCommentUncheckedUpdateWithoutTicketInput>
  }

  export type TicketCommentUpdateManyWithWhereWithoutTicketInput = {
    where: TicketCommentScalarWhereInput
    data: XOR<TicketCommentUpdateManyMutationInput, TicketCommentUncheckedUpdateManyWithoutTicketInput>
  }

  export type AttachmentUpsertWithWhereUniqueWithoutTicketInput = {
    where: AttachmentWhereUniqueInput
    update: XOR<AttachmentUpdateWithoutTicketInput, AttachmentUncheckedUpdateWithoutTicketInput>
    create: XOR<AttachmentCreateWithoutTicketInput, AttachmentUncheckedCreateWithoutTicketInput>
  }

  export type AttachmentUpdateWithWhereUniqueWithoutTicketInput = {
    where: AttachmentWhereUniqueInput
    data: XOR<AttachmentUpdateWithoutTicketInput, AttachmentUncheckedUpdateWithoutTicketInput>
  }

  export type AttachmentUpdateManyWithWhereWithoutTicketInput = {
    where: AttachmentScalarWhereInput
    data: XOR<AttachmentUpdateManyMutationInput, AttachmentUncheckedUpdateManyWithoutTicketInput>
  }

  export type AttachmentScalarWhereInput = {
    AND?: AttachmentScalarWhereInput | AttachmentScalarWhereInput[]
    OR?: AttachmentScalarWhereInput[]
    NOT?: AttachmentScalarWhereInput | AttachmentScalarWhereInput[]
    id?: StringFilter<"Attachment"> | string
    filename?: StringFilter<"Attachment"> | string
    originalName?: StringFilter<"Attachment"> | string
    mimeType?: StringFilter<"Attachment"> | string
    size?: IntFilter<"Attachment"> | number
    filePath?: StringFilter<"Attachment"> | string
    url?: StringFilter<"Attachment"> | string
    ticketId?: StringNullableFilter<"Attachment"> | string | null
    commentId?: StringNullableFilter<"Attachment"> | string | null
    uploadedBy?: StringFilter<"Attachment"> | string
    tenantId?: StringFilter<"Attachment"> | string
    uploadedAt?: DateTimeFilter<"Attachment"> | Date | string
    createdAt?: DateTimeFilter<"Attachment"> | Date | string
    updatedAt?: DateTimeFilter<"Attachment"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Attachment"> | Date | string | null
  }

  export type TicketCreateWithoutCommentsInput = {
    id?: string
    title: string
    description?: string | null
    status?: string
    afterId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    closedAt?: Date | string | null
    deletedAt?: Date | string | null
    tenant: TenantCreateNestedOneWithoutTicketsInput
    priority?: PriorityCreateNestedOneWithoutTicketsInput
    column?: ColumnCreateNestedOneWithoutTicketsInput
    creator: UserCreateNestedOneWithoutTicketsCreatedInput
    assignee?: UserCreateNestedOneWithoutTicketsAssignedInput
    department?: DepartmentCreateNestedOneWithoutTicketsInput
    attachments?: AttachmentCreateNestedManyWithoutTicketInput
  }

  export type TicketUncheckedCreateWithoutCommentsInput = {
    id?: string
    tenantId: string
    title: string
    description?: string | null
    status?: string
    priorityId?: string | null
    afterId?: string | null
    columnId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    closedAt?: Date | string | null
    deletedAt?: Date | string | null
    creatorId: string
    assigneeId?: string | null
    departmentId?: string | null
    attachments?: AttachmentUncheckedCreateNestedManyWithoutTicketInput
  }

  export type TicketCreateOrConnectWithoutCommentsInput = {
    where: TicketWhereUniqueInput
    create: XOR<TicketCreateWithoutCommentsInput, TicketUncheckedCreateWithoutCommentsInput>
  }

  export type UserCreateWithoutCommentsInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    avatar?: string | null
    createdAt?: Date | string
    deletedAt?: Date | string | null
    refreshToken?: string | null
    resetPasswordToken?: string | null
    resetPasswordTokenExpiry?: Date | string | null
    tenant: TenantCreateNestedOneWithoutUsersInput
    ticketsCreated?: TicketCreateNestedManyWithoutCreatorInput
    ticketsAssigned?: TicketCreateNestedManyWithoutAssigneeInput
  }

  export type UserUncheckedCreateWithoutCommentsInput = {
    id?: string
    tenantId: string
    username: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    avatar?: string | null
    createdAt?: Date | string
    deletedAt?: Date | string | null
    refreshToken?: string | null
    resetPasswordToken?: string | null
    resetPasswordTokenExpiry?: Date | string | null
    ticketsCreated?: TicketUncheckedCreateNestedManyWithoutCreatorInput
    ticketsAssigned?: TicketUncheckedCreateNestedManyWithoutAssigneeInput
  }

  export type UserCreateOrConnectWithoutCommentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
  }

  export type AttachmentCreateWithoutCommentInput = {
    id?: string
    filename: string
    originalName: string
    mimeType: string
    size: number
    filePath: string
    url: string
    uploadedBy: string
    tenantId: string
    uploadedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    ticket?: TicketCreateNestedOneWithoutAttachmentsInput
  }

  export type AttachmentUncheckedCreateWithoutCommentInput = {
    id?: string
    filename: string
    originalName: string
    mimeType: string
    size: number
    filePath: string
    url: string
    ticketId?: string | null
    uploadedBy: string
    tenantId: string
    uploadedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type AttachmentCreateOrConnectWithoutCommentInput = {
    where: AttachmentWhereUniqueInput
    create: XOR<AttachmentCreateWithoutCommentInput, AttachmentUncheckedCreateWithoutCommentInput>
  }

  export type AttachmentCreateManyCommentInputEnvelope = {
    data: AttachmentCreateManyCommentInput | AttachmentCreateManyCommentInput[]
    skipDuplicates?: boolean
  }

  export type TicketUpsertWithoutCommentsInput = {
    update: XOR<TicketUpdateWithoutCommentsInput, TicketUncheckedUpdateWithoutCommentsInput>
    create: XOR<TicketCreateWithoutCommentsInput, TicketUncheckedCreateWithoutCommentsInput>
    where?: TicketWhereInput
  }

  export type TicketUpdateToOneWithWhereWithoutCommentsInput = {
    where?: TicketWhereInput
    data: XOR<TicketUpdateWithoutCommentsInput, TicketUncheckedUpdateWithoutCommentsInput>
  }

  export type TicketUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    afterId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tenant?: TenantUpdateOneRequiredWithoutTicketsNestedInput
    priority?: PriorityUpdateOneWithoutTicketsNestedInput
    column?: ColumnUpdateOneWithoutTicketsNestedInput
    creator?: UserUpdateOneRequiredWithoutTicketsCreatedNestedInput
    assignee?: UserUpdateOneWithoutTicketsAssignedNestedInput
    department?: DepartmentUpdateOneWithoutTicketsNestedInput
    attachments?: AttachmentUpdateManyWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priorityId?: NullableStringFieldUpdateOperationsInput | string | null
    afterId?: NullableStringFieldUpdateOperationsInput | string | null
    columnId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creatorId?: StringFieldUpdateOperationsInput | string
    assigneeId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: AttachmentUncheckedUpdateManyWithoutTicketNestedInput
  }

  export type UserUpsertWithoutCommentsInput = {
    update: XOR<UserUpdateWithoutCommentsInput, UserUncheckedUpdateWithoutCommentsInput>
    create: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCommentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCommentsInput, UserUncheckedUpdateWithoutCommentsInput>
  }

  export type UserUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tenant?: TenantUpdateOneRequiredWithoutUsersNestedInput
    ticketsCreated?: TicketUpdateManyWithoutCreatorNestedInput
    ticketsAssigned?: TicketUpdateManyWithoutAssigneeNestedInput
  }

  export type UserUncheckedUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ticketsCreated?: TicketUncheckedUpdateManyWithoutCreatorNestedInput
    ticketsAssigned?: TicketUncheckedUpdateManyWithoutAssigneeNestedInput
  }

  export type AttachmentUpsertWithWhereUniqueWithoutCommentInput = {
    where: AttachmentWhereUniqueInput
    update: XOR<AttachmentUpdateWithoutCommentInput, AttachmentUncheckedUpdateWithoutCommentInput>
    create: XOR<AttachmentCreateWithoutCommentInput, AttachmentUncheckedCreateWithoutCommentInput>
  }

  export type AttachmentUpdateWithWhereUniqueWithoutCommentInput = {
    where: AttachmentWhereUniqueInput
    data: XOR<AttachmentUpdateWithoutCommentInput, AttachmentUncheckedUpdateWithoutCommentInput>
  }

  export type AttachmentUpdateManyWithWhereWithoutCommentInput = {
    where: AttachmentScalarWhereInput
    data: XOR<AttachmentUpdateManyMutationInput, AttachmentUncheckedUpdateManyWithoutCommentInput>
  }

  export type TicketCreateWithoutAttachmentsInput = {
    id?: string
    title: string
    description?: string | null
    status?: string
    afterId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    closedAt?: Date | string | null
    deletedAt?: Date | string | null
    tenant: TenantCreateNestedOneWithoutTicketsInput
    priority?: PriorityCreateNestedOneWithoutTicketsInput
    column?: ColumnCreateNestedOneWithoutTicketsInput
    creator: UserCreateNestedOneWithoutTicketsCreatedInput
    assignee?: UserCreateNestedOneWithoutTicketsAssignedInput
    department?: DepartmentCreateNestedOneWithoutTicketsInput
    comments?: TicketCommentCreateNestedManyWithoutTicketInput
  }

  export type TicketUncheckedCreateWithoutAttachmentsInput = {
    id?: string
    tenantId: string
    title: string
    description?: string | null
    status?: string
    priorityId?: string | null
    afterId?: string | null
    columnId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    closedAt?: Date | string | null
    deletedAt?: Date | string | null
    creatorId: string
    assigneeId?: string | null
    departmentId?: string | null
    comments?: TicketCommentUncheckedCreateNestedManyWithoutTicketInput
  }

  export type TicketCreateOrConnectWithoutAttachmentsInput = {
    where: TicketWhereUniqueInput
    create: XOR<TicketCreateWithoutAttachmentsInput, TicketUncheckedCreateWithoutAttachmentsInput>
  }

  export type TicketCommentCreateWithoutAttachmentsInput = {
    id?: string
    comment: string
    createdAt?: Date | string
    ticket: TicketCreateNestedOneWithoutCommentsInput
    user: UserCreateNestedOneWithoutCommentsInput
  }

  export type TicketCommentUncheckedCreateWithoutAttachmentsInput = {
    id?: string
    ticketId: string
    userId: string
    comment: string
    createdAt?: Date | string
  }

  export type TicketCommentCreateOrConnectWithoutAttachmentsInput = {
    where: TicketCommentWhereUniqueInput
    create: XOR<TicketCommentCreateWithoutAttachmentsInput, TicketCommentUncheckedCreateWithoutAttachmentsInput>
  }

  export type TicketUpsertWithoutAttachmentsInput = {
    update: XOR<TicketUpdateWithoutAttachmentsInput, TicketUncheckedUpdateWithoutAttachmentsInput>
    create: XOR<TicketCreateWithoutAttachmentsInput, TicketUncheckedCreateWithoutAttachmentsInput>
    where?: TicketWhereInput
  }

  export type TicketUpdateToOneWithWhereWithoutAttachmentsInput = {
    where?: TicketWhereInput
    data: XOR<TicketUpdateWithoutAttachmentsInput, TicketUncheckedUpdateWithoutAttachmentsInput>
  }

  export type TicketUpdateWithoutAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    afterId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tenant?: TenantUpdateOneRequiredWithoutTicketsNestedInput
    priority?: PriorityUpdateOneWithoutTicketsNestedInput
    column?: ColumnUpdateOneWithoutTicketsNestedInput
    creator?: UserUpdateOneRequiredWithoutTicketsCreatedNestedInput
    assignee?: UserUpdateOneWithoutTicketsAssignedNestedInput
    department?: DepartmentUpdateOneWithoutTicketsNestedInput
    comments?: TicketCommentUpdateManyWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateWithoutAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priorityId?: NullableStringFieldUpdateOperationsInput | string | null
    afterId?: NullableStringFieldUpdateOperationsInput | string | null
    columnId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creatorId?: StringFieldUpdateOperationsInput | string
    assigneeId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: TicketCommentUncheckedUpdateManyWithoutTicketNestedInput
  }

  export type TicketCommentUpsertWithoutAttachmentsInput = {
    update: XOR<TicketCommentUpdateWithoutAttachmentsInput, TicketCommentUncheckedUpdateWithoutAttachmentsInput>
    create: XOR<TicketCommentCreateWithoutAttachmentsInput, TicketCommentUncheckedCreateWithoutAttachmentsInput>
    where?: TicketCommentWhereInput
  }

  export type TicketCommentUpdateToOneWithWhereWithoutAttachmentsInput = {
    where?: TicketCommentWhereInput
    data: XOR<TicketCommentUpdateWithoutAttachmentsInput, TicketCommentUncheckedUpdateWithoutAttachmentsInput>
  }

  export type TicketCommentUpdateWithoutAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ticket?: TicketUpdateOneRequiredWithoutCommentsNestedInput
    user?: UserUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type TicketCommentUncheckedUpdateWithoutAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ticketId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantCreateWithoutSlasInput = {
    id?: string
    name: string
    avatar?: string | null
    createdAt?: Date | string
    users?: UserCreateNestedManyWithoutTenantInput
    departments?: DepartmentCreateNestedManyWithoutTenantInput
    tickets?: TicketCreateNestedManyWithoutTenantInput
    columns?: ColumnCreateNestedManyWithoutTenantInput
    workflows?: WorkflowCreateNestedManyWithoutTenantInput
    priorities?: PriorityCreateNestedManyWithoutTenantInput
    statuses?: StatusCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutSlasInput = {
    id?: string
    name: string
    avatar?: string | null
    createdAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutTenantInput
    departments?: DepartmentUncheckedCreateNestedManyWithoutTenantInput
    tickets?: TicketUncheckedCreateNestedManyWithoutTenantInput
    columns?: ColumnUncheckedCreateNestedManyWithoutTenantInput
    workflows?: WorkflowUncheckedCreateNestedManyWithoutTenantInput
    priorities?: PriorityUncheckedCreateNestedManyWithoutTenantInput
    statuses?: StatusUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutSlasInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutSlasInput, TenantUncheckedCreateWithoutSlasInput>
  }

  export type PriorityCreateWithoutSlasInput = {
    id?: string
    name: string
    color: string
    order?: number
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutPrioritiesInput
    tickets?: TicketCreateNestedManyWithoutPriorityInput
  }

  export type PriorityUncheckedCreateWithoutSlasInput = {
    id?: string
    name: string
    color: string
    order?: number
    isDefault?: boolean
    tenantId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tickets?: TicketUncheckedCreateNestedManyWithoutPriorityInput
  }

  export type PriorityCreateOrConnectWithoutSlasInput = {
    where: PriorityWhereUniqueInput
    create: XOR<PriorityCreateWithoutSlasInput, PriorityUncheckedCreateWithoutSlasInput>
  }

  export type TenantUpsertWithoutSlasInput = {
    update: XOR<TenantUpdateWithoutSlasInput, TenantUncheckedUpdateWithoutSlasInput>
    create: XOR<TenantCreateWithoutSlasInput, TenantUncheckedCreateWithoutSlasInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutSlasInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutSlasInput, TenantUncheckedUpdateWithoutSlasInput>
  }

  export type TenantUpdateWithoutSlasInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutTenantNestedInput
    departments?: DepartmentUpdateManyWithoutTenantNestedInput
    tickets?: TicketUpdateManyWithoutTenantNestedInput
    columns?: ColumnUpdateManyWithoutTenantNestedInput
    workflows?: WorkflowUpdateManyWithoutTenantNestedInput
    priorities?: PriorityUpdateManyWithoutTenantNestedInput
    statuses?: StatusUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutSlasInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutTenantNestedInput
    departments?: DepartmentUncheckedUpdateManyWithoutTenantNestedInput
    tickets?: TicketUncheckedUpdateManyWithoutTenantNestedInput
    columns?: ColumnUncheckedUpdateManyWithoutTenantNestedInput
    workflows?: WorkflowUncheckedUpdateManyWithoutTenantNestedInput
    priorities?: PriorityUncheckedUpdateManyWithoutTenantNestedInput
    statuses?: StatusUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type PriorityUpsertWithoutSlasInput = {
    update: XOR<PriorityUpdateWithoutSlasInput, PriorityUncheckedUpdateWithoutSlasInput>
    create: XOR<PriorityCreateWithoutSlasInput, PriorityUncheckedCreateWithoutSlasInput>
    where?: PriorityWhereInput
  }

  export type PriorityUpdateToOneWithWhereWithoutSlasInput = {
    where?: PriorityWhereInput
    data: XOR<PriorityUpdateWithoutSlasInput, PriorityUncheckedUpdateWithoutSlasInput>
  }

  export type PriorityUpdateWithoutSlasInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutPrioritiesNestedInput
    tickets?: TicketUpdateManyWithoutPriorityNestedInput
  }

  export type PriorityUncheckedUpdateWithoutSlasInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tickets?: TicketUncheckedUpdateManyWithoutPriorityNestedInput
  }

  export type TenantCreateWithoutWorkflowsInput = {
    id?: string
    name: string
    avatar?: string | null
    createdAt?: Date | string
    users?: UserCreateNestedManyWithoutTenantInput
    departments?: DepartmentCreateNestedManyWithoutTenantInput
    tickets?: TicketCreateNestedManyWithoutTenantInput
    columns?: ColumnCreateNestedManyWithoutTenantInput
    slas?: SLACreateNestedManyWithoutTenantInput
    priorities?: PriorityCreateNestedManyWithoutTenantInput
    statuses?: StatusCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutWorkflowsInput = {
    id?: string
    name: string
    avatar?: string | null
    createdAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutTenantInput
    departments?: DepartmentUncheckedCreateNestedManyWithoutTenantInput
    tickets?: TicketUncheckedCreateNestedManyWithoutTenantInput
    columns?: ColumnUncheckedCreateNestedManyWithoutTenantInput
    slas?: SLAUncheckedCreateNestedManyWithoutTenantInput
    priorities?: PriorityUncheckedCreateNestedManyWithoutTenantInput
    statuses?: StatusUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutWorkflowsInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutWorkflowsInput, TenantUncheckedCreateWithoutWorkflowsInput>
  }

  export type TenantUpsertWithoutWorkflowsInput = {
    update: XOR<TenantUpdateWithoutWorkflowsInput, TenantUncheckedUpdateWithoutWorkflowsInput>
    create: XOR<TenantCreateWithoutWorkflowsInput, TenantUncheckedCreateWithoutWorkflowsInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutWorkflowsInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutWorkflowsInput, TenantUncheckedUpdateWithoutWorkflowsInput>
  }

  export type TenantUpdateWithoutWorkflowsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutTenantNestedInput
    departments?: DepartmentUpdateManyWithoutTenantNestedInput
    tickets?: TicketUpdateManyWithoutTenantNestedInput
    columns?: ColumnUpdateManyWithoutTenantNestedInput
    slas?: SLAUpdateManyWithoutTenantNestedInput
    priorities?: PriorityUpdateManyWithoutTenantNestedInput
    statuses?: StatusUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutWorkflowsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutTenantNestedInput
    departments?: DepartmentUncheckedUpdateManyWithoutTenantNestedInput
    tickets?: TicketUncheckedUpdateManyWithoutTenantNestedInput
    columns?: ColumnUncheckedUpdateManyWithoutTenantNestedInput
    slas?: SLAUncheckedUpdateManyWithoutTenantNestedInput
    priorities?: PriorityUncheckedUpdateManyWithoutTenantNestedInput
    statuses?: StatusUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type TicketCreateManyPriorityInput = {
    id?: string
    tenantId: string
    title: string
    description?: string | null
    status?: string
    afterId?: string | null
    columnId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    closedAt?: Date | string | null
    deletedAt?: Date | string | null
    creatorId: string
    assigneeId?: string | null
    departmentId?: string | null
  }

  export type SLACreateManyPriorityInput = {
    id?: string
    tenantId: string
    name: string
    description?: string | null
    responseTime?: number
    resolutionTime?: number
    departmentId?: string | null
    isActive?: boolean
    escalationRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TicketUpdateWithoutPriorityInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    afterId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tenant?: TenantUpdateOneRequiredWithoutTicketsNestedInput
    column?: ColumnUpdateOneWithoutTicketsNestedInput
    creator?: UserUpdateOneRequiredWithoutTicketsCreatedNestedInput
    assignee?: UserUpdateOneWithoutTicketsAssignedNestedInput
    department?: DepartmentUpdateOneWithoutTicketsNestedInput
    comments?: TicketCommentUpdateManyWithoutTicketNestedInput
    attachments?: AttachmentUpdateManyWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateWithoutPriorityInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    afterId?: NullableStringFieldUpdateOperationsInput | string | null
    columnId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creatorId?: StringFieldUpdateOperationsInput | string
    assigneeId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: TicketCommentUncheckedUpdateManyWithoutTicketNestedInput
    attachments?: AttachmentUncheckedUpdateManyWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateManyWithoutPriorityInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    afterId?: NullableStringFieldUpdateOperationsInput | string | null
    columnId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creatorId?: StringFieldUpdateOperationsInput | string
    assigneeId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SLAUpdateWithoutPriorityInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    responseTime?: IntFieldUpdateOperationsInput | number
    resolutionTime?: IntFieldUpdateOperationsInput | number
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    escalationRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutSlasNestedInput
  }

  export type SLAUncheckedUpdateWithoutPriorityInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    responseTime?: IntFieldUpdateOperationsInput | number
    resolutionTime?: IntFieldUpdateOperationsInput | number
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    escalationRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SLAUncheckedUpdateManyWithoutPriorityInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    responseTime?: IntFieldUpdateOperationsInput | number
    resolutionTime?: IntFieldUpdateOperationsInput | number
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    escalationRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ColumnCreateManyStatusInput = {
    id?: string
    tenantId: string
    name: string
    description?: string | null
    order?: number
    color?: string | null
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ColumnUpdateWithoutStatusInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutColumnsNestedInput
    tickets?: TicketUpdateManyWithoutColumnNestedInput
  }

  export type ColumnUncheckedUpdateWithoutStatusInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tickets?: TicketUncheckedUpdateManyWithoutColumnNestedInput
  }

  export type ColumnUncheckedUpdateManyWithoutStatusInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyTenantInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    avatar?: string | null
    createdAt?: Date | string
    deletedAt?: Date | string | null
    refreshToken?: string | null
    resetPasswordToken?: string | null
    resetPasswordTokenExpiry?: Date | string | null
  }

  export type DepartmentCreateManyTenantInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TicketCreateManyTenantInput = {
    id?: string
    title: string
    description?: string | null
    status?: string
    priorityId?: string | null
    afterId?: string | null
    columnId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    closedAt?: Date | string | null
    deletedAt?: Date | string | null
    creatorId: string
    assigneeId?: string | null
    departmentId?: string | null
  }

  export type ColumnCreateManyTenantInput = {
    id?: string
    name: string
    description?: string | null
    order?: number
    color?: string | null
    isDefault?: boolean
    statusId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SLACreateManyTenantInput = {
    id?: string
    name: string
    description?: string | null
    responseTime?: number
    resolutionTime?: number
    priorityId?: string | null
    departmentId?: string | null
    isActive?: boolean
    escalationRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkflowCreateManyTenantInput = {
    id?: string
    name: string
    description?: string | null
    rules: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PriorityCreateManyTenantInput = {
    id?: string
    name: string
    color: string
    order?: number
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StatusCreateManyTenantInput = {
    id?: string
    name: string
    color: string
    order?: number
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ticketsCreated?: TicketUpdateManyWithoutCreatorNestedInput
    ticketsAssigned?: TicketUpdateManyWithoutAssigneeNestedInput
    comments?: TicketCommentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ticketsCreated?: TicketUncheckedUpdateManyWithoutCreatorNestedInput
    ticketsAssigned?: TicketUncheckedUpdateManyWithoutAssigneeNestedInput
    comments?: TicketCommentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DepartmentUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tickets?: TicketUpdateManyWithoutDepartmentNestedInput
  }

  export type DepartmentUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tickets?: TicketUncheckedUpdateManyWithoutDepartmentNestedInput
  }

  export type DepartmentUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    afterId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: PriorityUpdateOneWithoutTicketsNestedInput
    column?: ColumnUpdateOneWithoutTicketsNestedInput
    creator?: UserUpdateOneRequiredWithoutTicketsCreatedNestedInput
    assignee?: UserUpdateOneWithoutTicketsAssignedNestedInput
    department?: DepartmentUpdateOneWithoutTicketsNestedInput
    comments?: TicketCommentUpdateManyWithoutTicketNestedInput
    attachments?: AttachmentUpdateManyWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priorityId?: NullableStringFieldUpdateOperationsInput | string | null
    afterId?: NullableStringFieldUpdateOperationsInput | string | null
    columnId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creatorId?: StringFieldUpdateOperationsInput | string
    assigneeId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: TicketCommentUncheckedUpdateManyWithoutTicketNestedInput
    attachments?: AttachmentUncheckedUpdateManyWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priorityId?: NullableStringFieldUpdateOperationsInput | string | null
    afterId?: NullableStringFieldUpdateOperationsInput | string | null
    columnId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creatorId?: StringFieldUpdateOperationsInput | string
    assigneeId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ColumnUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StatusUpdateOneWithoutColumnsNestedInput
    tickets?: TicketUpdateManyWithoutColumnNestedInput
  }

  export type ColumnUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    statusId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tickets?: TicketUncheckedUpdateManyWithoutColumnNestedInput
  }

  export type ColumnUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    statusId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SLAUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    responseTime?: IntFieldUpdateOperationsInput | number
    resolutionTime?: IntFieldUpdateOperationsInput | number
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    escalationRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    priority?: PriorityUpdateOneWithoutSlasNestedInput
  }

  export type SLAUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    responseTime?: IntFieldUpdateOperationsInput | number
    resolutionTime?: IntFieldUpdateOperationsInput | number
    priorityId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    escalationRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SLAUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    responseTime?: IntFieldUpdateOperationsInput | number
    resolutionTime?: IntFieldUpdateOperationsInput | number
    priorityId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    escalationRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkflowUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    rules?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkflowUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    rules?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkflowUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    rules?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriorityUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tickets?: TicketUpdateManyWithoutPriorityNestedInput
    slas?: SLAUpdateManyWithoutPriorityNestedInput
  }

  export type PriorityUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tickets?: TicketUncheckedUpdateManyWithoutPriorityNestedInput
    slas?: SLAUncheckedUpdateManyWithoutPriorityNestedInput
  }

  export type PriorityUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StatusUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    columns?: ColumnUpdateManyWithoutStatusNestedInput
  }

  export type StatusUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    columns?: ColumnUncheckedUpdateManyWithoutStatusNestedInput
  }

  export type StatusUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketCreateManyCreatorInput = {
    id?: string
    tenantId: string
    title: string
    description?: string | null
    status?: string
    priorityId?: string | null
    afterId?: string | null
    columnId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    closedAt?: Date | string | null
    deletedAt?: Date | string | null
    assigneeId?: string | null
    departmentId?: string | null
  }

  export type TicketCreateManyAssigneeInput = {
    id?: string
    tenantId: string
    title: string
    description?: string | null
    status?: string
    priorityId?: string | null
    afterId?: string | null
    columnId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    closedAt?: Date | string | null
    deletedAt?: Date | string | null
    creatorId: string
    departmentId?: string | null
  }

  export type TicketCommentCreateManyUserInput = {
    id?: string
    ticketId: string
    comment: string
    createdAt?: Date | string
  }

  export type TicketUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    afterId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tenant?: TenantUpdateOneRequiredWithoutTicketsNestedInput
    priority?: PriorityUpdateOneWithoutTicketsNestedInput
    column?: ColumnUpdateOneWithoutTicketsNestedInput
    assignee?: UserUpdateOneWithoutTicketsAssignedNestedInput
    department?: DepartmentUpdateOneWithoutTicketsNestedInput
    comments?: TicketCommentUpdateManyWithoutTicketNestedInput
    attachments?: AttachmentUpdateManyWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priorityId?: NullableStringFieldUpdateOperationsInput | string | null
    afterId?: NullableStringFieldUpdateOperationsInput | string | null
    columnId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assigneeId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: TicketCommentUncheckedUpdateManyWithoutTicketNestedInput
    attachments?: AttachmentUncheckedUpdateManyWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateManyWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priorityId?: NullableStringFieldUpdateOperationsInput | string | null
    afterId?: NullableStringFieldUpdateOperationsInput | string | null
    columnId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assigneeId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TicketUpdateWithoutAssigneeInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    afterId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tenant?: TenantUpdateOneRequiredWithoutTicketsNestedInput
    priority?: PriorityUpdateOneWithoutTicketsNestedInput
    column?: ColumnUpdateOneWithoutTicketsNestedInput
    creator?: UserUpdateOneRequiredWithoutTicketsCreatedNestedInput
    department?: DepartmentUpdateOneWithoutTicketsNestedInput
    comments?: TicketCommentUpdateManyWithoutTicketNestedInput
    attachments?: AttachmentUpdateManyWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateWithoutAssigneeInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priorityId?: NullableStringFieldUpdateOperationsInput | string | null
    afterId?: NullableStringFieldUpdateOperationsInput | string | null
    columnId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creatorId?: StringFieldUpdateOperationsInput | string
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: TicketCommentUncheckedUpdateManyWithoutTicketNestedInput
    attachments?: AttachmentUncheckedUpdateManyWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateManyWithoutAssigneeInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priorityId?: NullableStringFieldUpdateOperationsInput | string | null
    afterId?: NullableStringFieldUpdateOperationsInput | string | null
    columnId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creatorId?: StringFieldUpdateOperationsInput | string
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TicketCommentUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ticket?: TicketUpdateOneRequiredWithoutCommentsNestedInput
    attachments?: AttachmentUpdateManyWithoutCommentNestedInput
  }

  export type TicketCommentUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    ticketId?: StringFieldUpdateOperationsInput | string
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attachments?: AttachmentUncheckedUpdateManyWithoutCommentNestedInput
  }

  export type TicketCommentUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    ticketId?: StringFieldUpdateOperationsInput | string
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketCreateManyDepartmentInput = {
    id?: string
    tenantId: string
    title: string
    description?: string | null
    status?: string
    priorityId?: string | null
    afterId?: string | null
    columnId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    closedAt?: Date | string | null
    deletedAt?: Date | string | null
    creatorId: string
    assigneeId?: string | null
  }

  export type TicketUpdateWithoutDepartmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    afterId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tenant?: TenantUpdateOneRequiredWithoutTicketsNestedInput
    priority?: PriorityUpdateOneWithoutTicketsNestedInput
    column?: ColumnUpdateOneWithoutTicketsNestedInput
    creator?: UserUpdateOneRequiredWithoutTicketsCreatedNestedInput
    assignee?: UserUpdateOneWithoutTicketsAssignedNestedInput
    comments?: TicketCommentUpdateManyWithoutTicketNestedInput
    attachments?: AttachmentUpdateManyWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateWithoutDepartmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priorityId?: NullableStringFieldUpdateOperationsInput | string | null
    afterId?: NullableStringFieldUpdateOperationsInput | string | null
    columnId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creatorId?: StringFieldUpdateOperationsInput | string
    assigneeId?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: TicketCommentUncheckedUpdateManyWithoutTicketNestedInput
    attachments?: AttachmentUncheckedUpdateManyWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateManyWithoutDepartmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priorityId?: NullableStringFieldUpdateOperationsInput | string | null
    afterId?: NullableStringFieldUpdateOperationsInput | string | null
    columnId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creatorId?: StringFieldUpdateOperationsInput | string
    assigneeId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TicketCreateManyColumnInput = {
    id?: string
    tenantId: string
    title: string
    description?: string | null
    status?: string
    priorityId?: string | null
    afterId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    closedAt?: Date | string | null
    deletedAt?: Date | string | null
    creatorId: string
    assigneeId?: string | null
    departmentId?: string | null
  }

  export type TicketUpdateWithoutColumnInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    afterId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tenant?: TenantUpdateOneRequiredWithoutTicketsNestedInput
    priority?: PriorityUpdateOneWithoutTicketsNestedInput
    creator?: UserUpdateOneRequiredWithoutTicketsCreatedNestedInput
    assignee?: UserUpdateOneWithoutTicketsAssignedNestedInput
    department?: DepartmentUpdateOneWithoutTicketsNestedInput
    comments?: TicketCommentUpdateManyWithoutTicketNestedInput
    attachments?: AttachmentUpdateManyWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateWithoutColumnInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priorityId?: NullableStringFieldUpdateOperationsInput | string | null
    afterId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creatorId?: StringFieldUpdateOperationsInput | string
    assigneeId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: TicketCommentUncheckedUpdateManyWithoutTicketNestedInput
    attachments?: AttachmentUncheckedUpdateManyWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateManyWithoutColumnInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priorityId?: NullableStringFieldUpdateOperationsInput | string | null
    afterId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creatorId?: StringFieldUpdateOperationsInput | string
    assigneeId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TicketCommentCreateManyTicketInput = {
    id?: string
    userId: string
    comment: string
    createdAt?: Date | string
  }

  export type AttachmentCreateManyTicketInput = {
    id?: string
    filename: string
    originalName: string
    mimeType: string
    size: number
    filePath: string
    url: string
    commentId?: string | null
    uploadedBy: string
    tenantId: string
    uploadedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type TicketCommentUpdateWithoutTicketInput = {
    id?: StringFieldUpdateOperationsInput | string
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCommentsNestedInput
    attachments?: AttachmentUpdateManyWithoutCommentNestedInput
  }

  export type TicketCommentUncheckedUpdateWithoutTicketInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attachments?: AttachmentUncheckedUpdateManyWithoutCommentNestedInput
  }

  export type TicketCommentUncheckedUpdateManyWithoutTicketInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttachmentUpdateWithoutTicketInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    filePath?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    uploadedBy?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comment?: TicketCommentUpdateOneWithoutAttachmentsNestedInput
  }

  export type AttachmentUncheckedUpdateWithoutTicketInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    filePath?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    commentId?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedBy?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AttachmentUncheckedUpdateManyWithoutTicketInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    filePath?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    commentId?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedBy?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AttachmentCreateManyCommentInput = {
    id?: string
    filename: string
    originalName: string
    mimeType: string
    size: number
    filePath: string
    url: string
    ticketId?: string | null
    uploadedBy: string
    tenantId: string
    uploadedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type AttachmentUpdateWithoutCommentInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    filePath?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    uploadedBy?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ticket?: TicketUpdateOneWithoutAttachmentsNestedInput
  }

  export type AttachmentUncheckedUpdateWithoutCommentInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    filePath?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    ticketId?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedBy?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AttachmentUncheckedUpdateManyWithoutCommentInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    filePath?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    ticketId?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedBy?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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