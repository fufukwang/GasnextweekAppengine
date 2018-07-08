const express = require('express');
const rp = require('request-promise');
const app = express();

app.get('/', (req, res) => {
	rp('http://www.taiwanoil.org/z.php?z=oiltw&c=94abf0&tz=Asia/Taipei&tf=1')
    	.then(function (htmlString) {
			var match = htmlString.match(/[0-9]{2}\.[0-9]{2}<\/td>/gi);
			var match2 = htmlString.match(/[+|-][0-9]\.[0-9]{2}%/gi);
			var gasObj = {
				"c98"  : match[0].replace('<\/td>',''),
				"c95"  : match[1].replace('<\/td>',''),
				"c92"  : match[2].replace('<\/td>',''),
				"c7"   : match[3].replace('<\/td>',''),
				"t98"  : match[4].replace('<\/td>',''),
				"t95"  : match[5].replace('<\/td>',''),
				"t92"  : match[6].replace('<\/td>',''),
				"t7"   : match[7].replace('<\/td>',''),
				"grop" : match2[0],
			}
			res.json({ success : true,gas:gasObj })
    	})
    	.catch(function (err) {
    		console.log(err)
    		res.json({ success : false })
    	});
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});