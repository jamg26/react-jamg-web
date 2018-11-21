import React from "react";
import movies from "../../jsonLinks/movies.json";
// import moviesExt from "../../jsonLinks/moviesExt.json";
// import { Link } from "react-router-dom";
const link = type => {
  const links = type.map((data, index) => {
    return (
      <div key={data.name}>
        <a href={data.url}>{data.name}</a>
      </div>
    );
  });
  return links;
};
// export const moviesE = () => {
//   document.title = "Extended | JamgPH";
//   const movieEx = moviesExt.map((data, index) => {
//     return (
//       <div key={data.url}>
//         <a href={data.url}>{data.url}</a>
//       </div>
//     );
//   });
//   return (
//     <div>
//       <div className="btn-group">
//         <Link to="/">
//           <i className="fas fa-chevron-left fa-lg m-2" />
//         </Link>
//         <h3> Extended Movies</h3>
//       </div>
//       {movieEx}
//     </div>
//   );
// };
export const Movies = () => {
  return (
    <div>
      <h3>Movies Content</h3>
      {link(movies)}
      <br />
      {/* <h3>More Movies</h3>
      <Link to="/extendedMovies">click here...</Link> */}
    </div>
  );
};
