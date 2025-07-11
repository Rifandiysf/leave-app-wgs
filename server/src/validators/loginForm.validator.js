import { z } from 'zod/v4';

const loginFormRequest = z.object({
    email: z.email(),
    password: z.string().min(8).max(16)
});

export default loginFormRequest;