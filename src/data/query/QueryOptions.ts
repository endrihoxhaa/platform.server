export interface QueryOptions<EntityType = any> {
  /**
   * Projection specifies which fields to include or exclude from the results.
   * Example: { field1: true, field2: false } includes `field1` and excludes `field2`.
   */
  projection?: Partial<Record<keyof EntityType, boolean>>

  /**
   * Sorting options define how to sort the results.
   * Example: { field1: 'asc', field2: 'desc' } sorts by `field1` in ascending order and `field2` in descending order.
   */
  sort?: Partial<Record<keyof EntityType, 'asc' | 'desc'>>

  /**
   * Limit the number of results returned by the query.
   * Example: `10` limits the result set to 10 documents.
   */
  limit?: number

  /**
   * Skip is used for pagination, defining the number of documents to skip before starting to collect the results.
   * Example: `5` skips the first 5 documents.
   */
  skip?: number

  return?: 'model' | 'entity'
}
