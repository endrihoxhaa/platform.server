import { QueryRequest } from '#data/query/Query'
import { Transformer } from './Transformer'

export class TransformerTimestamp implements Transformer {
  constructor() {}

  onQueryRequest(query: QueryRequest): QueryRequest {
    if(!query.data) return query

    const now = new Date().toISOString()

    if (query.operation_type === 'create' && query.operation_size === 'one') {
      query.data['created_at'] = now
      query.data['updated_at'] = now
    }

    return query
  }
}
