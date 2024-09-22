import { getProvider, Provider, ProviderClass,setType } from 'platform'

export interface Guardian extends Provider {}

/**
 * Guard Decorator
 */
export const Guardi = (metadata?: Partial<Guardian>) => {
  return (target: any) => {
    Provider(metadata)(target)
    setType(target, 'type:guard')
  }
}

/**
 * Guard Reader
 */
export const getGuardian = (providerClass: ProviderClass): Guardian => {
  return {
    ...getProvider(providerClass),
  }
}

