import { ProviderClass, Container, Resolver } from 'platform'
import { getGuardian } from './Guard'

export class GuardResolver implements Resolver {
  type: string = 'type:guard'

  constructor(private _container: Container) {}

  resolveSync = <T>(providerClass: ProviderClass<T>): T => {
    const provider = getGuardian(providerClass)

    if (this._container._instances.has(provider.token)) return this._container._instances.get(provider.token)!

    const newInstance = this._container.instanceCreator.createInstance(provider)

    // cache
    this._container._instances.set(provider.token, newInstance)

    return newInstance
  }
}
