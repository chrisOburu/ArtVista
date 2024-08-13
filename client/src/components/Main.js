import React from "react";
import '../styles/main.css'
import  BannerCard from './bannerCard'

function Main(){
    const userPicture = "https://c4.wallpaperflare.com/wallpaper/531/525/90/tv-show-peaky-blinders-wallpaper-preview.jpg"
    const banner = {
        id: 12,
        title:"Homepage",
        ratings:"4.5",
        description:"a homepage",
        image_url:"https://cdn.dribbble.com/userupload/16020919/file/original-fb2fa56f5a1171d4398986f72db8767f.jpg?resize=1024x768",
        reviews:{
            length:20,
        }

    }

    return(
        <>
            <div id="main-section">
                <div id="main-banner">
                        <h1 className="banner-title">{banner.title}</h1>
                        <img className="banner-image" src={banner.image_url} alt=" " />
                        <div className="banner-details">
                                <span className="banner-user">
                                    <img className="banner-picture" src={userPicture} alt="" />
                                </span>
                                <h2 className="banner-user-name"> Samuel King</h2>
                                <div className="banner-caption">
                                    <h3>
                                    Rating: {banner.ratings} <span>{banner.reviews.length} {banner.reviews.length > 1 ? 'comments' : 'comment'}</span>
                                    </h3>
                            </div>

                        </div>
                        
                </div>
                <div id="main-projects">
                    <BannerCard />
                    <BannerCard />
                    <BannerCard /> 
                </div>
            </div>
        
        </>
    )
}

export default Main
