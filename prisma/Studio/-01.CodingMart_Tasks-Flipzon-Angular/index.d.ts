import {
  DMMF,
  DMMFClass,
  Engine,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  sqltag as sql,
  empty,
  join,
  raw,
} from './runtime';

export { PrismaClientKnownRequestError }
export { PrismaClientUnknownRequestError }
export { PrismaClientRustPanicError }
export { PrismaClientInitializationError }
export { PrismaClientValidationError }

/**
 * Re-export of sql-template-tag
 */
export { sql, empty, join, raw }

/**
 * Prisma Client JS version: 2.7.1
 * Query Engine version: 5c2ad460cf4fe8c9330e6640b266c046542c8b6a
 */
export declare type PrismaVersion = {
  client: string
}

export declare const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON object.
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
 */
export declare type JsonObject = {[Key in string]?: JsonValue}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON array.
 */
export declare interface JsonArray extends Array<JsonValue> {}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
export declare type JsonValue = string | number | boolean | null | JsonObject | JsonArray

/**
 * Same as JsonObject, but allows undefined
 */
export declare type InputJsonObject = {[Key in string]?: JsonValue}
 
export declare interface InputJsonArray extends Array<JsonValue> {}
 
export declare type InputJsonValue = undefined |  string | number | boolean | null | InputJsonObject | InputJsonArray

declare type SelectAndInclude = {
  select: any
  include: any
}

declare type HasSelect = {
  select: any
}

declare type HasInclude = {
  include: any
}

declare type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export declare type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export declare type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export declare type Enumerable<T> = T | Array<T>;

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

export declare type TruthyKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

export declare type TrueKeys<T> = TruthyKeys<Pick<T, RequiredKeys<T>>>

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};
declare class PrismaClientFetcher {
  private readonly prisma;
  private readonly debug;
  private readonly hooks?;
  constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
  request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
  sanitizeMessage(message: string): string;
  protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}


/**
 * Client
**/

export declare type Datasource = {
  url?: string
}

export type Datasources = {
  db?: Datasource
}

export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

export interface PrismaClientOptions {
  /**
   * Overwrites the datasource url from your prisma.schema file
   */
  datasources?: Datasources

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
   *  { emit: 'stdout', level: 'query' },
   *  { emit: 'stdout', level: 'info' },
   *  { emit: 'stdout', level: 'warn' }
   *  { emit: 'stdout', level: 'error' }
   * ]
   * ```
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
   */
  log?: Array<LogLevel | LogDefinition>
}

export type Hooks = {
  beforeRequest?: (options: {query: string, path: string[], rootField?: string, typeName?: string, document: any}) => any
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
  | 'findOne'
  | 'findMany'
  | 'create'
  | 'update'
  | 'updateMany'
  | 'upsert'
  | 'delete'
  | 'deleteMany'
  | 'executeRaw'
  | 'queryRaw'
  | 'aggregate'

/**
 * These options are being passed in to the middleware as "params"
 */
export type MiddlewareParams = {
  model?: string
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
  next: (params: MiddlewareParams) => Promise<T>,
) => Promise<T>

// tested in getLogLevel.test.ts
export declare function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Admins
 * const admins = await prisma.admin.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export declare class PrismaClient<
  T extends PrismaClientOptions = PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<LogLevel | LogDefinition> ? GetEvents<T['log']> : never : never
> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;
  /**
   * @private
   */
  private engine: Engine;
  /**
   * @private
   */
  private errorFormat: ErrorFormat;

  /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Admins
   * const admins = await prisma.admin.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */
  constructor(optionsArg?: T);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * @deprecated renamed to `$on`
   */
  on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * Connect with the database
   */
  $connect(): Promise<void>;
  /**
   * @deprecated renamed to `$connect`
   */
  connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;
  /**
   * @deprecated renamed to `$disconnect`
   */
  disconnect(): Promise<any>;

  /**
   * Add a middleware
   */
  $use(cb: Middleware): void

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.executeRaw``, values will be escaped automatically
   * const result = await prisma.executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $executeRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<number>;

  /**
   * @deprecated renamed to `$executeRaw`
   */
  executeRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.queryRaw``, values will be escaped automatically
   * const result = await prisma.queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $queryRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;
 
  /**
   * @deprecated renamed to `$queryRaw`
   */
  queryRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;

  /**
   * Execute queries in a transaction
   * @example
   * ```
   * const [george, bob, alice] = await prisma.transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   */
  $transaction: PromiseConstructor['all']
  /**
   * @deprecated renamed to `$transaction`
   */
  transaction: PromiseConstructor['all']

  /**
   * `prisma.admin`: Exposes CRUD operations for the **Admin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Admins
    * const admins = await prisma.admin.findMany()
    * ```
    */
  get admin(): AdminDelegate;

  /**
   * `prisma.brands`: Exposes CRUD operations for the **Brands** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Brands
    * const brands = await prisma.brands.findMany()
    * ```
    */
  get brands(): BrandsDelegate;

  /**
   * `prisma.buy`: Exposes CRUD operations for the **Buy** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Buys
    * const buys = await prisma.buy.findMany()
    * ```
    */
  get buy(): BuyDelegate;

  /**
   * `prisma.cart`: Exposes CRUD operations for the **Cart** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Carts
    * const carts = await prisma.cart.findMany()
    * ```
    */
  get cart(): CartDelegate;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): CategoryDelegate;

  /**
   * `prisma.products`: Exposes CRUD operations for the **Products** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.products.findMany()
    * ```
    */
  get products(): ProductsDelegate;

  /**
   * `prisma.reviews`: Exposes CRUD operations for the **Reviews** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reviews
    * const reviews = await prisma.reviews.findMany()
    * ```
    */
  get reviews(): ReviewsDelegate;

  /**
   * `prisma.status`: Exposes CRUD operations for the **Status** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Statuses
    * const statuses = await prisma.status.findMany()
    * ```
    */
  get status(): StatusDelegate;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): UserDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const AdminDistinctFieldEnum: {
  admin_id: 'admin_id',
  admin_name: 'admin_name',
  admin_mail: 'admin_mail',
  password: 'password',
  address: 'address',
  phone: 'phone'
};

export declare type AdminDistinctFieldEnum = (typeof AdminDistinctFieldEnum)[keyof typeof AdminDistinctFieldEnum]


export declare const BrandsDistinctFieldEnum: {
  brand: 'brand',
  bid: 'bid',
  categories: 'categories'
};

export declare type BrandsDistinctFieldEnum = (typeof BrandsDistinctFieldEnum)[keyof typeof BrandsDistinctFieldEnum]


export declare const BuyDistinctFieldEnum: {
  buyid: 'buyid',
  uid: 'uid',
  pid: 'pid',
  buying_date: 'buying_date',
  shiping_date: 'shiping_date',
  delivery_date: 'delivery_date',
  total_amount: 'total_amount',
  quantity: 'quantity',
  status: 'status'
};

export declare type BuyDistinctFieldEnum = (typeof BuyDistinctFieldEnum)[keyof typeof BuyDistinctFieldEnum]


export declare const CartDistinctFieldEnum: {
  cart_id: 'cart_id',
  uid: 'uid',
  pid: 'pid'
};

export declare type CartDistinctFieldEnum = (typeof CartDistinctFieldEnum)[keyof typeof CartDistinctFieldEnum]


export declare const CategoryDistinctFieldEnum: {
  category: 'category',
  cid: 'cid'
};

export declare type CategoryDistinctFieldEnum = (typeof CategoryDistinctFieldEnum)[keyof typeof CategoryDistinctFieldEnum]


export declare const ProductsDistinctFieldEnum: {
  pid: 'pid',
  productname: 'productname',
  rate: 'rate',
  description: 'description',
  discount: 'discount',
  rating: 'rating',
  cid: 'cid',
  bid: 'bid',
  images: 'images'
};

export declare type ProductsDistinctFieldEnum = (typeof ProductsDistinctFieldEnum)[keyof typeof ProductsDistinctFieldEnum]


export declare const ReviewsDistinctFieldEnum: {
  rid: 'rid',
  uid: 'uid',
  pid: 'pid',
  review: 'review',
  rating: 'rating',
  buyid: 'buyid',
  uploaded_date: 'uploaded_date'
};

export declare type ReviewsDistinctFieldEnum = (typeof ReviewsDistinctFieldEnum)[keyof typeof ReviewsDistinctFieldEnum]


export declare const StatusDistinctFieldEnum: {
  sid: 'sid',
  statusName: 'statusName'
};

export declare type StatusDistinctFieldEnum = (typeof StatusDistinctFieldEnum)[keyof typeof StatusDistinctFieldEnum]


export declare const UserDistinctFieldEnum: {
  name: 'name',
  email: 'email',
  address: 'address',
  phone: 'phone',
  password: 'password',
  id: 'id'
};

export declare type UserDistinctFieldEnum = (typeof UserDistinctFieldEnum)[keyof typeof UserDistinctFieldEnum]


export declare const SortOrder: {
  asc: 'asc',
  desc: 'desc'
};

export declare type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]



/**
 * Model Admin
 */

export type Admin = {
  admin_id: number
  admin_name: string
  admin_mail: string
  password: string
  address: string
  phone: string | null
}


export type AggregateAdmin = {
  count: number
  avg: AdminAvgAggregateOutputType | null
  sum: AdminSumAggregateOutputType | null
  min: AdminMinAggregateOutputType | null
  max: AdminMaxAggregateOutputType | null
}

export type AdminAvgAggregateOutputType = {
  admin_id: number
}

export type AdminSumAggregateOutputType = {
  admin_id: number
}

export type AdminMinAggregateOutputType = {
  admin_id: number
}

export type AdminMaxAggregateOutputType = {
  admin_id: number
}


export type AdminAvgAggregateInputType = {
  admin_id?: true
}

export type AdminSumAggregateInputType = {
  admin_id?: true
}

export type AdminMinAggregateInputType = {
  admin_id?: true
}

export type AdminMaxAggregateInputType = {
  admin_id?: true
}

export type AggregateAdminArgs = {
  where?: AdminWhereInput
  orderBy?: Enumerable<AdminOrderByInput>
  cursor?: AdminWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<AdminDistinctFieldEnum>
  count?: true
  avg?: AdminAvgAggregateInputType
  sum?: AdminSumAggregateInputType
  min?: AdminMinAggregateInputType
  max?: AdminMaxAggregateInputType
}

export type GetAdminAggregateType<T extends AggregateAdminArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetAdminAggregateScalarType<T[P]>
}

export type GetAdminAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof AdminAvgAggregateOutputType ? AdminAvgAggregateOutputType[P] : never
}
    
    

export type AdminSelect = {
  admin_id?: boolean
  admin_name?: boolean
  admin_mail?: boolean
  password?: boolean
  address?: boolean
  phone?: boolean
}

export type AdminGetPayload<
  S extends boolean | null | undefined | AdminArgs,
  U = keyof S
> = S extends true
  ? Admin
  : S extends undefined
  ? never
  : S extends AdminArgs | FindManyAdminArgs
  ? 'include' extends U
    ? Admin 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Admin ? Admin[P]
: 
 never
    }
  : Admin
: Admin


