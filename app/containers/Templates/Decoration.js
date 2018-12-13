import React from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import decorationLight from 'dan-images/decoration_light.svg';
import decorationDark from 'dan-images/decoration_dark.svg';
import petalLight from 'dan-images/petal_bg.svg';
import styles from './appStyles-jss';

class Decoration extends React.Component {
  render() {
    const {
      classes,
      mode,
      gradient,
      decoration,
      bgPosition,
      horizontalMenu
    } = this.props;
    const getBgPosition = position => {
      if (position === 'header') {
        return classes.headerBg;
      } else if (position === 'half') {
        return classes.halfBg;
      }
      return classes.fullBg;
    };
    const renderDecor = (type, position) => {
      const mergeDeco = type + '-' + position;
      if (mergeDeco === 'dark-half') {
        return (
          <img src={decorationDark} alt="decoration" className={classes.decorationWave} />
        );
      } else if (mergeDeco === 'dark-full') {
        return (
          <img src={petalLight} alt="decoration" className={classes.decorationPetal} />
        );
      } else if (mergeDeco === 'light-half') {
        return (
          <img src={decorationLight} alt="decoration" className={classes.decorationWave} />
        );
      } else if (mergeDeco === 'light-full') {
        return (
          <img src={petalLight} alt="decoration" className={classes.decorationPetal} />
        );
      }
      return false;
    };
    return (
      <div
        className={classNames(
          classes.bgbar,
          horizontalMenu && classes.highTop,
          gradient ? classes.gradientBg : classes.solidBg,
          getBgPosition(bgPosition),
        )}
      >
        { decoration && renderDecor(mode, bgPosition) }
      </div>
    );
  }
}

Decoration.propTypes = {
  classes: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired,
  gradient: PropTypes.bool.isRequired,
  decoration: PropTypes.bool.isRequired,
  bgPosition: PropTypes.string.isRequired,
  horizontalMenu: PropTypes.bool.isRequired,
};

export default (withStyles(styles)(Decoration));
