const frases = {
    conectado: "El siguiente controlador MIDI, ha sido conectado:",
    desconectado: "El controlador MIDI ha sido desconectado.",
    indetectable: "No se ha conectado ningún controlador MIDI",
    modelo: "Modelo del controlador MIDI:",
    error1: "No se puede acceder a tus dispositivos MIDI",
    error2: "Error al acceder a los dispositivos MIDI",
  };

  let midiControllerConnected = false;
  document.getElementById("midi-name").innerHTML = frases.indetectable;
  async function updateMidiInfo() {
    try {
      const midiAccess = await navigator.requestMIDIAccess();
      const inputs = Array.from(midiAccess.inputs.values());
      const outputs = Array.from(midiAccess.outputs.values());
      const output = inputs[0] || outputs[0];

      if (output && !midiControllerConnected) {
        document.querySelector(
          "#midi-name"
        ).innerText = `${frases.modelo} ${output.name}`;
        midiControllerConnected = true;
        console.log(`${frases.conectado} "${output.name}".`);
      } else if (!output && midiControllerConnected) {
        document.querySelector("#midi-name").innerText =
          frases.indetectable;
        midiControllerConnected = false;
        console.log(`${frases.desconectado}`);
      }

      midiAccess.onstatechange = (e) => {
        updateMidiInfo();
      };
    } catch (error) {
      console.error(frases.error1, error);
      document.querySelector("#midi-name").innerText = frases.error2;
    }
  }

  updateMidiInfo();