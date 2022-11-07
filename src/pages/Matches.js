import Header from '../components/Header';
import MatchesContents from '../containers/MatchesContents';
import { BrowserRouter as Router } from 'react-router-dom';
import {withRouter} from 'react-router';

function Matches() {  
  return (
      <MatchesContents />
    );
}

export default Matches;

