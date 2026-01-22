'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, CardContent, Input, Label, Textarea } from '@camnextgen/ui';
import { toast } from 'sonner';

const schema = z.object({
  title: z.string().min(3, 'Title is required'),
  summary: z.string().min(10, 'Summary must be at least 10 characters'),
  level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
  durationWeeks: z.coerce.number().min(1, 'Duration is required')
});

type FormValues = z.infer<typeof schema>;

export const CourseForm = ({
  initialValues,
  onSubmit
}: {
  initialValues?: Partial<FormValues>;
  onSubmit?: (values: FormValues) => Promise<void> | void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: initialValues?.title ?? '',
      summary: initialValues?.summary ?? '',
      level: initialValues?.level ?? 'BEGINNER',
      durationWeeks: initialValues?.durationWeeks ?? 6
    }
  });

  const handleSave = async (values: FormValues) => {
    try {
      await onSubmit?.(values);
      toast.success('Course saved');
    } catch (error) {
      toast.error('Unable to save course');
    }
  };

  return (
    <Card className="bg-card">
      <CardContent className="space-y-4">
        <form className="space-y-4" onSubmit={handleSubmit(handleSave)}>
          <div className="space-y-2">
            <Label>Title</Label>
            <Input placeholder="Course title" {...register('title')} />
            {errors.title ? <p className="text-xs text-destructive">{errors.title.message}</p> : null}
          </div>
          <div className="space-y-2">
            <Label>Summary</Label>
            <Textarea placeholder="Short description" {...register('summary')} />
            {errors.summary ? (
              <p className="text-xs text-destructive">{errors.summary.message}</p>
            ) : null}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Level</Label>
              <select
                className="h-11 w-full rounded-2xl border border-input bg-background px-4 text-sm text-foreground"
                {...register('level')}
              >
                <option value="BEGINNER">Beginner</option>
                <option value="INTERMEDIATE">Intermediate</option>
                <option value="ADVANCED">Advanced</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Duration (weeks)</Label>
              <Input type="number" min={1} {...register('durationWeeks', { valueAsNumber: true })} />
              {errors.durationWeeks ? (
                <p className="text-xs text-destructive">{errors.durationWeeks.message}</p>
              ) : null}
            </div>
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Course'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
