import moment from "moment";
import React, { useState, useEffect } from "react";
import { IoPause, IoPlay } from "react-icons/io5";

const useAudio = (url: any) => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState<any>(false);
    const [duration, setDuration] = useState<any>();

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
        setInterval(() => {
            let dr = audio.duration;
            if (dr > 0) {
                let minutes = "0" + parseInt(dr / 60, 10);
                let seconds = "0" + parseInt(dr % 60);
                setDuration(minutes + ":" + seconds.slice(-2));
            }
        }, 100)


        playing ? audio.play() : audio.pause();
    },
        [playing]
    );

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, []);

    return [playing, duration, toggle];
};

const Player = ({ url }) => {
    const [playing, duration, toggle] = useAudio(url);

    return (
        <div>
            <h1 className="text-sm text-gray-500 mb-2">{duration}min</h1>
            <button
                className="bg-sky-900 text-gray-50 p-2 shadow-md rounded-full border-2"
                onClick={toggle}>
                {playing
                    ? <IoPause size={36} />
                    : <IoPlay size={36} />
                }
            </button>
        </div>
    );
};

export default Player;