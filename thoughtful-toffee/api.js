export default function (input) {
  var rootURL = 'https://api.genius.com/search?q=';
  var key = '&access_token=Fr9fqOU3RmPdAlC0j7VzhLtxTWrmbTmD2W5KHnX0OVBYmXlxrPCeLRxbcMBIrVqi'
  var url = `${rootURL}${input}${key}`

  console.log(url)
  return fetch(url).then(function(response) {
		return response.text();
	}).then(function(text) {
		let json = JSON.parse(text);
		return json;
	});
}

//https://api.genius.com/search?q=Adele&access_token=Fr9fqOU3RmPdAlC0j7VzhLtxTWrmbTmD2W5KHnX0OVBYmXlxrPCeLRxbcMBIrVqi
