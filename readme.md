<div align="center">

<image src="./readmeHeader.png" />

[![Build Status](https://travis-ci.com/sarthakpranesh/Covid19.svg?branch=master)](https://travis-ci.com/sarthakpranesh/Covid19)
[![GitHub top language](https://img.shields.io/github/languages/top/sarthakpranesh/Covid19)](https://github.com/sarthakpranesh/Covid19)
[![GitHub issues](https://img.shields.io/github/issues/sarthakpranesh/Covid19)](https://github.com/sarthakpranesh/Covid19/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/sarthakpranesh/Covid19)](https://github.com/sarthakpranesh/Covid19/pulls)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/sarthakpranesh/Covid19)](https://github.com/sarthakpranesh/Covid19/tags)
[![GitHub All Releases](https://img.shields.io/github/downloads/sarthakpranesh/Covid19/total)](https://github.com/sarthakpranesh/Covid19/releases)
[![GitHub](https://img.shields.io/github/license/sarthakpranesh/Covid19)](https://github.com/sarthakpranesh/Covid19/blob/master/LICENSE)

<br />

## RNE(Android + iOS + [Web](https://covid19rn.vercel.app/) + Desktop)

</div>

<br />

## Introduction
Covid19 is a React-Native project developed in support of people suffering and affected due to Covid-19 {Corona} virus all around the world. The app takes a very simple and light weight design keeping in mind proper responsiveness throughout different platforms like android, iOS and web. The app lets the user track the growth of active cases in their country and provides statistics from all around the world.


This project uses [react-native-everywhere](https://github.com/sarthakpranesh/react-native-everywhere) template from version `v4.0.0`. This allows the app to be available for Android, iOS, Web and Desktop. Installable binaries for each platform is present in the latest release of the app.


<br />

## Designs
Though the current implementation has moved away from the actual designs (keeping in mind web support and ease of use) but our designer worked really hard for coming up with a simple and innovative initial designs, credits to - [Ankit Mishra](https://github.com/alexmishra)

| Title | Link |
| --- | --- |
| Project | https://www.figma.com/file/g9ChMLNWBmOwaKFCAv5e7C/Covid-19  |
| Prototype | https://www.figma.com/proto/g9ChMLNWBmOwaKFCAv5e7C/Covid-19?node-id=2%3A48&viewport=1246%2C-2727%2C0.8731774091720581&scaling=scale-down |

<br/>

## APIs used
1. [corona.lmao.ninja](https://corona.lmao.ninja/)

<br/>

## For Developers
To start the project follow the below common steps:
1. `git clone https://github.com/sarthakpranesh/Covid19.git`
2. `cd Covid19`
3. `yarn install`
4. `yarn start` - leave metro bundler running in another terminal

For Android:
* `yarn android` - this will start your android app

For IOS:
1. `cd ios`
2. `pod install`
3. `yarn ios` - this will start your ios app

For Web: you can close metro bundler not required for web builds
1. `yarn web` - the project will build and the site will open automatically

For Desktop:
1. `yarn web`
2. `yarn desktop`

<br/>

## Contributors
* [Ankit Mishra](https://github.com/alexmishra) (Designer)
* [Aryan Shridhar](https://github.com/aryanshridhar)
* [Karl Horky](https://github.com/karlhorky)

Looking to be a part of the team, checkout our contribution guideline [HERE](https://github.com/sarthakpranesh/Covid19-ReactNative/blob/contribution/contributing.md) and get started