// Edit your ics sources here
ics_sources = [
    {url:'https://sogo.alolise.org/SOGo/dav/public/jerome.avond/Calendar/2BBA-5AB19A00-1-1147EF20.ics', event_properties:{color: 'SeaGreen'}},
    {url:'https://sogo.alolise.org/SOGo/dav/public/contact.la-bricoleuse/Calendar/5A19-5CC08400-1-65AE8400.ics', event_properties: {color: 'DodgerBlue'}}
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
            element.find('.fc-list-item-title').append('<div style="margin-top: 0.5em;"></div><span style="font-size: 0.9em">'+(event.description || 'no description')+'</span></div>');
	  } else {
            element.qtip({
                content: {
                  text: '<b>' + event.title + '</b><br/>' + (event.description || 'no description')
                },
                style: {
                    classes: 'qtip-bootstrap qtip-rounded qtip-shadown qtip-light',
                   // color: '#FFFFFF'
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

