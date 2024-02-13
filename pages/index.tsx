import BillBoard from "@/components/BillBoard";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useFavourite from "@/hooks/useFavourite";
import useMovieList from "@/hooks/useMovieList";
import { NextPageContext } from "next"
import { getSession, signOut } from "next-auth/react"
import { redirect } from "next/dist/server/api-utils";

export async function getServerSideProps(context : NextPageContext){
  const session = await getSession(context);

  if(!session){
    return{
      redirect:{
        destination : '/auth' ,
        permanent : false,
      }
    }
  }

  return{
    props : {}
  }
}

export default function Home() {
  const { data: movies } = useMovieList();
  const { data: favourites } = useFavourite();

  return (
    <>
     <Navbar />
     <BillBoard />
     <div className="pb-40" >
       <MovieList title="Trending Now" data={movies}  />
       <MovieList title="My List" data={favourites}  />
     </div>
    </>
  )
}
