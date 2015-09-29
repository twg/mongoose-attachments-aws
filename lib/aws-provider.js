// Copyright (c) 2015 TWG - http://www.theworkinggroup.ca

var util = require('util')
var fs = require('fs')
var attachments = require('mongoose-attachments')
var AWS = require('aws-sdk')

function Storage (options) {
  attachments.StorageProvider.call(this, options)
  this.s3 = new AWS.S3({
    region: options.region,
    accessKeyId: options.key,
    secretAccessKey: options.secret
  })
  this.options.endpoint = options.endpoint || ('https://s3.amazonaws.com/' + options.bucket)
  this.options.acl = options.acl || 'private'
}

util.inherits(Storage, attachments.StorageProvider)

Storage.prototype.createOrReplace = function (attachment, cb) {
  var self = this

  fs.readFile(attachment.filename, function (err, data) {
    var params = {
      Key: attachment.path.substr(1),
      Bucket: self.options.bucket,
      Body: data,
      ContentType: attachment.type,
      ACL: self.options.acl
    }

    self.s3.putObject(params, function (err, resp) {
      if (err) return cb(err)
      attachment.defaultUrl = self.getUrl(attachment.path)
      cb(null, attachment)
    })
  })
}

Storage.prototype.getUrl = function (path) {
  return this.options.endpoint + path
}

// Register the S3 Storage Provider into the registry
attachments.registerStorageProvider('aws', Storage)

// Export attachments so there is no need for an explicit require of it
module.exports = attachments