export interface AdminDelegate {
  /**
   * Find zero or one Admin.
   * @param {FindOneAdminArgs} args - Arguments to find a Admin
   * @example
   * // Get one Admin
   * const admin = await prisma.admin.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneAdminArgs>(
    args: Subset<T, FindOneAdminArgs>
  ): CheckSelect<T, Prisma__AdminClient<Admin | null>, Prisma__AdminClient<AdminGetPayload<T> | null>>
  /**
   * Find zero or more Admins.
   * @param {FindManyAdminArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Admins
   * const admins = await prisma.admin.findMany()
   * 
   * // Get first 10 Admins
   * const admins = await prisma.admin.findMany({ take: 10 })
   * 
   * // Only select the `admin_id`
   * const adminWithAdmin_idOnly = await prisma.admin.findMany({ select: { admin_id: true } })
   * 
  **/
  findMany<T extends FindManyAdminArgs>(
    args?: Subset<T, FindManyAdminArgs>
  ): CheckSelect<T, Promise<Array<Admin>>, Promise<Array<AdminGetPayload<T>>>>
  /**
   * Create a Admin.
   * @param {AdminCreateArgs} args - Arguments to create a Admin.
   * @example
   * // Create one Admin
   * const Admin = await prisma.admin.create({
   *   data: {
   *     // ... data to create a Admin
   *   }
   * })
   * 
  **/
  create<T extends AdminCreateArgs>(
    args: Subset<T, AdminCreateArgs>
  ): CheckSelect<T, Prisma__AdminClient<Admin>, Prisma__AdminClient<AdminGetPayload<T>>>
  /**
   * Delete a Admin.
   * @param {AdminDeleteArgs} args - Arguments to delete one Admin.
   * @example
   * // Delete one Admin
   * const Admin = await prisma.admin.delete({
   *   where: {
   *     // ... filter to delete one Admin
   *   }
   * })
   * 
  **/
  delete<T extends AdminDeleteArgs>(
    args: Subset<T, AdminDeleteArgs>
  ): CheckSelect<T, Prisma__AdminClient<Admin>, Prisma__AdminClient<AdminGetPayload<T>>>
  /**
   * Update one Admin.
   * @param {AdminUpdateArgs} args - Arguments to update one Admin.
   * @example
   * // Update one Admin
   * const admin = await prisma.admin.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends AdminUpdateArgs>(
    args: Subset<T, AdminUpdateArgs>
  ): CheckSelect<T, Prisma__AdminClient<Admin>, Prisma__AdminClient<AdminGetPayload<T>>>
  /**
   * Delete zero or more Admins.
   * @param {AdminDeleteManyArgs} args - Arguments to filter Admins to delete.
   * @example
   * // Delete a few Admins
   * const { count } = await prisma.admin.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends AdminDeleteManyArgs>(
    args: Subset<T, AdminDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Admins.
   * @param {AdminUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Admins
   * const admin = await prisma.admin.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends AdminUpdateManyArgs>(
    args: Subset<T, AdminUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Admin.
   * @param {AdminUpsertArgs} args - Arguments to update or create a Admin.
   * @example
   * // Update or create a Admin
   * const admin = await prisma.admin.upsert({
   *   create: {
   *     // ... data to create a Admin
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Admin we want to update
   *   }
   * })
  **/
  upsert<T extends AdminUpsertArgs>(
    args: Subset<T, AdminUpsertArgs>
  ): CheckSelect<T, Prisma__AdminClient<Admin>, Prisma__AdminClient<AdminGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyAdminArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateAdminArgs>(args: Subset<T, AggregateAdminArgs>): Promise<GetAdminAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Admin.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__AdminClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Admin findOne
 */
export type FindOneAdminArgs = {
  /**
   * Select specific fields to fetch from the Admin
  **/
  select?: AdminSelect | null
  /**
   * Filter, which Admin to fetch.
  **/
  where: AdminWhereUniqueInput
}


/**
 * Admin findMany
 */
export type FindManyAdminArgs = {
  /**
   * Select specific fields to fetch from the Admin
  **/
  select?: AdminSelect | null
  /**
   * Filter, which Admins to fetch.
  **/
  where?: AdminWhereInput
  /**
   * Determine the order of the Admins to fetch.
  **/
  orderBy?: Enumerable<AdminOrderByInput>
  /**
   * Sets the position for listing Admins.
  **/
  cursor?: AdminWhereUniqueInput
  /**
   * The number of Admins to fetch. If negative number, it will take Admins before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Admins.
  **/
  skip?: number
  distinct?: Enumerable<AdminDistinctFieldEnum>
}


/**
 * Admin create
 */
export type AdminCreateArgs = {
  /**
   * Select specific fields to fetch from the Admin
  **/
  select?: AdminSelect | null
  /**
   * The data needed to create a Admin.
  **/
  data: AdminCreateInput
}


/**
 * Admin update
 */
export type AdminUpdateArgs = {
  /**
   * Select specific fields to fetch from the Admin
  **/
  select?: AdminSelect | null
  /**
   * The data needed to update a Admin.
  **/
  data: AdminUpdateInput
  /**
   * Choose, which Admin to update.
  **/
  where: AdminWhereUniqueInput
}


/**
 * Admin updateMany
 */
export type AdminUpdateManyArgs = {
  data: AdminUpdateManyMutationInput
  where?: AdminWhereInput
}


/**
 * Admin upsert
 */
export type AdminUpsertArgs = {
  /**
   * Select specific fields to fetch from the Admin
  **/
  select?: AdminSelect | null
  /**
   * The filter to search for the Admin to update in case it exists.
  **/
  where: AdminWhereUniqueInput
  /**
   * In case the Admin found by the `where` argument doesn't exist, create a new Admin with this data.
  **/
  create: AdminCreateInput
  /**
   * In case the Admin was found with the provided `where` argument, update it with this data.
  **/
  update: AdminUpdateInput
}


/**
 * Admin delete
 */
export type AdminDeleteArgs = {
  /**
   * Select specific fields to fetch from the Admin
  **/
  select?: AdminSelect | null
  /**
   * Filter which Admin to delete.
  **/
  where: AdminWhereUniqueInput
}


/**
 * Admin deleteMany
 */
export type AdminDeleteManyArgs = {
  where?: AdminWhereInput
}


/**
 * Admin without action
 */
export type AdminArgs = {
  /**
   * Select specific fields to fetch from the Admin
  **/
  select?: AdminSelect | null
}



/**
 * Model Brands
 */

export type Brands = {
  brand: string
  bid: number
  categories: string[]
}


export type AggregateBrands = {
  count: number
  avg: BrandsAvgAggregateOutputType | null
  sum: BrandsSumAggregateOutputType | null
  min: BrandsMinAggregateOutputType | null
  max: BrandsMaxAggregateOutputType | null
}

export type BrandsAvgAggregateOutputType = {
  bid: number
}

export type BrandsSumAggregateOutputType = {
  bid: number
}

export type BrandsMinAggregateOutputType = {
  bid: number
}

export type BrandsMaxAggregateOutputType = {
  bid: number
}


export type BrandsAvgAggregateInputType = {
  bid?: true
}

export type BrandsSumAggregateInputType = {
  bid?: true
}

export type BrandsMinAggregateInputType = {
  bid?: true
}

export type BrandsMaxAggregateInputType = {
  bid?: true
}

export type AggregateBrandsArgs = {
  where?: BrandsWhereInput
  orderBy?: Enumerable<BrandsOrderByInput>
  cursor?: BrandsWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<BrandsDistinctFieldEnum>
  count?: true
  avg?: BrandsAvgAggregateInputType
  sum?: BrandsSumAggregateInputType
  min?: BrandsMinAggregateInputType
  max?: BrandsMaxAggregateInputType
}

export type GetBrandsAggregateType<T extends AggregateBrandsArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetBrandsAggregateScalarType<T[P]>
}

export type GetBrandsAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof BrandsAvgAggregateOutputType ? BrandsAvgAggregateOutputType[P] : never
}
    
    

export type BrandsSelect = {
  brand?: boolean
  bid?: boolean
  categories?: boolean
}

export type BrandsGetPayload<
  S extends boolean | null | undefined | BrandsArgs,
  U = keyof S
> = S extends true
  ? Brands
  : S extends undefined
  ? never
  : S extends BrandsArgs | FindManyBrandsArgs
  ? 'include' extends U
    ? Brands 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Brands ? Brands[P]
: 
 never
    }
  : Brands
: Brands


export interface BrandsDelegate {
  /**
   * Find zero or one Brands.
   * @param {FindOneBrandsArgs} args - Arguments to find a Brands
   * @example
   * // Get one Brands
   * const brands = await prisma.brands.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneBrandsArgs>(
    args: Subset<T, FindOneBrandsArgs>
  ): CheckSelect<T, Prisma__BrandsClient<Brands | null>, Prisma__BrandsClient<BrandsGetPayload<T> | null>>
  /**
   * Find zero or more Brands.
   * @param {FindManyBrandsArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Brands
   * const brands = await prisma.brands.findMany()
   * 
   * // Get first 10 Brands
   * const brands = await prisma.brands.findMany({ take: 10 })
   * 
   * // Only select the `brand`
   * const brandsWithBrandOnly = await prisma.brands.findMany({ select: { brand: true } })
   * 
  **/
  findMany<T extends FindManyBrandsArgs>(
    args?: Subset<T, FindManyBrandsArgs>
  ): CheckSelect<T, Promise<Array<Brands>>, Promise<Array<BrandsGetPayload<T>>>>
  /**
   * Create a Brands.
   * @param {BrandsCreateArgs} args - Arguments to create a Brands.
   * @example
   * // Create one Brands
   * const Brands = await prisma.brands.create({
   *   data: {
   *     // ... data to create a Brands
   *   }
   * })
   * 
  **/
  create<T extends BrandsCreateArgs>(
    args: Subset<T, BrandsCreateArgs>
  ): CheckSelect<T, Prisma__BrandsClient<Brands>, Prisma__BrandsClient<BrandsGetPayload<T>>>
  /**
   * Delete a Brands.
   * @param {BrandsDeleteArgs} args - Arguments to delete one Brands.
   * @example
   * // Delete one Brands
   * const Brands = await prisma.brands.delete({
   *   where: {
   *     // ... filter to delete one Brands
   *   }
   * })
   * 
  **/
  delete<T extends BrandsDeleteArgs>(
    args: Subset<T, BrandsDeleteArgs>
  ): CheckSelect<T, Prisma__BrandsClient<Brands>, Prisma__BrandsClient<BrandsGetPayload<T>>>
  /**
   * Update one Brands.
   * @param {BrandsUpdateArgs} args - Arguments to update one Brands.
   * @example
   * // Update one Brands
   * const brands = await prisma.brands.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends BrandsUpdateArgs>(
    args: Subset<T, BrandsUpdateArgs>
  ): CheckSelect<T, Prisma__BrandsClient<Brands>, Prisma__BrandsClient<BrandsGetPayload<T>>>
  /**
   * Delete zero or more Brands.
   * @param {BrandsDeleteManyArgs} args - Arguments to filter Brands to delete.
   * @example
   * // Delete a few Brands
   * const { count } = await prisma.brands.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends BrandsDeleteManyArgs>(
    args: Subset<T, BrandsDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Brands.
   * @param {BrandsUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Brands
   * const brands = await prisma.brands.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends BrandsUpdateManyArgs>(
    args: Subset<T, BrandsUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Brands.
   * @param {BrandsUpsertArgs} args - Arguments to update or create a Brands.
   * @example
   * // Update or create a Brands
   * const brands = await prisma.brands.upsert({
   *   create: {
   *     // ... data to create a Brands
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Brands we want to update
   *   }
   * })
  **/
  upsert<T extends BrandsUpsertArgs>(
    args: Subset<T, BrandsUpsertArgs>
  ): CheckSelect<T, Prisma__BrandsClient<Brands>, Prisma__BrandsClient<BrandsGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyBrandsArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateBrandsArgs>(args: Subset<T, AggregateBrandsArgs>): Promise<GetBrandsAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Brands.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__BrandsClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Brands findOne
 */
export type FindOneBrandsArgs = {
  /**
   * Select specific fields to fetch from the Brands
  **/
  select?: BrandsSelect | null
  /**
   * Filter, which Brands to fetch.
  **/
  where: BrandsWhereUniqueInput
}


/**
 * Brands findMany
 */
export type FindManyBrandsArgs = {
  /**
   * Select specific fields to fetch from the Brands
  **/
  select?: BrandsSelect | null
  /**
   * Filter, which Brands to fetch.
  **/
  where?: BrandsWhereInput
  /**
   * Determine the order of the Brands to fetch.
  **/
  orderBy?: Enumerable<BrandsOrderByInput>
  /**
   * Sets the position for listing Brands.
  **/
  cursor?: BrandsWhereUniqueInput
  /**
   * The number of Brands to fetch. If negative number, it will take Brands before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Brands.
  **/
  skip?: number
  distinct?: Enumerable<BrandsDistinctFieldEnum>
}


/**
 * Brands create
 */
export type BrandsCreateArgs = {
  /**
   * Select specific fields to fetch from the Brands
  **/
  select?: BrandsSelect | null
  /**
   * The data needed to create a Brands.
  **/
  data: BrandsCreateInput
}


/**
 * Brands update
 */
export type BrandsUpdateArgs = {
  /**
   * Select specific fields to fetch from the Brands
  **/
  select?: BrandsSelect | null
  /**
   * The data needed to update a Brands.
  **/
  data: BrandsUpdateInput
  /**
   * Choose, which Brands to update.
  **/
  where: BrandsWhereUniqueInput
}


/**
 * Brands updateMany
 */
export type BrandsUpdateManyArgs = {
  data: BrandsUpdateManyMutationInput
  where?: BrandsWhereInput
}


/**
 * Brands upsert
 */
export type BrandsUpsertArgs = {
  /**
   * Select specific fields to fetch from the Brands
  **/
  select?: BrandsSelect | null
  /**
   * The filter to search for the Brands to update in case it exists.
  **/
  where: BrandsWhereUniqueInput
  /**
   * In case the Brands found by the `where` argument doesn't exist, create a new Brands with this data.
  **/
  create: BrandsCreateInput
  /**
   * In case the Brands was found with the provided `where` argument, update it with this data.
  **/
  update: BrandsUpdateInput
}


/**
 * Brands delete
 */
export type BrandsDeleteArgs = {
  /**
   * Select specific fields to fetch from the Brands
  **/
  select?: BrandsSelect | null
  /**
   * Filter which Brands to delete.
  **/
  where: BrandsWhereUniqueInput
}


/**
 * Brands deleteMany
 */
export type BrandsDeleteManyArgs = {
  where?: BrandsWhereInput
}


/**
 * Brands without action
 */
export type BrandsArgs = {
  /**
   * Select specific fields to fetch from the Brands
  **/
  select?: BrandsSelect | null
}



/**
 * Model Buy
 */

export type Buy = {
  buyid: number
  uid: number
  pid: number
  buying_date: Date
  shiping_date: Date | null
  delivery_date: Date | null
  total_amount: number
  quantity: number
  status: number
}


export type AggregateBuy = {
  count: number
  avg: BuyAvgAggregateOutputType | null
  sum: BuySumAggregateOutputType | null
  min: BuyMinAggregateOutputType | null
  max: BuyMaxAggregateOutputType | null
}

export type BuyAvgAggregateOutputType = {
  buyid: number
  uid: number
  pid: number
  total_amount: number
  quantity: number
  status: number
}

export type BuySumAggregateOutputType = {
  buyid: number
  uid: number
  pid: number
  total_amount: number
  quantity: number
  status: number
}

export type BuyMinAggregateOutputType = {
  buyid: number
  uid: number
  pid: number
  total_amount: number
  quantity: number
  status: number
}

export type BuyMaxAggregateOutputType = {
  buyid: number
  uid: number
  pid: number
  total_amount: number
  quantity: number
  status: number
}


export type BuyAvgAggregateInputType = {
  buyid?: true
  uid?: true
  pid?: true
  total_amount?: true
  quantity?: true
  status?: true
}

export type BuySumAggregateInputType = {
  buyid?: true
  uid?: true
  pid?: true
  total_amount?: true
  quantity?: true
  status?: true
}

export type BuyMinAggregateInputType = {
  buyid?: true
  uid?: true
  pid?: true
  total_amount?: true
  quantity?: true
  status?: true
}

export type BuyMaxAggregateInputType = {
  buyid?: true
  uid?: true
  pid?: true
  total_amount?: true
  quantity?: true
  status?: true
}

export type AggregateBuyArgs = {
  where?: BuyWhereInput
  orderBy?: Enumerable<BuyOrderByInput>
  cursor?: BuyWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<BuyDistinctFieldEnum>
  count?: true
  avg?: BuyAvgAggregateInputType
  sum?: BuySumAggregateInputType
  min?: BuyMinAggregateInputType
  max?: BuyMaxAggregateInputType
}

export type GetBuyAggregateType<T extends AggregateBuyArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetBuyAggregateScalarType<T[P]>
}

