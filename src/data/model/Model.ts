import { Class } from 'platform'

export type Model<EntityType = any> = EntityType & {
  save(): Promise<boolean>
  delete(): Promise<boolean>
}

// Constructor type for models that include entity and base methods
export type ModelClass<EntityType = any> = Class<Model<EntityType>, EntityType>
