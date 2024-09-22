import { Repository } from '#data/Data'
import { QueryResponse } from '#data/query/Query'
import { Transformer } from './Transformer'

export class TransformerModel<ModelType> implements Transformer {
  constructor(private _repository: Repository) {}

  onQueryRespond(query: QueryResponse): QueryResponse {
    if (!this._repository._model || !query.data) return query // Early exit if no model is set

    let returnType = this._repository._options.returnType
    if (query.options?.return) returnType = query.options?.return

    if(returnType !== 'model') return query

    if (query.operation_size === 'one' && query.operation_type === 'create') {
      query.data = new (this._repository._model as any)(query.data, this._repository)
      return query
    }

    if (query.operation_size === 'one' && query.operation_type === 'read') {
      query.data = new (this._repository._model as any)(query.data, this._repository)
      return query
    }


    if (query.operation_size === 'many' && query.operation_type === 'read' ) {
      for (let index = 0; index < query.data.length; index++) {
        query.data[index] = new (this._repository._model as any)(query.data[index], this._repository)
      }
      return query
    }

    return query
  }
}
