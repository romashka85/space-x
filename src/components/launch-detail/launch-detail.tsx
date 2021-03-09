import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

import { launchDate } from '../../utils/date';
import InfoTable from '../info-table/InfoTable';

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

interface MatchParams {
  match: { params: { id: number } };
}

interface MatchDetailProps {
  id: number;
  details: string;
  launch_success: boolean;
  mission_name: string;
  launch_date_local: Date;
  links: { mission_patch_small: string };
  launch_site: { site_name: string };
  rocket_name: string;
  second_stage: { payloads: Payloads[] };
}

interface Payloads {
  orbit: string;
  payload_type: string;
  payload_mass_lbs: number;
  reused: boolean;
}

const LaunchDetail: React.FC<MatchParams> = (props: MatchParams) => {
  const { data } = useQuery(GET_LAUNCH, {
    variables: { id: props.match.params.id },
  });

  if (!data) return <p>Loading ...</p>;

  const { launch } = data;
  const {
    id,
    details,
    launch_success,
    mission_name,
    launch_date_local,
    links,
    launch_site,
  }: MatchDetailProps = launch;
  const {
    rocket_name,
    second_stage: { payloads },
  }: MatchDetailProps = launch.rocket;

  const summaryLaunchDetail = {
    date: launchDate(launch_date_local),
    site: launch_site.site_name,
    rocket: rocket_name,
  };
  const summaryLaunchDetailLabel = {
    date: 'Launch Date',
    site: 'Launch Site',
    rocket: 'Rocket Type',
  };
  const missionPayloads = {
    type: payloads[0].payload_type,
    weight: payloads[0].payload_mass_lbs,
    orbit: payloads[0].orbit,
    reused: `${payloads[0].reused}` ? ' Yes' : ' No',
  };
  const missionPayloadsLabel = {
    type: 'Type',
    weight: 'Weight',
    orbit: 'Orbit',
    reused: 'Reused',
  };

  return (
    <div className="launch-detail">
      <div className="back-button">
        <Link to="/space-x/">Back</Link>
      </div>
      <h1>Mission Summary</h1>
      <div className="launch-detail-summary">
        <div className="launch-detail-card-header">
          {launch_success ? (
            <div className="launch-detail-successful">Successful</div>
          ) : (
            <div className="launch-detail-not-successful">Not Successful</div>
          )}
          <div>{id}</div>
        </div>
        <div className="launch-detail-card-body">
          {links.mission_patch_small ? (
            <div className="launch-detail-img">
              <img
                alt="launch"
                src={`${links.mission_patch_small}?set=set2&size=180x180`}
              />
            </div>
          ) : (
            <div></div>
          )}
          <div className="launch-detail-text">
            <h3>{mission_name}</h3>
            <p>{details}</p>
          </div>
          <InfoTable
            data={summaryLaunchDetail}
            label={summaryLaunchDetailLabel}
          />
        </div>
      </div>
      <div className="launch-detail-info">
        <h1>Mission Payloads Details</h1>
        <InfoTable label={missionPayloadsLabel} data={missionPayloads} />
      </div>
    </div>
  );
};

export default LaunchDetail;
