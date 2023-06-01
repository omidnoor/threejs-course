import { EffectComposer, DepthOfField } from "@react-three/postprocessing";

const Effects = () => {
  return (
    <EffectComposer>
      <DepthOfField focusDistance={0.01} focusLength={0.2} bokehScale={3} />
    </EffectComposer>
  );
};
export default Effects;
