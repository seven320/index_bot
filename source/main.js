
// 複数のシートを読み込む
function read_sheets(){
}

//一つのシートを読み込んで、最新値を取得
// args:
//    index_name: 取得するspreadsheetの名称
// return 
//    date: 最新日付
//    price:値段
//    price_dod: 前日日との差分%
function read_latest_value(index_name){
  let ss = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = ss.getSheetByName(index_name);

  let lastrow = sheet.getRange('A1').getNextDataCell(SpreadsheetApp.Direction.DOWN).getRow();
  let range = sheet.getRange(lastrow , 1, 1, 4);
  let values = range.getValues()[0];
  let date = formatDate(values[0])
  let price = values[1];
  let price_dod = Math.round(values[3] * 1000) / 1000 * 100; //小数点3桁まで見て、%に直す
  return [date, price, price_dod]
}

// 日付をYYYY-MM-DDの書式で返すメソッド
// args:
//    dt: datetime
//  return:
//    date_str: YYYY-MM-DDの形式にした日付
function formatDate(dt) {
  var y = dt.getFullYear();
  var m = ('00' + (dt.getMonth()+1)).slice(-2);
  var d = ('00' + dt.getDate()).slice(-2);
  let date_str = (y + '-' + m + '-' + d);
  return date_str
}

// index_namesに入っているシート名を参照して最新日の値段をdiscordにpostする
function daily_bot(){
  index_names = ["TOPIX", "S&P500"]
  let text = '';
  for(let i = 0; i < index_names.length; i++){
    let index_name = index_names[i]
    let [date, price, price_dod] = read_latest_value(index_name);
    console.log(index_name)
    text = text + index_name + 'は' + date + '現在' + price + '円 前日比:' + price_dod + '%';
    if(i == index_names.length - 1){
      break
    }
    text = text + '\n';
  }
  post_discord(text)
}
