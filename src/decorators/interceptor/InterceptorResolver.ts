
import { ProviderClass, Container, Resolver } from 'platform'
import { getInterceptor } from './Interceptor'

export class InterceptorResolver implements Resolver {
  type: string = 'type:interceptor'

  constructor(private _container: Container) {}

  resolveSync = <T>(providerClass: ProviderClass<T>): T => {
    const provider = getInterceptor(providerClass)

    if (this._container._instances.has(provider.token)) return this._container._instances.get(provider.token)!

    const newInstance = this._container.instanceCreator.createInstance(provider)

    // cache
    this._container._instances.set(provider.token, newInstance)

    return newInstance
  }
}
