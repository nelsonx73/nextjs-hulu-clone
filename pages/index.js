import Head from "next/head";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Results from "../components/Results";
import styles from "../styles/Home.module.css";
import requests from "../utils/requests";

export default function Home({ results }) {
  return (
    <div>
      <Head>
        <title>Application Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Header />

      {/* Navbar */}
      <Nav />

      <Results results={results} />
      {/* Content */}
    </div>
  );
}

export async function getServerSideProps(context) {
  const genre = context.query.genre;
  let url = requests[genre]?.url || requests.fetchTrending.url;
  url = "https://api.themoviedb.org/3" + url;
  const response = await fetch(url).then((res) => res.json());

  return {
    props: {
      results: response.results,
    },
  };
}
