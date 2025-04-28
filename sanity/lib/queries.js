import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY = defineQuery(`*[_type == "startup" && defined(slug.current)] | order(_createdAt desc) {
  _id,
  title,
  slug,
  _createdAt,
  "author": author->{
    _id,
    name,
    image,
    bio
  },
  views,
  description,
  category,
  image
}`);

export const STARTUPS_SEARCH_QUERY = defineQuery(`*[
  _type == "startup" &&
  defined(slug.current) &&
  (
    title match $query ||
    slug.current match $query ||
    category match $query ||
    description match $query ||
    author->name match $query
  )
] | order(_createdAt desc) {
  _id,
  title,
  slug,
  _createdAt,
  "author": author->{
    _id,
    name,
    image,
    bio
  },
  views,
  description,
  category,
  image
}`);


export const STARTUP_BY_ID_QUERY = defineQuery(`*[_type == "startup" && _id == $id][0]{
  _id,
  title,
  slug,
  _createdAt,
  "author": author->{
    _id,
    name,
    image,
    bio,
    username
  },
  views,
  description,
  category,
  image,
  pitch
}
`)

export const STARTUP_VIEWS_QUERY = defineQuery(`*[_type == "startup" && _id == $id][0]{
  _id,
  views,
}
`)