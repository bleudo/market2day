document.addEventListener("click", getRandomCoin);

async function getRandomCoin() {
  try {
    const response = await fetch("/random-coin");
//coinData gets the API response from /random-coin request.
    const coinData = await response.json();
//If error then throw an alert with coinData error.
    if (coinData.error) {
      alert(coinData.error);
//Else the EJS elements content changes to the coinData json values.
    } else {
      document.getElementById("name").textContent = `Coin: ${coinData.name}`;
      document.getElementById(
        "price"
      ).textContent = `Price: $${coinData.price_usd}`;
      document.getElementById(
        "volume"
      ).textContent = `24h Volume: $${coinData.volume24}`;
      document.getElementById(
        "percent_change"
      ).textContent = `24h Percentage Change: ${coinData.percent_change_24h}%`;
    }
//If error fetching the coin data then error is displayed.
  } catch (error) {
    alert("Error fetching coin data. Please try again.");
  }
}
