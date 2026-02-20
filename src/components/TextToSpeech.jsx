import React, { useState, useEffect } from 'react';
import { FiPlay, FiPause, FiSquare, FiVolume2 } from 'react-icons/fi';

const TextToSpeech = ({ text }) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [utterance, setUtterance] = useState(null);
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [rate, setRate] = useState(1);

    useEffect(() => {
        const synth = window.speechSynthesis;
        const u = new SpeechSynthesisUtterance(text);
        setUtterance(u);

        // Load voices
        const loadVoices = () => {
            const vs = synth.getVoices();
            setVoices(vs);
            // Default to first English voice
            const defaultVoice = vs.find(v => v.lang.includes('en')) || vs[0];
            setSelectedVoice(defaultVoice);
            if (u) u.voice = defaultVoice;
        };

        loadVoices();
        if (synth.onvoiceschanged !== undefined) {
            synth.onvoiceschanged = loadVoices;
        }

        return () => {
            synth.cancel();
        };
    }, [text]);

    const handlePlay = () => {
        const synth = window.speechSynthesis;

        if (isPaused) {
            synth.resume();
        } else {
            if (utterance) {
                utterance.voice = selectedVoice;
                utterance.rate = rate;
                utterance.onend = () => {
                    setIsSpeaking(false);
                    setIsPaused(false);
                };
                synth.speak(utterance);
            }
        }
        setIsSpeaking(true);
        setIsPaused(false);
    };

    const handlePause = () => {
        const synth = window.speechSynthesis;
        synth.pause();
        setIsSpeaking(false);
        setIsPaused(true);
    };

    const handleStop = () => {
        const synth = window.speechSynthesis;
        synth.cancel();
        setIsSpeaking(false);
        setIsPaused(false);
    };

    const handleVoiceChange = (e) => {
        const voice = voices.find(v => v.name === e.target.value);
        setSelectedVoice(voice);
        if (utterance) utterance.voice = voice;
    };

    return (
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 mb-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-blue-400 font-bold mr-2">
                <FiVolume2 />
                <span className="text-sm uppercase tracking-wider">Listen</span>
            </div>

            <div className="flex items-center gap-2 bg-gray-900 rounded-lg p-1 border border-gray-700">
                {!isSpeaking || isPaused ? (
                    <button onClick={handlePlay} className="p-2 hover:bg-gray-700 rounded text-green-400">
                        <FiPlay />
                    </button>
                ) : (
                    <button onClick={handlePause} className="p-2 hover:bg-gray-700 rounded text-yellow-400">
                        <FiPause />
                    </button>
                )}
                <button onClick={handleStop} className="p-2 hover:bg-gray-700 rounded text-red-400">
                    <FiSquare />
                </button>
            </div>

            <select
                onChange={handleVoiceChange}
                className="bg-gray-900 border border-gray-700 text-gray-300 text-sm rounded-lg p-2 max-w-[200px]"
                value={selectedVoice?.name || ''}
            >
                {voices.map(voice => (
                    <option key={voice.name} value={voice.name}>
                        {voice.name} ({voice.lang})
                    </option>
                ))}
            </select>

            <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 font-bold">SPEED</span>
                <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(parseFloat(e.target.value))}
                    className="w-24 accent-blue-500 cursor-pointer"
                />
                <span className="text-xs text-gray-400 w-8">{rate}x</span>
            </div>
        </div>
    );
};

export default TextToSpeech;
