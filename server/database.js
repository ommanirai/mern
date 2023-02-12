// database is a container where data are kept
// JSON -> javascript object notation
// database management system is a way to manipulate data in database

// DBMS
// 1. Relational DBMS
// 2. Distributed DBMS

// 1. Relational DBMS
/*
a. table based design
eg of LMS(Library Management System) ==> Books, Users, Reviews
b. tuple/row => each record inside a table, eg. record of Books, record of Users, record of Reviews
c. schema based solution => paila nai k k attribute line finalize garne
d. non scalable -> vertical scalable (no horizontal scalable), schema ma define gareko property baahek aru kei property rakhna mildaina
e. relation between table exists
f. sql(structure query languages) database
g. mysql, sql-lite, postgres.....

*/

// 2. Distributed DBMS
/*
a. collection based design (collection <-> table(entity) )
eg of LMS ==> Books, Users, Reviews
b. each record inside a collection is document
document based database pani vaninxa Distributed DBMS laai
document is a valid JSON
c. schema less design
d. highly scalable
e. relation doesn't exists between collection
f. NoSQL (Not Only SQL)
g. mongodb, redis, dynamodb(AWS concept), cosmos db(azure database)

*/

/*
MongoDB support JSON database
cloudinary -> image haru ko lagi host garne auta cloud service provider


to setup mongodb:
install mongodb current version
your installed file will be available
c drive/programmefiles/==> mongodb ==> version/bin/executable files
copy the entire path upto bin directory in the url bar

right click to my computer
advance system settings
enviroment variables
system variables
==> path ==>
add/edit
paste the copied url



to acccess mongo shell
mongo --> > aayena ani 27017 port ma kei listen gareko xaina vane run the command mongod (driver initialization)
mongod -->



shell command:
=> show dbs --> list all the available database of the system
=> use <db_name> --> create or select the database
=> if(db_name exists) select the existing database
=> else create and select the database

db --> check selected database

show collections --> list all the available collection of selected database

Operation in databases(crud operation)
CRUD (CREATE, READ, UPDATE, DELETE)

CREATE:
=> db.<collection_name [new or existing]>.insert({valid JSON})
=> db.<collection_name>.insertMany()

READ:
=> db.<collection_name>.find({query_builder})
=> db.<collection_name>.find({query_builder}).pretty() // format output
=> db.<collection_name>.find({query_builder}).count() // returns count

skip:
    -> query.skip(skipCount)
limit:
    -> query.limit('limitCount)
sort:
    -> .sort({_id:-1}) // decending

projection:
-> db.<collection_name>.find({condition}, {projection_object}) //either inclusion or exclusion


UPDATE:
=> db.<collection_name>.update({},{},{})
-> first object is query builder
-> second object must have $Set as key as value of another object[data to be updated]
-> third object is optional


upsert --> update and insert


DELETE:
=> db.<collection_name>.remove({query_builder});
=> NOTE: DO NOT KEPT EMPTY QUERY BUILDER
-> query builder ma value empty rakhera remove garyo vane sabai remove hunxa

Drop collection
-> db.<collection_name>.drop()

Drop database
->db.dropDatabase()



// Mongodb University: for free course of Node js and Mongodb


MONGOOSE ===> ODM(Object Document Modelling)
advantages or usage of Mongoose:
1. schema based solution
2. Indexing is lot more easier
eg. required, unique
3. own methods of ODM for CRUD
4. data types
5. middleware




*************DATABASE BACKUP & RESTORE:*************
format ==> json/csv, bson(binary json, only for mongodb to mongodb backup/ restore communication, noSql to noSql)

command:
mongodump, mongorestore
mongoimport, mongoexport\

bson:
backup:
command ==> mongodump
mongodump ==> it will create a default dump folder and backup all the available database
mongodump --db <db_name>: it wil backup a selected db into defualt dump folder
mongodump --db <db_name> --out <path_to_destination_folder>:


restore:
command ==> mongorestore
mongorestore  ==> it will check for dump folder and restore all the database available inside dump folder
mongorestore --drop => drop existing database and restore from backup from dump folder
mongorestore --drop <path_to_source_folder>


json and csv:
command: mongoimport and mongoexport
json
backup:
command: mongoexport
mongoexport --db <db_name> --collection<collection_name> --out <path_to_destination_file_with.json_extension>
OR
mongoexport --d <db_name> --c<collection_name> --o<path_to_destination_file_with.json_extension>


restore:
command: mongoimport
mongoimport --db <new_db or existing_db> --collection <new or existing collection> path_to_json_file


CSV:
backup command: mongoexport
mongoexport --db<db_name> --collection <collection_name> --type=csv --fields --out<path_to_destination_with.csv_extension>

fields => comma seperated value to be exported

to run query:
mongoexport --db<db_name> --collection <collection_name> --query="{'key':'value'}" --type=csv --fields --out<path_to_destination_with.csv_extension>

restore command:mongoimport
mongoimport --db<existing or new_db name> --collection<existing or new collection> --type=csv <path_to_destination_with.csv_extension> --headerline

*/