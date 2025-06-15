# Getting started

## Install everything
* `yarn install`
* Make sure you have Node 6.x installed (yeah, we definitely need to bump this...)

## Issues getting started?
For Apple users with an Apple Silicon chip:
```
arch -x86_64 zsh  # or bash/fish/etc.
nvm install 6
```

## Develop
* `yarn run develop`

## Deploy
* `yarn run deploy`
This **should** also automatically set the github-pages CNAME entry to "fugi-fix.de".
If you run into an issue with this very entry, check the `deploy` script/action or the CNAME entry on Github.
