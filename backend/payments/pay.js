const LiqPay = require('liqpay');
let liqpay = new LiqPay(public_key, private_key);
const html = liqpay.cnb_form({
'action'         : 'pay',
'amount'         : '1',
'currency'       : 'USD',
'description'    : 'description text',
'order_id'       : 'order_id_1',
'version'        : '3'
});