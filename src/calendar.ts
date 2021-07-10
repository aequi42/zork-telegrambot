import {
  async as ical,
  CalendarComponent,
  CalendarResponse,
  VEvent,
} from "node-ical";
import { Context } from "telegraf";
const calendarUrl = process.env.BOT_CALENDAR_URL;

export async function getLatestEntries(ctx: Context) {
  if (!calendarUrl) {
    ctx.reply("Ihr Idioten, woher soll ich wissen, was für Termine anstehen?");
    return;
  }
  const result = await ical.fromURL(calendarUrl);

  var eventComponents = getCalendarComponents(result).filter(isEvent);
  var events = getEvents(eventComponents);
  var upcoming = events.filter((e) => e.date > new Date());

  console.log("ALL upcoming");
  upcoming.forEach((ev) =>
    console.log(`${ev.name} - ${ev.date.toLocaleDateString("de")}`)
  );
  console.log("END");
  ctx.reply(`🗓️ Wir sehen uns bei folgenden Schlachten, ihr Würmer!
${upcoming.map(
  (u) =>
    `${u.name} - ${u.date.toLocaleString("de-DE", {
      timeZone: "UTC",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })}`
).join(`
`)}
  `);
}

function getCalendarComponents(response: CalendarResponse) {
  var components = [];
  for (let k in response)
    if (response.hasOwnProperty(k)) components.push(response[k]);
  return components;
}

function isEvent(ev: CalendarComponent): ev is VEvent {
  return ev.type === "VEVENT";
}

type Event = {
  name: string;
  date: Date;
};
function getEvents(events: VEvent[]) {
  const now = new Date();
  const inAWeek = new Date();
  inAWeek.setDate(inAWeek.getDate() + 7);

  var result = new Array<Event>();
  events.forEach((event) => {
    var title = event.summary;
    var startDate = event.start;

    // https://github.com/peterbraden/ical.js/blob/master/example_rrule.js
    if (typeof event.rrule === "undefined") {
      result.push({
        name: title,
        date: startDate,
      });
    } else if (typeof event.rrule !== "undefined") {
      var dates = event.rrule.between(now, inAWeek, true, (date, i) => true);
      for (var i in dates) {
        var date = dates[i];
        var curEvent = event;
        var showRecurrence = true;
        startDate = date as any;
        var dateLookupKey = date.toISOString().substring(0, 10);

        if (
          (curEvent as any).recurrences != undefined &&
          (curEvent as any).recurrences[dateLookupKey] != undefined
        ) {
          curEvent = (curEvent as any).recurrences[dateLookupKey];
          startDate = curEvent.start;
        } else if (
          curEvent.exdate != undefined &&
          curEvent.exdate[dateLookupKey] != undefined
        ) {
          showRecurrence = false;
        }

        var recurrenceTitle = curEvent.summary;

        if (showRecurrence === true) {
          result.push({
            name: recurrenceTitle,
            date: startDate,
          });
        }
      }
    }
  });
  return result;
}
