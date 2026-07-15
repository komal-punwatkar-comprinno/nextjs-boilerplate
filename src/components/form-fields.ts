"use client";

/**
 * Form field primitives built on top of React Hook Form.
 *
 * These components connect directly to a RHF form context via `register` or
 * Controller — they are thin wrappers that add the label / error / hint shell
 * around each raw input component.
 *
 * Usage pattern:
 *   1. Define a Zod schema.
 *   2. Call useZodForm(schema) to get a typed form instance.
 *   3. Use <FormInput>, <FormSelect>, etc. passing `register("fieldName")`.
 *
 * @example
 * const form = useZodForm(loginSchema);
 *
 * <form onSubmit={form.handleSubmit(onSubmit)}>
 *   <FormInput label="Email" type="email" {...form.register("email")}
 *     error={form.formState.errors.email?.message} />
 *   <FormInput label="Password" type="password" {...form.register("password")}
 *     error={form.formState.errors.password?.message} />
 *   <Button type="submit" isLoading={form.formState.isSubmitting}>Sign in</Button>
 * </form>
 */

export { Input as FormInput } from "@/components/input";
export { Select as FormSelect } from "@/components/select";
export { Textarea as FormTextarea } from "@/components/textarea";
