export function formatCurrency(value: number, currency = "RON") {
  // formatez valoarea in formatul valutar specificat
  return new Intl.NumberFormat("RO", {
    style: "currency",
    currency: currency,
  }).format(value);
}

export async function convertAmount(
  amount: number,
  fromCurrency = "USD",
  toCurrency = "RON"
) {
  try {
    if (fromCurrency === toCurrency) return amount;
    // fac cerere catre API-ul de conversie a valutelor
    const response = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    // extrag valoarea convertita din raspunsul primit
    const convertedAmount = data.rates[toCurrency];

    // returnez valoarea convertita
    return convertedAmount;
  } catch (error) {
    console.error("There was an error converting the currency:", error);
    return null; // sau poti returna
  }
}
