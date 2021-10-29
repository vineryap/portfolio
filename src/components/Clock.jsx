/** @jsxImportSource solid-js */

import { createSignal, createEffect, createMemo, onCleanup, on } from "solid-js";

function Greet(props) {
  const [greeting, setGreeting] = createSignal("");

  createEffect(
    on(props.hour, function () {
      if (props.hour() >= 5 && props.hour() < 12) {
        setGreeting("Good morning ☀️");
      } else if (props.hour() < 17) {
        setGreeting("Good afternoon 👋");
      } else {
        setGreeting("Good evening 🌒");
      }
    })
  );

  return (
    <div class="absolute w-full h-full transition-all opacity-100 group-hover:opacity-0 font-medium">
      {greeting()}
    </div>
  );
}

function Time(props) {
  const [locale, setLocale] = createSignal("en");

  createEffect(function () {
    setLocale(navigator.language);
  });

  const formatter = new Intl.DateTimeFormat(locale(), {
    hour12: true,
    hour: "numeric",
    minute: "2-digit"
  });

  return (
    <div class="absolute w-full h-full transition-all opacity-0 group-hover:opacity-100 font-medium">
      {formatter.format(props.date())}
    </div>
  );
}

export default function Clock() {
  const [date, setDate] = createSignal(new Date());

  const interval = setInterval(function () {
    setDate(new Date()), 1000;
  });

  onCleanup(function () {
    clearInterval(interval);
  });

  const hour = createMemo(function () {
    date().getHours();
  });

  return (
    <div class="w-40 h-6 group cursor-default">
      <div class="relative w-full items-center text-center group">
        <Greet hour={hour} />
        <Time date={date} />
      </div>
    </div>
  );
}
