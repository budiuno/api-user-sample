export default function buildMakePayment(){
  return function makePayment({
    orderId = 0,
    sellPrice = 0,
    description = '',
    paymentMethod = '',
    paymentDetail = '',
    status = '',
    createdTime = Date.now(),
    updateTime = Date.now()
  } = {}) {

    if (!orderId){
      throw new Error('Order Id must be exist')
    }
    if (!sellPrice){
      throw new Error('Sell Price must be exist')
    }
    if (!description){
      throw new Error('Description must be exist')
    }
    if (!paymentMethod){
      throw new Error('Payment Method must be exist')
    }
    if (!paymentDetail){
      throw new Error('Payment Detail must be exist')
    }
    if (!status){
      throw new Error('Payment Detail must be exist')
    }

    if (!createdTime){
      throw new Error('Created Time must be exist')
    }

    if (!updateTime){
      throw new Error('Update Time must be exist')
    }

    return Object.freeze({
      getOrderId : () => orderId,
      getSellPrice : () => sellPrice,
      getDescription : () => description,
      getPaymentMethod : () => paymentMethod,
      getPaymentDetail : () => paymentDetail,
      getStatus : () => status
    })
  }
}
