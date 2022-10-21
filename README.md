# A node app using Couch DB

- To run this app you need to install a [CouchDB](https://couchdb.apache.org/)
- Start it and access it at [http://localhost:5984/\_utils/](http://localhost:5984/_utils/)
- The code uses a database called **reptilo** with documents like this:

```ts
{
 "_id": "bb34d497663b225b9ba8ece1f2000d2f",
 "_rev": "2-93a8a85eb473875189fd97d45dd95b4a",
 "name": "krillo",
 "email": "krillo@surf.se",
 "phone": "0761-001199",
 "titles": [
   "Mr",
   "Kapten",
   "Sir"
 ],
 "tasks": {
   "work": false,
   "kite": true,
   "party": true,
   "dancing": true
 }
}
```

- You need node and npm
- build the app by running `npm install`
- Start the node app in the terminal with `node app`
- The web app is reachable at [http://localhost:3000/](http://localhost:3000/)
- watch on [youtube](https://www.youtube.com/watch?v=R6LUMXrAoCE&t=587s)

## Couch DB example commands

```
user:admin
pass:admin

http://localhost:5984/_all_dbs
http://localhost:5984/reptilo/_design/titles/_view/titles/?limit=20&reduce=false
http://localhost:5984/reptilo/_design/all_customers/_view/all/?limit=20&reduce=false

curl -X GET http://admin:admin@127.0.0.1:5984/_all_dbs
curl -X GET http://admin:admin@127.0.0.1:5984/reptilo/_design/names/_view/name2
curl -X GET http://admin:admin@127.0.0.1:5984/reptilo/_design/view2/_view/tasks

curl -X PUT http://admin:admin@127.0.0.1:5984/testdb
```
