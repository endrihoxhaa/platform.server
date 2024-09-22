import { QueryRequest, QueryResponse } from '#data/query/Query'

export abstract class Transformer {
  abstract onQueryRequest?(query: QueryRequest): QueryRequest

  abstract onQueryRespond?(query: QueryResponse): QueryResponse
}
