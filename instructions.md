The package has been configured successfully. The DynamoDB configuration stored inside `config/dynamodb.ts` file relies on the following environment variables and hence we recommend validating them.

**Open the `env.ts` file and paste the following code inside the `Env.rules` object.**

```ts
AWS_REGION: Env.schema.string(),
AWS_ACCESS_KEY_ID: Env.schema.string(),
AWS_SECRET_ACCESS_KEY: Env.schema.string(),
```

- The `AWS_REGION` should always be present.
- The `AWS_ACCESS_KEY_ID` should always be present.
- The `AWS_SECRET_ACCESS_KEY` should always be present.

**PS: NEVER share these environment variables.**

You need also to add the namespace to your application.

**Open `.adonisrc.json` file and paste the following code inside the `namespaces` object.**
```json
"dynamodbTables": "App/Tables", // You can use another namespace.
```

### Create model file
```sh
node ace dynamo:make Test
```

By default, the primary key name is `id`. You can use a custom name by adding a flag to the above command
```sh
node ace dynamo:make Test --pk=myPrimaryKey
```

### Create table(s) on AWS from model(s)
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

### Use your model to deal with your data
```ts
// Some Controller

import Test from 'App/Tables/Test'
```

Please read the [docs](https://github.com/Melchyore/adonis-dynamodb) for available methods and examples.

### Delete table(s) from AWS
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

This command will not delete your models files.
