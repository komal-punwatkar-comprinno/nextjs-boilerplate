/**
 * Form components barrel.
 */

// Re-exports from form-fields (legacy)
export { FormInput, FormSelect, FormTextarea } from "./form-fields";

// Form field wrapper
export { FormField } from "./form-field";
export type { FormFieldProps } from "./form-field";

// Advanced select
export { AdvancedSelect } from "./advanced-select";
export type { AdvancedSelectProps, AdvancedSelectOption } from "./advanced-select";

// Date picker
export { DatePicker } from "./datepicker";
export type { DatePickerProps } from "./datepicker";

// Date range picker
export { DateRangePicker } from "./date-range-picker";
export type { DateRangePickerProps, DateRange, PresetRange } from "./date-range-picker";

// File upload
export { FileUpload } from "./file-upload";
export type { FileUploadProps } from "./file-upload";

// Dropzone
export { Dropzone } from "./dropzone";
export type { DropzoneProps, DropzoneFile } from "./dropzone";

// WYSIWYG editor
export { WysiwygEditor } from "./wysiwyg-editor";
export type { WysiwygEditorProps } from "./wysiwyg-editor";

// Quantity counter
export { QuantityCounter } from "./quantity-counter";
export type { QuantityCounterProps } from "./quantity-counter";

// Input mask
export { InputMask } from "./input-mask";
export type { InputMaskProps } from "./input-mask";

// Step form
export { StepForm } from "./step-form";
export type { StepFormProps, StepFormStep } from "./step-form";

// Toggle password
export { TogglePassword } from "./toggle-password";
export type { TogglePasswordProps } from "./toggle-password";

// Count characters
export { CountCharacters } from "./count-characters";
export type { CountCharactersProps } from "./count-characters";

// Form search
export { FormSearch } from "./form-search";
export type { FormSearchProps } from "./form-search";

// Toggle switch
export { ToggleSwitch } from "./toggle-switch";
export type { ToggleSwitchProps } from "./toggle-switch";

// Add field (dynamic)
export { AddField } from "./add-field";
export type { AddFieldProps } from "./add-field";
