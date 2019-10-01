const config = {
  local: {
    awsConfig:{
      region: 'ap-south-1',
      accessKeyId: '<my-access-key>',
      secretAccessKey: '<my-access-secret>',
    },
    db:{
      "host": "localhost",
      "port": 3306,
      "url": "",
      "database": "tp_database",
      "password": "tp_pass123",
      "name": "tp_database",
      "user": "tp_user",
    },
    w1queue:'https://sqs.ap-south-1.amazonaws.com/320112079756/tp-w1-queue-dev',
    w2queue:'https://sqs.ap-south-1.amazonaws.com/320112079756/tp-w2-queue-dev',
  },
  production: {
    awsConfig:{
      region: 'ap-south-1',
      accessKeyId: '<my-access-key>',
      secretAccessKey: '<my-access-secret>',
    },
    db:{
      "host": "remotemysql.com",
      "port": 3306,
      "url": "",
      "database": "2qCwyTLbNm",
      "password": "Ej3CXoDDts",
      "name": "tp_database",
      "user": "2qCwyTLbNm",
    },
    w1queue:'https://sqs.ap-south-1.amazonaws.com/320112079756/tp-w1-queue',
    w2queue:'https://sqs.ap-south-1.amazonaws.com/320112079756/tp-w2-queue',
  },
};

module.exports=config['production'];


