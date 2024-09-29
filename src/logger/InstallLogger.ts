import { FileTransport } from '#drivers/logger/FileTransport'
import { ConsoleTransport,  Logger } from 'platform'

export const InstallLogger = () => {
  Logger.addTransport(new FileTransport('logs',`${new Date().toISOString()}.log`))
  Logger.addTransport(new ConsoleTransport())
}
