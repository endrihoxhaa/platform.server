import { Message } from 'platform'
import { Route } from './Route'
import { Router } from './Router'

export class RouteProcessor {
  constructor(private _router: Router) {}

  async processRequest(route: Route, request: Message, response: Message) {
    return await route.requestHandler(request, response)
  }
}
