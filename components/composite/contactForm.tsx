'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { RippleButton } from '../ui/rippleButton';
import { delay } from '@/lib/delay';
import { useEffect } from 'react';
import { Textarea } from '../ui/textarea';

const zodRequiredString = (label: string) =>
  z
    .string({
      required_error: 'Dies ist ein Pflichtfeld.',
    })
    .min(2, {
      message: `${label} muss mindestens aus 2 Zeichen bestehen.`,
    });

const formSchema = z.object({
  firstName: zodRequiredString('Vorname'),
  lastName: zodRequiredString('Nachname'),
  email: z
    .string({
      required_error: 'Dies ist ein Pflichtfeld.',
    })
    .email('Das ist keine gültige E-Mail.'),
  message: zodRequiredString('Deine Nachricht'),
});

export function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      message: '',
    },
  });
  const { reset } = form;
  const { isDirty, isSubmitting, isSubmitSuccessful } = form.formState;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await delay(500);
    console.log(values);
  }

  return (
    <div className='w-full'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vorname</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nachname</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-Mail</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='message'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deine Nachricht</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  This is your public display name.
                </FormDescription>
              </FormItem>
            )}
          />
          <div className='mt-6 flex justify-end space-x-3'>
            <RippleButton
              variant='outline'
              onClick={(e) => {
                e.preventDefault();
                reset();
              }}
            >
              Zur&uuml;cksetzen
            </RippleButton>
            <RippleButton type='submit' disabled={!isDirty || isSubmitting}>
              Absenden
            </RippleButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
