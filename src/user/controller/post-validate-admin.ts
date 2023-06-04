export default function makePostValidateAdmin ({createValidateAdmin}) {
    return async function postValidateAdminToken (httpRequest,sendToSlack) {
        try {
            const bodyparam  = httpRequest.body
            const posted = await createValidateAdmin({bodyparam})
            console.log('contr',posted)
            if(posted.status == false){
                return {
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    statusCode: 200,
                    body: {
                        status : true,
                        response_code : 400,
                        message : posted.error.message
                    }
                }    
            }else{
                return {
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    statusCode: 200,
                    body: {
                        status : true,
                        response_code : 200,
                        message : "OK",
                        data: posted
                    }
                }
            }
        } catch (e) {

            console.log(e)
            sendToSlack.alert({
            text: `:X: postLogin ${e.stack}`,
            attachments: [
                {
                  fallback: 'attachment',
                  fields: [
                    { title: 'front-end request', value: JSON.stringify(httpRequest) },
                    { title: 'middleware response', value: 'test' }
                  ]
                }
              ]
            });

            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 400,
                body: {
                    error: e.message
                }
            }
        }
    }
 }