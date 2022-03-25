import { join } from 'path'
import { args, flags } from '@adonisjs/core/build/standalone'

import Base from './Base'

export default class Make extends Base {
  public static commandName = 'dynamo:make'

  public static description = 'Create a new Dyngoose model'

  public static settings = {
    loadApp: true,
    stayAlive: false,
  }

  @args.string({
    description: 'Name/path of the model class',
    required: true
  })
  public name: string

  @flags.string()
  public pk: string = 'id'

  public async run () {
    const stub = join(__dirname, '..', 'templates', 'table.txt')

    this.generator
      .addFile(this.name, { pattern: 'pascalcase', form: 'singular' })
      .stub(stub)
      .destinationDir(this.resolvedNamespace())
      .useMustache()
      .apply({
        primaryKey: this.pk
      })
      .appRoot(this.application.cliCwd || this.application.appRoot)

    await this.generator.run()
  }
}
