all: build run
build:
	docker build -t js_calendar_from_ics .

run:
	docker kill js_calendar_from_ics || echo ""
	docker rm js_calendar_from_ics || echo ""
	docker run --name js_calendar_from_ics -d --restart always -v /tmp/roarcalendars:/var/www/html/calendars -p 8882:80 -p 8443:443 js_calendar_from_ics

