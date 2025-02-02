# MonogoDB Atals

1. أذهب إلى الرابط التالي: https://www.mongodb.com/products/platform/atlas-database
2. اضغط على زر "Start Free" للتسجيل.
3. سجل بال gmail الخاص بك.
4. ![Add Project](image/addProject.png)
5. ![Name Your Project](image/nameYourProject.png)
6. ![Add Member](image/addMember-1.png)
7. ![Create a Cluster](image/create-a-cluster.png)
8. ![Deploy Your Clutser](image/deployYourCluster-1.png)
9. ![Connect to Your Database](image/connectTo-1.png)
10. ![Choose a Connection Method](image/choose-a-connection-method-1.png)
11. ![Connect](image/connect.png)
12. افتح الكومباس وقم بنسخ الرابط الذي تم الحصول عليه من الخطوة السابقة.
13. ![MongoDB Compass](image/compass.png)
14. ![Create Database in Compass](image/compass-create-database-1.png)
15. ![Insert Document](image/insert-document-1.png)
16. ![Create Document](image/insert-document-2-1.png)

# Connect MongoDB with Node.js

1. ![Connect](image/connect-with-nodejs.png)
2. ![Set up connection security](image/setup-connection-1.png)
3. ![Choose a connection method](image/choose-connection-method-2.png)
4.

```js
const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://mohamedalimahmoudali:node123@learn-mongo-db.vqka3.mongodb.net/?retryWrites=true&w=majority&appName=learn-mongo-db";

const client = new MongoClient(url);

const main = async () => {
  await client.connect();
  console.log("Connecting to the database...");

  const db = client.db("codezone");
  const collection = db.collection("courses");

  const data = await collection.find({}).toArray();
  console.log(data);
};

main();
```
