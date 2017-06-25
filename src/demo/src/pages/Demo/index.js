import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Data
import dataFile from './data.json';
import truthFile from './truth.json';

// Material UI
import {
  createStyleSheet,
  withStyles,
} from 'material-ui/styles';
import {
  Paper,
  Typography,
} from 'material-ui';
import { CircularProgress } from 'material-ui/Progress';

// Charts
import HeikinAshi from '../../components/HeikinAshi';
import GroupedBars from '../../components/GroupedBars';

// Type checking & defaults
const propTypes = {
  classes: PropTypes.object.isRequired,
};
const defaultProps = {};
const contextTypes = {};

// Styles
const styleSheet = createStyleSheet('Demo', {
  root: {},
  content: {
    padding: '24px 16px',
    marginBottom: 16,
    flex: 1,
  },
  spinner: {
    display: 'flex',
    justifyContent: 'center',
  },
});

class Demo extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      truthData: [],
    };
  }

  componentDidMount() {
    const parsedData = JSON.parse(JSON.stringify(dataFile));
    const parsedTruthData = JSON.parse(JSON.stringify(truthFile));

    const data = parsedData.map(item => ({
      ...item,
      date: new Date(item.time),
      volume: item.volumeto,
    }));

    console.log({ data });

    this.setState({
      data,
    });

    const truthData = parsedTruthData.map(item => ({
      ...item,
      date: new Date(item.date),
      // volume: item.volumeto,
    }));

    console.log({ truthData });

    this.setState({
      truthData,
    });
  }

  render() {
    const {
      data,
      truthData,
    } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography type="display3" gutterBottom>
          Demo
        </Typography>
        { data.length > 0 ? (
          <Paper className={classes.content}>
            <HeikinAshi data={data} />
          </Paper>
        ) : (
          <div className={classes.spinner}>
            <CircularProgress />
          </div>
        )}
        { data.length > 0 ? (
          <Paper className={classes.content}>
            <GroupedBars data={truthData} />
          </Paper>
        ) : (
          <div className={classes.spinner}>
            <CircularProgress />
          </div>
        )}
      </div>
    );
  }
}

Demo.propTypes = propTypes;
Demo.defaultProps = defaultProps;
Demo.contextTypes = contextTypes;

export default withStyles(styleSheet)(Demo);
