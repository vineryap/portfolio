export async function fetchQuotes() {
  return await fetch(import.meta.env.SNOWPACK_PUBLIC_FCC_QUOTE_API)
    .then((res) => res.json())
    .then((data) => {
      const { quotes } = data;
      return quotes;
    });
}
