import React from 'react';

import './info-table.css';


const InfoTable: React.FC<{label: any, data: any }> = ({data, label}) => {
  return (
    <div className="info-table">
      {Object.entries(data).map(([prop, value]) => (
        <div className="info-table-float" key={prop}>
          <div className="launch-detail-info-name">{label[prop]}</div>
          <div className="launch-detail-info-data">{value}</div>    {/* How to fix this error */}
        </div>
      ))}
    </div>
  );
};

export default InfoTable;
