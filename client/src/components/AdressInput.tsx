import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import Geosuggest from 'react-geosuggest';

const defaultFixtures = [
    { label: 'улица Симонова 19, Могилёв, Беларусь', location: { lat: 53.8693128, lng: 30.31230729999993 } },
    { label: 'улица Якубовского 13, Могилёв, Беларусь', location: { lat: 53.9171596, lng: 30.318234200000006 } },
    { label: 'улица Космонавтов 19, Могилёв, Беларусь', location: { lat: 53.9108161, lng: 30.315367000000037 } },
];

export const AddressInput = ({
    fixtures = defaultFixtures,
    onChange = (...data) => { console.log(data) },
}) => {
    return (
        <div>
            <Geosuggest
                placeholder="Улица и номер дома"
                initialValue=""
                fixtures={fixtures}
                onSuggestSelect={onChange}
                location={new (window as any).google.maps.LatLng(53.8834808, 30.2114947)}
                radius="20" />
        </div>
    )
};