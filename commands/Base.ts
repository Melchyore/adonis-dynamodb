import { Table } from '@ioc:Adonis/Addons/DynamoDB'

import { join, extname } from 'path'
import { slash } from '@poppinss/utils'
import { resolveDir, fsReadAll, string } from '@poppinss/utils/build/helpers'
import { BaseCommand } from '@adonisjs/core/build/standalone'

export default abstract class Base extends BaseCommand {
  protected async getFile(filePath: string): Promise<Promise<typeof Table>> {
    return new Promise(async (resolve, reject) => {
      const path = this.absoluteTablesDirectoryPath()

      try {
        resolve((await import(join(path, filePath + extname(filePath)))).default)
      } catch (error) {
        reject(error)
      }
    })
  }

  protected getFiles(): Promise<Array<Promise<typeof Table>>> {
    return new Promise((resolve, reject) => {
      const path = this.absoluteTablesDirectoryPath()
      const files = fsReadAll(path)

      try {
        resolve(files.map(async (file: string) => (await import(join(path, file))).default))
      } catch (error) {
        reject(error)
      }
    })
  }

  protected async getTable(filePath: string): Promise<typeof Table> {
    return await this.getFile(filePath)
  }

  protected async getTables(): Promise<Array<typeof Table>> {
    return await Promise.all(await this.getFiles())
  }

  protected getTablesDirectory(): string {
    return this.application.namespacesMap.get('dynamodbTables') || 'App/Tables'
  }

  protected absoluteTablesDirectoryPath(): string {
    const path = this.resolvedNamespace()

    return resolveDir(this.application.appRoot, `./${path}`)
  }

  protected resolvedNamespace(): string {
    return this.application.resolveNamespaceDirectory('dynamodbTables') || 'app/Tables'
  }

  protected normalizeName(name: string): string {
    const path = slash(name).split('/')
    const transformedName = string.pascalCase(path.pop()!)

    return join(...[...path, transformedName])
  }
}