export type GetBuyAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof BuyAvgAggregateOutputType ? BuyAvgAggregateOutputType[P] : never
}
    
    

export type BuySelect = {
  buyid?: boolean
  uid?: boolean
  pid?: boolean
  buying_date?: boolean
  shiping_date?: boolean
  delivery_date?: boolean
  total_amount?: boolean
  quantity?: boolean
  status?: boolean
}

export type BuyGetPayload<
  S extends boolean | null | undefined | BuyArgs,
  U = keyof S
> = S extends true
  ? Buy
  : S extends undefined
  ? never
  : S extends BuyArgs | FindManyBuyArgs
  ? 'include' extends U
    ? Buy 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Buy ? Buy[P]
: 
 never
    }
  : Buy
: Buy


export interface BuyDelegate {
  /**
   * Find zero or one Buy.
   * @param {FindOneBuyArgs} args - Arguments to find a Buy
   * @example
   * // Get one Buy
   * const buy = await prisma.buy.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneBuyArgs>(
    args: Subset<T, FindOneBuyArgs>
  ): CheckSelect<T, Prisma__BuyClient<Buy | null>, Prisma__BuyClient<BuyGetPayload<T> | null>>
  /**
   * Find zero or more Buys.
   * @param {FindManyBuyArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Buys
   * const buys = await prisma.buy.findMany()
   * 
   * // Get first 10 Buys
   * const buys = await prisma.buy.findMany({ take: 10 })
   * 
   * // Only select the `buyid`
   * const buyWithBuyidOnly = await prisma.buy.findMany({ select: { buyid: true } })
   * 
  **/
  findMany<T extends FindManyBuyArgs>(
    args?: Subset<T, FindManyBuyArgs>
  ): CheckSelect<T, Promise<Array<Buy>>, Promise<Array<BuyGetPayload<T>>>>
  /**
   * Create a Buy.
   * @param {BuyCreateArgs} args - Arguments to create a Buy.
   * @example
   * // Create one Buy
   * const Buy = await prisma.buy.create({
   *   data: {
   *     // ... data to create a Buy
   *   }
   * })
   * 
  **/
  create<T extends BuyCreateArgs>(
    args: Subset<T, BuyCreateArgs>
  ): CheckSelect<T, Prisma__BuyClient<Buy>, Prisma__BuyClient<BuyGetPayload<T>>>
  /**
   * Delete a Buy.
   * @param {BuyDeleteArgs} args - Arguments to delete one Buy.
   * @example
   * // Delete one Buy
   * const Buy = await prisma.buy.delete({
   *   where: {
   *     // ... filter to delete one Buy
   *   }
   * })
   * 
  **/
  delete<T extends BuyDeleteArgs>(
    args: Subset<T, BuyDeleteArgs>
  ): CheckSelect<T, Prisma__BuyClient<Buy>, Prisma__BuyClient<BuyGetPayload<T>>>
  /**
   * Update one Buy.
   * @param {BuyUpdateArgs} args - Arguments to update one Buy.
   * @example
   * // Update one Buy
   * const buy = await prisma.buy.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends BuyUpdateArgs>(
    args: Subset<T, BuyUpdateArgs>
  ): CheckSelect<T, Prisma__BuyClient<Buy>, Prisma__BuyClient<BuyGetPayload<T>>>
  /**
   * Delete zero or more Buys.
   * @param {BuyDeleteManyArgs} args - Arguments to filter Buys to delete.
   * @example
   * // Delete a few Buys
   * const { count } = await prisma.buy.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends BuyDeleteManyArgs>(
    args: Subset<T, BuyDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Buys.
   * @param {BuyUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Buys
   * const buy = await prisma.buy.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends BuyUpdateManyArgs>(
    args: Subset<T, BuyUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Buy.
   * @param {BuyUpsertArgs} args - Arguments to update or create a Buy.
   * @example
   * // Update or create a Buy
   * const buy = await prisma.buy.upsert({
   *   create: {
   *     // ... data to create a Buy
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Buy we want to update
   *   }
   * })
  **/
  upsert<T extends BuyUpsertArgs>(
    args: Subset<T, BuyUpsertArgs>
  ): CheckSelect<T, Prisma__BuyClient<Buy>, Prisma__BuyClient<BuyGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyBuyArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateBuyArgs>(args: Subset<T, AggregateBuyArgs>): Promise<GetBuyAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Buy.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__BuyClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Buy findOne
 */
export type FindOneBuyArgs = {
  /**
   * Select specific fields to fetch from the Buy
  **/
  select?: BuySelect | null
  /**
   * Filter, which Buy to fetch.
  **/
  where: BuyWhereUniqueInput
}


/**
 * Buy findMany
 */
export type FindManyBuyArgs = {
  /**
   * Select specific fields to fetch from the Buy
  **/
  select?: BuySelect | null
  /**
   * Filter, which Buys to fetch.
  **/
  where?: BuyWhereInput
  /**
   * Determine the order of the Buys to fetch.
  **/
  orderBy?: Enumerable<BuyOrderByInput>
  /**
   * Sets the position for listing Buys.
  **/
  cursor?: BuyWhereUniqueInput
  /**
   * The number of Buys to fetch. If negative number, it will take Buys before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Buys.
  **/
  skip?: number
  distinct?: Enumerable<BuyDistinctFieldEnum>
}


/**
 * Buy create
 */
export type BuyCreateArgs = {
  /**
   * Select specific fields to fetch from the Buy
  **/
  select?: BuySelect | null
  /**
   * The data needed to create a Buy.
  **/
  data: BuyCreateInput
}


/**
 * Buy update
 */
export type BuyUpdateArgs = {
  /**
   * Select specific fields to fetch from the Buy
  **/
  select?: BuySelect | null
  /**
   * The data needed to update a Buy.
  **/
  data: BuyUpdateInput
  /**
   * Choose, which Buy to update.
  **/
  where: BuyWhereUniqueInput
}


/**
 * Buy updateMany
 */
export type BuyUpdateManyArgs = {
  data: BuyUpdateManyMutationInput
  where?: BuyWhereInput
}


/**
 * Buy upsert
 */
export type BuyUpsertArgs = {
  /**
   * Select specific fields to fetch from the Buy
  **/
  select?: BuySelect | null
  /**
   * The filter to search for the Buy to update in case it exists.
  **/
  where: BuyWhereUniqueInput
  /**
   * In case the Buy found by the `where` argument doesn't exist, create a new Buy with this data.
  **/
  create: BuyCreateInput
  /**
   * In case the Buy was found with the provided `where` argument, update it with this data.
  **/
  update: BuyUpdateInput
}


/**
 * Buy delete
 */
export type BuyDeleteArgs = {
  /**
   * Select specific fields to fetch from the Buy
  **/
  select?: BuySelect | null
  /**
   * Filter which Buy to delete.
  **/
  where: BuyWhereUniqueInput
}


/**
 * Buy deleteMany
 */
export type BuyDeleteManyArgs = {
  where?: BuyWhereInput
}


/**
 * Buy without action
 */
export type BuyArgs = {
  /**
   * Select specific fields to fetch from the Buy
  **/
  select?: BuySelect | null
}



/**
 * Model Cart
 */

export type Cart = {
  cart_id: number
  uid: number
  pid: number
}


export type AggregateCart = {
  count: number
  avg: CartAvgAggregateOutputType | null
  sum: CartSumAggregateOutputType | null
  min: CartMinAggregateOutputType | null
  max: CartMaxAggregateOutputType | null
}

export type CartAvgAggregateOutputType = {
  cart_id: number
  uid: number
  pid: number
}

export type CartSumAggregateOutputType = {
  cart_id: number
  uid: number
  pid: number
}

export type CartMinAggregateOutputType = {
  cart_id: number
  uid: number
  pid: number
}

export type CartMaxAggregateOutputType = {
  cart_id: number
  uid: number
  pid: number
}


export type CartAvgAggregateInputType = {
  cart_id?: true
  uid?: true
  pid?: true
}

export type CartSumAggregateInputType = {
  cart_id?: true
  uid?: true
  pid?: true
}

export type CartMinAggregateInputType = {
  cart_id?: true
  uid?: true
  pid?: true
}

export type CartMaxAggregateInputType = {
  cart_id?: true
  uid?: true
  pid?: true
}

export type AggregateCartArgs = {
  where?: CartWhereInput
  orderBy?: Enumerable<CartOrderByInput>
  cursor?: CartWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<CartDistinctFieldEnum>
  count?: true
  avg?: CartAvgAggregateInputType
  sum?: CartSumAggregateInputType
  min?: CartMinAggregateInputType
  max?: CartMaxAggregateInputType
}

export type GetCartAggregateType<T extends AggregateCartArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetCartAggregateScalarType<T[P]>
}

