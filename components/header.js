import Image from 'next/Image';
import logofinal from "../public/images/logofinal.svg";

const Header = () => {
    return ( 
        <nav className="navbar navbar-expand-lg navbar-light bg-light static-top" style={{zIndex: '100', border: "2px solid #332F30", backgroundColor: "white !important", height: "100px", padding: "0"}}>
            <a className="navbar-brand" style={{marginLeft: "14px"}}href="#">
                <Image src={logofinal} alt="" width="70px" height="64px" top="20px"/>
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
            <div className="collapse navbar-collapse" id="navbarResponsive" style={{justifyContent:"flex-end", height: "100%"}}>
                <ul className="navbar-nav ml-auto" style={{height: "100%", display: "flex", justifyContent:"center", alignItems:"center"}}>
                    <li className="nav-item active" style={{padding: "22px", border:"2px solid #332F30", borderBottom: "0", width: "250px"}}>
                        <a className="nav-link" style={{fontSize:"26px", fontFamily:"Le Havre Rounded Regular", color: "#332F30", textAlign:"center"}} href="#">about us</a>
                    </li>
                    <li className="nav-item" style={{padding: "22px", backgroundColor: "#332F30", width: "250px"}}>
                        <a className="nav-link" style={{fontSize:"26px", fontFamily:"Le Havre Rounded Regular", color:"white", textAlign:"center"}} href="#">back to home</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
 
export default Header;