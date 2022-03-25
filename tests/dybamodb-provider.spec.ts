import { test } from '@japa/runner'

import { setup, fs, getDynamoDBConfig } from '../bin/test/config'

const dynamoDBConfig = getDynamoDBConfig()

test.group('DynamoDB Provider', (group) => {
  group.each.teardown(async () => {
    await fs.cleanup()
  })

  test('should get client using provider', async ({ expect }) => {
    const app = await setup('test', dynamoDBConfig)
    const { DynamoDB } = app.container.use('Adonis/Addons/DynamoDB')

    expect(DynamoDB).toHaveProperty(['Table'])
  })
})
