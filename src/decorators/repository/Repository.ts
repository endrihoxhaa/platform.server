import { getProvider, Provider, ProviderClass, get, set, setToken, setType } from 'platform'


export interface RepositoryMeta extends Provider {}

/**
 * Repository Decorator
 */
export const Repositori = (metadata?: Partial<RepositoryMeta>) => {
  return (target: any) => {
    Provider(metadata)(target)

    setType(target, 'type:repository')
  }
}

/**
 * Repository Reader
 */
export const getRepository = (providerClass: ProviderClass): RepositoryMeta => {
  return {
    ...getProvider(providerClass),
  }
}
