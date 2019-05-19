import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import Geosuggest from 'react-geosuggest';

const defaultFixtures = [
    { label: 'Могилев', location: { lat: 53.8834808, lng: 30.2114947 } },
    { label: 'Old Elbe Tunnel, Hamburg', location: { lat: 53.5459, lng: 9.966576 } },
    { label: 'Reeperbahn, Hamburg', location: { lat: 53.5495629, lng: 9.9625838 } },
    { label: 'Alster, Hamburg', location: { lat: 53.5610398, lng: 10.0259135 } }
];

export const AddressInput = ({
    fixtures = defaultFixtures,
    onChange = (...data) => { console.log(data) },
}) => (
        <div>
            <Geosuggest
                placeholder="Улица и номер дома"
                initialValue=""
                fixtures={fixtures}
                onSuggestSelect={onChange}
                location={new (window as any).google.maps.LatLng(53.8834808, 30.2114947)}
                radius="20" />
        </div>
    );