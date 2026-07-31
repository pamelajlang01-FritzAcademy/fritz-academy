# Fritz Academy Translator Companion

Standalone classroom translator that does not change lesson progress or game files.

## Features

- English to Simplified Chinese
- Simplified Chinese to English
- Spoken English and Mandarin playback using browser voices
- Copy, clear, language swap, quick classroom phrases
- Recent translation history stored only in the current browser
- Mobile and desktop classroom layout

## Run locally

From the `fritz-academy` repository folder:

```bash
python3 -m http.server 5500
```

Open:

```text
http://localhost:5500/translator/
```

## Public path

When the current repository deploys to Cloudflare Pages, the translator is available at:

```text
https://fritz-academy.pages.dev/translator/
```

## Translation service

Version 1 uses the MyMemory public translation endpoint. It is limited to 500 characters per request and requires an internet connection. No API key is stored in the browser.

For production scale, replace the public endpoint with a protected Cloudflare Worker using a paid or dedicated translation provider.
