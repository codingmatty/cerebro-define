const React = require('react');
const styles = require('./assets/css/styles.css');

export default class Definition extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      definition,
      example
    } = this.props;

    return (
      <div>
        <p className={styles.definition}>
          {definition}
        </p>

        {example &&
          <p className={styles.examples}>e.g. '{example}' </p>
        }
      </div>);
  }
};