import { Message, } from 'platform'
import { Route } from './Route'
import { Router } from './Router'

export class GuardProcessor {
  constructor(private _router: Router) {}

  async canRequest(route: Route, request: Message) {
    if (!route.guards || route.guards.length === 0) return true

    for (const guard of route.guards) {
      if (guard.canRequest) {
        const canRequest = await guard.canRequest(request)
        if (!canRequest) return false
      }
    }

    return true
  }

  async canRespond(route: Route, response: Message) {
    if (!route.guards || route.guards.length === 0) return true

    for (const guard of route.guards) {
      if (guard.canRespond) {
        const canRespond = await guard.canRespond(response)
        if (!canRespond) return false
      }
    }

    return true
  }
}
