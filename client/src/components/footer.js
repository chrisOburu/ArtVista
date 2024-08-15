import "../styles/footer.css"

function Footer(){
    return(
        <>
            <div id="footer">
                <div id="footer-section">
                    <div id="footer-banner"></div>
                    <div id="socials">
                        <div id="footer-nav">
                            <a href="#header" className="footer-nav">Home</a>
                        </div>
                        <div id="socials-icon">
                            <i className="bi bi-instagram"></i>
                            <i className="bi bi-whatsapp"></i>
                            <i className="bi bi-facebook"></i>
                            <i className="bi bi-youtube"></i>
                        </div>

                    </div>

                </div>
                <div id="footer-bottom">
                    <span id="country">kenya</span>
                    <h2>Site terms</h2>
                    <h2> Privacy Policy</h2>
                </div>
            </div>

        </>
    )
}

export default Footer