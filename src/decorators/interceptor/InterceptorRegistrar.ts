import { Provider, ProviderClass, Container, Registrar } from 'platform'
import { getInterceptor } from './Interceptor'

export class InterceptorRegistrar implements Registrar {
  type: string = 'type:interceptor'

  constructor(private _container: Container) {}

  register(providerClass: ProviderClass) {
    const provider = getInterceptor(providerClass)

    this._container._providers.set(provider.token, provider)
  }

  registerManual(provider: Provider): void {
    this._container._providers.set(provider.token, provider)
  }
}