export type GetCartAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof CartAvgAggregateOutputType ? CartAvgAggregateOutputType[P] : never
}
    
    

export type CartSelect = {
  cart_id?: boolean
  uid?: boolean
  pid?: boolean
}

export type CartGetPayload<
  S extends boolean | null | undefined | CartArgs,
  U = keyof S
> = S extends true
  ? Cart
  : S extends undefined
  ? never
  : S extends CartArgs | FindManyCartArgs
  ? 'include' extends U
    ? Cart 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Cart ? Cart[P]
: 
 never
    }
  : Cart
: Cart


export interface CartDelegate {
  /**
   * Find zero or one Cart.
   * @param {FindOneCartArgs} args - Arguments to find a Cart
   * @example
   * // Get one Cart
   * const cart = await prisma.cart.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneCartArgs>(
    args: Subset<T, FindOneCartArgs>
  ): CheckSelect<T, Prisma__CartClient<Cart | null>, Prisma__CartClient<CartGetPayload<T> | null>>
  /**
   * Find zero or more Carts.
   * @param {FindManyCartArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Carts
   * const carts = await prisma.cart.findMany()
   * 
   * // Get first 10 Carts
   * const carts = await prisma.cart.findMany({ take: 10 })
   * 
   * // Only select the `cart_id`
   * const cartWithCart_idOnly = await prisma.cart.findMany({ select: { cart_id: true } })
   * 
  **/
  findMany<T extends FindManyCartArgs>(
    args?: Subset<T, FindManyCartArgs>
  ): CheckSelect<T, Promise<Array<Cart>>, Promise<Array<CartGetPayload<T>>>>
  /**
   * Create a Cart.
   * @param {CartCreateArgs} args - Arguments to create a Cart.
   * @example
   * // Create one Cart
   * const Cart = await prisma.cart.create({
   *   data: {
   *     // ... data to create a Cart
   *   }
   * })
   * 
  **/
  create<T extends CartCreateArgs>(
    args: Subset<T, CartCreateArgs>
  ): CheckSelect<T, Prisma__CartClient<Cart>, Prisma__CartClient<CartGetPayload<T>>>
  /**
   * Delete a Cart.
   * @param {CartDeleteArgs} args - Arguments to delete one Cart.
   * @example
   * // Delete one Cart
   * const Cart = await prisma.cart.delete({
   *   where: {
   *     // ... filter to delete one Cart
   *   }
   * })
   * 
  **/
  delete<T extends CartDeleteArgs>(
    args: Subset<T, CartDeleteArgs>
  ): CheckSelect<T, Prisma__CartClient<Cart>, Prisma__CartClient<CartGetPayload<T>>>
  /**
   * Update one Cart.
   * @param {CartUpdateArgs} args - Arguments to update one Cart.
   * @example
   * // Update one Cart
   * const cart = await prisma.cart.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends CartUpdateArgs>(
    args: Subset<T, CartUpdateArgs>
  ): CheckSelect<T, Prisma__CartClient<Cart>, Prisma__CartClient<CartGetPayload<T>>>
  /**
   * Delete zero or more Carts.
   * @param {CartDeleteManyArgs} args - Arguments to filter Carts to delete.
   * @example
   * // Delete a few Carts
   * const { count } = await prisma.cart.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends CartDeleteManyArgs>(
    args: Subset<T, CartDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Carts.
   * @param {CartUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Carts
   * const cart = await prisma.cart.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends CartUpdateManyArgs>(
    args: Subset<T, CartUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Cart.
   * @param {CartUpsertArgs} args - Arguments to update or create a Cart.
   * @example
   * // Update or create a Cart
   * const cart = await prisma.cart.upsert({
   *   create: {
   *     // ... data to create a Cart
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Cart we want to update
   *   }
   * })
  **/
  upsert<T extends CartUpsertArgs>(
    args: Subset<T, CartUpsertArgs>
  ): CheckSelect<T, Prisma__CartClient<Cart>, Prisma__CartClient<CartGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyCartArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateCartArgs>(args: Subset<T, AggregateCartArgs>): Promise<GetCartAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Cart.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__CartClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Cart findOne
 */
export type FindOneCartArgs = {
  /**
   * Select specific fields to fetch from the Cart
  **/
  select?: CartSelect | null
  /**
   * Filter, which Cart to fetch.
  **/
  where: CartWhereUniqueInput
}


/**
 * Cart findMany
 */
export type FindManyCartArgs = {
  /**
   * Select specific fields to fetch from the Cart
  **/
  select?: CartSelect | null
  /**
   * Filter, which Carts to fetch.
  **/
  where?: CartWhereInput
  /**
   * Determine the order of the Carts to fetch.
  **/
  orderBy?: Enumerable<CartOrderByInput>
  /**
   * Sets the position for listing Carts.
  **/
  cursor?: CartWhereUniqueInput
  /**
   * The number of Carts to fetch. If negative number, it will take Carts before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Carts.
  **/
  skip?: number
  distinct?: Enumerable<CartDistinctFieldEnum>
}


/**
 * Cart create
 */
export type CartCreateArgs = {
  /**
   * Select specific fields to fetch from the Cart
  **/
  select?: CartSelect | null
  /**
   * The data needed to create a Cart.
  **/
  data: CartCreateInput
}


/**
 * Cart update
 */
export type CartUpdateArgs = {
  /**
   * Select specific fields to fetch from the Cart
  **/
  select?: CartSelect | null
  /**
   * The data needed to update a Cart.
  **/
  data: CartUpdateInput
  /**
   * Choose, which Cart to update.
  **/
  where: CartWhereUniqueInput
}


/**
 * Cart updateMany
 */
export type CartUpdateManyArgs = {
  data: CartUpdateManyMutationInput
  where?: CartWhereInput
}


/**
 * Cart upsert
 */
export type CartUpsertArgs = {
  /**
   * Select specific fields to fetch from the Cart
  **/
  select?: CartSelect | null
  /**
   * The filter to search for the Cart to update in case it exists.
  **/
  where: CartWhereUniqueInput
  /**
   * In case the Cart found by the `where` argument doesn't exist, create a new Cart with this data.
  **/
  create: CartCreateInput
  /**
   * In case the Cart was found with the provided `where` argument, update it with this data.
  **/
  update: CartUpdateInput
}


/**
 * Cart delete
 */
export type CartDeleteArgs = {
  /**
   * Select specific fields to fetch from the Cart
  **/
  select?: CartSelect | null
  /**
   * Filter which Cart to delete.
  **/
  where: CartWhereUniqueInput
}


/**
 * Cart deleteMany
 */
export type CartDeleteManyArgs = {
  where?: CartWhereInput
}


/**
 * Cart without action
 */
export type CartArgs = {
  /**
   * Select specific fields to fetch from the Cart
  **/
  select?: CartSelect | null
}



/**
 * Model Category
 */

export type Category = {
  category: string
  cid: number
}


export type AggregateCategory = {
  count: number
  avg: CategoryAvgAggregateOutputType | null
  sum: CategorySumAggregateOutputType | null
  min: CategoryMinAggregateOutputType | null
  max: CategoryMaxAggregateOutputType | null
}

export type CategoryAvgAggregateOutputType = {
  cid: number
}

export type CategorySumAggregateOutputType = {
  cid: number
}

export type CategoryMinAggregateOutputType = {
  cid: number
}

export type CategoryMaxAggregateOutputType = {
  cid: number
}


export type CategoryAvgAggregateInputType = {
  cid?: true
}

export type CategorySumAggregateInputType = {
  cid?: true
}

export type CategoryMinAggregateInputType = {
  cid?: true
}

export type CategoryMaxAggregateInputType = {
  cid?: true
}

export type AggregateCategoryArgs = {
  where?: CategoryWhereInput
  orderBy?: Enumerable<CategoryOrderByInput>
  cursor?: CategoryWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<CategoryDistinctFieldEnum>
  count?: true
  avg?: CategoryAvgAggregateInputType
  sum?: CategorySumAggregateInputType
  min?: CategoryMinAggregateInputType
  max?: CategoryMaxAggregateInputType
}

export type GetCategoryAggregateType<T extends AggregateCategoryArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetCategoryAggregateScalarType<T[P]>
}

export type GetCategoryAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof CategoryAvgAggregateOutputType ? CategoryAvgAggregateOutputType[P] : never
}
    
    

export type CategorySelect = {
  category?: boolean
  cid?: boolean
}

export type CategoryGetPayload<
  S extends boolean | null | undefined | CategoryArgs,
  U = keyof S
> = S extends true
  ? Category
  : S extends undefined
  ? never
  : S extends CategoryArgs | FindManyCategoryArgs
  ? 'include' extends U
    ? Category 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Category ? Category[P]
: 
 never
    }
  : Category
: Category


