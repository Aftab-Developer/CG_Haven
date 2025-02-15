import { z } from 'zod';

const TypeDetailsSchema = z.object({ 
    sub_ca_name: z.string().min(1, 'Sub_Ca name is required'), 
    type_name: z.string().min(1, 'Type name is required'), 
    type_des: z.string()
        .min(1, 'Type description is required')
        .max(500, 'Description should not exceed 500 characters'), 

});

export { TypeDetailsSchema };
