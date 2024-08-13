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
            <div id="project-banner">
                <div id="project-details">

                    <a href="https://camillemormal.com/" id="site-link" target="new">
                        <h1 id="site-url">
                            camillemormal
                        </h1>
                        <i class="bi bi-arrow-right-circle-fill"></i>
                    </a>



                </div>
                <iframe id="iframe-screen" src="https://camillemormal.com/" height="700" width="1300" allowFullScreen lazyload frameborder="0" allow="clipboard-write" refererPolicy="strict-origin-when-cross-origin"></iframe>

           </div>
           <div id="project-highlights">

                <div id="project-info">
                    <div id="user-details">
                        <img src="https://images.unsplash.com/photo-1721332149274-586f2604884d?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" id="user-image" alt="" />
                    </div>
                    <div id="project-reviews">
                        <h1 id="project-rating">4.0</h1>
                        <p>comments</p>
                        <i class="bi bi-chat-dots">
                            
                        </i>
                       
                    </div>
                </div>
                    <a href="/projects" id="site-link" >
                            <h1 id="site-url">
                               view more projects
                            </h1>
                            <i class="bi bi-arrow-right-circle-fill"></i>
                    </a>
            </div>

        
        </>
    )
}

export default Main
