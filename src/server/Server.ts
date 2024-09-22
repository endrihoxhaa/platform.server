import { Router } from '#router/Router'
import { Container, Network, ProviderClass } from 'platform'

export class Server {
  static container: Container = new Container()

  static router: Router = new Router()

  static network: Network = new Network()

  static rootModule: ProviderClass

  static setRoot(rootModule: ProviderClass) {
    Server.rootModule = rootModule
  }

  static boot() {
    Server.container.register(Server.rootModule)

    Server.container.registerManual({
      type: 'type:value',
      token: 'Network',
      payload: Server.network,
      parameters: [],
      properties: [],
    })

    Server.container.registerManual({
      type: 'type:value',
      token: 'Router',
      payload: Server.router,
      parameters: [],
      properties: [],
    })

    Server.container.resolveSync(Server.rootModule)
    Server.router.onBootstraped()
  }

  static async init() {
    await Server.container.instanceManager.runAsync('onInit', '*')
  }

  static async start() {
    await Server.container.instanceManager.runAsync('onStart', '*')
  }

  static async stop() {
    await Server.container.instanceManager.runAsync('onStop', '*')
  }
}

