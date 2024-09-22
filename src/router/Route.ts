import { Message } from 'platform'
import { Guard } from './Guard'
import { Interceptor } from './Interceptor'

export type RouteHandler = (request: Message, response: Message) => Promise<any> | any

export interface Route {
  key: string
  guards: Guard[]
  interceptors: Interceptor[]
  requestHandler: RouteHandler
}
