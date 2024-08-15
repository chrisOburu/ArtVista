import React from "react";
import '../styles/main.css'
import  BannerCard from './bannerCard'

function Main(){
    const userPicture = "https://c4.wallpaperflare.com/wallpaper/531/525/90/tv-show-peaky-blinders-wallpaper-preview.jpg"
    let bestProject =   {
        "average_rating": "3.066666666666666666666666667",
        "description": "Experience history history wrong send movement computer. Deal discuss indicate miss defense teacher. Agreement lot maybe parent.",
        "id": 8,
        "image_url": "image2.jpg",
        "link": "https://vargas.biz/",
        "owner_id": 1,
        "published_date": "2024-08-13 09:02:12",
        "ratings": [
          {
            "design_rating": "3.6",
            "functionality_rating": "4.3",
            "id": 10,
            "project_id": 8,
            "usability_rating": "1.3",
            "user": {
              "active": true,
              "email": "jessica74@example.org",
              "id": 3,
              "name": "Michelle Robertson",
              "user_role": "user",
              "username": "christopher65"
            },
            "user_id": 3
          }
        ],
        "reviews": [
          {
            "comment": "Teach major age lawyer church.",
            "date": "2024-08-13 09:02:12",
            "id": 16,
            "project_id": 8,
            "user": {
              "active": true,
              "email": "chunt@example.net",
              "id": 10,
              "name": "Jeffery Simmons",
              "user_role": "user",
              "username": "adamstamara"
            },
            "user_id": 10
          },
          {
            "comment": "Paper material down.",
            "date": "2024-08-13 09:02:12",
            "id": 20,
            "project_id": 8,
            "user": {
              "active": true,
              "email": "leonardzachary@example.net",
              "id": 2,
              "name": "Todd Mccormick",
              "user_role": "user",
              "username": "wilsonthomas"
            },
            "user_id": 2
          }
        ],
        "tags": "on, race, best",
        "title": "Kind government rock.",
        "user": {
          "active": true,
          "email": "idiaz@example.org",
          "id": 1,
          "name": "Julie Ryan",
          "user_role": "user",
          "username": "vking"
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
                        <h2 id="project-rating">Rating:{Math.round(bestProject.average_rating * 100) / 100}</h2>
                        <h3>{bestProject.reviews.length} | comments</h3>
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
