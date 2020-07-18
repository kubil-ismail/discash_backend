const topUpModel = require("../../model/transaction/topup.model");
const response = require("../../helper/response");

module.exports = {
  // Get para
  topUp: async (req, res) => {
    try {
      const { payment, userid, price } = req.query;
      const dataSuccess = {
        payment_method_id: payment,
        user_id: userid,
        price,
        type_id: "1",
      };
      const dataFailed = {
        payment_method_id: payment,
        user_id: userid,
        price,
        type_id: "1",
        status: "2",
      };
      const findUser = await topUpModel.findUser({ id: parseInt(userid) });
      if (findUser) {
        await topUpModel.topUp(dataSuccess);
        res.status(200).send(
          response({
            status: true,
            data: dataSuccess,
            msg: "success top up",
          })
        );
      } else {
        await topUpModel.topUp(dataFailed);
        res.status(400).send(
          response({
            msg: "No Found User for top up",
          })
        );
      }
    } catch (error) {
      res.status(400).send(
        response({
          msg: "Something wrong, Try again",
        })
      );
    }
  },
};
