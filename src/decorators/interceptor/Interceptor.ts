import { getProvider, Provider, ProviderClass, get, set, setToken, setType } from 'platform'


export interface Interceptian extends Provider {}

/**
 * Interceptor Decorator
 */
export const Intercepti = (metadata?: Partial<Interceptian>) => {
  return (target: any) => {
    Provider(metadata)(target)
    setType(target, 'type:interceptor')
  }
}

/**
 * Interceptor Reader
 */
export const getInterceptor = (providerClass: ProviderClass): Interceptian => {
  return {
    ...getProvider(providerClass),
  }
}

