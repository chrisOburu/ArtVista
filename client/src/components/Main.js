import React from "react";
import '../styles/main.css'
import { Link } from "react-router-dom";


function Main(){
    //const userPicture = "https://c4.wallpaperflare.com/wallpaper/531/525/90/tv-show-peaky-blinders-wallpaper-preview.jpg"
    let bestProject =     {
      "average_rating": 2.8000000000000003,
      "description": "In another realize everyone approach there magazine. Prevent administration approach either hit letter.",
      "id": 4,
      "image_url": "image6.jpg",
      "link": "https://www.theinspirationgrid.com",
      "owner_id": 6,
      "published_date": "2024-08-16 04:57:02",
      "ratings": [
        {
          "design_rating": 2.1,
          "functionality_rating": 2.1,
          "id": 4,
          "project_id": 4,
          "usability_rating": 3,
          "user": {
            "active": true,
            "email": "smithsarah@example.org",
            "id": 4,
            "name": "Gregory Anderson",
            "user_role": "user",
            "username": "ellisjamie"
          },
          "user_id": 4
        },
        {
          "design_rating": 3.9,
          "functionality_rating": 2.1,
          "id": 5,
          "project_id": 4,
          "usability_rating": 1.4,
          "user": {
            "active": true,
            "email": "jasmineaguilar@example.com",
            "id": 1,
            "name": "Suzanne Ballard",
            "user_role": "user",
            "username": "reginamiller"
          },
          "user_id": 1
        },
        {
          "design_rating": 3.3,
          "functionality_rating": 3.2,
          "id": 7,
          "project_id": 4,
          "usability_rating": 2.6,
          "user": {
            "active": true,
            "email": "jeremyweeks@example.org",
            "id": 9,
            "name": "Meagan Woods",
            "user_role": "user",
            "username": "donnasmith"
          },
          "user_id": 9
        },
        {
          "design_rating": 1.2,
          "functionality_rating": 4.1,
          "id": 9,
          "project_id": 4,
          "usability_rating": 4.6,
          "user": {
            "active": true,
            "email": "kristen59@example.com",
            "id": 7,
            "name": "Natasha Dixon",
            "user_role": "user",
            "username": "dmiller"
          },
          "user_id": 7
        }
      ],
      "reviews": [
        {
          "comment": "Democratic modern really could trip away increase.",
          "date": "2024-08-16 04:57:02",
          "id": 15,
          "project_id": 4,
          "user": {
            "active": true,
            "email": "cartererin@example.org",
            "id": 10,
            "name": "Robert Morrow",
            "user_role": "user",
            "username": "barrettannette"
          },
          "user_id": 10
        }
      ],
      "tags": "simple, far, heart",
      "title": "Contain answer.",
      "user": {
        "active": true,
        "email": "nsmith@example.com",
        "id": 6,
        "name": "Jesus Valdez",
        "user_role": "user",
        "username": "john72"
      }
    }


    return(
        <>
            <div id="project-banner">
                <div id="project-details">

                    <Link to="/projects"  id="site-link" >
                        <h1 id="site-url">
                           view more projects
                        </h1>
                        <i className="bi bi-arrow-right-circle-fill"></i>
                    </Link>



                </div>
                {/* eslint-disable-next-line */}
                <iframe id="iframe-screen" src={bestProject.link}height="700" width="1300" allowFullScreen lazyload='true' frameBorder="0" allow="clipboard-write" refererPolicy="strict-origin-when-cross-origin"></iframe>

           </div>
           <div id="project-highlights">

                <div id="project-info">

                    <div id="project-reviews">
                        <h2 id="project-rating">Rating:{Math.round(bestProject.average_rating * 100) / 100}</h2>
                        <h3>{bestProject.reviews.length} | comments</h3>
                    </div>
                </div>
                    <a href={bestProject.link} id="site-link" target="new" >
                            <h1 id="site-url">
                               visit the website
                            </h1>
                            <i className="bi bi-arrow-right-circle-fill"></i>
                    </a>
            </div>

        
        </>
    )
}

export default Main
