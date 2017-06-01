const React = require('react');
// const Pronunciation = require('./Pronunciation').default;
const Definition = require('./Definition').default;
const styles = require('./assets/css/styles.css');

export default class Preview extends React.Component {
  render() {
    const {
      id,
      word,
      pronunciations,
      definition,
      example
    } = this.props;

    return (
      <div className={styles.preview} id={id}>
        <h1 className={styles.header}>{word} </h1>
        {/*pronunciations &&
          <Pronunciation pronunciations={pronunciations} lang={'en_US'} />
        */}
        <Definition definition={definition} example={example} />
      </div>);
  }
};