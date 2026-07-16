import { Input } from "@/components/input";
import { Select } from "@/components/select";
import { Textarea } from "@/components/textarea";
import { SectionWrapper } from "./section-wrapper";

const MailIcon = (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const LockIcon = (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const roleOptions = [
  { value: "admin", label: "Administrator" },
  { value: "manager", label: "Manager" },
  { value: "developer", label: "Developer" },
  { value: "viewer", label: "Viewer (read-only)" },
];

export function FormSection() {
  return (
    <SectionWrapper id="forms" title="5. Form Inputs">
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
        {/* Normal text input */}
        <Input
          label="Username"
          type="text"
          placeholder="johndoe"
          hint="Letters and numbers only, no spaces."
        />

        {/* Input with error */}
        <Input
          label="Full Name"
          type="text"
          defaultValue="J0hn D0e"
          error="Name must contain only letters and spaces."
        />

        {/* Disabled input */}
        <Input
          label="Account ID"
          type="text"
          defaultValue="USR-00421"
          disabled
          hint="This field cannot be changed."
        />

        {/* Email with left icon */}
        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          leftAddon={MailIcon}
        />

        {/* Password with left icon */}
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          leftAddon={LockIcon}
          hint="At least 8 characters including a number."
        />

        {/* Required input */}
        <Input
          label="Company Name"
          type="text"
          placeholder="Acme Corp"
          required
        />

        {/* Select */}
        <Select
          label="Role"
          options={roleOptions}
          placeholder="Select a role…"
          hint="Determines the user's access level."
        />

        {/* Select with error */}
        <Select
          label="Department"
          options={[
            { value: "eng", label: "Engineering" },
            { value: "design", label: "Design" },
            { value: "product", label: "Product" },
          ]}
          placeholder="Select department…"
          error="Please select a department."
        />

        {/* Textarea — spans full width */}
        <div className="md:col-span-2">
          <Textarea
            label="Bio"
            placeholder="Tell us a little about yourself…"
            rows={4}
            hint="Maximum 280 characters."
          />
        </div>

        {/* Textarea with error — spans full width */}
        <div className="md:col-span-2">
          <Textarea
            label="Project Description"
            defaultValue="x"
            rows={3}
            error="Description must be at least 20 characters."
          />
        </div>
      </div>
    </SectionWrapper>
  );
}

