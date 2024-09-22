export type Entity = Record<string, any>
export type Nothing = null

// Types for entities with and without ID
export type EntityWithId<T> = T & { id: string };
export type EntityWithoutId<T> = Omit<T, 'id'>;
export type ClearEntity<T> = Omit<T, 'id' | 'created_at' | 'updated_at'>;