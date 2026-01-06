"use client";

import classNames from "classnames";
import { Check, Plug } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { FormData } from "./Homepage";

interface Props {
  setBloodType: React.Dispatch<React.SetStateAction<string>>;
  register: UseFormRegister<FormData>;
  bloodType: string;
}
export default function ArduinoData({
  setBloodType,
  register,
  bloodType,
}: Props) {
  const [data, setData] = useState(""); // just a single string

  const [connected, setConnected] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const portRef = useRef<SerialPort | null>(null);
  const readerRef = useRef<ReadableStreamDefaultReader<Uint8Array> | null>(
    null
  );
  const lastCaptureRef = useRef<number>(0); // timestamp of last update
  const captureInterval = 5000;
  const connectArduino = async () => {
    if (!("serial" in navigator)) {
      alert("Web Serial not supported (use Chrome)");
      return;
    }

    const port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });
    portRef.current = port;
    setConnected(true);

    const reader = port.readable!.getReader();
    readerRef.current = reader;

    const decoder = new TextDecoder();
    let buffer = "";

    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const trimmed = line.trim();
          const bloodType = trimmed.includes(":")
            ? trimmed.split(":")[1].trim()
            : trimmed;

          setData(bloodType);
          const now = Date.now();
          const elapsed = now - lastCaptureRef.current;

          if (elapsed >= captureInterval) {
            // update the actual state
            setBloodType(bloodType);
            lastCaptureRef.current = now;
            setCountdown(captureInterval / 1000); // reset countdown
          }
        }
      }
    } catch (err) {
      console.error("Error reading from serial port:", err);
    } finally {
      reader.releaseLock();
    }
  };
  useEffect(() => {
    if (countdown <= 0) return;
    const interval = setInterval(() => {
      setCountdown((prev) => Math.max(prev - 0.1, 0));
    }, 100); // update 10 times per second for smooth animation
    return () => clearInterval(interval);
  }, [countdown]);
  // cleanup on unmount
  useEffect(() => {
    return () => {
      (async () => {
        try {
          // 1️⃣ cancel reader first
          if (readerRef.current) {
            await readerRef.current.cancel();
            readerRef.current.releaseLock();
          }

          // 2️⃣ close the port after reader is released
          if (portRef.current) {
            await portRef.current.close();
          }
        } catch (err) {
          console.error("Error during Arduino disconnect:", err);
        }
      })();
    };
  }, []);

  return (
    <div className="p-2 w-full flex  gap-2">
      <div className="relative w-full  ">
        <input type="hidden" {...register("blood_type", { required: true })} />
        <div className="absolute -bottom-3 left-0 h-1 w-full bg-white/10 rounded">
          <div
            className="h-1 bg-green-400 rounded transition-all"
            style={{
              width: `${(countdown / (captureInterval / 1000)) * 100}%`,
            }}
          />
        </div>
        <div className="peer border border-white/60 min-h-12 rounded-md px-2 pt-4 lg:pt-5 pb-2 lg:pb-3 text-xs lg:text-sm focus:border-[#A8C7FA] outline-none bg-transparent">
          <ul className="space-y-1">{bloodType}</ul>
        </div>
        <label
          className={`absolute text-xs -top-2 left-2 bg-[#0E0E0E] px-1 text-white/70 transition-all duration-200
         `}
        >
          Blood Type
        </label>
      </div>
      <button
        type="button"
        onClick={connectArduino}
        disabled={connected}
        className={classNames(
          " bg-[#4A4A4A] p-4 cursor-pointer text-xs  text-white rounded",
          {
            "bg-transparent border-white/20 border-2": connected,
          }
        )}
      >
        {connected ? (
          <div className="flex gap-2 items-center">
            <p>Connected</p> <Check size={16} />
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            <p>Connect</p> <Plug size={16} />
          </div>
        )}
      </button>
    </div>
  );
}
