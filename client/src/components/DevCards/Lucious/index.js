import React from 'react';
import '../../styles/AboutUs/devcard.scss'
import '../../styles/variables.scss';
import { FaLinkedin } from 'react-icons/fa';


function Lucious() {

    return (
        <div>
            <div className="card dev-card">
                <img src='https://media.licdn.com/dms/image/C5603AQHsJJSTjoE-5g/profile-displayphoto-shrink_200_200/0?e=1571270400&v=beta&t=TjhMjpahllPGCHGkRwx_QgThBJkzisICGVaaFvKXwkU' className="card-img-top"></img>
                <div className="card-body">
                    <h3>Lucious Jackson</h3>
                    <p className="card-text">Recent graduate of the UC Davis, Full Stack Web Development program. In pursuit of attaining a front end developer career. In-depth knowledge of HTML5, CSS3, and JavaScript with the prime focus of developing unique and stunning websites that are desktop and mobile user-friendly.</p>
                    <h4>Skillset:</h4>
                    <ul>
                        <li>HTML5</li>
                        <li>CSS3</li>
                        <li>JavaScript</li>
                        <li>Bootstrap</li>
                        <li>ReactJs</li>
                    </ul>
                    <a href="http://www.linkedin.com/in/lucious-x-jackson-9a4807155"><FaLinkedin className="aboutIcon" /></a>
                </div>
            </div>
        </div>
    )
}



export default Lucious;