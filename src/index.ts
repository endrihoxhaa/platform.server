import { InstallDecorators } from '#decorators/Install'
import { InstallLogger } from '#logger/InstallLogger'
InstallDecorators()
InstallLogger()

export * from '#server/Server'
export * from '#server/ServerEvents'
export * from '#router/Router'

export * from '#decorators/Decorators'
export * from '#data/Data'

export * from 'platform'