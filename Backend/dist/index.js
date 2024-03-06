import app from "./app.js";
import { connectToMongoDb } from "./db/connect.js";
//this is connections
const port = process.env.PORT;
connectToMongoDb()
    .then(() => {
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}  `);
    });
}).catch((error) => { console.log(error); });
//# sourceMappingURL=index.js.map