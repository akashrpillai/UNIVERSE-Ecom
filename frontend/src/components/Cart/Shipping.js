import React, { Fragment, useState } from 'react';
import "./shipping.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Country, State } from 'country-state-city';
import { useAlert } from "react-alert";
import MetaData from '../layouts/MetaData';
import { storeShippingInfo } from '../../actions/cartAction';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PlaceIcon from '@mui/icons-material/Place';
import PhoneIcon from '@mui/icons-material/Phone';
import PublicIcon from '@mui/icons-material/Public';
import MapIcon from '@mui/icons-material/Map';
import CustomizedSteppers from "../Cart/CheckoutSteps.js";


const Shipping = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => { return state.cart });

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("Phone Number should be 10 digits");
      return;
    }
    dispatch(
      storeShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    navigate("/order/confirm");
  }

  return (
    <Fragment>
      <MetaData title={`ShippingInfo | UNIVERSE`} />
      <CustomizedSteppers activeStep={0} />
      <div className="shippingInfo-container">
        <div className="shippingInfoBox">
          <h3 className='shippingHeading'>Shipping Address</h3>
          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div className='street-address'>
              <label htmlFor="address" className='shipping-label'><HomeIcon />Address</label>
              <input
                id='address'
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className='phone-no'>
              <label htmlFor="phoneNo" className='shipping-label'> <PhoneIcon />Phone</label>
              <input
                id='phoneNo'
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>
            <div className="zip_city">
              <div className='shipping-pincode'>
                <label htmlFor="zip" className='shipping-label'><PlaceIcon />Pin Code</label>
                <input
                  id='zip'
                  type="number"
                  placeholder="Pin Code"
                  required
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                />
              </div>
              <div className='shipping-city'>
                <label htmlFor="city" className='shipping-label'> <LocationCityIcon />City</label>
                <input
                  id='city'
                  type="text"
                  placeholder="City"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>

            <div className="country_state">
              <div className='shipping-country'>
                <label htmlFor="country" className='shipping-label'> <PublicIcon />Country</label>
                <select
                  id='country'
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="">Country</option>
                  {Country &&
                    Country.getAllCountries().map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
              {country && (
                <div className='shipping-state'>
                  <label htmlFor="city" className='shipping-label'>  <MapIcon />State</label>
                  <select
                    id='city'
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option value="">State</option>
                    {State &&
                      State.getStatesOfCountry(country).map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
              )}

            </div>
            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              disabled={state ? false : true}
              style={state ? { "cursor": "pointer" } : { "opacity": "0.5" }}
            />
          </form>
        </div>
      </div>

    </Fragment>
  )
}

export default Shipping