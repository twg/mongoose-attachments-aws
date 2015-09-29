# mongoose-attachments-aws

AWS S3 Storage Provider for [mongoose-attachments](https://github.com/heapsource/mongoose-attachments).

### Installation

    $ npm install mongoose-attachments-aws

### Usage

The library will register automatically with `mongoose-attachments` by performing `require` and return a reference to the `mongoose-attachments` plugin:

```javascript
var attachments = require('mongoose-attachments-aws');
```

For further instructions check [mongoose-attachments](https://github.com/firebaseco/mongoose-attachments).

### Configuration

#### Provider Name

`aws`

#### Options

- `region`: the s3 region
- `key`: the s3 accessKeyId
- `secret`: the s3 secretAccessKey
- `bucket`: the s3 bucket in which to place the file
- `endpoint`: defaults to 'https://s3.amazonaws.com/<bucket>'
- `acl`: defaults to 'private'

For other configurations check [mongoose-attachments](https://github.com/firebaseco/mongoose-attachments).

```javascript
var storage = {}
storage.providerName = 'aws'
storage.options = {
  "region": <region>,
  "key": <key>,
  "secret": <secret>,
  "bucket": "<bucket>",
  "acl": "public-read"
}

require('mongoose-attachments-aws')

schema.plugin(require('mongoose-attachments'), {
  directory: 'images',
  storage: storage,
  properties: buildProperties()
})
```
## License (Apache 2.0)

Copyright (c) 2015 TWG - http://www.theworkinggroup.ca