/* global window */
import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL from 'react-map-gl';
import ControlPanel from './control-panel';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiY2xhcmtjYXJ0ZXIiLCJhIjoiY2lncTBtNjMyMDFvNHY2a29rOWdtY2RwaCJ9.TX02M_EHzs8lUyUacPrOdQ'; // Set your mapbox token here

export default class App extends Component {

  state = {
    mapStyle: '',
    viewport: {
      latitude: 37.805,
      longitude: -122.447,
      zoom: 1,
      bearing: 0,
      pitch: 0,
      width: 500,
      height: 500
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize);
    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  _resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: this.props.width || window.innerWidth,
        height: this.props.height || window.innerHeight
      }
    });
  };

  _onViewportChange = viewport => this.setState({viewport});

  _onStyleChange = mapStyle => this.setState({mapStyle});

  render() {

    const {viewport, mapStyle} = this.state;

    return (
      <MapGL
        {...viewport}
        mapStyle={mapStyle}
        onViewportChange={this._onViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN} >
        <ControlPanel
          containerComponent={this.props.containerComponent}
          onChange={this._onStyleChange} />
      </MapGL>
    );
  }

}
