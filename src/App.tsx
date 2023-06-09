import AudioPlayer from "./components/audioPlayer/AudioPlayer";
import exampleTrack from "./assets/ambient_experiment.wav";
import exampleArt from "./assets/album_art.png"
import "@fontsource/inter";

// Sample taken from Sonic Pi's documentation
const code = `
use_synth :hollow
with_fx :reverb, mix: 0.7 do
  live_loop :note1 do
    play choose([:D4,:E4]), attack: 6, release: 6
    sleep 8
  end
  live_loop :note2 do
    play choose([:Fs4,:G4]), attack: 4, release: 5
    sleep 10
  end
  live_loop :note3 do
    play choose([:A4, :Cs5]), attack: 5, release: 5
    sleep 11
  end
end
`;

const data = [
  {
    title: "Sample beat",
    artist: "Darin Wilson", 
    artwork: exampleArt,
    src: exampleTrack,    
    code: code,
  },
];

function App() {
  return <AudioPlayer data={data} showArtwork={true} />;
}

export default App;
