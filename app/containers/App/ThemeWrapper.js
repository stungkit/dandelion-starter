import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Loading from 'react-loading-bar';
import { bindActionCreators } from 'redux';
import {
  withTheme, withStyles,
  createMuiTheme, MuiThemeProvider
} from '@material-ui/core/styles';
import 'dan-styles/vendors/react-loading-bar/index.css';
import {
  changeThemeAction,
  changeModeAction,
  changeGradientAction,
  changeDecoAction,
  changeBgPositionAction,
  changeLayoutAction,
} from 'dan-actions/UiActions';
import applicationTheme from '../../styles/theme/applicationTheme';

const styles = {
  root: {
    width: '100%',
    minHeight: '100%',
    marginTop: 0,
    zIndex: 1,
  },
};

export const AppContext = React.createContext();

class ThemeWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageLoaded: true,
      theme: createMuiTheme(applicationTheme(props.color, props.mode)),
    };
  }

  componentWillMount = () => {
    this.onProgressShow();
  }

  componentDidMount = () => {
    this.playProgress();
  }

  componentWillUnmount() {
    this.onProgressShow();
  }

  onProgressShow = () => {
    this.setState({ pageLoaded: true });
  }

  onProgressHide = () => {
    this.setState({ pageLoaded: false });
  }

  playProgress = () => {
    this.onProgressShow();
    setTimeout(() => {
      this.onProgressHide();
    }, 500);
  }

  handleChangeTheme = event => {
    this.setState({ theme: createMuiTheme(applicationTheme(event.target.value, this.props.mode)) });
    this.props.changeTheme(event.target.value);
  };

  handleChangeMode = mode => {
    this.setState({ theme: createMuiTheme(applicationTheme(this.props.color, mode)) });
    this.props.changeMode(mode);
  };

  handleChangeGradient = value => {
    this.props.changeGradient(value);
  }

  handleChangeDecoration = value => {
    this.props.changeDecoration(value);
  }

  handleChangeBgPosition = value => {
    this.props.changeBgPosition(value);
  }

  handleChangeLayout = value => {
    this.props.changeLayout(value);
  }

  render() {
    const { classes, children } = this.props;
    const { pageLoaded, theme } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <Loading
            show={pageLoaded}
            color="rgba(255,255,255,.9)"
            showSpinner={false}
          />
          <AppContext.Provider value={this.handleChangeMode}>
            {children}
          </AppContext.Provider>
        </div>
      </MuiThemeProvider>
    );
  }
}

ThemeWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  color: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  changeTheme: PropTypes.func.isRequired,
  changeMode: PropTypes.func.isRequired,
  changeGradient: PropTypes.func.isRequired,
  changeDecoration: PropTypes.func.isRequired,
  changeBgPosition: PropTypes.func.isRequired,
  changeLayout: PropTypes.func.isRequired,
};

const reducer = 'ui';
const mapStateToProps = state => ({
  force: state, // force state from reducer
  color: state.getIn([reducer, 'theme']),
  palette: state.getIn([reducer, 'palette']),
  mode: state.getIn([reducer, 'type']),
  gradient: state.getIn([reducer, 'gradient']),
  decoration: state.getIn([reducer, 'decoration']),
  bgPosition: state.getIn([reducer, 'bgPosition']),
  layout: state.getIn([reducer, 'layout']),
});

const dispatchToProps = dispatch => ({
  changeTheme: bindActionCreators(changeThemeAction, dispatch),
  changeMode: bindActionCreators(changeModeAction, dispatch),
  changeGradient: bindActionCreators(changeGradientAction, dispatch),
  changeDecoration: bindActionCreators(changeDecoAction, dispatch),
  changeBgPosition: bindActionCreators(changeBgPositionAction, dispatch),
  changeLayout: bindActionCreators(changeLayoutAction, dispatch),
});

const ThemeWrapperMapped = connect(
  mapStateToProps,
  dispatchToProps
)(ThemeWrapper);

export default withTheme()(withStyles(styles)(ThemeWrapperMapped));

