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
                "AL": { fill: "#3333FF",},"AK": { fill: "#9999FF",},"AZ": { fill: "#9999FF",},"AR": { fill: "#515E90",},"CA": { fill: "#9999FF",},"CO": { fill: "#0000CC",},"CT": { fill: "#3333FF",},"DE": { fill: "#9999FF",},"DC": { fill: "#FF0000",},"FL": { fill: "#3333FF",},"GA": { fill: "#000066",},"HI": { fill: "#3333FF",},"ID": { fill: "#000066",},"IL": { fill: "#3333FF",},"IN": { fill: "#0000CC",},"IA": { fill: "#9933FF",},"KS": { fill: "#0000CC",},"KY": { fill: "#000066",},"LA": { fill: "#000066",},"ME": { fill: "#9933FF",},"MD": { fill: "#000066",},"MA": { fill: "#9999FF",},"MI": { fill: "#9999FF",},"MN": { fill: "#9933FF",},"MS": { fill: "#0000CC",},"MO": { fill: "#0000CC",},"MT": { fill: "#000066",},"NE": { fill: "#0000CC",},"NV": { fill: "#FF9999",},"NH": { fill: "#FF6666",},"NJ": { fill: "#0000CC",},"NM": { fill: "#9999FF",},"NY": { fill: "#9999FF",},"NC": { fill: "#0000CC",},"ND": { fill: "#000066",},"OH": { fill: "#0000CC",},"OK": { fill: "#0000CC",},"OR": { fill: "#0000CC",},"PA": { fill: "#0000CC",},"RI": { fill: "#000066",},"SC": { fill: "#000066",},"SD": { fill: "#000066",},"TN": { fill: "#000066",},"TX": { fill: "#0000CC",},"UT": { fill: "#000066",},"VT": { fill: "#000066",},"VA": { fill: "#3333FF",},"WA": { fill: "#FFCCCC",},"WV": { fill: "#3333FF",},"WI": { fill: "#0000CC",},"WY": { fill: "#9999FF",}
            }
          case 'gender-black-white-scale':
            return {
                "AL": { fill: "#A7A7A7",},"AK": { fill: "#C1C1C1",},"AZ": { fill: "#C1C1C1",},"AR": { fill: "#000000",},"CA": { fill: "#C1C1C1",},"CO": { fill: "#3B3B3B",},"CT": { fill: "#A7A7A7",},"DE": { fill: "#C1C1C1",},"DC": { fill: "#FFFFFF",},"FL": { fill: "#A7A7A7",},"GA": { fill: "#000000",},"HI": { fill: "#A7A7A7",},"ID": { fill: "#000000",},"IL": { fill: "#A7A7A7",},"IN": { fill: "#3B3B3B",},"IA": { fill: "#D7D7D7",},"KS": { fill: "#3B3B3B",},"KY": { fill: "#000000",},"LA": { fill: "#000000",},"ME": { fill: "#D7D7D7",},"MD": { fill: "#000000",},"MA": { fill: "#C1C1C1",},"MI": { fill: "#C1C1C1",},"MN": { fill: "#D7D7D7",},"MS": { fill: "#3B3B3B",},"MO": { fill: "#3B3B3B",},"MT": { fill: "#000000",},"NE": { fill: "#3B3B3B",},"NV": { fill: "#EDEDED",},"NH": { fill: "#FBFBFB",},"NJ": { fill: "#3B3B3B",},"NM": { fill: "#C1C1C1",},"NY": { fill: "#C1C1C1",},"NC": { fill: "#3B3B3B",},"ND": { fill: "#000000",},"OH": { fill: "#3B3B3B",},"OK": { fill: "#3B3B3B",},"OR": { fill: "#3B3B3B",},"PA": { fill: "#3B3B3B",},"RI": { fill: "#000000",},"SC": { fill: "#000000",},"SD": { fill: "#000000",},"TN": { fill: "#000000",},"TX": { fill: "#3B3B3B",},"UT": { fill: "#000000",},"VT": { fill: "#000000",},"VA": { fill: "#A7A7A7",},"WA": { fill: "#E5E5E5",},"WV": { fill: "#A7A7A7",},"WI": { fill: "#3B3B3B",},"WY": { fill: "#C1C1C1",}
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
        <USAMap customize={this.statesCustomConfig()} onClick={this.mapHandler} width={'700px'} height={'400px'} />
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
