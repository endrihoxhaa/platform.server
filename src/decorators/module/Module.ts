import { getProvider, Provider, ProviderClass, get, set, setToken, setType } from 'platform'

export interface Module extends Provider {
  services: ProviderClass[]
  controllers: ProviderClass[]
  repositories: ProviderClass[]

  providers: ProviderClass[]
  imports: ProviderClass[]
}

/**
 * Module Decorator
 */
export const Module = (metadata?: Partial<Module>) => {
  return (target: any) => {
    Provider(metadata)(target)

    setType(target, 'type:module')
    set(target, 'module:services', metadata?.services ?? [])
    set(target, 'module:controllers', metadata?.controllers ?? [])
    set(target, 'module:repositories', metadata?.repositories ?? [])
    set(target, 'module:providers', metadata?.providers ?? [])
    set(target, 'module:imports', metadata?.imports ?? [])
  }
}

/**
 * Module Reader
 */
export const getModule = (providerClass: ProviderClass): Module => {
  return {
    ...getProvider(providerClass),
    services: get(providerClass, 'module:services') ?? [],
    controllers: get(providerClass, 'module:controllers') ?? [],
    repositories: get(providerClass, 'module:repositories') ?? [],
    providers: get(providerClass, 'module:providers') ?? [],
    imports: get(providerClass, 'module:imports') ?? [],
  }
}
