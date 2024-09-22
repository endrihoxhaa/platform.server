import { Provider, ProviderClass, Container, Registrar } from 'platform'
import { getGuardian } from './Guard'

export class GuardRegistrar implements Registrar {
  type: string = 'type:guard'

  constructor(private _container: Container) {}

  register(providerClass: ProviderClass) {
    const provider = getGuardian(providerClass)

    this._container._providers.set(provider.token, provider)
  }

  registerManual(provider: Provider): void {
    this._container._providers.set(provider.token, provider)
  }
}
