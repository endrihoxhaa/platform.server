// Basic query operators
export type ComparisonOperator = '$eq' | '$ne' | '$gt' | '$lt' | '$gte' | '$lte' | '$in' | '$nin'

// Logical operators
export type LogicalOperator = '$and' | '$or' | '$not'

// Query operator types
export type QueryOperator = ComparisonOperator | LogicalOperator

// Filter value types
export type FilterValue = any | FilterCondition | FilterCondition[]

// Filter condition type
export interface FilterCondition {
  [operator: string]: FilterValue
}

// Main filter type
export interface QueryFilter {
  [key: string]: FilterValue | FilterCondition
}
