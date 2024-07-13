import React from "react";

import MovieCard from "./MovieCard";

interface movieListProps {
  data: Record<string, any>[];
  title: string;
}

const MovieList: React.FC<movieListProps> = ({ data, title }) => {
  if (!data) {
    return null;
  }

  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4 ">
          {title || "Title"}
        </p>
        <div className="grid grid-cols-4 gap-2">
          {data.map((movie) => (
            <div key={movie.id}>
              <MovieCard key={movie.id} data={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
