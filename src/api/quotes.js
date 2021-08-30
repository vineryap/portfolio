export async function fetchQuotes() {
  return await fetch(
    `https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json`
  )
    .then((r) => r.json())
    .then((data) => {
      const { quotes } = data;
      return quotes;
    });
}
