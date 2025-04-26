import StartupCard from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";
import { STARTUPS_QUERY, STARTUPS_SEARCH_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";


/** @typedef {import('@/sanity/types').Startup} Startup */
/** @typedef {import('@/sanity/types').Author} Author */
/**
 * @template T, K
 * @typedef {Pick<T, Exclude<keyof T, K>>} Omit
 */
/** @typedef {Omit<Startup, 'author'> & { author?: Author }} StartupWithAuthor */

export default async function Home({ searchParams }) {
  const { query } = searchParams || {};

  /** @type {StartupWithAuthor[]} */
  const result = query
    ? await sanityFetch({ query: STARTUPS_SEARCH_QUERY, params: { query: `*${query}*` } })
    : await sanityFetch({ query: STARTUPS_QUERY });

  const posts = result.data || [];

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch your startup, <br /> Connect with, entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit ideas, Vote on Pitches and Get Noticed in Virtual
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for ${query}` : "All Startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts.length > 0 ? (
            posts.map((post) => (
              <StartupCard key={post._id} post={post} />
            ))
          ) : (
            <li className="no-results">No startups found</li>
          )}
        </ul>
      </section>
      <SanityLive/>
    </>
  );
}
