const WEBHOOK_URL = "XXXXX"// discordの億万長者アルゴリズムchにおけるindex指標bot chのwebhookurl

function post_discord(text){
    let payload = {
      "content": text
    };
  
    let options = {
      "method": "post",
      "payload": payload,
    };
    UrlFetchApp.fetch(WEBHOOK_URL, options);
  }