export interface CategoryDelegate {
  /**
   * Find zero or one Category.
   * @param {FindOneCategoryArgs} args - Arguments to find a Category
   * @example
   * // Get one Category
   * const category = await prisma.category.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneCategoryArgs>(
    args: Subset<T, FindOneCategoryArgs>
  ): CheckSelect<T, Prisma__CategoryClient<Category | null>, Prisma__CategoryClient<CategoryGetPayload<T> | null>>
  /**
   * Find zero or more Categories.
   * @param {FindManyCategoryArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Categories
   * const categories = await prisma.category.findMany()
   * 
   * // Get first 10 Categories
   * const categories = await prisma.category.findMany({ take: 10 })
   * 
   * // Only select the `category`
   * const categoryWithCategoryOnly = await prisma.category.findMany({ select: { category: true } })
   * 
  **/
  findMany<T extends FindManyCategoryArgs>(
    args?: Subset<T, FindManyCategoryArgs>
  ): CheckSelect<T, Promise<Array<Category>>, Promise<Array<CategoryGetPayload<T>>>>
  /**
   * Create a Category.
   * @param {CategoryCreateArgs} args - Arguments to create a Category.
   * @example
   * // Create one Category
   * const Category = await prisma.category.create({
   *   data: {
   *     // ... data to create a Category
   *   }
   * })
   * 
  **/
  create<T extends CategoryCreateArgs>(
    args: Subset<T, CategoryCreateArgs>
  ): CheckSelect<T, Prisma__CategoryClient<Category>, Prisma__CategoryClient<CategoryGetPayload<T>>>
  /**
   * Delete a Category.
   * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
   * @example
   * // Delete one Category
   * const Category = await prisma.category.delete({
   *   where: {
   *     // ... filter to delete one Category
   *   }
   * })
   * 
  **/
  delete<T extends CategoryDeleteArgs>(
    args: Subset<T, CategoryDeleteArgs>
  ): CheckSelect<T, Prisma__CategoryClient<Category>, Prisma__CategoryClient<CategoryGetPayload<T>>>
  /**
   * Update one Category.
   * @param {CategoryUpdateArgs} args - Arguments to update one Category.
   * @example
   * // Update one Category
   * const category = await prisma.category.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends CategoryUpdateArgs>(
    args: Subset<T, CategoryUpdateArgs>
  ): CheckSelect<T, Prisma__CategoryClient<Category>, Prisma__CategoryClient<CategoryGetPayload<T>>>
  /**
   * Delete zero or more Categories.
   * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
   * @example
   * // Delete a few Categories
   * const { count } = await prisma.category.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends CategoryDeleteManyArgs>(
    args: Subset<T, CategoryDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Categories.
   * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Categories
   * const category = await prisma.category.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends CategoryUpdateManyArgs>(
    args: Subset<T, CategoryUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Category.
   * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
   * @example
   * // Update or create a Category
   * const category = await prisma.category.upsert({
   *   create: {
   *     // ... data to create a Category
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Category we want to update
   *   }
   * })
  **/
  upsert<T extends CategoryUpsertArgs>(
    args: Subset<T, CategoryUpsertArgs>
  ): CheckSelect<T, Prisma__CategoryClient<Category>, Prisma__CategoryClient<CategoryGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyCategoryArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateCategoryArgs>(args: Subset<T, AggregateCategoryArgs>): Promise<GetCategoryAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Category.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__CategoryClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Category findOne
 */
export type FindOneCategoryArgs = {
  /**
   * Select specific fields to fetch from the Category
  **/
  select?: CategorySelect | null
  /**
   * Filter, which Category to fetch.
  **/
  where: CategoryWhereUniqueInput
}


/**
 * Category findMany
 */
export type FindManyCategoryArgs = {
  /**
   * Select specific fields to fetch from the Category
  **/
  select?: CategorySelect | null
  /**
   * Filter, which Categories to fetch.
  **/
  where?: CategoryWhereInput
  /**
   * Determine the order of the Categories to fetch.
  **/
  orderBy?: Enumerable<CategoryOrderByInput>
  /**
   * Sets the position for listing Categories.
  **/
  cursor?: CategoryWhereUniqueInput
  /**
   * The number of Categories to fetch. If negative number, it will take Categories before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Categories.
  **/
  skip?: number
  distinct?: Enumerable<CategoryDistinctFieldEnum>
}


/**
 * Category create
 */
export type CategoryCreateArgs = {
  /**
   * Select specific fields to fetch from the Category
  **/
  select?: CategorySelect | null
  /**
   * The data needed to create a Category.
  **/
  data: CategoryCreateInput
}


/**
 * Category update
 */
export type CategoryUpdateArgs = {
  /**
   * Select specific fields to fetch from the Category
  **/
  select?: CategorySelect | null
  /**
   * The data needed to update a Category.
  **/
  data: CategoryUpdateInput
  /**
   * Choose, which Category to update.
  **/
  where: CategoryWhereUniqueInput
}


/**
 * Category updateMany
 */
export type CategoryUpdateManyArgs = {
  data: CategoryUpdateManyMutationInput
  where?: CategoryWhereInput
}


/**
 * Category upsert
 */
export type CategoryUpsertArgs = {
  /**
   * Select specific fields to fetch from the Category
  **/
  select?: CategorySelect | null
  /**
   * The filter to search for the Category to update in case it exists.
  **/
  where: CategoryWhereUniqueInput
  /**
   * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
  **/
  create: CategoryCreateInput
  /**
   * In case the Category was found with the provided `where` argument, update it with this data.
  **/
  update: CategoryUpdateInput
}


/**
 * Category delete
 */
export type CategoryDeleteArgs = {
  /**
   * Select specific fields to fetch from the Category
  **/
  select?: CategorySelect | null
  /**
   * Filter which Category to delete.
  **/
  where: CategoryWhereUniqueInput
}


/**
 * Category deleteMany
 */
export type CategoryDeleteManyArgs = {
  where?: CategoryWhereInput
}


/**
 * Category without action
 */
export type CategoryArgs = {
  /**
   * Select specific fields to fetch from the Category
  **/
  select?: CategorySelect | null
}



/**
 * Model Products
 */

export type Products = {
  pid: number
  productname: string
  rate: number
  description: string
  discount: number
  rating: number
  cid: number
  bid: number
  images: string[]
}


export type AggregateProducts = {
  count: number
  avg: ProductsAvgAggregateOutputType | null
  sum: ProductsSumAggregateOutputType | null
  min: ProductsMinAggregateOutputType | null
  max: ProductsMaxAggregateOutputType | null
}

export type ProductsAvgAggregateOutputType = {
  pid: number
  rate: number
  discount: number
  rating: number
  cid: number
  bid: number
}

export type ProductsSumAggregateOutputType = {
  pid: number
  rate: number
  discount: number
  rating: number
  cid: number
  bid: number
}

export type ProductsMinAggregateOutputType = {
  pid: number
  rate: number
  discount: number
  rating: number
  cid: number
  bid: number
}

export type ProductsMaxAggregateOutputType = {
  pid: number
  rate: number
  discount: number
  rating: number
  cid: number
  bid: number
}


export type ProductsAvgAggregateInputType = {
  pid?: true
  rate?: true
  discount?: true
  rating?: true
  cid?: true
  bid?: true
}

export type ProductsSumAggregateInputType = {
  pid?: true
  rate?: true
  discount?: true
  rating?: true
  cid?: true
  bid?: true
}

export type ProductsMinAggregateInputType = {
  pid?: true
  rate?: true
  discount?: true
  rating?: true
  cid?: true
  bid?: true
}

export type ProductsMaxAggregateInputType = {
  pid?: true
  rate?: true
  discount?: true
  rating?: true
  cid?: true
  bid?: true
}

export type AggregateProductsArgs = {
  where?: ProductsWhereInput
  orderBy?: Enumerable<ProductsOrderByInput>
  cursor?: ProductsWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<ProductsDistinctFieldEnum>
  count?: true
  avg?: ProductsAvgAggregateInputType
  sum?: ProductsSumAggregateInputType
  min?: ProductsMinAggregateInputType
  max?: ProductsMaxAggregateInputType
}

export type GetProductsAggregateType<T extends AggregateProductsArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetProductsAggregateScalarType<T[P]>
}

export type GetProductsAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof ProductsAvgAggregateOutputType ? ProductsAvgAggregateOutputType[P] : never
}
    
    

export type ProductsSelect = {
  pid?: boolean
  productname?: boolean
  rate?: boolean
  description?: boolean
  discount?: boolean
  rating?: boolean
  cid?: boolean
  bid?: boolean
  images?: boolean
}

export type ProductsGetPayload<
  S extends boolean | null | undefined | ProductsArgs,
  U = keyof S
> = S extends true
  ? Products
  : S extends undefined
  ? never
  : S extends ProductsArgs | FindManyProductsArgs
  ? 'include' extends U
    ? Products 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Products ? Products[P]
: 
 never
    }
  : Products
: Products


export interface ProductsDelegate {
  /**
   * Find zero or one Products.
   * @param {FindOneProductsArgs} args - Arguments to find a Products
   * @example
   * // Get one Products
   * const products = await prisma.products.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneProductsArgs>(
    args: Subset<T, FindOneProductsArgs>
  ): CheckSelect<T, Prisma__ProductsClient<Products | null>, Prisma__ProductsClient<ProductsGetPayload<T> | null>>
  /**
   * Find zero or more Products.
   * @param {FindManyProductsArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Products
   * const products = await prisma.products.findMany()
   * 
   * // Get first 10 Products
   * const products = await prisma.products.findMany({ take: 10 })
   * 
   * // Only select the `pid`
   * const productsWithPidOnly = await prisma.products.findMany({ select: { pid: true } })
   * 
  **/
  findMany<T extends FindManyProductsArgs>(
    args?: Subset<T, FindManyProductsArgs>
  ): CheckSelect<T, Promise<Array<Products>>, Promise<Array<ProductsGetPayload<T>>>>
  /**
   * Create a Products.
   * @param {ProductsCreateArgs} args - Arguments to create a Products.
   * @example
   * // Create one Products
   * const Products = await prisma.products.create({
   *   data: {
   *     // ... data to create a Products
   *   }
   * })
   * 
  **/
  create<T extends ProductsCreateArgs>(
    args: Subset<T, ProductsCreateArgs>
  ): CheckSelect<T, Prisma__ProductsClient<Products>, Prisma__ProductsClient<ProductsGetPayload<T>>>
  /**
   * Delete a Products.
   * @param {ProductsDeleteArgs} args - Arguments to delete one Products.
   * @example
   * // Delete one Products
   * const Products = await prisma.products.delete({
   *   where: {
   *     // ... filter to delete one Products
   *   }
   * })
   * 
  **/
  delete<T extends ProductsDeleteArgs>(
    args: Subset<T, ProductsDeleteArgs>
  ): CheckSelect<T, Prisma__ProductsClient<Products>, Prisma__ProductsClient<ProductsGetPayload<T>>>
  /**
   * Update one Products.
   * @param {ProductsUpdateArgs} args - Arguments to update one Products.
   * @example
   * // Update one Products
   * const products = await prisma.products.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends ProductsUpdateArgs>(
    args: Subset<T, ProductsUpdateArgs>
  ): CheckSelect<T, Prisma__ProductsClient<Products>, Prisma__ProductsClient<ProductsGetPayload<T>>>
  /**
   * Delete zero or more Products.
   * @param {ProductsDeleteManyArgs} args - Arguments to filter Products to delete.
   * @example
   * // Delete a few Products
   * const { count } = await prisma.products.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends ProductsDeleteManyArgs>(
    args: Subset<T, ProductsDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Products.
   * @param {ProductsUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Products
   * const products = await prisma.products.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends ProductsUpdateManyArgs>(
    args: Subset<T, ProductsUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Products.
   * @param {ProductsUpsertArgs} args - Arguments to update or create a Products.
   * @example
   * // Update or create a Products
   * const products = await prisma.products.upsert({
   *   create: {
   *     // ... data to create a Products
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Products we want to update
   *   }
   * })
  **/
  upsert<T extends ProductsUpsertArgs>(
    args: Subset<T, ProductsUpsertArgs>
  ): CheckSelect<T, Prisma__ProductsClient<Products>, Prisma__ProductsClient<ProductsGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyProductsArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateProductsArgs>(args: Subset<T, AggregateProductsArgs>): Promise<GetProductsAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Products.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__ProductsClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Products findOne
 */
export type FindOneProductsArgs = {
  /**
   * Select specific fields to fetch from the Products
  **/
  select?: ProductsSelect | null
  /**
   * Filter, which Products to fetch.
  **/
  where: ProductsWhereUniqueInput
}


/**
 * Products findMany
 */
export type FindManyProductsArgs = {
  /**
   * Select specific fields to fetch from the Products
  **/
  select?: ProductsSelect | null
  /**
   * Filter, which Products to fetch.
  **/
  where?: ProductsWhereInput
  /**
   * Determine the order of the Products to fetch.
  **/
  orderBy?: Enumerable<ProductsOrderByInput>
  /**
   * Sets the position for listing Products.
  **/
  cursor?: ProductsWhereUniqueInput
  /**
   * The number of Products to fetch. If negative number, it will take Products before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Products.
  **/
  skip?: number
  distinct?: Enumerable<ProductsDistinctFieldEnum>
}


/**
 * Products create
 */
export type ProductsCreateArgs = {
  /**
   * Select specific fields to fetch from the Products
  **/
  select?: ProductsSelect | null
  /**
   * The data needed to create a Products.
  **/
  data: ProductsCreateInput
}


/**
 * Products update
 */
export type ProductsUpdateArgs = {
  /**
   * Select specific fields to fetch from the Products
  **/
  select?: ProductsSelect | null
  /**
   * The data needed to update a Products.
  **/
  data: ProductsUpdateInput
  /**
   * Choose, which Products to update.
  **/
  where: ProductsWhereUniqueInput
}


/**
 * Products updateMany
 */
export type ProductsUpdateManyArgs = {
  data: ProductsUpdateManyMutationInput
  where?: ProductsWhereInput
}


/**
 * Products upsert
 */
export type ProductsUpsertArgs = {
  /**
   * Select specific fields to fetch from the Products
  **/
  select?: ProductsSelect | null
  /**
   * The filter to search for the Products to update in case it exists.
  **/
  where: ProductsWhereUniqueInput
  /**
   * In case the Products found by the `where` argument doesn't exist, create a new Products with this data.
  **/
  create: ProductsCreateInput
  /**
   * In case the Products was found with the provided `where` argument, update it with this data.
  **/
  update: ProductsUpdateInput
}


/**
 * Products delete
 */
export type ProductsDeleteArgs = {
  /**
   * Select specific fields to fetch from the Products
  **/
  select?: ProductsSelect | null
  /**
   * Filter which Products to delete.
  **/
  where: ProductsWhereUniqueInput
}


/**
 * Products deleteMany
 */
export type ProductsDeleteManyArgs = {
  where?: ProductsWhereInput
}


/**
 * Products without action
 */
export type ProductsArgs = {
  /**
   * Select specific fields to fetch from the Products
  **/
  select?: ProductsSelect | null
}



/**
 * Model Reviews
 */

export type Reviews = {
  rid: number
  uid: number
  pid: number
  review: string
  rating: number
  buyid: number
  uploaded_date: Date
}


export type AggregateReviews = {
  count: number
  avg: ReviewsAvgAggregateOutputType | null
  sum: ReviewsSumAggregateOutputType | null
  min: ReviewsMinAggregateOutputType | null
  max: ReviewsMaxAggregateOutputType | null
}

export type ReviewsAvgAggregateOutputType = {
  rid: number
  uid: number
  pid: number
  rating: number
  buyid: number
}

export type ReviewsSumAggregateOutputType = {
  rid: number
  uid: number
  pid: number
  rating: number
  buyid: number
}

export type ReviewsMinAggregateOutputType = {
  rid: number
  uid: number
  pid: number
  rating: number
  buyid: number
}

export type ReviewsMaxAggregateOutputType = {
  rid: number
  uid: number
  pid: number
  rating: number
  buyid: number
}


export type ReviewsAvgAggregateInputType = {
  rid?: true
  uid?: true
  pid?: true
  rating?: true
  buyid?: true
}

export type ReviewsSumAggregateInputType = {
  rid?: true
  uid?: true
  pid?: true
  rating?: true
  buyid?: true
}

export type ReviewsMinAggregateInputType = {
  rid?: true
  uid?: true
  pid?: true
  rating?: true
  buyid?: true
}

export type ReviewsMaxAggregateInputType = {
  rid?: true
  uid?: true
  pid?: true
  rating?: true
  buyid?: true
}

export type AggregateReviewsArgs = {
  where?: ReviewsWhereInput
  orderBy?: Enumerable<ReviewsOrderByInput>
  cursor?: ReviewsWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<ReviewsDistinctFieldEnum>
  count?: true
  avg?: ReviewsAvgAggregateInputType
  sum?: ReviewsSumAggregateInputType
  min?: ReviewsMinAggregateInputType
  max?: ReviewsMaxAggregateInputType
}

export type GetReviewsAggregateType<T extends AggregateReviewsArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetReviewsAggregateScalarType<T[P]>
}

