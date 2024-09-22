import { Message } from 'platform'

export interface Interceptor {
  onMessage?(message: Message): Promise<void>
  onRequest?(request: Message): Promise<void>
  onRespond?(response: Message): Promise<void>
}
