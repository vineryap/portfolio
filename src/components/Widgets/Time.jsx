import { createSignal, createEffect } from "solid-js";

const Time = props => {
  let theDate;
  const [locale, setLocale] = createSignal("en");

  if (!props.hour) {
    const [date, setDate] = createSignal(new Date());

    const interval = setInterval(() => setDate(new Date()), 1000);

    onCleanup(() => clearInterval(interval));

    theDate = date;
  } else {
    theDate = props.date;
  }

  createEffect(() => setLocale(navigator.language));

  const formatter = new Intl.DateTimeFormat(locale(), {
    hour12: true,
    hour: "numeric",
    minute: "2-digit"
  });

  return (
    <div class="absolute w-full h-full backface-hidden transform rotate-x-180">
      {formatter.format(theDate())}
    </div>
  );
};

export default Time;
