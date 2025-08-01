"use client";

import { CircleUserRoundIcon, XIcon } from "lucide-react";

import { useFileUpload } from "../hooks/use-file-upload";
import { Button } from "./ui/button";

export default function Component() {
  const [
    { files, isDragging },
    {
      removeFile,
      openFileDialog,
      getInputProps,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
    },
  ] = useFileUpload({
    accept: "image/*",
  });

  const previewUrl = files[0]?.preview || null;

  return (
    <div className='flex flex-col items-center gap-2'>
      <p
        aria-live='polite'
        role='region'
        className='text-foreground text-sm leading-4 font-medium mt-2'
      >
        Avatar
      </p>
      <div className='relative inline-flex'>
        {/* Drop area */}
        <button
          className='border-input cursor-pointer hover:bg-accent/50 data-[dragging=true]:bg-accent/50 focus-visible:border-ring focus-visible:ring-ring/50 relative flex size-16 items-center justify-center overflow-hidden rounded-full border transition-colors outline-none focus-visible:ring-[3px] has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none'
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          aria-label={previewUrl ? "Change image" : "Upload image"}
          disabled
        >
          {previewUrl ? (
            <img
              className='size-full object-cover'
              src={previewUrl}
              alt={files[0]?.file?.name || "Uploaded image"}
              width={64}
              height={64}
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div aria-hidden='true'>
              <CircleUserRoundIcon className='size-4 opacity-60' />
            </div>
          )}
        </button>
        {previewUrl && (
          <Button
            onClick={() => removeFile(files[0]?.id)}
            size='icon'
            className='border-background focus-visible:border-background absolute -top-1 -right-1 size-6 rounded-full border-2 shadow-none'
            aria-label='Remove image'
          >
            <XIcon className='size-3.5' />
          </Button>
        )}
        <input
          {...getInputProps()}
          className='sr-only'
          aria-label='Upload image file'
          tabIndex={-1}
        />
      </div>
    </div>
  );
}
