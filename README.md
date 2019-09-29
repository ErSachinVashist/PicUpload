# Thumbnail Maker

This application allows user to signup and upload  pictures for 3 different thumbnail formats on cloud (s3)

## Technologies Used
- React
- Nodejs
- MySql
- Docker
- Aws-Services (SQS,S3)


## Flow Of Application

1) Admin User will signin and make other users.
2) User can upload the pics from the Dashboard.
3) Authenticated api hit will start the uploading process.
4) Backend Flow : 
  * Initial pic data is saved to Database and then sent to SQS
  * A Worker listening to that queue consumes the data, produce different thumbnail formats, save to S3 and send the final response to another response queue.
  * An another worker will consume the data from the second queue  
