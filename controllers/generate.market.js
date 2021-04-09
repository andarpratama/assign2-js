const marketModel = require('../models/Market')
const cron = require("node-cron");
// module.exports = generateMarket;


// -------------------------------------
const generateMarket = () => {
   const task = cron.schedule(
   "*/1 * * * *",
   () => {
      marketModel.updateMany({earn : {$lt : 20}}, { $inc: { earn: 1 } })
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

module.exports = generateMarket;