const barrackModel = require('../models/Barrack')
const cron = require("node-cron");


const generateBarrack = () => {
   const task = cron.schedule(
   "*/1 * * * *",
   () => {
      barrackModel.updateMany({earn : {$lt : 10}}, { $inc: { earn: 1 } })
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

module.exports = generateBarrack;