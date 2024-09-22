import { Message } from 'platform'
import { Router } from './Router'
import { Route } from './Route'

export class InterceptorProcessor {
  constructor(private _router: Router) {}

  async onMessage(route: Route, message: Message) {
    for (const interceptor of route.interceptors) {
      if (interceptor.onMessage) await interceptor.onMessage(message)
    }
  }

  async onRequest(route: Route, request: Message) {
    for (const interceptor of route.interceptors) {
      if (interceptor.onRequest) await interceptor.onRequest(request)
    }
  }

  async onRespond(route: Route, response: Message) {
    for (const interceptor of route.interceptors) {
      if (interceptor.onRespond) await interceptor.onRespond(response)
    }
  }
}
