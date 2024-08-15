import React from "react";
import '../styles/main.css'
import  BannerCard from './bannerCard'

function Main(){
    const userPicture = "https://c4.wallpaperflare.com/wallpaper/531/525/90/tv-show-peaky-blinders-wallpaper-preview.jpg"
    let bestProject = {
        "average_rating": "4.1",
        "description": "General school contain yeah yes nice. There pick drop.",
        "id": 1,
        "image_url": "image1.jpg",
        "link": "http://martin-sanchez.info/",
        "owner_id": 3,
        "published_date": "2024-08-13 09:02:12",
        "ratings": [
          {
            "design_rating": "4.8",
            "functionality_rating": "2.8",
            "id": 8,
            "project_id": 1,
            "usability_rating": "4.7",
            "user": {
              "active": true,
              "email": "johnstonmartin@example.com",
              "id": 9,
              "name": "Douglas Lopez",
              "user_role": "user",
              "username": "tammy18"
            },
            "user_id": 9
          }
        ],
        "reviews": [
          {
            "comment": "Stop write market government Mr learn.",
            "date": "2024-08-13 09:02:12",
            "id": 11,
            "project_id": 1,
            "user": {
              "active": true,
              "email": "kevin43@example.net",
              "id": 7,
              "name": "Stephanie Trujillo",
              "user_role": "user",
              "username": "berryjason"
            },
            "user_id": 7
          },
          {
            "comment": "Truth road have history whom season.",
            "date": "2024-08-13 09:02:12",
            "id": 15,
            "project_id": 1,
            "user": {
              "active": true,
              "email": "rlong@example.org",
              "id": 8,
              "name": "Tamara Romero",
              "user_role": "user",
              "username": "dyoung"
            },
            "user_id": 8
          }
        ],
        "tags": "science, detail, candidate",
        "title": "Hold particularly physical have.",
        "user": {
          "active": true,
          "email": "jessica74@example.org",
          "id": 3,
          "name": "Michelle Robertson",
          "user_role": "user",
          "username": "christopher65"
        }
      }

      console.log(bestProject.average_rating)
      console.log(bestProject.reviews.length)
    return(
        <>
            <div id="project-banner">
                <div id="project-details">

                    <a href="/projects" id="site-link" target="new">
                        <h1 id="site-url">
                           view more projects
                        </h1>
                        <i className="bi bi-arrow-right-circle-fill"></i>
                    </a>



                </div>
                <iframe id="iframe-screen" src={bestProject.link}height="700" width="1300" allowFullScreen lazyload='true' frameBorder="0" allow="clipboard-write" refererPolicy="strict-origin-when-cross-origin"></iframe>

           </div>
           <div id="project-highlights">

                <div id="project-info">

                    <div id="project-reviews">
                        <h1 id="project-rating">Rating:{bestProject.average_rating}</h1>
                        <p>{bestProject.reviews.length} | comments</p>
                         
                        
                       
                    </div>
                </div>
                    <a href={bestProject.link} id="site-link" >
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
