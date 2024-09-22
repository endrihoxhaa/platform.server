import { ProviderClass, Container, Resolver } from 'platform'
import { getModule } from './Module'

export class ModuleResolver implements Resolver {
  type: string = 'type:module'

  constructor(private _container: Container) {}

  resolveSync = <T>(providerClass: ProviderClass<T>): T => {
    const module = getModule(providerClass)

    if (this._container._instances.has(module.token)) return this._container._instances.get(module.token)!

    this._container.resolveSyncAll([
      ...module.services,
      ...module.repositories,
      ...module.controllers,
      ...module.providers,
      ...module.imports,
    ])

    const newInstance = this._container.instanceCreator.createInstance(module)

    // cache
    this._container._instances.set(module.token, newInstance)

    return newInstance
  }
}
