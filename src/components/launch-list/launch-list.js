import React from 'react';
import { gql, useQuery } from "@apollo/client";
import { Link } from 'react-router-dom';

import { launchDate } from '../../utils/date';
import './launch-list.css';

const GET_LAUNCHES_PAST = gql`
{
  launchesPast(limit: 10) {
    mission_name
    launch_date_local
    links {
      mission_patch_small
    }
    details
    id
  }
}
`;



const LaunchList = () => {  
  
  const { loading, fetchMore, data } = useQuery(GET_LAUNCHES_PAST, {  fetchPolicy: "network-only" });   

  if (loading) return <p>Loading ...</p>;
  return (
    <div className="launch-list">
      {
        data.launchesPast.map(({id, mission_name, launch_date_local, details, links}) => 
          <div className='launch-card' key={id}>
            <div className='launch-card-header'>
              {
                links.mission_patch_small ? (
                  <div className='card-header-img'>            
                    <img 
                    alt='launch'
                    src={`${links.mission_patch_small}?set=set2&size=180x180`}
                    />
                  </div>
                ) :
                <div></div>
              }              
              <div className='card-header-details'>
                <div>{mission_name}</div>
                <div>{`Date: ${launchDate(launch_date_local)}`}</div>
              </div>
            </div>
            <div className='launch-card-details'>
              <p className='card-details-content'>
                {details}
              </p>
              <button className='card-details-button'>
                <Link to={`/launch/${id}`}>More details</Link>
              </button>
            </div>
          </div>
        )            
      }
    </div>
  );
}

export default LaunchList;