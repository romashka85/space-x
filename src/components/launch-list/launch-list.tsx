import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import Pagination from '../pagination/pagination';

import { launchDate } from '../../utils/date';
import './launch-list.css';

const GET_LAUNCHES_PAST = gql`
  query LaunchPastQuery($offset: Int, $limit: Int) {
    launchesPast(offset: $offset, limit: $limit) {
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

interface LaunchDateProps {
  id: number; 
  mission_name: string;
  launch_date_local: Date;
  details: string;
  links: {mission_patch_small: string};  
}

const LaunchList: React.FC<LaunchDateProps> = () => {
  const [currentPage, setCurrentPage] = useState(2);
  const limit: number = 6;

  const { loading, data } = useQuery(GET_LAUNCHES_PAST, {
    variables: {
      offset: (currentPage - 1) * limit,
      limit,
    },
  });

  if (loading) return <p>Loading ...</p>;
  return (
    <div>
      <div className="launch-list">
        {data.launchesPast.map(
          ({ id, mission_name, launch_date_local, details, links }: LaunchDateProps) => (
            <div className="launch-card" key={id}>
              <div className="launch-card-header">
                {links.mission_patch_small ? (
                  <div className="card-header-img">
                    <img
                      alt="launch"
                      src={`${links.mission_patch_small}?set=set2&size=180x180`}
                    />
                  </div>
                ) : (
                  <div></div>
                )}
                <div className="card-header-details">
                  <div>{mission_name}</div>
                  <div>{`Date: ${launchDate(launch_date_local)}`}</div>
                </div>
              </div>
              <div className="launch-card-details">
                <p className="card-details-content">{details}</p>
                <button className="card-details-button">
                  <Link to={`/launch/${id}`}>More details</Link>
                </button>
              </div>
            </div>
          )
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        limit={limit}
      />
    </div>
  );
};

export default LaunchList;
