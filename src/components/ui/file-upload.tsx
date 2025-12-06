import { type KeyboardEvent, useId, useRef, useState } from "react";

type FileUploadProps = {
	title: string;
	description: string;
	accept?: string;
	onFileSelect: (file: File) => void;
	fileName?: string;
	disabled?: boolean;
};

export function FileUpload({
	title,
	description,
	accept,
	onFileSelect,
	fileName,
	disabled,
}: FileUploadProps) {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [isDragging, setIsDragging] = useState(false);
	const inputId = useId();

	const triggerBrowse = () => {
		if (disabled) {
			return;
		}
		inputRef.current?.click();
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			triggerBrowse();
		}
	};

	const handleFileChange = (files: FileList | null) => {
		const file = files?.[0];
		if (!file) {
			return;
		}
		onFileSelect(file);
		if (inputRef.current) {
			inputRef.current.value = "";
		}
	};

	return (
		<div className="flex flex-col items-center justify-center rounded-2xl border-3 border-dashed border-accent-cyan/50 bg-navy/50 p-8 text-center h-80 transition-all duration-300 hover:border-accent-cyan hover:bg-accent-cyan/5">
			<label
				className={`flex flex-col items-center gap-4 text-slate-400 w-full h-full justify-center ${isDragging ? "border border-accent-cyan/70 bg-accent-cyan/5 rounded-xl" : ""}`}
				htmlFor={inputId}
				onDragOver={(event) => {
					event.preventDefault();
					if (!disabled) {
						setIsDragging(true);
					}
				}}
				onDragLeave={() => setIsDragging(false)}
				onDrop={(event) => {
					event.preventDefault();
					if (disabled) {
						return;
					}
					setIsDragging(false);
					handleFileChange(event.dataTransfer.files);
				}}
				onKeyDown={handleKeyDown}
				tabIndex={disabled ? -1 : 0}
			>
				<div className="flex size-16 items-center justify-center rounded-full bg-accent-cyan/10 animate-subtle-bounce">
					<i className="size-8 text-accent-cyan" data-lucide="upload-cloud" />
				</div>
				<div className="flex flex-col gap-1">
					<p className="text-lg font-semibold text-slate-200">{title}</p>
					<p className="text-base">{description}</p>
					{fileName ? (
						<span className="text-sm text-accent-cyan font-medium truncate max-w-xs">
							{fileName}
						</span>
					) : null}
				</div>
				<button
					type="button"
					className="mt-4 rounded-xl bg-slate-800 px-5 py-2.5 text-base font-semibold text-slate-200 shadow-md ring-1 ring-inset ring-slate-700 hover:bg-slate-700 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:hover:translate-y-0"
					disabled={disabled}
					onClick={triggerBrowse}
				>
					Select file
				</button>
			</label>
			<input
				ref={inputRef}
				className="sr-only"
				type="file"
				accept={accept}
				id={inputId}
				disabled={disabled}
				onChange={(event) => handleFileChange(event.target.files)}
			/>
		</div>
	);
}
