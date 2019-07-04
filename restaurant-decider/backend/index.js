const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 9000;
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

app.listen(PORT, function () {
  console.log('Server is running on port: ' + PORT);
});

app.use(cors());

app.get('/api/:id', async (req, res) => {
  let id = req.params.id;
  var data = null;
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.open("GET", "https://api.yelp.com/v3/businesses/search?" + id);
  xhr.setRequestHeader("Authorization", "Bearer _GuV3vW9vYUaYuUpDrKIhlEDEvzrql3yQaPaFbeg9F6s01loN7vbhRXYjtrtZb_ZkMWsJgtVw4ubdtUOXqsabITZE9HE3zyyfr-bYK0bu8A88zV_4RsD1W2vtL4TXXYx");
  xhr.send(data);

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(process.env.REACT_APP_API_KEY);
      res.send(this.responseText);
    }
  });
})
