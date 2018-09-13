import Layout from '@/components/app/layout/Layout';
import Validation from '@/components/app/views/validation/Validation';
import Comparison from '@/components/app/views/comparison/Comparison';

export default [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'validation',
        name: 'validation',
        component: Validation,
      },
      {
        path: 'comparison',
        name: 'comparison',
        component: Comparison,
      },
    ],
  },
];
