import { useKeyboardControls } from "@react-three/drei";
import useGame from "./stores/useGame";
import { addEffect } from "@react-three/fiber";
import { useRef, useEffect } from "react";

const UI = () => {
  const time = useRef(0);
  const restart = useGame((state) => state.restart);
  const phase = useGame((state) => state.phase);

  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const jump = useKeyboardControls((state) => state.jump);

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState();
      // console.log(state.phase);
      let elapsedtime = 0;
      if (state.phase === "playing") {
        elapsedtime = Date.now() - state.startTime;
      } else if (state.phase === "ended") {
        elapsedtime = state.endTime - state.startTime;
      }
      elapsedtime = elapsedtime / 1000;
      elapsedtime = elapsedtime.toFixed(2);

      if (time.current) {
        time.current.textContent = elapsedtime;
      }
    });
    return () => {
      unsubscribeEffect();
    };
  }, []);

  return (
    <div className="UI">
      {/* Time */}
      <div ref={time} className="time">
        0.00
      </div>
      {phase === "ended" && (
        <div className="restart" onClick={restart}>
          Restart
        </div>
      )}
      <div className="controls">
        <div className="raw">
          <div className={`key ${forward ? "active" : ""}`}></div>
        </div>
        <div className="raw">
          <div className={`key  ${leftward ? "active" : ""}`}></div>
          <div className={`key  ${backward ? "active" : ""}`}></div>
          <div className={`key  ${rightward ? "active" : ""}`}></div>
        </div>
        <div className="raw">
          <div className={`key large  ${jump ? "active" : ""}`}></div>
        </div>
      </div>
    </div>
  );
};
export default UI;
