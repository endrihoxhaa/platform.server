import { Router } from '#router/Router'
import { Container, Logger, Network, ProviderClass } from 'platform'
Logger.setNamespace('SERVER')

export class Server {
  static logger: Logger = new Logger('SERVER')
  static container: Container = new Container()
  static router: Router = new Router()
  static network: Network = new Network()
  static rootModule: ProviderClass

  static setRoot(rootModule: ProviderClass) {
    Server.rootModule = rootModule
  }

  static boot() {

    Logger.log('Server booting')

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

    Logger.log('Server booted')
  }

  static async init() {
    await Server.container.instanceManager.runAsync('onInit', '*')
    Logger.log('Server initialized')
  }

  static async start() {
    await Server.container.instanceManager.runAsync('onStart', '*')
    Logger.log('Server started')
  }

  static async stop() {
    await Server.container.instanceManager.runAsync('onStop', '*')
    Logger.log('Server stopped')
  }
}