export type GetReviewsAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof ReviewsAvgAggregateOutputType ? ReviewsAvgAggregateOutputType[P] : never
}
    
    

export type ReviewsSelect = {
  rid?: boolean
  uid?: boolean
  pid?: boolean
  review?: boolean
  rating?: boolean
  buyid?: boolean
  uploaded_date?: boolean
}

export type ReviewsGetPayload<
  S extends boolean | null | undefined | ReviewsArgs,
  U = keyof S
> = S extends true
  ? Reviews
  : S extends undefined
  ? never
  : S extends ReviewsArgs | FindManyReviewsArgs
  ? 'include' extends U
    ? Reviews 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Reviews ? Reviews[P]
: 
 never
    }
  : Reviews
: Reviews


export interface ReviewsDelegate {
  /**
   * Find zero or one Reviews.
   * @param {FindOneReviewsArgs} args - Arguments to find a Reviews
   * @example
   * // Get one Reviews
   * const reviews = await prisma.reviews.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneReviewsArgs>(
    args: Subset<T, FindOneReviewsArgs>
  ): CheckSelect<T, Prisma__ReviewsClient<Reviews | null>, Prisma__ReviewsClient<ReviewsGetPayload<T> | null>>
  /**
   * Find zero or more Reviews.
   * @param {FindManyReviewsArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Reviews
   * const reviews = await prisma.reviews.findMany()
   * 
   * // Get first 10 Reviews
   * const reviews = await prisma.reviews.findMany({ take: 10 })
   * 
   * // Only select the `rid`
   * const reviewsWithRidOnly = await prisma.reviews.findMany({ select: { rid: true } })
   * 
  **/
  findMany<T extends FindManyReviewsArgs>(
    args?: Subset<T, FindManyReviewsArgs>
  ): CheckSelect<T, Promise<Array<Reviews>>, Promise<Array<ReviewsGetPayload<T>>>>
  /**
   * Create a Reviews.
   * @param {ReviewsCreateArgs} args - Arguments to create a Reviews.
   * @example
   * // Create one Reviews
   * const Reviews = await prisma.reviews.create({
   *   data: {
   *     // ... data to create a Reviews
   *   }
   * })
   * 
  **/
  create<T extends ReviewsCreateArgs>(
    args: Subset<T, ReviewsCreateArgs>
  ): CheckSelect<T, Prisma__ReviewsClient<Reviews>, Prisma__ReviewsClient<ReviewsGetPayload<T>>>
  /**
   * Delete a Reviews.
   * @param {ReviewsDeleteArgs} args - Arguments to delete one Reviews.
   * @example
   * // Delete one Reviews
   * const Reviews = await prisma.reviews.delete({
   *   where: {
   *     // ... filter to delete one Reviews
   *   }
   * })
   * 
  **/
  delete<T extends ReviewsDeleteArgs>(
    args: Subset<T, ReviewsDeleteArgs>
  ): CheckSelect<T, Prisma__ReviewsClient<Reviews>, Prisma__ReviewsClient<ReviewsGetPayload<T>>>
  /**
   * Update one Reviews.
   * @param {ReviewsUpdateArgs} args - Arguments to update one Reviews.
   * @example
   * // Update one Reviews
   * const reviews = await prisma.reviews.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends ReviewsUpdateArgs>(
    args: Subset<T, ReviewsUpdateArgs>
  ): CheckSelect<T, Prisma__ReviewsClient<Reviews>, Prisma__ReviewsClient<ReviewsGetPayload<T>>>
  /**
   * Delete zero or more Reviews.
   * @param {ReviewsDeleteManyArgs} args - Arguments to filter Reviews to delete.
   * @example
   * // Delete a few Reviews
   * const { count } = await prisma.reviews.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends ReviewsDeleteManyArgs>(
    args: Subset<T, ReviewsDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Reviews.
   * @param {ReviewsUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Reviews
   * const reviews = await prisma.reviews.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends ReviewsUpdateManyArgs>(
    args: Subset<T, ReviewsUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Reviews.
   * @param {ReviewsUpsertArgs} args - Arguments to update or create a Reviews.
   * @example
   * // Update or create a Reviews
   * const reviews = await prisma.reviews.upsert({
   *   create: {
   *     // ... data to create a Reviews
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Reviews we want to update
   *   }
   * })
  **/
  upsert<T extends ReviewsUpsertArgs>(
    args: Subset<T, ReviewsUpsertArgs>
  ): CheckSelect<T, Prisma__ReviewsClient<Reviews>, Prisma__ReviewsClient<ReviewsGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyReviewsArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateReviewsArgs>(args: Subset<T, AggregateReviewsArgs>): Promise<GetReviewsAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Reviews.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__ReviewsClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Reviews findOne
 */
export type FindOneReviewsArgs = {
  /**
   * Select specific fields to fetch from the Reviews
  **/
  select?: ReviewsSelect | null
  /**
   * Filter, which Reviews to fetch.
  **/
  where: ReviewsWhereUniqueInput
}


/**
 * Reviews findMany
 */
export type FindManyReviewsArgs = {
  /**
   * Select specific fields to fetch from the Reviews
  **/
  select?: ReviewsSelect | null
  /**
   * Filter, which Reviews to fetch.
  **/
  where?: ReviewsWhereInput
  /**
   * Determine the order of the Reviews to fetch.
  **/
  orderBy?: Enumerable<ReviewsOrderByInput>
  /**
   * Sets the position for listing Reviews.
  **/
  cursor?: ReviewsWhereUniqueInput
  /**
   * The number of Reviews to fetch. If negative number, it will take Reviews before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Reviews.
  **/
  skip?: number
  distinct?: Enumerable<ReviewsDistinctFieldEnum>
}


/**
 * Reviews create
 */
export type ReviewsCreateArgs = {
  /**
   * Select specific fields to fetch from the Reviews
  **/
  select?: ReviewsSelect | null
  /**
   * The data needed to create a Reviews.
  **/
  data: ReviewsCreateInput
}


/**
 * Reviews update
 */
export type ReviewsUpdateArgs = {
  /**
   * Select specific fields to fetch from the Reviews
  **/
  select?: ReviewsSelect | null
  /**
   * The data needed to update a Reviews.
  **/
  data: ReviewsUpdateInput
  /**
   * Choose, which Reviews to update.
  **/
  where: ReviewsWhereUniqueInput
}


/**
 * Reviews updateMany
 */
export type ReviewsUpdateManyArgs = {
  data: ReviewsUpdateManyMutationInput
  where?: ReviewsWhereInput
}


/**
 * Reviews upsert
 */
export type ReviewsUpsertArgs = {
  /**
   * Select specific fields to fetch from the Reviews
  **/
  select?: ReviewsSelect | null
  /**
   * The filter to search for the Reviews to update in case it exists.
  **/
  where: ReviewsWhereUniqueInput
  /**
   * In case the Reviews found by the `where` argument doesn't exist, create a new Reviews with this data.
  **/
  create: ReviewsCreateInput
  /**
   * In case the Reviews was found with the provided `where` argument, update it with this data.
  **/
  update: ReviewsUpdateInput
}


/**
 * Reviews delete
 */
export type ReviewsDeleteArgs = {
  /**
   * Select specific fields to fetch from the Reviews
  **/
  select?: ReviewsSelect | null
  /**
   * Filter which Reviews to delete.
  **/
  where: ReviewsWhereUniqueInput
}


/**
 * Reviews deleteMany
 */
export type ReviewsDeleteManyArgs = {
  where?: ReviewsWhereInput
}


/**
 * Reviews without action
 */
export type ReviewsArgs = {
  /**
   * Select specific fields to fetch from the Reviews
  **/
  select?: ReviewsSelect | null
}



/**
 * Model Status
 */

export type Status = {
  sid: number
  statusName: string
}


export type AggregateStatus = {
  count: number
  avg: StatusAvgAggregateOutputType | null
  sum: StatusSumAggregateOutputType | null
  min: StatusMinAggregateOutputType | null
  max: StatusMaxAggregateOutputType | null
}

export type StatusAvgAggregateOutputType = {
  sid: number
}

export type StatusSumAggregateOutputType = {
  sid: number
}

export type StatusMinAggregateOutputType = {
  sid: number
}

export type StatusMaxAggregateOutputType = {
  sid: number
}


export type StatusAvgAggregateInputType = {
  sid?: true
}

export type StatusSumAggregateInputType = {
  sid?: true
}

export type StatusMinAggregateInputType = {
  sid?: true
}

export type StatusMaxAggregateInputType = {
  sid?: true
}

export type AggregateStatusArgs = {
  where?: StatusWhereInput
  orderBy?: Enumerable<StatusOrderByInput>
  cursor?: StatusWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<StatusDistinctFieldEnum>
  count?: true
  avg?: StatusAvgAggregateInputType
  sum?: StatusSumAggregateInputType
  min?: StatusMinAggregateInputType
  max?: StatusMaxAggregateInputType
}

export type GetStatusAggregateType<T extends AggregateStatusArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetStatusAggregateScalarType<T[P]>
}

export type GetStatusAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof StatusAvgAggregateOutputType ? StatusAvgAggregateOutputType[P] : never
}
    
    

export type StatusSelect = {
  sid?: boolean
  statusName?: boolean
}

export type StatusGetPayload<
  S extends boolean | null | undefined | StatusArgs,
  U = keyof S
> = S extends true
  ? Status
  : S extends undefined
  ? never
  : S extends StatusArgs | FindManyStatusArgs
  ? 'include' extends U
    ? Status 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Status ? Status[P]
: 
 never
    }
  : Status
: Status


