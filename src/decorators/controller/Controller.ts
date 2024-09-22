import { getProvider, Provider, ProviderClass, get, set, setToken, setType } from 'platform'

const ROUTE_METADATA_KEY = 'provider:routes'

export interface ControllerMeta extends Provider {
  key: string
  guards: ProviderClass[]
  interceptors: ProviderClass[]
  routes: RouteMetadata[]
}

/**
 * Controller Decorator
 */
export const Controller = (metadata?: Partial<ControllerMeta> | string) => {
  return (target: any) => {
    if (typeof metadata === 'string') {
      Provider({})(target)

      setType(target, 'type:controller')
      set(target, 'provider:key', metadata)
      set(target, 'provider:guards', [])
      set(target, 'provider:interceptors', [])
    } else {
      Provider(metadata)(target)
      setType(target, 'type:controller')

      set(target, 'provider:key', metadata?.key)
      set(target, 'provider:guards', metadata?.guards ?? [])
      set(target, 'provider:interceptors', metadata?.interceptors ?? [])
    }
  }
}

/**
 * Controller Reader
 */
export const getController = (providerClass: ProviderClass): ControllerMeta => {
  const provider = getProvider(providerClass)

  return {
    ...provider,
    key: get(providerClass, 'provider:key'),
    guards: get(providerClass, 'provider:guards'),
    interceptors: get(providerClass, 'provider:interceptors'),
    routes: get(providerClass, ROUTE_METADATA_KEY),
  }
}

type RouteMetadata = {
  key: string
  method: string
  guards: ProviderClass[]
  interceptors: ProviderClass[]
}

export const Route =
  (metadata?: Partial<RouteMetadata>) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const existingRoutes: RouteMetadata[] = get(target.constructor, ROUTE_METADATA_KEY) ?? []

    existingRoutes.push({
      key: metadata?.key ?? propertyKey,
      method: propertyKey,
      guards: metadata?.guards ?? [],
      interceptors: metadata?.interceptors ?? [],
    })

    set(target.constructor, ROUTE_METADATA_KEY, existingRoutes)
  }

export const getRoutes = (providerClass: ProviderClass): RouteMetadata[] => {
  return (get(providerClass, ROUTE_METADATA_KEY) as RouteMetadata[]) ?? []
}

// export const useGuards = (...providerClasses: ProviderClass[]) => {
//   return (target: any, method:string, desc:PropertyDecorator) => {
//     set(target, 'provider:guards', providerClasses)
//   }
// }

// export const useInterceptors = (...providerClasses: ProviderClass[]) => {
//   return (target: any) => {
//     set(target, 'provider:interceptors', providerClasses)
//   }
// }
