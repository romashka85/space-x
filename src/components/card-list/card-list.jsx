import React from 'react';

import Card from '../card/card';

import './card-list.css';

const CardList = ({launches}) => {
    return (
        <div className='card-list'>
            {
                launches.map((launch, key) => <Card key={key} launch={launch}/>)
            }
        </div>
    )
}

export default CardList;