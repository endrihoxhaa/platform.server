import { Router } from '#router/Router'
import { Container, Logger, Network, ProviderClass } from 'platform'

export class Server {
  static container: Container = new Container()
  static logger: Logger = new Logger('SERVER')
  static router: Router = new Router()
  static network: Network = new Network()

  get router() {
    return Server.router
  }

  get network() {
    return Server.network
  }

  get container() {
    return Server.container
  }

  get logger() {
    return Server.logger
  }

  static boot(root: ProviderClass) {
    Server.container.register(root)

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

    Server.container.resolveSync(root)
    Server.router.init()

    // Logger.log('Server booted')
  }

  static async init() {
    await Server.container.instanceManager.runAsync('onInitBefore', '*')
    await Server.container.instanceManager.runAsync('onInit', '*')
    await Server.container.instanceManager.runAsync('onInitAfter', '*')
    // Logger.log('initialized')
  }

  static async start() {
    await Server.container.instanceManager.runAsync('onStartBefore', '*')
    await Server.container.instanceManager.runAsync('onStart', '*')
    await Server.container.instanceManager.runAsync('onStartAfter', '*')
    // Logger.log('started')
  }

  static async stop() {
    await Server.container.instanceManager.runAsync('onStopBefore', '*')
    await Server.container.instanceManager.runAsync('onStop', '*')
    await Server.container.instanceManager.runAsync('onStopAfter', '*')
    // Logger.log('stopped')
  }
}

export const server = new Server()
