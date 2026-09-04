/**
 * hooks/useSpeechRecognition.ts
 * --------------------------------
 * Wraps the browser's native Web Speech API (SpeechRecognition) so a
 * farmer can speak their question instead of typing it. This runs
 * entirely client-side and is free — no backend call, no API key.
 * Not every browser supports it (notably some non-Chromium browsers),
 * so `isSupported` lets the UI hide the mic button gracefully.
 */

import { useCallback, useEffect, useRef, useState } from "react";

interface SpeechRecognitionResultLike {
  transcript: string;
}

// Minimal ambient typing for the non-standardized Web Speech API.
interface SpeechRecognitionLike extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: { results: { [index: number]: { [index: number]: SpeechRecognitionResultLike } } }) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  }
}

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  const SpeechRecognitionCtor =
    typeof window !== "undefined" ? window.SpeechRecognition || window.webkitSpeechRecognition : undefined;
  const isSupported = !!SpeechRecognitionCtor;

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  const startListening = useCallback(
    (lang: string = "en-US") => {
      if (!SpeechRecognitionCtor) {
        setError("Voice input is not supported in this browser. Try Chrome or Edge.");
        return;
      }
      setError(null);
      setTranscript("");

      const recognition = new SpeechRecognitionCtor();
      recognition.lang = lang;
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
      };
      recognition.onerror = (event) => {
        setError(event.error === "not-allowed" ? "Microphone permission was denied." : "Could not recognize speech.");
        setIsListening(false);
      };
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
      recognition.start();
      setIsListening(true);
    },
    [SpeechRecognitionCtor]
  );

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  return { isSupported, isListening, transcript, error, startListening, stopListening };
}
