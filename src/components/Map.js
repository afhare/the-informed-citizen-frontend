import React, { Component } from 'react';
import { connect } from 'react-redux';
import USAMap from "react-usa-map";
 
class Map extends Component {
  /* mandatory */
  mapHandler = (event) => {
    alert(event.target.dataset.name);
  };

 
  /* optional customization of filling per state and calling custom callbacks per state */
  statesCustomConfig = () => {
      switch(this.props.filter){
          case 'voting-turnout':
            return {
                "AL": { fill: "#D46A6A",},"AK": {fill: "#801515",},"AZ": {fill: "#D46A6A",},"AR": {fill: "#D46A6A",},"CA": {fill: "#D46A6A",},"CO": {fill: "#550000",},"CT": {fill: "#801515",},"DE": {fill: "#801515",},"DC": {fill: "#D46A6A",},"FL": {fill: "#801515",},"GA": {fill: "#801515",},"HI": {fill: "#FFAAAA",},"ID": {fill: "#801515",},"IL": {fill: "#801515",},"IN": {fill: "#D46A6A",},"IA": {fill: "#801515",},"KS": {fill: "#801515",},"KY": {fill: "#D46A6A",},"LA": {fill: "#D46A6A",},"ME": {fill: "#550000",},"MD": {fill: "#801515",},"MA": {fill: "#801515",},"MI": {fill: "#801515",},"MN": {fill: "#550000",},"MS": {fill: "#D46A6A",},"MO": {fill: "#801515",},"MT": {fill: "#550000",},"NE": {fill: "#801515",},"NV": {fill: "#D46A6A",},"NH": {fill: "#801515",},"NJ": {fill: "#801515",},"NM": {fill: "#D46A6A",},"NY": {fill: "#D46A6A",},"NC": {fill: "#D46A6A",},"ND": {fill: "#801515",},"OH": {fill: "#801515",},"OK": {fill: "#D46A6A",},"OR": {fill: "#550000",},"PA": {fill: "#801515",},"RI": {fill: "#D46A6A",},"SC": {fill: "#D46A6A",},"SD": {fill: "#801515",},"TN": {fill: "#D46A6A",},"TX": {fill: "#D46A6A",},"UT": {fill: "#801515",},"VT": {fill: "#801515",},"VA": {fill: "#801515",},"WA": {fill: "#801515",},"WV": {fill: "#D46A6A",},"WI": {fill: "#550000",},"WY": {fill: "#D46A6A"}
            }
          case 'voting-rights-score':
            return {
                "AL": { fill: "#C7CAE8",},"AK": {fill: "#2B358E",},"AZ": {fill: "#5862BB",},"AR": {fill: "#C7CAE8",},"CA": {fill: "#0F1230",},"CO": {fill: "#181E4F",},"CT": {fill: "#5862BB",},"DE": {fill: "#A2A8D9",},"DC": {fill: "#0F1230",},"FL": {fill: "#7D85CA",},"GA": {fill: "#3440AD",},"HI": {fill: "#2B358E",},"ID": {fill: "#3440AD",},"IL": {fill: "#0F1230",},"IN": {fill: "#7D85CA",},"IA": {fill: "#2B358E",},"KS": {fill: "#7D85CA",},"KY": {fill: "#A2A8D9",},"LA": {fill: "#7D85CA",},"ME": {fill: "#22296F",},"MD": {fill: "#0F1230",},"MA": {fill: "#22296F",},"MI": {fill: "#3440AD",},"MN": {fill: "#22296F",},"MS": {fill: "#ECEDF7",},"MO": {fill: "#A2A8D9",},"MT": {fill: "#5862BB",},"NE": {fill: "#3440AD",},"NV": {fill: "#0F1230",},"NH": {fill: "#A2A8D9",},"NJ": {fill: "#3440AD",},"NM": {fill: "#22296F",},"NY": {fill: "#3440AD",},"NC": {fill: "#7D85CA",},"ND": {fill: "#A2A8D9",},"OH": {fill: "#5862BB",},"OK": {fill: "#5862BB",},"OR": {fill: "#22296F",},"PA": {fill: "#7D85CA",},"RI": {fill: "#7D85CA",},"SC": {fill: "#A2A8D9",},"SD": {fill: "#C7CAE8",},"TN": {fill: "#7D85CA",},"TX": {fill: "#C7CAE8",},"UT": {fill: "#2B358E",},"VT": {fill: "#0F1230",},"VA": {fill: "#7D85CA",},"WA": {fill: "#181E4F",},"WV": {fill: "#2B358E",},"WI": {fill: "#3440AD",},"WY": {fill: "#3440AD",}
            }
          case 'state-view':
            return{
                [this.props.state.abbreviation] : {fill: "#324744"}
            }
          case 'gender':
            return {
                "AL": { fill: "#6E5F89",},"AK": { fill: "#786087",},"AZ": { fill: "#786087",},"AR": { fill: "#515E90",},"CA": { fill: "#786087",},"CO": { fill: "#5B5E8E",},"CT": { fill: "#6E5F89",},"DE": { fill: "#786087",},"DC": { fill: "#C76475",},"FL": { fill: "#6E5F89",},"GA": { fill: "#515E90",},"HI": { fill: "#6E5F89",},"ID": { fill: "#515E90",},"IL": { fill: "#6E5F89",},"IN": { fill: "#5B5E8E",},"IA": { fill: "#8C6182",},"KS": { fill: "#5B5E8E",},"KY": { fill: "#515E90",},"LA": { fill: "#515E90",},"ME": { fill: "#8C6182",},"MD": { fill: "#515E90",},"MA": { fill: "#786087",},"MI": { fill: "#786087",},"MN": { fill: "#8C6182",},"MS": { fill: "#5B5E8E",},"MO": { fill: "#5B5E8E",},"MT": { fill: "#515E90",},"NE": { fill: "#5B5E8E",},"NV": { fill: "#AA627C",},"NH": { fill: "#B3637A",},"NJ": { fill: "#5B5E8E",},"NM": { fill: "#786087",},"NY": { fill: "#786087",},"NC": { fill: "#5B5E8E",},"ND": { fill: "#515E90",},"OH": { fill: "#5B5E8E",},"OK": { fill: "#5B5E8E",},"OR": { fill: "#5B5E8E",},"PA": { fill: "#5B5E8E",},"RI": { fill: "#515E90",},"SC": { fill: "#515E90",},"SD": { fill: "#515E90",},"TN": { fill: "#515E90",},"TX": { fill: "#5B5E8E",},"UT": { fill: "#515E90",},"VT": { fill: "#515E90",},"VA": { fill: "#6E5F89",},"WA": { fill: "#966180",},"WV": { fill: "#6E5F89",},"WI": { fill: "#5B5E8E",},"WY": { fill: "#786087",}
            }
          case 'gender-yellow-scale':
            return {
                "AL": { fill: "#7AD866",},"AK": { fill: "#95DDA8",},"AZ": { fill: "#95DDA8",},"AR": { fill: "#44CED3",},"CA": { fill: "#95DDA8",},"CO": { fill: "#5FD3C5",},"CT": { fill: "#7AD866",},"DE": { fill: "#95DDA8",},"DC": { fill: "#E6EC72",},"FL": { fill: "#7AD866",},"GA": { fill: "#44CED3",},"HI": { fill: "#7AD866",},"ID": { fill: "#44CED3",},"IL": { fill: "#7AD866",},"IN": { fill: "#5FD3C5",},"IA": { fill: "#B0E29A",},"KS": { fill: "#5FD3C5",},"KY": { fill: "#44CED3",},"LA": { fill: "#44CED3",},"ME": { fill: "#B0E29A",},"MD": { fill: "#44CED3",},"MA": { fill: "#95DDA8",},"MI": { fill: "#95DDA8",},"MN": { fill: "#B0E29A",},"MS": { fill: "#5FD3C5",},"MO": { fill: "#5FD3C5",},"MT": { fill: "#44CED3",},"NE": { fill: "#5FD3C5",},"NV": { fill: "#CBE786",},"NH": { fill: "#D8EA84",},"NJ": { fill: "#5FD3C5",},"NM": { fill: "#95DDA8",},"NY": { fill: "#95DDA8",},"NC": { fill: "#5FD3C5",},"ND": { fill: "#44CED3",},"OH": { fill: "#5FD3C5",},"OK": { fill: "#5FD3C5",},"OR": { fill: "#5FD3C5",},"PA": { fill: "#5FD3C5",},"RI": { fill: "#44CED3",},"SC": { fill: "#44CED3",},"SD": { fill: "#44CED3",},"TN": { fill: "#44CED3",},"TX": { fill: "#5FD3C5",},"UT": { fill: "#44CED3",},"VT": { fill: "#44CED3",},"VA": { fill: "#7AD866",},"WA": { fill: "#BEE492",},"WV": { fill: "#7AD866",},"WI": { fill: "#5FD3C5",},"WY": { fill: "#95DDA8",}
            }
          default:
            return {
                "AL": { fill: "#AEB3B3"},"AK": {fill: "#808C8A"},"AZ": {fill: "#4B5E5C"},"AR": {fill: "#324744"},"CA": {fill: "#AEB3B3"},"CO": {fill: "#808C8A"},"CT": {fill: "#4B5E5C"},"DE": {fill: "#324744"},"DC": {fill: "#AEB3B3"},"FL": {fill: "#808C8A"},"GA": {fill: "#4B5E5C"},"HI": {fill: "#324744"},"ID": {fill: "#AEB3B3"},"IL": {fill: "#808C8A"},"IN": {fill: "#4B5E5C"},"IA": {fill: "#324744"},"KS": {fill: "#AEB3B3"},"KY": {fill: "#808C8A"},"LA": {fill: "#4B5E5C"},"ME": {fill: "#324744"},"MD": {fill: "#AEB3B3"},"MA": {fill: "#808C8A"},"MI": {fill: "#4B5E5C"},"MN": {fill: "#324744"},"MS": {fill: "#AEB3B3"},"MO": {fill: "#808C8A"},"MT": {fill: "#4B5E5C"},"NE": {fill: "#324744"},"NV": {fill: "#AEB3B3"},"NH": {fill: "#808C8A"},"NJ": {fill: "#4B5E5C"},"NM": {fill: "#324744"},"NY": {fill: "#AEB3B3"},"NC": {fill: "#808C8A"},"ND": {fill: "#4B5E5C"},"OH": {fill: "#324744"},"OK": {fill: "#AEB3B3"},"OR": {fill: "#808C8A"},"PA": {fill: "#4B5E5C"},"RI": {fill: "#324744"},"SC": {fill: "#AEB3B3"},"SD": {fill: "#808C8A"},"TN": {fill: "#4B5E5C"},"TX": {fill: "#324744"},"UT": {fill: "#AEB3B3"},"VT": {fill: "#808C8A"},"VA": {fill: "#4B5E5C"},"WA": {fill: "#AEB3B3"},"WV": {fill: "#808C8A"},"WI": {fill: "#4B5E5C"},"WY": {fill: "#324744"}
            }
      }
  };
 
  render() {
    return (
      <>
        <USAMap customize={this.statesCustomConfig()} onClick={this.mapHandler} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        states: state.states,
        loader: state.loader,
        state: state.showState
    }
}

export default connect(mapStateToProps, null)(Map)