export interface StatusDelegate {
  /**
   * Find zero or one Status.
   * @param {FindOneStatusArgs} args - Arguments to find a Status
   * @example
   * // Get one Status
   * const status = await prisma.status.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneStatusArgs>(
    args: Subset<T, FindOneStatusArgs>
  ): CheckSelect<T, Prisma__StatusClient<Status | null>, Prisma__StatusClient<StatusGetPayload<T> | null>>
  /**
   * Find zero or more Statuses.
   * @param {FindManyStatusArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Statuses
   * const statuses = await prisma.status.findMany()
   * 
   * // Get first 10 Statuses
   * const statuses = await prisma.status.findMany({ take: 10 })
   * 
   * // Only select the `sid`
   * const statusWithSidOnly = await prisma.status.findMany({ select: { sid: true } })
   * 
  **/
  findMany<T extends FindManyStatusArgs>(
    args?: Subset<T, FindManyStatusArgs>
  ): CheckSelect<T, Promise<Array<Status>>, Promise<Array<StatusGetPayload<T>>>>
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
  **/
  create<T extends StatusCreateArgs>(
    args: Subset<T, StatusCreateArgs>
  ): CheckSelect<T, Prisma__StatusClient<Status>, Prisma__StatusClient<StatusGetPayload<T>>>
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
  **/
  delete<T extends StatusDeleteArgs>(
    args: Subset<T, StatusDeleteArgs>
  ): CheckSelect<T, Prisma__StatusClient<Status>, Prisma__StatusClient<StatusGetPayload<T>>>
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
  **/
  update<T extends StatusUpdateArgs>(
    args: Subset<T, StatusUpdateArgs>
  ): CheckSelect<T, Prisma__StatusClient<Status>, Prisma__StatusClient<StatusGetPayload<T>>>
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
  **/
  deleteMany<T extends StatusDeleteManyArgs>(
    args: Subset<T, StatusDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Statuses.
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
  **/
  updateMany<T extends StatusUpdateManyArgs>(
    args: Subset<T, StatusUpdateManyArgs>
  ): Promise<BatchPayload>
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
  **/
  upsert<T extends StatusUpsertArgs>(
    args: Subset<T, StatusUpsertArgs>
  ): CheckSelect<T, Prisma__StatusClient<Status>, Prisma__StatusClient<StatusGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyStatusArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateStatusArgs>(args: Subset<T, AggregateStatusArgs>): Promise<GetStatusAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Status.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__StatusClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Status findOne
 */
export type FindOneStatusArgs = {
  /**
   * Select specific fields to fetch from the Status
  **/
  select?: StatusSelect | null
  /**
   * Filter, which Status to fetch.
  **/
  where: StatusWhereUniqueInput
}


/**
 * Status findMany
 */
export type FindManyStatusArgs = {
  /**
   * Select specific fields to fetch from the Status
  **/
  select?: StatusSelect | null
  /**
   * Filter, which Statuses to fetch.
  **/
  where?: StatusWhereInput
  /**
   * Determine the order of the Statuses to fetch.
  **/
  orderBy?: Enumerable<StatusOrderByInput>
  /**
   * Sets the position for listing Statuses.
  **/
  cursor?: StatusWhereUniqueInput
  /**
   * The number of Statuses to fetch. If negative number, it will take Statuses before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Statuses.
  **/
  skip?: number
  distinct?: Enumerable<StatusDistinctFieldEnum>
}


/**
 * Status create
 */
export type StatusCreateArgs = {
  /**
   * Select specific fields to fetch from the Status
  **/
  select?: StatusSelect | null
  /**
   * The data needed to create a Status.
  **/
  data: StatusCreateInput
}


/**
 * Status update
 */
export type StatusUpdateArgs = {
  /**
   * Select specific fields to fetch from the Status
  **/
  select?: StatusSelect | null
  /**
   * The data needed to update a Status.
  **/
  data: StatusUpdateInput
  /**
   * Choose, which Status to update.
  **/
  where: StatusWhereUniqueInput
}


/**
 * Status updateMany
 */
export type StatusUpdateManyArgs = {
  data: StatusUpdateManyMutationInput
  where?: StatusWhereInput
}


/**
 * Status upsert
 */
export type StatusUpsertArgs = {
  /**
   * Select specific fields to fetch from the Status
  **/
  select?: StatusSelect | null
  /**
   * The filter to search for the Status to update in case it exists.
  **/
  where: StatusWhereUniqueInput
  /**
   * In case the Status found by the `where` argument doesn't exist, create a new Status with this data.
  **/
  create: StatusCreateInput
  /**
   * In case the Status was found with the provided `where` argument, update it with this data.
  **/
  update: StatusUpdateInput
}


/**
 * Status delete
 */
export type StatusDeleteArgs = {
  /**
   * Select specific fields to fetch from the Status
  **/
  select?: StatusSelect | null
  /**
   * Filter which Status to delete.
  **/
  where: StatusWhereUniqueInput
}


/**
 * Status deleteMany
 */
export type StatusDeleteManyArgs = {
  where?: StatusWhereInput
}


/**
 * Status without action
 */
export type StatusArgs = {
  /**
   * Select specific fields to fetch from the Status
  **/
  select?: StatusSelect | null
}



/**
 * Model User
 */

export type User = {
  name: string
  email: string
  address: string
  phone: number
  password: string
  id: number
}


export type AggregateUser = {
  count: number
  avg: UserAvgAggregateOutputType | null
  sum: UserSumAggregateOutputType | null
  min: UserMinAggregateOutputType | null
  max: UserMaxAggregateOutputType | null
}

export type UserAvgAggregateOutputType = {
  phone: number
  id: number
}

export type UserSumAggregateOutputType = {
  phone: number
  id: number
}

export type UserMinAggregateOutputType = {
  phone: number
  id: number
}

export type UserMaxAggregateOutputType = {
  phone: number
  id: number
}


export type UserAvgAggregateInputType = {
  phone?: true
  id?: true
}

export type UserSumAggregateInputType = {
  phone?: true
  id?: true
}

export type UserMinAggregateInputType = {
  phone?: true
  id?: true
}

export type UserMaxAggregateInputType = {
  phone?: true
  id?: true
}

export type AggregateUserArgs = {
  where?: UserWhereInput
  orderBy?: Enumerable<UserOrderByInput>
  cursor?: UserWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
  count?: true
  avg?: UserAvgAggregateInputType
  sum?: UserSumAggregateInputType
  min?: UserMinAggregateInputType
  max?: UserMaxAggregateInputType
}

export type GetUserAggregateType<T extends AggregateUserArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetUserAggregateScalarType<T[P]>
}

export type GetUserAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof UserAvgAggregateOutputType ? UserAvgAggregateOutputType[P] : never
}
    
    

export type UserSelect = {
  name?: boolean
  email?: boolean
  address?: boolean
  phone?: boolean
  password?: boolean
  id?: boolean
}

export type UserGetPayload<
  S extends boolean | null | undefined | UserArgs,
  U = keyof S
> = S extends true
  ? User
  : S extends undefined
  ? never
  : S extends UserArgs | FindManyUserArgs
  ? 'include' extends U
    ? User 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof User ? User[P]
: 
 never
    }
  : User
: User


export interface UserDelegate {
  /**
   * Find zero or one User.
   * @param {FindOneUserArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await prisma.user.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneUserArgs>(
    args: Subset<T, FindOneUserArgs>
  ): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>
  /**
   * Find zero or more Users.
   * @param {FindManyUserArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Users
   * const users = await prisma.user.findMany()
   * 
   * // Get first 10 Users
   * const users = await prisma.user.findMany({ take: 10 })
   * 
   * // Only select the `name`
   * const userWithNameOnly = await prisma.user.findMany({ select: { name: true } })
   * 
  **/
  findMany<T extends FindManyUserArgs>(
    args?: Subset<T, FindManyUserArgs>
  ): CheckSelect<T, Promise<Array<User>>, Promise<Array<UserGetPayload<T>>>>
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
  **/
  create<T extends UserCreateArgs>(
    args: Subset<T, UserCreateArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
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
  **/
  delete<T extends UserDeleteArgs>(
    args: Subset<T, UserDeleteArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
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
  **/
  update<T extends UserUpdateArgs>(
    args: Subset<T, UserUpdateArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
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
  **/
  deleteMany<T extends UserDeleteManyArgs>(
    args: Subset<T, UserDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Users.
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
  **/
  updateMany<T extends UserUpdateManyArgs>(
    args: Subset<T, UserUpdateManyArgs>
  ): Promise<BatchPayload>
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
  **/
  upsert<T extends UserUpsertArgs>(
    args: Subset<T, UserUpsertArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyUserArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateUserArgs>(args: Subset<T, AggregateUserArgs>): Promise<GetUserAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for User.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__UserClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * User findOne
 */
export type FindOneUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Filter, which User to fetch.
  **/
  where: UserWhereUniqueInput
}


/**
 * User findMany
 */
export type FindManyUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Filter, which Users to fetch.
  **/
  where?: UserWhereInput
  /**
   * Determine the order of the Users to fetch.
  **/
  orderBy?: Enumerable<UserOrderByInput>
  /**
   * Sets the position for listing Users.
  **/
  cursor?: UserWhereUniqueInput
  /**
   * The number of Users to fetch. If negative number, it will take Users before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Users.
  **/
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
}


/**
 * User create
 */
export type UserCreateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * The data needed to create a User.
  **/
  data: UserCreateInput
}


/**
 * User update
 */
export type UserUpdateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * The data needed to update a User.
  **/
  data: UserUpdateInput
  /**
   * Choose, which User to update.
  **/
  where: UserWhereUniqueInput
}


/**
 * User updateMany
 */
export type UserUpdateManyArgs = {
  data: UserUpdateManyMutationInput
  where?: UserWhereInput
}


/**
 * User upsert
 */
export type UserUpsertArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * The filter to search for the User to update in case it exists.
  **/
  where: UserWhereUniqueInput
  /**
   * In case the User found by the `where` argument doesn't exist, create a new User with this data.
  **/
  create: UserCreateInput
  /**
   * In case the User was found with the provided `where` argument, update it with this data.
  **/
  update: UserUpdateInput
}


/**
 * User delete
 */
export type UserDeleteArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Filter which User to delete.
  **/
  where: UserWhereUniqueInput
}


/**
 * User deleteMany
 */
export type UserDeleteManyArgs = {
  where?: UserWhereInput
}


/**
 * User without action
 */
export type UserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
}



/**
 * Deep Input Types
 */


export type AdminWhereInput = {
  AND?: Enumerable<AdminWhereInput>
  OR?: Array<AdminWhereInput>
  NOT?: Enumerable<AdminWhereInput>
  admin_id?: number | IntFilter
  admin_name?: string | StringFilter
  admin_mail?: string | StringFilter
  password?: string | StringFilter
  address?: string | StringFilter
  phone?: string | StringNullableFilter | null
}

export type AdminOrderByInput = {
  admin_id?: SortOrder
  admin_name?: SortOrder
  admin_mail?: SortOrder
  password?: SortOrder
  address?: SortOrder
  phone?: SortOrder
}

export type AdminWhereUniqueInput = {
  admin_id?: number
}

export type BrandsWhereInput = {
  AND?: Enumerable<BrandsWhereInput>
  OR?: Array<BrandsWhereInput>
  NOT?: Enumerable<BrandsWhereInput>
  brand?: string | StringFilter
  bid?: number | IntFilter
  categories?: Enumerable<string | StringNullableListFilter>
}

export type BrandsOrderByInput = {
  brand?: SortOrder
  bid?: SortOrder
  categories?: SortOrder
}

export type BrandsWhereUniqueInput = {
  bid?: number
}

export type BuyWhereInput = {
  AND?: Enumerable<BuyWhereInput>
  OR?: Array<BuyWhereInput>
  NOT?: Enumerable<BuyWhereInput>
  buyid?: number | IntFilter
  uid?: number | IntFilter
  pid?: number | IntFilter
  buying_date?: Date | string | DateTimeFilter
  shiping_date?: Date | string | DateTimeNullableFilter | null
  delivery_date?: Date | string | DateTimeNullableFilter | null
  total_amount?: number | FloatFilter
  quantity?: number | IntFilter
  status?: number | IntFilter
}

export type BuyOrderByInput = {
  buyid?: SortOrder
  uid?: SortOrder
  pid?: SortOrder
  buying_date?: SortOrder
  shiping_date?: SortOrder
  delivery_date?: SortOrder
  total_amount?: SortOrder
  quantity?: SortOrder
  status?: SortOrder
}

export type BuyWhereUniqueInput = {
  buyid?: number
}

export type CartWhereInput = {
  AND?: Enumerable<CartWhereInput>
  OR?: Array<CartWhereInput>
  NOT?: Enumerable<CartWhereInput>
  cart_id?: number | IntFilter
  uid?: number | IntFilter
  pid?: number | IntFilter
}

