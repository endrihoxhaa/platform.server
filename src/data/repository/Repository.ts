import { ClearEntity, EntityWithoutId } from '#data/entity/Entity'
import { QueryRequest, QueryResponse } from '#data/query/Query'
import { Source } from '#data/source/Source'
import { createQuery } from '#data/query/QueryBuilder'
import { QueryFilter } from '#data/query/QueryFilter'
import { QueryOptions } from '#data/query/QueryOptions'
import { Transformator } from '#data/transform/Transformator'
import { TransformerModel } from '#data/transform/TransformerModel'
import { TransformerTimestamp } from '#data/transform/TransformerTimestamp'
import { createOptions, RepositoryOptions, RepositoryParameters } from './RepositoryOptions'
import { TransformerID } from '#data/transform/TransformerID'
import { Class } from 'platform'

export class Repository<EntityType = any, ModelType = any> {
  public _name: string
  public _source: Source
  public _model?: Class<ModelType>
  public _options: RepositoryOptions
  private _transformator: Transformator

  constructor({ name, source, model, options }: RepositoryParameters<EntityType, ModelType>) {
    this._name = name
    this._source = source
    this._model = model
    this._options = createOptions(options)
    this._transformator = new Transformator()
    this._initializeTransformers()
  }

  private _initializeTransformers() {
    this._transformator.addTransformer(new TransformerID())
    if (this._model && this._options?.returnType === 'model')
      this._transformator.addTransformer(new TransformerModel<ModelType>(this))
    if (this._options?.timestamps) this._transformator.addTransformer(new TransformerTimestamp())
  }

  query() {
    return createQuery(this._name)
  }

  async execute<DataType = any>(query: QueryRequest) {
    const transformedQuery = this._transformator.onQueryRequest(query)
    const queryResponse = await this._source.execute<DataType>(transformedQuery)
    const transformedResponse = this._transformator.onQueryRespond(queryResponse)
    return transformedResponse.data
  }

  async executeRaw<DataType = any>(queryRequest: QueryRequest) {
    return this._source.execute<DataType>(queryRequest)
  }

  async createOne(entity: ClearEntity<EntityType>, options?: QueryOptions<EntityType>) {
    const query = this.query().createOne(entity).options(options).build()
    return this.execute<EntityType | ModelType>(query)
  }

  async createMany(entities: ClearEntity<EntityType>[], options?: QueryOptions<EntityType>) {
    const query = this.query().createMany(entities).options(options).build()
    return this.execute<QueryResponse<EntityType[]>>(query)
  }

  async readMany(filter?: QueryFilter, options?: QueryOptions<EntityType>) {
    const query = this.query().readMany(filter).options(options).build()
    return this.execute<QueryResponse<EntityType[]>>(query)
  }

  async readOne(filter: QueryFilter, options?: QueryOptions<EntityType>) {
    const query = this.query().readOne(filter).options(options).build()
    return this.execute<QueryResponse<EntityType>>(query)
  }

  async readOneById(id: string, options?: QueryOptions<EntityType>) {
    const filter: QueryFilter = { id }
    const query = this.query().readOne(filter).options(options).build()
    return this.execute<QueryResponse<EntityType>>(query)
  }

  async readOneByKey<Key extends keyof EntityType>(key: Key, value: EntityType[Key], options?: QueryOptions<EntityType>) {
    const filter: QueryFilter = { [key]: value }
    const query = this.query().readOne(filter).options(options).build()
    return this.execute<QueryResponse<EntityType>>(query)
  }

  async updateMany(filter: QueryFilter, updateOperations: Partial<EntityType>) {
    const query = this.query().updateMany(filter, updateOperations).build()
    return this.execute<QueryResponse<EntityType[]>>(query)
  }

  async updateOne(filter: QueryFilter, updateOperations: Partial<EntityType>) {
    const query = this.query().updateOne(filter, updateOperations).build()
    return this.execute<QueryResponse<EntityType>>(query)
  }

  async updateOneById(id: string, updateOperations: Partial<EntityType>, options?: QueryOptions<EntityType>) {
    const filter: QueryFilter = { id }
    const query = this.query().updateOne(filter, updateOperations).options(options).build()
    return this.execute<QueryResponse<EntityType>>(query)
  }

  async updateOneByKey<Key extends keyof EntityType>(
    key: Key,
    value: EntityType[Key],
    updateOperations: Partial<EntityType>,
    options?: QueryOptions<EntityType>
  ) {
    const filter: QueryFilter = { [key]: value }
    const query = this.query().updateOne(filter, updateOperations).options(options).build()
    return this.execute<QueryResponse<EntityType>>(query)
  }

  async deleteMany(filter: QueryFilter) {
    const query = this.query().deleteMany(filter).build()
    return this.execute<QueryResponse<EntityType[]>>(query)
  }

  async deleteOne(filter: QueryFilter) {
    const query = this.query().deleteOne(filter).build()
    return this.execute<QueryResponse<EntityType>>(query)
  }

  async deleteOneById(id: string, options?: QueryOptions<EntityType>) {
    const filter: QueryFilter = { id }
    const query = this.query().deleteOne(filter).options(options).build()
    return this.execute<QueryResponse<EntityType>>(query)
  }

  async deleteOneByKey<Key extends keyof EntityType>(key: Key, value: EntityType[Key], options?: QueryOptions<EntityType>) {
    const filter: QueryFilter = { [key]: value }
    const query = this.query().deleteOne(filter).options(options).build()
    return this.execute<QueryResponse<EntityType>>(query)
  }
}
