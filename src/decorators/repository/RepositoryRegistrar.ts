import { Provider, ProviderClass, Container, Registrar } from 'platform'
import { getRepository, RepositoryMeta } from './Repository'

export class RepositoryRegistrar implements Registrar {
  type: string = 'type:repository'

  constructor(private _container: Container) {}

  register(providerClass: ProviderClass) {
    const provider = getRepository(providerClass)

    this._container._providers.set(provider.token, provider)
  }
  
  registerManual(repository: RepositoryMeta): void {
    this._container._providers.set(repository.token, repository)
  }
}
