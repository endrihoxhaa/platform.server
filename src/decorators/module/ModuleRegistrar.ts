import { getModule, Module } from './Module'
import { Provider, ProviderClass, Container, Registrar } from 'platform'

export class ModuleRegistrar implements Registrar {
  type: string = 'type:module'

  constructor(private _container: Container) {}

  register(providerClass: ProviderClass) {
    const module = getModule(providerClass)

    this._container.registerAll([
      ...module.services,
      ...module.repositories,
      ...module.controllers,
      ...module.providers,
      ...module.imports,
    ])

    this._container._providers.set(module.token, module)
  }

  registerManual(module: Module): void {
    this._container.registerAll([
      ...module.services,
      ...module.repositories,
      ...module.controllers,
      ...module.providers,
      ...module.imports,
    ])
    
    this._container._providers.set(module.token, module)
  }
}
