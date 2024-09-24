import { Message, MessageType, ProviderClass } from 'platform'
import { Route } from './Route'
import { GuardProcessor } from './GuardProcessor'
import { InterceptorProcessor } from './InterceptorProcessor'
import { RouteProcessor } from './RouteProcessor'
import { Server } from '#server/Server'
import { Interceptor } from './Interceptor'
import { Guard } from './Guard'

type RegisterRoute = {
  key: string
  guards: ProviderClass[]
  interceptors: ProviderClass[]
  controller: ProviderClass
  method: string
}

export class Router {
  _routes: Map<string, Route>
  _routeProcessor: RouteProcessor
  _guardProcessor: GuardProcessor
  _interceptorProcessor: InterceptorProcessor

  _routeRegistry: RegisterRoute[] = []

  constructor() {
    this._routes = new Map()
    this._routeProcessor = new RouteProcessor(this)
    this._guardProcessor = new GuardProcessor(this)
    this._interceptorProcessor = new InterceptorProcessor(this)
  }

  registerRoute(route: RegisterRoute) {
    this._routeRegistry.push(route)
  }

  onBootstraped() {
    for (const routeReg of this._routeRegistry) {
      const guardInstances = Server.container.resolveSyncAll(routeReg.guards) as Guard[]
      const interceptorInstances = Server.container.resolveSyncAll(routeReg.interceptors) as Interceptor[]
      const controllerInstance = Server.container.resolveSync<any>(routeReg.controller)

      this.addRoute({
        key: routeReg.key,
        guards: guardInstances,
        interceptors: interceptorInstances,
        requestHandler: async (req, res) => {
          if (controllerInstance[routeReg.method]) await controllerInstance[routeReg.method](req, res)
          else console.error('Internal Error', routeReg)
        },
      })
    }
  }

  addRoute(route: Route) {
    if (this._routes.has(route.key)) return console.error('Route Exists', route)
    this._routes.set(route.key, route)
  }

  request = async (request: Message): Promise<Message> => {
    const routeName = request.target.split('|')[1]

    const response = new Message()
    // response.setHeaders(request.headers)
    response.setRef(request.id)

    const route = this._routes.get(routeName)
    if (!route) {
      response.setType(MessageType.ERROR)
      response.setPayload({ code: 'ROUTE_NOT_FOUND' })
      return response
    }

    const canRequest = await this._guardProcessor.canRequest(route, request)
    if (!canRequest) {
      response.setType(MessageType.ERROR)
      response.setPayload({ code: 'GUARD_DENY_REQUEST' })
      return response
    }

    await this._interceptorProcessor.onRequest(route, request)

    response.setType(MessageType.RESPONSE)
    const payload = await route.requestHandler(request, response)
    if (payload) response.setPayload(payload)

    const canRespond = await this._guardProcessor.canRespond(route, response)
    if (!canRespond) {
      response.setType(MessageType.ERROR)
      response.setPayload({ code: 'GUARD_DENY_RESPONSE' })
      return response
    }

    await this._interceptorProcessor.onRespond(route, response)

    // set response time to live the request remain time from created timestamp
    response.setTTL(request.remainTime)

    return response
  }
}
