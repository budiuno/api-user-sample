require('dotenv').config();

const environment = process.env.ENVIRONMENT

let  MY_SLACK_WEBHOOK_URL : any = ''

if(environment == 'production'){
  MY_SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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'
}else{
 MY_SLACK_WEBHOOK_URL = 'test'
}

const slack = require('slack-notify')(MY_SLACK_WEBHOOK_URL);

export default slack;
