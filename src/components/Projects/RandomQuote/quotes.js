export async function fetchQuotes() {
  return await fetch(process.env.SNOWPACK_PUBLIC_FCC_QUOTE_API)
    .then((res) => res.json())
    .then((data) => {
      const { quotes } = data;
      return quotes;
    });
}
