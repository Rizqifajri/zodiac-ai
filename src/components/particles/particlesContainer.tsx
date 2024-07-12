import React, { useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { loadStarsPreset } from "@tsparticles/preset-stars";

const ParticlesContainer: React.FC = () => {
  const [init, setInit] = useState(false);


  const initializeParticles = async () => {
    await initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
      await loadStarsPreset(engine);
    });
    setInit(true);
  };

  initializeParticles();
  const options = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fullScreen: {
      enable: true,
    },
    preset: "stars",
  };

  return init ? (
    <Particles id="tsparticles" options={options} />
  ) : null;
};

export default ParticlesContainer;
