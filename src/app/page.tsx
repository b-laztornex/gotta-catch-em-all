import PageClient from "@/components/PageClient";

export default async function Home() {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
  );
  const { results } = await res.json();
  return <PageClient data={results} />;
}
