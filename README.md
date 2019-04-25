# What
Convert iCalendar ics to [FullCalendar][0] json using [ical.js][1].

## Usage
Edit `index.html` and `js/custom_display.js` to provide your ics feed(s) and colors.

Ideally `index.html` should feed on the JS file, but my JS skills are pretty much zero so you need to manually configure each of them similarly.

# Why
Because it's so much better to sync your website calendar with ics feed(s) that you can edit from wherever than having to handle that within an admin webpage.

# How
This all came from [https://leonaard.github.io/icalendar2fullcalendar](https://leonaard.github.io/icalendar2fullcalendar), which provides us an out-of-the-box working solution to view calendar(s) from ics URL feeds using fullcalendar.

We 'built' (horribly hacky, but works) on that to obtain a calendar that also shows descriptions for events. Most of the additional code is in `js/custom_display.js` and this is also one of the 2 files you need to edit to adjust this to your needs.

## Dependencies
A whole lot of JS stuff (in ./js/). Since newer versions are very likely to break code and I'm a JS noob, 
librairies used for this project are all inside the repo. Feel free to update the code for more
recent versions and queue in a nice Merge Request afterwards.


# Contribute
PRs welcome, especially to simplify handling initial setup.

[0]: http://fullcalendar.io/
[1]: https://mozilla-comm.github.io/ical.js/
