import { getProvider, Provider, ProviderClass, get, set, setToken, setType } from 'platform'


export interface Service extends Provider {}

/**
 * Service Decorator
 */
export const Service = (metadata?: Partial<Service>) => {
  return (target: any) => {
    Provider(metadata)(target)

    setType(target, 'type:service')
  }
}

/**
 * Service Reader
 */
export const getService = (providerClass: ProviderClass): Service => {
  return {
    ...getProvider(providerClass),
  }
}
