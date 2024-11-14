---
title: Learn (a little of) any language
subtitle: Generate Anki decks with pronunciation audio in any language.
date: 2024-11-12
---

When first traveling to Thailand two years ago, I had the idea of learning a couple of very basic words.
Mostly for fun, but I thought it could also come in useful.
For vocabulary and similar small bits of information, I default to using Anki.

[Anki](https://apps.ankiweb.net/) is a software for flashcards with a spaced repetition algorithm.
Decks of flashcards can easily be created for any topic using text, audio, and images.
It's also available for Android and IOS, which makes learning while in the airplane a breeze.
And even better, flashcard decks can be shared on Anki-web, where I had found an appropriate flashcard deck for basic Thai words.

<img src="https://vg07.met.vgwort.de/na/e62bfb7449c04b7baf0cfecb3ad0e6af" width="1" height="1" alt="">

Two years later, right before my vacation in Vietnam, I tried the same for Vietnamese.
However, I did not find an appropriate shared deck for Vietnamese on Anki-web.
So, instead of looking up a couple words and creating my own deck, I just did not study any of it.
But after 1.5 weeks in Vietnam of not having embarrassed myself by wildly mispronouncing a word and gotten a friendly smile in return, I decided to change that.

# To solution

I started to compile a list of words in English, which I thought to be the most important words and phrases for a traveler.
I also tried my best to sort them in a manner of decreasing urgency, such that learning only a couple of them is also very useful.
To get a feel for the list, the first 16 words are shown below.
For a better overview, they are also grouped:

```
hello
bye
thanks
please
sorry
Here you go.

yes
no
Yes, please.
No, thank you.
ok

good
bad
not good
very good

help
```

The next step were the translations.
For those, I settled on using the Python library `googletrans`, which queries Google Translate.
The script loads the words from the mentioned list, and queries the Google Translate API to obtain the translations with some additional information.
For some languages, e.g., Japanese and Thai, some additional information on pronunciation is provided.
Although no audio, these are still useful for people, who know only the Latin alphabet.
Thereafter, English words, translated words, and the additional information, if available, are gathered and saved to a file.
The script is shown below.

```python
from googletrans import Translator

# set the language code of the desired language
# list of all available languages here:
# https://cloud.google.com/translate/docs/languages
language = "vi"

# load words from file
lines = []
with open("important_words.md", "r") as f:
    for line in f.readlines():
        line = line.strip()
        if len(line) > 0:
            lines.append(line)

# translate
translator = Translator()
translated = translator.translate(lines, src="en", dest=language)

# extract translations, pronunciation information if available, and put them together
translated_text = []
for t in translated:
    if t.pronunciation is None or t.pronunciation == t.origin:
        tt = t.text
    else:
        tt = t.text + " [ " + t.pronunciation + " ]"
    translated_text.append([t.origin, tt])

# create a string
str = "\n".join([" -> ".join(i) for i in translated_text])

# save the string to a file
with open(language + ".md", "w") as f:
    f.write(str)
```

Next, I needed some audio to properly (fail to) learn the pronunciation.
For about two hours, I tried to find native audio like those provided by many online dictionaries, but did not manage to find good sources for it.
Thus, I turned to text-to-speech.
It could not be any worse than trying to pronounce *Cảm ơn* (Vietnamese for *thank you*) without any clue.

It turned out that Google also has text-to-speech, and there is a Python package named `gtts`, which uses it.
So I went on to write another script, which generates audio for the translations.
The script is shown below.

```python
import os
from gtts import gTTS

# set the language code of the desired language
# list of all available languages here:
# https://cloud.google.com/translate/docs/languages
language = "vi"

path = language + "_audio"

# Sample list of lists with front and back for each card
lines = []
with open(language + ".md", "r") as f:
    for line in f.readlines():
        lines.append(line.strip().split(" -> "))

assert all(len(l) == 2 for l in lines), "number of fields must be 2 for each word"

# if folder does not exists, create it
if not os.path.exists(path):
    os.makedirs(path)

# if audio file does not exists, generate it
for line in lines:
    file_path = os.path.join(path, line[0] + '.mp3')
    if not os.path.exists(file_path):
        tt = line[1].split(" [")[0]
        tts = gTTS(tt, lang=language)
        tts.save(file_path)
```

Text-to-speech is definitely not optimal.
But judging by 4 ... 5 words I manually (audioally?) compared, it's surprisingly good and way better than my best guess without it.

Lastly, all needed was to put all together to create an Anki deck.
The Python library `genanki` allows creating Anki decks programmatically.
As the `README.md` was very long, I first tried to give my colleague ChatGPT a chance to make a draft of the script.
Unsurprisingly, it did not work right away.
Unfortunately, and again, unsurprisingly, pointing out the bugs to ChatGPT brought in some new bugs without fixing the old ones.
Still, it helped, as I did not need to look up all the package-specific syntax myself.
So I read (some of) the `README.md`, fixed the bugs, and viola.
Below is the script which takes all parts, the words, the translations, and the audio, and creates and saves the Anki deck.

```python
import random
import os
import genanki

# set the language code of the desired language
# list of all available languages here:
# https://cloud.google.com/translate/docs/languages
language = "vi"

path = language + "_audio"

# Sample list of lists with front and back for each card
lines = []
with open(language + ".md", "r") as f:
    for line in f.readlines():
        lines.append(line.strip().split(" -> "))

assert all(len(l) == 2 for l in lines), "number of fields must be 2 for each word"

# ==================================================================================================
# generate deck with audio
# ==================================================================================================
# unique model and deck ID generation (ensure IDs are consistent across script runs)
model_id = random.randrange(1 << 30, 1 << 31)
deck_id  = random.randrange(1 << 30, 1 << 31)

# create the model
model = genanki.Model(
    model_id,
    'Language Learning with Audio',
    fields=[
        {'name': 'English'},
        {'name': 'Foreign'},
        {'name': 'Audio'},
    ],
    templates=[
        {
            'name': 'English -> Foreign',
            'qfmt': '{{English}}',
            'afmt': '{{FrontSide}}<hr id="answer">{{Foreign}}<br>{{Audio}}',
        },
        {
            'name': 'Foreign -> English',
            'qfmt': '{{Foreign}}<br>{{Audio}}',
            'afmt': '{{FrontSide}}<hr id="answer">{{English}}',
        },
    ],
    css="""
    .card {
      font-family: arial;
      font-size: 20px;
      text-align: center;
      color: black;
      background-color: white;
    }
    """
)

# create the deck
deck = genanki.Deck(deck_id, language)

for line in lines:
    line[1] = line[1].replace(" [", "<br>[")

# add cards to the deck
for english, foreign in lines:
    note = genanki.Note(
        model=model,
        fields=[english, foreign, f"[sound:{english}.mp3]"]
    )
    deck.add_note(note)

# create a package
package = genanki.Package(deck)

# add media files (audio files) to the package
media_files = [os.path.join(path, english) + ".mp3" for english, _ in lines]
package.media_files = media_files

# save the deck
package.write_to_file(language + '.apkg')
```

And the neatest thing of all: These scripts can do this for any language that is supported by Google!
So far, I’ve generated the decks for Japanese and Thai as well.
Thus, I am already set up for future trips to Japan, Korea, and where ever else I may still go.

One caveat, however, is that literal translations may not always be perfect, especially for single words without any context.
To give an example, I don't know whether the Google translation for *bad* in Vietnamese can be used for food, or whether this particular translation is only used in terms of *evil*.
But in most cases it seems fine.
Also, after generating the translations, if one wants to invest a little more time, the inappropriate translations can be manually adapted.
As long as the same syntax is used, the remaining scripts for pronunciation audio and Anki deck generation can still be used.
If you are interested to try, the list of words and the scripts are on [my github](https://github.com/viktmar/anki).

I guess I will not learn the 270+ words of Vietnamese, which are currently on the list.
But I’ll try 20 ... 30 words.
I am already full-steam embarrassing myself a little, getting friendly smiles, and having nice interactions :)

