"use client"

import { cn } from "@/lib/utils"
import React, { useRef, useState } from "react"
import { motion } from "framer-motion"
import { IconUpload } from "@tabler/icons-react"
import { useDropzone } from "react-dropzone"

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
}

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
}

export const FileUpload = ({
  onChange,
  accept = ".sol",
}: {
  onChange?: (files: File[]) => void
  accept?: string
}) => {
  const [files, setFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (newFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles])
    onChange && onChange(newFiles)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    accept: {
      "text/plain": [".sol"],
    },
    onDrop: handleFileChange,
  })

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="group/file relative block w-full cursor-pointer overflow-hidden rounded-lg"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          accept={accept}
          onChange={(e) => {
            const newFiles = Array.from(e.target.files || [])
            handleFileChange(newFiles)
          }}
          className="hidden"
        />
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-full">
            <motion.div
              variants={mainVariant}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              className={cn(
                "relative z-40 flex h-32 w-full max-w-[8rem] mx-auto items-center justify-center rounded-md bg-background border border-border",
                isDragActive && "bg-primary/10 border-primary"
              )}
            >
              <IconUpload className="h-8 w-8 text-muted-foreground" />
            </motion.div>

            <motion.div
              variants={secondaryVariant}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              className={cn(
                "absolute inset-0 z-30 flex h-32 w-full max-w-[8rem] mx-auto items-center justify-center rounded-md border border-dashed border-border bg-transparent opacity-0",
                isDragActive && "opacity-100"
              )}
            />
          </div>

          <div className="mt-8 w-full text-center">
            <p className="text-lg font-semibold text-foreground">
              Upload file
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Drag or drop your files here or click to upload
            </p>
          </div>
        </div>

        {/* Grid background effect */}
        <GridPattern />
      </motion.div>
    </div>
  )
}

export function GridPattern() {
  const columns = 41
  const rows = 11
  return (
    <div className="absolute inset-0 z-0 flex h-full w-full flex-shrink-0 scale-105 items-center justify-center">
      <div
        style={{
          "--grid-pattern-size": "40px",
        } as React.CSSProperties}
        className="grid-pattern"
      >
        {Array.from({ length: rows }).map((_, row) => (
          <div key={`row-${row}`} className="flex">
            {Array.from({ length: columns }).map((_, col) => {
              const index = row * columns + col
              return (
                <div
                  key={`col-${col}`}
                  className={cn(
                    "grid-cell h-10 w-10 flex-shrink-0 border-r border-b border-border/10",
                    "group-hover/file:animate-grid-fade"
                  )}
                  style={{
                    animationDelay: `${index * 0.01}s`,
                  }}
                />
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