export type CartOrderByInput = {
  cart_id?: SortOrder
  uid?: SortOrder
  pid?: SortOrder
}

export type CartWhereUniqueInput = {
  cart_id?: number
}

export type CategoryWhereInput = {
  AND?: Enumerable<CategoryWhereInput>
  OR?: Array<CategoryWhereInput>
  NOT?: Enumerable<CategoryWhereInput>
  category?: string | StringFilter
  cid?: number | IntFilter
}

export type CategoryOrderByInput = {
  category?: SortOrder
  cid?: SortOrder
}

export type CategoryWhereUniqueInput = {
  cid?: number
}

export type ProductsWhereInput = {
  AND?: Enumerable<ProductsWhereInput>
  OR?: Array<ProductsWhereInput>
  NOT?: Enumerable<ProductsWhereInput>
  pid?: number | IntFilter
  productname?: string | StringFilter
  rate?: number | FloatFilter
  description?: string | StringFilter
  discount?: number | FloatFilter
  rating?: number | FloatFilter
  cid?: number | IntFilter
  bid?: number | IntFilter
  images?: Enumerable<string | StringNullableListFilter>
}

export type ProductsOrderByInput = {
  pid?: SortOrder
  productname?: SortOrder
  rate?: SortOrder
  description?: SortOrder
  discount?: SortOrder
  rating?: SortOrder
  cid?: SortOrder
  bid?: SortOrder
  images?: SortOrder
}

export type ProductsWhereUniqueInput = {
  pid?: number
}

export type ReviewsWhereInput = {
  AND?: Enumerable<ReviewsWhereInput>
  OR?: Array<ReviewsWhereInput>
  NOT?: Enumerable<ReviewsWhereInput>
  rid?: number | IntFilter
  uid?: number | IntFilter
  pid?: number | IntFilter
  review?: string | StringFilter
  rating?: number | FloatFilter
  buyid?: number | IntFilter
  uploaded_date?: Date | string | DateTimeFilter
}

export type ReviewsOrderByInput = {
  rid?: SortOrder
  uid?: SortOrder
  pid?: SortOrder
  review?: SortOrder
  rating?: SortOrder
  buyid?: SortOrder
  uploaded_date?: SortOrder
}

export type ReviewsWhereUniqueInput = {
  rid?: number
}

export type StatusWhereInput = {
  AND?: Enumerable<StatusWhereInput>
  OR?: Array<StatusWhereInput>
  NOT?: Enumerable<StatusWhereInput>
  sid?: number | IntFilter
  statusName?: string | StringFilter
}

export type StatusOrderByInput = {
  sid?: SortOrder
  statusName?: SortOrder
}

export type StatusWhereUniqueInput = {
  sid?: number
}

export type UserWhereInput = {
  AND?: Enumerable<UserWhereInput>
  OR?: Array<UserWhereInput>
  NOT?: Enumerable<UserWhereInput>
  name?: string | StringFilter
  email?: string | StringFilter
  address?: string | StringFilter
  phone?: number | IntFilter
  password?: string | StringFilter
  id?: number | IntFilter
}

export type UserOrderByInput = {
  name?: SortOrder
  email?: SortOrder
  address?: SortOrder
  phone?: SortOrder
  password?: SortOrder
  id?: SortOrder
}

export type UserWhereUniqueInput = {
  id?: number
}

export type AdminCreateInput = {
  admin_name: string
  admin_mail: string
  password: string
  address: string
  phone?: string | null
}

export type AdminUpdateInput = {
  admin_name?: string | StringFieldUpdateOperationsInput
  admin_mail?: string | StringFieldUpdateOperationsInput
  password?: string | StringFieldUpdateOperationsInput
  address?: string | StringFieldUpdateOperationsInput
  phone?: string | NullableStringFieldUpdateOperationsInput | null
}

export type AdminUpdateManyMutationInput = {
  admin_name?: string | StringFieldUpdateOperationsInput
  admin_mail?: string | StringFieldUpdateOperationsInput
  password?: string | StringFieldUpdateOperationsInput
  address?: string | StringFieldUpdateOperationsInput
  phone?: string | NullableStringFieldUpdateOperationsInput | null
}

export type BrandsCreateInput = {
  brand: string
  categories?: BrandsCreatecategoriesInput
}

export type BrandsUpdateInput = {
  brand?: string | StringFieldUpdateOperationsInput
  categories?: BrandsUpdatecategoriesInput
}

export type BrandsUpdateManyMutationInput = {
  brand?: string | StringFieldUpdateOperationsInput
  categories?: BrandsUpdatecategoriesInput
}

export type BuyCreateInput = {
  uid: number
  pid: number
  buying_date: Date | string
  shiping_date?: Date | string | null
  delivery_date?: Date | string | null
  total_amount: number
  quantity: number
  status?: number
}

export type BuyUpdateInput = {
  uid?: number | IntFieldUpdateOperationsInput
  pid?: number | IntFieldUpdateOperationsInput
  buying_date?: Date | string | DateTimeFieldUpdateOperationsInput
  shiping_date?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  delivery_date?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  total_amount?: number | FloatFieldUpdateOperationsInput
  quantity?: number | IntFieldUpdateOperationsInput
  status?: number | IntFieldUpdateOperationsInput
}

export type BuyUpdateManyMutationInput = {
  uid?: number | IntFieldUpdateOperationsInput
  pid?: number | IntFieldUpdateOperationsInput
  buying_date?: Date | string | DateTimeFieldUpdateOperationsInput
  shiping_date?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  delivery_date?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  total_amount?: number | FloatFieldUpdateOperationsInput
  quantity?: number | IntFieldUpdateOperationsInput
  status?: number | IntFieldUpdateOperationsInput
}

export type CartCreateInput = {
  uid: number
  pid: number
}

export type CartUpdateInput = {
  uid?: number | IntFieldUpdateOperationsInput
  pid?: number | IntFieldUpdateOperationsInput
}

export type CartUpdateManyMutationInput = {
  uid?: number | IntFieldUpdateOperationsInput
  pid?: number | IntFieldUpdateOperationsInput
}

export type CategoryCreateInput = {
  category: string
}

export type CategoryUpdateInput = {
  category?: string | StringFieldUpdateOperationsInput
}

export type CategoryUpdateManyMutationInput = {
  category?: string | StringFieldUpdateOperationsInput
}

export type ProductsCreateInput = {
  productname: string
  rate: number
  description: string
  discount?: number
  rating: number
  cid: number
  bid: number
  images?: ProductsCreateimagesInput
}

export type ProductsUpdateInput = {
  productname?: string | StringFieldUpdateOperationsInput
  rate?: number | FloatFieldUpdateOperationsInput
  description?: string | StringFieldUpdateOperationsInput
  discount?: number | FloatFieldUpdateOperationsInput
  rating?: number | FloatFieldUpdateOperationsInput
  cid?: number | IntFieldUpdateOperationsInput
  bid?: number | IntFieldUpdateOperationsInput
  images?: ProductsUpdateimagesInput
}

export type ProductsUpdateManyMutationInput = {
  productname?: string | StringFieldUpdateOperationsInput
  rate?: number | FloatFieldUpdateOperationsInput
  description?: string | StringFieldUpdateOperationsInput
  discount?: number | FloatFieldUpdateOperationsInput
  rating?: number | FloatFieldUpdateOperationsInput
  cid?: number | IntFieldUpdateOperationsInput
  bid?: number | IntFieldUpdateOperationsInput
  images?: ProductsUpdateimagesInput
}

export type ReviewsCreateInput = {
  uid: number
  pid: number
  review: string
  rating: number
  buyid: number
  uploaded_date: Date | string
}

export type ReviewsUpdateInput = {
  uid?: number | IntFieldUpdateOperationsInput
  pid?: number | IntFieldUpdateOperationsInput
  review?: string | StringFieldUpdateOperationsInput
  rating?: number | FloatFieldUpdateOperationsInput
  buyid?: number | IntFieldUpdateOperationsInput
  uploaded_date?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type ReviewsUpdateManyMutationInput = {
  uid?: number | IntFieldUpdateOperationsInput
  pid?: number | IntFieldUpdateOperationsInput
  review?: string | StringFieldUpdateOperationsInput
  rating?: number | FloatFieldUpdateOperationsInput
  buyid?: number | IntFieldUpdateOperationsInput
  uploaded_date?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type StatusCreateInput = {
  statusName: string
}

export type StatusUpdateInput = {
  statusName?: string | StringFieldUpdateOperationsInput
}

export type StatusUpdateManyMutationInput = {
  statusName?: string | StringFieldUpdateOperationsInput
}

export type UserCreateInput = {
  name: string
  email: string
  address: string
  phone: number
  password: string
}

export type UserUpdateInput = {
  name?: string | StringFieldUpdateOperationsInput
  email?: string | StringFieldUpdateOperationsInput
  address?: string | StringFieldUpdateOperationsInput
  phone?: number | IntFieldUpdateOperationsInput
  password?: string | StringFieldUpdateOperationsInput
}

export type UserUpdateManyMutationInput = {
  name?: string | StringFieldUpdateOperationsInput
  email?: string | StringFieldUpdateOperationsInput
  address?: string | StringFieldUpdateOperationsInput
  phone?: number | IntFieldUpdateOperationsInput
  password?: string | StringFieldUpdateOperationsInput
}

export type IntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntFilter
}

export type StringFilter = {
  equals?: string
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: string | NestedStringFilter
}

export type StringNullableFilter = {
  equals?: string | null
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string | null
  lte?: string | null
  gt?: string | null
  gte?: string | null
  contains?: string | null
  startsWith?: string | null
  endsWith?: string | null
  not?: string | NestedStringNullableFilter | null
}

export type StringNullableListFilter = {
  equals?: Enumerable<string>
}

export type DateTimeFilter = {
  equals?: Date | string
  in?: Enumerable<Date | string>
  notIn?: Enumerable<Date | string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: Date | string | NestedDateTimeFilter
}

export type DateTimeNullableFilter = {
  equals?: Date | string | null
  in?: Enumerable<Date | string> | null
  notIn?: Enumerable<Date | string> | null
  lt?: Date | string | null
  lte?: Date | string | null
  gt?: Date | string | null
  gte?: Date | string | null
  not?: Date | string | NestedDateTimeNullableFilter | null
}

export type FloatFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedFloatFilter
}

export type StringFieldUpdateOperationsInput = {
  set?: string
}

export type NullableStringFieldUpdateOperationsInput = {
  set?: string | null
}

export type BrandsCreatecategoriesInput = {
  set?: Enumerable<string>
}

export type BrandsUpdatecategoriesInput = {
  set?: Enumerable<string>
}

export type IntFieldUpdateOperationsInput = {
  set?: number
}

export type DateTimeFieldUpdateOperationsInput = {
  set?: Date | string
}

export type NullableDateTimeFieldUpdateOperationsInput = {
  set?: Date | string | null
}

export type FloatFieldUpdateOperationsInput = {
  set?: number
}

export type ProductsCreateimagesInput = {
  set?: Enumerable<string>
}

export type ProductsUpdateimagesInput = {
  set?: Enumerable<string>
}

export type NestedIntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: NestedIntFilter | null
}

export type NestedStringFilter = {
  equals?: string
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: NestedStringFilter | null
}

export type NestedStringNullableFilter = {
  equals?: string | null
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string | null
  lte?: string | null
  gt?: string | null
  gte?: string | null
  contains?: string | null
  startsWith?: string | null
  endsWith?: string | null
  not?: NestedStringNullableFilter | null
}

export type NestedDateTimeFilter = {
  equals?: Date | string
  in?: Enumerable<Date | string>
  notIn?: Enumerable<Date | string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: NestedDateTimeFilter | null
}

export type NestedDateTimeNullableFilter = {
  equals?: Date | string | null
  in?: Enumerable<Date | string> | null
  notIn?: Enumerable<Date | string> | null
  lt?: Date | string | null
  lte?: Date | string | null
  gt?: Date | string | null
  gte?: Date | string | null
  not?: NestedDateTimeNullableFilter | null
}

export type NestedFloatFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: NestedFloatFilter | null
}

/**
 * Batch Payload for updateMany & deleteMany
 */

export type BatchPayload = {
  count: number
}

/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
