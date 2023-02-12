/*
=> 1995-2009 --> javascript programming language only as a client side
=> 2009 --> for the first time javascript laai server ma run gareko 'ryan dahl' le

--> NODE JS Framework haina
--> runtime environment ho javascript ko lagi(server side js)

npm --> node package manager(package management tool)  
Package -> specific kaam garne kunai auta collection of code base / library(specific kaam garne)

// package.json
Packege.json file holds overall information about project

=> dependencies--> this section will holds the entire information about dependent packages
=> package-lock.json -->> this file is used to lock the exact version of packages installed from npmjs
=> package-lock.json file is used to store the version of all dependent packages
=> node_module --> node_module is place to keep all the installed module(packages)
^ => caret operator(next time yo project sanga related dependency ma vako sabai package haru akai choti install garna khojda yasko install version vanda available latest version tanxa)

Commands:
--> node -v: check version of node
--> npm -v: check version of npm
--> npm init: it is used to start a js project. it will helps to create package.json file
--> npmjs.com --> it is global repository that holds overall packages related to js ecosystem
--> npm install <package_name>: it will install the selected packages from npmjs.com, downloaded  packages information are kept in package-lock.json file
--> installed packages are managed in node_modules folder
--> all packages of dependency tree are installed inside node_modules folder


-->npm uninstall <package_name>: remove selected packages from js project.

--> file-file communication
import
const abcd=require('path_to_own_file');
const xyz=require('module/ package name');
--> module/package name => these package can be packages from nodejs internal module or from node_module folder



Client-Server Architecture
protocol --> set of rules defined to communicate between two programmes
// http -> bet
// ftp -> google drive
// smtp -> email service
// mqtt -> used by messenger

in web, protocol used is HTTP
http protocol used garera client-server communication garxau
=> status code
-> 200 => success range
-> 300 => validation range
-> 400 => application error
-> 500 => server error(internal server error)
=> http verb(method)
->GET, PUT, POST, DELETE, PATCH....
-> request and response

in web
-> webserver(http server)
-> web client(http client)

==> Event and Stream module to find how internally the node js is working



protocal --> program to program communication eg. http protocal

**********REST API**********
API:
Application Programming Interface
interface to communicate  one application to another(endpoint)
endpoint (combination of http method and url)
eg. post/login, get/user, put/user, delete/notification


REST:
Representational State Transfer
graph ql architecture(future)
maintain the standard of communication
before REST, show architecture

following points needs to be fulfilled to be on REST for web
1. Stateless(server le client ko request save garnu hudaina)
2. correct use of http verb
GET => data fetch request
POST => data insert request
PUT/PATCH => data update request
DELETE => data remove request
3. data format must be either in JSON or XML
4. caching GET (database query cache)



Focus(backend dev):
CI/CD(continuous integration/continuous deployment) => devops
CRON JOB(repetatively kei garna parne kaam ko job scheduling)
db script
relational db
aws services (elastic benchtok), lamda, server less architecture, microservice architecture


we have created a REST SERVER using node/express
*/