import { ModuleRegistrar } from '#decorators/module/ModuleRegistrar'
import { ModuleResolver } from '#decorators/module/ModuleResolver'
import { ServiceRegistrar } from '#decorators/service/ServiceRegistrar'
import { ValueRegistrar } from '#decorators/value/ValueRegistrar'
import { ControllerRegistrar } from '#decorators/controller/ControllerRegistrar'
import { RepositoryRegistrar } from '#decorators/repository/RepositoryRegistrar'
import { ValueResolver } from '#decorators/value/ValueResolver'
import { ServiceResolver } from '#decorators/service/ServiceResolver'
import { ControllerResolver } from '#decorators/controller/ControllerResolver'
import { RepositoryResolver } from '#decorators/repository/RepositoryResolver'
import { GuardResolver } from '#decorators/guard/GuardResolver'
import { GuardRegistrar } from '#decorators/guard/GuardRegistrar'
import { InterceptorResolver } from '#decorators/interceptor/InterceptorResolver'
import { InterceptorRegistrar } from '#decorators/interceptor/InterceptorRegistrar'
import { ProviderRegistrar, ProviderResolver } from 'platform'
import { Server } from '#server/Server'


export const InstallDecorators = () => {


  Server.container.addRegistrar(ProviderRegistrar)
  Server.container.addRegistrar(ValueRegistrar)
  
  Server.container.addRegistrar(ModuleRegistrar)
  Server.container.addRegistrar(ServiceRegistrar)
  Server.container.addRegistrar(ControllerRegistrar)
  Server.container.addRegistrar(RepositoryRegistrar)
  Server.container.addRegistrar(GuardRegistrar)
  Server.container.addRegistrar(InterceptorRegistrar)
  
  Server.container.addResolver(ProviderResolver)
  Server.container.addResolver(ValueResolver)
  
  Server.container.addResolver(ModuleResolver)
  Server.container.addResolver(ServiceResolver)
  Server.container.addResolver(ControllerResolver)
  Server.container.addResolver(RepositoryResolver)
  Server.container.addResolver(GuardResolver)
  Server.container.addResolver(InterceptorResolver)
  

}
