const farmModel = require('../models/Farm')
const cron = require("node-cron");


const generateFarm = () => {
   const task = cron.schedule(
   "*/1 * * * *",
   () => {
      farmModel.updateMany({earn : {$lt : 20}}, { $inc: { earn: 1 } })
         .then((_) => {})
         .catch((err) => {
         res.send(err);
         });
   },
   {
      scheduled: true,
      timezone: "Asia/Jakarta",
   }
   );
   task.start();
}

module.exports = generateFarm;