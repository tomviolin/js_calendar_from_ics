// Edit your ics sources here
ics_sources = [
    {url:'https://sogo.nomagic.uk/SOGo/dav/public/contact/Calendar/3D08-5CC47000-1-5EA59B00.ics', event_properties:{color: 'SeaGreen'}},
    {url:'https://opentechcalendar.co.uk/api1/curatedlist/14/events.ical', event_properties: {color: 'DodgerBlue'}}
]



////////////////////////////////////////////////////////////////////////////
//
// Here be dragons!
//
////////////////////////////////////////////////////////////////////////////

function data_req (url, callback) {
    req = new XMLHttpRequest()
    req.addEventListener('load', callback)
    req.open('GET', url)
    req.send()
}

function add_recur_events() {
    if (sources_to_load_cnt < 1) {
        $('#calendar').fullCalendar('addEventSource', expand_recur_events)
    } else {
        setTimeout(add_recur_events, 30)
    }
}

function load_ics(ics){
    data_req(ics.url, function(){
        $('#calendar').fullCalendar('addEventSource', fc_events(this.response, ics.event_properties))
        sources_to_load_cnt -= 1
    })
}

$(document).ready(function() {

    // display events
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay,listWeek,listMonth'
        },
        defaultView: 'month',
        firstDay: '1',
        locale: 'en',
        lang: 'en',

        // customize the button names,
        // otherwise they'd all just say "list"
        views: {
          listWeek: { buttonText: 'list week' },
          listMonth: { buttonText: 'list month' }
        },
	navLinks: true,
	editable: false,
        eventLimit: true, // allow "more" link when too many events
        eventRender: function(event, element, view) {
	  if(view.name == "listMonth" || view.name == "listWeek") {
            element.find('.fc-list-item-title').append('<div style="margin-top:5px;"></div><span style="font-size: 0.9em">'+(event.description || 'no description')+'</span>'+((event.loc) ? ('<span style="margin-top:5px;display: block"><b>Venue: </b>'+event.loc+'</span>') : ' ')+'</div>');
	  } else {
            element.qtip({
                content: {
                  text: '<small>'+((event.start.format("d") != event.end.format("d")) ? (event.start.format("MMM Do")
                        +(((event.end.subtract(1,"seconds")).format("d") == event.start.format("d")) ? ' ' : ' - '
                        +(event.end.subtract(1,"seconds")).format("MMM Do"))) : (event.start.format("HH:mm")
                        +' - '+event.end.format("HH:mm")))+'</small><br/>'+
		         '<b>'+event.title+'</b>'+
			 ((event.description) ? ('<br/>'+event.description) : ' ')+
			 ((event.loc) ? ('<br/><b>Venue: </b>'+event.loc) : ' ')
                },
                style: {
                    classes: 'qtip-bootstrap qtip-rounded qtip-shadown qtip-light',
                },
                position: {
                    my: 'top left',
                    at: 'bottom center',
                }
            });
          }
        }
    })
    sources_to_load_cnt = ics_sources.length
    for (ics of ics_sources) {
        load_ics(ics)
    }
    add_recur_events()
})

