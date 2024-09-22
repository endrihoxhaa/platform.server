import { Entity } from '#data/entity/Entity'
import { QueryRequest } from './Query'
import { QueryFilter } from './QueryFilter'

export const createQuery = (collection: string) => new QueryBuilder(collection)

export class QueryBuilder {
  private _operation: QueryRequest['operation'] = 'createOne'
  private _operation_type: QueryRequest['operation_type'] = 'create'
  private _operation_size: QueryRequest['operation_size'] = 'one'
  private _filter: QueryRequest['filter'] = {}
  private _data: QueryRequest['data'] = null
  private _options: QueryRequest['options'] = {}

  constructor(private _collection: string) {}

  // Set operation for inserting a single document
  createOne(data: Entity): this {
    this._operation = 'createOne'
    this._operation_type = 'create'
    this._operation_size = 'one'
    this._data = data
    return this
  }

  // Set operation for inserting multiple documents
  createMany(data: Entity[]): this {
    this._operation = 'createMany'
    this._operation_type = 'create'
    this._operation_size = 'many'
    this._data = data
    return this
  }

  // Set operation for finding a single document
  readOne(filter: QueryFilter): this {
    this._operation = 'readOne'
    this._operation_type = 'read'
    this._operation_size = 'one'
    this._filter = filter
    this._data = null // No data needed for findOne operation
    return this
  }

  // Set operation for finding multiple documents
  readMany(filter?: QueryFilter): this {
    this._operation = 'readMany'
    this._operation_type = 'read'
    this._operation_size = 'many'
    this._filter = filter
    this._data = null // No data needed for find operation
    return this
  }

  // Set operation for updating a single document
  updateOne(filter: QueryFilter, updateOperations: Entity): this {
    this._operation = 'updateOne'
    this._operation_type = 'update'
    this._operation_size = 'one'
    this._filter = filter
    this._data = updateOperations
    return this
  }

  // Set operation for updating multiple documents
  updateMany(filter: QueryFilter, updateOperations: Entity): this {
    this._operation = 'updateMany'
    this._operation_type = 'update'
    this._operation_size = 'many'
    this._filter = filter
    this._data = updateOperations
    return this
  }

  // Set operation for deleting a single document
  deleteOne(filter: QueryFilter): this {
    this._operation = 'deleteOne'
    this._operation_type = 'delete'
    this._operation_size = 'one'
    this._filter = filter
    this._data = null // No data needed for deleteOne operation
    return this
  }

  // Set operation for deleting multiple documents
  deleteMany(filter: QueryFilter): this {
    this._operation = 'deleteMany'
    this._operation_type = 'delete'
    this._operation_size = 'many'
    this._filter = filter
    this._data = null // No data needed for deleteMany operation
    return this
  }

  // Set query options
  options(options: QueryRequest['options']): this {
    this._options = options
    return this
  }

  // Build the final query object
  build(): QueryRequest {
    if (!this._operation) {
      throw new Error('Operation type must be specified.')
    }

    return {
      collection: this._collection,

      operation: this._operation,
      operation_type: this._operation_type,
      operation_size: this._operation_size,

      data: this._data,

      filter: this._filter,
      options: this._options,
    }
  }
}
