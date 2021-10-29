import { createSignal, createEffect, on } from "solid-js";

const Greeting = props => {
  let hour;
  const [greeting, setGreeting] = createSignal("");

  if (!props.hour) {
    const [date, setDate] = createSignal(new Date());

    const interval = setInterval(() => setDate(new Date()), 1000);

    onCleanup(() => clearInterval(interval));

    hour = createMemo(() => date().getHours());
  } else {
    hour = props.hour;
  }

  createEffect(
    on(hour, () => {
      if (hour() >= 5 && hour() < 12) {
        setGreeting("Good morning ☀️");
      } else if (hour() < 17) {
        setGreeting("Good afternoon 👋");
      } else {
        setGreeting("Good evening 🌒");
      }
    })
  );

  return <div class="absolute w-full h-full backface-hidden">{greeting()}</div>;
};

export default Greeting;
