"use client";

import { useForm, type UseFormProps, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z, ZodType } from "zod";

/**
 * Typed wrapper around `useForm` that automatically wires the Zod resolver.
 *
 * Pass a Zod schema and receive a fully-typed form instance. TypeScript infers
 * the field names and value types directly from the schema, so you never need
 * to write a separate interface for form values.
 *
 * @example
 * const loginSchema = z.object({
 *   email: z.string().email(),
 *   password: z.string().min(8),
 * });
 *
 * function LoginForm() {
 *   const form = useZodForm(loginSchema, { defaultValues: { email: "", password: "" } });
 *
 *   const onSubmit = form.handleSubmit((values) => {
 *     // values is typed as { email: string; password: string }
 *     console.log(values);
 *   });
 *
 *   return (
 *     <form onSubmit={onSubmit}>
 *       <FormInput label="Email" {...form.register("email")}
 *         error={form.formState.errors.email?.message} />
 *       <Button type="submit" isLoading={form.formState.isSubmitting}>
 *         Sign in
 *       </Button>
 *     </form>
 *   );
 * }
 */
export function useZodForm<TSchema extends ZodType>(
  schema: TSchema,
  options?: Omit<UseFormProps<z.infer<TSchema>>, "resolver">
): UseFormReturn<z.infer<TSchema>> {
  return useForm<z.infer<TSchema>>({
    ...options,
    resolver: zodResolver(schema),
  });
}
