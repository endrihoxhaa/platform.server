import { QueryRequest, QueryResponse } from '#data/query/Query'
import { createID } from 'platform'
import { Transformer } from './Transformer'

export class TransformerID implements Transformer {
  onQueryRequest(query: QueryRequest): QueryRequest {
    if (query.operation_type === 'create' && query.operation_size === 'one') {
      if (!query.data['id']) {
        query.data['_id'] = createID()
      } else {
        query.data['_id'] = query.data['id']
        delete query.data['id']
      }
    }

    return query
  }

  onQueryRespond(query: QueryResponse): QueryResponse {
    if (!query.data) return query

    if (query.operation_type === 'read' && query.operation_size === 'one') {
      query.data = this.transformOne(query.data)
    }

    if (query.operation_type === 'create' && query.operation_size === 'one') {
      query.data = this.transformOne(query.data)
    }

    if (query.operation_type === 'read' && query.operation_size === 'many') {
      for (let index = 0; index < query.data.length; index++) {
        query.data[index] = this.transformOne(query.data[index])
      }
    }

    return query
  }

  transformOne(record: any) {
    if (record['_id'])
      record = {
        id: record['_id'],
        ...record,
      }

    if (record['_id']) delete record['_id']
    return record
  }
}
