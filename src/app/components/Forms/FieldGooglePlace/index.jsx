import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import GoogleMapReact from 'google-map-react';
import SvgIcon from 'material-ui/SvgIcon';

import { composePure, withState, withProps, withHandlers, withInit } from '../../../utils/composepure';

const HomeIcon = props => (
  <SvgIcon {...props}>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </SvgIcon>
);

const MarketPoint = () => (
  <div>
    <HomeIcon
      color="red"
      style={{
        width: 36,
        height: 36,
      }}
    />
  </div>
);

const FieldGooglePlace = ({ address, inputProps, label, confirm, location }) => (
  <div className="form-group">
    <label htmlFor="example-text-input" className="col-2 col-form-label">{label}</label>
    <div className="col-10">
      <PlacesAutocomplete inputProps={inputProps} />
      <button type="button" onClick={confirm}>Ok</button>
    </div>
    <div className="col-10">
      {location && location.coordinates[0] !== 0 && (
        <GoogleMapReact
          defaultCenter={{ lat: location.coordinates[1], lng: location.coordinates[0] }}
          defaultZoom={11}
        >
          <MarketPoint
            lat={location.coordinates[1]}
            lng={location.coordinates[0]}
            text="Here"
          />
        </GoogleMapReact>)}
    </div>
  </div>
);


export default composePure(
  withState('address', 'setAddress', ''),
  withProps(props => ({
    inputProps: {
      value: props.address,
      onChange: address => props.setAddress(address),
    },
    label: props.label,
    handler: props.handler,
  })),
  withHandlers({
    confirm: props => () => {
      geocodeByAddress(props.address)
        .then(results => getLatLng(results[0]))
        .then(latLng => props.handler({ latLng, address: props.inputProps.value }))
        .catch(error => console.error('Error', error));
    },
  }),
  withInit(['_'], ({ value, setAddress }) => setAddress(value)),
)(FieldGooglePlace);
