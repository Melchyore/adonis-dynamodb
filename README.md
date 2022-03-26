# Adonis DynamoDB
A DynamoDB (Dyngoose) wrapper for AdonisJs.

[![gh-workflow-image]][gh-workflow-url] [![coverage-image]][coverage-url] [![npm-image]][npm-url] [![license-image]][license-url] [![typescript-image]][typescript-url]

## Dyngoose

### What is it?
Dyngoose is a DynamoDB object modeling for Typescript.

### Why Dyngoose?
Because it looks like Lucid, you will not be lost. The use of decorators makes it even more attractive.

### Docs
You can find all Dyngoose docs [here](https://github.com/benhutchins/dyngoose/tree/master/docs).

## Installation
First, install the package using npm or yarn

```sh
npm i adonis-dynamodb
# or
yarn add adonis-dynamodb
```

Next, configure the package by running the following command
```sh
node ace configure adonis-dynamodb
```

Then, add the following namespace to `.adonisrc.json` file
```json
"namespaces": {
  // ...other namespaces
  "dynamodbTables": "App/Tables" // You can use another namespace.
}
```

Finally, add the rules for the env variables inside `env.ts` in your application root:
```ts
export default Env.rules({
  // ...other rules
  AWS_REGION: Env.schema.string(),
  AWS_ACCESS_KEY_ID: Env.schema.string(),
  AWS_SECRET_ACCESS_KEY: Env.schema.string(),
})
```
**PS: NEVER share these environment variables.**

## Usage

### Create a new table model
Run the following command to create a table model **(it will only create the model file in App/Tables or the namespace of your choice)**
```sh
node ace dynamo:make Test
```

By default, the primary key name is `id`. You can use a custom name by adding a flag to the above command
```sh
node ace dynamo:make Test --pk=myPrimaryKey
```

Create the table(s) on AWS from the model(s)
```sh
node ace dynamo:create
```

This operation may take time. You can also create only one table from a given model by adding the model's name/path.
```sh
# Using model's name
node ace dynamo:create Test
```

```sh
# Using model's path (the path is resolved using the namespace defined in .adonisrc.json file as root)
node ace dynamo:create Dir/Test
```

### Delete tables from AWS
You can delete one table from AWS using as follows
```sh
# This will delete the table named "Test"
node ace dynamo:drop Test
```

You can also delete all tables **(please be careful when you run this command in production as the drop action is irreversible)**
```sh
# This will delete all the tables
node ace dynamo:drop
```

Everytime you run the `dynamo:drop` command you will be asked if you want to confirm the action.

This command will not delete your models.

### Create a new record or update an existing one
Dyngoose will automatically perform an `UpdateItem` operation if it is possible, to only update the attributes you have changed; but if it is a new record it will perform a `PutItem` operation.

```ts
import Test from 'App/Tables/Test'

const test = await Test.new({
  id: 1
  title: 'Test'
})
await test.save()

// Or
const test = new Test()
test.id = 1
test.title = 'Test'
await test.save()
```

For more information, please, visit [Dyngoose saving docs](https://github.com/benhutchins/dyngoose/blob/master/docs/Saving.md).

### Get an existing record (querying)
```ts
// Get record by the primary key
const record = await Test.primaryKey.get({ id: 1 })

if (record) {
  // You need to call toJSON() on the record to get your data serialized.
  console.log(record.toJSON())
}

// Or you can use search() method with filters to get an array of records.
const records = await Test.search({ title: 'Test' }).exec()

records.forEach(record => {
  console.log(record.toJSON())
})

// You can also get all records inside a table using scan() method.
const records = await Test.primaryKey.scan()

records.forEach(record => {
  console.log(record.toJSON())
})
```

Read more about querying [here](https://github.com/benhutchins/dyngoose/blob/master/docs/Querying.md).

### Delete a record
```ts
// Get record by the primary key
const record = await Test.primaryKey.get({ id: 1 })

if (record) {
  await record.delete()
}
```

[gh-workflow-image]: https://img.shields.io/github/workflow/status/Melchyore/adonis-dynamodb/test?style=for-the-badge
[gh-workflow-url]: https://github.com/Melchyore/adonis-dynamodb/actions/workflows/test.yml "Github action"

[coverage-image]: https://img.shields.io/coveralls/github/Melchyore/adonis-dynamodb/master?style=for-the-badge
[coverage-url]: https://coveralls.io/github/Melchyore/adonis-dynamodb "Coverage"

[npm-image]: https://img.shields.io/npm/v/adonis-dynamodb.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/adonis-dynamodb "npm"

[license-image]: https://img.shields.io/npm/l/adonis-dynamodb?color=blueviolet&style=for-the-badge
[license-url]: LICENSE.md "license"

[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]:  "typescript"
