import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom' ;

import { launchDate } from '../../utils/date';

import './launch-detail.css';

const GET_LAUNCH = gql`
  query LaunchQuery($id: ID!) {
    launch(id: $id) {
    id
    details
    launch_success
    mission_name
    launch_date_local
    rocket {
      rocket_name
      second_stage {
        payloads {
          orbit
          payload_type          
          payload_mass_lbs
          reused
        }
      }
    }
    launch_site {
      site_name
    }
    links {
      mission_patch_small
    }
  }
  }
`;

const LaunchDetail = (props) => {  
  const { data} = useQuery(GET_LAUNCH, { variables: { id: props.match.params.id} }); 
     
  if (!data) return <p>Loading ...</p>;
  
  const { launch } = data;
    return (
    <div className='launch-detail'>
      <div className="back-button"><Link to='/'>Back</Link></div>      
      <h1>Mission Summary</h1>
      <div className="launch-detail-summary">
        <div className='launch-detail-card-header'>
          <div>Successful</div>
          <div>{launch.id}</div>
        </div>
        <div className='launch-detail-card-body'>
          {
            launch.links.mission_patch_small ? (
              <div className='launch-detail-img'>            
                <img 
                alt='launch'
                src={`${launch.links.mission_patch_small}?set=set2&size=180x180`}
                />
              </div>
            ) :
            <div></div>
          } 
          <div className='launch-detail-text'>
            <h3>{launch.mission_name}</h3>
            <p>{launch.details}</p>
          </div>
          <div className='card-table'>
            <div className='info-table-float'>
              <div className='launch-detail-info-name'>Launch Date:</div>
              <div className='launch-detail-info-data'>{launchDate(launch.launch_date_local)}</div>
            </div>
            <div className='info-table-float'>
              <div className='launch-detail-info-name'>Launch Site:</div>
              <div className='launch-detail-info-data'>{launch.launch_site.site_name}</div>
            </div>
            <div className='info-table-float'>
              <div className='launch-detail-info-name'>Rocket Type:</div>
              <div className='launch-detail-info-data'>{launch.rocket.rocket_name}</div>
            </div>            
          </div>
        </div>
      </div>
      <div className="launch-detail-info">
        <h1>Mission Payloads Details</h1>
        <div className="info-table">
          <div className='info-table-float'>
            <div className='launch-detail-info-name'>Type:</div>
            <div className='launch-detail-info-data'>{launch.rocket.second_stage.payloads[0].payload_type}</div>
          </div>
          <div className='info-table-float'>
            <div className='launch-detail-info-name'>Weight:</div>
            <div className='launch-detail-info-data'>{launch.rocket.second_stage.payloads[0].payload_mass_lbs}</div>
          </div>
          <div className='info-table-float'>
            <div className='launch-detail-info-name'>Orbit:</div>
            <div className='launch-detail-info-data'>{launch.rocket.second_stage.payloads[0].orbit}</div>
          </div>
          <div className='info-table-float'>
            <div className='launch-detail-info-name'>Reused:</div>
            <div className='launch-detail-info-data'>{`${launch.rocket.second_stage.payloads[0].reused}` ? " Yes" : " No"}</div>
          </div>
        </div>           
      </div>           
    </div>
    )
}

export default LaunchDetail;
