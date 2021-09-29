import { useState, useEffect } from "react";

import { listenForOSC } from "./osc";

interface Tempo {
  time: number;
  cycle: number;
  cps: number;
  paused: boolean;
}

export function Footer() {
  const [tempo, updateTempo] = useState<Tempo>();

  useEffect(() => {
    listenForOSC("/cps/cycle", ({ time, args: [cycle, cps, pausedNum] }) => {
      if (typeof cycle === "number" && typeof cps === "number") {
        updateTempo({ time, cycle, cps, paused: pausedNum === 1 });
      }
    });
  }, []);

  const [tempoLabel, updateTempoLabel] = useState<string>("...");

  useEffect(() => {
    let req = requestAnimationFrame(tick);

    function tick(current: number) {
      if (tempo) {
        let { time, cycle: startCycle, cps, paused } = tempo;

        let cycle = startCycle + (cps * (current - time)) / 1000;
        let dotSeq = "⠈⠘⠸⢸⣸⣼⣾⣿⣷⣧⣇⡇⠇⠃⠁⠀";
        let dots = dotSeq[Math.floor((cycle % 2) * 8)];

        updateTempoLabel(`${dots} ${Math.floor(cycle)} (${cps} cps)`);
      }

      req = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(req);
    };
  }, [tempo]);

  return <footer>{tempoLabel}</footer>;
}
