export async function fetchQuotes() {
  const response = await fetch(import.meta.env.SNOWPACK_PUBLIC_FCC_QUOTE_API);

  if (response.ok) {
    const data = await response.json();
    const { quotes } = data;
    return quotes;
  }
  fetchQuotes();
}