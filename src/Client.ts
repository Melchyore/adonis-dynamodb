import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import type { EmitterContract } from '@ioc:Adonis/Core/Event'
import type { DynamoDBConfig, DynamoDBContract } from '@ioc:Adonis/Addons/DynamoDB'

import { Dyngoose } from 'dyngoose'

export default class Client {
  private emitter: EmitterContract

  constructor (private app: ApplicationContract, private config: DynamoDBConfig) {
    this.emitter = this.app.container.use('Adonis/Core/Event')

    // @ts-ignore
    Dyngoose.Config.default.setConnection = function (connection: typeof Dyngoose.Connection) {
      this.__defaultConnection = connection
    }

    // @ts-ignore
    Dyngoose.Config.default.setConnection(new Dyngoose.Connection.DynamoDBConnection(this.config))

    this.emitStartEvent()
  }

  public getClient (): DynamoDBContract {
    return Dyngoose
  }

  private async emitStartEvent (): Promise<void> {
    await this.emitter.emit('dynamodb:start', '')
  }
}
