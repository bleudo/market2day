import express from "express";
import axios from "axios";


//Initialize express.
const app = express();
const port = 3000;
app.use(express.static("public"));

//Listen to the running port.
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

//Get home ('/') root with API endpoint to specific coin.  
app.get("/", async (req, res) => {
//Get request to API endpoint using axios.
  try {
    const result = await axios.get(
      `https://api.coinlore.net/api/ticker/?id=90`
    );
    console.log(result.data[0]);
//Access API response info and pass it to the EJS tags to be render at home root. 
    res.render("index.ejs", {
      name: result.data[0].name,
      price: result.data[0].price_usd,
      volume: result.data[0].volume24,
      percent_change: result.data[0].percent_change_24h,
    });
//Shows error content in case of error.
  } catch (error) {
    res.render("index.ejs", error );
  }
});


app.get("/random-coin", async (req, res) => {
    try {
//Generate random number
    const randomCoin = Math.floor(Math.random() * 98) + 1;
//Look for id number in the API.
    const result = await axios.get(
      `https://api.coinlore.net/api/ticker/?id=${randomCoin}`
    );
//if API returns a coin, then response will be the json data.
    if (result.data && result.data[0]) {
      res.json(result.data[0]);
    } else {
//else will display "Try Again" error 
      res.status(404).json({ error: "Try Again" });
    }
//In case the API fetch couldnt get any info.
  } catch (error) {
    res.status(500).json({ error: "Error fetching coin data" });
  }
});
