import React from 'react';
import logo from './logo.svg';
import './App.css';

//https://stackoverflow.com/a/11935263
function getRandomSubarray(array, size)
{
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

var jsonArray = [
    {
      "quote": "Those who remember Allah (always, and in prayers) standing, sitting, and lying down on their sides, and think deeply about the creation of the heavens and the earth, (saying): 'Our Lord! You have not created (all) this without purpose, glory to You! (Exalted be You above all that they associate with You as partners). Give us salvation from the torment of the Fire.'",
      "original_arabic": "الَّذِينَ يَذْكُرُونَ اللَّهَ قِيَامًا وَقُعُودًا وَعَلَىٰ جُنُوبِهِمْ وَيَتَفَكَّرُونَ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ رَبَّنَا مَا خَلَقْتَ هَٰذَا بَاطِلًا سُبْحَانَكَ فَقِنَا عَذَابَ النَّارِ",
      "source": "Quran 3:191 (Muhsin Khan translation)"
    },
    {
      "quote": "Our Lord! Verily, whom You admit to the Fire, indeed, You have disgraced him, and never will the Zalimun (polytheists and wrong-doers) find any helpers.",
      "original_arabic": "رَبَّنَا إِنَّكَ مَن تُدْخِلِ النَّارَ فَقَدْ أَخْزَيْتَهُ وَمَا لِلظَّالِمِينَ مِنْ أَنصَارٍ",
      "source": "Quran 3:192 (Muhsin Khan translation)"
    },
    {
      "quote": "Our Lord! Verily, we have heard the call of one (Muhammad SAW) calling to Faith: 'Believe in your Lord,' and we have believed. Our Lord! Forgive us our sins and remit from us our evil deeds, and make us die in the state of righteousness along with Al-Abrar (those who are obedient to Allah and follow strictly His Orders).",
      "original_arabic": "رَّبَّنَا إِنَّنَا سَمِعْنَا مُنَادِيًا يُنَادِي لِلْإِيمَانِ أَنْ آمِنُوا بِرَبِّكُمْ فَآمَنَّا رَبَّنَا فَاغْفِرْ لَنَا ذُنُوبَنَا وَكَفِّرْ عَنَّا سَيِّئَاتِنَا وَتَوَفَّنَا مَعَ الْأَبْرَارِ",
      "source": "Quran 3:193 (Muhsin Khan translation)"
    },
    {
      "quote": "Our Lord! Grant us what You promised unto us through Your Messengers and disgrace us not on the Day of Resurrection, for You never break (Your) Promise.",
      "original_arabic": "رَبَّنَا وَآتِنَا مَا وَعَدتَّنَا عَلَىٰ رُسُلِكَ وَلَا تُخْزِنَا يَوْمَ الْقِيَامَةِ إِنَّكَ لَا تُخْلِفُ الْمِيعَادَ",
      "source": "Quran 3:194 (Muhsin Khan translation)"
    },
    {
      "quote": "Who, when disaster strikes them, say, 'Indeed we belong to Allah, and indeed to Him we will return.'",
      "original_arabic": "الَّذِينَ إِذَا أَصَابَتْهُم مُّصِيبَةٌ قَالُوا إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ",
      "source": "Quran 2:156 (Muhsin Khan translation)"
    },
    {
      "quote": "Indeed, I have turned my face towards He who created the heavens and the earth, inclining towards truth, and I am not of those who associate others with Allah.",
      "original_arabic": "إِنِّي وَجَّهْتُ وَجْهِيَ لِلَّذِي فَطَرَ السَّمَاوَاتِ وَالْأَرْضَ حَنِيفًا وَمَا أَنَا مِنَ الْمُشْرِكِينَ",
      "source": "Quran 6:79 (Sahih International translation)"
    }
];

function generateCitation(passage) {
    var licenseInfo, shortened_new_quote, shortened_original_quote, source_link;
    shortened_new_quote = generateQuoteShorterner(passage["quote"]);

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
        finalCitation = finalCitation.concat(`Quote modified from original - original quote is ${shortened_original_quote}.`)
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
  return json["quote"];
}

function Generator(jsonArray)
{
  return getRandomSubarray(jsonArray, 3);
}

//https://www.freecodecamp.org/forum/t/newline-in-react-string-solved/68484/18
const addLineBreaks = string =>
  string.split('\n').map((text, index) => (
    <React.Fragment key={`${text}-${index}`}>
      {text}
      <br />
    </React.Fragment>
  ));

var ArabicText = (props) => <div>{addLineBreaks(props.duaArray.map( x => arabicParagraphFormatter(x) ).join("\n\n"))}</div>

var EnglishTranslation = (props) => <div>{addLineBreaks(props.duaArray.map(x => englishParagraphFormatter(x) ).join("\n\n"))}</div>

function Citations(props)
{
  return (
    <div class="App-citations">{addLineBreaks(props.duaArray.map( x => generateCitation(x) ).join("\n\n"))}</div>
  );
}

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        key: Generator(jsonArray),
        //key: Math.random( ),
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <ArabicText duaArray = {this.state.key } />
          <br />
          <EnglishTranslation duaArray = {this.state.key} />
          <br />
          <Citations duaArray = {this.state.key} />
          <br />
          <button onClick={() => this.setState({ key: Generator(jsonArray) })}>Reload</button>
        </header>
      </div>
    );
  }
}

export default App;
