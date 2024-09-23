import { ConsoleTransport, FileTransport, Logger } from 'platform'

export const InstallLogger = () => {
  Logger.addTransport(new FileTransport('.log'))
  Logger.addTransport(new ConsoleTransport())
}
