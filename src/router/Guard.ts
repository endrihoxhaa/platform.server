import { Message } from 'platform'

export interface Guard {
  canRequest?(request: Message): Promise<boolean>
  canRespond?(response: Message): Promise<boolean>
}
