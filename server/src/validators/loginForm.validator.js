import { email, z } from 'zod/v4';

const loginFormRequest = z.object({
    email: z.email(),
    password: z.string().min(8)
});

export default loginFormRequest;