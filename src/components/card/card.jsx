import React, { useState } from 'react';

import './card.css';

const Card = ({launch}) => {  
	const [showDetails, setShowDetails] = useState(false);
	const displayDetails = () => setShowDetails(true);
  const hideDetails = () => setShowDetails(false);
    
    //Converting date format
    const date = new Date(launch.launch_date_local);
    const year = date.getFullYear();
    let month = date.getMonth()+1;
    let dt = date.getDate();

    if (dt < 10) {
    dt = '0' + dt;
    }
    if (month < 10) {
    month = '0' + month;
    }  

    return (
    <div className='card-container'>
        <img 
            alt='launch'
            src={`${launch.links.mission_patch_small}?set=set2&size=180x180`}
        />
        <p>flight: {launch.flight_number}</p>
        <p>mission name: {launch.mission_name}</p>
        <p>launch date: {year+'-' + month + '-'+dt}</p>
        {/* <p>Place of launch</p> */}
				<button className='show-more-button' onClick={showDetails ? hideDetails : displayDetails}>Show details</button>
				<div className='show-more-info' style={{display: showDetails ? 'block' : 'none'}}>
					<h2>launch details</h2>
					<div className='details'>{launch.details}</div>
					<button className='show-less-button' onClick={showDetails ? hideDetails : displayDetails}>Close details</button>
				</div>
    </div>
    )
}

export default Card;
