import { ProviderClass, Container, Resolver } from 'platform'

import { getController } from './Controller'

export class ControllerResolver implements Resolver {
  type: string = 'type:controller'

  constructor(private _container: Container) {}

  resolveSync = <T>(providerClass: ProviderClass<T>): T => {
    const provider = getController(providerClass)

    if (this._container._instances.has(provider.token)) return this._container._instances.get(provider.token)!

    const newInstance = this._container.instanceCreator.createInstance(provider)

    // cache
    this._container._instances.set(provider.token, newInstance)

    return newInstance
  }
}
