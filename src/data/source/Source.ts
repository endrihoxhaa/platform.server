import { QueryRequest, QueryResponse } from '#data/query/Query';

/**
 * Abstract class representing a data source.
 * Concrete implementations will define how to connect, disconnect, and execute queries.
 */
export abstract class Source {
  /**
   * Establishes a connection to the data source.
   */
  abstract connect(): Promise<void>;

  /**
   * Closes the connection to the data source.
   */
  abstract disconnect(): Promise<void>;

  /**
   * Executes a query against the data source and returns the result.
   * @param query - The query to execute.
   * @returns A promise that resolves with the query response.
   */
  abstract execute<DataType = any>(query: QueryRequest): Promise<QueryResponse<DataType>>;
}
