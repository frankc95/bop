'use client';

import {
  Box,
  Button,
  Grid,
  Stack,
} from '@mui/material';

import {zodResolver} from '@hookform/resolvers/zod';
import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {useForm} from "react-hook-form";
import {z} from 'zod';
import {StyledTextField} from './StyledTextField';
import {toast} from 'react-toastify';

type BookingFormProps = {
  setOpen: (open: boolean) => void;
};

const questionSchema = z.object({
  questionId: z.string(),
  questionText: z.string(),
  answer: z.string().min(2, 'This field is required'),
});

const schema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email'),
  age: z.number()
    .refine(value => value >= 18, {
      message: 'You must be at least 18 years old',
    }),
  questions: z.array(questionSchema),
});

type FormFields = z.infer<typeof schema>;

const sampleQuestions = [
  {questionId: 'q1', questionText: 'What type of suspension would you like to do? (e.g., suicide, lotus, knee, back, etc.)'},
  {questionId: 'q2', questionText: 'Which day would you prefer to be suspended?'},
  {questionId: 'q3', questionText: 'What day are you planning to arrive?'},
  {questionId: 'q4', questionText: 'Are you planning to stay overnight?'},
  {questionId: 'q5', questionText: 'Do you know the exact location of the event?'},
  {questionId: 'q6', questionText: 'How many friends or companions will be coming with you?'},
  {questionId: 'q7', questionText: 'Do you have any medical conditions we should be aware of before your suspension? (physical or mental health – e.g., epilepsy, diabetes, heart issues, PTSD, anxiety, etc.)'},
  {questionId: 'q8', questionText: 'Are you currently taking any medications or substances (prescribed or otherwise)?'},
  {questionId: 'q9', questionText: 'Have you been suspended before? If yes, how many times and what types of suspension?'},
  {questionId: 'q10', questionText: 'What motivates you to get suspended? What are your intentions or expectations?'},
  {questionId: 'q11', questionText: 'Is there anything that helps you feel safe or grounded before, during, or after a suspension? (e.g., a specific person present, music, ritual, breathing, no talking, etc.)'},
  {questionId: 'q12', questionText: 'Do you have any fears, boundaries, or things you do not want to experience during the suspension?'},
  {questionId: 'q13', questionText: 'Do you consent to being photographed or filmed during your suspension? (Yes / No / Only by approved people)'},
  {questionId: 'q14', questionText: 'Do you have any questions, requests, or anything else you’d like to share with the team?'},
];

export default function BookingForm({setOpen}: BookingFormProps) {
  const {
    // control,
    register,
    handleSubmit,
    formState: {errors},
    // setValue,
  } = useForm<FormFields>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      age: undefined,
      questions: sampleQuestions.map((q) => ({
        questionId: q.questionId,
        questionText: q.questionText,
        answer: '',
      })),
    },
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: (newBookingForm: FormFields) => {
      return axios.post(`${ import.meta.env.VITE_API_URL }/booking`, newBookingForm)
    },
    onSuccess: (_res) => {
      setOpen(false)
      toast.success('Booking form has been submitted')
    }
  });

  const onSubmit = handleSubmit((data: FormFields) => {
    mutation.mutate(data);
  });

  return (
    <form onSubmit={onSubmit} noValidate>
      <Stack spacing={4}>
        {/* First & Last Name */}
        <Stack direction={{xs: 'column', md: 'row'}} spacing={2}>
          <StyledTextField
            label="First Name"
            fullWidth
            {...register('firstName')}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
          <StyledTextField
            label="Last Name"
            fullWidth
            {...register('lastName')}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
        </Stack>

        {/* Email & Age */}
        <Stack direction={{xs: 'column', md: 'row'}} spacing={2}>
          <StyledTextField
            label="Email"
            type="email"
            fullWidth
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <StyledTextField
            label="Age"
            type="number"
            fullWidth
            {...register('age', {valueAsNumber: true})}
            error={!!errors.age}
            helperText={errors.age?.message}
          />
        </Stack>

        {/* Questions */}
        <Stack spacing={4}>
          <Grid
            container
            rowSpacing={4}
            columnSpacing={2}
            sx={{
              justifyContent: "space-around",
              alignItems: "flex-end",
            }}
          >
            {sampleQuestions.map((q, index) => (
              <Grid
                size={{xs: 12, md: 6}}
                key={q.questionId}
              >
                <Box
                  component="label"
                  htmlFor={`question-${ index }`}
                  sx={{display: 'block', color: 'rgba(255,255,255,0.8)', mb: 1}}
                >
                  {q.questionText}
                </Box>
                <StyledTextField
                  // label={q.questionText}
                  fullWidth
                  {...register(`questions.${ index }.answer`)}
                  error={!!errors.questions?.[index]?.answer}
                  helperText={errors.questions?.[index]?.answer?.message}
                />
                {/* Hidden fields to preserve questionId and questionText */}
                <input
                  type="hidden"
                  {...register(`questions.${ index }.questionId`)}
                  value={q.questionId}
                />
                <input
                  type="hidden"
                  {...register(`questions.${ index }.questionText`)}
                  value={q.questionText}
                />
              </Grid>
            ))}
          </Grid>
        </Stack>

        <Button
          disabled={mutation.isPending}
          variant="outlined"
          type="submit"
          sx={{
            borderColor: 'white',
            color: 'white',
            mt: '3rem !important'
          }}>
          {mutation.isPending ? "Submitting..." : "Submit"}
        </Button>
      </Stack>
    </form>
  );
}
