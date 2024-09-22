import { QueryFilter } from './QueryFilter'
import { QueryOptions } from './QueryOptions'

// Define specific operations for querying
type OperationType = 'createOne' | 'createMany' | 'readOne' | 'readMany' | 'updateOne' | 'updateMany' | 'deleteOne' | 'deleteMany'

// Query definition for requests
export interface QueryRequest<DataType = any> {
  collection: string

  operation: OperationType
  operation_type: 'create' | 'read' | 'update' | 'delete'
  operation_size: 'one' | 'many'

  data: DataType

  filter?: QueryFilter
  options?: QueryOptions
}

// Query definition for responses
export interface QueryResponse<DataType = any> extends QueryRequest {
  ack: boolean
  data: DataType
}
