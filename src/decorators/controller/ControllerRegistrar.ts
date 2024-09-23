import { Server } from '#server/Server'
import { Provider, ProviderClass, Container, Registrar } from 'platform'
import { ControllerMeta, getController,  } from './Controller'

export class ControllerRegistrar implements Registrar {
  type: string = 'type:controller'

  constructor(private _container: Container) {}

  private _register(controller: ControllerMeta){

    this._container.registerAll([...controller.guards, ...controller.interceptors])

    this._container._providers.set(controller.token, controller)

    const routes = controller.routes ?? []
    const methods = Object.getOwnPropertyNames(controller.payload['prototype']).filter((name) => name !== 'constructor')

    for (const methodName of methods) {
      const methodRoute = routes.find((route) => route.method === methodName)

      if (methodRoute) {
        this._container.registerAll([...methodRoute.guards, ...methodRoute.interceptors])

        Server.router.registerRoute({
          key: `${controller.key}.${methodRoute.key}`,
          guards: [...controller.guards, ...methodRoute.guards],
          interceptors: [...controller.interceptors, ...methodRoute.interceptors],
          controller: controller.payload,
          method: methodName,
        })
      } else {
        Server.router.registerRoute({
          key: `${controller.key}.${methodName}`,
          guards: controller.guards,
          interceptors: controller.interceptors,

          controller: controller.payload,
          method: methodName,
        })
      }}
  }

  registerManual(controller: ControllerMeta): void {
    this._register(controller)
  }

  register(providerClass: ProviderClass) {
    const controller = getController(providerClass)

    this._register(controller)

    // this._container.registerAll([...controller.guards, ...controller.interceptors])

    // this._container._providers.set(controller.token, controller)

    // const routes = getRoutes(providerClass)
    // const methods = Object.getOwnPropertyNames(providerClass['prototype']).filter((name) => name !== 'constructor')

    // for (const methodName of methods) {
    //   const methodRoute = routes.find((route) => route.method === methodName)

    //   if (methodRoute) {
    //     this._container.registerAll([...methodRoute.guards, ...methodRoute.interceptors])

    //     Server.router.registerRoute({
    //       key: `${controller.key}/${methodRoute.key}`,
    //       guards: [...controller.guards, ...methodRoute.guards],
    //       interceptors: [...controller.interceptors, ...methodRoute.interceptors],
    //       controller: providerClass,
    //       method: methodName,
    //     })
    //   } else {
    //     Server.router.registerRoute({
    //       key: `${controller.key}/${methodName}`,
    //       guards: controller.guards,
    //       interceptors: controller.interceptors,

    //       controller: providerClass,
    //       method: methodName,
    //     })
    //   }
    // }
  }
}
