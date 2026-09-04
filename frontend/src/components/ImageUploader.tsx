import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, Camera, X } from "lucide-react";

interface Props {
  onFileSelected: (file: File) => void;
  disabled?: boolean;
}

export default function ImageUploader({ onFileSelected, disabled }: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File | undefined) => {
      if (!file) return;
      if (!file.type.startsWith("image/")) return;
      setPreview(URL.createObjectURL(file));
      onFileSelected(file);
    },
    [onFileSelected]
  );

  return (
    <div>
      <motion.div
        onClick={() => !disabled && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFile(e.dataTransfer.files?.[0]);
        }}
        whileHover={{ scale: disabled ? 1 : 1.01 }}
        className={`relative rounded-3xl border-2 border-dashed p-8 text-center cursor-pointer transition-colors overflow-hidden
          ${dragOver ? "border-farm-500 bg-farm-50" : "border-farm-200 bg-farm-50/40 hover:bg-farm-50"}
          ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          disabled={disabled}
          onChange={(e) => handleFile(e.target.files?.[0])}
        />

        <AnimatePresence mode="wait">
          {preview ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative inline-block"
            >
              <img src={preview} alt="Selected plant" className="max-h-64 rounded-2xl shadow-card mx-auto" />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setPreview(null);
                  if (inputRef.current) inputRef.current.value = "";
                }}
                className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white shadow-card flex items-center justify-center text-gray-500 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-farm-100 flex items-center justify-center"
              >
                <UploadCloud className="w-8 h-8 text-farm-500" />
              </motion.div>
              <p className="font-semibold text-farm-700">Drop a photo here, or tap to upload</p>
              <p className="text-sm text-gray-400 mt-1 flex items-center justify-center gap-1.5">
                <Camera className="w-4 h-4" /> Works with your camera too
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
