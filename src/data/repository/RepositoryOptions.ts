import { Source } from '#data/source/Source'
import { Class } from 'platform'

export interface RepositoryOptions {
  returnType?: 'entity' | 'model'
  timestamps?: boolean
}

export interface RepositoryParameters<EntityType = any, ModelType = any> {
  name: string
  source: Source
  model?: Class<ModelType>
  options?: Partial<RepositoryOptions>
}

export const defaultOptions: RepositoryOptions = {
  returnType: 'entity',
  timestamps: true,
}

// Utility function to merge default options with user-provided options
export const createOptions = (userOptions?: Partial<RepositoryOptions>): RepositoryOptions => ({
  ...defaultOptions,
  ...userOptions,
})
