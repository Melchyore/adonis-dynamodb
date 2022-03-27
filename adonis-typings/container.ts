declare module '@ioc:Adonis/Core/Application' {
  import * as Module from '@ioc:Adonis/Addons/DynamoDB'

  export interface ContainerBindings {
    'Adonis/Addons/DynamoDB': typeof Module
  }
}
