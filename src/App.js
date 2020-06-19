import React from 'react';
import logo from './logo.svg';
import './App.css';
import jsonArray from './duas/duas.json';

//https://stackoverflow.com/a/11935263
function getRandomSubarray(array, size)
{
  console.log("HELLO WORLD!");
  console.log(array);
  var shuffled = array.slice(0);
  var i = array.length;
  var min = i - size;
  var temp;
  var index;

  //conduct partial shuffle of array
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }

  return shuffled.slice(min);
}

function citationFormatter(passage) {
    var licenseInfo, shortened_new_quote, shortened_original_quote, source_link;
    shortened_new_quote = generateQuoteShorterner(passage["english_translation"]);

    source_link = passage["source"];

    var finalCitation = `- "${shortened_new_quote}" is from ${source_link}`

    if ( "license" in passage )
    {
        if ( "license_url" in passage )
        {
          licenseInfo = generateLink(passage["license"], passage["license_url"]);
        }
        else
        {
          licenseInfo = `${passage["license_url"]}`;
        }
        finalCitation = finalCitation.concat(`, ${licenseInfo}.`);
    }
    else
    {
        finalCitation = finalCitation.concat(".")
    }

    if ( "original_quote" in passage )
    {
        shortened_original_quote = generateQuoteShorterner(passage["original_quote"]);
        finalCitation = finalCitation.concat(` Quote modified from original - original quote is ${shortened_original_quote}.`)
    }

    return finalCitation;
}

function generateQuoteShorterner(quote) {
    var text_array = quote.split(" ");
    var first_phrase = text_array.slice(0, 3).join(" ");
    var second_phrase = text_array.slice((- 3)).join(" ");
    return `${first_phrase} ... ${second_phrase}`;
}

function generateLink(license, license_url) {
    return `[${license}](${license_url})`;
}

function arabicParagraphFormatter(json)
{
  return json["original_arabic"];
}

function englishParagraphFormatter(json)
{
  return json["english_translation"];
}

function urduParagraphFormatter(json)
{
  return json["urdu_translation"];
}


function Generator(jsonArray)
{
  return getRandomSubarray(jsonArray, 3);
}

//https://www.freecodecamp.org/forum/t/newline-in-react-string-solved/68484/18
const addLineBreaks = content =>
  content.split('\n').map((text, index) => (
    <React.Fragment key={`${text}-${index}`}>
      {text}
      <br />
    </React.Fragment>
  ));

var formatContent = (duaArray, mappableFunction) => duaArray.map( x => mappableFunction(x) ).join("\n\n");

function formatContentArray(duaArray, arrayOfMappableFunctions)
{
  var finalArray = [];
  arrayOfMappableFunctions.forEach( mappableFunction =>
    finalArray.push(formatContent(duaArray, mappableFunction))
  );

  return finalArray.join("\n\n");
}

var Content = (props) => <div className={props.className}>{addLineBreaks(formatContent(props.duaArray, props.mappableFunction))}</div>

var ArabicText = (props) => <Content duaArray={props.duaArray} mappableFunction={arabicParagraphFormatter} className={"App-content"} />

var UrduTranslation = (props) => <Content duaArray={props.duaArray} mappableFunction={urduParagraphFormatter} className={"App-content"} />

var EnglishTranslation = (props) => <Content duaArray={props.duaArray} mappableFunction={englishParagraphFormatter} className={"App-content"} />

var Citations = (props) => <Content duaArray={props.duaArray} mappableFunction={citationFormatter} className={"App-citations App-content"} />

var sharingText = (duaArray, link) => `${formatContentArray(duaArray, [arabicParagraphFormatter,  englishParagraphFormatter, citationFormatter])}\n\nIf you like this dua, please share it to others! You can also visit ${link} to generate duas of your own!`

//https://css-tricks.com/how-to-use-the-web-share-api/
class SharingWidget extends React.Component
{
  render() {
    const mystyle = {
      display: ( navigator.share ? "inline" : "none")
    }
    return(
        <button className="sharing-button"
                type="button"
                title={this.props.displayText}
                style={mystyle}
                onClick={() =>
                  navigator.share({
                    text: sharingText(this.props.duaArray, this.props.link),
                  })
                }>
          <span>{this.props.displayText}</span>
        </button>
    )
  }
}

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        key: Generator(jsonArray)
    };
  }

  render() {
    var myStyle = {
      "margin-bottom": "3%"
    };

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <ArabicText duaArray = {this.state.key } style= {myStyle} />
          <UrduTranslation duaArray={this.state.key} />
          <EnglishTranslation duaArray = {this.state.key} />
          <br />
          <Citations duaArray = {this.state.key} />
          <br />
          <button onClick={() => this.setState({ key: Generator(jsonArray) })}>Reload</button>
          <SharingWidget link={window.location.href} duaArray={this.state.key}  displayText={"Share This Dua"} />
        </header>
      </div>
    );
  }
}

export default App;
