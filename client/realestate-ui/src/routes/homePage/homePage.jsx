import "./homePage.scss";
import SearchBar from "../../components/searchBar/SearchBar"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function HomePage(){

    const {currentUser} = useContext(AuthContext);
    console.log(currentUser)
    return(
        <div className="homePage">
            <div className="textContainer">
                <div className="wrapper">
                <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
                <p>
                "Find your dream home with ease! Our real estate platform offers a seamless experience to browse, buy, sell, or rent properties. Discover the best listings, connect with trusted agents, and make informed decisions—all in one place!"
                </p>
                <SearchBar />
                <div className="boxes">
                    <div className="box">
                        <h1>12+</h1>
                        <h2>Years of Experience</h2>
                    </div>
                    <div className="box">
                        <h1>110</h1>
                        <h2>Awards Gained</h2>
                    </div>
                    <div className="box">
                        <h1>1000+</h1>
                        <h2>Properties Ready</h2>
                    </div>
                </div>
                </div>
            </div>
            <div className="imgContainer">
                <img src="/bg.png" alt=""/>
            </div>
        </div>
    )
}

export default HomePage