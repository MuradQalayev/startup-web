import SearchForm from "../../components/SearchForm";

export default async function Home({searchParams}) {

  const query = searchParams?.query


  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Pitch your startup, <br/> Connect with, entrepreneurs</h1>
        <p className="sub-heading !max-w-3xl"> 
          Submit ideas, Vote on Pitches and Get Noticed in Virtual
        </p>
        <SearchForm query ={query}/>
      </section>
    </>
  );
}
