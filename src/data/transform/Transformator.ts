import { QueryRequest, QueryResponse } from '#data/query/Query'
import { Transformer } from './Transformer'

export class Transformator {
  private _transformers: Transformer[] = []

  addTransformer(transformer: Transformer) {
    this._transformers.push(transformer)
  }

  onQueryRequest<QueryRequest>(query: QueryRequest) {
    let lastQuery: QueryRequest = query

    for (const transformer of this._transformers) {
      if (transformer.onQueryRequest) lastQuery = transformer.onQueryRequest(lastQuery as any) as QueryRequest
    }

    return lastQuery
  }

  onQueryRespond<QueryResponse>(query: QueryResponse) {
    let lastQuery: QueryResponse = query

    for (const transformer of this._transformers) {
      if (transformer.onQueryRespond) lastQuery = transformer.onQueryRespond(lastQuery as any) as QueryResponse
    }

    return lastQuery
  }
}
