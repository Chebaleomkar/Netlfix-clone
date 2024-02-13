import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import FavouriteButton from "./FavouriteButton";
import { useRouter } from "next/navigation";


interface MovieCardProps {
  data: Record<string, any>;
}

const MovieCard = ({ data }) => {
  const router = useRouter();
  return (
    <div className="group bg-zinc-900 col-span relative h-[12vw] ">
      <img
        className="cursor-pointer object-cover transition duration shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full h-[12vw]"
        src={data.thumbnailUrl}
        alt="thumbanil"
      />
      <div className="opacity-0 absolute top-0 transition duration-200 z-10 invisible sm:visible delay-300 w-full scale-0 group-hover:scale-110 group-hover:translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100 ">

        <img
        className="cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full h-[12vw]"
         src={data?.thumbnailUrl} alt="thumbnail" />

         <div className="z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md " >
            <div className="flex flex-row items-center" >
                <div onClick={()=>{ router.push(`/watch/${data?.id}`)}} className="cursor-pointer mr-2 w-6 h-6 lg:-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300" >
                 <BsFillPlayFill size={30}/>
                </div>
                 <FavouriteButton movieId={data?.id} />
            </div>

            <p className="text-green-400 font-semibold mt-4" >
                new <span className="text-white " > 2023</span>
            </p>

            <div className="flex flex-row mt-4 items-center gap-2" >
                <p className="text-white text-[10px] lg:text-sm " >
                    {data?.duration}
                </p>
            </div>

            <div className="flex flex-row mt-4 items-center gap-2" >
                <p className="text-white text-[10px] lg:text-sm " >
                    {data?.genre}
                </p>
            </div>

         </div>
      </div>
    </div>
  );
};

export default MovieCard;
